import { Constants, Feature, FeatureImporter, Lemma, LanguageModelFactory as LMF } from 'alpheios-data-models'
import Paradigm from '@/paradigm/lib/paradigm.js'
import GreekParadigmData from '@/paradigm/data/greek/greek-paradigm-data.js'

import InflectionSet from '@lib//inflection-set.js'
import Footnote from '@lib/footnote.js'

import papaparse from 'papaparse'

let typeFeatures = new Map()
let typeFeaturesInitialized = false


export default class GreekParadigmDataset {
  static get languageID () {
    return Constants.LANG_GREEK
  }

  static get model () {
    return LMF.getLanguageModel(this.languageID)
  }

  static get constants () {
    // TODO: Shall we move it to constants in data models?
    return {
      GEND_MASCULINE_FEMININE: 'masculine feminine',
      GEND_MASCULINE_FEMININE_NEUTER: 'masculine feminine neuter'
    }
  }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    typeFeatures = this.model.typeFeatures
    typeFeatures.set(Feature.types.footnote, new Feature(Feature.types.footnote, [], this.languageID))
    typeFeatures.set(Feature.types.fullForm, new Feature(Feature.types.fullForm, [], this.languageID))
    typeFeatures.set(Feature.types.hdwd, new Feature(Feature.types.hdwd, [], this.languageID))
    typeFeatures.set(Feature.types.dialect, new Feature(Feature.types.dialect, [], this.languageID))

    // Create an importer with default values for every feature
    for (let feature of typeFeatures.values()) { // eslint-disable-line prefer-const
      feature.addImporter(new FeatureImporter(feature.values, true))
    }

    // Custom importers for Greek-specific feature values
    typeFeatures.get(Feature.types.gender).getImporter()
      .map(this.constants.GEND_MASCULINE_FEMININE, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE])
      .map(this.constants.GEND_MASCULINE_FEMININE_NEUTER, [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER])
    typeFeatures.get(Feature.types.tense).getImporter()
      .map('future_perfect', [Constants.TENSE_FUTURE_PERFECT])
  }

  static setParadigmData (partOfSpeech, paradigms, rulesData, suppParadigmTables) {
    // An order of columns in a data CSV file
    const n = {
      id: 0,
      matchOrder: 1,
      partOfSpeech: 2, // Ignored, an argument value will be used
      stemtype: 3,
      voice: 4,
      mood: 5,
      tense: 6,
      lemma: 7,
      morphFlags: 8,
      dialect: 9
    }

    // First row contains headers
    for (let i = 1; i < rulesData.length; i++) {
      const item = rulesData[i]
      const id = item[n.id]
      const matchOrder = Number.parseInt(item[n.matchOrder])

      let features = [partOfSpeech] // eslint-disable-line prefer-const

      if (item[n.stemtype]) { features.push(this.typeFeatures.get(Feature.types.stemtype).createFromImporter(item[n.stemtype])) }
      if (item[n.voice]) { features.push(this.typeFeatures.get(Feature.types.voice).createFromImporter(item[n.voice])) }
      if (item[n.mood]) { features.push(this.typeFeatures.get(Feature.types.mood).createFromImporter(item[n.mood])) }
      if (item[n.tense]) { features.push(this.typeFeatures.get(Feature.types.tense).createFromImporter(item[n.tense])) }
      if (item[n.dialect]) { features.push(this.typeFeatures.get(Feature.types.dialect).createFromImporter(item[n.dialect])) }

      let lemma
      if (item[n.lemma]) {
        lemma = new Lemma(item[n.lemma], this.languageID)
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
    for (let paradigm of paradigms.values()) { // eslint-disable-line prefer-const
      paradigm.sortRules()
      paradigm.addSuppTables(suppParadigmTables)
    }
    return Array.from(paradigms.values())
  }

  static loadVerbParadigmData (pos) {
    const verbParadigmTables = GreekParadigmData.verbParadigmTables
    const verbParticipleParadigmTables = GreekParadigmData.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])

    const partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB)
    const paradigms = this.setParadigmData(
      partOfSpeech, verbParadigmTables,
      papaparse.parse(GreekParadigmData.verbParadigmRules, { skipEmptyLines: true }).data, verbAndParticipleParadigmTables)

    // console.info(paradigms)

    this.addParadigms(pos, partOfSpeech, paradigms)
    this.addFootnotes(pos, partOfSpeech, Paradigm, papaparse.parse(GreekParadigmData.verbParadigmFootnotes, { skipEmptyLines: true }).data)
  }

  static loadVerbParticipleParadigmData (pos) {
    const verbParadigmTables = GreekParadigmData.verbParadigmTables
    const verbParticipleParadigmTables = GreekParadigmData.verbParticipleParadigmTables
    const verbAndParticipleParadigmTables = new Map([...verbParadigmTables, ...verbParticipleParadigmTables])
    
    const partOfSpeech = this.typeFeatures.get(Feature.types.part).createFeature(Constants.POFS_VERB_PARTICIPLE)
    const paradigms = this.setParadigmData(
      partOfSpeech, verbParticipleParadigmTables,
      papaparse.parse(GreekParadigmData.verbParticipleParadigmRules, { skipEmptyLines: true }).data, verbAndParticipleParadigmTables)
    
    this.addParadigms(pos, partOfSpeech, paradigms)
  }

  static addParadigms (pos, partOfSpeech, paradigms) {
    if (!pos.has(partOfSpeech.value)) {
      pos.set(partOfSpeech.value, new InflectionSet(partOfSpeech.value, this.languageID))
    }
    pos.get(partOfSpeech.value).addInflectionItems(paradigms)
  }

  static addFootnote (pos, partOfSpeech, classType, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    const footnote = new Footnote(index, text, partOfSpeech)

    // this.footnotes.push(footnote)

    if (!pos.has(partOfSpeech)) {
      pos.set(partOfSpeech, new InflectionSet(partOfSpeech, this.languageID))
    }
    pos.get(partOfSpeech).addFootnote(classType, index, footnote)
    return footnote
  }

  static addFootnotes (pos, partOfSpeech, classType, data) {
    let footnotes = [] // eslint-disable-line prefer-const
    // First row are headers
    for (let i = 1; i < data.length; i++) {
      const footnote = this.addFootnote(pos, partOfSpeech.value, classType, data[i][0], data[i][1])
      footnotes.push(footnote)
    }
    return footnotes
  }

  static setParadigmInflectionData (pos, inflection) {
    let partOfSpeech = inflection[Feature.types.part].value
    if (pos.get(partOfSpeech)) {
      inflection.constraints.paradigmBased = pos.get(partOfSpeech).hasMatchingItems(Paradigm, inflection)
    }
  }

  static createParadigmInflectionSet (sourceSet, inflections, inflectionSet) {
    
    const paradigmBased = inflections.some(i => i.constraints.paradigmBased)

    if (paradigmBased) {
      const paradigms = sourceSet.getMatchingItems(Paradigm, inflections)
      inflectionSet.addInflectionItems(paradigms)
    }

  }
}