import Filter from './Filter.class'
import Tag from './Tag.class'
import { ReceiptsList } from './Receipt.class'

import { formatString } from './utils'

export default class Search {

  constructor (data) {
    this._data = data

    this.$searchInput = document.querySelector('#search input')

    // Add classes for search components
    this._tag = new Tag()
    this._receipts = new ReceiptsList(this._data)
    this._filterIngredients = new Filter('Ingrédients', 'ingredients', 'Rechercher un ingrédient', 'blue', this._receipts.ingredients, this._tag)
    this._filterAppliances = new Filter('Appareils', 'appliances', 'Rechercher un appareil', 'green', this._receipts.appliances, this._tag)
    this._filterUstensils = new Filter('Ustensiles', 'ustensils', 'Rechercher un ustensile', 'red', this._receipts.ustensils, this._tag)

    // Bind publics functions to keep context
    this.search = this.search.bind(this)
    this.filtersClose = this.filtersClose.bind(this)
    this.displayResult = this.displayResult.bind(this)
    this.updateFiltersList = this.updateFiltersList.bind(this)

    // Bind private functions to keep context
    this._addTagEvent = this._addTagEvent.bind(this)
    this._removeTagEvent = this._removeTagEvent.bind(this)
  }

  init () {
    // Display Elements inside DOM document
    this._receipts.createHTMLContent()
    this._filterIngredients.createFilterHtml()
    this._filterAppliances.createFilterHtml()
    this._filterUstensils.createFilterHtml()

    this._filterIngredients.ariaControlInit(this._addTagEvent)
    this._filterAppliances.ariaControlInit(this._addTagEvent)
    this._filterUstensils.ariaControlInit(this._addTagEvent)

    // Init Events interface
    this._filterEventInit()
    this._tagEventInit()
    this.$searchInput.addEventListener('input', this.search)
    this._tag.ariaControlInit(this._removeTagEvent)
  }

  
  //Display result after search Event
  displayResult (listReceipts) {
    this.updateFiltersList(listReceipts)
    this._receipts.createHTMLContent(listReceipts)
    this._tagEventInit()
  }

  search () {
    const inputKeywordsTab = formatString(this.$searchInput.value.replace(/\s+/g, '+')).split('+')
    let result = []
    // ===============================/
    // Algo01 Input Research
    // ===============================/
    if (this.$searchInput.value.length >= 3) {
      for (let i = 0; i < listReceipts.length; i++) {
        const {name, ingredients, description} = listReceipts[i];
        const includesInName = name.includes.formatString((inputKeywordsTab));
        const includesInDescription = description.includes.formatString((inputKeywordsTab));
        let includesInIngredients = false;
        for (let y = 0; y < ingredients.length; y++) {
          if (ingredients[y].ingredient.includes.formatString((inputKeywordsTab))){
            includesInIngredients = true;
          }
        }
        if (includesInName || includesInDescription || includesInIngredients){
          result.push(listReceipts[i]);
        }
      }
    // ===============================/
    // Algo01 Tag Research
    // ===============================/
    if (this._tag.listTags.length > 0) {
      for (const tag of this._tag.listTags) {
        const keyword = [formatString(tag.value)]
        switch (tag.category) {
          case 'ingredients':
            result = this._searchByIngredients(keyword, result)
            break

          case 'appliances':
            result = this._searchByAppliance(keyword, result)
            break

          case 'ustensils':
            result = this._searchByUstensils(keyword, result)
            break
        }
      }
    }

    result = [...new Set(result)]

    this.displayResult(result)
  }


  //Update filters list items after search event
  updateFiltersList (listReceipts) {
    let listAppliances = []
    let listIngredients = []
    let listUstensils = []
    // ======================================/
    // Search_feature V1
    // ======================================/
    for (const receipt of listReceipts) {
      listAppliances.push(receipt.appliance)
      listIngredients = listIngredients.concat(receipt.ingredients)
      listUstensils = listUstensils.concat(receipt.ustensils)

      // Remove tags selected on listItem
      // Remove tags selected on listItem
      for (const tag of this._tag.listTags) {
        switch (tag.category) {
          case 'ingredients':
            listIngredients.splice(listIngredients.indexOf(tag.value), 1)
            break
          case 'ustensils':
            listUstensils.splice(listUstensils.indexOf(tag.value), 1)
            break
          case 'appliances':
            listAppliances.splice(listAppliances.indexOf(tag.value), 1)
            break
        }
      }
    }

    listAppliances = [...new Set(listAppliances)]
    listIngredients = [...new Set(listIngredients)]
    listUstensils = [...new Set(listUstensils)]

    this._filterIngredients.updateFilterResultHtml(listIngredients)
    this._filterAppliances.updateFilterResultHtml(listAppliances)
    this._filterUstensils.updateFilterResultHtml(listUstensils)
  }

  //Close all filters Event
  filtersClose () {
    this._filterIngredients.closeFilter()
    this._filterAppliances.closeFilter()
    this._filterUstensils.closeFilter()
  }

  // ======================================/
  // Search from title
  // ======================================/
  _searchByTitle (keywords, listReceipts);{
    const result = []
    const keywordsString = keywords.join(' ')

    for (const receipt of listReceipts) {
      if (formatString(receipt.name).includes(keywordsString)) {
        result.push(receipt)
      }
    }

    return result
  }

  // ======================================/
  // Search from description
  // ======================================/
  _searchByDescription (keywords, listReceipts);{
    const result = []
    const keywordsString = keywords.join(' ')

    for (const receipt of listReceipts) {
      if (formatString(receipt.description).includes(keywordsString)) {
        result.push(receipt)
      }
    }

    return result
  }

  // ======================================/
  // Search from ingredients
  // ======================================/
  _searchByIngredients (keywords, listReceipts);{
    const result = []

    for (const keyword of keywords) {
      for (const receipt of listReceipts) {
        for (const ingredient of receipt.keywordsIngredients) {
          if (ingredient.includes(keyword) && keyword.length >= 3) {
            result.push(receipt)
          }
        }
      }
    }

    return result
  }

  // ======================================/
  // Search from appliances
  // ======================================/
  _searchByAppliance (keywords, listReceipts);{
    const result = []
    const keywordsString = keywords.join(' ')

    for (const receipt of listReceipts) {
      if (formatString(receipt.appliance).includes(keywordsString)) {
        result.push(receipt)
      }
    }

    return result
  }

  // ======================================/
  // Search from ustensils
  // ======================================/
  _searchByUstensils (keywords, listReceipts);{
    const result = []

    for (const keyword of keywords) {
      for (const receipt of listReceipts) {
        for (const ustensil of receipt.keywordsUstensils) {
          if (ustensil.includes(keyword) && keyword.length >= 3) {
            result.push(receipt)
          }
        }
      }
    }

    return result
  }

  _addTagEvent (event);{
    const $node = this._tag.addTag(event.target)
    $node.addEventListener('click', this._removeTagEvent)

    this.filtersClose()
    this.search()
  }

  _removeTagEvent (event);{
    this.filtersClose()
    this._tag.removeTag(event.target)
    this.search()
  }

  //close all filters and open the one clicked
  _filterEventInit ();{
    // Expand Filters action
    this._filterIngredients.filterHTMLComponent.addEventListener('click', event => {
      this._filterAppliances.closeFilter()
      this._filterUstensils.closeFilter()
      this._filterIngredients.expandFilter(event)
    })
    this._filterAppliances.filterHTMLComponent.addEventListener('click', event => {
      this._filterIngredients.closeFilter()
      this._filterUstensils.closeFilter()
      this._filterAppliances.expandFilter(event)
    })
    this._filterUstensils.filterHTMLComponent.addEventListener('click', event => {
      this._filterIngredients.closeFilter()
      this._filterAppliances.closeFilter()
      this._filterUstensils.expandFilter(event)
    })

    // Close all filter if click out filters
    document.querySelector('body').addEventListener('click', this.filtersClose)
  }

  /**
   * Init Event Tags
   */
  _tagEventInit ();{
    this._filterIngredients.filterHTMLComponent.querySelectorAll('.filter__item').forEach(item => {
      item.addEventListener('click', this._addTagEvent)
    })
    this._filterAppliances.filterHTMLComponent.querySelectorAll('.filter__item').forEach(item => {
      item.addEventListener('click', this._addTagEvent)
    })
    this._filterUstensils.filterHTMLComponent.querySelectorAll('.filter__item').forEach(item => {
      item.addEventListener('click', this._addTagEvent)
    })
  }
}
