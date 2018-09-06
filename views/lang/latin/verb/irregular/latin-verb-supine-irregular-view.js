import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import LatinVerbIrregularView from '@views/lang/latin/verb/irregular/latin-verb-irregular-view.js'
import LatinVerbParticipleIrregularView from '@views/lang/latin/verb/irregular/latin-verb-participle-irregular-view.js'
import Table from '@views/lib/table'

export default class LatinVerbSupineIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbSupineConjugationIrregular'
    this.name = 'verb-supine-irregular'
    this.title = 'Verb Supine Conjugation (Irregular)'

    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_supine_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_SUPINE]
  }

  createTable () {
    this.table = new Table([this.features.cases])
    let features = this.table.features
    features.columns = []
    features.rows = [this.features.cases]
    features.columnRowTitles = [this.features.cases]
    features.fullWidthRowTitles = []
  }

  static matchFilter (homonym) {
    return Boolean(
      this.languageID === homonym.languageID &&
      homonym.inflections.some(i => i[Feature.types.part].value === this.mainPartOfSpeech) &&
      this.enabledForLexemes(homonym.lexemes))
  }

  static enabledForLexemes (lexemes) {
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection.constraints && inflection.constraints.irregular) {
          return true
        }
      }
    }
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
        i.constraints && i.constraints.irregular
    )
    return this.dataset.createInflectionSet(this.mainPartOfSpeech, inflections)
  }

  /**
   * A list of constructors of linked views.
   * @return {View[]}
   */
  static get linkedViewConstructors () {
    return [LatinVerbIrregularView, LatinVerbParticipleIrregularView]
  }
}
