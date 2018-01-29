import { Constants, GreekLanguageModel, Feature, FeatureType } from 'alpheios-data-models'
import View from '../lib/view'
import GroupFeatureType from '../lib/group-feature-type'
import Table from '../lib/table'

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

    console.log(`Pronoun view constructor`)
    const GEND_MASCULINE_FEMININE_NEUTER = 'masculine feminine neuter'
    let numbers = new FeatureType(
      Feature.types.number,
      [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL], // Use a custom sort order
      this.languageCode
    )
    let genders = new FeatureType(
      Feature.types.gender,
      [ Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER ],
      this.languageCode
    )

    let lemmas = new FeatureType(
      Feature.types.word,
      [],
      this.languageCode
    )

    // Lemma values must be generated

    this.features = {
      numbers: new GroupFeatureType(numbers, 'Number'),
      cases: new GroupFeatureType(langFeatures[featureTypes.grmCase], 'Case'),
      genders: new GroupFeatureType(genders, 'Gender'),
      lemmas: new GroupFeatureType(lemmas, 'Lemma')
    }

    this.features.genders.getTitle = function getTitle (featureValue) {
      if (featureValue === Constants.GEND_MASCULINE) { return 'm.' }
      if (featureValue === Constants.GEND_FEMININE) { return 'f.' }
      if (featureValue === Constants.GEND_NEUTER) { return 'n.' }
      if (featureValue === GEND_MASCULINE_FEMININE_NEUTER) { return 'm./f./n.' }
      return featureValue
    }

    this.features.genders.filter = function filter (featureValues, suffix) {
      console.log('A custom group feature type filter', featureValues)
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

    this.render = function render (inflectionData, messages) {
      console.log(`Custom render`)
      // TODO: Update view with function to replace lemma values dynamically to avoid repetitious code below
      let numbers = new FeatureType(
        Feature.types.number,
        [Constants.NUM_SINGULAR, Constants.NUM_DUAL, Constants.NUM_PLURAL], // Use a custom sort order
        this.languageCode
      )
      let genders = new FeatureType(
        Feature.types.gender,
        [ Constants.GEND_MASCULINE, Constants.GEND_FEMININE, Constants.GEND_NEUTER, GEND_MASCULINE_FEMININE_NEUTER ],
        this.languageCode
      )
      let lemmas = new FeatureType(
        Feature.types.word,
        ['οὗτος', 'ἐκεῖνος', 'ὅδε'],
        this.languageCode
      )
      this.features.lemmas = new GroupFeatureType(lemmas, 'Lemma')
      this.table = new Table([this.features.lemmas, this.features.genders, this.features.numbers, this.features.cases])
      let features = this.table.features
      features.columns = [lemmas, genders]
      features.rows = [numbers, langFeatures[featureTypes.grmCase]]
      features.columnRowTitles = [langFeatures[featureTypes.grmCase]]
      features.fullWidthRowTitles = [numbers]

      // Start of original render code
      let selection = inflectionData[this.partOfSpeech]

      this.footnotes = new Map()
      if (selection.footnotes && Array.isArray(selection.footnotes)) {
        for (const footnote of selection.footnotes) {
          this.footnotes.set(footnote.index, footnote)
        }
      }

      // Table is created during view construction
      this.table.messages = messages
      this.table.construct(selection.suffixes).constructViews().addEventListeners()
      return this
    }

    // Features should go as: column features first, row features last. This specifies the order of grouping
    // in which a table tree will be built.
    this.table = new Table([this.features.lemmas, this.features.genders, this.features.numbers, this.features.cases])
    let features = this.table.features
    features.columns = [lemmas, genders]
    features.rows = [numbers, langFeatures[featureTypes.grmCase]]
    features.columnRowTitles = [langFeatures[featureTypes.grmCase]]
    features.fullWidthRowTitles = [numbers]
  }
}

export default [new NounView(), new NounViewSimplified(), new PronounView()]
