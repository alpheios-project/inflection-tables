/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

describe('greek-verb-paradigm.test.js', () => {
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

})