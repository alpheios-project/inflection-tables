import { Constants, GreekLanguageModel, Feature, LanguageModelFactory } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import Table from '../../lib/table'

/**
 * Used for several classes of pronouns, see `classes` method for a full list.
 * Produces a table grouped into columns by gender.
 */
export default class GreekGenderPronounView extends GreekPronounView {
  constructor (inflectionData, messages) {
    super(inflectionData, messages)

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.genders]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [
      Constants.CLASS_GENERAL_RELATIVE,
      Constants.CLASS_INDEFINITE,
      Constants.CLASS_INTENSIVE,
      Constants.CLASS_INTERROGATIVE,
      Constants.CLASS_RECIPROCAL,
      Constants.CLASS_RELATIVE
    ]
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
    let grammarClass = GreekPronounView.getClassFromInflection(inflectionData)

    if (LanguageModelFactory.compareLanguages(GreekGenderPronounView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(GreekGenderPronounView.partOfSpeech) &&
        GreekGenderPronounView.classes.includes(grammarClass)
    }
  }
}
