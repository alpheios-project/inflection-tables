import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbMoodView from './latin-verb-mood-view.js'
// import GroupFeatureType from '../../../lib/group-feature-type'
import Table from '../../../lib/table'

export default class LatinInfinitiveView extends LatinVerbMoodView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)
    this.id = 'verbInfinitive'
    this.name = 'infinitive'
    this.title = 'Infinitive'

    this.createTable()
    this.table.morphemeCellFilter = LatinInfinitiveView.morphemeCellFilter
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses])
    let features = this.table.features
    features.columns = [
      this.constructor.model.typeFeature(Feature.types.voice),
      this.constructor.model.typeFeature(Feature.types.conjugation)
    ]
    features.rows = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.columnRowTitles = [this.constructor.model.typeFeature(Feature.types.tense)]
    features.fullWidthRowTitles = []
  }

  static get viewID () {
    return 'latin_infinitive_view'
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param homonym
   * @return {boolean}
   */
  static matchFilter (homonym) {
    return (this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes))
  }

  static enabledForLexemes (lexemes) {
    // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection[Feature.types.mood] &&
          inflection[Feature.types.mood].values.includes(Constants.MOOD_INFINITIVE)) {
          return true
        }
      }
    }
    return false
  }

  static morphemeCellFilter (suffix) {
    return suffix.features[Feature.types.mood].values.includes(Constants.MOOD_INFINITIVE)
  }
}
