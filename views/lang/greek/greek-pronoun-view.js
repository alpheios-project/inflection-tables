import { Constants, GreekLanguageModel, Feature, FeatureType } from 'alpheios-data-models'
import View from '../../lib/view.js'
import GreekView from './greek-view.js'
import GroupFeatureType from '../../lib/group-feature-type.js'

/**
 * This is a base class for all pronoun views. This class should not be used to create tables. Its purpose
 * is to define common features and properties for all pronoun classes.
 */
export default class GreekPronounView extends GreekView {
  constructor (inflectionData, messages) {
    super(inflectionData, messages)
    let grammarClass = GreekPronounView.getClassFromInflection(this.inflectionData)
    this.id = `${grammarClass}${View.toTitleCase(GreekPronounView.partOfSpeech)}Declension`
    this.name = `${grammarClass} ${GreekPronounView.partOfSpeech} declension`
    this.title = View.toTitleCase(`${grammarClass} ${GreekPronounView.partOfSpeech} Declension`)
    this.partOfSpeech = GreekPronounView.partOfSpeech
    this.featureTypes = {}

    const GEND_MASCULINE_FEMININE = 'masculine feminine'
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'
    this.featureTypes.numbers = new FeatureType(
      Feature.types.number,
      [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL],
      this.languageID
    )

    this.featureTypes.genders = new FeatureType(
      Feature.types.gender,
      [Constants.GEND_MASCULINE, Constants.GEND_FEMININE, GEND_MASCULINE_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER],
      this.languageID
    )

    // This is just a placeholder. Lemma values will be generated dynamically
    this.featureTypes.lemmas = new FeatureType(
      Feature.types.word,
      [],
      this.languageID
    )

    this.features = {
      numbers: new GroupFeatureType(this.featureTypes.numbers, 'Number'),
      cases: new GroupFeatureType(GreekLanguageModel.getFeatureType(Feature.types.grmCase), 'Case'),
      genders: new GroupFeatureType(this.featureTypes.genders, 'Gender'),
      persons: new GroupFeatureType(GreekLanguageModel.getFeatureType(Feature.types.grmCase), 'Case')
    }

    this.features.genders.getTitle = function getTitle (featureValue) {
      if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
      if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
      if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
      if (featureValue === GEND_MASCULINE_FEMININE) { return 'm./f.' }
      if (featureValue === GEND_MASCULINE_FEMININE_NEUTER) { return 'm./f./n.' }
      return featureValue
    }

    this.features.genders.filter = function filter (featureValues, suffix) {
      // If not an array, convert it to array for uniformity
      if (!Array.isArray(featureValues)) {
        featureValues = [featureValues]
      }
      for (const value of featureValues) {
        if (suffix.features[this.type] === value) {
          return true
        }
      }

      return false
    }
  }

  static get partOfSpeech () {
    return Constants.POFS_PRONOUN
  }

  /**
   * Retrieves a value of a class feature from inflectionData. Inflection data should have the same class value
   * among all its data items.
   * @param {InflectionData} inflectionData
   * @return {string} A grammar class name
   */
  static getClassFromInflection (inflectionData) {
    let grammarClass = inflectionData.getFeatureValues(GreekPronounView.partOfSpeech, Feature.types.grmClass)
    if (grammarClass.length === 1) {
      grammarClass = grammarClass[0]
    } else {
      console.warn(`Cannot determine a grammar class of a Greek pronoun "${inflectionData.targetWord}": 
        there is no grammar class in inflection data or there is more than one grammar class`)
      grammarClass = ''
    }
    return grammarClass
  }
}
