import InflectionData from './inflection-data.js'
import LatinDataset from './lang/latin/latin-language-dataset.js'
import GreekDataset from './lang/greek/greek-language-dataset.js'
import GreekParadigmDataset from '@/paradigm/data/greek/greek-paradigm-dataset.js'

// Stores a LanguageDatasetFactory's single instance
let datasetFactory

/**
 * Creates and stores datasets for all available languages. This is a singleton.
 * When created, datasets' data is not loaded yet. It will be loaded on a first call (lazy initialization).
 */
export default class LanguageDatasetFactory {
  /**
   * @param {Constructor[]} languageData - Language datasets of supported languages.
   */
  constructor (languageData = [LatinDataset, GreekParadigmDataset, GreekDataset]) {
    this.sets = new Map()
    for (const LngDataset of languageData) {
      if (!this.sets.has(LngDataset.languageID)) {
        this.sets.set(LngDataset.languageID, [])
      }
      this.sets.get(LngDataset.languageID).push(new LngDataset())
    }
  }

  /**
   * Returns a single instance of self.
   * @return {LanguageDatasetFactory} A self instances.
   */
  static get instance () {
    if (!datasetFactory) {
      datasetFactory = new LanguageDatasetFactory()
    }
    return datasetFactory
  }

  /**
   * Returns an instance of a dataset for a language ID given.
   * @param {symbol} languageID - A language ID of a dataset to be retrieved.
   * @return {LanguageDataset} An instance of a language dataset.
   */
  static getDatasets (languageID) {
    const instance = this.instance

    if (instance.sets.has(languageID)) {
      let datasets = instance.sets.get(languageID) // eslint-disable-line prefer-const
      datasets.forEach(dataset => {
        if (!dataset.dataLoaded) {
          dataset.loadData()
        }
      })
      return datasets
    }
  }

  static getDataset (languageID, constructorName) {
    const datasets = this.getDatasets(languageID)
    if (!datasets) {
      return
    }
    if (constructorName) {
      return datasets.find(dataset => dataset.constructor.name.indexOf(constructorName) === (dataset.constructor.name.length - constructorName.length))
    }
    return datasets[0]
  }

  /**
   * Finds matching forms or suffixes for a homonym.
   * @deprecated Will be removed when will have no usages
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  static getInflectionData (homonym) {
    const instance = this.instance
    if (instance.sets.has(homonym.languageID)) {
      const datasets = this.getDatasets(homonym.languageID)
      for (let inflection of homonym.inflections) { // eslint-disable-line prefer-const
        // Set grammar rules for an inflection
        inflection.setConstraints()
        // dataset.setInflectionConstraints(inflection)
      }
      return datasets[1].getInflectionData(homonym)
    } else {
      return new InflectionData(homonym) // Return an empty inflection data set
    }
  }
}
