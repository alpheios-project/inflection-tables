/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('greek-pronoun-paradigm.test.js', () => {
  
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

  it('1-1 - checked Pronoun1 - ἐμοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐμοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἐμοῦ
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μου
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // σοῦ
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // σου

  })

  it('1-2 - checked Pronoun1 - νῷν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νῷν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // νῷν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // σφῷν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // 
  })

  it('1-3 - checked Pronoun1 - ἡμῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἡμῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeTruthy() // ἡμῖν
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[9].cells[4].fullMatch).toBeFalsy() // ὑμῖν
    expect(renderedTable.rows[9].cells[5].fullMatch).toBeFalsy() // 
  })

  it('1-4 - checked Pronoun1 - σοί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σοί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἐμοί
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // μοι
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // σοί
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // σοι
  })

  it('1-5 - checked Pronoun1 - σφῷν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σφῷν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // νῷν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // σφῷν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // 
  })

  it('1-6 - checked Pronoun1 - ὑμᾶς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὑμᾶς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ἡμᾶς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // 
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // ὑμᾶς
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // 
  })

  it('1-7 - checked Pronoun1 - σου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('σου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἐμοῦ
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μου
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // σοῦ
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // σου
  })

  it('1-8 - checked Pronoun1 - με', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('με', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekPronounParadigmView',
      viewTitle: 'Personal Pronouns (First and Second Person)',
      paradigmID: 'pronpdgm1'
    })


    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ἐμέ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // με
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // σέ
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // σε
  })
})