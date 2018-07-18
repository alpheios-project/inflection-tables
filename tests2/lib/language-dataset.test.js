/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, Feature, Inflection, LanguageModelFactory as LMF } from 'alpheios-data-models'

import LanguageDataset from '@lib/language-dataset.js'

import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'

import verbParadigmRulesCSV from '@lib/lang/greek/data/verb/paradigm/rules.csv'

import Suffix from '@lib/suffix.js'
import Paradigm from '@lib/paradigm.js'

import papaparse from 'papaparse'

describe('language-dataset.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  const languageIDLat = Constants.LANG_LATIN
  const languageIDGreek = Constants.LANG_GREEK

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

  it('1 LanguageDataset - constructor throw Error if languageID is not defined', () => {
    expect(function () {
      let LD = new LanguageDataset()
      console.log(LD)
    }).toThrow(new Error('Language ID cannot be empty.'))
  })

  it('2 LanguageDataset - constructor creates with common features for current languageID', () => {
    let LD = new LanguageDataset(languageIDLat)

    expect(LD.languageID).toEqual(languageIDLat)
    expect(LD.dataLoaded).toBeFalsy()
    expect(LD.model).toEqual(LMF.getLanguageModel(languageIDLat))
    expect(LD.pos).toBeDefined()
    expect(LD.footnotes).toBeDefined()
  })

  it('3 LanguageDataset - addInflection creates and loads inflectionSet to LanguageDataset.pos', () => {
    let LD = new LanguageDataset(languageIDLat)

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    const classType = Suffix
    const itemValue = 'a'
    let features = []
    features.push(partOfSpeech)
    features.push(new Feature(Feature.types.number, 'singular', languageIDLat))
    features.push(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    features.push(new Feature(Feature.types.declension, '1st', languageIDLat))
    features.push(new Feature(Feature.types.gender, 'feminine', languageIDLat))
    features.push(new Feature(Feature.types.type, 'regular', languageIDLat))
    features.push(new Feature(Feature.types.footnote, '3', languageIDLat))

    expect(LD.pos.size).toEqual(0)
    LD.addInflection(partOfSpeech.value, classType, itemValue, features)

    expect(LD.pos.size).toEqual(1)
    expect(Array.from(LD.pos.keys())).toEqual(['adjective'])

    expect(LD.pos.get('adjective').constructor.name).toEqual('InflectionSet')
    expect(LD.pos.get('adjective').partOfSpeech).toEqual('adjective')
    expect(Array.from(LD.pos.get('adjective').types.keys())).toEqual([Suffix])
    expect(LD.pos.get('adjective').types.get(Suffix).constructor.name).toEqual('Inflections')
  })

  it('4 LanguageDataset - addParadigms adds Paradigm to LanguageDataset.pos', () => {
    let LD = new LanguageDataset(languageIDGreek)
    let GLD = new GreekLanguageDataset()

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_VERB, languageIDGreek)
    const verbParadigmTables = GreekLanguageDatasetJSON.verbParadigmTables
    const verbParticipleParadigmTables = GreekLanguageDatasetJSON.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    let paradigms = GLD.setParadigmData(
      partOfSpeech, verbParadigmTables,
      papaparse.parse(verbParadigmRulesCSV, {}).data, verbAndParticipleParadigmTables)

    expect(LD.pos.size).toEqual(0)

    LD.addParadigms(partOfSpeech, paradigms)

    expect(LD.pos.size).toEqual(1)
    expect(Array.from(LD.pos.keys())).toEqual(['verb'])

    expect(LD.pos.get('verb').constructor.name).toEqual('InflectionSet')
    expect(LD.pos.get('verb').partOfSpeech).toEqual('verb')
    expect(Array.from(LD.pos.get('verb').types.keys())).toEqual([Paradigm])
    expect(LD.pos.get('verb').types.get(Paradigm).constructor.name).toEqual('Inflections')
  })

  it('5 LanguageDataset - addFootnote checks arguments - index and text are required', () => {
    let LD = new LanguageDataset(languageIDLat)

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    const classType = Suffix
    const index = '3'
    const text = 'foo footnote'

    expect(() => LD.addFootnote()).toThrow(new Error('Footnote index data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech)).toThrow(new Error('Footnote index data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech, classType)).toThrow(new Error('Footnote index data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech, classType, index)).toThrow(new Error('Footnote text data should not be empty.'))
    expect(() => LD.addFootnote(partOfSpeech, classType, index, text)).not.toThrow(expect.any(Error))
  })

  it('6 LanguageDataset - addFootnote adds Footnote to LD.pos', () => {
    let LD = new LanguageDataset(languageIDLat)

    const partOfSpeech = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    const classType = Suffix
    const index = '3'
    const text = 'foo footnote'

    expect(LD.pos.size).toEqual(0)

    LD.addFootnote(partOfSpeech.value, classType, index, text)

    let suffixItem = LD.pos.get('adjective').types.get(Suffix)

    expect(suffixItem).toBeDefined()
    expect(Array.from(suffixItem.footnotesMap.keys())).toEqual(['3'])
    expect(suffixItem.footnotesMap.get('3').constructor.name).toEqual('Footnote')
    expect(suffixItem.footnotesMap.get('3').index).toEqual('3')
    expect(suffixItem.footnotesMap.get('3').text).toEqual('foo footnote')
  })

  it('7 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (success result for obligatory match)', () => {
    let matchList = [ Feature.types.part ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, ['1st', '2nd'], languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeTruthy()
    expect(result.matchedItems).toEqual(matchList)
  })

  it('8 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (success result for optional match)', () => {
    let matchList = [ Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, '1st', languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeTruthy()
    expect(result.matchedItems).toEqual(matchList)
  })

  it('9 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (failed result for obligatory match)', () => {
    let matchList = [ Feature.types.part ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_NOUN, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, ['1st', '2nd'], languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeFalsy()
    expect(result.matchedItems.length).toEqual(0)
  })

  it('10 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme (failed result for optional match)', () => {
    let matchList = [ Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number ]

    let inflection = new Inflection('beat', 'lat', 'um')
    inflection.addFeature(new Feature(Feature.types.part, Constants.POFS_ADJECTIVE, languageIDLat))
    inflection.addFeature(new Feature(Feature.types.grmCase, 'nominative', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.declension, '1st', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.gender, 'neuter', languageIDLat))
    inflection.addFeature(new Feature(Feature.types.number, 'singular', languageIDLat))
    inflection.setConstraints()

    let suffixItem = new Suffix('um')
    suffixItem.features[Feature.types.part] = new Feature(Feature.types.part, Constants.POFS_NOUN, languageIDLat)
    suffixItem.features[Feature.types.grmCase] = new Feature(Feature.types.grmCase, 'nominative', languageIDLat)
    suffixItem.features[Feature.types.declension] = new Feature(Feature.types.declension, '2nd', languageIDLat)
    suffixItem.features[Feature.types.gender] = new Feature(Feature.types.gender, 'neuter', languageIDLat)
    suffixItem.features[Feature.types.number] = new Feature(Feature.types.number, 'singular', languageIDLat)

    let result = LanguageDataset.checkMatches(matchList, inflection, suffixItem)

    expect(result.fullMatch).toBeFalsy()
    expect(result.matchedItems).toEqual([ Feature.types.grmCase, Feature.types.gender, Feature.types.number ])
  })

  it('11 LanguageDataset - checkMatches checks fullMatch for matchList, inflection and morpheme with Multiple Feature', () => {
  })

  it('100 LanguageDataset - getObligatoryMatches executes checkMatches with getObligatoryMatchList', () => {
    LanguageDataset.checkMatches = jest.fn()
    LanguageDataset.getObligatoryMatchList = jest.fn(() => 'getObligatoryMatchList')

    LanguageDataset.getObligatoryMatches('fooInflection', 'fooItem')

    expect(LanguageDataset.getObligatoryMatchList).toHaveBeenCalledWith('fooInflection')
    expect(LanguageDataset.checkMatches).toHaveBeenCalledWith('getObligatoryMatchList', 'fooInflection', 'fooItem')
  })

  it('101 LanguageDataset - getOptionalMatches executes checkMatches with getOptionalMatchList', () => {
    LanguageDataset.checkMatches = jest.fn()
    LanguageDataset.getOptionalMatchList = jest.fn(() => 'getOptionalMatchList')

    LanguageDataset.getOptionalMatches('fooInflection', 'fooItem')

    expect(LanguageDataset.getOptionalMatchList).toHaveBeenCalledWith('fooInflection')
    expect(LanguageDataset.checkMatches).toHaveBeenCalledWith('getOptionalMatchList', 'fooInflection', 'fooItem')
  })
})
