/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import View from '@views/lib/view.js'

import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import { Constants } from 'alpheios-data-models'

import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'
import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'

import L10nJSON from '@tests/l10n/l10n-json.js'
import L10n from '@l10n/l10n.js'
import MessageBundle from '@l10n/message-bundle.js'

import Form from '@lib/form.js'

describe('view.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym, testInflectionData
  let testHomonymFailed, testInflectionDataFailed

  const testLocale = 'en-US'

  /*  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  }) */

  L10n.getMessages = jest.fn((locale) => L10nJSON.getMessages(locale))

  Object.defineProperty(View, 'partOfSpeech', {
    get: jest.fn(() => 'numeral'),
    set: jest.fn()
  })

  Object.defineProperty(View, 'inflectionType', {
    get: jest.fn(() => Form),
    set: jest.fn()
  })

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonym = await maAdapter.getHomonym(Constants.LANG_GREEK, 'δύο')
    testInflectionData = await LanguageDatasetFactory.getInflectionData(testHomonym)
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 View - constructor creates View with default values', () => {
    let view = new View(testInflectionData, testLocale)

    expect(view.homonym.targetWord).toEqual(testHomonym.targetWord)
    expect(view.messages).toBeInstanceOf(MessageBundle)
    expect(Object.keys(view.pageHeader).length).toEqual(0)
    expect(view.id).toBeDefined()
    expect(view.name).toBeDefined()
    expect(view.title).toBeDefined()
    expect(view.hasPrerenderedTables).toBeFalsy()
    expect(view.forms.size).toEqual(0)
    expect(Object.keys(view.table).length).toEqual(0)
    expect(view.hasCredits).toBeFalsy()
    expect(view.creditsText).toEqual('')
  })

  it('2 View - locale return locale from messages', () => {
    let view = new View(testInflectionData, testLocale)
    expect(view.locale).toEqual(testLocale)
  })

  it('3 View - setLocale updates messages if argument\'s locale differs', () => {
    let view = new View(testInflectionData, testLocale)
    expect(view.locale).toEqual(testLocale)

    view.setLocale('en-GB')
    expect(view.locale).toEqual('en-GB')
    expect(L10n.getMessages).toHaveBeenCalledWith('en-GB')
  })

  // TODO: update to reflect an updated call procedure
  it.skip('4 View - render() method executes render for wideView', () => {
    let view = new View(testInflectionData, testLocale)
    view.wideView = { render: jest.fn() }
    let res = view.render()
    expect(view.wideView.render).toHaveBeenCalled()
  })

  // Narrow view rendering has been temporary disabled as this functionality is not used right now
  it.skip('5 View - narrowViewNodes method executes render for narrowView', () => {
    let view = new View(testInflectionData, testLocale)
    view.table.narrowView = { render: jest.fn() }
    let res = view.narrowViewNodes
    expect(view.table.narrowView.render).toHaveBeenCalled()
  })

  // TODO: the following five methods have been replaced with emptyColumnsHidden() & noSuffixMatchesGroupsHidden()
  it.skip('6 View - hideEmptyColumns method executes hideEmptyColumns of the table', () => {
    let view = new View(testInflectionData, testLocale)
    view.table.hideEmptyColumns = jest.fn()
    view.hideEmptyColumns()
    expect(view.table.hideEmptyColumns).toHaveBeenCalled()
  })

  it.skip('7 View - showEmptyColumns method executes showEmptyColumns of the table', () => {
    let view = new View(testInflectionData, testLocale)
    view.table.showEmptyColumns = jest.fn()
    view.showEmptyColumns()
    expect(view.table.showEmptyColumns).toHaveBeenCalled()
  })

  it.skip('8 View - hideNoSuffixGroups method executes hideNoSuffixGroups of the table if table canCollapse', () => {
    let view = new View(testInflectionData, testLocale)
    view.table.hideNoSuffixGroups = jest.fn()
    view.table.canCollapse = true
    view.hideNoSuffixGroups()
    expect(view.table.hideNoSuffixGroups).toHaveBeenCalled()
  })

  it.skip('9 View - hideNoSuffixGroups method doesn\'t execute hideNoSuffixGroups if table canCollapse = false', () => {
    let view = new View(testInflectionData, testLocale)
    view.table.hideNoSuffixGroups = jest.fn()
    view.table.canCollapse = false
    view.hideNoSuffixGroups()
    expect(view.table.hideNoSuffixGroups).not.toHaveBeenCalled()
  })

  it.skip('10 View - showNoSuffixGroups method executes showNoSuffixGroups of the table', () => {
    let view = new View(testInflectionData, testLocale)
    view.table.showNoSuffixGroups = jest.fn()
    view.showNoSuffixGroups()
    expect(view.table.showNoSuffixGroups).toHaveBeenCalled()
  })

  it('11 View - toSentenceCase - capitalize the string from argument', () => {
    expect(View.toSentenceCase('TEST')).toEqual('Test')
  })

  it('12 View - toTitleCase - capitalize every word in the string', () => {
    expect(View.toTitleCase('TEST this cAse')).toEqual('Test This Case')
  })

  it('13 View - enabledForLexemes - returns true by default', () => {
    expect(View.enabledForLexemes()).toBeTruthy()
  })
})
