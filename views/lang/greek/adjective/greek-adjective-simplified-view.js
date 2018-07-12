import { Constants } from 'alpheios-data-models'
import Suffix from '@lib/suffix.js'
import GreekAdjectiveView from '@views/lang/greek/adjective/greek-adjective-view'

export default class GreekAdjectiveSimplifiedView extends GreekAdjectiveView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)
    this.id = 'adjectiveDeclensionSimplified'
    this.name = 'adjective declension simplified'
    this.title = 'Adjective declension (simplified)'
    this.partOfSpeech = this.constructor.mainPartOfSpeech
    this.inflectionType = Suffix
    const genderMasculine = Constants.GEND_MASCULINE
    const genderFeminine = Constants.GEND_FEMININE
    const genderNeuter = Constants.GEND_NEUTER

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures.value === Constants.ORD_2ND || ancestorFeatures.value === Constants.ORD_3RD) {
          return [[genderMasculine, genderFeminine], genderNeuter]
        }
      }
      return [genderMasculine, genderFeminine, genderNeuter]
    }

    this.createTable()

    this.table.suffixCellFilter = GreekAdjectiveSimplifiedView.suffixCellFilter
  }

  static get partsOfSpeech () {
    return [Constants.POFS_ADJECTIVE]
  }

  static get inflectionType () {
    return Suffix
  }

  static suffixCellFilter (suffix) {
    if (suffix.extendedLangData && suffix.extendedLangData[Constants.STR_LANG_CODE_GRC]) {
      return suffix.extendedLangData[Constants.STR_LANG_CODE_GRC].primary
    } else {
      console.warn(`Greek morpheme "${suffix.value}" has no extended language data attached.`)
      return false
    }
  }
}
