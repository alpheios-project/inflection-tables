/*
 * Greek language data module
 */
import { Constants, Feature, FeatureType } from 'alpheios-data-models'
import LanguageDataset from '../../../lib/language-dataset'
import ExtendedGreekData from '../../../lib/extended-greek-data'
import nounSuffixesCSV from './data/noun/suffixes.csv'
import nounFootnotesCSV from './data/noun/footnotes.csv'
import pronounFormsCSV from './data/pronoun/forms.csv'
// import pronounFootnotesCSV from './data/pronoun/footnotes.csv'
/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */
import papaparse from 'papaparse'

// Create a language data set that will keep all language-related information
// let dataSet = new LanguageDataset(Constants.LANG_GREEK)
let fTypes = Feature.types

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const impName = 'csv'
const footnotes = new FeatureType(Feature.types.footnote, [], Constants.LANG_GREEK)

// endregion Definition of grammatical features

export default class GreekLanguageDataset extends LanguageDataset {
  constructor () {
    super(GreekLanguageDataset.languageID)
  }

  static get languageID () {
    return Constants.LANG_GREEK
  }

  // For noun and adjectives
  addSuffixes (partOfSpeech, data) {
    // An order of columns in a data CSV file
    const n = {
      suffix: 0,
      number: 1,
      grmCase: 2,
      declension: 3,
      gender: 4,
      type: 5,
      primary: 6,
      footnote: 7
    }
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-'

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let suffixValue = item[n.suffix]
      // Handle special suffix values
      if (suffixValue === noSuffixValue) {
        suffixValue = null
      }

      let primary = false
      let features = [partOfSpeech,
        this.model.getFeatureType(fTypes.number).getFromImporter(impName, item[n.number]),
        this.model.getFeatureType(fTypes.grmCase).getFromImporter(impName, item[n.grmCase]),
        this.model.getFeatureType(fTypes.declension).getFromImporter(impName, item[n.declension]),
        this.model.getFeatureType(fTypes.gender).getFromImporter(impName, item[n.gender]),
        this.model.getFeatureType(fTypes.type).getFromImporter(impName, item[n.type])]
      if (item[n.primary] === 'primary') {
        primary = true
      }
      if (item[n.footnote]) {
        // There can be multiple footnote indexes separated by spaces
        let indexes = item[n.footnote].split(' ').map(function (index) {
          return footnotes.get(index)
        })
        features.push(...indexes)
      }
      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }
      this.addItem(suffixValue, LanguageDataset.SUFFIX, features, extendedLangData)
    }
  }

  // For pronoun
  addPronounForms (partOfSpeech, data) {
    this.pronounGroupingLemmas = new Map([
      ['demonstrative', ['ὅδε', 'οὗτος', 'ἐκεῖνος']]
    ])

    // An order of columns in a data CSV file
    const n = {
      form: 0,
      hdwd: 1,
      grmClass: 2,
      person: 3,
      number: 4,
      grmCase: 5,
      gender: 6,
      type: 7,
      primary: 8,
      dialect: 9,
      footnote: 10
    }

    // Custom importers
    // TODO: decide on the best way to keep mulitple values and re-enable later
    /* languageModel.features[fTypes.gender].addImporter(impName)
      .map('masculine feminine neuter', [
        languageModel.features[fTypes.gender][Constants.GEND_MASCULINE],
        languageModel.features[fTypes.gender][Constants.GEND_FEMININE],
        languageModel.features[fTypes.gender][Constants.GEND_NEUTER]
      ]) */

    // First row are headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let form = item[n.form]

      let features = [partOfSpeech]

      if (item[n.hdwd]) {
        features.push(
          new FeatureType(fTypes.word, [FeatureType.UNRESTRICTED_VALUE], this.languageID).getFromImporter(impName, item[n.hdwd])
        )
      }
      if (item[n.grmClass]) { features.push(this.model.getFeatureType(fTypes.grmClass).getFromImporter(impName, item[n.grmClass])) }
      if (item[n.person]) { features.push(this.model.getFeatureType(fTypes.person).getFromImporter(impName, item[n.person])) }
      if (item[n.number]) { features.push(this.model.getFeatureType(fTypes.number).getFromImporter(impName, item[n.number])) }
      if (item[n.grmCase]) { features.push(this.model.getFeatureType(fTypes.grmCase).getFromImporter(impName, item[n.grmCase])) }
      if (item[n.gender]) { features.push(this.model.getFeatureType(fTypes.gender).getFromImporter(impName, item[n.gender])) }
      if (item[n.type]) { features.push(this.model.getFeatureType(fTypes.type).getFromImporter(impName, item[n.type])) }

      let primary = (item[n.primary] === 'primary')

      // Dialects could have multiple values
      let dialects = item[n.dialect].split(',')
      if (item[n.dialect] && dialects && dialects.length > 0) {
        features.push(new Feature(dialects, fTypes.dialect, this.languageID))
      }

      // Footnotes. There can be multiple footnote indexes separated by commas
      let footnoteIndexes = item[n.footnote].split(',')
      if (item[n.footnote] && footnoteIndexes && footnoteIndexes.length > 0) {
        for (let index of footnoteIndexes) { features.push(footnotes.get(index)) }
      }

      let extendedGreekData = new ExtendedGreekData()
      extendedGreekData.primary = primary
      let extendedLangData = {
        [Constants.STR_LANG_CODE_GRC]: extendedGreekData
      }
      this.addItem(form, LanguageDataset.FORM, features, extendedLangData)
    }
  }

  addFootnotes (partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      this.addFootnote(partOfSpeech, data[i][0], data[i][1])
    }
  }

  loadData () {
    let forms

    // Nouns
    let partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_NOUN]
    let suffixes = papaparse.parse(nounSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    let footnotes = papaparse.parse(nounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, footnotes.data)

    // Pronouns
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_PRONOUN]
    forms = papaparse.parse(pronounFormsCSV, {})
    this.addPronounForms(partOfSpeech, forms.data)
    return this
  }

  /**
   * Returns a feature type with lemmas that are used to group values within inflection tables,
   * such as for demonstrative pronouns
   * @param {string} grammarClass - A name of a pronoun class
   * @return {FeatureType} An object with lemma values
   */
  getPronounGroupingLemmas (grammarClass) {
    let values = this.pronounGroupingLemmas.has(grammarClass) ? this.pronounGroupingLemmas.get(grammarClass) : []
    return new FeatureType(Feature.types.word, values, this.languageID)
  }

  getObligatoryMatches (inflection) {
    let obligatoryMatches = []
    if (inflection.hasFeatureValue(Feature.types.part, Constants.POFS_PRONOUN)) {
      obligatoryMatches.push(Feature.types.grmClass)
    } else if (inflection.constraints.fullFormBased) {
      obligatoryMatches.push(Feature.types.word)
    } else {
      // Default value for suffix matching
      obligatoryMatches.push(Feature.types.part)
    }
    return obligatoryMatches
  }

  getOptionalMatches (inflection) {
    const featureOptions = [
      fTypes.grmCase,
      fTypes.declension,
      fTypes.gender,
      fTypes.number,
      fTypes.voice,
      fTypes.mood,
      fTypes.tense,
      fTypes.person
    ]
    return featureOptions.filter(f => inflection[f])
  }
}
