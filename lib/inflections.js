import { Feature } from 'alpheios-data-models'
import LanguageDataset from './language-dataset.js'
import Form from './form.js'
import Suffix from './suffix.js'

export default class Inflections {
  constructor () {
    this.items = [] // Suffixes or forms
    this.footnotesMap = new Map() // Footnotes (if any)
  }

  /**
   * Returns a type (Suffix/Forms) of inflection items
   * @return {string | undefined}
   */
  get type () {
    // Determine a type according to the first item in an items array. We assume that there should be on items of different types.
    if (this.items.length > 0) {
      if (this.items[0] instanceof Suffix) {
        return LanguageDataset.SUFFIX
      } else if (this.items[0] instanceof Form) {
        return LanguageDataset.FORM
      }
    }
  }

  /**
   * Adds suffix of form items
   * @param {Suffix[] | Form[]} items
   */
  addItems (items) {
    if (!items) {
      throw new Error(`Inflection items cannot be empty`)
    }
    if (!Array.isArray(items)) {
      throw new Error(`Inflection items must be in an array`)
    }
    if (items.length === 0) {
      throw new Error(`Inflection items array must not be empty`)
    }
    this.items = items
  }

  /**
   * Adds a singe footnote object
   * @param {string} index - A footnote index
   * @param {Footnote} footnote - A footnote object
   */
  addFootnote (index, footnote) {
    this.footnotesMap.set(index, footnote)
  }

  /**
   * Returns a sorted (as numbers) array of footnote indexes that are used by items within an `items` array
   * @return {number[]}
   */
  get footnotesInUse () {
    let set = new Set()
    // Scan all selected suffixes to build a unique set of footnote indexes
    for (const item of this.items) {
      if (item.hasOwnProperty(Feature.types.footnote)) {
        // Footnote indexes are stored in an array
        for (let index of item[Feature.types.footnote]) {
          set.add(index)
        }
      }
    }
    return Array.from(set).sort((a, b) => parseInt(a) - parseInt(b))
  }
}
