import {Constants} from 'alpheios-data-models'
import LatinViewSet from '../lang/latin/latin-view-set.js'
import GreekViewSet from '../lang/greek/greek-view-set.js'

export default class ViewSetFactory {
  static create (inflectionData, locale) {
    switch (inflectionData.languageID) {
      case Constants.LANG_LATIN:
        return new LatinViewSet(inflectionData, locale)
      case Constants.LANG_GREEK:
        return new GreekViewSet(inflectionData, locale)
    }
  }
}
