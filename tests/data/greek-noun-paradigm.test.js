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

  it('5-1 - checked Verb Noun5 - κλώψ', async () => {
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

  it('5-2 - checked Verb Noun5 - κλῶπε', async () => {
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

  it('5-3 - checked Verb Noun5 - φυλάκων', async () => {
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

  it('5-4 - checked Verb Noun5 - φύλαξ', async () => {
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


  it('6-1 - checked Verb Noun6 - χάρις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χάρις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[0].cells[2].fullMatch).toBeTruthy() // χάρις
    expect(renderedTable.rows[0].cells[3].fullMatch).toBeFalsy() // ἀσπίς
    expect(renderedTable.rows[0].cells[4].fullMatch).toBeFalsy() // Ἑλλάς
  })

  it('6-2 - checked Verb Noun6 - χάριτες', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χάριτες', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // χάριτες
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // ἀσπίδες
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // Ἑλλάδες
  })

  it('6-3 - checked Verb Noun6 - ἀσπίδοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀσπίδοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // χαρίτοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeTruthy() // ἀσπίδοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // Ἑλλάδοιν
  })

  it('6-4 - checked Verb Noun6 - ἀσπίδᾰς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀσπίδᾰς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // χάριτᾰς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // ἀσπίδᾰς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // Ἑλλάδᾰς
  })

  it('6-5 - checked Verb Noun6 - Ἑλλάδᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('Ἑλλάδᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // χάριν
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // ἀσπίδᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // Ἑλλάδᾰ
  })

  it('6-6 - checked Verb Noun6 - Ἑλλάδοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('Ἑλλάδοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: dental plosive stems (masc. and fem.)',
      paradigmID: 'nounpdgm6'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // χαρίτοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // ἀσπίδοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // Ἑλλάδοιν
  })

  
  it('7-1 - checked Verb Noun7 - γέροντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γέροντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // γέροντος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γίγαντος
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ὀδόντος
  })

  it('7-2 - checked Verb Noun7 - γερόντων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γερόντων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeTruthy() // γερόντων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // γιγάντων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ὀδόντων
  })

  it('7-3 - checked Verb Noun7 - γίγαντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γίγαντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // γέροντᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // γίγαντᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // ὀδόντᾰ
  })

  it('7-4 - checked Verb Noun7 - γιγάντων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γιγάντων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // γερόντων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // γιγάντων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // ὀδόντων
  })

  it('7-5 - checked Verb Noun7 - ὀδόντοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὀδόντοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // γερόντοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // γιγάντοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // ὀδόντοιν
  })

  it('7-6 - checked Verb Noun7 - ὀδόντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὀδόντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: ντ-stems',
      paradigmID: 'nounpdgm7'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeFalsy() // γέροντος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γίγαντος
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeTruthy() // ὀδόντος
  }) 


  it('8-1 - checked Verb Noun8 - πράγματος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πράγματος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // πράγματος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // τέρατος
  })

  it('8-2 - checked Verb Noun8 - πραγμάτοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πραγμάτοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // πραγμάτοιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // τεράτοιν
  })

  it('8-3 - checked Verb Noun8 - τέρατι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τέρατι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // πράγματι
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // τέρατι
  })

  it('8-4 - checked Verb Noun8 - τεράτων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τεράτων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: neuter τ-stems',
      paradigmID: 'nounpdgm8'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πραγμάτων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // τεράτων
  })

  it('9-1 - checked Verb Noun9 - ῥήτορος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ῥήτορος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // ῥήτορος
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // δαίμονος
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // ἀγῶνος
    expect(renderedTable.rows[1].cells[5].fullMatch).toBeFalsy() // ἁλός
  })

  it('9-2 - checked Verb Noun9 - ῥήτορες', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ῥήτορες', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // ῥήτορες
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // δαίμονες
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // ἀγῶνες
    expect(renderedTable.rows[7].cells[5].fullMatch).toBeFalsy() // ἅλες
  })

  it('9-3 - checked Verb Noun9 - δαῖμον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δαῖμον', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[4].cells[2].fullMatch).toBeFalsy() // ῥῆτορ
    expect(renderedTable.rows[4].cells[3].fullMatch).toBeTruthy() // δαῖμον
    expect(renderedTable.rows[4].cells[4].fullMatch).toBeFalsy() // ἀγών
    expect(renderedTable.rows[4].cells[5].fullMatch).toBeFalsy() // ---
  })

  it('9-4 - checked Verb Noun9 - δαίμονᾰς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δαίμονᾰς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // ῥήτορᾰς
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // δαίμονᾰς
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // ἀγῶνᾰς
    expect(renderedTable.rows[10].cells[5].fullMatch).toBeFalsy() // ἅλᾰς
  })

  it('9-5 - checked Verb Noun9 - ἀγῶνᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγῶνᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // ῥήτορᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // δαίμονᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // ἀγῶνᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἅλᾰ
  })

  it('9-6 - checked Verb Noun9 - ἀγώνων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγώνων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // ῥητόρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // δαιμόνων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // ἀγώνων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἁλῶν
  })

  it('9-7 - checked Verb Noun9 - ἁλί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁλί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // ῥήτορι
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // δαίμονι
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // ἀγῶνι
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἁλί
  })

  it('9-8 - checked Verb Noun9 - ἁλοῖν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἁλοῖν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: liquid and nasal stems',
      paradigmID: 'nounpdgm9'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // ῥητόροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // δαιμόνοιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // ἀγώνοιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeTruthy() // ἁλοῖν
  })


  it('10-1 - checked Verb Noun10 - πατρί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πατρί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeTruthy() // πατρί
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μητρί
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // θυγατρί
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeFalsy() // ἀνδρί
  })

  it('10-2 - checked Verb Noun10 - πατέροιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πατέροιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeTruthy() // πατέροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // μητέροιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeFalsy() // θυγατέροιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἀνδροῖν
  })

  it('10-3 - checked Verb Noun10 - μητέρᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μητέρᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // πατέρᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeTruthy() // μητέρᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeFalsy() // θυγατέρᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἄνδρᾰ
  })

  it('10-4 - checked Verb Noun10 - μητέρων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μητέρων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πατέρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeTruthy() // μητέρων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // θυγατέρων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeFalsy() // ἀνδρῶν
  })

  it('10-5 - checked Verb Noun10 - θυγατέρᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θυγατέρᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[3].cells[2].fullMatch).toBeFalsy() // πατέρᾰ
    expect(renderedTable.rows[3].cells[3].fullMatch).toBeFalsy() // μητέρᾰ
    expect(renderedTable.rows[3].cells[4].fullMatch).toBeTruthy() // θυγατέρᾰ
    expect(renderedTable.rows[3].cells[5].fullMatch).toBeFalsy() // ἄνδρᾰ
  })

  it('10-6 - checked Verb Noun10 - θυγατέροιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('θυγατέροιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[6].cells[2].fullMatch).toBeFalsy() // πατέροιν
    expect(renderedTable.rows[6].cells[3].fullMatch).toBeFalsy() // μητέροιν
    expect(renderedTable.rows[6].cells[4].fullMatch).toBeTruthy() // θυγατέροιν
    expect(renderedTable.rows[6].cells[5].fullMatch).toBeFalsy() // ἀνδροῖν
  })

  it('10-7 - checked Verb Noun10 - ἀνδρί', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀνδρί', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // πατρί
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeFalsy() // μητρί
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // θυγατρί
    expect(renderedTable.rows[2].cells[5].fullMatch).toBeTruthy() // ἀνδρί
  })

  it('10-8 - checked Verb Noun10 - ἀνδρῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀνδρῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(3)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[2],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: irregular ρ-stems',
      paradigmID: 'nounpdgm10'
    })

    const renderedTable = inflectionsViewSet.matchingViews[2].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // πατέρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // μητέρων
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeFalsy() // θυγατέρων
    expect(renderedTable.rows[8].cells[5].fullMatch).toBeTruthy() // ἀνδρῶν
  })

  it('11-1 - checked Verb Noun11 - τριήρους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τριήρους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[1].cells[2].fullMatch).toBeTruthy() // τριήρους
    expect(renderedTable.rows[1].cells[3].fullMatch).toBeFalsy() // γένους
    expect(renderedTable.rows[1].cells[4].fullMatch).toBeFalsy() // γέρως
  })

  it('11-2 - checked Verb Noun11 - τριήρεις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τριήρεις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeTruthy() // τριήρεις
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // γένη
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // γέρᾱ
  })

  it('11-3 - checked Verb Noun11 - γένει', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γένει', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[2].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[2].cells[3].fullMatch).toBeTruthy() // γένει
    expect(renderedTable.rows[2].cells[4].fullMatch).toBeFalsy() // γέρᾳ

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // γένει
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // γέρᾳ
  })

  it('11-4 - checked Verb Noun11 - γένη', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γένη', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeTruthy() // γένει
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeFalsy() // γέρᾳ

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeTruthy() // γένη
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeFalsy() // γέρᾱ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeTruthy() // γένη
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeFalsy() // γέρᾱ
  })

  it('11-5 - checked Verb Noun11 - γέρᾱ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γέρᾱ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[0],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[0].render().wideTable

    expect(renderedTable.rows[5].cells[2].fullMatch).toBeFalsy() // τριήρει
    expect(renderedTable.rows[5].cells[3].fullMatch).toBeFalsy() // γένει
    expect(renderedTable.rows[5].cells[4].fullMatch).toBeTruthy() // γέρᾳ

    expect(renderedTable.rows[7].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[7].cells[3].fullMatch).toBeFalsy() // γένη
    expect(renderedTable.rows[7].cells[4].fullMatch).toBeTruthy() // γέρᾱ

    expect(renderedTable.rows[10].cells[2].fullMatch).toBeFalsy() // τριήρεις
    expect(renderedTable.rows[10].cells[3].fullMatch).toBeFalsy() // γένη
    expect(renderedTable.rows[10].cells[4].fullMatch).toBeTruthy() // γέρᾱ
  })

  it('11-6 - checked Verb Noun11 - γερῶν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γερῶν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews.map(view => view.constructor.name))

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    BaseTestHelp.checkParadigm({
      view: inflectionsViewSet.matchingViews[1],
      viewName: 'GreekNounParadigmView',
      viewTitle: 'Consonant-Declension Nouns: σ-stems',
      paradigmID: 'nounpdgm11'
    })

    const renderedTable = inflectionsViewSet.matchingViews[1].render().wideTable

    expect(renderedTable.rows[8].cells[2].fullMatch).toBeFalsy() // τριήρων
    expect(renderedTable.rows[8].cells[3].fullMatch).toBeFalsy() // γενῶν
    expect(renderedTable.rows[8].cells[4].fullMatch).toBeTruthy() // γερῶν
  })
})