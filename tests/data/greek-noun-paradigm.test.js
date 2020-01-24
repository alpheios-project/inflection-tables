/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'
describe('greek-noun-paradigm.test.js', () => {
  
  // console.error = function () {}
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


  it('1-1 - checked Verb Noun1 - βουλεύῃς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄνθρωπος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Omicron-Declension Nouns',
      paradigmID: 'nounpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // βουλεύεις
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // βουλεύῃς

  })

  it('1-2 - checked Verb Noun1 - ἔργον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔργον', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Omicron-Declension Nouns',
      paradigmID: 'nounpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    console.info('renderedTable.rows[1].cells - ', renderedTable.rows[0])

    expect(renderedTable.rows[0].cells[3].fullMatch).toBeTruthy() // ἔργον
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἔργον
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἔργῳ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // ἔργον
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // ἔργον
  })

})