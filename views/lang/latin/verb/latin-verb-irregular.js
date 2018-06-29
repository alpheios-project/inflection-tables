import { Constants, LanguageModelFactory, Feature } from 'alpheios-data-models'
import LatinView from '@views/lang/latin/latin-view.js'

import GroupFeatureType from '@views/lib/group-feature-type'
import Form from '@lib/form.js'
import Table from '@views/lib/table'

export default class LatinVerbIrregularView extends LatinView {
  constructor (inflectionData, locale) {
    super(inflectionData, locale)

    this.id = 'verbConjugationIrregular'
    this.name = 'verb-irregular'
    this.title = 'Verb Conjugation (Irregular)'

    // const lemmaValues = ['esse_fui_futurus']
    const lemmaValues = this.dataset.getVerbsIrregularLemma(inflectionData.targetWord)
    let lemmasType = new Feature(Feature.types.hdwd, lemmaValues, LatinVerbIrregularView.languageID)

    this.features = {
      lemmas: new GroupFeatureType(lemmasType, 'Lemma'),
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Feature.types.person], 'Person'),
      moods: new GroupFeatureType(this.language_features[Feature.types.mood], 'Mood')
    }
    this.createTable()
  }

  createTable () {
    this.table = new Table([this.features.lemmas, this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.lemmas, this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static get inflectionType () {
    return Form
  }

  static get partOfSpeech () {
    return Constants.POFS_VERB
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
    if (LanguageModelFactory.compareLanguages(LatinVerbIrregularView.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(LatinVerbIrregularView.partOfSpeech) &&
             LatinVerbIrregularView.enabledForLexemes(inflectionData.homonym.lexemes)
    }
  }

  static enabledForLexemes (lexemes) {
    // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        // console.log('************************enabledForLexemes inflection', JSON.stringify(inflection.constraints))
        if (inflection.constraints && inflection.constraints.irregularVerb) {
          return true
        }
      }
    }
    return false
  }
}
