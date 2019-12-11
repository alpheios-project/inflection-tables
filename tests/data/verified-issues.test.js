/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, Feature, LanguageModelFactory } from 'alpheios-data-models'

import ViewSetFactory from '@views/lib/view-set-factory.js'
// import LanguageDatasetFactory from '@views/lib/language-dataset-factory.js'

describe('greek-views.test.js', () => {
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

  async function getInflectionSet(targetWord, languageID) {
    const adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: languageID,
        word: targetWord
      }
    })
  
    const testHomonym = adapterTuftsRes.result
    const inflectionsViewSet = ViewSetFactory.create(testHomonym, locale)
    return inflectionsViewSet
  }

  it.skip('1 - issue 262 - ierint, ierunt, iverim, ivissem - Verb Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // ierint

    inflectionsViewSet = await getInflectionSet('ierint', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')

    // ierunt

    inflectionsViewSet = await getInflectionSet('ierunt', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')

    // iverim

    inflectionsViewSet = await getInflectionSet('iverim', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')

    // ivissem

    inflectionsViewSet = await getInflectionSet('ivissem', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('eo, ire,ivi(ii),itus')
  }, 60000)

  it.skip('2 - issue 227 - δέδια, δεδίῃ, δεδίητον, δεδίητε, δέδιμεν, δέδιτε, ἐδεδίειν - Athematic Perfects - δέδια', async () => {
    let inflectionsViewSet, result

    // δέδια

    inflectionsViewSet = await getInflectionSet('δέδια', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δεδίῃ

    inflectionsViewSet = await getInflectionSet('δεδίῃ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δεδίητον

    inflectionsViewSet = await getInflectionSet('δεδίητον', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δεδίητε

    inflectionsViewSet = await getInflectionSet('δεδίητε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δέδιμεν

    inflectionsViewSet = await getInflectionSet('δέδιμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // δέδιτε

    inflectionsViewSet = await getInflectionSet('δέδιτε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

    // ἐδεδίειν

    inflectionsViewSet = await getInflectionSet('ἐδεδίειν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm17c')
    expect(result[0].paradigm.title).toEqual('Athematic Perfects - δέδια (in addition to forms from δέδοικα)')

  }, 50000)

  it.skip('3 - issue 223 - οἶδα - οἶδα: Perfect System', async () => {
    let inflectionsViewSet, result

    inflectionsViewSet = await getInflectionSet('οἶδα', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('οἶδα: Perfect System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm53')
    expect(result[0].paradigm.title).toEqual('οἶδα: Perfect System')

  })

  it.skip('4 - issue 220 - φῶ, φῇς, φῆτε, φαίη, φαῖμεν, φαῖεν - φημί: Present System', async () => {
    let inflectionsViewSet, result

    // φῶ
    inflectionsViewSet = await getInflectionSet('φῶ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φῇς
    inflectionsViewSet = await getInflectionSet('φῇς', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φῆτε
    inflectionsViewSet = await getInflectionSet('φῆτε', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φαίη
    inflectionsViewSet = await getInflectionSet('φαίη', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φαῖμεν
    inflectionsViewSet = await getInflectionSet('φαῖμεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')

    // φαῖεν
    inflectionsViewSet = await getInflectionSet('φαῖεν', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('φημί: Present System')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm48')
    expect(result[0].paradigm.title).toEqual('φημί: Present System')
  }, 50000)

  it.skip('5 - issue 219 - ἔθετο - τίθημι: Aorist System Middle', async () => {
    let inflectionsViewSet, result

    inflectionsViewSet = await getInflectionSet('ἔθετο', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[1].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[1].title).toEqual('τίθημι: Aorist System Middle')
    expect(result[1].paradigm).toBeDefined()
    expect(result[1].paradigm.paradigmID).toEqual('verbpdgm31')
    expect(result[1].paradigm.title).toEqual('τίθημι: Aorist System Middle')

  })

  it.skip('6 - issue 218 - δύναμαι, ἐπίσταμαι - Present System Middle-Passive', async () => {
    let inflectionsViewSet, result

    // δύναμαι
    inflectionsViewSet = await getInflectionSet('δύναμαι', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(1)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('δύναμαι: Present System Middle-Passive')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm43')
    expect(result[0].paradigm.title).toEqual('δύναμαι: Present System Middle-Passive')

    // ἐπίσταμαι
    inflectionsViewSet = await getInflectionSet('ἐπίσταμαι', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekVerbParadigmView')

    expect(result.length).toEqual(2)
    expect(result[0].constructor.name).toEqual('GreekVerbParadigmView')
    expect(result[0].title).toEqual('ἵστημι: Present System Middle-Passive')
    expect(result[0].paradigm).toBeDefined()
    expect(result[0].paradigm.paradigmID).toEqual('verbpdgm41')
    expect(result[0].paradigm.title).toEqual('ἵστημι: Present System Middle-Passive')
  })

  it.skip('7 - issue 210 - ποιῶ, ποιοῦμεν, πλεῖ - Present System Active of Contract Verbs', async () => {
    let inflectionsViewSet, result

    // ποιῶ
    inflectionsViewSet = await getInflectionSet('ποιῶ', Constants.LANG_GREEK)
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
    inflectionsViewSet = await getInflectionSet('ποιοῦμεν', Constants.LANG_GREEK)
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
    inflectionsViewSet = await getInflectionSet('πλεῖ', Constants.LANG_GREEK)
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

  it.skip('8 - issue 210 - ἔθετο - ω-Verbs: Present System Middle-Passive table but it\'s also aorist ind. mid.', async () => {
    let inflectionsViewSet, result

    // ἔθετο
    inflectionsViewSet = await getInflectionSet('ἔθετο', Constants.LANG_GREEK)
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

  it.skip('9 - issue 168 - venit - Verb Conjugation (Irregular)', async () => {
    let inflectionsViewSet, result

    // ierint

    inflectionsViewSet = await getInflectionSet('venit', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('veneo, venire,venivi(ii),venitus')
  })

  it.skip('10 - issue 149 - οἷ, οἵ - Greek Pronouns', async () => {
    let inflectionsViewSet, result

    // οἷ

    inflectionsViewSet = await getInflectionSet('οἷ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekGenderPronounView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Relative Pronoun Declension')

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekPersonPronounView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Personal Pronoun Declension')

    // οἵ

    inflectionsViewSet = await getInflectionSet('οἵ', Constants.LANG_GREEK)
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

    inflectionsViewSet = await getInflectionSet('itum', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbSupineIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Supine Conjugation (Irregular)')

    // itu

    inflectionsViewSet = await getInflectionSet('itu', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbSupineIrregularView')

    expect(result.length).toEqual(1)
    expect(result[0].title).toEqual('Verb Supine Conjugation (Irregular)')
  })

  it('12 - issue 131 - πρόσφυμα, Καλυψώ  - Greek Noun', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await getInflectionSet('πρόσφυμα', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekNounView')
    expect(result.length).toEqual(1)

    // Καλυψώ

    inflectionsViewSet = await getInflectionSet('Καλυψώ', Constants.LANG_GREEK)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'GreekNounView')
    expect(result.length).toEqual(1)
  })

  it('13 - issue 122 - nevolo - Latin Verb Conjugation Irregular', async () => {
    let inflectionsViewSet, result

    // πρόσφυμα

    inflectionsViewSet = await getInflectionSet('nevolo', Constants.LANG_LATIN)
    expect(inflectionsViewSet.hasMatchingViews).toBeTruthy()

    result = inflectionsViewSet.matchingViews.filter(view => view.constructor.name === 'LatinVerbIrregularView')
    expect(result.length).toEqual(1)

    expect(result[0].title).toEqual('Verb Conjugation (Irregular)')
    expect(result[0].additionalTitle).toEqual('volo, velle,volui,-')

  })
})