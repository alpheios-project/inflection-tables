import Suffix from '../../lib/suffix.js'
import Cell from './cell.js'
import Column from './column.js'
import Row from './row.js'
import GroupFeatureList from './group-feature-list.js'
import NodeGroup from './node-group.js'

/**
 * Represents an inflection table.
 */
export default class Table {
  /**
   * Initializes an inflection table.
   * @param {GroupFeatureType[]} features - An array of grouping features. An order of elements in this array
   */
  constructor (features) {
    this.features = new GroupFeatureList(features)
    this.cells = [] // Will be populated by groupByFeature()

    /*
    This is a special filter function that, if defined will do additional filtering of morhpemes within a cell.
     */
    this.morphemeCellFilter = undefined
  }

  /**
   * Creates a table tree and other data structures (columns, rows, headers).
   * This function is chainabe.
   * @param {Morpheme[]} morphemes - An array of morphemes to build table from.
   * @param {Object} options - Table's options
   * @returns {Table} Reference to self for chaining.
   */
  construct (morphemes, options = {
    emptyColumnsHidden: true,
    noSuffixMatchesHidden: true
  }) {
    this.morphemes = morphemes

    this.hasHeaders = this.features.hasColumnFeatures
    this.tree = this.groupByFeature(morphemes)
    this.headers = this.hasHeaders ? this.constructHeaders() : []
    this.columns = this.constructColumns()
    this.rows = this.constructRows()
    this.options = options
    // A table can collapse if there are some columns with suffix matches and some without
    this.canCollapse = this._canCollapse()
    if (!this.canCollapse) {
      // If table cannot be collapsed or expanded it should always be shown in full form
      this.options.noSuffixMatchesHidden = false
    }

    if (this.options.emptyColumnsHidden) {
      this.hideEmptyColumns()
    } else {
      this.showEmptyColumns()
    }
    if (this.options.noSuffixMatchesHidden) {
      this.hideNoSuffixMatchesGroups()
    } else {
      this.showNoSuffixMatchesGroups()
    }
    return this
  }

  /**
   * Returns a number of columns with data (suffix or morpheme) cells in a table.
   * @returns {number} A number of columns with data cells in a table.
   */
  get dataColumnQty () {
    if (!this.columns) {
      throw new Error('Columns are not populated yet.')
    }
    return this.columns.length
  }

  /**
   * Returns a number of columns with row titles in a table.
   * @returns {number} A number of columns with row titles.
   */
  get titleColumnQty () {
    if (!this.features) {
      throw new Error('Features are not defined.')
    }
    return this.features.titleColumnsQuantity
  }

  /**
   * Returns a number of rows with data (suffix or morpheme) cells in a table.
   * @returns {number} A number of rows with suffix cells.
   */
  get dataRowQty () {
    if (!this.columns) {
      throw new Error('Columns are not populated yet.')
    }
    return this.columns[0].length
  }

  /**
   * Groups all morphemes into a tree according to their grammatical features. There are several levels in this tree.
   * Each level corresponds to a one grouping feature. The order of items in GroupingFeatures List object
   * defines an order of those levels.
   * Nodes on each level are values of a grammatical feature that forms this level. An order of those values
   * is determined by the order of values within a GroupFeatureType object of each feature.
   * This is a recursive function.
   * @param {Morpheme[]} morphemes - Suffixes to be grouped.
   * @param {Feature[]} ancestorFeatures - A list of feature values on levels above the current.
   * @param {number} currentLevel - At what level in a tree we are now. Used to stop recursion.
   * @returns {NodeGroup} A top level group of morphemes that contain subgroups all way down to the last group.
   */
  groupByFeature (morphemes, ancestorFeatures = [], currentLevel = 0) {
    let group = new NodeGroup() // eslint-disable-line prefer-const
    if (!this.features.hasColumnFeatures && !this.features.hasDataColumn) {
      /*
      Table has no column features and will have only one column with data values.
      In that case we need to create a single placeholder column group.
      Set placeholder's group feature to fake a last column.
       */
      group.groupFeatureType = this.features.createDataColumn()
      const subGroup = this.groupByFeature(morphemes, ancestorFeatures, currentLevel)
      group.subgroups.push(subGroup)
      group.cells = group.cells.concat(subGroup.cells)
    } else {
      group.groupFeatureType = this.features.getFeature(currentLevel)
      group.ancestorFeatures = ancestorFeatures.slice()

      // Iterate over each value of the feature
      for (const featureValue of group.groupFeatureType.getOrderedFeatures(ancestorFeatures)) {
        if (ancestorFeatures.length > 0 && ancestorFeatures[ancestorFeatures.length - 1].type === group.groupFeatureType.type) {
          // Remove previously inserted feature of the same type
          ancestorFeatures.pop()
        }
        ancestorFeatures.push(featureValue)

        // Suffixes that are selected for current combination of feature values
        let selectedMorphemes = morphemes.filter(s => s.featureMatch(featureValue, group.groupFeatureType.comparisonType))

        if (currentLevel < this.features.length - 1) {
          // Divide to further groups
          const subGroup = this.groupByFeature(selectedMorphemes, ancestorFeatures, currentLevel + 1)
          group.subgroups.push(subGroup)
          group.cells = group.cells.concat(subGroup.cells)
        } else {
          // This is the last level. This represent a cell with morphemes
          // Split result has a list of morphemes in a table cell. We need to combine items with same endings.
          if (selectedMorphemes.length > 0) {
            if (this.morphemeCellFilter) {
              selectedMorphemes = selectedMorphemes.filter(this.morphemeCellFilter)
            }

            selectedMorphemes = Suffix.combine(selectedMorphemes)
          }

          let cell = new Cell(selectedMorphemes, ancestorFeatures.slice()) // eslint-disable-line prefer-const
          group.subgroups.push(cell)
          group.cells.push(cell)
          this.cells.push(cell)
          cell.index = this.cells.length - 1
        }
      }
      ancestorFeatures.pop()
      return group
    }
    return group
  }

  /**
   * Create columns out of a morphemes organized into a tree.
   * This is a recursive function.
   * @param {NodeGroup} tree - A tree of morphemes.
   * @param {Column[]} columns - An array of columns to be constructed.
   * @param {number} currentLevel - Current recursion level.
   * @returns {Array} An array of columns of suffix cells.
   */
  constructColumns (tree = this.tree, columns = [], currentLevel = 0) {
    const currentFeature = this.features.getGroupingFeature(currentLevel)
    let groups = [] // eslint-disable-line prefer-const
    for (const [index, feature] of currentFeature.getOrderedFeatures(tree.ancestorFeatures).entries()) {
      const cellGroup = tree.subgroups[index]
      // Iterate until it is the last row feature

      if (!this.features.isLastRowFeature(currentFeature)) {
        const currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1)
        if (currentFeature.formsRow) {
          // TODO: Avoid creating extra cells

          /**
           * An array of cells that represent a group of rows. First cell in each group will show
           * its title value of a row as well as all titles of parent values. As other cells in a group
           * will have the same parent values, they will be omitted and only the current row title be shown.
           * @type {{groups: Cell[], titleCell: RowTitleCell}}
           */
          let group = { // eslint-disable-line prefer-const
            groups: currentResult,
            titleCell: currentFeature.createRowTitleCell(feature.value, this.features.firstColumnFeature.size)
          }
          group.groups[0].titleCell.parent = group.titleCell
          groups.push(group)
        } else if (currentFeature.dataColumn || this.features.isLastColumnFeature(currentFeature)) {
          let column = new Column(cellGroup.cells) // eslint-disable-line prefer-const
          column.groups = currentResult
          column.header = feature.value
          column.index = columns.length
          columns.push(column)
          if (this.hasHeaders) {
            // Don't need header cells for tables with no column features
            column.headerCell = this.headers[this.headers.length - 1].cells[columns.length - 1]
          }
        }
      } else {
        // Last level, last row feature, will have a group consisting of a cell and a title cell
        cellGroup.titleCell = currentFeature.createRowTitleCell(
          feature.value,
          this.features.firstColumnFeature && this.features.firstColumnFeature.size ? this.features.firstColumnFeature.size : 1
        )
        const group = {
          cell: cellGroup,
          titleCell: cellGroup.titleCell
        }
        groups.push(group)
      }
    }
    if (currentFeature.formsRow) {
      return groups
    }
    return columns
  }

  /**
   * Creates an array of header cell rows.
   * This is a recursive function.
   * @param {NodeGroup} tree - A tree of morphemes.
   * @param {Row[]} headers - An array of rows with header cells.
   * @param {number} currentLevel - Current recursion level.
   * @returns {Array} A two-dimensional array of header cell rows.
   */
  constructHeaders (tree = this.tree, headers = [], currentLevel = 0) {
    const currentFeature = this.features.columnFeatures[currentLevel]

    let cells = [] // eslint-disable-line prefer-const
    for (const [index, feature] of currentFeature.getOrderedFeatures(tree.ancestorFeatures).entries()) {
      const cellGroup = tree.subgroups[index]

      // Iterate over all column features (features that form columns)
      if (currentLevel < this.features.columnFeatures.length - 1) {
        const subCells = this.constructHeaders(cellGroup, headers, currentLevel + 1)

        let columnSpan = 0
        for (const cell of subCells) {
          columnSpan += cell.span
        }

        let headerCell = currentFeature.createHeaderCell(feature.value, columnSpan) // eslint-disable-line prefer-const
        headerCell.children = subCells
        for (let cell of subCells) { // eslint-disable-line prefer-const
          cell.parent = headerCell
        }

        if (!headers[currentLevel]) {
          headers[currentLevel] = new Row()
        }
        headers[currentLevel].titleCell = currentFeature.createRowTitleCell(
          currentFeature.groupTitle, this.features.firstColumnFeature.size)

        headers[currentLevel].add(headerCell)
        cells.push(headerCell)
      } else {
        // Last level
        const headerCell = currentFeature.createHeaderCell(feature.value)

        if (!headers[currentLevel]) {
          headers[currentLevel] = new Row()
        }

        headers[currentLevel].add(headerCell)
        headers[currentLevel].titleCell = currentFeature.createRowTitleCell(
          currentFeature.groupTitle, this.features.firstColumnFeature.size)
        cells.push(headerCell)
      }
    }
    if (currentLevel === 0) {
      return headers
    } else {
      return cells
    }
  }

  /**
   * Creates an array of rows by parsing an array of columns.
   * @returns {Row[]} An array of rows.
   */
  constructRows () {
    let rows = [] // eslint-disable-line prefer-const
    for (let rowIndex = 0; rowIndex < this.dataRowQty; rowIndex++) {
      rows[rowIndex] = new Row()
      rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell
      for (let columnIndex = 0; columnIndex < this.dataColumnQty; columnIndex++) {
        rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex])
      }
    }
    let filtered = [] // eslint-disable-line prefer-const
    for (const [index, row] of rows.entries()) {
      if (!row.empty) {
        filtered.push(row)
      } else {
        /*
        This row is empty and will be removed. If it is a first row in a group,
        parents of its titleCell shall be moved to the next row, if that row belongs to the same group
        */
        if (row.firstInGroup && index + 1 < rows.length && !rows[index + 1].firstInGroup) {
          rows[index + 1].titleCell.parent = row.titleCell.parent
        }
      }
    }
    return filtered
  }

  /**
   * Hides empty columns in a table.
   */
  hideEmptyColumns () {
    for (let column of this.columns) { // eslint-disable-line prefer-const
      if (column.empty) {
        column.hide()
      }
    }
    this.options.emptyColumnsHidden = true
  }

  /**
   * Show all empty columns that were previously hidden.
   */
  showEmptyColumns () {
    for (let column of this.columns) { // eslint-disable-line prefer-const
      if (column.hidden) {
        column.show()
      }
    }
    this.options.emptyColumnsHidden = false
  }

  /**
   * Checks wither a table can be collapsed
   * @return {boolean} True if a table can collapse, false otherwise
   * @private
   */
  _canCollapse () {
    let colsWithMatches = 0
    let nonEmptyColQty = 0
    if (this.headers.length > 0) {
      for (const headerCell of this.headers[0].cells) {
        if (headerCell.columns.some(column => column.suffixMatches)) {
          colsWithMatches++
        }
        if (!headerCell.columns.every(column => column.empty)) {
          nonEmptyColQty++
        }
      }
    }
    // A table can collapse if it has all columns with matches, but not every column has matches in it.
    return colsWithMatches > 0 && colsWithMatches < nonEmptyColQty
  }

  /**
   * Hide groups that have no morpheme matches.
   */
  hideNoSuffixMatchesGroups () {
    for (const headerCell of this.headers[0].cells) {
      const matches = !!headerCell.columns.find(column => column.suffixMatches)
      if (!matches) {
        for (let column of headerCell.columns) { // eslint-disable-line prefer-const
          column.hide()
        }
      }
    }
    this.options.noSuffixMatchesHidden = true
  }

  /**
   * Show groups that have no suffix matches.
   */
  showNoSuffixMatchesGroups () {
    for (let column of this.columns) { // eslint-disable-line prefer-const
      column.show()
    }
    if (this.options.emptyColumnsHidden) {
      this.hideEmptyColumns()
    }
    this.options.noSuffixMatchesHidden = false
  }
}
