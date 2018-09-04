import { Feature } from 'alpheios-data-models'
import LatinVerbIrregularView from '@views/lang/latin/verb/irregular/latin-verb-irregular-view.js'
import Table from '@views/lib/table'

/**
 * An inflection table for Latin irregular verbs that have voice information in our local data.
 * For the ones that don't, a LatinVerbIrregularView is used.
 * The only way to distinguish between them the two is to analyze a headword
 * which is stored in a `word` feature of an inflection.
 */
export default class LatinVerbIrregularVoiceView extends LatinVerbIrregularView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbConjugationIrregularVoice'
    this.name = 'verb-irregular-voice'
    this.title = 'Verb Conjugation (Irregular)'

    const inflectionsWords = this.homonym.inflections.map(item => item[Feature.types.word].value)
    const lemma = this.constructor.dataset.verbsIrregularLemmas.filter(item => inflectionsWords.indexOf(item.word) > -1)[0]

    this.additionalTitle = lemma.word + ', ' + lemma.principalParts

    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_irregular_voice_view'
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
   * Checks whether this view shall be displayed for an inflection given.
   * @param {Inflection} inflection - Inflection that is checked on matching this view.
   * @return {boolean} - True if this view shall be displayed for an inflection, false otherwise.
   */
  static enabledForInflection (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregularVerb && // Must be an irregular verb
      inflection.word &&
      this.voiceEnabledHdwds.includes(inflection.word.value) // Must match headwords for irregular verb voice table
    )
  }
}
