/* eslint-env jest */
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

  static checkParadigm(data) {
    expect(data.view.constructor.name).toEqual(data.viewName)
    expect(data.view.title).toEqual(data.viewTitle)
    expect(data.view.paradigm).toBeDefined()
    expect(data.view.paradigm.paradigmID).toEqual(data.paradigmID)
    expect(data.view.paradigm.title).toEqual(data.viewTitle)

    expect(data.view.linkedViews.length).toEqual(0)

    if (!data.hasSuppParadigms) {
      expect(data.view.hasSuppParadigms).toBeFalsy()
    } else {
      expect(data.view.hasSuppParadigms).toBeTruthy()
      data.suppParadigms.forEach((paradigmID, paradigmIndex) => {
        expect(data.view.suppParadigms[paradigmIndex].paradigmID).toEqual(paradigmID)
      })
    }
  }
}
