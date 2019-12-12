/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

import BaseTestHelp from '@tests/data/base-test-help.js'

describe('latin-views.test.js', () => {
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

  it('1 - checked Latin Views - curru - LatinNounView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('curru', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinNounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Noun declension')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
  })

  it('2 - checked Latin Views - nitido - LatinAdjectiveView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('nitido', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinAdjectiveView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Adjective declension')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
  })

  it('3 - checked Latin Views - iugandis - LatinVerbParticipleView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('iugandis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbParticipleView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participle')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
  })

  it('4 - checked Latin Views - servet - Latin Verb Conjugation', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('servet', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(6)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)
  })

  it('5 - checked Latin Views - cecinisse - Latin Verb Conjugation Infinitive', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('cecinisse', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinInfinitiveView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Infinitive')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('6 - checked Latin Views - marita - Latin Verb Conjugation Imperative', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('marita', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])

    expect(inflectionsViewSet.matchingViews.length).toEqual(9)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinNounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Noun declension')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinAdjectiveView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Adjective declension')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinImperativeView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Imperative')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[7].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[7].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[7].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[8].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[8].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[8].linkedViews.length).toEqual(0)
  })

  it('7 - checked Latin Views - cursu - LatinSupineView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('cursu', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(2)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinNounView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Noun declension')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinSupineView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Supine')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)
  })

  it('8 - checked Latin Views - colendi - LatinVerbParticipleView', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('colendi', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbParticipleView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participle')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
  })

  it('9 - checked Latin Views - iam - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('iam', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('10 - checked Latin Views - sum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('sum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(8)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinImperativeView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Imperative')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[1].additionalTitle).toEqual('sum, esse,fui,futurus')
    
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[1].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[1].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[7].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[7].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[7].linkedViews.length).toEqual(0)
    
  })

  it('11 - checked Latin Views - possum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('possum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('possum, posse,potui,-')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('12 - checked Latin Views - volui - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('volui', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[1])

    expect(inflectionsViewSet.matchingViews.length).toEqual(8)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinInfinitiveView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Infinitive')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[1].additionalTitle).toEqual('volo, velle,volui,-')
    
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[1].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[1].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[7].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[7].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[7].linkedViews.length).toEqual(0)
    
  })

  it('13 - checked Latin Views - nolo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('nolo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('nolo, nolle,nolui,-')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('14 - checked Latin Views - maluerimus - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('maluerimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('malo, malle,malui,-')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('15 - checked Latin Views - tuleritis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('tuleritis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularVoiceView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular, with Voice Data)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('fero, ferre,tuli,latus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')
    
    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('16 - checked Latin Views - tuleritis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('tuleritis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularVoiceView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular, with Voice Data)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('fero, ferre,tuli,latus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('17 - checked Latin Views - veneo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('veneo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('veneo, venire,venivi(ii),venitus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('18 - checked Latin Views - ineo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ineo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularVoiceView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular, with Voice Data)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('ineo, inire,inivi(ii),initus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('19 - checked Latin Views - adeo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('adeo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularVoiceView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular, with Voice Data)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('adeo, adire,adivi(ii),aditus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('20 - checked Latin Views - nequeo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('nequeo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('nequeo, nequire,nequivi(ii),nequitus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('21 - checked Latin Views - queo - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('queo', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularVoiceView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular, with Voice Data)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('queo, quire,quivi(ii),quitus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].constructor.name).toEqual('LatinVerbSupineIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[1].title).toEqual('Verb Supine Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('22 - checked Latin Views - praefuistis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('praefuistis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('praesum, praeesse,praefui,praefuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('23 - checked Latin Views - obsum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('obsum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('obsum, obesse,obfui,obfuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('24 - checked Latin Views - inerimus - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('inerimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('insum, inesse,infui,infuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('25 - checked Latin Views - supersum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('supersum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('supersum, superesse,superfui,superfuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('26 - checked Latin Views - subsum - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('subsum', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('subsum, subesse,subfui,subfuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('27 - checked Latin Views - adfuimus - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('adfuimus', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('adsum, adesse,adfui,adfuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('28 - checked Latin Views - afueras - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('afueras', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('absum, abesse,afui,afuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })

  it('29 - checked Latin Views - proderitis - Latin Verb Conjugation Irregular', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('proderitis', Constants.LANG_LATIN)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)

    expect(inflectionsViewSet.matchingViews.length).toEqual(7)
    
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('LatinVerbIrregularView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(inflectionsViewSet.matchingViews[0].additionalTitle).toEqual('prosum, prodesse,profui,profuturus')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].constructor.name).toEqual('LatinVerbParticipleIrregularView')
    expect(inflectionsViewSet.matchingViews[0].linkedViews[0].title).toEqual('Verb Participle Conjugation (Irregular)')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('LatinVoiceConjugationMoodView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('LatinVoiceMoodConjugationView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[3].constructor.name).toEqual('LatinConjugationVoiceMoodView')
    expect(inflectionsViewSet.matchingViews[3].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[3].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[4].constructor.name).toEqual('LatinConjugationMoodVoiceView')
    expect(inflectionsViewSet.matchingViews[4].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[4].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[5].constructor.name).toEqual('LatinMoodVoiceConjugationView')
    expect(inflectionsViewSet.matchingViews[5].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[5].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[6].constructor.name).toEqual('LatinMoodConjugationVoiceView')
    expect(inflectionsViewSet.matchingViews[6].title).toEqual('Verb Conjugation')
    expect(inflectionsViewSet.matchingViews[6].linkedViews.length).toEqual(0)
  })
})
