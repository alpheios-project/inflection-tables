import { Feature, LanguageModelFactory as LMF } from 'alpheios-data-models'
import Suffix from './suffix.js'
import Form from './form.js'
import Footnote from './footnote.js'
import InflectionData from './inflection-data.js'
import MatchData from './match-data.js'

/**
 * Stores inflection language data
 */
export default class LanguageDataset {
  /**
   * Initializes a LanguageDataset.
   * @param {symbol} languageID - A language ID of a data set.
   */
  constructor (languageID) {
    if (!languageID) {
      // Language is not supported
      throw new Error('Language ID cannot be empty.')
    }

    this.languageID = languageID
    this.dataLoaded = false
    this.model = LMF.getLanguageModel(languageID)
    this.suffixes = [] // An array of suffixes.
    this.forms = [] // An array of suffixes.
    this.footnotes = [] // Footnotes
  }

  /**
   * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
   * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
   * 'feminine' genders
   *
   * @param {string | null} itemValue - A text of an item. It is either a string or null if there is no suffix.
   * @param {string} itemType - either LanguageDataset.FORM or LanguageDataset.SUFFIX
   * @param {Feature[]} featureValue
   * @return {Suffix} A newly added data value (Form or Suffix) (can be used to add more data to the suffix).
   */
  addItem (itemValue, itemType, featureValue, extendedLangData) {
    // TODO: implement run-time error checking
    let item
    let store
    if (itemType === LanguageDataset.SUFFIX) {
      item = new Suffix(itemValue)
      store = this.suffixes
    } else if (itemType === LanguageDataset.FORM) {
      item = new Form(itemValue)
      store = this.forms
    } else {
      throw new Error(`Unknown item type "${itemType}"`)
    }
    item.extendedLangData = extendedLangData

    // Build all possible combinations of features
    let multiValueFeatures = []

    // Go through all features provided
    for (let feature of featureValue) {
      // If this is a footnote. Footnotes should go in a flat array
      // because we don't need to split by them
      if (feature.type === Feature.types.footnote) {
        item[Feature.types.footnote] = item[Feature.types.footnote] || []
        item[Feature.types.footnote].push(feature.value)
        continue
      }

      // If this ending has several grammatical feature values then they will be in an array
      if (Array.isArray(feature)) {
        if (feature.length > 0) {
          if (feature[0]) {
            let type = feature[0].type
            // Store all multi-value features to create a separate copy of a a Suffix object for each of them
            multiValueFeatures.push({type: type, features: feature})
          }
        } else {
          // Array is empty
          throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
        }
      } else {
        item.features[feature.type] = feature.value
      }
    }

    // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = item.split(featureGroup.type, featureGroup.features)
        store.push(...endingItems)
      }
    } else {
      store.push(item)
    }
  }

  /**
   * Stores a footnote item.
   * @param {Feature} partOfSpeech - A part of speech this footnote belongs to
   * @param {number} index - A footnote's index.
   * @param {string} text - A footnote's text.
   */
  addFootnote (partOfSpeech, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    let footnote = new Footnote(index, text, partOfSpeech.value)
    footnote.index = index

    this.footnotes.push(footnote)
  }

  /**
   * Should be redefined in child classes
   * @return {Array}
   */
  getObligatoryMatches () {
    return []
  }

  /**
   * Should be redefined in child classes
   * @return {Array}
   */
  getOptionalMatches (inflection) {
    return []
  }

  /**
   * Sets inflection grammar properties based on inflection data
   * @param {Inflection} inflection - An inflection data object
   * @return {Inflection} A modified inflection data object
   */
  setInflectionConstraints (inflection) {
    inflection.constraints.obligatoryMatches = this.getObligatoryMatches(inflection)
    inflection.constraints.optionalMatches = this.getOptionalMatches(inflection)
    return inflection
  }

  getInflectionData (homonym) {
    // Add support for languages
    let result = new InflectionData(homonym)
    let inflections = {}

    for (let lexeme of homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection.constraints.pronounClassRequired) {
          /*
          A `class` grammatical feature is an obligatory match for Greek pronouns. Class, however, is not present in
          the Inflection object at the time we receive it from a morphological analyzer because a morphological analyzer
          does not provide such data. To fix this, for pronouns we need to figure out what the `class` feature value is
          by finding an exact pronoun form match in inflection data and obtaining a corresponding `class` value.
          The value found will then be attached to an Inflection object.
           */
          // Get a class this inflection belongs to
          let grmClasses = this.model.getPronounClasses(this.forms, inflection.form)
          if (grmClasses.length === 0) {
            console.warn(`Cannot determine a grammar class for a ${inflection.form} pronoun. 
              Table construction will probably fail`)
          } else {
            // One or more values found
            inflection[Feature.types.grmClass] = grmClasses
          }
        }

        // add the lemma to the inflection
        inflection[Feature.types.word] =
          [new Feature(lexeme.lemma.word, Feature.types.word, lexeme.lemma.language)]

        // Group inflections by a part of speech
        let partOfSpeech = inflection[Feature.types.part]
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection')
        }
        if (!Array.isArray(partOfSpeech)) {
          throw new Error('Part of speech data should be in an array format')
        }
        if (partOfSpeech.length === 0 && partOfSpeech.length > 1) {
          throw new Error('Part of speech data should be an array with exactly one element')
        }
        partOfSpeech = partOfSpeech[0].value

        if (!inflections.hasOwnProperty(partOfSpeech)) {
          inflections[partOfSpeech] = []
        }
        inflections[partOfSpeech].push(inflection)
      }
    }

    // Scan for matches for all parts of speech separately
    for (const partOfSpeech in inflections) {
      if (inflections.hasOwnProperty(partOfSpeech)) {
        let inflectionsGroup = inflections[partOfSpeech]

        result[Feature.types.part].push(partOfSpeech)
        result[partOfSpeech] = {}

        let items = []
        // TODO: improve suffixBase/fullFormBased detection
        // There might be both full form based and suffix based items in the same group
        let suffixBased = inflectionsGroup.find(i => i.constraints.suffixBased)
        // If there is at least on full form based inflection, search for full form items
        if (!suffixBased) {
          // If it is an irregular verb or a pronoun there will be form matches

          // Let's assume that it might be full form based
          for (let inflection of inflectionsGroup) {
            inflection.constraints.fullFormBased = true
            this.setInflectionConstraints(inflection)
          }
          items = this.forms.reduce(this['reducer'].bind(this, inflectionsGroup), [])
          if (items.length === 0) {
            // It is probably suffix based
            suffixBased = true
          }
        }
        // Otherwise, check for suffix matches
        if (suffixBased) {
          for (let inflection of inflectionsGroup) {
            inflection.constraints.suffixBased = true
            inflection.constraints.fullFormBased = false
            this.setInflectionConstraints(inflection)
          }
          items = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), [])
        }

        // TODO: Shall we produce a warning if no matches found?
        // TODO: for both suffix based and full form based matches store matches into separate
        // TODO: Each view should use either suffix based or full form based array
        result[partOfSpeech].suffixes = items
        result[partOfSpeech].footnotes = []

        // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set()
        // Scan all selected suffixes to build a unique set of footnote indexes
        for (let item of result[partOfSpeech].suffixes) {
          if (item.hasOwnProperty(Feature.types.footnote)) {
            // Footnote indexes are stored in an array
            for (let index of item[Feature.types.footnote]) {
              footnotesIndex.add(index)
            }
          }
        }
        // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
          let footnote = this.footnotes.find(footnoteElement =>
            footnoteElement.index === index &&
            footnoteElement[Feature.types.part] &&
            footnoteElement[Feature.types.part] === partOfSpeech
          )
          if (footnote) {
            result[partOfSpeech].footnotes.push({index: index, text: footnote.text})
          } else {
            console.warn(`Cannot find a footnote "${index}" for ${LMF.getLanguageCodeFromId(this.languageID)} ${partOfSpeech}`)
          }
        }
        // Sort footnotes according to their index numbers
        result[partOfSpeech].footnotes.sort((a, b) => parseInt(a.index) - parseInt(b.index))
      }
    }

    return result
  }

  reducer (inflections, accumulator, item) {
    let result = this.matcher(inflections, item)
    if (result) {
      accumulator.push(result)
    }
    return accumulator
  }

  /**
   * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
   * @param {Inflection[]} inflections - an array of inflection objects to be matched against a suffix.
   * @param {Suffix} item - a suffix to be matched with inflections.
   * @returns {Suffix | null} if a match is found, returns a suffix object modified with some
   * additional information about a match. if no matches found, returns null.
   */
  matcher (inflections, item) {
    // I'm not sure if we ever want to restrict what we consider optional matches
    // so this is just a placeholder for now
    let matchOptional = true

    // Any of those features must match between an inflection and an ending
    let bestMatchData = null // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
      let matchData = new MatchData() // Create a match profile
      let optionalMatches = matchOptional ? inflection.constraints.optionalMatches : []
      matchData.suffixMatch = inflection.compareWithWord(item.value)

      // Check for obligatory matches
      for (let featureName of inflection.constraints.obligatoryMatches) {
        if (inflection.hasOwnProperty(featureName) && item.featureMatch(featureName, inflection[featureName])) {
          // Add a matched feature name to a list of matched features
          matchData.matchedFeatures.push(featureName)
        } else {
          // If an obligatory match is not found, there is no reason to check other items
          break
        }
      }

      if (matchData.matchedFeatures.length < inflection.constraints.obligatoryMatches.length) {
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

      if (matchData.suffixMatch && (matchData.matchedFeatures.length === inflection.constraints.obligatoryMatches.length + optionalMatches.length)) {
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
  bestMatch (matchA, matchB) {
    // If one of the arguments is not set, return the other one
    if (!matchA && matchB) {
      return matchB
    }

    if (!matchB && matchA) {
      return matchA
    }

    // item match has a priority
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
}
LanguageDataset.SUFFIX = 'suffix'
LanguageDataset.FORM = 'form'
