import { Feature } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import LatinVerbParicipleIrregularView from '@views/lang/latin/verb/irregular/latin-verb-participle-irregular-view.js'
import LatinVerbSupineIrregularView from '@views/lang/latin/verb/irregular/latin-verb-supine-irregular-view.js'
import LatinVerbGerundiveIrregularView from '@views/lang/latin/verb/irregular/latin-verb-gerundive-irregular-view.js'
import Table from '@views/lib/table'

/**
 * An inflection table for Latin irregular verbs that have no voice information in our local data.
 * For the ones that do, a LatinVerbIrregularVoiceView is used.
 * The only way to distinguish between them the two is to analyze a headword
 * which is stored in a `word` feature of an inflection.
 */
export default class LatinVerbIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbConjugationIrregular'
    this.name = 'verb-irregular'
    this.title = 'Verb Conjugation (Irregular, Voice)'

    this.createTable()
    this.linkedViews = this.constructor.createLinkedViews(homonym, locale)
  }

  static get viewID () {
    return 'latin_verb_irregular_view'
  }

  static get voiceEnabledHdwds () {
    return ['fero']
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.tenses, this.features.numbers, this.features.persons])
    let features = this.table.features
    features.columns = [ this.features.moods ]
    features.rows = [this.features.tenses, this.features.numbers, this.features.persons]
    features.columnRowTitles = [this.features.numbers, this.features.persons]
    features.fullWidthRowTitles = [this.features.tenses]
  }

  static matchFilter (homonym) {
    return Boolean(
      this.languageID === homonym.languageID &&
      homonym.inflections.some(i => this.enabledForInflection(i))
    )
  }

  /**
   * Checks whether this view shall be displayed for an inflection given.
   * It should match all the requirements of an irregular verb view and
   * should not match irregular verb voice view (either this or
   * irregular verb voice view shall be shown for a single inflection).
   * @param {Inflection} inflection - Inflection that is checked on matching this view.
   * @return {boolean} - True if this view shall be displayed for an inflection, false otherwise.
   */
  static enabledForInflection (inflection) {
    return Boolean(
      inflection[Feature.types.part].value === this.mainPartOfSpeech &&
      inflection.constraints &&
      inflection.constraints.irregular &&
      inflection.word &&
      !this.voiceEnabledHdwds.includes(inflection.word.value) // Must NOT match headwords for irregular verb voice table
    )
  }

  /**
   * Creates an array of linked views: views, that will be shown below the main table (view).
   * @param {Homonym} homonym - A homonym for which linked views will be created.
   * @param {string} locale
   * @return {View[]} - An array of linked views or an empty array if no linked views can be created.
   */
  static createLinkedViews (homonym, locale) {
    let views = []
    let linkedViewConstructors = [LatinVerbParicipleIrregularView, LatinVerbSupineIrregularView, LatinVerbGerundiveIrregularView]
    let inflections = homonym.inflections.filter(infl => infl[Feature.types.part].value === this.mainPartOfSpeech)
    for (let Constructor of linkedViewConstructors) {
      for (let infl of inflections) {
        infl[Feature.types.part] = infl[Feature.types.part].createFeature(Constructor.mainPartOfSpeech)
      }
      let inflectionData = this.dataset.createInflectionSet(Constructor.mainPartOfSpeech, inflections)
      if (Constructor.isValidForView(inflectionData)) {
        let view = new Constructor(homonym, inflectionData, locale)
        for (let infl of inflections) {
          infl[Feature.types.part] = infl[Feature.types.part].createFeature(this.mainPartOfSpeech)
        }
        views.push(view)
      }
    }
    return views
  }
}
