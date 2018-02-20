import {LanguageModelFactory} from 'alpheios-data-models'

/**
 * Represents a single view.
 */
export default class View {
  /**
   * Initializes a View object with options. There is at least one view per part of speech,
   * but there could be several views for the same part of speech that show different table representation of a view.
   * @param {InflectionData} inflectionData - An inflection data object.
   * @param {MessageBundle} messages - A message bundle with message translations.
   */
  constructor (inflectionData, messages) {
    this.languageID = View.languageID
    this.inflectionData = inflectionData
    this.messages = messages
    this.pageHeader = {}

    // An HTML element where this view is rendered
    this.container = undefined

    // Must be implemented in a descendant
    this.id = 'baseView'
    this.name = 'base view'
    this.title = 'Base View'
    this.partOfSpeech = undefined
    this.forms = new Set()
    this.table = {}
  }

  /**
   * Defines a language ID of a view. Should be redefined in child classes.
   * @return {symbol}
   */
  static get languageID () {
    return Symbol('Undefined language')
  }

  /**
   * Defines a part of speech of a view. Should be redefined in child classes.
   * @return {string}
   */
  static get partOfSpeech () {
    return 'Undefined part of speech'
  }

  /**
   * Determines wither this view can be used to display an inflection table of any data
   * within an `inflectionData` object.
   * By default a view can be used if a view and an inflection data piece have the same language,
   * the same part of speech, and the view is enabled for lexemes within an inflection data.
   * @param inflectionData
   * @return {boolean}
   */
  static matchFilter (inflectionData) {
    if (LanguageModelFactory.compareLanguages(View.languageID, inflectionData.languageID)) {
      return inflectionData.partsOfSpeech.includes(View.partOfSpeech) && View.enabledForLexemes(inflectionData.homonym.lexemes)
    }
  }

  /**
   * test to see if a view is enabled for a specific set of lexemes
   * @param {Lexeme[]} lexemes
   * @return {boolean} true if the view should be shown false if not
   */
  static enabledForLexemes (lexemes) {
    // default returns true
    return true
  }

  updateMessages (messages) {
    this.messages = messages
    return this
  }

  /**
   * Converts an InflectionData, returned from an inflection tables library, into an HTML representation of an inflection table.
   * `messages` provides a translation for view's texts.
   */
  render () {
    this.footnotes = this.inflectionData.getFootnotesMap(this.partOfSpeech)
    // Table is already created during a view construction
    this.table.messages = this.messages
    for (let lexeme of this.inflectionData.homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection['part of speech'].filter((f) => f.hasValue(this.partOfSpeech)).length > 0) {
          let form = inflection.prefix ? `${inflection.prefix} - ` : ''
          form = form + inflection.stem
          form = inflection.suffix ? `${form} - ${inflection.suffix}` : form
          this.forms.add(form)
        }
      }
    }
    this.table.construct(this.inflectionData.getSuffixes(this.partOfSpeech)).constructViews().addEventListeners()
    return this
  }

  get wideViewNodes () {
    return this.table.wideView.render()
  }

  get narrowViewNodes () {
    return this.table.narrowView.render()
  }

  /**
   * Hides all empty columns of the view.
   */
  hideEmptyColumns () {
    this.table.hideEmptyColumns()
    return this
  }

  /**
   * Displays all previously hidden columns.
   */
  showEmptyColumns () {
    this.table.showEmptyColumns()
    return this
  }

  /**
   * Hides groups (formed by first column feature) that have no suffix matches.
   */
  hideNoSuffixGroups () {
    if (this.table.canCollapse) {
      this.table.hideNoSuffixGroups()
    }
    return this
  }

  /**
   * Displays previously hidden groups with no suffix matches.
   */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups()
    return this
  }

  /**
   * A utility function to convert a string to a Sentence case.
   * @param {string} string - A source string.
   * @return {string} A string capitalized to a Sentence case.
   */
  static toSentenceCase (string) {
    string = string.toLowerCase()
    return string[0].toUpperCase() + string.substr(1)
  }

  /**
   * A utility function to convert a string to a Title Case.
   * @param {string} string - A source string.
   * @return {string} A string capitalized to a Title Case.
   */
  static toTitleCase (string) {
    return string
      .toLowerCase()
      .split(' ')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join(' ')
  }
}
