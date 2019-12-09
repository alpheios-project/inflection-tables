/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import ViewSetFactory from '@views/lib/view-set-factory.js'
// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

describe('greek-views.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const locale = "en-US"
  beforeAll(async () => {
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  async function getInflectionSet(targetWord) {
    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: targetWord
      }
    })
  
    const testHomonym = adapterTuftsRes.result
    const inflectionsViewSet = ViewSetFactory.create(testHomonym, locale)
    return inflectionsViewSet
  }

  it('1 - checked Greek Views - πᾶσι - GreekNounView, GreekNounSimplifiedView, GreekAdjectiveView, GreekAdjectiveSimplifiedView', async () => {
    const inflectionsViewSet = await getInflectionSet('πᾶσι')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekNounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Noun declension')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekNounSimplifiedView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Noun declension (simplified)')

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('GreekAdjectiveView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Adjective declension')

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('GreekAdjectiveSimplifiedView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Adjective declension (simplified)')
  })

  it('2 - checked Greek Views - οἱ - GreekArticleView, GreekGenderPronounView, GreekPersonPronounView', async () => {
    const inflectionsViewSet = await getInflectionSet('οἱ')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekArticleView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Article Declension')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekGenderPronounView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Relative Pronoun Declension')

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('GreekPersonPronounView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Personal Pronoun Declension')
  })

  it('3 - checked Greek Views - αὐτὴν - GreekGenderPronounView', async () => {
    const inflectionsViewSet = await getInflectionSet('αὐτὴν')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekGenderPronounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Intensive Pronoun Declension')
  })

  it('4 - checked Greek Views - φυήν - GreekNounView, GreekNounSimplifiedView', async () => {
    const inflectionsViewSet = await getInflectionSet('φυήν')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekNounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Noun declension')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekNounSimplifiedView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Noun declension (simplified)')
  })

  it('5 - checked Greek Views - τις - GreekGenderPronounView', async () => {
    const inflectionsViewSet = await getInflectionSet('τις')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekGenderPronounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Indefinite Pronoun Declension')
  })

  it('6 - checked Greek Views - ὅδε - GreekGenderPronounView', async () => {
    const inflectionsViewSet = await getInflectionSet('ὅδε')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekLemmaGenderPronounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Demonstrative Pronoun Declension')
  })
})
