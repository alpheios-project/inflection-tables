/* eslint-env jest */
import { Constants, Feature } from 'alpheios-data-models'
import LanguageDataset from '../language-dataset.js'
import LatinLanguageDataset from '../lang/latin/latin-language-dataset.js'
import GreekLanguageDataset from '../lang/greek/greek-language-dataset.js'
import LanguageDatasetFactory from '../language-dataset-factory.js'
import Suffix from '../suffix.js'

describe('LanguageDataset object', () => {
  let languageDataset

  beforeAll(() => {
    // Create a test environment
    languageDataset = new LanguageDataset(Constants.LANG_LATIN)
  })

  test('Should be initialized properly', () => {
    expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
    expect(languageDataset).toMatchObject({
      dataLoaded: false,
      footnotes: [],
      languageID: expect.anything(),
      model: expect.any(Function),
      pos: expect.any(Map)
    })
  })

  test('Should require language to be provided', () => {
    expect(() => new LanguageDataset()).toThrowError(/empty/)
  })

  // TODO: Add tests for addSuffix for later as the logic might change

  test('addFootnote should add proper data into a footnotes object', () => {
    const partOfSpeech = 'noun'
    const morphemeType = Suffix
    const footnoteID = 5
    const footnoteText = 'Footnote text'
    languageDataset.addFootnote(partOfSpeech, morphemeType, footnoteID, footnoteText)
    expect(languageDataset.pos.get(partOfSpeech).types.get(morphemeType).footnotesMap.get(footnoteID)).toEqual({
      index: footnoteID,
      text: footnoteText,
      'part of speech': partOfSpeech})
  })

  test('addFootnote should not allow empty values', () => {
    expect(() => languageDataset.addFootnote(5)).toThrowError(/empty/)
  })

  // TODO: Add tests for getSuffixes later as the logic might change

  afterAll(() => {
    // Clean a test environment up
    languageDataset = undefined
  })
})

describe('LanguageData', () => {
  let latinDataset, greekDataset

  beforeAll(() => {
    latinDataset = new LatinLanguageDataset()
    greekDataset = new GreekLanguageDataset()
  })

  test('constructor should initialize object properly.', () => {
    expect(Array.from(LanguageDatasetFactory.instance.sets.values())).toEqual(expect.arrayContaining([
      greekDataset,
      latinDataset
    ]))
  })
})

describe('Suffix object', () => {
  'use strict'

  let suffix

  beforeAll(() => {
    // Create a test environment

    suffix = new Suffix('suffixtext')
  })

  test('Should be initialized properly', () => {
    expect(suffix).toEqual({
      id: expect.stringMatching(/(.+-)+.+/),
      value: 'suffixtext',
      features: {},
      footnotes: [],
      featureGroups: {},
      extendedLangData: {},
      match: undefined
    })
  })

  test('Should not allow an empty argument', () => {
    expect(() => new Suffix()).toThrowError(/empty/)
  })

  test('clone method should return a copy of a Suffix object, except for id', () => {
    let clone = suffix.clone()
    expect(clone).toEqual({
      id: expect.stringMatching(/(.+-)+.+/),
      footnotes: [],
      extendedLangData: suffix.extendedLangData,
      featureGroups: suffix.featureGroups,
      features: suffix.features,
      match: suffix.match,
      value: suffix.value
    })
  })

  // TODO: implement tests for featureMatch as functionality may change
  // TODO: implement tests for getCommonGroups as functionality may change
  // TODO: implement tests for isInSameGroupWith as functionality may change
  // TODO: implement tests for split as functionality may change
  // TODO: implement tests for combine as functionality may change

  test('merge() should join two previously split object (objects that are in the same group) together.', () => {
    let values = ['masculine', 'feminine']
    let suffixes = [new Suffix('endingOne', undefined), new Suffix('endingOne', undefined)]
    suffixes[0].features[Feature.types.gender] = values[0]
    suffixes[1].features[Feature.types.gender] = values[1]
    suffixes[0].featureGroups[Feature.types.gender] = values
    suffixes[1].featureGroups[Feature.types.gender] = values
    let merged = Suffix.merge(suffixes[0], suffixes[1])
    expect(merged.features[Feature.types.gender]).toBe(values[0] + ', ' + values[1])
  })

  afterAll(() => {
    // Clean a test environment up
    suffix = undefined
  })
})

// TODO: implement tests for a WordData later as it will evolve
