/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import ViewSetFactory from '@views/lib/view-set-factory.js'
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

  async function getInflectionSet(targetWord) {
    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_GREEK,
        word: targetWord
      }
    })
  
    const testHomonym = adapterTuftsRes.result
    const inflectionsViewSet = ViewSetFactory.create(testHomonym, locale)
    return inflectionsViewSet
  }

  it('54 - checked Verb Particile Paradigm54 - ἄγοντος', async () => {
    const inflectionsViewSet = await getInflectionSet('ἄγοντος')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ων, -ουσα, -ον (present and future active, uncontracted)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm54')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ων, -ουσα, -ον (present and future active, uncontracted)')
  })

  it('55 - checked Verb Particile Paradigm55 - μενοῦν', async () => {
    const inflectionsViewSet = await getInflectionSet('μενοῦν')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ῶν, -οῦσα, -οῦν (present and future active, ε- and ο-contract)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm55')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ῶν, -οῦσα, -οῦν (present and future active, ε- and ο-contract)')
  })

  it('56 - checked Verb Particile Paradigm56 - ὁρώσᾱ', async () => {
    const inflectionsViewSet = await getInflectionSet('ὁρώσᾱ')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ῶν, -ῶσα, -ῶν (present and future active, α-contract)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm56')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ῶν, -ῶσα, -ῶν (present and future active, α-contract)')
  })

  it('57 - checked Verb Particile Paradigm57 - λιπόν', async () => {
    const inflectionsViewSet = await getInflectionSet('λιπόν')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ών, -οῦσα, -όν (strong aorist active; present of εἰμί and εἶμι)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm57')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ών, -οῦσα, -όν (strong aorist active; present of εἰμί and εἶμι)')
  })

  it('58 - checked Verb Particile Paradigm58 - λύσαντᾰ', async () => {
    const inflectionsViewSet = await getInflectionSet('λύσαντᾰ')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ᾱς, -ᾶσα, -αν (weak aorist active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm58')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ᾱς, -ᾶσα, -αν (weak aorist active)')
  })

  it('59 - checked Verb Particile Paradigm59 - ἱστάντε', async () => {
    const inflectionsViewSet = await getInflectionSet('ἱστάντε')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -άς, -ᾶσα, -άν (μι-verb present and aorist active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm59')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -άς, -ᾶσα, -άν (μι-verb present and aorist active)')
  })

  it('60 - checked Verb Particile Paradigm60 - λυθέντος', async () => {
    const inflectionsViewSet = await getInflectionSet('λυθέντος')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -είς, -εῖσα, -έν')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm60')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -είς, -εῖσα, -έν')
  })

  it('61 - checked Verb Particile Paradigm61 - διδόντοιν', async () => {
    const inflectionsViewSet = await getInflectionSet('διδόντοιν')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ούς, -οῦσᾰ, -όν (μι-verb active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm61')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ούς, -οῦσᾰ, -όν (μι-verb active)')
  })

  it('62 - checked Verb Particile Paradigm62 - δεικνύντᾰ', async () => {
    const inflectionsViewSet = await getInflectionSet('δεικνύντᾰ')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ύς, -ῦσᾰ, -ύν (μι-verb active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm62')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ύς, -ῦσᾰ, -ύν (μι-verb active)')
  })

  it('63 - checked Verb Particile Paradigm63 - λελοιπότων', async () => {
    const inflectionsViewSet = await getInflectionSet('λελοιπότων')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ώς, -υῖᾰ, -ός (perfect active)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm63')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ώς, -υῖᾰ, -ός (perfect active)')
  })

  it('64 - checked Verb Particile Paradigm64 - ἑστῶσαι', async () => {
    const inflectionsViewSet = await getInflectionSet('ἑστῶσαι')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -ώς, -ῶσα, -ός (some athematic perfects)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm64')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -ώς, -ῶσα, -ός (some athematic perfects)')
  })

  it('65 - checked Verb Particile Paradigm65 - πεμπομένους', async () => {
    const inflectionsViewSet = await getInflectionSet('πεμπομένους')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -μενος, -μένη, -μενον (all middle-passive and middle except perfect)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm65')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -μενος, -μένη, -μενον (all middle-passive and middle except perfect)')
  })

  it('66 - checked Verb Particile Paradigm66 - γεγραμμένοιν', async () => {
    const inflectionsViewSet = await getInflectionSet('γεγραμμένοιν')

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParticipleParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Participles in -μένος, -μένη, -μένον (perfect middle-passive)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm66')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Participles in -μένος, -μένη, -μένον (perfect middle-passive)')
  })
})

