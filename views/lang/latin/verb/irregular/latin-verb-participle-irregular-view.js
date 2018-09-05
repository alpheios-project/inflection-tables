import { Constants, Feature } from 'alpheios-data-models'
import LatinVerbIrregularBaseView from '@views/lang/latin/verb/irregular/latin-verb-irregular-base-view.js'
import Table from '@views/lib/table'

export default class LatinVerbParticipleIrregularView extends LatinVerbIrregularBaseView {
  constructor (homonym, inflectionData, locale) {
    super(homonym, inflectionData, locale)

    this.id = 'verbParticipleConjugationIrregular'
    this.name = 'verb-participle-irregular'
    this.title = 'Verb Participle Conjugation (Irregular)'

    this.createTable()
  }

  static get viewID () {
    return 'latin_verb_participle_irregular_view'
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB_PARTICIPLE]
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.tenses])
    let features = this.table.features
    features.columns = [ this.features.voices ]
    features.rows = [this.features.tenses]
    features.columnRowTitles = [this.features.tenses]
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
}
