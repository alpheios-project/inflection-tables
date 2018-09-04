import { Constants, Feature } from 'alpheios-data-models'
import LatinView from '@views/lang/latin/latin-view.js'
import Form from '@lib/form.js'
import Table from '@views/lib/table'

/**
 * A base view for all Latin irregular verb views.
 * It is supposed to serve as a base view only and never created directly.
 * That's why its match filter will always return false.
 */
export default class LatinVerbIrregularVoiceView extends LatinView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbConjugationIrregularBase'
    this.name = 'verb-irregular-base'
    this.title = 'Base Verb Conjugation (Irregular)'
  }

  static get viewID () {
    return 'latin_verb_irregular_base_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }

  static get inflectionType () {
    return Form
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.voices, this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  /**
   * Will always return false because this view serves as base class and is never created directly.
   * @param {Homonym} homonym
   * @return {boolean} Always returns false
   */
  static matchFilter (homonym) {
    return false
  }

  /**
   * Gets inflection data for a homonym. For this view we need to use irregular verb inflections only.
   * @param {Homonym} homonym - A homonym for which inflection data needs to be retrieved
   * @return {InflectionSet} Resulting inflection set.
   */
  static getInflectionsData (homonym) {
    // Select only those inflections that are required for this view
    let inflections = homonym.inflections.filter(
      i => i[Feature.types.part].value === this.mainPartOfSpeech &&
        i.constraints && i.constraints.irregularVerb
    )
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections)
  }
}
