///////////////////////////////////////////////////////////
////////////// La constante createDom (appelée dans recipeCard) ici permet de créer des éléments
////////////// et de créer/classer ses enfants selon certaines conditions comme :
////////////// si le type du child est string alors le stocker dans une constante textNode pour ensuite l'ajouter à l'élément
////////////// si le child est un HTMLElement alors l'ajouter à l'élément
////////////// si le child est un object alors, pour chaque object, appliquer un entries()
////////////// qui permet d'avoir les key/values et de les mettre en attribut à l'élément


/////////////// REMINDER : The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array


/**
 * Fonction pour créer des éléments
 * HTMLElement = Un element HTML
 * ...any childs = N'importe quel noeud
 */
const createDom = (tag, ...childs) => {
 const element = document.createElement(tag)
 childs.forEach(child => {
  if (typeof child === 'string') {
   const textNode = document.createTextNode(child);
   element.append(textNode)
  } else if (child instanceof HTMLElement) {
   element.append(child);
  } else if (child instanceof Object) {
   Object.entries(child).forEach(([key, value]) => {
    element.setAttribute(key, value);
   })
  }
 })
 return element
}
