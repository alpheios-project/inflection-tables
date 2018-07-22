/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Column from '@views/lib/column.js'
import Cell from '@views/lib/cell.js'
import HeaderCell from '@views/lib/header-cell.js'

import { Constants, Feature } from 'alpheios-data-models'

import { AlpheiosTuftsAdapter } from 'alpheios-morph-client'
import GreekLanguageDatasetJSON from '@tests/lib/lang/greek-language-dataset-json.js'
import LanguageDatasetFactory from '@lib/language-dataset-factory.js'
import GreekLanguageDataset from '@lib/lang/greek/greek-language-dataset.js'

import GroupFeatureType from '@views/lib/group-feature-type.js'

import L10nJSON from '@tests/l10n/l10n-json.js'
import L10n from '@l10n/l10n.js'
import MessageBundle from '@l10n/message-bundle.js'

import Form from '@lib/form.js'
import * as Styles from '@views/styles/styles'

describe('column.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let maAdapter, testHomonym, testInflectionData, testMorphemes, testFeatures, testCells

  const testLocale = 'en-US'

  Object.defineProperty(GreekLanguageDataset, 'verbParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParadigmTables),
    set: jest.fn()
  })
  Object.defineProperty(GreekLanguageDataset, 'verbParticipleParadigmTables', {
    get: jest.fn(() => GreekLanguageDatasetJSON.verbParticipleParadigmTables),
    set: jest.fn()
  })

  L10n.getMessages = jest.fn((locale) => L10nJSON.getMessages(locale))

  beforeAll(async () => {
    maAdapter = new AlpheiosTuftsAdapter()
    testHomonym = await maAdapter.getHomonym('grc', 'δύο')
    testInflectionData = await LanguageDatasetFactory.getInflectionData(testHomonym)
    testMorphemes = testInflectionData.pos.get('numeral').types.get(Form).items

    testFeatures = []
    testFeatures.push(new Feature(Feature.types.hdwd, 'εἱς - μία - ἑν (1)', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.gender, 'masculine', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.number, 'singular', Constants.LANG_GREEK))
    testFeatures.push(new Feature(Feature.types.case, 'nominative', Constants.LANG_GREEK))

    testCells = []
    testCells.push(new Cell([testMorphemes[11]], testFeatures))
    testCells.push(new Cell([testMorphemes[10]], testFeatures))
    testCells.push(new Cell([testMorphemes[13]], testFeatures))
    testCells.push(new Cell([testMorphemes[8]], testFeatures))
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

  it('1 Column - constructor fills properties and saves column to each cells', () => {
    let column = new Column(testCells)

    expect(column.cells.length).toEqual(4)
    expect(column.hidden).toBeFalsy()
    expect(column.empty).toBeFalsy()
    expect(column.suffixMatches).toBeFalsy()
    expect(testCells.every(cell => cell.column !== undefined)).toBeTruthy()
  })
/*
  it('2 Column - headerCell sets _headerCell and column for headerCell', () => {
    let column = new Column(testCells)

    let testGroupingFeature = new Feature(Feature.types.type, 'regular', Constants.LANG_GREEK)

    let testGroupFeatureType = new GroupFeatureType(testGroupingFeature, 'type')
    let testHeaderCell = new HeaderCell('type', testGroupFeatureType)

    console.info('***********testHeaderCell', testHeaderCell)
    column.headerCell = testHeaderCell
    expect(column._headerCell.title).toEqual('type')
    expect(testHeaderCell.column).toBeDefined()
  }) */
})
