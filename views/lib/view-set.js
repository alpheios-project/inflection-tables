import LatinViews from '../lang/latin.js'
import GreekViews from '../lang/greek.js'
import InflectionData from '../../lib/inflection-data.js'
import * as Models from 'alpheios-data-models'

export default class ViewSet {
  constructor () {
    this.views = new Map()
    this.views.set(Models.Constants.LANG_LATIN, LatinViews)
    this.views.set(Models.Constants.LANG_GREEK, GreekViews)
  }

  getViews (data) {
    if (data instanceof InflectionData) {
      if (this.views.has(data.languageID)) {
        return this.views.get(data.languageID)
          .filter(view => data[Models.Feature.types.part].includes(view.partOfSpeech))
      }
      return []
    } else {
      throw new Error(`No inflection data provided`)
    }
  }
}
