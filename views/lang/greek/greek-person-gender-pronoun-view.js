import { Constants, GreekLanguageModel, Feature, LanguageModelFactory } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GroupFeatureType from '../../lib/group-feature-type.js'
import Table from '../../lib/table'
import FeatureType from '../../../../data-models/src/feature_type'

/**
 * Used for reflexive pronouns. Produces a table grouped into columns by person and gender
 */
export default class GreekPersonGenderPronounView extends GreekPronounView {
  constructor (inflectionData, messages) {
    super(inflectionData, messages)

    // Add persons
    this.featureTypes.persons = new FeatureType(
      Feature.types.person,
      [
        Constants.ORD_1ST,
        Constants.ORD_2ND,
        Constants.ORD_3RD
      ],
      this.languageID)
    this.features.perons = new GroupFeatureType(this.featureTypes.persons, 'Person')

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.persons, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.persons, this.featureTypes.genders]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_REFLEXIVE]
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

    if (LanguageModelFactory.compareLanguages(GreekPersonGenderPronounView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(GreekPersonGenderPronounView.partOfSpeech) &&
        GreekPersonGenderPronounView.classes.includes(grammarClass)
    }
  }
}
