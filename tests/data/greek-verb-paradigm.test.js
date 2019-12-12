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

    // console.info('inflectionsViewSet.matchingViews - ', inflectionsViewSet.matchingViews[0])
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('ω-Verbs: Present System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm1')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('ω-Verbs: Present System Active')
    
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm54')
  })

  it('2 - checked Verb Paradigm2 - βουλευέσθων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλευέσθων', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('ω-Verbs: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm2')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('ω-Verbs: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('3 - no matches - checked Verb Paradigm3', async () => {
   
  })

  it('4, 8, 9 - checked Verb Paradigm4, 8, 9 - βουλεύσω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλεύσω', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Weak (1st) Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm8')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Weak (1st) Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm58')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Future System (Active and Middle) with contraction in -έω')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm4')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Future System (Active and Middle) with contraction in -έω')
    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(2)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm55')
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[1].paradigmID).toEqual('verbpdgm65')

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('Weak (1st) Aorist System Middle')
    expect(inflectionsViewSet.matchingViews[2].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[2].paradigm.paradigmID).toEqual('verbpdgm9')
    expect(inflectionsViewSet.matchingViews[2].paradigm.title).toEqual('Weak (1st) Aorist System Middle')
    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[2].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[2].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('5 - no matchesx - checked Verb Paradigm5', async () => {
  })

  it('6 - checked Verb Paradigm6 - ἀγάγοις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγάγοις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Strong (2nd) Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm6')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Strong (2nd) Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm57')
  })

  it('7 - checked Verb Paradigm7 - ἀγαγοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἀγαγοῦ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Strong (2nd) Aorist System Middle')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm7')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Strong (2nd) Aorist System Middle')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('10 - checked Verb Paradigm10 - βουλευθῇς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βουλευθῇς', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Aorist Passive System')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm10')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Aorist Passive System')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm60')
  })

  it('11 - checked Verb Paradigm11 - λελοίπῃ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('λελοίπῃ', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Perfect Active System')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm11')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Perfect Active System')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm63')
  })

  it('12 - checked Verb Paradigm12 - γέγραψαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γέγραψαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Perfect System Middle-Passive: indicative, infinitive, participle')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm12')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Perfect System Middle-Passive: indicative, infinitive, participle')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('13, 14 - checked Verb Paradigm13, 14 - μεμνῶμαι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('μεμνῶμαι', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Perfect System Middle-Passive: periphrastic subjunctive, optative, imperative')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm13')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Perfect System Middle-Passive: periphrastic subjunctive, optative, imperative')   

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
    
    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Perfect System Middle-Passive: simple subjunctive, optative, imperative')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm14')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Perfect System Middle-Passive: simple subjunctive, optative, imperative')  

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeFalsy()
  })

  it('15 - checked Verb Paradigm15 - ἐγέγραψο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐγέγραψο', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Pluperfect Middle-Passive Indicative')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm15')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Pluperfect Middle-Passive Indicative')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeFalsy()
  })

  it('16 - checked Verb Paradigm16 - τεθνήξεις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τεθνήξεις', Constants.LANG_GREEK)

    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Future Perfect Indicative, Infinitive, Participle')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm16')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Future Perfect Indicative, Infinitive, Participle')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('17 - checked Verb Paradigm17 - ἕσταθι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἕσταθι', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Athematic Perfects - ἵστημι (in addition to forms from ἕστηκα)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm17')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Athematic Perfects - ἵστημι (in addition to forms from ἕστηκα)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm64')
  })

  it('17b - checked Verb Paradigm17b - τέθνατον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τέθνατον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Athematic Perfects - θνῄσκω (in addition to forms from τέθνηκα)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm17b')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Athematic Perfects - θνῄσκω (in addition to forms from τέθνηκα)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm64')
  })

  it('17c - checked Verb Paradigm17c - δέδιμεν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδιμεν', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm64')
  })

  it('18 - checked Verb Paradigm18 - ποιεῖτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ποιεῖτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Active of Contract Verbs in -έω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm18')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -έω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm55')
  })

  it('19 - checked Verb Paradigm19 - ἔπλει', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔπλει', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Active of Contract Verbs in -έω (monosyllabic stems)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm19')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -έω (monosyllabic stems)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm54')
  })

  it('20, 27 - checked Verb Paradigm20, 27 - ἐποιοῦ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐποιοῦ', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Middle-Passive of Contract Verbs in -έω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm20')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -έω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Present System Middle-Passive of Contract Verbs in -όω')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm27')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -όω')

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('20, 21 - checked Verb Paradigm 20, 21 - ἐδέοντο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδέοντο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Middle-Passive of Contract Verbs in -έω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm20')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -έω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm21')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)')

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('22 - checked Verb Paradigm 22 - ὁρᾷς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ὁρᾷς', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Active of Contract Verbs in -άω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm22')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -άω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm56')
  })

  it('22, 23 - checked Verb Paradigm 22, 23 - χρῷμεν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρῷμεν', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Active of Contract Verbs in -άω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm22')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -άω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm56')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Present System Active of Contract Verbs in -άω (with η contraction)')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm23')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Present System Active of Contract Verbs in -άω (with η contraction)')

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)
    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm56')
  })

  it('24 - checked Verb Paradigm 24 - ἑωρᾶσθον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἑωρᾶσθον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Middle-Passive of Contract Verbs in -άω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm24')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -άω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('24, 25 - checked Verb Paradigm 24, 25 - χρῷντο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('χρῷντο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Present System Middle-Passive of Contract Verbs in -άω')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm24')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -άω')

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm65')

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Middle-Passive of Contract Verbs in -άω  (with η contraction)')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm25')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -άω  (with η contraction)')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('26 - checked Verb Paradigm 26 - δηλοῖς', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δηλοῖς', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Active of Contract Verbs in -όω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm26')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -όω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm55')
  })

  it('27 - checked Verb Paradigm 27 - δηλοῦσθον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δηλοῦσθον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('Present System Middle-Passive of Contract Verbs in -όω')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm27')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -όω')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('28 - checked Verb Paradigm 28 - ἐτιθέτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐτιθέτην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('τίθημι: Present System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm28')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('τίθημι: Present System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm60')
  })

  it('29 - checked Verb Paradigm 29 - τιθέσθων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('τιθέσθων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('τίθημι: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm29')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('τίθημι: Present System Middle-Passive')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('30 - checked Verb Paradigm 30 - ἔθεσαν', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔθεσαν', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('τίθημι: Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm30')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('τίθημι: Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm60')
  })

  it('31 - checked Verb Paradigm 31 - ἐθέμεθα', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐθέμεθα', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('τίθημι: Aorist System Middle')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm31')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('τίθημι: Aorist System Middle')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('32 - no matches - checked Verb Paradigm 32', async () => {
  })

  it('33 - no matches - checked Verb Paradigm 33', async () => {
  })

  it('34 - no matches - checked Verb Paradigm 34', async () => {
  })

  it('35 - no matches - checked Verb Paradigm 35', async () => {
  })

  it('36 - checked Verb Paradigm 36 - διδῷ', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('διδῷ', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δίδωμι: Present System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm36')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δίδωμι: Present System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm61')
  })

  it('37 - checked Verb Paradigm 37 - διδοῖο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('διδοῖο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δίδωμι: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm37')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δίδωμι: Present System Middle-Passive')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('38 - checked Verb Paradigm 38 - ἔδοτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔδοτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δίδωμι: Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm38')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δίδωμι: Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm61')
  })

  it('39 - checked Verb Paradigm 39 - δῶται', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δῶται', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('δίδωμι: Aorist System Middle')
    expect(inflectionsViewSet.matchingViews[2].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[2].paradigm.paradigmID).toEqual('verbpdgm39')
    expect(inflectionsViewSet.matchingViews[2].paradigm.title).toEqual('δίδωμι: Aorist System Middle')

    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[2].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[2].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('40, 22 - checked Verb Paradigm 40, 22 - ἱστάτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἱστάτην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('ἵστημι: Present System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm40')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('ἵστημι: Present System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm59')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('Present System Active of Contract Verbs in -άω')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm22')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('Present System Active of Contract Verbs in -άω')

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm56')
  })

  it('41 - checked Verb Paradigm 41 - ἵσταται', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἵσταται', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('ἵστημι: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm41')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('ἵστημι: Present System Middle-Passive')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('42 - checked Verb Paradigm 42 - ἐστήτην', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐστήτην', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('ἵστημι: (Athematic/Intransitive) Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm42')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('ἵστημι: (Athematic/Intransitive) Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm59')
  })

  it('43 - checked Verb Paradigm 43 - ἐδύνατο', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδύνατο', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δύναμαι: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm43')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δύναμαι: Present System Middle-Passive')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('43b - checked Verb Paradigm 43b - ἐπίστησθε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐπίστησθε', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('ἐπίσταμαι: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm43b')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('ἐπίσταμαι: Present System Middle-Passive')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('44 - checked Verb Paradigm 44 - ἐδείκνῠτε', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδείκνῠτε', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δείκνυμι: Present System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm44')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δείκνυμι: Present System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm62')
  })

  it('45 - checked Verb Paradigm 45 - δείκνῠται', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δείκνῠται', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δείκνυμι: Present System Middle-Passive')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm45')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δείκνυμι: Present System Middle-Passive')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm65')
  })

  it('46 - checked Verb Paradigm 46 - ἔστων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔστων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('εἰμί (be): Present System and Future')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm46')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('εἰμί (be): Present System and Future')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(2)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm57')
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[1].paradigmID).toEqual('verbpdgm65')
  })

  it('47 - checked Verb Paradigm 47 - ἴτων', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἴτων', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(3)

    expect(inflectionsViewSet.matchingViews[2].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[2].title).toEqual('εἶμι (go): Present System')
    expect(inflectionsViewSet.matchingViews[2].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[2].paradigm.paradigmID).toEqual('verbpdgm47')
    expect(inflectionsViewSet.matchingViews[2].paradigm.title).toEqual('εἶμι (go): Present System')

    expect(inflectionsViewSet.matchingViews[2].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[2].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[2].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[2].suppParadigms[0].paradigmID).toEqual('verbpdgm57')
  })

  it('48 - checked Verb Paradigm 48 - φαίης', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαίης', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('φημί: Present System')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('φημί: Present System')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm59')
  })

  it('49 - checked Verb Paradigm 49 - βήτω', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('βήτω', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('βαίνω: Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm49')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('βαίνω: Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm59')
  })

  it('50, 51 - checked Verb Paradigm 50, 51 - γνῶτον', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('γνῶτον', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(2)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('γιγνώσκω: Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm50')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('γιγνώσκω: Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm61')

    expect(inflectionsViewSet.matchingViews[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[1].title).toEqual('ἁλίσκομαι: Aorist System')
    expect(inflectionsViewSet.matchingViews[1].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[1].paradigm.paradigmID).toEqual('verbpdgm51')
    expect(inflectionsViewSet.matchingViews[1].paradigm.title).toEqual('ἁλίσκομαι: Aorist System')

    expect(inflectionsViewSet.matchingViews[1].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[1].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[1].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[1].suppParadigms[0].paradigmID).toEqual('verbpdgm61')
  })

  it('52 - checked Verb Paradigm 52 - δῦθι', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('δῦθι', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('δύω: Aorist System Active')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm52')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('δύω: Aorist System Active')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm62')
  })

  it('53 - checked Verb Paradigm 53 - ᾔδεις', async () => {
    const inflectionsViewSet = await BaseTestHelp.getInflectionSet('ᾔδεις', Constants.LANG_GREEK)
    // console.info(inflectionsViewSet.matchingViews)
    
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()
    expect(inflectionsViewSet.matchingViews.length).toEqual(1)

    expect(inflectionsViewSet.matchingViews[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(inflectionsViewSet.matchingViews[0].title).toEqual('οἶδα: Perfect System')
    expect(inflectionsViewSet.matchingViews[0].paradigm).toBeDefined()
    expect(inflectionsViewSet.matchingViews[0].paradigm.paradigmID).toEqual('verbpdgm53')
    expect(inflectionsViewSet.matchingViews[0].paradigm.title).toEqual('οἶδα: Perfect System')

    expect(inflectionsViewSet.matchingViews[0].linkedViews.length).toEqual(0)

    expect(inflectionsViewSet.matchingViews[0].hasSuppParadigms).toBeTruthy()
    expect(inflectionsViewSet.matchingViews[0].suppParadigms.length).toEqual(1)
    expect(inflectionsViewSet.matchingViews[0].suppParadigms[0].paradigmID).toEqual('verbpdgm63')
  })

})

