import { Constants, Feature } from 'alpheios-data-models'
import Form from '../../../../lib/form.js'
import GreekView from '../greek-view.js'
import GroupFeatureType from '../../../lib/group-feature-type.js'
import Table from '../../../lib/table'

export default class GreekArticleView extends GreekView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)

    this.partOfSpeech = Constants.POFS_ARTICLE
    this.inflectionType = Form

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
      genders: new GroupFeatureType(this.model.typeFeature(Feature.types.gender), 'Gender'),
      types: new GroupFeatureType(this.model.typeFeature(Feature.types.type), 'Type')
    }
    this.createTable()
  }

  static get partOfSpeech () {
    return Constants.POFS_ARTICLE
  }

  static get inflectionType () {
    return Form
  }

  createTable () {
    this.table = new Table([this.features.genders, this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [ this.features.genders ]

    features.rows = [this.features.numbers, this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = [this.featureTypes.numbers]
  }

  static getMorphemes (inflectionData) {
    return inflectionData.pos.get(this.partOfSpeech)
      .types.get(this.inflectionType).items
  }
}
