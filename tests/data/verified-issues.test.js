/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'
// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'
import BaseTestHelp from '@tests/data/base-test-help.js'

describe('greek-views.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 - issue 262 - ierint, ierunt, iverim, ivissem - Verb Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // ierint

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ierint', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')

    // ierunt

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ierunt', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')

    // iverim

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('iverim', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')

    // ivissem

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ivissem', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')
  }, 60000)

  it('2 - issue 227 - δέδια, δεδίῃ, δεδίητον, δεδίητε, δέδιμεν, δέδιτε, ἐδεδίειν - Athematic Perfects - δέδια', async () => {
    let inflectionsViewSet, result

    // δέδια

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδια', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δεδίῃ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεδίῃ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δεδίητον

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεδίητον', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δεδίητε

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δεδίητε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δέδιμεν

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδιμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δέδιτε

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δέδιτε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // ἐδεδίειν

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐδεδίειν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

  }, 50000)

  it('3 - issue 223 - οἶδα - οἶδα: Perfect System', async () => {
    let inflectionsViewSet, result

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἶδα', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('οἶδα: Perfect System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm53')
    expect(result[0].paradigm.title).toEqual('οἶδα: Perfect System')

  })

  it('4 - issue 220 - φῶ, φῇς, φῆτε, φαίη, φαῖμεν, φαῖεν - φημί: Present System', async () => {
    let inflectionsViewSet, result

    // φῶ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φῶ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φῇς
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φῇς', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φῆτε
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φῆτε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φαίη
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαίη', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φαῖμεν
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαῖμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φαῖεν
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('φαῖεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')
  }, 50000)

  it('5 - issue 219 - ἔθετο - τίθημι: Aorist System Middle', async () => {
    let inflectionsViewSet, result

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔθετο', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[1].title).toEqual('τίθημι: Aorist System Middle')
    expect(result[1].paradigm).toBeDefined()
    expect(result[1].paradigm.paradigmID).toEqual('verbpdgm31')
    expect(result[1].paradigm.title).toEqual('τίθημι: Aorist System Middle')

  })

  it('6 - issue 218 - δύναμαι, ἐπίσταμαι - Present System Middle-Passive', async () => {
    let inflectionsViewSet, result

    // δύναμαι
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('δύναμαι', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('δύναμαι: Present System Middle-Passive')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm43')
    expect(result[0].paradigm.title).toEqual('δύναμαι: Present System Middle-Passive')

    // ἐπίσταμαι
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἐπίσταμαι', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('ἵστημι: Present System Middle-Passive')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm41')
    expect(result[0].paradigm.title).toEqual('ἵστημι: Present System Middle-Passive')
  })

  it('7 - issue 210 - ποιῶ, ποιοῦμεν, πλεῖ - Present System Active of Contract Verbs', async () => {
    let inflectionsViewSet, result

    // ποιῶ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ποιῶ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Present System Active of Contract Verbs in -έω')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm18')
    expect(result[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -έω')

    expect(result[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[1].title).toEqual('Present System Active of Contract Verbs in -όω')
    expect(result[1].paradigm).toBeDefined()
    expect(result[1].paradigm.paradigmID).toEqual('verbpdgm26')
    expect(result[1].paradigm.title).toEqual('Present System Active of Contract Verbs in -όω')

    // ποιοῦμεν
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ποιοῦμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Present System Active of Contract Verbs in -έω')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm18')
    expect(result[0].paradigm.title).toEqual('Present System Active of Contract Verbs in -έω')

    expect(result[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[1].title).toEqual('Present System Active of Contract Verbs in -όω')
    expect(result[1].paradigm).toBeDefined()
    expect(result[1].paradigm.paradigmID).toEqual('verbpdgm26')
    expect(result[1].paradigm.title).toEqual('Present System Active of Contract Verbs in -όω')

    // πλεῖ
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('πλεῖ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(3)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm21')
    expect(result[0].paradigm.title).toEqual('Present System Middle-Passive of Contract Verbs in -έω (monosyllabic stem)')

    expect(result[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[1].title).toEqual('Present System Active of Contract Verbs in -έω (monosyllabic stems)')
    expect(result[1].paradigm).toBeDefined()
    expect(result[1].paradigm.paradigmID).toEqual('verbpdgm19')
    expect(result[1].paradigm.title).toEqual('Present System Active of Contract Verbs in -έω (monosyllabic stems)')

    expect(result[2].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[2].title).toEqual('Present System Active of Contract Verbs in -έω')
    expect(result[2].paradigm).toBeDefined()
    expect(result[2].paradigm.paradigmID).toEqual('verbpdgm18')
    expect(result[2].paradigm.title).toEqual('Present System Active of Contract Verbs in -έω')
  })

  it('8 - issue 210 - ἔθετο - ω-Verbs: Present System Middle-Passive table but it\'s also aorist ind. mid.', async () => {
    let inflectionsViewSet, result

    // ἔθετο
    inflectionsViewSet = await BaseTestHelp.getInflectionSet('ἔθετο', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('ω-Verbs: Present System Middle-Passive')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm2')
    expect(result[0].paradigm.title).toEqual('ω-Verbs: Present System Middle-Passive')

    expect(result[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[1].title).toEqual('τίθημι: Aorist System Middle')
    expect(result[1].paradigm).toBeDefined()
    expect(result[1].paradigm.paradigmID).toEqual('verbpdgm31')
    expect(result[1].paradigm.title).toEqual('τίθημι: Aorist System Middle')

  })

  it('9 - issue 168 - venit - Verb Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // ierint

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('venit', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('veneo, venire,venivi(ii),venitus')
  })

  it('10 - issue 149 - οἷ, οἵ - Greek Pronouns', async () => {
    let inflectionsViewSet, result

    // οἷ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἷ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekGenderPronounView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Relative Pronoun Declension')

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekPersonPronounView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Personal Pronoun Declension')

    // οἵ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('οἵ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekGenderPronounView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Relative Pronoun Declension')

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekPersonPronounView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Personal Pronoun Declension')
  })

  it('11 - issue 133 - itum, itu - Verb Supine Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // itum

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('itum', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbSupineIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Supine Conjugation (Irregular)')

    // itu

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('itu', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbSupineIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Supine Conjugation (Irregular)')
  })

  it('12 - issue 131 - πρόσφυμα, Καλυψώ  - Greek Noun', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('πρόσφυμα', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekNounView')
    expect(result.length).toEqual(1)

    // Καλυψώ

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('Καλυψώ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekNounView')
    expect(result.length).toEqual(1)
  })

  it('13 - issue 122 - nevolo - Latin Verb Conjugation Irregular', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await BaseTestHelp.getInflectionSet('nevolo', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')
    expect(result.length).toEqual(1)

    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('volo, velle,volui,-')

  })
})