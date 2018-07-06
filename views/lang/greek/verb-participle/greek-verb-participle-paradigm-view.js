import { Constants } from 'alpheios-data-models'
import GreekVerbParadigmView from '../verb/greek-verb-paradigm-view.js'

export default class GreekVerbParticipleParadigmView extends GreekVerbParadigmView {
  static get partOfSpeech () {
    return Constants.POFS_VERB_PARTICIPLE
  }
}
