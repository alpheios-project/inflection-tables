/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import GreekViewSet from '@views/lang/greek/greek-view-set.js'
import LatinViewSet from '@views/lang/latin/latin-view-set.js'

import GreekNounView from '@views/lang/greek/noun/greek-noun-view.js'
import GreekVerbParadigmView from '@/paradigm/views/greek/verb/greek-verb-paradigm-view.js'

describe('greek-verb-paradigm.test.js', () => {
  // console.error = function () {}
  // console.log = function () {}
  // console.warn = function () {}

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
/*
  it('1 - checked Verb Paradigm1 - βουλεύῃς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλεύῃς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekVerbParadigmView',
      viewTitle: 'ω-Verbs: Present System Active',
      paradigmID: 'verbpdgm1',
      hasSuppParadigms: true,
      suppParadigms: [ 'verbpdgm54' ]
    })
  })
*/
  it('2 - GPD', async () => {
    // stage 1 ViewSetFactory.create
    //  -- new GreekViewSet()
    //  ---- this.dataset = LanguageDatasetFactory.getDataset(homonym.languageID)
    // -----------------------
    // const instance = this.instance
    // if (instance.sets.has(languageID)) {
    //   let dataset = instance.sets.get(languageID) // eslint-disable-line prefer-const
    //   if (!dataset.dataLoaded) {
    //     dataset.loadData()
    //   }
    //   return dataset
    // } 
    // -----------------------
    // const languageID = Constants.LANG_GREEK
    // const instance = LanguageDatasetFactory.instance
    
    // if (instance.sets.has(languageID)) {
    //   instance.sets.get(languageID).forEach(dataset => {
    //     if (!dataset.dataLoaded) {
    //       dataset.loadData()
    //     }
    //   })
    // }

    // console.info('instance - ', instance.sets.get(languageID))
    let words = ['οἱ', 'ἴτων', 'ἀγάγοις']
    let homonym = await BaseTestHelp.getHomonym('iam', Constants.LANG_LATIN)
    let datasets = LanguageDatasetFactory.getDatasets(Constants.LANG_LATIN)
    console.info(datasets)
    
    for (const lexeme of homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        console.info('inflection', inflection.constraints)
        datasets.forEach(dataset => {
          dataset.setInflectionData(inflection, lexeme.lemma)
          console.info('inflection', dataset.constructor.name, ' - ', inflection.constraints)
        })
        
      }
    }

    let matchingViews = []
    let views = LatinViewSet.views

    console.info('views', views)
    
    matchingViews.push(...views.reduce(
      (acc, view) => acc.concat(...view.getMatchingInstances(homonym)), []))
    
    console.info('matchingViews', matchingViews)
    // console.info('matchingViews', matchingViews.map(view => view.constructor.name + ' - ' + (view.paradigm ? view.paradigm.paradigmID : '')))
  })
})