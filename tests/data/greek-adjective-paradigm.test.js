/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('greek-adjective-paradigm.test.js', () => {
  
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


  it('1-1 - checked Adjective1 - ἀξίου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    // console.info('renderedTable - ', renderedTable.rows[2].cells)
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // ἀξίου
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἀξίου

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἀγαθοῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀγαθῆς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // ἀγαθοῦ
  })

  it('1-2 - checked Adjective1 - ἀξίοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // ἀξίοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἀξίαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ἀξίοιν

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἀγαθοῖν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() // ἀγαθαῖν
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeFalsy() // ἀγαθοῖν

  })

  it('1-3 - checked Adjective1 - ἀξίους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[12].cells[2].fullMatch).toBeTruthy() // ἀξίους
    expect(renderedTable.rows[12].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[12].cells[4].fullMatch).toBeFalsy() // ἄξιᾰ

    expect(renderedTable.rows[12].cells[5].fullMatch).toBeFalsy() // ἀγαθούς
    expect(renderedTable.rows[12].cells[6].fullMatch).toBeFalsy() // ἀγαθούς
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeFalsy() // ἀγαθά
  })

  it('1-4 - checked Adjective1 - ἀξίᾱν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίᾱν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἄξιον
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // ἀξίᾱν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἀγαθόν
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeFalsy() // ἀγαθήν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // ἀγαθόν
  })

  it('1-5 - checked Adjective1 - ἀξίων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(4)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[3],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[3].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // ἄξιον
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // ἀξίᾱν
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // ἄξιον

    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // ἀγαθόν
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeFalsy() // ἀγαθήν
    expect(renderedTable.rows[10].cells[7].fullMatch).toBeFalsy() // ἀγαθόν
  })

  it('1-6 - checked Adjective1 - ἀξίω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeTruthy() // ἀξίου
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἀξίου

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἀγαθοῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀγαθῆς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeFalsy() // ἀγαθοῦ

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἀξίω
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // ἀξίᾱ
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // ἀξίω

    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // ἀγαθώ
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeFalsy() // ἀγαθά
    expect(renderedTable.rows[7].cells[7].fullMatch).toBeFalsy() // ἀγαθώ
  })

  it('1-7 - checked Adjective1 - ἀξίοις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀξίοις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeTruthy() // ἀξίοις
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeFalsy() // ἀξίαις
    expect(renderedTable.rows[11].cells[4].fullMatch).toBeTruthy() // ἀξίοις

    expect(renderedTable.rows[11].cells[5].fullMatch).toBeFalsy() // ἀγαθοῖς
    expect(renderedTable.rows[11].cells[6].fullMatch).toBeFalsy() // ἀγαθαῖς
    expect(renderedTable.rows[11].cells[7].fullMatch).toBeFalsy() // ἀγαθοῖς
  })

  it('1-8 - checked Adjective1 - ἀγαθοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἀξίου
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀξίᾱς
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ἀξίου

    expect(renderedTable.rows[3].cells[5].fullMatch).toBeTruthy() // ἀγαθοῦ
    expect(renderedTable.rows[3].cells[6].fullMatch).toBeFalsy() // ἀγαθῆς
    expect(renderedTable.rows[3].cells[7].fullMatch).toBeTruthy() // ἀγαθοῦ
  })

  it('1-9 - checked Adjective1 - ἀγαθοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἀξίοιν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // ἀξίαιν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ἀξίοιν

    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // ἀγαθοῖν
    expect(renderedTable.rows[8].cells[6].fullMatch).toBeFalsy() // ἀγαθαῖν
    expect(renderedTable.rows[8].cells[7].fullMatch).toBeTruthy() // ἀγαθοῖν
  })

  it('1-10 - checked Adjective1 - ἀγαθήν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθήν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // ἄξιον
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // ἀξίᾱν
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[5].cells[5].fullMatch).toBeFalsy() // ἀγαθόν
    expect(renderedTable.rows[5].cells[6].fullMatch).toBeTruthy() // ἀγαθήν
    expect(renderedTable.rows[5].cells[7].fullMatch).toBeFalsy() // ἀγαθόν
  })

  it('1-11 - checked Adjective1 - ἀγαθῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ἄξιον
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // ἀξίᾱν
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[10].cells[5].fullMatch).toBeTruthy() // ἀγαθόν
    expect(renderedTable.rows[10].cells[6].fullMatch).toBeTruthy() // ἀγαθήν
    expect(renderedTable.rows[10].cells[7].fullMatch).toBeTruthy() // ἀγαθόν
  })

  it('1-12 - checked Adjective1 - ἀγαθῷ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθῷ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ἀξίῳ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeFalsy() // ἀξίᾳ
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // ἀξίῳ

    expect(renderedTable.rows[4].cells[5].fullMatch).toBeTruthy() // ἀγαθῷ
    expect(renderedTable.rows[4].cells[6].fullMatch).toBeFalsy() // ἀγαθῇ
    expect(renderedTable.rows[4].cells[7].fullMatch).toBeTruthy() // ἀγαθῷ
  })

  it('1-13 - checked Adjective1 - ἀγαθά', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαθά', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Three Endings',
      paradigmID: 'adjpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ἄξιος
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἀξίᾱ
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἄξιον

    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ἀγαθός
    expect(renderedTable.rows[2].cells[6].fullMatch).toBeTruthy() // ἀγαθή
    expect(renderedTable.rows[2].cells[7].fullMatch).toBeFalsy() // ἀγαθόν

    expect(renderedTable.rows[6].cells[6].fullMatch).toBeTruthy() // ἀγαθή
    expect(renderedTable.rows[7].cells[6].fullMatch).toBeTruthy() // ἀγαθά
    expect(renderedTable.rows[9].cells[7].fullMatch).toBeTruthy() // ἀγαθά
    expect(renderedTable.rows[12].cells[7].fullMatch).toBeTruthy() // ἀγαθά
  })

  it('2-1 - checked Adjective2 - ἀδίκου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀδίκου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ἀδίκου
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // ἀδίκου

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ἀδίκῳ
  })

  it('2-2 - checked Adjective2 - ἀδίκων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀδίκων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[9].cells[2].fullMatch).toBeTruthy() // ἀδίκων
    expect(renderedTable.rows[9].cells[3].fullMatch).toBeTruthy() // ἀδίκων

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ἀδίκοις
  })

  it('2-3 - checked Adjective2 - ἀδίκοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀδίκοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ἀδίκοιν
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // ἀδίκοιν

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἄδικοι
  })

  it('2-4 - checked Adjective2 - ἄδικᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄδικᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekAdjectiveParadigmView',
      viewTitle: 'Vowel-Declension Adjectives with Two Endings',
      paradigmID: 'adjpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ἄδικοι
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // ἄδικᾰ

    expect(renderedTable.rows[11].cells[2].fullMatch).toBeFalsy() // ἀδίκους
    expect(renderedTable.rows[11].cells[3].fullMatch).toBeTruthy() // ἀδίκους
  })
})