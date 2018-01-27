import { Constants, GreekLanguageModel, Feature } from 'alpheios-data-models'
// import languages from '../../lib/languages'
import View from '../lib/view'
import GroupFeatureType from '../lib/group-feature-type'
import Table from '../lib/table'
// import { types } from '../../lib/lang/greek/greek'
// import * as Models from '../../../data-models'

let languageModel = new GreekLanguageModel()
let featureTypes = Feature.types
let langFeatures = languageModel.features

class GreekView extends View {
  constructor () {
    super()
    this.languageCode = Constants.STR_LANG_CODE_GRC

    /*
    Default grammatical features of a View. It child views need to have different feature values, redefine
    those values in child objects.
     */
    this.features = {
      numbers: new GroupFeatureType(langFeatures[featureTypes.number], 'Number'),
      cases: new GroupFeatureType(langFeatures[featureTypes.grmCase], 'Case'),
      declensions: new GroupFeatureType(langFeatures[featureTypes.declension], 'Declension'),
      genders: new GroupFeatureType(langFeatures[featureTypes.gender], 'Gender'),
      types: new GroupFeatureType(langFeatures[featureTypes.type], 'Type')
    }
  }

  get language () {
    console.warn(`Please use languageCode instead`)
    return this.languageCode
  }

  set language (value) {
    console.warn(`Please use languageCode instead`)
    this.languageCode = value
  }

  /**
   * Creates and initializes an inflection table. Redefine this method in child objects in order to create
   * an inflection table differently.
   */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [langFeatures[featureTypes.declension], langFeatures[featureTypes.gender], langFeatures[featureTypes.type]]
    features.rows = [langFeatures[featureTypes.number], langFeatures[featureTypes.grmCase]]
    features.columnRowTitles = [langFeatures[featureTypes.grmCase]]
    features.fullWidthRowTitles = [langFeatures[featureTypes.number]]
  }
}

class NounView extends GreekView {
  constructor () {
    super()
    this.id = 'nounDeclension'
    this.name = 'noun declension'
    this.title = 'Noun declension'
    this.partOfSpeech = Constants.POFS_NOUN
    let genderMasculine = langFeatures[featureTypes.gender][Constants.GEND_MASCULINE].value
    let genderFeminine = langFeatures[featureTypes.gender][Constants.GEND_FEMININE].value
    let genderNeuter = langFeatures[featureTypes.gender][Constants.GEND_NEUTER].value

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures[0].value === langFeatures[featureTypes.declension][Constants.ORD_2ND].value ||
          ancestorFeatures[0].value === langFeatures[featureTypes.declension][Constants.ORD_3RD].value) {
          return [[genderMasculine, genderFeminine], genderNeuter]
        }
      }
      return [genderMasculine, genderFeminine, genderNeuter]
    }

    this.createTable()
  }
}

class NounViewSimplified extends NounView {
  constructor () {
    super()
    this.id = 'nounDeclensionSimplified'
    this.name = 'noun declension simplified'
    this.title = 'Noun declension (simplified)'
    this.partOfSpeech = Constants.POFS_NOUN
    let genderMasculine = langFeatures[featureTypes.gender][Constants.GEND_MASCULINE].value
    let genderFeminine = langFeatures[featureTypes.gender][Constants.GEND_FEMININE].value
    let genderNeuter = langFeatures[featureTypes.gender][Constants.GEND_NEUTER].value

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures[0].value === langFeatures[featureTypes.declension][Constants.ORD_2ND].value) {
          return [[genderMasculine, genderFeminine], genderNeuter]
        }
        if (ancestorFeatures[0].value === langFeatures[featureTypes.declension][Constants.ORD_3RD].value) {
          return [[genderMasculine, genderFeminine, genderNeuter]]
        }
      }
      return [genderMasculine, genderFeminine, genderNeuter]
    }

    this.createTable()

    this.table.suffixCellFilter = NounViewSimplified.suffixCellFilter
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

// TODO: Change a case sort order
class PronounView extends GreekView {
  constructor () {
    super()
    this.id = 'pronounDeclension'
    this.name = 'pronoun declension'
    this.title = 'Pronoun declension'
    this.partOfSpeech = Constants.POFS_PRONOUN

    this.features = {
      numbers: new GroupFeatureType(langFeatures[featureTypes.number], 'Number'),
      cases: new GroupFeatureType(langFeatures[featureTypes.grmCase], 'Case'),
      genders: new GroupFeatureType(langFeatures[featureTypes.gender], 'Gender')
    }

    // Features should go as: column features first, row features last
    this.table = new Table([this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [langFeatures[featureTypes.gender]]
    features.rows = [langFeatures[featureTypes.number], langFeatures[featureTypes.grmCase]]
    features.columnRowTitles = [langFeatures[featureTypes.grmCase]]
    features.fullWidthRowTitles = [langFeatures[featureTypes.number]]
  }
}

export default [new NounView(), new NounViewSimplified(), new PronounView()]
