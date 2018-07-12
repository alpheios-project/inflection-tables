import {Constants} from 'alpheios-data-models'
import ViewSet from './view-set.js'
import LatinViewSet from '../lang/latin/latin-view-set.js'
import GreekViewSet from '../lang/greek/greek-view-set.js'

export default class ViewSetFactory {
  static create (homonym, locale) {
    switch (homonym.languageID) {
      case Constants.LANG_LATIN:
        return new LatinViewSet(homonym, locale)
      case Constants.LANG_GREEK:
        return new GreekViewSet(homonym, locale)
      default:
        return new ViewSet(homonym, locale)
    }
  }
}
