/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'
import BaseTestHelp from '@tests/data/base-test-help.js'
// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

describe('greek-verb-participle-paradigm.test.js', () => {
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


  it('54 - checked Verb Particile Paradigm54 - ἄγοντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἄγοντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ων, -ουσα, -ον (present and future active, uncontracted)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm54')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ων, -ουσα, -ον (present and future active, uncontracted)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('55 - checked Verb Particile Paradigm55 - μενοῦν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μενοῦν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ῶν, -οῦσα, -οῦν (present and future active, ε- and ο-contract)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm55')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ῶν, -οῦσα, -οῦν (present and future active, ε- and ο-contract)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('56 - checked Verb Particile Paradigm56 - ὁρώσᾱ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὁρώσᾱ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ῶν, -ῶσα, -ῶν (present and future active, α-contract)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm56')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ῶν, -ῶσα, -ῶν (present and future active, α-contract)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('57 - checked Verb Particile Paradigm57 - λιπόν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λιπόν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ών, -οῦσα, -όν (strong aorist active; present of εἰμί and εἶμι)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm57')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ών, -οῦσα, -όν (strong aorist active; present of εἰμί and εἶμι)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('58 - checked Verb Particile Paradigm58 - λύσαντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λύσαντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ᾱς, -ᾶσα, -αν (weak aorist active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm58')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ᾱς, -ᾶσα, -αν (weak aorist active)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('59 - checked Verb Particile Paradigm59 - ἱστάντε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἱστάντε', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -άς, -ᾶσα, -άν (μι-verb present and aorist active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm59')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -άς, -ᾶσα, -άν (μι-verb present and aorist active)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('60 - checked Verb Particile Paradigm60 - λυθέντος', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λυθέντος', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -είς, -εῖσα, -έν')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm60')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -είς, -εῖσα, -έν')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('61 - checked Verb Particile Paradigm61 - διδόντοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('διδόντοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ούς, -οῦσᾰ, -όν (μι-verb active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm61')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ούς, -οῦσᾰ, -όν (μι-verb active)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('62 - checked Verb Particile Paradigm62 - δεικνύντᾰ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεικνύντᾰ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ύς, -ῦσᾰ, -ύν (μι-verb active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm62')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ύς, -ῦσᾰ, -ύν (μι-verb active)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('63 - checked Verb Particile Paradigm63 - λελοιπότων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λελοιπότων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ώς, -υῖᾰ, -ός (perfect active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm63')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ώς, -υῖᾰ, -ός (perfect active)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('64 - checked Verb Particile Paradigm64 - ἑστῶσαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἑστῶσαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ώς, -ῶσα, -ός (some athematic perfects)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm64')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ώς, -ῶσα, -ός (some athematic perfects)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('65 - checked Verb Particile Paradigm65 - πεμπομένους', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('πεμπομένους', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -μενος, -μένη, -μενον (all middle-passive and middle except perfect)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm65')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -μενος, -μένη, -μενον (all middle-passive and middle except perfect)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('66 - checked Verb Particile Paradigm66 - γεγραμμένοιν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γεγραμμένοιν', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -μένος, -μένη, -μένον (perfect middle-passive)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm66')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -μένος, -μένη, -μένον (perfect middle-passive)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })
})

