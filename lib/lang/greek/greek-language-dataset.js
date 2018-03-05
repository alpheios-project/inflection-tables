/*
 * Greek language data module
 */
import { Constants, Feature, FeatureType, Lemma } from 'alpheios-data-models'
import LanguageDataset from '../../../lib/language-dataset'
import ExtendedGreekData from '../../../lib/extended-greek-data'
import Suffix from '../../../lib/suffix.js'
import Form from '../../../lib/form.js'
import Paradigm from '../../../lib/paradigm.js'
import nounSuffixesCSV from './data/noun/suffixes.csv'
import nounFootnotesCSV from './data/noun/footnotes.csv'
import pronounFormsCSV from './data/pronoun/forms.csv'
import pronounFootnotesCSV from './data/pronoun/footnotes.csv'
/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */
import paradigm01 from './data/paradigm/tabes/paradigm-01.htmlf'
import paradigm02 from './data/paradigm/tabes/paradigm-02.htmlf'
import paradigm03 from './data/paradigm/tabes/paradigm-03.htmlf'
import paradigm04 from './data/paradigm/tabes/paradigm-04.htmlf'
import paradigm05 from './data/paradigm/tabes/paradigm-05.htmlf'
import paradigm06 from './data/paradigm/tabes/paradigm-06.htmlf'
import paradigm07 from './data/paradigm/tabes/paradigm-07.htmlf'
import paradigm08 from './data/paradigm/tabes/paradigm-08.htmlf'
import paradigm09 from './data/paradigm/tabes/paradigm-09.htmlf'
import paradigm10 from './data/paradigm/tabes/paradigm-10.htmlf'
import paradigm11 from './data/paradigm/tabes/paradigm-11.htmlf'
import paradigm12 from './data/paradigm/tabes/paradigm-12.htmlf'
import paradigm13 from './data/paradigm/tabes/paradigm-13.htmlf'
import paradigm14 from './data/paradigm/tabes/paradigm-14.htmlf'
import paradigm15 from './data/paradigm/tabes/paradigm-15.htmlf'
import paradigm16 from './data/paradigm/tabes/paradigm-16.htmlf'
import paradigm17 from './data/paradigm/tabes/paradigm-17.htmlf'
import paradigm18 from './data/paradigm/tabes/paradigm-18.htmlf'
import paradigm19 from './data/paradigm/tabes/paradigm-19.htmlf'
import paradigm20 from './data/paradigm/tabes/paradigm-20.htmlf'
import paradigm21 from './data/paradigm/tabes/paradigm-21.htmlf'
import paradigm22 from './data/paradigm/tabes/paradigm-22.htmlf'
import paradigm23 from './data/paradigm/tabes/paradigm-23.htmlf'
import paradigm24 from './data/paradigm/tabes/paradigm-24.htmlf'
import paradigm25 from './data/paradigm/tabes/paradigm-25.htmlf'
import paradigm26 from './data/paradigm/tabes/paradigm-26.htmlf'
import paradigm27 from './data/paradigm/tabes/paradigm-27.htmlf'
import paradigm28 from './data/paradigm/tabes/paradigm-28.htmlf'
import paradigm29 from './data/paradigm/tabes/paradigm-29.htmlf'
import paradigm30 from './data/paradigm/tabes/paradigm-30.htmlf'
import paradigm31 from './data/paradigm/tabes/paradigm-31.htmlf'
import paradigm32 from './data/paradigm/tabes/paradigm-32.htmlf'
import paradigm33 from './data/paradigm/tabes/paradigm-33.htmlf'
import paradigm34 from './data/paradigm/tabes/paradigm-34.htmlf'
import paradigm35 from './data/paradigm/tabes/paradigm-35.htmlf'
import paradigm36 from './data/paradigm/tabes/paradigm-36.htmlf'
import paradigm37 from './data/paradigm/tabes/paradigm-37.htmlf'
import paradigm38 from './data/paradigm/tabes/paradigm-38.htmlf'
import paradigm39 from './data/paradigm/tabes/paradigm-39.htmlf'
import paradigm40 from './data/paradigm/tabes/paradigm-40.htmlf'
import paradigm41 from './data/paradigm/tabes/paradigm-41.htmlf'
import paradigm42 from './data/paradigm/tabes/paradigm-42.htmlf'
import paradigm43 from './data/paradigm/tabes/paradigm-43.htmlf'
import paradigm44 from './data/paradigm/tabes/paradigm-44.htmlf'
import paradigm45 from './data/paradigm/tabes/paradigm-45.htmlf'
import paradigm46 from './data/paradigm/tabes/paradigm-46.htmlf'
import paradigm47 from './data/paradigm/tabes/paradigm-47.htmlf'
import paradigm48 from './data/paradigm/tabes/paradigm-48.htmlf'
import paradigm49 from './data/paradigm/tabes/paradigm-49.htmlf'
import paradigm50 from './data/paradigm/tabes/paradigm-50.htmlf'
import paradigm51 from './data/paradigm/tabes/paradigm-51.htmlf'
import paradigm52 from './data/paradigm/tabes/paradigm-52.htmlf'
import paradigm53 from './data/paradigm/tabes/paradigm-53.htmlf'
import paradigm54 from './data/paradigm/tabes/paradigm-54.htmlf'
import paradigm55 from './data/paradigm/tabes/paradigm-55.htmlf'
import paradigm56 from './data/paradigm/tabes/paradigm-56.htmlf'
import paradigm57 from './data/paradigm/tabes/paradigm-57.htmlf'
import paradigm58 from './data/paradigm/tabes/paradigm-58.htmlf'
import paradigm59 from './data/paradigm/tabes/paradigm-59.htmlf'
import paradigm60 from './data/paradigm/tabes/paradigm-60.htmlf'
import paradigm61 from './data/paradigm/tabes/paradigm-61.htmlf'
import paradigm62 from './data/paradigm/tabes/paradigm-62.htmlf'
import paradigm63 from './data/paradigm/tabes/paradigm-63.htmlf'
import paradigm64 from './data/paradigm/tabes/paradigm-64.htmlf'
import paradigm65 from './data/paradigm/tabes/paradigm-65.htmlf'
import paradigm66 from './data/paradigm/tabes/paradigm-66.htmlf'
import paradigmRulesCSV from './data/paradigm/rules.csv'
import paradigmFootnotesCSV from './data/paradigm/footnotes.csv'
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
      this.addInflection(partOfSpeech.value, Suffix, suffixValue, features, extendedLangData)
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
      this.addInflection(partOfSpeech.value, Form, form, features, extendedLangData)
    }
  }

  getParadigms (partOfSpeech) {
    // Paradigm tables
    let paradigms = new Map([
      ['verbpdgm1', new Paradigm(paradigm01)],
      ['verbpdgm2', new Paradigm(paradigm02)],
      ['verbpdgm3', new Paradigm(paradigm03)],
      ['verbpdgm4', new Paradigm(paradigm04)],
      ['verbpdgm5', new Paradigm(paradigm05)],
      ['verbpdgm6', new Paradigm(paradigm06)],
      ['verbpdgm7', new Paradigm(paradigm07)],
      ['verbpdgm8', new Paradigm(paradigm08)],
      ['verbpdgm9', new Paradigm(paradigm09)],
      ['verbpdgm10', new Paradigm(paradigm10)],
      ['verbpdgm11', new Paradigm(paradigm11)],
      ['verbpdgm12', new Paradigm(paradigm12)],
      ['verbpdgm13', new Paradigm(paradigm13)],
      ['verbpdgm14', new Paradigm(paradigm14)],
      ['verbpdgm15', new Paradigm(paradigm15)],
      ['verbpdgm16', new Paradigm(paradigm16)],
      ['verbpdgm17', new Paradigm(paradigm17)],
      ['verbpdgm18', new Paradigm(paradigm18)],
      ['verbpdgm19', new Paradigm(paradigm19)],
      ['verbpdgm20', new Paradigm(paradigm20)],
      ['verbpdgm21', new Paradigm(paradigm21)],
      ['verbpdgm22', new Paradigm(paradigm22)],
      ['verbpdgm23', new Paradigm(paradigm23)],
      ['verbpdgm24', new Paradigm(paradigm24)],
      ['verbpdgm25', new Paradigm(paradigm25)],
      ['verbpdgm26', new Paradigm(paradigm26)],
      ['verbpdgm27', new Paradigm(paradigm27)],
      ['verbpdgm28', new Paradigm(paradigm28)],
      ['verbpdgm29', new Paradigm(paradigm29)],
      ['verbpdgm30', new Paradigm(paradigm30)],
      ['verbpdgm31', new Paradigm(paradigm31)],
      ['verbpdgm32', new Paradigm(paradigm32)],
      ['verbpdgm33', new Paradigm(paradigm33)],
      ['verbpdgm34', new Paradigm(paradigm34)],
      ['verbpdgm35', new Paradigm(paradigm35)],
      ['verbpdgm36', new Paradigm(paradigm36)],
      ['verbpdgm37', new Paradigm(paradigm37)],
      ['verbpdgm38', new Paradigm(paradigm38)],
      ['verbpdgm39', new Paradigm(paradigm39)],
      ['verbpdgm40', new Paradigm(paradigm40)],
      ['verbpdgm41', new Paradigm(paradigm41)],
      ['verbpdgm42', new Paradigm(paradigm42)],
      ['verbpdgm43', new Paradigm(paradigm43)],
      ['verbpdgm44', new Paradigm(paradigm44)],
      ['verbpdgm45', new Paradigm(paradigm45)],
      ['verbpdgm46', new Paradigm(paradigm46)],
      ['verbpdgm47', new Paradigm(paradigm47)],
      ['verbpdgm48', new Paradigm(paradigm48)],
      ['verbpdgm49', new Paradigm(paradigm49)],
      ['verbpdgm50', new Paradigm(paradigm50)],
      ['verbpdgm51', new Paradigm(paradigm51)],
      ['verbpdgm52', new Paradigm(paradigm52)],
      ['verbpdgm53', new Paradigm(paradigm53)],
      ['verbpdgm54', new Paradigm(paradigm54)],
      ['verbpdgm55', new Paradigm(paradigm55)],
      ['verbpdgm56', new Paradigm(paradigm56)],
      ['verbpdgm57', new Paradigm(paradigm57)],
      ['verbpdgm58', new Paradigm(paradigm58)],
      ['verbpdgm59', new Paradigm(paradigm59)],
      ['verbpdgm60', new Paradigm(paradigm60)],
      ['verbpdgm61', new Paradigm(paradigm61)],
      ['verbpdgm62', new Paradigm(paradigm62)],
      ['verbpdgm63', new Paradigm(paradigm63)],
      ['verbpdgm64', new Paradigm(paradigm64)],
      ['verbpdgm65', new Paradigm(paradigm65)],
      ['verbpdgm66', new Paradigm(paradigm66)]
    ])

    // An order of columns in a data CSV file
    const n = {
      id: 0,
      matchOrder: 1,
      partOfSpeech: 2,
      stemtype: 3,
      voice: 4,
      mood: 5,
      tense: 6,
      lemma: 7,
      morphFlags: 8,
      dialect: 9
    }
    const data = papaparse.parse(paradigmRulesCSV, {}).data

    // First row contains headers
    for (let i = 1; i < data.length; i++) {
      let item = data[i]
      let id = item[n.id]
      let matchOrder = Number.parseInt(item[n.matchOrder])

      let features = []

      if (item[n.partOfSpeech]) { features.push(this.model.getFeatureType(Feature.types.part).getFromImporter(impName, item[n.partOfSpeech])) }
      if (item[n.stemtype]) { features.push(this.model.getFeatureType(Feature.types.stemtype).getFromImporter(impName, item[n.stemtype])) }
      if (item[n.voice]) { features.push(this.model.getFeatureType(Feature.types.voice).getFromImporter(impName, item[n.voice])) }
      if (item[n.mood]) { features.push(this.model.getFeatureType(Feature.types.mood).getFromImporter(impName, item[n.mood])) }
      if (item[n.tense]) { features.push(this.model.getFeatureType(Feature.types.tense).getFromImporter(impName, item[n.tense])) }
      if (item[n.dialect]) { features.push(this.model.getFeatureType(Feature.types.dialect).getFromImporter(impName, item[n.dialect])) }

      let lemma
      if (item[n.lemma]) {
        lemma = new Lemma(item[n.lemma], this.constructor.languageID)
      }

      let morphFlags = ''
      if (item[n.morphFlags]) {
        morphFlags = item[n.morphFlags]
      }

      if (paradigms.has(id)) {
        paradigms.get(id).addRule(matchOrder, features, lemma, morphFlags)
      } else {
        console.warn(`Cannot find a paradigm table for "${id}" index`)
      }
    }
    for (let paradigm of paradigms.values()) {
      paradigm.sortRules()
    }
    return Array.from(paradigms.values())
  }

  addFootnotes (partOfSpeech, classType, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      this.addFootnote(partOfSpeech.value, classType, data[i][0], data[i][1])
    }
  }

  loadData () {
    let partOfSpeech
    let suffixes
    let forms
    let footnotes

    // Nouns
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_NOUN]
    suffixes = papaparse.parse(nounSuffixesCSV, {})
    this.addSuffixes(partOfSpeech, suffixes.data)
    footnotes = papaparse.parse(nounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Suffix, footnotes.data)

    // Pronouns
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_PRONOUN]
    forms = papaparse.parse(pronounFormsCSV, {})
    this.addPronounForms(partOfSpeech, forms.data)
    footnotes = papaparse.parse(pronounFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Form, footnotes.data)

    // Verbs
    // Paradigms
    partOfSpeech = this.model.getFeatureType(fTypes.part)[Constants.POFS_VERB]
    let paradigms = this.getParadigms(partOfSpeech)
    this.addParadigms(partOfSpeech, paradigms)
    footnotes = papaparse.parse(paradigmFootnotesCSV, {})
    this.addFootnotes(partOfSpeech, Paradigm, footnotes.data)

    this.dataLoaded = true
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
