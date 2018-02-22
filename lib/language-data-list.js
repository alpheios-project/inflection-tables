import InflectionData from './inflection-data.js'
import LatinDataset from './lang/latin/latin-language-dataset.js'
import GreekDataset from './lang/greek/greek-language-dataset.js'

/**
 * Stores one or several language datasets, one for each language
 */
export default class LanguageDataList {
  /**
   * Combines several language datasets representing supported languages. Allows to abstract away language data.
   * This function is chainable.
   * @param {Constructor[]} languageData - Language datasets of different languages.
   */
  constructor (languageData = [LatinDataset, GreekDataset]) {
    this.sets = new Map()
    for (let Set of languageData) {
      this.sets.set(Set.languageID, new Set())
    }
  }

  /**
   * Loads data for all data sets.
   * This function is chainable.
   * @return {LanguageDataList} Self instance for chaining.
   */
  loadData () {
    try {
      for (let dataset of this.sets.values()) {
        dataset.loadData()
      }
    } catch (e) {
      console.error(e)
    }
    return this
  }

  /**
   * Finds matching forms or suffixes for a homonym.
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  getSuffixes (homonym) {
    if (this.sets.has(homonym.languageID)) {
      let dataset = this.sets.get(homonym.languageID)
      for (let inflection of homonym.inflections) {
        // Set grammar rules for an inflection
        inflection.setGrammar()
        dataset.setInflectionGrammar(inflection)
      }
      return dataset.getSuffixes(homonym)
    } else {
      return new InflectionData(homonym) // Return an empty inflection data set
    }
  }
}
