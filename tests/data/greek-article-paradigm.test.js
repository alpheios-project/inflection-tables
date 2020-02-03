/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('greek-article-paradigm.test.js', () => {
  
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

  it('1-1 - checked Article1 - τήν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τήν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekArticleParadigmView',
      viewTitle: 'The Definite Article',
      paradigmID: 'artpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // τόν
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // τήν
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // τό
  })

  it('1-2 - checked Article1 - τοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekArticleParadigmView',
      viewTitle: 'The Definite Article',
      paradigmID: 'artpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // τοῦ
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // τῆς
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeTruthy() // τοῦ
  })

  it('1-3 - checked Article1 - τοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekArticleParadigmView',
      viewTitle: 'The Definite Article',
      paradigmID: 'artpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // τοῖν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // τοῖν, ταῖν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // τοῖν
  })

  it('1-4 - checked Article1 - τοῖς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τοῖς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekArticleParadigmView',
      viewTitle: 'The Definite Article',
      paradigmID: 'artpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeTruthy() // τοῖς
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // ταῖς
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeTruthy() // τοῖς
  })

  it('1-5 - checked Article1 - αἱ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('αἱ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekArticleParadigmView',
      viewTitle: 'The Definite Article',
      paradigmID: 'artpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // οἱ
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // αἱ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // τά
  })

  it('1-6 - checked Article1 - τά', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τά', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekArticleParadigmView',
      viewTitle: 'The Definite Article',
      paradigmID: 'artpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τώ
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // τώ, τά
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // τώ

    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // τά
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // τά
  })
})