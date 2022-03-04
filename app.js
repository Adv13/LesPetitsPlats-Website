import API from './scripts/Api.class.js'
import Search from './scripts/Search.class.js'

import urlData from '../data/receipts.json' assert {type: 'json'};

async function app () {
  const Api = new API(urlData)
  const data = await Api.getAllReceipts()
  const searchEngine = new Search(data)

  searchEngine.init()
}

app()
