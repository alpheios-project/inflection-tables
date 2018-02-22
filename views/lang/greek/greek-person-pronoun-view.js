import { Constants, GreekLanguageModel, Feature, LanguageModelFactory } from 'alpheios-data-models'
import GreekPronounView from './greek-pronoun-view.js'
import GroupFeatureType from '../../lib/group-feature-type.js'
import Table from '../../lib/table'
import FeatureType from '../../../../data-models/src/feature_type'

/**
 * Used for personal pronouns. Produces a table grouped into columns by person
 */
export default class GreekPersonPronounView extends GreekPronounView {
  constructor (inflectionData, messages) {
    super(inflectionData, messages, GreekPersonPronounView.classes[0])

    // Add persons
    this.featureTypes.persons = new FeatureType(
      Feature.types.person,
      [
        Constants.ORD_1ST,
        Constants.ORD_2ND,
        Constants.ORD_3RD
      ],
      this.languageID)
    this.features.persons = new GroupFeatureType(this.featureTypes.persons, 'Person')

    /*
    Define tables and table features.
    Features should go as: column features first, row features last. This specifies the order of grouping
    in which a table tree will be built.
     */
    this.table = new Table([this.features.persons, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [this.featureTypes.persons]
    features.rows = [this.featureTypes.numbers, GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.columnRowTitles = [GreekLanguageModel.getFeatureType(Feature.types.grmCase)]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  /**
   * What classes of pronouns this view should be used with
   * @return {string[]} Array of class names
   */
  static get classes () {
    return [Constants.CLASS_PERSONAL]
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * For that, inflectionData should match language and part of speech of this view,
   * and inflection data should contain at least one data item with the class
   * suitable for this view.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(GreekPersonPronounView.languageID, inflectionData.languageID) &&
      inflectionData.hasOwnProperty(GreekPersonPronounView.partOfSpeech)) {
      let found = inflectionData[GreekPersonPronounView.partOfSpeech].suffixes.find(
        form => GreekPersonPronounView.classes.includes(form.features[Feature.types.grmClass]))
      if (found) {
        return true
      }
    }
    return false
  }
}
