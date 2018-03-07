import { Constants, GreekLanguageModel, Feature, FeatureType, LanguageModelFactory } from 'alpheios-data-models'
import Paradigm from '../../../../lib/paradigm.js'
import View from '../../../lib/view.js'
import GreekView from '../greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'

/**
 * This is a base class for all pronoun views. This class should not be used to create tables. Its purpose
 * is to define common features and properties for all pronoun classes.
 */
export default class GreekParadigmView extends GreekView {
  /**
   * @param {InflectionData} inflectionData
   * @param {MessageBundle} messages
   * @param {string} grammarClass - For what pronoun class a view will be created
   */
  constructor (paradigm, inflectionData, messages, grammarClass = 'Greek') {
    super(inflectionData, messages)
    this.id = paradigm.id
    this.name = GreekParadigmView.getName(grammarClass)
    this.title = GreekParadigmView.getTitle(grammarClass)
    this.paradigm = paradigm
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
    return Constants.POFS_VERB
  }

  static get inflectionType () {
    return Paradigm
  }

  /**
   * What classes of pronouns this view should be used with.
   * Should be defined in descendants.
   * @return {string[]} Array of class names
   */
  static get classes () {
    return []
  }

  static getID (grammarClass) {
    return `${grammarClass}${View.toTitleCase(GreekParadigmView.partOfSpeech)}Paradigm`
  }

  static getName (grammarClass) {
    return `${grammarClass} ${GreekParadigmView.partOfSpeech} paradigm`
  }

  static getTitle (grammarClass) {
    return View.toTitleCase(`${grammarClass} ${GreekParadigmView.partOfSpeech} Paradigm`).trim()
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(this.languageID, inflectionData.languageID) &&
      inflectionData.pos.has(this.partOfSpeech)) {
      let inflectionSet = inflectionData.pos.get(this.partOfSpeech)
      if (inflectionSet.types.has(this.inflectionType)) {
        return true
      }
    }
    return false
  }

  static getMatchingInstances (inflectionData, messages) {
    console.log(`Get matching instances`)
    if (this.matchFilter(inflectionData)) {
      let paradigms = inflectionData.pos.get(this.partOfSpeech).types.get(this.inflectionType).items
      return paradigms.map(paradigm => new this(paradigm, inflectionData, messages))
    }
    return []
  }

  render () {
    this.nodes = document.createElement('div')
    this.nodes.innerHTML = this.paradigm.html

    this.footnotes = this.getFootnotes(this.inflectionData)
    return this
  }

  get wideViewNodes () {
    return this.nodes
  }

  hideEmptyColumns () {
    return this
  }

  showEmptyColumns () {
    return this
  }

  hideNoSuffixGroups () {
    return this
  }

  showNoSuffixGroups () {
    return this
  }
}
