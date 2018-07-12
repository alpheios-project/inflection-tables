import { Feature, LanguageModelFactory } from 'alpheios-data-models'
import LanguageDatasetFactory from '../../lib/language-dataset-factory.js'
/**
 * A set of inflection table views that represent all possible forms of inflection data. A new ViewSet instance
 * mast be created for each new inflection data piece.
 */
export default class ViewSet {
  /**
   * @param {Homonym} homonym - Data about inflections we need to build views for
   * @param {string} locale - A locale's IETF language tag (ex. `en-US`)
   */
  constructor (homonym, locale) {
    this.homonym = homonym
    this.languageID = homonym.languageID

    /**
     * Whether inflections are enabled for the homonym's language
     */
    this.enabled = LanguageModelFactory.getLanguageModel(homonym.languageID).canInflect()
    this.inflectionData = null
    this.locale = locale
    this.matchingViewsMap = new Map()

    if (this.enabled) {
      this.inflectionData = LanguageDatasetFactory.getInflectionData(this.homonym)
      for (const lexeme of this.homonym.lexemes) {
        for (const inflection of lexeme.inflections) {
          const matchingInstances = this.constructor.views.reduce(
            (acc, view) => acc.concat(...view.getMatchingInstances(inflection, this.inflectionData, this.messages)), [])
          if (matchingInstances.length > 0) {
            // There are any matching instances found
            if (!this.matchingViewsMap.has(inflection[Feature.types.part].value)) {
              this.matchingViewsMap.set(inflection[Feature.types.part].value, [])
            }
            let storedInstances = this.matchingViewsMap.get(inflection[Feature.types.part].value)
            // Filter out instances that are already stored in a view set
            let newInstances = matchingInstances.filter(i => !storedInstances.some(v => v.sameAs(i)))
            if (newInstances.length > 0) { storedInstances.push(...newInstances) }
          }
        }
      }
    }
  }
  /**
   * Returns a list of views available within a view set. Should be redefined in descendant classes.
   * @return {View[]} A list of views available within the view set.
   */
  static get views () {
    return []
  }

  get partsOfSpeech () {
    return Array.from(this.matchingViewsMap.keys())
  }

  get hasMatchingViews () {
    return this.matchingViewsMap.size > 0
  }

  /**
   * Returns all matching views available, or matching views available only for a particular part of speech.
   * Views are sorted according to sorting rules defined for each part of speech.
   * Each view might have linked views specified within a view class. Those view will be added after
   * an original view
   * @param {string | undefined} partOfSpeech - A part of speech for which views should be returned.
   * If not specify, will result in views returned for all parts of speech available for ViewSet's inflection data.
   * @return {View[]}
   */
  getViews (partOfSpeech = undefined) {
    if (partOfSpeech) {
      // Return views for a particular part of speech
      return this.matchingViewsMap.has(partOfSpeech) ? this.matchingViewsMap.get(partOfSpeech) : []
    } else {
      // Return all matching views
      return Array.from(this.matchingViewsMap.values()).reduce((acc, views) => acc.concat(...views), [])
    }
  }

  updateMessages (messages) {
    this.messages = messages
    for (let view of this.matchingViews) {
      view.updateMessages(messages)
    }
  }

  setLocale (locale) {
    for (let view of this.matchingViews) {
      view.setLocale(locale)
    }
  }
}
