/*
 * Greek language data module
 */
import { Constants, Feature, FeatureType, GreekLanguageModel } from 'alpheios-data-models'
import LanguageDataset from '../../../lib/language-dataset'
import ExtendedGreekData from '../../../lib/extended-greek-data'
import MatchData from '../../../lib/match-data'
import nounSuffixesCSV from './data/noun/suffixes.csv'
import nounFootnotesCSV from './data/noun/footnotes.csv'
import pronounFormsCSV from './data/pronoun/forms.csv'
// import pronounFootnotesCSV from './data/pronoun/footnotes.csv'
/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */
import papaparse from 'papaparse'

let languageModel = new GreekLanguageModel()
// Create a language data set that will keep all language-related information
let dataSet = new LanguageDataset(Constants.LANG_GREEK)
let fTypes = Feature.types

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const impName = 'csv'
const footnotes = new FeatureType(Feature.types.footnote, [], dataSet.languageID)

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function (partOfSpeech, data) {
  // An order of columns in a data CSV file
  const n = {
    suffix: 0,
    number: 1,
    grmCase: 2,
    declension: 3,
    gender: 4,
    type: 5,
    primary: 6,
    footnote: 7
  }
  // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-'

  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let item = data[i]
    let suffixValue = item[n.suffix]
    // Handle special suffix values
    if (suffixValue === noSuffixValue) {
      suffixValue = null
    }

    let primary = false
    let features = [partOfSpeech,
      languageModel.features[fTypes.number].getFromImporter(impName, item[n.number]),
      languageModel.features[fTypes.grmCase].getFromImporter(impName, item[n.grmCase]),
      languageModel.features[fTypes.declension].getFromImporter(impName, item[n.declension]),
      languageModel.features[fTypes.gender].getFromImporter(impName, item[n.gender]),
      languageModel.features[fTypes.type].getFromImporter(impName, item[n.type])]
    if (item[n.primary] === 'primary') {
      primary = true
    }
    if (item[n.footnote]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = item[n.footnote].split(' ').map(function (index) {
        return footnotes.get(index)
      })
      features.push(...indexes)
    }
    let extendedGreekData = new ExtendedGreekData()
    extendedGreekData.primary = primary
    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }
    this.addItem(suffixValue, LanguageDataset.SUFFIX, features, extendedLangData)
  }
}

// For pronouns
dataSet.addPronounForms = function (partOfSpeech, data) {
  // An order of columns in a data CSV file
  const n = {
    form: 0,
    hdwd: 1,
    grmClass: 2,
    person: 3,
    number: 4,
    grmCase: 5,
    gender: 6,
    type: 7,
    primary: 8,
    dialect: 9,
    footnote: 10
  }
  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let item = data[i]
    let form = item[n.form]

    let features = [ partOfSpeech ]

    if (item[n.hdwd]) {
      features.push(
        new FeatureType(fTypes.word, [FeatureType.UNRESTRICTED_VALUE], languageModel.sourceLanguage).getFromImporter(impName, item[n.hdwd])
      )
    }
    if (item[n.grmClass]) { features.push(languageModel.features[fTypes.grmClass].getFromImporter(impName, item[n.grmClass])) }
    if (item[n.person]) { features.push(languageModel.features[fTypes.person].getFromImporter(impName, item[n.person])) }
    if (item[n.number]) { features.push(languageModel.features[fTypes.number].getFromImporter(impName, item[n.number])) }
    if (item[n.grmCase]) { features.push(languageModel.features[fTypes.grmCase].getFromImporter(impName, item[n.grmCase])) }
    if (item[n.gender]) { features.push(languageModel.features[fTypes.gender].getFromImporter(impName, item[n.gender])) }
    if (item[n.type]) { features.push(languageModel.features[fTypes.type].getFromImporter(impName, item[n.type])) }

    let primary = (item[n.primary] === 'primary')

    // Dialects could have multiple values
    let dialects = item[n.dialect].split(',')
    if (item[n.dialect] && dialects && dialects.length > 0) {
      features.push(new Feature(dialects, fTypes.dialect, dataSet.languageID))
    }

    // Footnotes. There can be multiple footnote indexes separated by commas
    let footnoteIndexes = item[n.footnote].split(',')
    if (item[n.footnote] && footnoteIndexes && footnoteIndexes.length > 0) {
      for (let index of footnoteIndexes) { features.push(footnotes.get(index)) }
    }

    let extendedGreekData = new ExtendedGreekData()
    extendedGreekData.primary = primary
    let extendedLangData = {
      [Constants.STR_LANG_CODE_GRC]: extendedGreekData
    }
    this.addItem(form, LanguageDataset.FORM, features, extendedLangData)
  }
}

// For verbs
dataSet.addVerbSuffixes = function (partOfSpeech, data) {
  // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-'

  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0]
    // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null
    }

    let features = [partOfSpeech
      /*
      conjugations.importer.csv.get(data[i][1]),
      voices.importer.csv.get(data[i][2]),
      moods.importer.csv.get(data[i][3]),
      tenses.importer.csv.get(data[i][4]),
      numbers.importer.csv.get(data[i][5]),
      persons.importer.csv.get(data[i][6]) */
    ]

    let grammarType = data[i][7]
    // Type information can be empty if no ending is provided
    if (grammarType) {
      features.push(fTypes.importer.csv.get(grammarType))
    }
    // Footnotes
    if (data[i][8]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][8].split(' ').map(function (index) {
        return footnotes.get(index)
      })
      features.push(...indexes)
    }
    this.addItem(suffix, LanguageDataset.SUFFIX, features)
  }
}

dataSet.addFootnotes = function (partOfSpeech, data) {
  // First row are headers
  for (let i = 1; i < data.length; i++) {
    this.addFootnote(partOfSpeech, data[i][0], data[i][1])
  }
}

dataSet.loadData = function () {
  let forms

  // Nouns
  let partOfSpeech = languageModel.features[fTypes.part][Constants.POFS_NOUN]
  let suffixes = papaparse.parse(nounSuffixesCSV, {})
  this.addSuffixes(partOfSpeech, suffixes.data)
  let footnotes = papaparse.parse(nounFootnotesCSV, {})
  this.addFootnotes(partOfSpeech, footnotes.data)

  // Pronouns
  partOfSpeech = languageModel.features[fTypes.part][Constants.POFS_PRONOUN]
  forms = papaparse.parse(pronounFormsCSV, {})
  this.addPronounForms(partOfSpeech, forms.data)
}

/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {string} type - LanguageDataset.SUFFIX or LanguageDataset.FORM
 * @param {Suffix} item - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet.matcher = function (inflections, type, item) {
  let partOfSpeech = item.features[fTypes.part]
  // Use a special matcher for pronouns as they are different
  if (partOfSpeech === Constants.POFS_PRONOUN) { return this.pronounMatcher(inflections, type, item) }

  // All of those features must match between an inflection and an ending
  let obligatoryMatches = [Feature.types.part]

    // Any of those features must match between an inflection and an ending
  let optionalMatches = [Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number]
  let bestMatchData = null // Information about the best match we would be able to find

  /*
   There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
   But there could be multiple partial matches. So we should try to find the best match possible and return it.
   A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
   */
  for (let inflection of inflections) {
    let matchData = new MatchData() // Create a match profile

    if (inflection.suffix === item.value) {
      matchData.suffixMatch = true
    }

    // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = item.featureMatch(feature, inflection[feature])
      // matchFound = matchFound && featureMatch;

      if (!featureMatch) {
        // If an obligatory match is not found, there is no reason to check other items
        break
      }
      // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature)
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
      // Not all obligatory matches are found, this is not a match
      break
    }

    // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = item.featureMatch(feature, inflection[feature])
      if (matchedValue) {
        matchData.matchedFeatures.push(feature)
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
      // This is a full match
      matchData.fullMatch = true

      // There can be only one full match, no need to search any further
      item.match = matchData
      return item
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData)
  }
  if (bestMatchData) {
    // There is some match found
    item.match = bestMatchData
    return item
  }
  return null
}

dataSet.pronounMatcher = function (inflections, type, item) {
  // All of those features must match between an inflection and an ending
  let obligatoryMatches = [fTypes.part, fTypes.word]

  // Any of those features must match between an inflection and an ending
  let optionalMatches = [Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number]
  let bestMatchData = null // Information about the best match we would be able to find

  /*
   There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
   But there could be multiple partial matches. So we should try to find the best match possible and return it.
   A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
   */
  for (let inflection of inflections) {
    let matchData = new MatchData() // Create a match profile

    // A suffix match is when an item matches a stem
    if (inflection.stem === item.value) {
      console.log('This is a form match')
      matchData.formMatch = true
    }

    // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = false
      if (feature === fTypes.word) {
        if (inflection.hasOwnProperty(fTypes.word)) {
          let headwords = inflection[fTypes.word].map(item => item.value)
          if (headwords.includes(item.features[fTypes.word])) {
            featureMatch = true
          }
        }
      } else {
        featureMatch = item.featureMatch(feature, inflection[feature])
      }

      if (!featureMatch) {
        // If an obligatory match is not found, there is no reason to check other items
        break
      }
      // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature)
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
      // Not all obligatory matches are found, this is not a match
      break
    }

    // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = item.featureMatch(feature, inflection[feature])
      if (matchedValue) {
        matchData.matchedFeatures.push(feature)
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
      // This is a full match
      matchData.fullMatch = true

      // There can be only one full match, no need to search any further
      item.match = matchData
      return item
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData)
  }
  if (bestMatchData) {
    // There is some match found
    item.match = bestMatchData
    return item
  }
  return null
}

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function (matchA, matchB) {
  // If one of the arguments is not set, return the other one
  if (!matchA && matchB) {
    return matchB
  }

  if (!matchB && matchA) {
    return matchA
  }

  // Suffix match has a priority
  if (matchA.suffixMatch !== matchB.suffixMatch) {
    if (matchA.suffixMatch > matchB.suffixMatch) {
      return matchA
    } else {
      return matchB
    }
  }

  // If same on suffix matche, compare by how many features matched
  if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
    // Arbitrarily return matchA if matches are the same
    return matchA
  } else {
    return matchB
  }
}
export default dataSet
