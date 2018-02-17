import { Constants, GreekLanguageModel, Feature, FeatureType, LanguageModelFactory } from 'alpheios-data-models'
import GreekView from './greek-view.js'
import GroupFeatureType from '../../lib/group-feature-type.js'
import Table from '../../lib/table.js'

export default class GreekPronounView extends GreekView {
  constructor (inflectionData, messages) {
    super(inflectionData, messages)
    this.id = 'pronounDeclension'
    this.name = 'pronoun declension'
    this.title = 'Pronoun declension'
    this.partOfSpeech = Constants.POFS_PRONOUN
    this.featureTypes = {}

    const GEND_MASCULINE_FEMININE = 'masculine feminine'
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'
    this.featureTypes.numbers = new FeatureType(
      Feature.types.number,
      [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL],
      this.languageID
    )
    // TODO: remove a duplicate definition in `render`
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
      persons: new GroupFeatureType(GreekLanguageModel.getFeatureType(Feature.types.grmCase), 'Case'),
      lemmas: new GroupFeatureType(this.featureTypes.lemmas, 'Lemma')
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

    // Features should go as: column features first, row features last. This specifies the order of grouping
    // in which a table tree will be built.
    this.table = new Table([this.features.lemmas, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.lemmas, this.featureTypes.genders]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  static get partOfSpeech () {
    return Constants.POFS_PRONOUN
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
    if (LanguageModelFactory.compareLanguages(GreekPronounView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(GreekPronounView.partOfSpeech)
    }
  }

  render () {
    let grammarClass = this.inflectionData.getFeatureValues(this.partOfSpeech, Feature.types.grmClass)
    if (grammarClass.length === 1) {
      grammarClass = grammarClass[0]
    } else {
      console.warn(`Cannot determine grammar class of a Greek pronoun inflection data: 
        there is no grammar class in inflection data or there is more than one grammar class`)
    }

    let features
    /*
     Grouping order is different for different pronoun classes.
     Grouped by lemma and gender are: demonstrative pronouns.
     Grouped by person and gender are: reflexive pronouns.
     Grouped by gender: general relative, indefinite, intensive, interrogative, reciprocal, and relative pronouns.
     Grouped by person are: personal pronouns.
     Possessive pronouns: no table?
    */
    if (grammarClass === Constants.CLASS_DEMONSTRATIVE) {
      let lemmas = this.dataset.getPronounGroupingLemmas(grammarClass)
      this.features.lemmas = new GroupFeatureType(lemmas, 'Lemma')
      this.table = new Table([this.features.lemmas, this.features.genders, this.features.numbers, this.features.cases])
      features = this.table.features
      features.columns = [lemmas, this.featureTypes.genders]
    } else if (grammarClass === Constants.CLASS_REFLEXIVE) {
      this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
      features = this.table.features
      features.columns = [this.featureTypes.genders]
    } else if (grammarClass === Constants.CLASS_PERSONAL) {
      this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
      features = this.table.features
      features.columns = [this.featureTypes.genders]
    } else {
      this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
      features = this.table.features
      features.columns = [this.featureTypes.genders]
    }
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]

    // A rendering code
    this.footnotes = this.inflectionData.getFootnotesMap(this.partOfSpeech)
    this.table.messages = this.messages
    this.table.construct(this.inflectionData.getSuffixes(this.partOfSpeech)).constructViews().addEventListeners()
    return this
  }
}
