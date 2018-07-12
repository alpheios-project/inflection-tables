import { Constants, Feature } from 'alpheios-data-models'
import Suffix from '../../../../lib/suffix.js'
import LanguageDataset from '../../../../lib/language-dataset.js'
import LatinView from '../latin-view.js'
import GroupFeatureType from '../../../lib/group-feature-type'

export default class LatinAdjectiveView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'adjectiveDeclension'
    this.name = 'adjective declension'
    this.title = 'Adjective declension'
    this.partOfSpeech = this.constructor.mainPartOfSpeech
    this.inflectionType = LanguageDataset.SUFFIX

    // Feature that are different from base class values
    this.features.declensions = new GroupFeatureType(this.language_features[Feature.types.declension], 'Declension',
      [ Constants.ORD_1ST, Constants.ORD_2ND, Constants.ORD_3RD ])

    this.features.declensions.getTitle = LatinView.getDeclensionTitle

    this.createTable()
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }
}
