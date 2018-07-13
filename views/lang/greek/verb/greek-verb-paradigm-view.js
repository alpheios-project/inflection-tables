import { Constants, Feature } from 'alpheios-data-models'
import Paradigm from '../../../../lib/paradigm.js'
import View from '../../../lib/view.js'
import GreekView from '../greek-view.js'

/**
 * This is a base class for all pronoun views. This class should not be used to create tables. Its purpose
 * is to define common features and properties for all pronoun classes.
 */
export default class GreekVerbParadigmView extends GreekView {
  /**
   * @param {Paradigm} paradigm
   * @param {InflectionData} inflectionData
   * @param {string} locale
   */
  constructor (paradigm, inflectionData, locale) {
    super(inflectionData, locale)
    this.id = paradigm.id
    this.name = paradigm.title.toLowerCase()
    this.title = paradigm.title
    this.hasComponentData = true
    this.paradigm = paradigm
    this.featureTypes = {}

    this.wideTable = this.paradigm.table
    this.wideSubTables = this.paradigm.subTables

    /**
     * Whether there are any linked paradigms for this view
     * @type {boolean}
     */
    this.hasSuppParadigms = this.paradigm.hasSuppParadigms

    /**
     * An array of linked paradigms
     * @type {Paradigm[]}
     */
    this.suppParadigms = this.paradigm.suppParadigmList

    /**
     * Linked paradigms in a map
     * @type {Map<{string}, paradigmID, {Paradigm}, paradigm>}
     */
    this.suppParadigmsMap = this.paradigm.suppParadigmsMap

    this.hasCredits = this.paradigm.hasCredits
    this.creditsText = this.paradigm.creditsText
  }

  static get partsOfSpeech () {
    return [Constants.POFS_VERB]
  }

  static get inflectionType () {
    return Paradigm
  }

  /**
   * What classes of pronouns this view should be used with.
   * Should be defined in descendants.
   * @return {string[]} Array of class names
   */
  static get classes () {
    return []
  }

  static getID (grammarClass) {
    return `${grammarClass}${View.toTitleCase(GreekVerbParadigmView.mainPartOfSpeech)}Paradigm`
  }

  static getName (grammarClass) {
    return `${grammarClass} ${GreekVerbParadigmView.mainPartOfSpeech} paradigm`
  }

  static getTitle (grammarClass) {
    return View.toTitleCase(`${grammarClass} ${GreekVerbParadigmView.mainPartOfSpeech} Paradigm`).trim()
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflection, inflectionData) {
    if (this.languageID === inflection.languageID && this.partsOfSpeech.includes(inflection[Feature.types.part].value)) {
      let inflectionSet = inflectionData.pos.get(inflection[Feature.types.part].value)
      if (inflectionSet.types.has(this.inflectionType)) {
        return true
      }
    }
    return false
  }

  static getMatchingInstances (inflection, inflectionData, messages) {
    if (this.matchFilter(inflection, inflectionData)) {
      let paradigms = inflectionData.pos.get(inflection[Feature.types.part].value).types.get(this.inflectionType).items
      return paradigms.map(paradigm => new this(paradigm, inflectionData, messages))
    }
    return []
  }

  render () {
    // Do nothing as there is no need to render anything
    return this
  }

  get wideViewNodes () {
    return this.nodes
  }

  hideEmptyColumns () {
    return this
  }

  showEmptyColumns () {
    return this
  }

  hideNoSuffixGroups () {
    return this
  }

  showNoSuffixGroups () {
    return this
  }
}