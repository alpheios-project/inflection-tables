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
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Omicron-Declension Nouns',
      paradigmID: 'nounpdgm1'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    // console.info('renderedTable.rows[1].cells - ', renderedTable.rows[0])

    expect(renderedTable.rows[0].cells[3].fullMatch).toBeTruthy() // ἔργον
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // ἔργον
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // ἔργῳ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // ἔργον
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // ἔργον
  })

  it('2-1 - checked Verb Noun2 - χώρᾱς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χώρᾱς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // χώρᾱς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γνώμης

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeTruthy() // χώρᾱς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // γνώμᾱς
  })

  it('2-2 - checked Verb Noun2 - χώραιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χώραιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // χώραιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // γνώμαιν
  })

  it('2-3 - checked Verb Noun2 - γνωμῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνωμῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // χωρῶν
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // γνωμῶν
  })

  it('2-4 - checked Verb Noun2 - γνώμην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνώμην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: long-vowel feminines',
      paradigmID: 'nounpdgm2'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // χώρᾱν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // γνώμην
  })

  it('3-1 - checked Verb Noun3 - ὑγιείᾳ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὑγιείᾳ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // θαλάττῃ
    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // ὑγιείᾳ
    
  })

  it('3-2 - checked Verb Noun3 - ὑγιείαιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὑγιείαιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // θαλάτταιν
    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // ὑγιείαιν
    
  })

  it('3-3 - checked Verb Noun3 - θάλαττᾰν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θάλαττᾰν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ὑγίειᾰν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // θάλαττᾰν
    
  })

  it('3-4 - checked Verb Noun3 - θαλάττᾱς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θαλάττᾱς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: short-vowel feminines',
      paradigmID: 'nounpdgm3'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // ὑγιείᾱς
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeTruthy() // θαλάττης
    
    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ὑγιείᾱς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // θαλάττᾱς
  })

  it('4-1 - checked Verb Noun4 - νεανίου', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεανίου', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // νεανίου
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // στρατιώτου
  })

  it('4-2 - checked Verb Noun4 - νεανίαιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('νεανίαιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // νεανίαιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // στρατιώταιν
  })

  it('4-3 - checked Verb Noun4 - στρατιώτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('στρατιώτην', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // στρατιώτην
    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // νεανίᾱν
  })

  it('4-4 - checked Verb Noun4 - στρατιώταις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('στρατιώταις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Alpha-Declension Nouns: masculines',
      paradigmID: 'nounpdgm4'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[9].cells[3].fullMatch).toBeTruthy() // στρατιώταις
    expect(renderedTable.rows[9].cells[2].fullMatch).toBeFalsy() // νεανίαις
  })

  it('5-1 - checked Verb Noun4 - κλώψ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('κλώψ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // κλώψ
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // φύλαξ
    expect(renderedTable.rows[4].cells[2].fullMatch).toBeTruthy() // κλώψ
  })

  it('5-2 - checked Verb Noun4 - κλῶπε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('κλῶπε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeTruthy() // κλῶπε
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // φύλακε
  })

  it('5-3 - checked Verb Noun4 - φυλάκων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φυλάκων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // φυλάκων
    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // κλωπῶν
  })

  it('5-4 - checked Verb Noun4 - φύλαξ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φύλαξ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: labial and velar plosive stems',
      paradigmID: 'nounpdgm5'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[0].cells[3].fullMatch).toBeTruthy() // φύλαξ
    expect(renderedTable.rows[0].cells[2].fullMatch).toBeFalsy() // κλώψ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // φύλαξ
  })
})