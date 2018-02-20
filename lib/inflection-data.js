import * as Models from 'alpheios-data-models'
import Suffix from './suffix'
import Footnote from './footnote'

/**
 * A return value for inflection queries. Stores suffixes and/or forms and suffixes they use.
 * Suffixes/forms and footnotes are grouped by part of speech within a [Models.Feature.types.part] property object.
 */
export default class InflectionData {
  constructor (homonym) {
    this.homonym = homonym
    /** Defines a language ID of this inflection data. */
    this.languageID = homonym.languageID
    this[Models.Feature.types.part] = [] // What parts of speech are represented by this object.
  }

  get targetWord () {
    if (this.homonym && this.homonym.targetWord) {
      return this.homonym.targetWord
    }
  }

  /**
   * Returns a list of parts of speech that have any inflection data for them.
   * @return {String[]} Names of parts of speech, as strings, in an array.
   */
  get partsOfSpeech () {
    if (this.hasOwnProperty(Models.Feature.types.part)) {
      return this[Models.Feature.types.part]
    } else {
      return []
    }
  }

  getSuffixes (partOfSpeech) {
    if (this.hasOwnProperty(partOfSpeech) && this[partOfSpeech].hasOwnProperty('suffixes')) {
      return this[partOfSpeech].suffixes
    } else {
      return []
    }
  }

  getFootnotesMap (partOfSpeech) {
    let footnotes = new Map()
    if (this.hasOwnProperty(partOfSpeech) && this[partOfSpeech].hasOwnProperty('footnotes')) {
      for (const footnote of this[partOfSpeech].footnotes) {
        footnotes.set(footnote.index, footnote)
      }
    }
    return footnotes
  }

  /**
   * Retrieves all variants of feature values for a given part of speech.
   * @param partOfSpeech
   * @param featureName
   */
  getFeatureValues (partOfSpeech, featureName) {
    let values = []
    if (this.hasOwnProperty(partOfSpeech)) {
      for (const item of this[partOfSpeech].suffixes) {
        if (item.hasOwnProperty('features') && item.features.hasOwnProperty(featureName)) {
          let value = item.features[featureName]
          if (!values.includes(value)) {
            values.push(value)
          }
        }
      }
    }
    return values
  }

  static readObject (jsonObject) {
    // let homonym = Models.Homonym.readObject(jsonObject.homonym)

    let lexicalData = new InflectionData()
    lexicalData[Models.Feature.types.part] = jsonObject[Models.Feature.types.part]

    for (let part of lexicalData[Models.Feature.types.part]) {
      let partData = jsonObject[part]
      lexicalData[part] = {}

      if (partData.suffixes) {
        lexicalData[part].suffixes = []
        for (let suffix of partData.suffixes) {
          lexicalData[part].suffixes.push(Suffix.readObject(suffix))
        }
      }

      if (partData.footnotes) {
        lexicalData[part].footnotes = []
        for (let footnote of partData.footnotes) {
          lexicalData[part].footnotes.push(Footnote.readObject(footnote))
        }
      }
    }

    return lexicalData
  }
}
