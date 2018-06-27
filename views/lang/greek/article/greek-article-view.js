import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekView from '@views/lang/greek/greek-view.js'
import GroupFeatureType from '@views/lib/group-feature-type.js'
import Table from '@views/lib/table.js'

export default class GreekArticleView extends GreekView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.partOfSpeech = GreekArticleView.partOfSpeech
    this.id = 'articleDeclension'
    this.name = 'article declension'
    this.title = 'Article Declension'

    this.featureTypes = {}
    this.featureTypes.numbers = new Feature(
      Feature.types.number,
      [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL],
      this.languageID
    )

    this.features = {
      numbers: new GroupFeatureType(this.featureTypes.numbers, 'Number'),
      cases: new GroupFeatureType(this.model.typeFeature(Feature.types.grmCase), 'Case'),
      genders: new GroupFeatureType(this.model.typeFeature(Feature.types.gender), 'Gender')
    }
    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_ARTICLE
  }

  static get inflectionType () {
    return Suffix
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
    if (LanguageModelFactory.compareLanguages(GreekArticleView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(GreekArticleView.partOfSpeech)
    }
  }

  createTable () {
    this.table = new Table([this.features.genders, this.features.numbers, this.features.genders])
    let features = this.table.features
    features.columns = [ this.features.genders ]

    features.rows = [this.features.numbers, this.features.genders]
    features.columnRowTitles = [this.features.numbers]
    features.fullWidthRowTitles = []
  }
}
