/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Constants, GreekLanguageModel, Feature } from 'alpheios-data-models'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import ExtendedGreekData from '@lib/extended-greek-data'

import Suffix from '@lib/suffix.js'
import Form from '@lib/form.js'

import adjectiveSuffixesCSV from '@lib/lang/greek/data/adjective/suffixes.csv'
import nounSuffixesCSV from '@lib/lang/greek/data/noun/suffixes.csv'
import articleFormsCSV from '@lib/lang/greek/data/article/forms.csv'
import numeralFormsCSV from '@lib/lang/greek/data/numeral/forms.csv'
import pronounFormsCSV from '@lib/lang/greek/data/pronoun/forms.csv'

import papaparse from 'papaparse'

describe('greek-language-dataset.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 GreekLanguageDataset - constructor creates with features', () => {
    let GLD = new GreekLanguageDataset()

    expect(GLD.languageID).toEqual(Constants.LANG_GREEK)
    expect(GLD.model).toEqual(GreekLanguageModel)

    expect(GLD.features.has(Feature.types.footnote)).toBeTruthy()
    expect(GLD.features.has(Feature.types.fullForm)).toBeTruthy()
    expect(GLD.features.has(Feature.types.hdwd)).toBeTruthy()
    expect(GLD.features.has(Feature.types.dialect)).toBeTruthy()

    let greekModelFeatures = GreekLanguageModel.typeFeatures
    greekModelFeatures.forEach(feature => expect(GLD.features.has(feature.type)).toBeTruthy())
  })

  it('2 GreekLanguageDataset - addSuffixes for adjectives executes addInflection for each line from csv  with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    let partOfSpeech = GLD.features.get(Feature.types.part).createFeature(Constants.POFS_ADJECTIVE)
    let suffixes = papaparse.parse(adjectiveSuffixesCSV, {})

    GLD.addInflection = jest.fn()

    let parsedAdjectiveSuffix = GLD.addSuffixes(partOfSpeech, suffixes.data)

    expect(GLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the last row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.features.get(Feature.types.number).createFromImporter(itemRow[1]),
      GLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      GLD.features.get(Feature.types.declension).createFromImporter(itemRow[3]),
      GLD.features.get(Feature.types.gender).createFromImporter(itemRow[4]),
      GLD.features.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    let extendedGreekData = new ExtendedGreekData()
    extendedGreekData.primary = false

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features, extendedLangData)
  })

  it('3 GreekLanguageDataset - addSuffixes for nouns executes addInflection for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    let partOfSpeech = GLD.features.get(Feature.types.part).createFeature(Constants.POFS_NOUN)
    let suffixes = papaparse.parse(nounSuffixesCSV, {})

    GLD.addInflection = jest.fn()

    let parsedAdjectiveSuffix = GLD.addSuffixes(partOfSpeech, suffixes.data)

    expect(GLD.addInflection).toHaveBeenCalledTimes(suffixes.data.length - 1) // 1 for header

    // check import using the last row
    let itemRow = suffixes.data[suffixes.data.length - 1]
    let suffixValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.features.get(Feature.types.number).createFromImporter(itemRow[1]),
      GLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      GLD.features.get(Feature.types.declension).createFromImporter(itemRow[3]),
      GLD.features.get(Feature.types.gender).createFromImporter(itemRow[4]),
      GLD.features.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[6] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Suffix, suffixValue, features, extendedLangData)
  })

  it('4 GreekLanguageDataset - addArticleForms for articles executes addInflection for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    let partOfSpeech = GLD.features.get(Feature.types.part).createFeature(Constants.POFS_ARTICLE)
    let forms = papaparse.parse(articleFormsCSV, {})

    GLD.addInflection = jest.fn()
    GLD.addArticleForms(partOfSpeech, forms.data)

    expect(GLD.addInflection).toHaveBeenCalledTimes(forms.data.length - 1) // 1 for header

    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.features.get(Feature.types.number).createFromImporter(itemRow[1]),
      GLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[2]),
      GLD.features.get(Feature.types.gender).createFromImporter(itemRow[3]),
      GLD.features.get(Feature.types.type).createFromImporter(itemRow[4])
    ]

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[5] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features, extendedLangData)
  })

  it('4 GreekLanguageDataset - addNumeralForms for numerals executes addInflection for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    let partOfSpeech = GLD.features.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    let forms = papaparse.parse(numeralFormsCSV, {})

    GLD.addInflection = jest.fn()
    GLD.addNumeralForms(partOfSpeech, forms.data)

    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.features.get(Feature.types.fullForm).createFromImporter(formValue),
      GLD.features.get(Feature.types.hdwd).createFromImporter(itemRow[1]),
      GLD.features.get(Feature.types.number).createFromImporter(itemRow[2]),
      GLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[3]),
      GLD.features.get(Feature.types.gender).createFromImporter(itemRow[4]),
      GLD.features.get(Feature.types.type).createFromImporter(itemRow[5])
    ]

    if (itemRow[7]) {
      let indexes = itemRow[7].split(' ')
      features.push(GLD.features.get(Feature.types.footnote).createFeatures(indexes))
    }

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[6] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features, extendedLangData)
  })

  it('5 GreekLanguageDataset - numeralGroupingLemmas fills with data from numeralFormsCSV', () => {
    let GLD = new GreekLanguageDataset()

    let partOfSpeech = GLD.features.get(Feature.types.part).createFeature(Constants.POFS_NUMERAL)
    let forms = papaparse.parse(numeralFormsCSV, {})

    GLD.addNumeralForms(partOfSpeech, forms.data)

    let numeralGroupingLemmas = []
    let numeralGroupingLemmasAll = forms.data.slice(1).filter(item => item[1]).map(item => item[1])
    numeralGroupingLemmasAll.forEach(item => {
      if (numeralGroupingLemmas.indexOf(item) === -1) { numeralGroupingLemmas.push(item) }
    })

    numeralGroupingLemmas.sort((a, b) => {
      let aN = parseInt(a.match(/[0-9]+/g)[0])
      let bN = parseInt(b.match(/[0-9]+/g)[0])
      return aN - bN
    })

    expect(GLD.numeralGroupingLemmas).toEqual(numeralGroupingLemmas)
  })

  it('6 GreekLanguageDataset - addPronounForms for numerals executes addInflection for each line from csv with specific arguments', () => {
    let GLD = new GreekLanguageDataset()

    let partOfSpeech = GLD.features.get(Feature.types.part).createFeature(Constants.POFS_PRONOUN)
    let forms = papaparse.parse(pronounFormsCSV, {})

    GLD.addInflection = jest.fn()
    GLD.addPronounForms(partOfSpeech, forms.data)

    let itemRow = forms.data[forms.data.length - 1]
    let formValue = itemRow[0]

    let features = [partOfSpeech,
      GLD.features.get(Feature.types.fullForm).createFromImporter(formValue)
    ]
    if (itemRow[1].length > 0) {
      features.push(GLD.features.get(Feature.types.hdwd).createFromImporter(itemRow[1]))
    }

    features.push(GLD.features.get(Feature.types.grmClass).createFromImporter(itemRow[2]))
    if (itemRow[3].length > 0) {
      features.push(GLD.features.get(Feature.types.person).createFromImporter(itemRow[3]))
    }

    features.push(GLD.features.get(Feature.types.number).createFromImporter(itemRow[4]))
    features.push(GLD.features.get(Feature.types.grmCase).createFromImporter(itemRow[5]))
    features.push(GLD.features.get(Feature.types.gender).createFromImporter(itemRow[6]))
    features.push(GLD.features.get(Feature.types.type).createFromImporter(itemRow[7]))

    let dialects = itemRow[9].split(',')
    if (itemRow[9] && dialects && dialects.length > 0) {
      features.push(GLD.features.get(Feature.types.dialect).createFeatures(dialects))
    }

    if (itemRow[10]) {
      let indexes = itemRow[10].split(' ')
      features.push(GLD.features.get(Feature.types.footnote).createFeatures(indexes))
    }

    let extendedGreekData = new ExtendedGreekData()
    if (itemRow[8] === 'primary') { extendedGreekData.primary = true }

    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }

    expect(GLD.addInflection).toHaveBeenLastCalledWith(partOfSpeech.value, Form, formValue, features, extendedLangData)
  })
})
