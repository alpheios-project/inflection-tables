import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import ViewSetFactory from '@views/lib/view-set-factory.js'

export default class BaseTestHelp {
  static async getInflectionSet(targetWord, languageID) {
    const locale = "en-US"
    
    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: languageID,
        word: targetWord
      }
    })
      
    const testHomonym = adapterTuftsRes.result
    const inflectionsViewSet = ViewSetFactory.create(testHomonym, locale)
    return inflectionsViewSet
  }
}