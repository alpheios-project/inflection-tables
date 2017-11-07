/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_selection_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_type_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feature_list_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feature_importer_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language_model_factory_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__homonym_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lexeme_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lemma_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__inflection_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__latin_language_model_js__ = __webpack_require__(5);
/* unused harmony reexport SourceSelection */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__feature_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a"]; });
/* unused harmony reexport FeatureList */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__feature_importer_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__inflection_js__["a"]; });
/* unused harmony reexport LanguageModelFactory */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__homonym_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__lexeme_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__lemma_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_10__latin_language_model_js__["a"]; });















/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @class  LanguageModel is the base class for language-specific behavior
 */
class LanguageModel {

   /**
   */
   constructor() {
     this.source_language = null;
     this.context_forward = 0;
     this.context_backward = 0;
     this.direction = LanguageModel.DIR_LTR;
     this.base_unit = LanguageModel.UNIT_WORD;
     this.language_codes = [];
     this.features = {}; // Grammatical feature types (definitions) within supported by a specific language.
   }

  /**
   * Handler which can be used as the contextHander.
   * It uses language-specific configuration to identify
   * the elements from the alph-text popup which should produce links
   * to the language-specific grammar.
   * @see #contextHandler
   */
  grammarContext(a_doc)
  {
      // used to bind a click handler on the .alph-entry items in the
      // popup which retrieved the context attribute from the clicked
      // term and used that to construct a link and open the grammar
      // at the apporopriate place.
      //var links = this.getGrammarLinks();

      //for (var link_name in links)
      //{
      //   if (links.hasOwnProperty(link_name))
      //    {
              //Alph.$(".alph-entry ." + link_name,a_doc).bind('click',link_name,
              //   function(a_e)
              //    {
                        // build target inside grammar
                        //var target = a_e.data;
                        //var rngContext = Alph.$(this).attr("context");
                        //if (rngContext != null)
                        //{
                        //  target += "-" + rngContext.split(/-/)[0];
                        //}
                        //myobj.openGrammar(a_e.originaEvent,this,target);
               //   }
              //);
       //   }
      //}
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect(a_node)
  {
    return false;
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   * @param {String} a_code the language code
   * @returns true if supported false if not
   * @type Boolean
   */
  static supportsLanguage(a_code)
  {
      return false;
  };

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} a_word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord(a_word)
  {
      return a_word;
  }


  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation()
  {
      return ".,;:!?'\"(){}\\[\\]<>\/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r";
  }

  toString()
  {
    return String(this.source_language);
  }

  isEqual(model)
  {
    return this.source_language === model.source_language;
  }

  toCode() {
    return null;
  }

}
LanguageModel.UNIT_WORD = Symbol('word');
LanguageModel.UNIT_CHAR = Symbol('char');
LanguageModel.DIR_LTR = Symbol('ltr');
LanguageModel.DIR_RTL = Symbol('rtl');
LanguageModel.LANG_LATIN = Symbol('latin');
LanguageModel.LANG_GREEK = Symbol('greek');

/* harmony default export */ __webpack_exports__["a"] = (LanguageModel);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return languages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LanguageDataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LanguageData; });
/* unused harmony export Suffix */
/* unused harmony export Footnote */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MatchData; });
/* unused harmony export ExtendedLanguageData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExtendedGreekData; });
/* unused harmony export WordData */
/* unused harmony export loadData */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__ = __webpack_require__(0);

/**
 * Shared data structures and functions
 */



const languages = {
    type: 'language',
    latin: 'lat',
    greek: 'grc',
    isAllowed(language) {
        if (language === this.type) {
            return false;
        }
        else {
            return Object.values(this).includes(language);
        }
    }
};

/**
 * Stores inflection language data
 */
class LanguageDataset {
    /**
     * Initializes a LanguageDataset.
     * @param {string} language - A language of a data set, from an allowed languages list (see 'languages' object).
     */
    constructor(language) {
        if (!language) {
            // Language is not supported
            throw new Error('Language data cannot be empty.');
        }

        if (!languages.isAllowed(language)) {
            // Language is not supported
            throw new Error('Language "' + language + '" is not supported.');
        }
        this.language = language;
        this.suffixes = []; // An array of suffixes.
        this.footnotes = []; // Footnotes
    };

    /**
     * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
     * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
     * 'feminine' genders
     *
     * @param {string | null} suffixValue - A text of a suffix. It is either a string or null if there is no suffix.
     * @param {Feature[]} featureValue
     * @return {Suffix} A newly added suffix value (can be used to add more data to the suffix).
     */
    addSuffix(suffixValue, featureValue, extendedLangData) {
        // TODO: implement run-time error checking
        let suffixItem = new Suffix(suffixValue);
        suffixItem.extendedLangData = extendedLangData;

        // Build all possible combinations of features
        let multiValueFeatures = [];


        // Go through all features provided
        for (let feature of featureValue) {

            // If this is a footnote. Footnotes should go in a flat array
            // because we don't need to split by them
            if (feature.type === __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote) {
                suffixItem[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote] = suffixItem[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote] || [];
                suffixItem[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote].push(feature.value);
                continue;
            }

            // If this ending has several grammatical feature values then they will be in an array
            if (Array.isArray(feature)) {

                if (feature.length > 0) {
                    let type = feature[0].type;
                    // Store all multi-value features to create a separate copy of a a Suffix object for each of them
                    multiValueFeatures.push({type: type, features: feature});
                }
                else {
                    // Array is empty
                    throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
                }
            }
            else {
                suffixItem.features[feature.type] = feature.value;
            }
        }

        // Create a copy of an Suffix object for each multi-value item
        if (multiValueFeatures.length > 0) {
            for (let featureGroup of multiValueFeatures) {
                let endingItems = suffixItem.split(featureGroup.type, featureGroup.features);
                this.suffixes = this.suffixes.concat(endingItems);
            }
        }
        else {
            this.suffixes.push(suffixItem);
        }
    };

    /**
     * Stores a footnote item.
     * @param {Feature} partOfSpeech - A part of speech this footnote belongs to
     * @param {number} index - A footnote's index.
     * @param {string} text - A footnote's text.
     */
    addFootnote(partOfSpeech, index, text) {

        if (!index) {
            throw new Error('Footnote index data should not be empty.');
        }

        if (!text) {
            throw new Error('Footnote text data should not be empty.');
        }

        let footnote = new Footnote(index, text, partOfSpeech.value);
        footnote.index = index;

        this.footnotes.push(footnote);
    };

    getSuffixes(homonym) {

        // Add support for languages
        let result = new WordData(homonym);
        let inflections = {};

        // Find partial matches first, and then full among them

        // TODO: do we ever need lemmas?
        for (let lexema of homonym.lexemes) {
            for (let inflection of lexema.inflections) {
                // Group inflections by a part of speech
                let partOfSpeech = inflection[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part];
                if (!partOfSpeech) {
                    throw new Error("Part of speech data is missing in an inflection.");
                }

                if (!inflections.hasOwnProperty(partOfSpeech)) {
                    inflections[partOfSpeech] = [];
                }
                inflections[partOfSpeech].push(inflection);
            }
        }

        // Scan for matches for all parts of speech separately
        for (const partOfSpeech in inflections) {
            if (inflections.hasOwnProperty(partOfSpeech)) {
                let inflectionsGroup = inflections[partOfSpeech];

                result[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part].push(partOfSpeech);
                result[partOfSpeech] = {};
                result[partOfSpeech].suffixes = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), []);
                result[partOfSpeech].footnotes = [];

                // Create a set so all footnote indexes be unique
                let footnotesIndex = new Set();
                // Scan all selected suffixes to build a unique set of footnote indexes
                for (let suffix of result[partOfSpeech].suffixes) {
                    if (suffix.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote)) {
                        // Footnote indexes are stored in an array
                        for (let index of suffix[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote]) {
                            footnotesIndex.add(index);
                        }
                    }
                }
                // Add footnote indexes and their texts to a result
                for (let index of footnotesIndex) {
                    let footnote = this.footnotes.find(footnoteElement =>
                        footnoteElement.index === index && footnoteElement[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part] === partOfSpeech
                    );
                    result[partOfSpeech].footnotes.push({index: index, text: footnote.text});
                }
                // Sort footnotes according to their index numbers
                result[partOfSpeech].footnotes.sort( (a, b) => parseInt(a.index) - parseInt(b.index) );
            }
        }

        return result;
    }

    reducer(inflections, accumulator, suffix) {
        let result = this.matcher(inflections, suffix);
        if (result) {
            accumulator.push(result);
        }
        return accumulator;
    }
}


/**
 * Stores one or several language datasets, one for each language
 */
class LanguageData {
    /**
     * Combines several language datasets for different languages. Allows to abstract away language data.
     * This function is chainable.
     * @param {LanguageDataset[]} languageData - Language datasets of different languages.
     * @return {LanguageData} Self instance for chaining.
     */
    constructor(languageData) {
        this.supportedLanguages = [];

        if (languageData) {
            for (let dataset of languageData) {
                this[dataset.language] = dataset;
                this.supportedLanguages.push(dataset.language);
            }
        }
        return this;
    }

    /**
     * Loads data for all data sets.
     * This function is chainable.
     * @return {LanguageData} Self instance for chaining.
     */
    loadData() {
        for (let language of this.supportedLanguages) {
          try {
            this[language].loadData();
          } catch(e) {
            console.log(e);
          }
        }
        return this;
    }

    /**
     * Finds matching suffixes for a homonym.
     * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
     * @return {WordData} A return value of an inflection query.
     */
    getSuffixes(homonym) {
        let language = homonym.language;
        if (this.supportedLanguages.includes(language)) {
            return this[homonym.language].getSuffixes(homonym);
        }
        else {
            throw new Error(`"${language}" language data is missing. Unable to get suffix data.`);
        }
    }
}

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Suffix {
    /**
     * Initializes a Suffix object.
     * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
     */
    constructor(suffixValue) {

        if (suffixValue === undefined) {
            throw new Error('Suffix should not be empty.')
        }
        this.value = suffixValue;
        this.features = {};
        this.featureGroups = {};

        /*
        Extended language data stores additional suffix information that is specific for a particular language.
        It uses the following schema:
        {string} language(key): {object} extended language data. This object is specific for each language
        and is defined in a language model.
         */
        this.extendedLangData = {};
        this.match = undefined;
    }

    static readObject(jsonObject) {
        let suffix = new Suffix(jsonObject.value);

        if (jsonObject.features) {
            for (let key in jsonObject.features) {
                if (jsonObject.features.hasOwnProperty(key)) {
                    suffix.features[key] = jsonObject.features[key];
                }
            }
        }

        if (jsonObject.featureGroups) {
            for (let key in jsonObject.featureGroups) {
                if (jsonObject.featureGroups.hasOwnProperty(key)) {
                    suffix.featureGroups[key] = [];
                    for (let value of jsonObject.featureGroups[key]) {
                        suffix.featureGroups[key].push(value);
                    }
                }
            }
        }

        if (jsonObject[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote]) {
            suffix[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote] = [];
            for (let footnote of jsonObject[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote]) {
                suffix[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote].push(footnote);
            }
        }

        if (jsonObject.match) {
            suffix.match = MatchData.readObject(jsonObject.match);
        }

        for (const lang in jsonObject.extendedLangData) {
            if (jsonObject.extendedLangData.hasOwnProperty(lang)) {
                suffix.extendedLangData[lang] = ExtendedLanguageData.readObject(jsonObject.extendedLangData[lang]);
            }
        }
        return suffix;
    }

    /**
     * Returns a copy of itself. Used in splitting suffixes with multi-value features.
     * @returns {Suffix}
     */
    clone() {

        // TODO: do all-feature two-level cloning
        let clone = new Suffix(this.value);
        for (const key in this.features) {
            if (this.features.hasOwnProperty(key)) {
                clone.features[key] = this.features[key];
            }
        }
        for (const key in this.featureGroups) {
            if (this.featureGroups.hasOwnProperty(key)) {
                clone.featureGroups[key] = this.featureGroups[key];
            }
        }

        if (this.hasOwnProperty(__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote)) {
            clone[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote] = this[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.footnote];
        }

        for (const lang in this.extendedLangData) {
            if (this.extendedLangData.hasOwnProperty(lang)) {
                clone.extendedLangData[lang] = this.extendedLangData[lang];
            }
        }
        return clone;
    };

    /**
     * Checks if suffix has a feature that is a match to the one provided.
     * @param {string} featureType - Sets a type of a feature we need to match with the ones stored inside the suffix
     * @param {string[]} featureValues - A list of feature values we need to match with the ones stored inside the suffix
     * @returns {string | undefined} - If provided feature is a match, returns a first feature that matched.
     * If no match found, return undefined.
     */
    featureMatch(featureType, featureValues) {
        if (this.features.hasOwnProperty(featureType)) {
            for (let value of featureValues) {
                if (value === this.features[featureType]) {
                    return value;
                }
            }
        }
        return undefined;
    }

    /**
     * Find feature groups in Suffix.featureGroups that are the same between suffixes provided
     * @param suffixes
     */
    static getCommonGroups(suffixes) {

        let features = Object.keys(suffixes[0].featureGroups);

        let commonGroups = features.filter( feature => {
            let result = true;
            for (let i=1; i<suffixes.length; i++) {
                result = result && suffixes[i].features.hasOwnProperty(feature);
            }
            return result;
        });
        return commonGroups;
    }

    /**
     * Finds out if an suffix is in the same group with some other suffix. The other suffix is provided as a function argument.
     * Two suffixes are considered to be in the same group if they are:
     * a. Have at least one common group in featureGroups;
     * b. Have the same suffix
     * c. Have values of all features the same except for those that belong to a common group(s)
     * d. Values of the common group features must be complementary. Here is an example:
     * Let's say a 'gender' group can have values such as 'masculine' and 'feminine'. Then suffixes will be combined
     * only if gender value of one suffix is 'masculine' and the other value is 'feminine'. If both suffixes have the same
     * either 'masculine' or 'feminine' value, they sill not be combined as are not being complementary.
     * @param {Suffix} suffix - An other suffix that we compare this suffix with.
     * @returns {boolean} - True if both suffixes are in the same group, false otherwise.
     */
    isInSameGroupWith(suffix) {

        let commonGroups = Suffix.getCommonGroups([this, suffix]);
        if (commonGroups.length < 1) {
            // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
            return false;
        }

        let commonValues = {};
        commonGroups.forEach(feature => commonValues[feature] = new Set([this.features[feature]]));

        let result = true;
        result = result && this.value === suffix.value;
        // If suffixes does not match don't check any further
        if (!result) {
            return false;
        }

        // Check all features to be a match, except those that are possible group values
        for (let feature of Object.keys(this.features)) {
            if (commonGroups.indexOf(feature)>=0) {
                commonValues[feature].add(suffix.features[feature]);

                // Do not compare common groups
                continue;
            }
            result = result && this.features[feature] === suffix.features[feature];
            // If feature mismatch discovered, do not check any further
            if (!result) {
                return false;
            }
        }

        commonGroups.forEach(feature => {
            result = result && commonValues[feature].size === 2
        });

        return result;
    }

    /**
     * Splits a suffix that has multiple values of one or more grammatical features into an array of Suffix objects
     * with each Suffix object having only a single value of those grammatical features. Initial multiple values
     * are stored in a featureGroups[featureType] property as an array of values.
     * @param {string} featureType - A type of a feature
     * @param {Feature[]} featureValues - Multiple grammatical feature values.
     * @returns {Suffix[]} - An array of suffixes.
     */
    split(featureType, featureValues) {

        let copy = this.clone();
        let values = [];
        featureValues.forEach(element => values.push(element.value));
        copy.features[featureType] = featureValues[0].value;
        copy.featureGroups[featureType] = values;
        let suffixItems = [copy];
        for (let i = 1; i < featureValues.length; i++) {
            copy = this.clone();
            copy.features[featureType] = featureValues[i].value;
            copy.featureGroups[featureType] = values;
            suffixItems.push(copy);
        }
        return suffixItems;
    };

    /**
     * Combines suffixes that are in the same group together. Suffixes to be combined must have their values listed
     * in an array stored as featureGroups[featureType] property.
     * @param {Suffix[]} suffixes - An array of suffixes to be combined.
     * @param {function} mergeFunction - A function that will merge two suffixes. By default it uses Suffix.merge,
     * but provides a way to supply a presentation specific functions. Please see Suffix.merge for more
     * information on function format.
     * @returns {Suffix[]} An array of suffixes with some items possibly combined together.
     */
    static combine(suffixes, mergeFunction = Suffix.merge) {

        let matchFound = false;
        let matchIdx;

        do {
            matchFound = false;

            /*
            Go through an array of suffixes end compare each suffix with each other (two-way compare) one time. \
            If items are in the same group, merge two suffixes, break out of a loop,
            and remove one matching suffix (the second one) from an array.
            Then repeat on a modified array until no further matches found.
             */
            for (let i=0; i<suffixes.length; i++) {
                if (matchFound) {
                    continue;
                }
                for (let j=i+1; j < suffixes.length; j++) {
                    if (suffixes[i].isInSameGroupWith(suffixes[j])) {
                        matchIdx = j;
                        matchFound = true;
                        mergeFunction(suffixes[i], suffixes[j]);
                    }
                }
            }

            if (matchFound) {
                suffixes.splice(matchIdx, 1);
            }
        }
        while (matchFound);
        return suffixes;
    }

    /**
     * This function provide a logic of to merge data of two suffix object that were previously split together.
     * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
     * @param {Suffix} suffixB - A second ending to merge (to be discarded).
     * @returns {Suffix} A modified value of ending A.
     */
    static merge(suffixA, suffixB) {
        let commonGroups = Suffix.getCommonGroups([suffixA, suffixB]);
        for (let type of commonGroups) {
            // Combine values using a comma separator. Can do anything else if we need to.
            suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
        }
        return suffixA;
    };
}


class Footnote {
    constructor(index, text, partOfSpeech) {
        this.index = index;
        this.text = text;
        this[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part] = partOfSpeech;
    }

    static readObject(jsonObject) {
        this.index = jsonObject.index;
        this.text = jsonObject.text;
        this[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part] = jsonObject[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part];
        return new Footnote(jsonObject.index, jsonObject.text, jsonObject[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part]);
    }
}

/**
 * Detailed information about a match type.
 */
class MatchData {
    constructor() {
        this.suffixMatch = false; // Whether two suffixes are the same.
        this.fullMatch = false; // Whether two suffixes and all grammatical features, including part of speech, are the same.
        this.matchedFeatures = []; // How many features matches each other.
    }

    static readObject(jsonObject) {
        let matchData = new MatchData();
        matchData.suffixMatch = jsonObject.suffixMatch;
        matchData.fullMatch = jsonObject.fullMatch;
        for (let feature of jsonObject.matchedFeatures) {
            matchData.matchedFeatures.push(feature);
        }
        return matchData;
    }
}


class ExtendedLanguageData {
    constructor() {
        this._type = undefined; // This is a base class
    }

    static types() {
        return {
            EXTENDED_GREEK_DATA: "ExtendedGreekData"
        }
    }

    static readObject(jsonObject) {
        if (!jsonObject._type) {
            throw new Error('Extended language data has no type information. Unable to deserialize.');
        }
        else if(jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
            return ExtendedGreekData.readObject(jsonObject);
        }
        else {
            throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`);
        }
    }
}

class ExtendedGreekData extends ExtendedLanguageData {
    constructor() {
        super();
        this._type = ExtendedLanguageData.types().EXTENDED_GREEK_DATA; // For deserialization
        this.primary = false;
    }

    static readObject(jsonObject) {
        let data = new ExtendedGreekData();
        data.primary = jsonObject.primary;
        return data;
    }

    merge(extendedGreekData) {
        if (this.primary !== extendedGreekData.primary) {
            console.log('Mismatch', this.primary, extendedGreekData.primary);
        }
        let merged = new ExtendedGreekData();
        merged.primary = this.primary;
        return merged;
    }
}


/**
 * A return value for inflection queries
 */
class WordData {
    constructor(homonym) {
        this.homonym = homonym;
        this.definition = undefined;
        this[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part] = []; // What parts of speech are represented by this object.
    }

    static readObject(jsonObject) {
        let homonym = __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["d" /* Homonym */].readObject(jsonObject.homonym);

        let wordData = new WordData(homonym);
        wordData.definition = jsonObject.definition;
        wordData[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part] = jsonObject[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part];

        for (let part of wordData[__WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types.part]) {
            let partData = jsonObject[part];
            wordData[part] = {};

            if (partData.suffixes) {
                wordData[part].suffixes = [];
                for (let suffix of partData.suffixes) {
                    wordData[part].suffixes.push(Suffix.readObject(suffix));
                }
            }

            if (partData.footnotes) {
                wordData[part].footnotes = [];
                for (let footnote of partData.footnotes) {
                    wordData[part].footnotes.push(Footnote.readObject(footnote));
                }
            }
        }

        return wordData;
    }

    get word() {
        return this.homonym.targetWord;
    }

    set word(word) {
        this.homonym.targetWord = word;
    }

    get language() {
        return this.homonym.language;
    }
}

/**
 * Load text data form an external fil with an asynchronous XHR request.
 * @param {string} filePath - A path to a file we need to load.
 * @returns {Promise} - A promise that will be resolved with either
 * file content (a string) in case of success of with a status message
 * in case of failure.
 */
let loadData = function loadData(filePath) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", filePath);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_js__ = __webpack_require__(1);


/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {

    /**
     * Initializes a Feature object
     * @param {string | string[]} value - A single feature value or, if this feature could have multiple
     * values, an array of values.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
     */
    constructor (value, type, language) {
        if (!Feature.types.isAllowed(type)) {
            throw new Error('Features of "' + type + '" type are not supported.');
        }
        if (!value) {
            throw new Error('Feature should have a non-empty value.');
        }
        if (!type) {
            throw new Error('Feature should have a non-empty type.');
        }
        if (!language) {
          throw new Error('Feature constructor requires a language');
        }
        this.value = value;
        this.type = type;
        this.language = language;

    };

    isEqual(feature) {
        if (Array.isArray(feature.value)) {
            if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
                return false;
            }
            let equal = this.type===feature.type && this.language===feature.language;
            equal = equal && this.value.every(function(element, index) {
                return element === feature.value[index];
            });
            return equal;
        }
        else {
            return this.value===feature.value && this.type===feature.type && this.language===feature.language;
        }
    }
}
// Should have no spaces in values in order to be used in HTML templates
Feature.types = {
    word: 'word',
    part: 'part of speech', // Part of speech
    number: 'number',
    grmCase: 'case',
    declension: 'declension',
    gender: 'gender',
    type: 'type',
    conjugation: 'conjugation',
    tense: 'tense',
    voice: 'voice',
    mood: 'mood',
    person: 'person',
    frequency: 'frequency', // How frequent this word is
    meaning: 'meaning', // Meaning of a word
    source: 'source', // Source of word definition
    footnote: 'footnote', // A footnote for a word's ending
    isAllowed(value) {
        let v = `${value}`;
        return Object.values(this).includes(v);
    }
};
/* harmony default export */ __webpack_exports__["a"] = (Feature);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__latin_language_model_js__ = __webpack_require__(5);


class LanguageModelFactory {

  static getLanguageForCode(code=null) {
    for (const model of LanguageModelFactory.MODELS) {
      if (model.supportsLanguage(code)) {
        return new model();
      }
    }
    return new __WEBPACK_IMPORTED_MODULE_0__language_model_js__["a" /* default */]();
  }
}
LanguageModelFactory.MODELS = [ __WEBPACK_IMPORTED_MODULE_1__latin_language_model_js__["a" /* default */] ];
/* harmony default export */ __webpack_exports__["a"] = (LanguageModelFactory);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feature_type_js__ = __webpack_require__(6);



/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends __WEBPACK_IMPORTED_MODULE_0__language_model_js__["a" /* default */] {

   /**
   */
   constructor() {
     super();
     this.source_language = __WEBPACK_IMPORTED_MODULE_0__language_model_js__["a" /* default */].LANG_LATIN;
     this.context_forward = 0;
     this.context_backward = 0;
     this.direction = __WEBPACK_IMPORTED_MODULE_0__language_model_js__["a" /* default */].DIR_LTR;
     this.base_unit = __WEBPACK_IMPORTED_MODULE_0__language_model_js__["a" /* default */].UNIT_WORD;
     this.language_codes = ['la','lat'];
     this.features = this._initializeFeatures();
   }

   static supportsLanguage(a_code) {
     return ['la','lat'].includes(a_code);
   }

   _initializeFeatures() {
     let features = {}
     let lang_code = this.toCode();
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.part] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.part, ['noun', 'adjective', 'verb'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.number] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.number, ['singular', 'plural'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.grmCase] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.declension] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.declension, ['first', 'second', 'third', 'fourth', 'fifth'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.gender] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.gender, ['masculine', 'feminine', 'neuter'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.type] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.type, ['regular', 'irregular'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.tense] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.voice] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.voice, ['passive', 'active'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.mood] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.mood, ['indicative', 'subjunctive'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.person] =new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.person, ['first', 'second', 'third'],lang_code);
     features[__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.conjugation] = new __WEBPACK_IMPORTED_MODULE_2__feature_type_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.conjugation, ['first', 'second', 'third', 'fourth'],lang_code);
     return features;
   }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect(a_node)
  {
    return true;
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} a_word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord(a_word)
  {
      return a_word;
  }


  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation()
  {
      return ".,;:!?'\"(){}\\[\\]<>\/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r";
  }

  toCode() {
    return 'lat';
  }
}
/* harmony default export */ __webpack_exports__["a"] = (LatinLanguageModel);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_js__ = __webpack_require__(3);



/**
 * Definition class for a (grammatical) feature. Stores type information and (optionally) all possible values of the feature.
 * It serves as a feature generator. If list of possible values is provided, it can generate a Feature object
 * each time a property that corresponds to a feature value is accessed. If no list of possible values provided,
 * a Feature object can be generated with get(value) method.
 *
 * An order of values determines a default sort and grouping order. If two values should have the same order,
 * they should be grouped within an array: value1, [value2, value3], value4. Here 'value2' and 'value3' have
 * the same priority for sorting and grouping.
 */
class FeatureType {
    // TODO: value checking
    /**
     * Creates and initializes a Feature Type object.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string[] | string[][]} values - A list of allowed values for this feature type.
     * If an empty array is provided, there will be no
     * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
     * such as footnotes).
     * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
     */
    constructor(type, values, language) {
        if (!__WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */].types.isAllowed(type)) {
            throw new Error('Features of "' + type + '" type are not supported.');
        }
        if (!values || !Array.isArray(values)) {
            throw new Error('Values should be an array (or an empty array) of values.');
        }
        if (!language) {
          throw new Error('FeatureType constructor requires a language');
        }

        this.type = type;
        this.language = language;

        /*
         This is a sort order index for a grammatical feature values. It is determined by the order of values in
         a 'values' array.
         */
        this._orderIndex = [];
        this._orderLookup = {};

        for (const [index, value] of values.entries()) {
            this._orderIndex.push(value);
            if (Array.isArray(value)) {
                for (let element of value) {
                    this[element] = new __WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */](element, this.type, this.language);
                    this._orderLookup[element] = index;
                }
            }
            else {
                this[value] = new __WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */](value, this.type, this.language);
                this._orderLookup[value] = index;
            }
        }
    };

    /**
     * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
     * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
     * @param value
     * @returns {Feature}
     */
    get(value) {
        if (value) {
            return new __WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */](value, this.type, this.language);
        }
        else {
            throw new Error('A non-empty value should be provided.');
        }

    }

    /**
     * Creates and returns a new importer with a specific name. If an importer with this name already exists,
     * an existing Importer object will be returned.
     * @param {string} name - A name of an importer object
     * @returns {Importer} A new or existing Importer object that matches a name provided
     */
    addImporter(name) {
        if (!name) {
            throw new Error('Importer should have a non-empty name.');
        }
        this.importer = this.importer || {};
        this.importer[name] = this.importer[name] || new Importer();
        return this.importer[name];
    }

    /**
     * Return copies of all feature values as Feature objects in a sorted array, according to feature type's sort order.
     * For a similar function that returns strings instead of Feature objects see orderedValues().
     * @returns {Feature[] | Feature[][]} Array of feature values sorted according to orderIndex.
     * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
     * an array of Feature objects will be returned instead of a single Feature object, as for single feature values.
     */
    get orderedFeatures() {
        return this.orderedValues.map((value) => new __WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */](value, this.type, this.language));
    }

    /**
     * Return all feature values as strings in a sorted array, according to feature type's sort order.
     * This is a main method that specifies a sort order of the feature type. orderedFeatures() relies
     * on this method in providing a sorted array of feature values. If you want to create
     * a custom sort order for a particular feature type that will depend on some options that are not type-related,
     * create a wrapper around this function providing it with options arguments so it will be able to decide
     * in what order those features will be based on those arguments.
     * For a similar function that returns Feature objects instead of strings see orderedValues().
     * @returns {string[]} Array of feature values sorted according to orderIndex.
     * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
     * an array of strings will be returned instead of a single strings, as for single feature values.
     */
    get orderedValues() {
        return this._orderIndex;
    }

    /**
     * Returns a lookup table for type values as:
     *  {value1: order1, value2: order2}, where order is a sort order of an item. If two items have the same sort order,
     *  their order value will be the same.
     * @returns {object}
     */
    get orderLookup() {
        return this._orderLookup;
    }

    /**
     * Sets an order of grammatical feature values for a grammatical feature. Used mostly for sorting, filtering,
     * and displaying.
     *
     * @param {Feature[] | Feature[][]} values - a list of grammatical features that specify their order for
     * sorting and filtering. Some features can be grouped as [[genders.masculine, genders.feminine], LibLatin.genders.neuter].
     * It means that genders.masculine and genders.feminine belong to the same group. They will have the same index
     * and will be stored inside an _orderIndex as an array. genders.masculine and genders.feminine will be grouped together
     * during filtering and will be in the same bin during sorting.
     *
     */
    set order(values) {
        if (!values || (Array.isArray(values) && values.length === 0)) {
            throw new Error("A non-empty list of values should be provided.");
        }

        // If a single value is provided, convert it into an array
        if (!Array.isArray(values)) {
            values = [values];
        }

        for (let value of values) {
            if (Array.isArray(value)) {
                for (let element of value) {
                    if (!this.hasOwnProperty(element.value)) {
                        throw new Error('Trying to order an element with "' + element.value + '" value that is not stored in a "' + this.type + '" type.');
                    }

                    if (element.type !== this.type) {
                        throw new Error('Trying to order an element with type "' + element.type + '" that is different from "' + this.type + '".')
                    }

                    if (element.language !== this.language) {
                        throw new Error('Trying to order an element with language "' + element.language + '" that is different from "' + this.language + '".')
                    }
                }
            }
            else {
                if (!this.hasOwnProperty(value.value)) {
                    throw new Error('Trying to order an element with "' + value.value + '" value that is not stored in a "' + this.type + '" type.');
                }

                if (value.type !== this.type) {
                    throw new Error('Trying to order an element with type "' + value.type + '" that is different from "' + this.type + '".')
                }

                if (value.language !== this.language) {
                    throw new Error('Trying to order an element with language "' + value.language + '" that is different from "' + this.language + '".')
                }
            }
        }

        // Erase whatever sort order was set previously
        this._orderLookup = {};
        this._orderIndex = [];

        // Define a new sort order
        for (const [index, element] of values.entries()) {

            if (Array.isArray(element)) {
                // If it is an array, all values should have the same order
                let elements = [];
                for (const subElement of element) {
                    this._orderLookup[subElement.value] = index;
                    elements.push(subElement.value);
                }
                this._orderIndex[index] = elements;
            }
            else {
                // If is a single value
                this._orderLookup[element.value] = index;
                this._orderIndex[index] = element.value;
            }
        }
    }
}


/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList {

    /**
     * Initializes a feature list.
     * @param {FeatureType[]} features - Features that build the list (optional, can be set later).
     */
    constructor(features = []) {
        this._features = [];
        this._types = {};
        this.add(features);
    }

    add(features) {
        if (!features || !Array.isArray(features)) {
            throw new Error('Features must be defined and must come in an array.');
        }

        for (let feature of features) {
            this._features.push(feature);
            this._types[feature.type] = feature;
        }
    }


    /**
     * Returns an array of grouping features.
     * @returns {FeatureType[]} - An array of grouping features.
     */
    get items() {
        return this._features;
    }

    forEach(callback) {
        this._features.forEach(callback);
    }

    /**
     * Returns a feature of a particular type. If such feature does not exist in a list, returns undefined.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
     */
    ofType(type) {
        if (this.hasType(type)) {
            return this._types[type];
        }
    }

    /**
     * Checks whether a feature list has a feature of a specific type.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {boolean} Whether a feature list has a feature of a particular type.
     */
    hasType(type) {
        return this._types.hasOwnProperty(type);
    }
}

/**
 * This is a hash table that maps values to be imported from an external file or service to library standard values.
 */
class Importer {
    constructor() {
        this.hash = {};
        return this;
    }

    /**
     * Sets mapping between external imported value and one or more library standard values. If an importedValue
     * is already in a hash table, old libraryValue will be overwritten with the new one.
     * @param {string} importedValue - External value
     * @param {Object | Object[] | string | string[]} libraryValue - Library standard value
     */
    map(importedValue, libraryValue) {
        if (!importedValue) {
            throw new Error('Imported value should not be empty.')
        }

        if (!libraryValue) {
            throw new Error('Library value should not be empty.')
        }

        this.hash[importedValue] = libraryValue;
        return this;
    }

    /**
     * Checks if value is in a map.
     * @param {string} importedValue - A value to test.
     * @returns {boolean} - Tru if value is in a map, false otherwise.
     */
    has(importedValue) {
        return this.hash.hasOwnProperty(importedValue);
    }

    /**
     * Returns one or more library standard values that match an external value
     * @param {string} importedValue - External value
     * @returns {Object | string} One or more of library standard values
     */
    get(importedValue) {
        if (this.has(importedValue)) {
            return this.hash[importedValue];
        }
        else {
            throw new Error('A value "' + importedValue + '" is not found in the importer.');
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (FeatureType);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lemma_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inflection_js__ = __webpack_require__(9);



/**
 * A basic unit of lexical meaning. Contains a Lemma object and one or more Inflection objects.
 */
class Lexeme {
    /**
     * Initializes a Lexeme object.
     * @param {Lemma} lemma - A lemma object.
     * @param {Inflection[]} inflections - An array of inflections.
     * @param {string} meaning - a short definition
     */
    constructor(lemma, inflections, meaning="") {
        if (!lemma) {
            throw new Error('Lemma should not be empty.');
        }

        if (!(lemma instanceof __WEBPACK_IMPORTED_MODULE_0__lemma_js__["a" /* default */])) {
            throw new Error('Lemma should be of Lemma object type.');
        }

        if (!inflections) {
            throw new Error('Inflections data should not be empty.');
        }

        if (!Array.isArray(inflections)) {
            throw new Error('Inflection data should be provided in an array.');
        }

        for (let inflection of inflections) {
            if (!(inflection instanceof __WEBPACK_IMPORTED_MODULE_1__inflection_js__["a" /* default */])) {
                throw new Error('All inflection data should be of Inflection object type.');
            }
        }

        this.lemma = lemma;
        this.inflections = inflections;
        this.meaning = meaning;
    }

    static readObject(jsonObject) {
        let lemma = __WEBPACK_IMPORTED_MODULE_0__lemma_js__["a" /* default */].readObject(jsonObject.lemma);
        let inflections = [];
        for (let inflection of jsonObject.inflections) {
            inflections.push(__WEBPACK_IMPORTED_MODULE_1__inflection_js__["a" /* default */].readObject(inflection));
        }
        return new Lexeme(lemma, inflections);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Lexeme);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
    /**
     * Initializes a Lemma object.
     * @param {string} word - A word.
     * @param {string} language - A language of a word.
     */
    constructor(word, language) {

        if (!word) {
            throw new Error('Word should not be empty.');
        }

        if (!language) {
            throw new Error('Langauge should not be empty.');
        }

        //if (!languages.isAllowed(language)) {
        //    throw new Error('Language "' + language + '" is not supported.');
        //}

        this.word = word;
        this.language = language;
    }

    static readObject(jsonObject) {
        return new Lemma(jsonObject.word, jsonObject.language);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Lemma);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feature_js__ = __webpack_require__(3);


/*
 Hierarchical structure of return value of a morphological analyzer:

 Homonym (a group of words that are written the same way, https://en.wikipedia.org/wiki/Homonym)
    Lexeme 1 (a unit of lexical meaning, https://en.wikipedia.org/wiki/Lexeme)
        Have a lemma and one or more inflections
        Lemma (also called a headword, a canonical form of a group of words https://en.wikipedia.org/wiki/Lemma_(morphology) )
        Inflection 1
            Stem
            Suffix (also called ending)
        Inflection 2
            Stem
            Suffix
    Lexeme 2
        Lemma
        Inflection 1
            Stem
            Suffix
 */

/**
 * Represents an inflection of a word
 */
class Inflection {

    /**
     * Initializes an Inflection object.
     * @param {string} stem - A stem of a word.
     * @param {string} language - A word's language.
     */
    constructor(stem, language) {

        if (!stem) {
            throw new Error('Stem should not be empty.');
        }

        if (!language) {
            throw new Error('Langauge should not be empty.');
        }

        this.stem = stem;
        this.language = language;

        // Suffix may not be present in every word. If missing, it will set to null.
        this.suffix = null;
    }

    static readObject(jsonObject) {
        let inflection = new Inflection(jsonObject.stem, jsonObject.language);
        if (jsonObject.suffix) {
            inflection.suffix = jsonObject.suffix;
        }
        return inflection;
    }

    /**
     * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
     * an array of Feature objects will be provided.
     * Values are taken from features and stored in a 'feature.type' property as an array of values.
     * @param {Feature | Feature[]} data
     */
    set feature(data) {
        if (!data) {
            throw new Error('Inflection feature data cannot be empty.');
        }
        if (!Array.isArray(data)) {
            data = [data];
        }

        let type = data[0].type;
        this[type] = [];
        for (let element of data) {
            if (!(element instanceof __WEBPACK_IMPORTED_MODULE_1__feature_js__["a" /* default */])) {
                throw new Error('Inflection feature data must be a Feature object.');
            }

            if (element.language !== this.language) {
                throw new Error('Language "' + element.language + '" of a feature does not match a language "'
                + this.language + '" of an Inflection object.');
            }

            this[type].push(element.value);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Inflection);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (true)
	{
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module === 'object' && typeof exports !== 'undefined')
	{
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
	else
	{
		// Browser globals (root is window)
		root.Papa = factory();
	}
}(this, function()
{
	'use strict';

	var global = (function () {
		// alternative method, similar to `Function('return this')()`
		// but without using `eval` (which is disabled when
		// using Content Security Policy).

		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }

		// When running tests none of the above have been defined
		return {};
	})();


	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		}
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = '';
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			str = str.toString().replace(quoteCharRegex, _quoteChar+_quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults, this._input);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes='+this._start+'-'+end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		}

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		}

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		}

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
					return -1;
					}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		}

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		}

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		}

		this._chunkError = function()
		{
			this._sendError(reader.error);
		}

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		}
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		}
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		}

		this._nextChunk = function()
		{
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		}

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error.message);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			this._finished = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function ()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \''+Papa.DefaultDelimiter+'\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else
					return tryParseFloat(value);
			}
			return value;
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				for (var j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++
						continue
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar = config.quoteChar || '"';

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(quoteChar+quoteChar, 'g');

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf(quoteChar, quoteSearch+1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen-1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] === quoteChar)
						{
							quoteSearch++;
							continue;
						}

						// Closing quote followed by delimiter
						if (input[quoteSearch+1] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						// Closing quote followed by newline
						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alpheios_tufts_adapter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_lib__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_lang_latin_latin__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_lang_greek_greek__ = __webpack_require__(37);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





// Import language data



var alpheiosExtSettings = {
    noBrowserEnv: typeof browser === "undefined",
    menuItemId: 'alpheios-load-content',
    menuItemText: 'Load Alpheios',
    contentCSSFileName: 'styles/style.css',
    contentScriptFileName: 'content.js',
    browserPolyfillName: 'support/webextension-polyfill/browser-polyfill.js',
    contentScriptLoaded: false
};
// This should be below browser support detection
window.browser = __webpack_require__(40);

var alpheiosTestData = {
    definition: "\n                <h4>Some Dummy word data</h4>\n                <p>\n                    Nunc maximus ex id tincidunt pretium. Nunc vel dignissim magna, ut hendrerit lectus. Proin aliquet purus at\n                    ullamcorper dignissim. Sed mollis maximus dui. Morbi viverra, metus in fermentum lobortis, arcu est vehicula nibh, a\n                    efficitur orci libero eu eros. Nam vulputate risus sed odio fermentum, quis pharetra nibh tincidunt. Mauris eu\n                    posuere nunc, tincidunt accumsan metus. Nullam quis enim laoreet, euismod lacus ut, maximus ipsum. Donec vitae\n                    sapien non sem eleifend posuere sed vel mauris.\n                </p>\n                <p>\n                    Sed non orci convallis, iaculis ipsum quis, luctus orci. In et auctor metus. Vestibulum venenatis turpis nibh, vitae\n                    ornare urna fringilla eu. Nam efficitur blandit metus. Nullam in quam et sapien iaculis accumsan nec ut neque.\n                    Aenean aliquam urna quis egestas tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames\n                    ac turpis egestas. Praesent sit amet tellus dignissim, tristique ante luctus, gravida lectus.\n                </p>\n            "
};

var BackgroundProcess = function () {
    function BackgroundProcess(settings) {
        _classCallCheck(this, BackgroundProcess);

        this.settings = settings;

        BackgroundProcess.reportBrowserSupport();

        this.langData = new __WEBPACK_IMPORTED_MODULE_0__lib_lib__["b" /* LanguageData */]([__WEBPACK_IMPORTED_MODULE_4__lib_lang_latin_latin__["a" /* dataSet */], __WEBPACK_IMPORTED_MODULE_5__lib_lang_greek_greek__["a" /* dataSet */]]).loadData();

        browser.runtime.onMessage.addListener(this.messageListener.bind(this));

        BackgroundProcess.createMenuItem();

        browser.contextMenus.onClicked.addListener(this.menuListener.bind(this));
        browser.browserAction.onClicked.addListener(this.browserActionListener.bind(this));
    }

    _createClass(BackgroundProcess, [{
        key: "loadContent",
        value: function loadContent() {
            var polyfillScript = this.loadPolyfill();
            var contentScript = this.loadContentScript();
            //let contentCSS = this.loadContentCSS();
            Promise.all([polyfillScript, contentScript /*, contentCSS*/]).then(function (results) {
                "use strict";

                console.log('Content script(s) has been loaded successfully or already present');
                alpheiosExtSettings.contentScriptLoaded = true;
            }, function (error) {
                "use strict";

                throw new Error('Content script loading failed', error);
            });
        }
    }, {
        key: "loadPolyfill",
        value: function loadPolyfill() {
            if (!this.settings.contentScriptLoaded && this.settings.noBrowserEnv) {
                console.log('Loading webextension polyfill into a content tab');
                return browser.tabs.executeScript({
                    file: this.settings.browserPolyfillName
                });
            } else {
                return Promise.resolve();
            }
        }
    }, {
        key: "loadContentScript",
        value: function loadContentScript(fileName) {
            "use strict";

            if (!this.settings.contentScriptLoaded) {
                console.log('Loading content script into a content tab');
                return browser.tabs.executeScript({
                    file: this.settings.contentScriptFileName
                });
            } else {
                return Promise.resolve();
            }
        }
    }, {
        key: "loadContentCSS",
        value: function loadContentCSS(fileName) {
            "use strict";

            if (!this.settings.contentScriptLoaded) {
                console.log('Loading CSS into a content tab');
                return browser.tabs.insertCSS({
                    file: this.settings.contentCSSFileName
                });
            } else {
                return Promise.resolve();
            }
        }
    }, {
        key: "sendMessageToTab",
        value: function sendMessageToTab(message) {
            browser.tabs.query({
                active: true,
                currentWindow: true
            }).then(function (tabs) {
                browser.tabs.sendMessage(tabs[0].id, message);
                console.log('Sending a message to the content page.');
            }, function (error) {
                "use strict";

                throw new Error('Unable to determine an active tab');
            });
        }
    }, {
        key: "messageListener",
        value: function messageListener(message, sender) {
            var _this = this;

            console.log("Message from the content script: ", message.body);
            if (message.type === __WEBPACK_IMPORTED_MODULE_3__lib_lib__["a" /* Message */].types.WORD_DATA_REQUEST) {
                var selectedWord = { language: message.body.language, word: message.body.word };
                console.log("Request for a \"" + selectedWord.word + "\" word");
                var adapterArgs = { engine: { lat: "whitakerLat" }, url: "http://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG" };
                var adapter = new __WEBPACK_IMPORTED_MODULE_1_alpheios_tufts_adapter__["a" /* default */](adapterArgs);
                adapter.fetch(selectedWord.language, selectedWord.word).then(function (json) {
                    var homonym = adapter.transform(json, selectedWord.word);

                    // Get matching suffixes from an inflection library
                    var wordData = _this.langData.getSuffixes(homonym);
                    wordData.word = selectedWord.word;
                    var definitions = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = homonym.lexemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var lexeme = _step.value;

                            definitions.push(lexeme.lemma.word + "': " + lexeme.meaning);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    wordData.definition = encodeURIComponent(definitions.join('\n'));

                    _this.sendMessageToTab(new __WEBPACK_IMPORTED_MODULE_3__lib_lib__["b" /* WordDataResponse */](wordData, __WEBPACK_IMPORTED_MODULE_3__lib_lib__["a" /* Message */].statuses.DATA_FOUND, message));
                }, function (error) {
                    // Word is not found in test data
                    _this.sendMessageToTab(new __WEBPACK_IMPORTED_MODULE_3__lib_lib__["b" /* WordDataResponse */](undefined, __WEBPACK_IMPORTED_MODULE_3__lib_lib__["a" /* Message */].statuses.NO_DATA_FOUND, message));
                });
            }
            // Should not send any response as it is not supported by webextensions polyfill and will probably be deprecated
            return false;
        }
    }, {
        key: "menuListener",
        value: function menuListener(info, tab) {
            if (info.menuItemId === this.settings.menuItemId) {
                this.loadContent();
            }
        }
    }, {
        key: "browserActionListener",
        value: function browserActionListener(tab) {
            this.loadContent();
        }
    }, {
        key: "stringify",
        value: function stringify(obj, replacer, spaces, cycleReplacer) {
            return JSON.stringify(obj, this.serializer(replacer, cycleReplacer), spaces);
        }
    }, {
        key: "serializer",
        value: function serializer(replacer, cycleReplacer) {
            var stack = [],
                keys = [];

            if (cycleReplacer == null) cycleReplacer = function cycleReplacer(key, value) {
                if (stack[0] === value) return "[Circular ~]";
                return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
            };

            return function (key, value) {
                if (stack.length > 0) {
                    var thisPos = stack.indexOf(this);
                    ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
                    ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
                    if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
                } else stack.push(value);

                return replacer == null ? value : replacer.call(this, key, value);
            };
        }
    }], [{
        key: "reportBrowserSupport",
        value: function reportBrowserSupport() {
            if (alpheiosExtSettings.noBrowserEnv) {
                console.log("No support for \"browser\" detected");
            } else {
                console.log("\"browser\" support has been detected");
            }
        }
    }, {
        key: "createMenuItem",
        value: function createMenuItem() {
            browser.contextMenus.create({
                id: alpheiosExtSettings.menuItemId,
                title: alpheiosExtSettings.menuItemText
            });
        }
    }]);

    return BackgroundProcess;
}();

var backgroundProcess = new BackgroundProcess(alpheiosExtSettings);

/*
browser.browserAction.onClicked.addListener((tab) => {
    // disable the active tab
    //browser.browserAction.disable(tab.id);
    console.log('Clicked 2');
});*/

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_factory_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_model_js__ = __webpack_require__(1);


class SourceSelection {

  constructor(target,default_language) {
    this.target = target;
    let target_lang;
    try {
      target_lang = this.getAttribute("lang") || this.getAttribute("xml:lang");
    } catch(e) {
      // if we don't have an element
      console.log("getAttribute not accessible on target");
    }
    if (! target_lang) {
      let closest_lang_element =target.closest("[lang]") || this.target.closest("[xml\\:lang]");
      if (closest_lang_element) {
        target_lang = closest_lang_element.getAttribute("lang") || closest_lang_element.getAttribute("xml:lang");
      }
    }
    if (! target_lang) {
      target_lang = default_language;
    }
    this.language = __WEBPACK_IMPORTED_MODULE_0__language_model_factory_js__["a" /* default */].getLanguageForCode(target_lang);
    this.initialize({word:null,normalized_word:null,start:0,end:0,context:null,position:0});
  }

  initialize(word_obj) {
    this.in_margin = this.selectionInMargin();
    if (this.in_margin) {
      this.word_selection = word_obj;
      return;
    }
    try {
      this.original_selection = this.target.ownerDocument.getSelection();
    } catch(e) {
      this.original_selection = null;
      console.log("No selection found in target owner document")
      return;
    }
    let separator = this.language.base_unit;
    switch(separator) {
      case __WEBPACK_IMPORTED_MODULE_1__language_model_js__["a" /* default */].UNIT_WORD:
          word_obj = this.doSpaceSeparatedWordSelection();
          break;
      case __WEBPACK_IMPORTED_MODULE_1__language_model_js__["a" /* default */].UNIT_CHAR:
          word_obj = this.doCharacterBasedWordSelection();
          break;
      default:
          throw new Error(`unknown base_unit ${separator.toString()}`)
    }
    this.word_selection = word_obj;
  }

  reset() {
    if (this.word_selection.word) {
      this.word_selection.reset();
    }
  }

  /**
   * Helper function to determine if the user's selection
   * is in the margin of the document
   * @private
   * @returns true if in the margin, false if not
   * @type Boolean
   */
  selectionInMargin()
  {
      // Sometimes mouseover a margin seems to set the range offset
      // greater than the string length, so check that condition,
      // as well as looking for whitepace at the offset with
      // only whitespace to the right or left of the offset
      // TODO - not sure if it's necessary anymore?
      //var inMargin =
       //   this.original_selection.anchorOffset >= this.original_selection.toString().length ||
      //    ( a_rngstr[a_ro].indexOf(" ") == 0 &&
      //          (a_rngstr.slice(0,a_ro).search(/\S/) == -1 ||
      //         a_rngstr.slice(a_ro+1,-1).search(/\S/) == -1)
      //    );
      return false;
  };

  /**
  * Helper method for {@link #findSelection} which
  * identifies target word and surrounding
  * context for languages whose words are
  * space-separated
  * @see #findSelection
  * @private
  */
  doSpaceSeparatedWordSelection() {
    let selection = this.original_selection;
    let anchor = selection.anchorNode;
    let focus = selection.focusNode;
    let anchor_text = anchor.data;
    let ro = selection.anchorOffset;
    // clean string:
    //   convert punctuation to spaces
    anchor_text = anchor_text.replace(new RegExp("[" + this.language.getPunctuation() + "]","g")," ");

    let new_ro = ro;
    while ((new_ro > 0) && (anchor_text[--new_ro] === ' '));
    if (new_ro > 0 && new_ro < ro) {
      // we backed up so position ourselves at the first whitespace before
      // the selected word
      // this is based upon the original Alpheios code before the SelectionAPI
      // was available. It's unclear if it's still needed but we'll keep it in
      // place, modified, for now
      ro = new_ro + 1;
    }

    // remove leading white space
    // find word
    let wordStart = anchor_text.lastIndexOf(" ", ro) + 1;
    let wordEnd = anchor_text.indexOf(" ", wordStart);

    if (wordEnd === -1) {
      wordEnd = anchor_text.length;
    }

    // if empty, nothing to do
    if (wordStart === wordEnd) {
      return {};
    }

    //extract word
    let word = anchor_text.substring(wordStart,wordEnd);

    /* Identify the words preceeding and following the focus word
    * TODO - query the type of node in the selection to see if we are
    * dealing with something other than text nodes
    * We also need to be able to pull surrounding context for text
    * nodes that are broken up by formatting tags (<br/> etc))
    */

    let context_str = null;
    let context_pos = 0;

    if (this.language.context_forward || this.language.context_backward) {
      let startstr = anchor_text.substring(0, wordEnd);
      let endstr = anchor_text.substring(wordEnd+1, anchor_text.length);
      let pre_wordlist = startstr.split(/\s+/);
      let post_wordlist = endstr.split(/\s+/);

      // limit to the requested # of context words
      // prior to the selected word
      // the selected word is the last item in the
      // pre_wordlist array
      if (pre_wordlist.length > this.language.context_backward + 1) {
          pre_wordlist = pre_wordlist.slice(pre_wordlist.length-(this.language.context_backward + 1));
      }
      // limit to the requested # of context words
      // following to the selected word
      if (post_wordlist.length > this.language.context_forward) {
          post_wordlist = post_wordlist.slice(0, this.language.context_forward);
      }

      /* TODO: should we put the punctuation back in to the
      * surrounding context? Might be necessary for syntax parsing.
      */
      context_str =
          pre_wordlist.join(" ") + " " + post_wordlist.join(" ");
      context_pos = pre_wordlist.length - 1;
    }

    let word_obj = { word: word,
        normalized_word: this.language.normalizeWord(word),
        start: wordStart,
        end: wordEnd,
        context: context_str,
        position: context_pos,
        reset: () => { selection.setBaseAndExtent(anchor, wordStart, focus, wordEnd); }
      };
    return word_obj;
  }

  /**
   * Helper method for {@link #findSelection} which identifies
   * target word and surrounding context for languages
   * whose words are character based
   * @see #findSelection
   * @private
   */
  doCharacterBasedWordSelection() {
    // TODO
  }

  toString() {
    return `language:${this.language} word: ${this.word_selection.normalized_word}`;
  }

}
/* unused harmony default export */ var _unused_webpack_default_export = (SourceSelection);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_model_js__ = __webpack_require__(1);


/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList {

    /**
     * Initializes a feature list.
     * @param {FeatureType[]} features - Features that build the list (optional, can be set later).
     */
    constructor(features = []) {
        this._features = [];
        this._types = {};
        this.add(features);
    }

    add(features) {
        if (!features || !Array.isArray(features)) {
            throw new Error('Features must be defined and must come in an array.');
        }

        for (let feature of features) {
            this._features.push(feature);
            this._types[feature.type] = feature;
        }
    }


    /**
     * Returns an array of grouping features.
     * @returns {FeatureType[]} - An array of grouping features.
     */
    get items() {
        return this._features;
    }

    forEach(callback) {
        this._features.forEach(callback);
    }

    /**
     * Returns a feature of a particular type. If such feature does not exist in a list, returns undefined.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
     */
    ofType(type) {
        if (this.hasType(type)) {
            return this._types[type];
        }
    }

    /**
     * Checks whether a feature list has a feature of a specific type.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {boolean} Whether a feature list has a feature of a particular type.
     */
    hasType(type) {
        return this._types.hasOwnProperty(type);
    }
}
/* unused harmony default export */ var _unused_webpack_default_export = (FeatureList);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FeatureImporter {
    constructor() {
        this.hash = {};
        return this;
    }

    /**
     * Sets mapping between external imported value and one or more library standard values. If an importedValue
     * is already in a hash table, old libraryValue will be overwritten with the new one.
     * @param {string} importedValue - External value
     * @param {Object | Object[] | string | string[]} libraryValue - Library standard value
     */
    map(importedValue, libraryValue) {
        if (!importedValue) {
            throw new Error('Imported value should not be empty.')
        }

        if (!libraryValue) {
            throw new Error('Library value should not be empty.')
        }

        this.hash[importedValue] = libraryValue;
        return this;
    }

    /**
     * Checks if value is in a map.
     * @param {string} importedValue - A value to test.
     * @returns {boolean} - Tru if value is in a map, false otherwise.
     */
    has(importedValue) {
        return this.hash.hasOwnProperty(importedValue);
    }

    /**
     * Returns one or more library standard values that match an external value
     * @param {string} importedValue - External value
     * @returns {Object | string} One or more of library standard values
     */
    get(importedValue) {
        if (this.has(importedValue)) {
            return this.hash[importedValue];
        }
        else {
            throw new Error('A value "' + importedValue + '" is not found in the importer.');
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (FeatureImporter);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lexeme_js__ = __webpack_require__(7);


class Homonym {
    /**
     * Initializes a Homonym object.
     * @param {Lexeme[]} lexemes - An array of Lexeme objects.
     * @param {string} form - the form which produces the homonyms
     */
    constructor (lexemes, form) {
        if (!lexemes) {
            throw new Error('Lexemes data should not be empty.');
        }

        if (!Array.isArray(lexemes)) {
            throw new Error('Lexeme data should be provided in an array.');
        }

        for (let lexeme of lexemes) {
            if (!(lexeme instanceof __WEBPACK_IMPORTED_MODULE_0__lexeme_js__["a" /* default */])) {
                throw new Error('All lexeme data should be of Lexeme object type.');
            }
        }

        this.lexemes = lexemes;
        this.targetWord = form;
    }

    static readObject(jsonObject) {
        let lexemes = [];
        if (jsonObject.lexemes) {
            for (let lexeme of jsonObject.lexemes) {
                lexemes.push(__WEBPACK_IMPORTED_MODULE_0__lexeme_js__["a" /* default */].readObject(lexeme));
            }
        }
        let homonym = new Homonym(lexemes);
        if (jsonObject.targetWord) {
            homonym.targetWord = jsonObject.targetWord;
        }
        return homonym;
    }

    /**
     * Returns language of a homonym.
     * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
     * and inflections within the same homonym will have the same language, and we can determine a language
     * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
     * @returns {string} A language code, as defined in the `languages` object.
     */
    get language() {
        if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.language) {
            return this.lexemes[0].lemma.language;
        }
        else {
            throw new Error('Homonym has not been initialized properly. Unable to obtain language information.');
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Homonym);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_alpheios_morph_client__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_lang_data_test_data__ = __webpack_require__(20);





class TuftsAdapter extends __WEBPACK_IMPORTED_MODULE_0_alpheios_morph_client__["a" /* default */] {
  constructor ({engine = null, url = null}) {
    super()
    let latinCode = __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin__["a" /* default */].language.toCode()
    this[latinCode] = __WEBPACK_IMPORTED_MODULE_1__lib_lang_latin__["a" /* default */]
      // this[Lib.languages.greek] = TuftsGreekData;
      // this.langMap = new Map([['lat', TuftsLatinData]]);
      // this.langMap = new Lib.Importer().map('lat', Lib.languages.latin).map('grc', Lib.languages.greek);
    this.langMap = new __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["b" /* FeatureImporter */]().map('lat', latinCode)
    this.engineLookup = engine
    this.url = url
    return this
  }

  prepareRequestUrl (lang, word) {
    let engine = this.engineLookup[lang]
    let url = this.url.replace('r_WORD', word).replace('r_ENGINE', engine).replace('r_LANG', lang)
    return url
  }

  fetchTestData (lang, word) {
    return new Promise((resolve, reject) => {
      try {
        let wordData = new __WEBPACK_IMPORTED_MODULE_3__lib_lang_data_test_data__["a" /* default */]().get(word)
        console.log(wordData)
        let json = JSON.parse(wordData)
        resolve(json)
      } catch (error) {
                // Word is not found in test data
        reject(error)
      }
    })
  }

  /**
   * A function that maps a morphological service's specific data types and values into an inflection library standard.
   * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
   * @param {object} targetWord - the target of the analysis
   * @returns {Homonym} A library standard Homonym object.
   */
  transform (jsonObj, targetWord) {
    'use strict'
    let lexemes = []
    let annotationBody = jsonObj.RDF.Annotation.Body
    if (!Array.isArray(annotationBody)) {
            /*
            If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
            Let's convert it to an array so we can work with it in the same way no matter what format it is.
             */
      annotationBody = [annotationBody]
    }
    for (let lexeme of annotationBody) {
            // Get importer based on the language
      let language = this.langMap.get(lexeme.rest.entry.dict.hdwd.lang)
      let lemma = new __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["g" /* Lemma */](lexeme.rest.entry.dict.hdwd.$, language)
      let meaning = lexeme.rest.entry.mean ? lexeme.rest.entry.mean.$ : ''

      let inflections = []
      let inflectionsJSON = lexeme.rest.entry.infl
      if (!Array.isArray(inflectionsJSON)) {
                // If only one inflection returned, it is a single object, not an array of objects. Convert it to an array for uniformity.
        inflectionsJSON = [inflectionsJSON]
      }
      for (let inflectionJSON of inflectionsJSON) {
        let inflection = new __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["e" /* Inflection */](inflectionJSON.term.stem.$, this[language].language.toCode())
        if (inflectionJSON.term.suff) {
                    // Set suffix if provided by a morphological analyzer
          inflection.suffix = inflectionJSON.term.suff.$
        }

                // Parse whatever grammatical features we're interested in
        if (inflectionJSON.pofs) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.part].get(inflectionJSON.pofs.$)
        }

        if (inflectionJSON.case) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.grmCase].get(inflectionJSON.case.$)
        }

        if (inflectionJSON.decl) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.declension].get(inflectionJSON.decl.$)
        }

        if (inflectionJSON.num) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.number].get(inflectionJSON.num.$)
        }

        if (inflectionJSON.gend) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.gender].get(inflectionJSON.gend.$)
        }

        if (inflectionJSON.conj) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.conjugation].get(inflectionJSON.conj.$)
        }

        if (inflectionJSON.tense) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.tense].get(inflectionJSON.tense.$)
        }

        if (inflectionJSON.voice) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.voice].get(inflectionJSON.voice.$)
        }

        if (inflectionJSON.mood) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.mood].get(inflectionJSON.mood.$)
        }

        if (inflectionJSON.pers) {
          inflection.feature = this[language][__WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["a" /* Feature */].types.person].get(inflectionJSON.pers.$)
        }

        inflections.push(inflection)
      }
      lexemes.push(new __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["h" /* Lexeme */](lemma, inflections, meaning))
    }
    return new __WEBPACK_IMPORTED_MODULE_2_alpheios_data_models__["d" /* Homonym */](lexemes, targetWord)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TuftsAdapter);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Base Adapter Class for a Morphology Service Client
 */
class BaseAdapter {
  /**
   * Method which is used to prepare a lookup request according
   * to the adapter specific logic
   * @param {string} lang - the language code
   * @param {string} word - the word to lookup
   * @returns {string} the url for the request
   */
  prepareRequestUrl (lang, word) {
      /** must be overridden in the adapter implementation class **/
    return null
  }

  /**
   * Fetch response from a remote URL
   * @param {string} lang - the language code
   * @param {string} word - the word to lookup
   * @returns {Promise} a promse which if successful resolves to json response object
   *                    with the results of the analysis
   */
  fetch (lang, word) {
    let url = this.prepareRequestUrl(lang, word)
    return new Promise((resolve, reject) => {
      window.fetch(url).then(
          function (response) {
            let json = response.json()
            resolve(json)
          }
        ).catch((error) => {
          reject(error)
        }
        )
    })
  }

  /**
   * Fetch test data to test the adapter
   * @param {string} lang - the language code
   * @param {string} word - the word to lookup
   * @returns {Promise} a promse which if successful resolves to json response object
   *                    with the test data
   */
  fetchTestData (lang, word) {
    return new Promise((resolve, reject) => {
      try {
        let data = {}
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * A function that maps a morphological service's specific data types and values into an inflection library standard.
   * @param {object} jsonObj - A JSON data from the fetch request
   * @param {object} targetWord - the original target word of the analysis
   * @returns {Homonym} A library standard Homonym object.
   */
  transform (jsonObj, targetWord) {
    return {}
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseAdapter);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__ = __webpack_require__(0);



let data = new __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["f" /* LatinLanguageModel */]())
let types = __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.part).importer
    .map('noun', data.language.features[types.part].noun)
    .map('adjective', data.language.features[types.part].adjective)
    .map('verb', data.language.features[types.part].verb)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.grmCase).importer
    .map('nominative', data.language.features[types.grmCase].nominative)
    .map('genitive', data.language.features[types.grmCase].genitive)
    .map('dative', data.language.features[types.grmCase].dative)
    .map('accusative', data.language.features[types.grmCase].accusative)
    .map('ablative', data.language.features[types.grmCase].ablative)
    .map('locative', data.language.features[types.grmCase].locative)
    .map('vocative', data.language.features[types.grmCase].vocative)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.declension).importer
    .map('1st', data.language.features[types.declension].first)
    .map('2nd', data.language.features[types.declension].second)
    .map('3rd', data.language.features[types.declension].third)
    .map('4th', data.language.features[types.declension].fourth)
    .map('5th', data.language.features[types.declension].fifth)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.number).importer
    .map('singular', data.language.features[types.number].singular)
    .map('plural', data.language.features[types.number].plural)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.gender).importer
    .map('masculine', data.language.features[types.gender].masculine)
    .map('feminine', data.language.features[types.gender].feminine)
    .map('neuter', data.language.features[types.gender].neuter)
    .map('common', [data.language.features[types.gender].masculine, data.language.features[types.gender].feminine])
    .map('all', [data.language.features[types.gender].masculine, data.language.features[types.gender].feminine, data.language.features[types.gender].neuter])

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.conjugation).importer
    .map('1st', data.language.features[types.conjugation].first)
    .map('2nd', data.language.features[types.conjugation].second)
    .map('3rd', data.language.features[types.conjugation].third)
    .map('4th', data.language.features[types.conjugation].fourth)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.tense).importer
    .map('present', data.language.features[types.tense].present)
    .map('imperfect', data.language.features[types.tense].imperfect)
    .map('future', data.language.features[types.tense].future)
    .map('perfect', data.language.features[types.tense].perfect)
    .map('pluperfect', data.language.features[types.tense].pluperfect)
    .map('future_perfect', data.language.features[types.tense]['future perfect'])

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.voice).importer
    .map('active', data.language.features[types.voice].active)
    .map('passive', data.language.features[types.voice].passive)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.mood).importer
    .map('indicative', data.language.features[types.mood].indicative)
    .map('subjunctive', data.language.features[types.mood].subjunctive)

data.addFeature(__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.person).importer
    .map('1st', data.language.features[types.person].first)
    .map('2nd', data.language.features[types.person].second)
    .map('3rd', data.language.features[types.person].third)

/* harmony default export */ __webpack_exports__["a"] = (data);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__ = __webpack_require__(0);
/*
Objects of a morphology analyzer's library
 */


/**
 * Holds all information required to transform from morphological analyzer's grammatical feature values to the
 * library standards. There is one ImportData object per language.
 */
class ImportData {
    /**
     * Creates an InmportData object for the language provided.
     * @param {Models.LanguageModel} language - A language of the import data.
     */
  constructor (language) {
    'use strict'
    this.language = language
  }

    /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
  addFeature (featureName) {
    this[featureName] = {}
    let language = this.language

    this[featureName].add = function add (providerValue, alpheiosValue) {
      'use strict'
      this[providerValue] = alpheiosValue
      return this
    }

    this[featureName].get = function get (providerValue) {
      'use strict'
      if (!this.importer.has(providerValue)) {
        throw new Error("Skipping an unknown value '" +
                    providerValue + "' of a grammatical feature '" + featureName + "' of " + language + ' language.')
      } else {
        return this.importer.get(providerValue)
      }
    }

    this[featureName].importer = new __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["b" /* FeatureImporter */]()

    return this[featureName]
  }
}
/* harmony default export */ __webpack_exports__["a"] = (ImportData);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json__);





class WordTestData {
  constructor () {
    this._words = {
      'cupidinibus': __WEBPACK_IMPORTED_MODULE_0__latin_noun_cupidinibus_json___default.a,
      'mare': __WEBPACK_IMPORTED_MODULE_1__latin_noun_adj_mare_json___default.a,
      'cepit': __WEBPACK_IMPORTED_MODULE_2__latin_verb_cepit_json___default.a,
      'φιλόσοφος': __WEBPACK_IMPORTED_MODULE_3__greek_noun_pilsopo_json___default.a
    }
  }

  get (word) {
    if (this._words.hasOwnProperty(word)) {
      return this._words[word]
    }
    throw new Error(`Word "${word}" does not exist in test data`)
  }
}
/* harmony default export */ __webpack_exports__["a"] = (WordTestData);


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:cupidinibus:whitakerLat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"net.alpheios:tools:wordsxml.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-08-10T23:15:29.185581\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:cupidinibus\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": [\n        {\n          \"resource\": \"urn:uuid:idm140578094883136\"\n        },\n        {\n          \"resource\": \"urn:uuid:idm140578158026160\"\n        }\n      ],\n      \"Body\": [\n        {\n          \"about\": \"urn:uuid:idm140578094883136\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 2,\n                    \"$\": \"locative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 5,\n                    \"$\": \"dative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  }\n                }\n              ],\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"Cupido, Cupidinis\"\n                },\n                \"pofs\": {\n                  \"order\": 5,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                },\n                \"gend\": {\n                  \"$\": \"masculine\"\n                },\n                \"area\": {\n                  \"$\": \"religion\"\n                },\n                \"freq\": {\n                  \"order\": 4,\n                  \"$\": \"common\"\n                },\n                \"src\": {\n                  \"$\": \"Ox.Lat.Dict.\"\n                }\n              },\n              \"mean\": {\n                \"$\": \"Cupid, son of Venus; personification of carnal desire;\"\n              }\n            }\n          }\n        },\n        {\n          \"about\": \"urn:uuid:idm140578158026160\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 2,\n                    \"$\": \"locative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"common\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 5,\n                    \"$\": \"dative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"common\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"common\"\n                  }\n                }\n              ],\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"cupido, cupidinis\"\n                },\n                \"pofs\": {\n                  \"order\": 5,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                },\n                \"gend\": {\n                  \"$\": \"common\"\n                },\n                \"freq\": {\n                  \"order\": 5,\n                  \"$\": \"frequent\"\n                },\n                \"src\": {\n                  \"$\": \"Ox.Lat.Dict.\"\n                }\n              },\n              \"mean\": {\n                \"$\": \"desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;\"\n              }\n            }\n          }\n        }\n      ]\n    }\n  }\n}\n"

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:mare:morpheuslat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"org.perseus:tools:morpheus.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-09-08T06:59:48.639180\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:mare\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": [\n        {\n          \"resource\": \"urn:uuid:idm140446402389888\"\n        },\n        {\n          \"resource\": \"urn:uuid:idm140446402332400\"\n        },\n        {\n          \"resource\": \"urn:uuid:idm140446402303648\"\n        }\n      ],\n      \"Body\": [\n        {\n          \"about\": \"urn:uuid:idm140446402389888\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34070.1\",\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"mare\"\n                },\n                \"pofs\": {\n                  \"order\": 3,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                },\n                \"gend\": {\n                  \"$\": \"neuter\"\n                }\n              },\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 7,\n                    \"$\": \"nominative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 1,\n                    \"$\": \"vocative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 4,\n                    \"$\": \"accusative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                }\n              ]\n            }\n          }\n        },\n        {\n          \"about\": \"urn:uuid:idm140446402332400\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34118.1\",\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"marum\"\n                },\n                \"pofs\": {\n                  \"order\": 3,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"2nd\"\n                },\n                \"gend\": {\n                  \"$\": \"neuter\"\n                }\n              },\n              \"infl\": {\n                \"term\": {\n                  \"lang\": \"lat\",\n                  \"stem\": {\n                    \"$\": \"mar\"\n                  },\n                  \"suff\": {\n                    \"$\": \"e\"\n                  }\n                },\n                \"pofs\": {\n                  \"order\": 3,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"2nd\"\n                },\n                \"case\": {\n                  \"order\": 1,\n                  \"$\": \"vocative\"\n                },\n                \"gend\": {\n                  \"$\": \"neuter\"\n                },\n                \"num\": {\n                  \"$\": \"singular\"\n                },\n                \"stemtype\": {\n                  \"$\": \"us_i\"\n                }\n              }\n            }\n          }\n        },\n        {\n          \"about\": \"urn:uuid:idm140446402303648\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34119.1\",\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"mas\"\n                },\n                \"pofs\": {\n                  \"order\": 2,\n                  \"$\": \"adjective\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                }\n              },\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mare\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 2,\n                    \"$\": \"adjective\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"irreg_adj3\"\n                  },\n                  \"morph\": {\n                    \"$\": \"indeclform\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mare\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 2,\n                    \"$\": \"adjective\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"feminine\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"irreg_adj3\"\n                  },\n                  \"morph\": {\n                    \"$\": \"indeclform\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mare\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 2,\n                    \"$\": \"adjective\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"irreg_adj3\"\n                  },\n                  \"morph\": {\n                    \"$\": \"indeclform\"\n                  }\n                }\n              ]\n            }\n          }\n        }\n      ]\n    }\n  }\n}"

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:cepit:whitakerLat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"net.alpheios:tools:wordsxml.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-08-10T23:16:53.672068\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:cepit\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": {\n        \"resource\": \"urn:uuid:idm140578133848416\"\n      },\n      \"Body\": {\n        \"about\": \"urn:uuid:idm140578133848416\",\n        \"type\": {\n          \"resource\": \"cnt:ContentAsXML\"\n        },\n        \"rest\": {\n          \"entry\": {\n            \"infl\": {\n              \"term\": {\n                \"lang\": \"lat\",\n                \"stem\": {\n                  \"$\": \"cep\"\n                },\n                \"suff\": {\n                  \"$\": \"it\"\n                }\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"verb\"\n              },\n              \"conj\": {\n                \"$\": \"3rd\"\n              },\n              \"var\": {\n                \"$\": \"1st\"\n              },\n              \"tense\": {\n                \"$\": \"perfect\"\n              },\n              \"voice\": {\n                \"$\": \"active\"\n              },\n              \"mood\": {\n                \"$\": \"indicative\"\n              },\n              \"pers\": {\n                \"$\": \"3rd\"\n              },\n              \"num\": {\n                \"$\": \"singular\"\n              }\n            },\n            \"dict\": {\n              \"hdwd\": {\n                \"lang\": \"lat\",\n                \"$\": \"capio, capere, cepi, captus\"\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"verb\"\n              },\n              \"conj\": {\n                \"$\": \"3rd\"\n              },\n              \"kind\": {\n                \"$\": \"transitive\"\n              },\n              \"freq\": {\n                \"order\": 6,\n                \"$\": \"very frequent\"\n              },\n              \"src\": {\n                \"$\": \"Ox.Lat.Dict.\"\n              }\n            },\n            \"mean\": {\n              \"$\": \"take hold, seize; grasp; take bribe; arrest/capture; put on; occupy; captivate;\"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:φιλόσοφος:morpheuslat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"org.perseus:tools:morpheus.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-10-15T14:06:40.522369\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:φιλόσοφος\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": {\n        \"resource\": \"urn:uuid:idm140446394225264\"\n      },\n      \"Body\": {\n        \"about\": \"urn:uuid:idm140446394225264\",\n        \"type\": {\n          \"resource\": \"cnt:ContentAsXML\"\n        },\n        \"rest\": {\n          \"entry\": {\n            \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:grclexent.lex78378.1\",\n            \"dict\": {\n              \"hdwd\": {\n                \"lang\": \"grc\",\n                \"$\": \"φιλόσοφος\"\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"noun\"\n              },\n              \"decl\": {\n                \"$\": \"2nd\"\n              },\n              \"gend\": {\n                \"$\": \"masculine\"\n              }\n            },\n            \"infl\": {\n              \"term\": {\n                \"lang\": \"grc\",\n                \"stem\": {\n                  \"$\": \"φιλοσοφ\"\n                },\n                \"suff\": {\n                  \"$\": \"ος\"\n                }\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"noun\"\n              },\n              \"decl\": {\n                \"$\": \"2nd\"\n              },\n              \"case\": {\n                \"order\": 7,\n                \"$\": \"nominative\"\n              },\n              \"gend\": {\n                \"$\": \"masculine\"\n              },\n              \"num\": {\n                \"$\": \"singular\"\n              },\n              \"stemtype\": {\n                \"$\": \"os_ou\"\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* unused harmony export WordDataRequest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WordDataResponse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_lib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid_v1__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid_v1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid_v1__);





class Message {
    constructor(message) {
        this.type = Message.types.GENERIC_MESSAGE;
        this.status = undefined;
        this.ID = __WEBPACK_IMPORTED_MODULE_1_uuid_v1___default()();
        this.body = message;
    }

    static get types() {
        return {
            GENERIC_MESSAGE: 'GenericMessage',
            WORD_DATA_REQUEST: 'WordDataRequest',
            WORD_DATA_RESPONSE: 'WordDataResponse'
        };
    }

    static get statuses() {
        return {
            DATA_FOUND: 'DataFound', // Requested word's data has been found
            NO_DATA_FOUND: 'NoDataFound' // Requested word's data has not been found
        };
    }
 }

class WordDataRequest extends Message {
    constructor(language, word) {
        super();
        this.type = Message.types.WORD_DATA_REQUEST;
        this.body = { language: language, word: word };
    }
}


class WordDataResponse extends Message {
    constructor(wordData, status, request) {
        super();
        this.type = Message.types.WORD_DATA_RESPONSE;
        this.status = status;
        this.ID = request.ID; // To match request and response
        this.body = wordData;
    }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(27);
var bytesToUuid = __webpack_require__(29);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export language */
/* unused harmony export languageModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dataSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_adjective_suffixes_csv__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_adjective_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__data_adjective_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_adjective_footnotes_csv__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_adjective_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__data_adjective_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_verb_suffixes_csv__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_verb_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__data_verb_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_verb_footnotes_csv__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_verb_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__data_verb_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_papaparse__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_papaparse__);
/*
 * Latin language data module
 */











let languageModel = new __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["f" /* LatinLanguageModel */]();
let types = __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["a" /* Feature */].types;
// A language of this module
const language = __WEBPACK_IMPORTED_MODULE_1__lib_js__["e" /* languages */].latin;
// Create a language data set that will keep all language-related information
let dataSet = new __WEBPACK_IMPORTED_MODULE_1__lib_js__["c" /* LanguageDataset */](language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
languageModel.features[types.number].addImporter(importerName)
    .map('singular',  languageModel.features[types.number].singular)
    .map('plural', languageModel.features[types.number].plural);
languageModel.features[types.grmCase].addImporter(importerName)
    .map('nominative', languageModel.features[types.grmCase].nominative)
    .map('genitive', languageModel.features[types.grmCase].genitive)
    .map('dative', languageModel.features[types.grmCase].dative)
    .map('accusative', languageModel.features[types.grmCase].accusative)
    .map('ablative', languageModel.features[types.grmCase].ablative)
    .map('locative', languageModel.features[types.grmCase].locative)
    .map('vocative', languageModel.features[types.grmCase].vocative);
languageModel.features[types.declension].addImporter(importerName)
    .map('1st', languageModel.features[types.declension].first)
    .map('2nd', languageModel.features[types.declension].second)
    .map('1st 2nd', [languageModel.features[types.declension].first, languageModel.features[types.declension].second])
    .map('3rd', languageModel.features[types.declension].third)
    .map('4th', languageModel.features[types.declension].fourth)
    .map('5th', languageModel.features[types.declension].fifth);
languageModel.features[types.gender].addImporter(importerName)
    .map('masculine', languageModel.features[types.gender].masculine)
    .map('feminine', languageModel.features[types.gender].feminine)
    .map('neuter', languageModel.features[types.gender].neuter)
    .map('masculine feminine', [languageModel.features[types.gender].masculine, languageModel.features[types.gender].feminine]);
languageModel.features[types.type].addImporter(importerName)
    .map('regular', languageModel.features[types.type].regular)
    .map('irregular', languageModel.features[types.type].irregular);
languageModel.features[types.conjugation].addImporter(importerName)
    .map('1st', languageModel.features[types.conjugation].first)
    .map('2nd', languageModel.features[types.conjugation].second)
    .map('3rd', languageModel.features[types.conjugation].third)
    .map('4th', languageModel.features[types.conjugation].fourth);
languageModel.features[types.tense].addImporter(importerName)
    .map('present', languageModel.features[types.tense].present)
    .map('imperfect', languageModel.features[types.tense].imperfect)
    .map('future', languageModel.features[types.tense].future)
    .map('perfect', languageModel.features[types.tense].perfect)
    .map('pluperfect', languageModel.features[types.tense].pluperfect)
    .map('future_perfect', languageModel.features[types.tense]['future perfect']);
languageModel.features[types.voice].addImporter(importerName)
    .map('passive', languageModel.features[types.voice].passive)
    .map('active', languageModel.features[types.voice].active);
languageModel.features[types.mood].addImporter(importerName)
    .map('indicative', languageModel.features[types.mood].indicative)
    .map('subjunctive', languageModel.features[types.mood].subjunctive);
languageModel.features[types.person].addImporter(importerName)
    .map('1st', languageModel.features[types.person].first)
    .map('2nd', languageModel.features[types.person].second)
    .map('3rd', languageModel.features[types.person].third);
const footnotes = new __WEBPACK_IMPORTED_MODULE_0_alpheios_data_models__["c" /* FeatureType */](types.footnote, [], language);

// endregion definition of grammatical features

// for noun and adjectives
dataSet.addSuffixes = function(partofspeech, data) {
    // some suffix values will mean a lack of suffix, they will be mapped to a null
    let nosuffixvalue = '-';

    // first row are headers
    for (let i = 1; i < data.length; i++) {
        let suffix = data[i][0];
        // handle special suffix values
        if (suffix === nosuffixvalue) {
            suffix = null;
        }

        let features = [partofspeech,
            languageModel.features[types.number].importer.csv.get(data[i][1]),
            languageModel.features[types.grmCase].importer.csv.get(data[i][2]),
            languageModel.features[types.declension].importer.csv.get(data[i][3]),
            languageModel.features[types.gender].importer.csv.get(data[i][4]),
            languageModel.features[types.type].importer.csv.get(data[i][5])];
        if (data[i][6]) {
            // there can be multiple footnote indexes separated by spaces
            let indexes = data[i][6].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

// for verbs
dataSet.addVerbSuffixes = function(partofspeech, data) {
    // some suffix values will mean a lack of suffix, they will be mapped to a null
    let nosuffixvalue = '-';

    // first row are headers
    for (let i = 1; i < data.length; i++) {
        let suffix = data[i][0];
        // handle special suffix values
        if (suffix === nosuffixvalue) {
            suffix = null;
        }

        let features = [partofspeech,
            languageModel.features[types.conjugation].importer.csv.get(data[i][1]),
            languageModel.features[types.voice].importer.csv.get(data[i][2]),
            languageModel.features[types.mood].importer.csv.get(data[i][3]),
            languageModel.features[types.tense].importer.csv.get(data[i][4]),
            languageModel.features[types.number].importer.csv.get(data[i][5]),
            languageModel.features[types.person].importer.csv.get(data[i][6])];

        let grammartype = data[i][7];
        // type information can be empty if no ending is provided
        if (grammartype) {
            features.push(languageModel.features[types.type].importer.csv.get(grammartype));
        }
        // footnotes
        if (data[i][8]) {
            // there can be multiple footnote indexes separated by spaces
            let indexes = data[i][8].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

dataSet.addFootnotes = function(partofspeech, data) {
    // first row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(partofspeech, data[i][0], data[i][1]);
    }
};

dataSet.loadData = function() {
    // nouns
    let partofspeech = languageModel.features[types.part].noun;
    let suffixes = __WEBPACK_IMPORTED_MODULE_8_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv___default.a, {});
    this.addSuffixes(partofspeech, suffixes.data);
    let footnotes = __WEBPACK_IMPORTED_MODULE_8_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv___default.a, {});
    this.addFootnotes(partofspeech, footnotes.data);

    // adjectives
    partofspeech = languageModel.features[types.part].adjective;
    suffixes = __WEBPACK_IMPORTED_MODULE_8_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_4__data_adjective_suffixes_csv___default.a, {});
    this.addSuffixes(partofspeech, suffixes.data);
    footnotes = __WEBPACK_IMPORTED_MODULE_8_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_5__data_adjective_footnotes_csv___default.a, {});
    this.addFootnotes(partofspeech, footnotes.data);

    // verbs
    partofspeech = languageModel.features[types.part].verb;
    suffixes = __WEBPACK_IMPORTED_MODULE_8_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_6__data_verb_suffixes_csv___default.a, {});
    this.addVerbSuffixes(partofspeech, suffixes.data);
    footnotes = __WEBPACK_IMPORTED_MODULE_8_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_7__data_verb_footnotes_csv___default.a, {});
    this.addFootnotes(partofspeech, footnotes.data);
};


/**
 * decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {inflection[]} inflections - an array of inflection objects to be matched against a suffix.
 * @param {suffix} suffix - a suffix to be matched with inflections.
 * @returns {suffix | null} if a match is found, returns a suffix object modified with some
 * additional information about a match. if no matches found, returns null.
 */
dataSet.matcher = function(inflections, suffix) {
    "use strict";
    // all of those features must match between an inflection and an ending
    let obligatoryMatches = [types.part];

    // any of those features must match between an inflection and an ending
    let optionalMatches = [types.grmcase, types.declension, types.gender, types.number];
    let bestMatchData = null; // information about the best match we would be able to find

    /*
     there can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     but there could be multiple partial matches. so we should try to find the best match possible and return it.
     a fullfeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchData = new __WEBPACK_IMPORTED_MODULE_1__lib_js__["d" /* MatchData */](); // Create a match profile

        if (inflection.suffix === suffix.value) {
           matchData.suffixMatch = true;
        }

        // Check obligatory matches
        for (let feature of  obligatoryMatches) {
            let featureMatch = suffix.featureMatch(feature, inflection[feature]);
            //matchFound = matchFound && featureMatch;

            if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
                break;
            }
            // Inflection's value of this feature is matching the one of the suffix
            matchData.matchedFeatures.push(feature);
        }

        if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
            break;
        }

        // Check optional matches now
        for (let feature of optionalMatches) {
            let matchedValue = suffix.featureMatch(feature, inflection[feature]);
            if (matchedValue) {
                matchData.matchedFeatures.push(feature);
            }
        }

        if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
            // This is a full match
            matchData.fullMatch = true;

            // There can be only one full match, no need to search any further
            suffix.match = matchData;
            return suffix;
        }
        bestMatchData = this.bestMatch(bestMatchData, matchData);
    }
    if (bestMatchData) {
        // There is some match found
        suffix.match = bestMatchData;
        return suffix;
    }
    return null;
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function(matchA, matchB) {
    // If one of the arguments is not set, return the other one
    if (!matchA && matchB) {
        return matchB;
    }

    if (!matchB && matchA) {
        return matchA;
    }

    // Suffix match has a priority
    if (matchA.suffixMatch !== matchB.suffixMatch) {
        if (matchA.suffixMatch > matchB.suffixMatch) {
            return matchA;
        }
        else {
            return matchB;
        }
    }

    // If same on suffix matche, compare by how many features matched
    if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
        // Arbitrarily return matchA if matches are the same
        return matchA;
    }
    else {
        return matchB;
    }
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = "Ending,Number,Case,Declension,Gender,Type,Footnote\na,singular,nominative,1st,feminine,regular,\nē,singular,nominative,1st,feminine,irregular,\nēs,singular,nominative,1st,feminine,irregular,\nā,singular,nominative,1st,feminine,irregular,7\nus,singular,nominative,2nd,masculine feminine,regular,\ner,singular,nominative,2nd,masculine feminine,regular,\nir,singular,nominative,2nd,masculine feminine,regular,\n-,singular,nominative,2nd,masculine feminine,irregular,\nos,singular,nominative,2nd,masculine feminine,irregular,1\nōs,singular,nominative,2nd,masculine feminine,irregular,\nō,singular,nominative,2nd,masculine feminine,irregular,7\num,singular,nominative,2nd,neuter,regular,\nus,singular,nominative,2nd,neuter,irregular,10\non,singular,nominative,2nd,neuter,irregular,7\n-,singular,nominative,3rd,masculine feminine,regular,\nos,singular,nominative,3rd,masculine feminine,irregular,\nōn,singular,nominative,3rd,masculine feminine,irregular,7\n-,singular,nominative,3rd,neuter,regular,\nus,singular,nominative,4th,masculine feminine,regular,\nū,singular,nominative,4th,neuter,regular,\nēs,singular,nominative,5th,feminine,regular,\nae,singular,genitive,1st,feminine,regular,\nāī,singular,genitive,1st,feminine,irregular,1\nās,singular,genitive,1st,feminine,irregular,2\nēs,singular,genitive,1st,feminine,irregular,7\nī,singular,genitive,2nd,masculine feminine,regular,\nō,singular,genitive,2nd,masculine feminine,irregular,7\nī,singular,genitive,2nd,neuter,regular,\nis,singular,genitive,3rd,masculine feminine,regular,\nis,singular,genitive,3rd,neuter,regular,\nūs,singular,genitive,4th,masculine feminine,regular,\nuis,singular,genitive,4th,masculine feminine,irregular,1\nuos,singular,genitive,4th,masculine feminine,irregular,1\nī,singular,genitive,4th,masculine feminine,irregular,15\nūs,singular,genitive,4th,neuter,regular,\nēī,singular,genitive,5th,feminine,regular,\neī,singular,genitive,5th,feminine,regular,\nī,singular,genitive,5th,feminine,irregular,\nē,singular,genitive,5th,feminine,irregular,\nēs,singular,genitive,5th,feminine,irregular,6\nae,singular,dative,1st,feminine,regular,\nāī,singular,dative,1st,feminine,irregular,1\nō,singular,dative,2nd,masculine feminine,regular,\nō,singular,dative,2nd,neuter,regular,\nī,singular,dative,3rd,masculine feminine,regular,\ne,singular,dative,3rd,masculine feminine,irregular,17\nī,singular,dative,3rd,neuter,regular,\nūī,singular,dative,4th,masculine feminine,regular,\nū,singular,dative,4th,masculine feminine,regular,\nū,singular,dative,4th,neuter,regular,\nēī,singular,dative,5th,feminine,regular,\neī,singular,dative,5th,feminine,regular,\nī,singular,dative,5th,feminine,irregular,\nē,singular,dative,5th,feminine,irregular,6\nam,singular,accusative,1st,feminine,regular,\nēn,singular,accusative,1st,feminine,irregular,\nān,singular,accusative,1st,feminine,irregular,7\num,singular,accusative,2nd,masculine feminine,regular,\nom,singular,accusative,2nd,masculine feminine,irregular,1\nōn,singular,accusative,2nd,masculine feminine,irregular,7\num,singular,accusative,2nd,neuter,regular,\nus,singular,accusative,2nd,neuter,irregular,10\non,singular,accusative,2nd,neuter,irregular,7\nem,singular,accusative,3rd,masculine feminine,regular,\nim,singular,accusative,3rd,masculine feminine,irregular,11\na,singular,accusative,3rd,masculine feminine,irregular,7\n-,singular,accusative,3rd,neuter,regular,\num,singular,accusative,4th,masculine feminine,regular,\nū,singular,accusative,4th,neuter,regular,\nem,singular,accusative,5th,feminine,regular,\nā,singular,ablative,1st,feminine,regular,\nād,singular,ablative,1st,feminine,irregular,5\nē,singular,ablative,1st,feminine,irregular,7\nō,singular,ablative,2nd,masculine feminine,regular,\nōd,singular,ablative,2nd,masculine feminine,irregular,1\nō,singular,ablative,2nd,neuter,regular,\ne,singular,ablative,3rd,masculine feminine,regular,\nī,singular,ablative,3rd,masculine feminine,irregular,11\ne,singular,ablative,3rd,neuter,regular,\nī,singular,ablative,3rd,neuter,irregular,11\nū,singular,ablative,4th,masculine feminine,regular,\nūd,singular,ablative,4th,masculine feminine,irregular,1\nū,singular,ablative,4th,neuter,regular,\nē,singular,ablative,5th,feminine,regular,\nae,singular,locative,1st,feminine,regular,\nō,singular,locative,2nd,masculine feminine,regular,\nō,singular,locative,2nd,neuter,regular,\ne,singular,locative,3rd,masculine feminine,regular,\nī,singular,locative,3rd,masculine feminine,regular,\nī,singular,locative,3rd,neuter,regular,\nū,singular,locative,4th,masculine feminine,regular,\nū,singular,locative,4th,neuter,regular,\nē,singular,locative,5th,feminine,regular,\na,singular,vocative,1st,feminine,regular,\nē,singular,vocative,1st,feminine,irregular,\nā,singular,vocative,1st,feminine,irregular,7\ne,singular,vocative,2nd,masculine feminine,regular,\ner,singular,vocative,2nd,masculine feminine,regular,\nir,singular,vocative,2nd,masculine feminine,regular,\n-,singular,vocative,2nd,masculine feminine,irregular,\nī,singular,vocative,2nd,masculine feminine,irregular,8\nōs,singular,vocative,2nd,masculine feminine,irregular,\ne,singular,vocative,2nd,masculine feminine,irregular,7\num,singular,vocative,2nd,neuter,regular,\non,singular,vocative,2nd,neuter,irregular,7\n-,singular,vocative,3rd,masculine feminine,regular,\n-,singular,vocative,3rd,neuter,regular,\nus,singular,vocative,4th,masculine feminine,regular,\nū,singular,vocative,4th,neuter,regular,\nēs,singular,vocative,5th,feminine,regular,\nae,plural,nominative,1st,feminine,regular,\nī,plural,nominative,2nd,masculine feminine,regular,\noe,plural,nominative,2nd,masculine feminine,irregular,7 9\na,plural,nominative,2nd,neuter,regular,\nēs,plural,nominative,3rd,masculine feminine,regular,\nes,plural,nominative,3rd,masculine feminine,irregular,7\na,plural,nominative,3rd,neuter,regular,\nia,plural,nominative,3rd,neuter,irregular,11\nūs,plural,nominative,4th,masculine feminine,regular,\nua,plural,nominative,4th,neuter,regular,\nēs,plural,nominative,5th,feminine,regular,\nārum,plural,genitive,1st,feminine,regular,\num,plural,genitive,1st,feminine,irregular,3\nōrum,plural,genitive,2nd,masculine feminine,regular,\num,plural,genitive,2nd,masculine feminine,irregular,\nom,plural,genitive,2nd,masculine feminine,irregular,8\nōrum,plural,genitive,2nd,neuter,regular,\num,plural,genitive,2nd,neuter,irregular,\num,plural,genitive,3rd,masculine feminine,regular,\nium,plural,genitive,3rd,masculine feminine,irregular,11\nōn,plural,genitive,3rd,masculine feminine,irregular,7\num,plural,genitive,3rd,neuter,regular,\nium,plural,genitive,3rd,neuter,irregular,11\nuum,plural,genitive,4th,masculine feminine,regular,\num,plural,genitive,4th,masculine feminine,irregular,16\nuom,plural,genitive,4th,masculine feminine,irregular,1\nuum,plural,genitive,4th,neuter,regular,\nērum,plural,genitive,5th,feminine,regular,\nīs,plural,dative,1st,feminine,regular,\nābus,plural,dative,1st,feminine,irregular,4\neis,plural,dative,1st,feminine,irregular,6\nīs,plural,dative,2nd,masculine feminine,regular,\nīs,plural,dative,2nd,neuter,regular,\nibus,plural,dative,3rd,masculine feminine,regular,\nibus,plural,dative,3rd,neuter,regular,\nibus,plural,dative,4th,masculine feminine,regular,\nubus,plural,dative,4th,masculine feminine,irregular,14\nibus,plural,dative,4th,neuter,regular,\nēbus,plural,dative,5th,feminine,regular,\nās,plural,accusative,1st,feminine,regular,\nōs,plural,accusative,2nd,masculine feminine,regular,\na,plural,accusative,2nd,neuter,regular,\nēs,plural,accusative,3rd,masculine feminine,regular,\nīs,plural,accusative,3rd,masculine feminine,irregular,11\nas,plural,accusative,3rd,masculine feminine,irregular,7\na,plural,accusative,3rd,neuter,regular,\nia,plural,accusative,3rd,neuter,irregular,11\nūs,plural,accusative,4th,masculine feminine,regular,\nua,plural,accusative,4th,neuter,regular,\nēs,plural,accusative,5th,feminine,regular,\nīs,plural,ablative,1st,feminine,regular,\nābus,plural,ablative,1st,feminine,irregular,4\neis,plural,ablative,1st,feminine,irregular,6\nīs,plural,ablative,2nd,masculine feminine,regular,\nīs,plural,ablative,2nd,neuter,regular,\nibus,plural,ablative,3rd,masculine feminine,regular,\nibus,plural,ablative,3rd,neuter,regular,\nibus,plural,ablative,4th,masculine feminine,regular,\nubus,plural,ablative,4th,masculine feminine,irregular,14\nibus,plural,ablative,4th,neuter,regular,\nēbus,plural,ablative,5th,feminine,regular,\nīs,plural,locative,1st,feminine,regular,\nīs,plural,locative,2nd,masculine feminine,regular,\nīs,plural,locative,2nd,neuter,regular,\nibus,plural,locative,3rd,masculine feminine,regular,\nibus,plural,locative,3rd,neuter,regular,\nibus,plural,locative,4th,masculine feminine,regular,\nibus,plural,locative,4th,neuter,regular,\nēbus,plural,locative,5th,feminine,regular,\nae,plural,vocative,1st,feminine,regular,\nī,plural,vocative,2nd,masculine feminine,regular,\na,plural,vocative,2nd,neuter,regular,\nēs,plural,vocative,3rd,masculine feminine,regular,\na,plural,vocative,3rd,neuter,regular,\nia,plural,vocative,3rd,neuter,irregular,11\nūs,plural,vocative,4th,masculine feminine,regular,\nua,plural,vocative,4th,neuter,regular,\nēs,plural,vocative,5th,feminine,regular,"

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = "Index,Text\n1,archaic (final s and m of os and om may be omitted in inscriptions)\n2,only in familiās\n3,especially in Greek patronymics and compounds in -gena and -cola.\n4,always in deābus and filiābus; rarely with other words to distinguish the female\n5,archaic\n6,rare\n7,\"may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.\"\n8,proper names in ius and filius and genius\n9,poetic\n10,\"only pelagus, vīrus, and sometimes vulgus\"\n11,may occur with i-stems\n12,several nouns (most commonly domus) show forms of both second and fourth declensions\n13,\"some nouns also have forms from the first declension (eg materia, saevitia) or the third declension (eg requiēs, satiēs, plēbēs, famēs)\"\n14,\"Always in partus and tribus, usually in artus and lacus, sometimes in other words, eg portus and specus\"\n15,Often in names of plants and trees and in nouns ending in -tus\n16,When pronounced as one syllable\n17,early\n18,dies and meridies are masculine"

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = "Ending,Number,Case,Declension,Gender,Type,Footnote\na,singular,nominative,1st 2nd,feminine,regular,\nus,singular,nominative,1st 2nd,masculine,regular,\num,singular,nominative,1st 2nd,neuter,regular,\nis,singular,nominative,3rd,feminine,regular,\n-,singular,nominative,3rd,feminine,irregular,6\n-,singular,nominative,3rd,masculine,regular,\nis,singular,nominative,3rd,masculine,irregular,5\ne,singular,nominative,3rd,neuter,regular,\n-,singular,nominative,3rd,neuter,irregular,6\nae,singular,genitive,1st 2nd,feminine,regular,\nīus,singular,genitive,1st 2nd,feminine,irregular,3\nī,singular,genitive,1st 2nd,masculine,regular,\nīus,singular,genitive,1st 2nd,masculine,irregular,3\nī,singular,genitive,1st 2nd,neuter,regular,\nīus,singular,genitive,1st 2nd,neuter,irregular,3\nis,singular,genitive,3rd,feminine,regular,\nis,singular,genitive,3rd,masculine,regular,\nis,singular,genitive,3rd,neuter,regular,\nae,singular,dative,1st 2nd,feminine,regular,\nī,singular,dative,1st 2nd,feminine,irregular,3\nō,singular,dative,1st 2nd,masculine,regular,\nī,singular,dative,1st 2nd,masculine,irregular,3\nō,singular,dative,1st 2nd,neuter,regular,\nī,singular,dative,1st 2nd,neuter,irregular,3\nī,singular,dative,3rd,feminine,regular,\nī,singular,dative,3rd,masculine,regular,\nī,singular,dative,3rd,neuter,regular,\nam,singular,accusative,1st 2nd,feminine,regular,\num,singular,accusative,1st 2nd,masculine,regular,\num,singular,accusative,1st 2nd,neuter,regular,\nem,singular,accusative,3rd,feminine,regular,\nem,singular,accusative,3rd,masculine,regular,\ne,singular,accusative,3rd,neuter,regular,\n-,singular,accusative,3rd,neuter,irregular,6\nā,singular,ablative,1st 2nd,feminine,regular,\nō,singular,ablative,1st 2nd,feminine,irregular,4\nō,singular,ablative,1st 2nd,masculine,regular,\nō,singular,ablative,1st 2nd,neuter,regular,\nī,singular,ablative,3rd,feminine,regular,\ne,singular,ablative,3rd,feminine,irregular,7\nī,singular,ablative,3rd,masculine,regular,\ne,singular,ablative,3rd,masculine,irregular,7\nī,singular,ablative,3rd,neuter,regular,\nae,singular,locative,1st 2nd,feminine,regular,\nī,singular,locative,1st 2nd,masculine,regular,\nī,singular,locative,1st 2nd,neuter,regular,\nī,singular,locative,3rd,feminine,regular,\ne,singular,locative,3rd,feminine,irregular,7\nī,singular,locative,3rd,masculine,regular,\nī,singular,locative,3rd,neuter,regular,\na,singular,vocative,1st 2nd,feminine,regular,\ne,singular,vocative,1st 2nd,masculine,regular,\nī,singular,vocative,1st 2nd,masculine,irregular,\num,singular,vocative,1st 2nd,neuter,regular,\nis,singular,vocative,3rd,feminine,regular,\n-,singular,vocative,3rd,masculine,regular,\ne,singular,vocative,3rd,neuter,regular,\n-,singular,vocative,3rd,neuter,irregular,6\nae,plural,nominative,1st 2nd,feminine,regular,\nī,plural,nominative,1st 2nd,masculine,regular,\na,plural,nominative,1st 2nd,neuter,regular,\nēs,plural,nominative,3rd,feminine,regular,\nēs,plural,nominative,3rd,masculine,regular,\nia,plural,nominative,3rd,neuter,regular,\nārum,plural,genitive,1st 2nd,feminine,regular,\nōrum,plural,genitive,1st 2nd,masculine,regular,\nōrum,plural,genitive,1st 2nd,neuter,regular,\nium,plural,genitive,3rd,feminine,regular,\num,plural,genitive,3rd,feminine,irregular,8\nium,plural,genitive,3rd,masculine,regular,\num,plural,genitive,3rd,masculine,irregular,8\nium,plural,genitive,3rd,neuter,regular,\num,plural,genitive,3rd,neuter,irregular,8\nīs,plural,dative,1st 2nd,feminine,regular,\nīs,plural,dative,1st 2nd,masculine,regular,\nīs,plural,dative,1st 2nd,neuter,regular,\nibus,plural,dative,3rd,feminine,regular,\nibus,plural,dative,3rd,masculine,regular,\nibus,plural,dative,3rd,neuter,regular,\nās,plural,accusative,1st 2nd,feminine,regular,\nōs,plural,accusative,1st 2nd,masculine,regular,\na,plural,accusative,1st 2nd,neuter,regular,\nīs,plural,accusative,3rd,feminine,regular,\nēs,plural,accusative,3rd,feminine,irregular,9\nīs,plural,accusative,3rd,masculine,regular,\nēs,plural,accusative,3rd,masculine,irregular,9\nia,plural,accusative,3rd,neuter,regular,\nīs,plural,ablative,1st 2nd,feminine,regular,\nīs,plural,ablative,1st 2nd,masculine,regular,\nīs,plural,ablative,1st 2nd,neuter,regular,\nibus,plural,ablative,3rd,feminine,regular,\nibus,plural,ablative,3rd,masculine,regular,\nibus,plural,ablative,3rd,neuter,regular,\nīs,plural,locative,1st 2nd,feminine,regular,\nīs,plural,locative,1st 2nd,masculine,regular,\nīs,plural,locative,1st 2nd,neuter,regular,\nibus,plural,locative,3rd,feminine,regular,\nibus,plural,locative,3rd,masculine,regular,\nibus,plural,locative,3rd,neuter,regular,\nae,plural,vocative,1st 2nd,feminine,regular,\nī,plural,vocative,1st 2nd,masculine,regular,\na,plural,vocative,1st 2nd,neuter,regular,\nēs,plural,vocative,3rd,feminine,regular,\nēs,plural,vocative,3rd,masculine,regular,\nia,plural,vocative,3rd,neuter,regular,"

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "Index,Text\n1,\"Adjectives agree with the noun they modify in gender, number and case.\"\n2,Adjectives are inflected according to either\n3,\"Only nullus, sōlus, alius (alia, aliud), tōtus, ūllus, ūnus, alter, neuter (neutra,\n            neutrum) and uter (utra, utrum).\"\n4,In a few adjectives of Greek origin.\n5,\"The \"\"two-ending\"\" adjectives use \"\"-is\"\", for both masculine and feminine nominative\n            singular.\"\n6,\"The \"\"one-ending\"\" adjectives use the same consonant ending for all three genders in the\n            nominative singular and the neuter accusative and vocative singular.\"\n7,\"An ablative singular in \"\"e\"\" is common in one-ending adjectives, but is usually confined to\n            poetry in three and two-ending adjectives.\"\n8,\"In comparatives, poetry and some one-ending adjectives.\"\n9,Chiefly in comparatives."

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = "Ending,Conjugation,Voice,Mood,Tense,Number,Person,Type,Footnote\nō,1st,active,indicative,present,singular,1st,regular,\nās,1st,active,indicative,present,singular,2nd,regular,\nat,1st,active,indicative,present,singular,3rd,regular,\nāmus,1st,active,indicative,present,plural,1st,regular,\nātis,1st,active,indicative,present,plural,2nd,regular,\nant,1st,active,indicative,present,plural,3rd,regular,\nem,1st,active,subjunctive,present,singular,1st,regular,\nēs,1st,active,subjunctive,present,singular,2nd,regular,\net,1st,active,subjunctive,present,singular,3rd,regular,\nēmus,1st,active,subjunctive,present,plural,1st,regular,\nētis,1st,active,subjunctive,present,plural,2nd,regular,\nent,1st,active,subjunctive,present,plural,3rd,regular,\neō,2nd,active,indicative,present,singular,1st,regular,\nēs,2nd,active,indicative,present,singular,2nd,regular,\nēt,2nd,active,indicative,present,singular,3rd,regular,\nēmus,2nd,active,indicative,present,plural,1st,regular,\nētis,2nd,active,indicative,present,plural,2nd,regular,\nent,2nd,active,indicative,present,plural,3rd,regular,\neam,2nd,active,subjunctive,present,singular,1st,regular,\neās,2nd,active,subjunctive,present,singular,2nd,regular,\neat,2nd,active,subjunctive,present,singular,3rd,regular,\neāmus,2nd,active,subjunctive,present,plural,1st,regular,\neātis,2nd,active,subjunctive,present,plural,2nd,regular,\neant,2nd,active,subjunctive,present,plural,3rd,regular,\nō,3rd,active,indicative,present,singular,1st,regular,\nis,3rd,active,indicative,present,singular,2nd,regular,\nit,3rd,active,indicative,present,singular,3rd,regular,\nimus,3rd,active,indicative,present,plural,1st,regular,\nitis,3rd,active,indicative,present,plural,2nd,regular,\nunt,3rd,active,indicative,present,plural,3rd,regular,\nam,3rd,active,subjunctive,present,singular,1st,regular,\nās,3rd,active,subjunctive,present,singular,2nd,regular,\nat,3rd,active,subjunctive,present,singular,3rd,regular,\nāmus,3rd,active,subjunctive,present,plural,1st,regular,\nātis,3rd,active,subjunctive,present,plural,2nd,regular,\nant,3rd,active,subjunctive,present,plural,3rd,regular,\niō,4th,active,indicative,present,singular,1st,regular,\nīs,4th,active,indicative,present,singular,2nd,regular,\nit,4th,active,indicative,present,singular,3rd,regular,\nīmus,4th,active,indicative,present,plural,1st,regular,\nītis,4th,active,indicative,present,plural,2nd,regular,\niunt,4th,active,indicative,present,plural,3rd,regular,\niam,4th,active,subjunctive,present,singular,1st,regular,\niās,4th,active,subjunctive,present,singular,2nd,regular,\niat,4th,active,subjunctive,present,singular,3rd,regular,\niāmus,4th,active,subjunctive,present,plural,1st,regular,\niāatis,4th,active,subjunctive,present,plural,2nd,regular,\niant,4th,active,subjunctive,present,plural,3rd,regular,\nābam,1st,active,indicative,imperfect,singular,1st,regular,\nābas,1st,active,indicative,imperfect,singular,2nd,regular,\nābat,1st,active,indicative,imperfect,singular,3rd,regular,\nābāmus,1st,active,indicative,imperfect,plural,1st,regular,\nābātis,1st,active,indicative,imperfect,plural,2nd,regular,\nābant,1st,active,indicative,imperfect,plural,3rd,regular,\nārem,1st,active,subjunctive,imperfect,singular,1st,regular,\nārēs,1st,active,subjunctive,imperfect,singular,2nd,regular,\nāret,1st,active,subjunctive,imperfect,singular,3rd,regular,\nārēmus,1st,active,subjunctive,imperfect,plural,1st,regular,\nārētis,1st,active,subjunctive,imperfect,plural,2nd,regular,\nārent,1st,active,subjunctive,imperfect,plural,3rd,regular,\nēbam,2nd,active,indicative,imperfect,singular,1st,regular,\nēbās,2nd,active,indicative,imperfect,singular,2nd,regular,\nēbat,2nd,active,indicative,imperfect,singular,3rd,regular,\nēbāmus,2nd,active,indicative,imperfect,plural,1st,regular,\nēbātis,2nd,active,indicative,imperfect,plural,2nd,regular,\nēbant,2nd,active,indicative,imperfect,plural,3rd,regular,\nērem,2nd,active,subjunctive,imperfect,singular,1st,regular,\nērēs,2nd,active,subjunctive,imperfect,singular,2nd,regular,\nēret,2nd,active,subjunctive,imperfect,singular,3rd,regular,\nērēmus,2nd,active,subjunctive,imperfect,plural,1st,regular,\nērētis,2nd,active,subjunctive,imperfect,plural,2nd,regular,\nērēnt,2nd,active,subjunctive,imperfect,plural,3rd,regular,\nēbas,3rd,active,indicative,imperfect,singular,1st,regular,\nēbāt,3rd,active,indicative,imperfect,singular,2nd,regular,\nēbat,3rd,active,indicative,imperfect,singular,3rd,regular,\nēbāmus,3rd,active,indicative,imperfect,plural,1st,regular,\nēbātis,3rd,active,indicative,imperfect,plural,2nd,regular,\nēbant,3rd,active,indicative,imperfect,plural,3rd,regular,\nerem,3rd,active,subjunctive,imperfect,singular,1st,regular,\nerēs,3rd,active,subjunctive,imperfect,singular,2nd,regular,\neret,3rd,active,subjunctive,imperfect,singular,3rd,regular,\nerēmus,3rd,active,subjunctive,imperfect,plural,1st,regular,\nerētis,3rd,active,subjunctive,imperfect,plural,2nd,regular,\nerent,3rd,active,subjunctive,imperfect,plural,3rd,regular,\niēbam,4th,active,indicative,imperfect,singular,1st,regular,\nībam,4th,active,indicative,imperfect,singular,1st,irregular,2\niēbas,4th,active,indicative,imperfect,singular,2nd,regular,\nības,4th,active,indicative,imperfect,singular,2nd,irregular,\niēbat,4th,active,indicative,imperfect,singular,3rd,regular,\nībat,4th,active,indicative,imperfect,singular,3rd,irregular,\niēbāmus,4th,active,indicative,imperfect,plural,1st,regular,\nībāmus,4th,active,indicative,imperfect,plural,1st,irregular,\niēbātis,4th,active,indicative,imperfect,plural,2nd,regular,\nībātis,4th,active,indicative,imperfect,plural,2nd,irregular,\niēbant,4th,active,indicative,imperfect,plural,3rd,regular,\nībant,4th,active,indicative,imperfect,plural,3rd,irregular,\nīrem,4th,active,subjunctive,imperfect,singular,1st,regular,\nīrēs,4th,active,subjunctive,imperfect,singular,2nd,regular,\nīret,4th,active,subjunctive,imperfect,singular,3rd,regular,\nīrēmus,4th,active,subjunctive,imperfect,plural,1st,regular,\nīrētis,4th,active,subjunctive,imperfect,plural,2nd,regular,\nīrēnt,4th,active,subjunctive,imperfect,plural,3rd,regular,\nābo,1st,active,indicative,future,singular,1st,regular,\nābis,1st,active,indicative,future,singular,2nd,regular,\nābit,1st,active,indicative,future,singular,3rd,regular,\nābimus,1st,active,indicative,future,plural,1st,regular,\nābitis,1st,active,indicative,future,plural,2nd,regular,\nābunt,1st,active,indicative,future,plural,3rd,regular,\n,1st,active,subjunctive,future,singular,1st,,\n,1st,active,subjunctive,future,singular,2nd,,\n,1st,active,subjunctive,future,singular,3rd,,\n,1st,active,subjunctive,future,plural,1st,,\n,1st,active,subjunctive,future,plural,2nd,,\n,1st,active,subjunctive,future,plural,3rd,,\nēbō,2nd,active,indicative,future,singular,1st,regular,\nēbis,2nd,active,indicative,future,singular,2nd,regular,\nēbit,2nd,active,indicative,future,singular,3rd,regular,\nēbimus,2nd,active,indicative,future,plural,1st,regular,\nēbitis,2nd,active,indicative,future,plural,2nd,regular,\nēbunt,2nd,active,indicative,future,plural,3rd,regular,\n,2nd,active,subjunctive,future,singular,1st,regular,\n,2nd,active,subjunctive,future,singular,2nd,,\n,2nd,active,subjunctive,future,singular,3rd,,\n,2nd,active,subjunctive,future,plural,1st,,\n,2nd,active,subjunctive,future,plural,2nd,,\n,2nd,active,subjunctive,future,plural,3rd,,\nam,3rd,active,indicative,future,singular,1st,regular,\nēs,3rd,active,indicative,future,singular,2nd,regular,\net,3rd,active,indicative,future,singular,3rd,regular,\nēmus,3rd,active,indicative,future,plural,1st,regular,\nētis,3rd,active,indicative,future,plural,2nd,regular,\nent,3rd,active,indicative,future,plural,3rd,regular,\n,3rd,active,subjunctive,future,singular,1st,,\n,3rd,active,subjunctive,future,singular,2nd,,\n,3rd,active,subjunctive,future,singular,3rd,,\n,3rd,active,subjunctive,future,plural,1st,,\n,3rd,active,subjunctive,future,plural,2nd,,\n,3rd,active,subjunctive,future,plural,3rd,,\niam,4th,active,indicative,future,singular,1st,regular,\nībō,4th,active,indicative,future,singular,1st,irregular,2\niēs,4th,active,indicative,future,singular,2nd,regular,\nībis,4th,active,indicative,future,singular,2nd,irregular,\niet,4th,active,indicative,future,singular,3rd,regular,\nībit,4th,active,indicative,future,singular,3rd,irregular,\niēmus,4th,active,indicative,future,plural,1st,regular,\nībimus,4th,active,indicative,future,plural,1st,irregular,\niētis,4th,active,indicative,future,plural,2nd,regular,\nībitis,4th,active,indicative,future,plural,2nd,irregular,\nient,4th,active,indicative,future,plural,3rd,regular,\nībunt,4th,active,indicative,future,plural,3rd,irregular,\n,4th,active,subjunctive,future,singular,1st,,\n,4th,active,subjunctive,future,singular,2nd,,\n,4th,active,subjunctive,future,singular,3rd,,\n,4th,active,subjunctive,future,plural,1st,,\n,4th,active,subjunctive,future,plural,2nd,,\n,4th,active,subjunctive,future,plural,3rd,,\nāvī,1st,active,indicative,perfect,singular,1st,regular,\nāvistī,1st,active,indicative,perfect,singular,2nd,regular,\nāvit,1st,active,indicative,perfect,singular,3rd,regular,\nāvimus,1st,active,indicative,perfect,plural,1st,regular,\nāvistis,1st,active,indicative,perfect,plural,2nd,regular,\nāvērunt,1st,active,indicative,perfect,plural,3rd,regular,\nāvēre,1st,active,indicative,perfect,plural,3rd,irregular,6\nāverim,1st,active,subjunctive,perfect,singular,1st,regular,\nāveris,1st,active,subjunctive,perfect,singular,2nd,regular,\nāverit,1st,active,subjunctive,perfect,singular,3rd,regular,\nāverimus,1st,active,subjunctive,perfect,plural,1st,regular,\nāveritis,1st,active,subjunctive,perfect,plural,2nd,regular,\nāverint,1st,active,subjunctive,perfect,plural,3rd,regular,\nvī,2nd,active,indicative,perfect,singular,1st,regular,\nvistī,2nd,active,indicative,perfect,singular,2nd,regular,\nvit,2nd,active,indicative,perfect,singular,3rd,regular,\nvimus,2nd,active,indicative,perfect,plural,1st,regular,\nvistis,2nd,active,indicative,perfect,plural,2nd,regular,\nvērunt,2nd,active,indicative,perfect,plural,3rd,regular,\nvēre,2nd,active,indicative,perfect,plural,3rd,irregular,6\nverim,2nd,active,subjunctive,perfect,singular,1st,regular,\nveris,2nd,active,subjunctive,perfect,singular,2nd,regular,\nverit,2nd,active,subjunctive,perfect,singular,3rd,regular,\nverimus,2nd,active,subjunctive,perfect,plural,1st,regular,\nveritis,2nd,active,subjunctive,perfect,plural,2nd,regular,\nverint,2nd,active,subjunctive,perfect,plural,3rd,regular,\nī,3rd,active,indicative,perfect,singular,1st,regular,\nistī,3rd,active,indicative,perfect,singular,2nd,regular,\nit,3rd,active,indicative,perfect,singular,3rd,regular,\nimus,3rd,active,indicative,perfect,plural,1st,regular,\nistis,3rd,active,indicative,perfect,plural,2nd,regular,\nērunt,3rd,active,indicative,perfect,plural,3rd,regular,\nēre,3rd,active,indicative,perfect,plural,3rd,irregular,6\nerim,3rd,active,subjunctive,perfect,singular,1st,regular,\neris,3rd,active,subjunctive,perfect,singular,2nd,regular,\nerit,3rd,active,subjunctive,perfect,singular,3rd,regular,\nerimus,3rd,active,subjunctive,perfect,plural,1st,regular,\neritis,3rd,active,subjunctive,perfect,plural,2nd,regular,\nerint,3rd,active,subjunctive,perfect,plural,3rd,regular,\nīvi,4th,active,indicative,perfect,singular,1st,regular,\nīvistī,4th,active,indicative,perfect,singular,2nd,regular,\nīvit,4th,active,indicative,perfect,singular,3rd,regular,\nīvimus,4th,active,indicative,perfect,plural,1st,regular,\nīvistis,4th,active,indicative,perfect,plural,2nd,regular,\nīvērunt,4th,active,indicative,perfect,plural,3rd,regular,\nīvēre,4th,active,indicative,perfect,plural,3rd,irregular,6\nīverim,4th,active,subjunctive,perfect,singular,1st,regular,\niveris,4th,active,subjunctive,perfect,singular,2nd,regular,\nīverit,4th,active,subjunctive,perfect,singular,3rd,regular,\nīverimus,4th,active,subjunctive,perfect,plural,1st,regular,\nīveritis,4th,active,subjunctive,perfect,plural,2nd,regular,\nīverint,4th,active,subjunctive,perfect,plural,3rd,regular,\nāveram,1st,active,indicative,pluperfect,singular,1st,regular,\nāverās,1st,active,indicative,pluperfect,singular,2nd,regular,\nāverat,1st,active,indicative,pluperfect,singular,3rd,regular,\nāverāmus,1st,active,indicative,pluperfect,plural,1st,regular,\nāverātis,1st,active,indicative,pluperfect,plural,2nd,regular,\nāverant,1st,active,indicative,pluperfect,plural,3rd,regular,\nāvissem,1st,active,subjunctive,pluperfect,singular,1st,regular,\nāvissēs,1st,active,subjunctive,pluperfect,singular,2nd,regular,\nāvisset,1st,active,subjunctive,pluperfect,singular,3rd,regular,\nāvissēm,1st,active,subjunctive,pluperfect,plural,1st,regular,\nāvissēs,1st,active,subjunctive,pluperfect,plural,2nd,regular,\nāvisset,1st,active,subjunctive,pluperfect,plural,3rd,regular,\nveram,2nd,active,indicative,pluperfect,singular,1st,regular,\nverās,2nd,active,indicative,pluperfect,singular,2nd,regular,\nverat,2nd,active,indicative,pluperfect,singular,3rd,regular,\nverāmus,2nd,active,indicative,pluperfect,plural,1st,regular,\nverātis,2nd,active,indicative,pluperfect,plural,2nd,regular,\nverant,2nd,active,indicative,pluperfect,plural,3rd,regular,\nvissem,2nd,active,subjunctive,pluperfect,singular,1st,regular,\nvissēs,2nd,active,subjunctive,pluperfect,singular,2nd,regular,\nvisset,2nd,active,subjunctive,pluperfect,singular,3rd,regular,\nvissēmus,2nd,active,subjunctive,pluperfect,plural,1st,regular,\nvissētis,2nd,active,subjunctive,pluperfect,plural,2nd,regular,\nvissent,2nd,active,subjunctive,pluperfect,plural,3rd,regular,\neram,3rd,active,indicative,pluperfect,singular,1st,regular,\nerās,3rd,active,indicative,pluperfect,singular,2nd,regular,\nerat,3rd,active,indicative,pluperfect,singular,3rd,regular,\nerāmus,3rd,active,indicative,pluperfect,plural,1st,regular,\nerātis,3rd,active,indicative,pluperfect,plural,2nd,regular,\nerant,3rd,active,indicative,pluperfect,plural,3rd,regular,\nissem,3rd,active,subjunctive,pluperfect,singular,1st,regular,\nissēs,3rd,active,subjunctive,pluperfect,singular,2nd,regular,\nisset,3rd,active,subjunctive,pluperfect,singular,3rd,regular,\nissēmus,3rd,active,subjunctive,pluperfect,plural,1st,regular,\nissētis,3rd,active,subjunctive,pluperfect,plural,2nd,regular,\nissent,3rd,active,subjunctive,pluperfect,plural,3rd,regular,\nīveram,4th,active,indicative,pluperfect,singular,1st,regular,\nīverās,4th,active,indicative,pluperfect,singular,2nd,regular,\nīverat,4th,active,indicative,pluperfect,singular,3rd,regular,\nīverāmus,4th,active,indicative,pluperfect,plural,1st,regular,\nīverātis,4th,active,indicative,pluperfect,plural,2nd,regular,\nīverant,4th,active,indicative,pluperfect,plural,3rd,regular,\nīvissem,4th,active,subjunctive,pluperfect,singular,1st,regular,\nīvissēs,4th,active,subjunctive,pluperfect,singular,2nd,regular,\nīvisset,4th,active,subjunctive,pluperfect,singular,3rd,regular,\nīvissēmus,4th,active,subjunctive,pluperfect,plural,1st,regular,\nīvissētis,4th,active,subjunctive,pluperfect,plural,2nd,regular,\nīvissent,4th,active,subjunctive,pluperfect,plural,3rd,regular,\nāverō,1st,active,indicative,future_perfect,singular,1st,regular,\nāveris,1st,active,indicative,future_perfect,singular,2nd,regular,\nāverit,1st,active,indicative,future_perfect,singular,3rd,regular,\nāverimus,1st,active,indicative,future_perfect,plural,1st,regular,\nāveritis,1st,active,indicative,future_perfect,plural,2nd,regular,\nāverint,1st,active,indicative,future_perfect,plural,3rd,regular,\n,1st,active,subjunctive,future_perfect,singular,1st,,\n,1st,active,subjunctive,future_perfect,singular,2nd,,\n,1st,active,subjunctive,future_perfect,singular,3rd,,\n,1st,active,subjunctive,future_perfect,plural,1st,,\n,1st,active,subjunctive,future_perfect,plural,2nd,,\n,1st,active,subjunctive,future_perfect,plural,3rd,,\nverō,2nd,active,indicative,future_perfect,singular,1st,regular,\nvēris,2nd,active,indicative,future_perfect,singular,2nd,regular,\nvērit,2nd,active,indicative,future_perfect,singular,3rd,regular,\nvērimus,2nd,active,indicative,future_perfect,plural,1st,regular,\nvēritis,2nd,active,indicative,future_perfect,plural,2nd,regular,\nvērint,2nd,active,indicative,future_perfect,plural,3rd,regular,\n,2nd,active,subjunctive,future_perfect,singular,1st,,\n,2nd,active,subjunctive,future_perfect,singular,2nd,,\n,2nd,active,subjunctive,future_perfect,singular,3rd,,\n,2nd,active,subjunctive,future_perfect,plural,1st,,\n,2nd,active,subjunctive,future_perfect,plural,2nd,,\n,2nd,active,subjunctive,future_perfect,plural,3rd,,\nerō,3rd,active,indicative,future_perfect,singular,1st,regular,\neris,3rd,active,indicative,future_perfect,singular,2nd,regular,\nerit,3rd,active,indicative,future_perfect,singular,3rd,regular,\nerimus,3rd,active,indicative,future_perfect,plural,1st,regular,\neritis,3rd,active,indicative,future_perfect,plural,2nd,regular,\nerint,3rd,active,indicative,future_perfect,plural,3rd,regular,\n,3rd,active,subjunctive,future_perfect,singular,1st,,\n,3rd,active,subjunctive,future_perfect,singular,2nd,,\n,3rd,active,subjunctive,future_perfect,singular,3rd,,\n,3rd,active,subjunctive,future_perfect,plural,1st,,\n,3rd,active,subjunctive,future_perfect,plural,2nd,,\n,3rd,active,subjunctive,future_perfect,plural,3rd,,\nīverō,4th,active,indicative,future_perfect,singular,1st,regular,\nīveris,4th,active,indicative,future_perfect,singular,2nd,regular,\nīverit,4th,active,indicative,future_perfect,singular,3rd,regular,\nīverimus,4th,active,indicative,future_perfect,plural,1st,regular,\nīveritis,4th,active,indicative,future_perfect,plural,2nd,regular,\nīverint,4th,active,indicative,future_perfect,plural,3rd,regular,\n,4th,active,subjunctive,future_perfect,singular,1st,,\n,4th,active,subjunctive,future_perfect,singular,2nd,,\n,4th,active,subjunctive,future_perfect,singular,3rd,,\n,4th,active,subjunctive,future_perfect,plural,1st,,\n,4th,active,subjunctive,future_perfect,plural,2nd,,\n,4th,active,subjunctive,future_perfect,plural,3rd,,\nor,1st,passive,indicative,present,singular,1st,regular,\nāris,1st,passive,indicative,present,singular,2nd,regular,\nāre,1st,passive,indicative,present,singular,2nd,irregular,5\nātur,1st,passive,indicative,present,singular,3rd,regular,\nāmur,1st,passive,indicative,present,plural,1st,regular,\nāminiī,1st,passive,indicative,present,plural,2nd,regular,\nantur,1st,passive,indicative,present,plural,3rd,regular,\ner,1st,passive,subjunctive,present,singular,1st,regular,\nēris,1st,passive,subjunctive,present,singular,2nd,regular,\nēre,1st,passive,subjunctive,present,singular,2nd,regular,\nētur,1st,passive,subjunctive,present,singular,3rd,regular,\nēmur,1st,passive,subjunctive,present,plural,1st,regular,\nēminī,1st,passive,subjunctive,present,plural,2nd,regular,\nentur,1st,passive,subjunctive,present,plural,3rd,regular,\neor,2nd,passive,indicative,present,singular,1st,regular,\nēris,2nd,passive,indicative,present,singular,2nd,regular,\nēre,2nd,passive,indicative,present,singular,2nd,regular,\nētur,2nd,passive,indicative,present,singular,3rd,regular,\nēmur,2nd,passive,indicative,present,plural,1st,regular,\nēmini,2nd,passive,indicative,present,plural,2nd,regular,\nentur,2nd,passive,indicative,present,plural,3rd,regular,\near,2nd,passive,subjunctive,present,singular,1st,regular,\neāris,2nd,passive,subjunctive,present,singular,2nd,regular,\neāre,2nd,passive,subjunctive,present,singular,2nd,regular,\neātur,2nd,passive,subjunctive,present,singular,3rd,regular,\neāmur,2nd,passive,subjunctive,present,plural,1st,regular,\neāminī,2nd,passive,subjunctive,present,plural,2nd,regular,\neantur,2nd,passive,subjunctive,present,plural,3rd,regular,\nor,3rd,passive,indicative,present,singular,1st,regular,\neris,3rd,passive,indicative,present,singular,2nd,regular,\nere,3rd,passive,indicative,present,singular,2nd,regular,\nitur,3rd,passive,indicative,present,singular,3rd,regular,\nimur,3rd,passive,indicative,present,plural,1st,regular,\niminī,3rd,passive,indicative,present,plural,2nd,regular,\nuntur,3rd,passive,indicative,present,plural,3rd,regular,\nar,3rd,passive,subjunctive,present,singular,1st,regular,\nāris,3rd,passive,subjunctive,present,singular,2nd,regular,\nāre,3rd,passive,subjunctive,present,singular,2nd,regular,\nātur,3rd,passive,subjunctive,present,singular,3rd,regular,\nāmur,3rd,passive,subjunctive,present,plural,1st,regular,\nāminī,3rd,passive,subjunctive,present,plural,2nd,regular,\nantur,3rd,passive,subjunctive,present,plural,3rd,regular,\nior,4th,passive,indicative,present,singular,1st,regular,\nīris,4th,passive,indicative,present,singular,2nd,regular,\nīre,4th,passive,indicative,present,singular,2nd,regular,\nītur,4th,passive,indicative,present,singular,3rd,regular,\nīmur,4th,passive,indicative,present,plural,1st,regular,\nīminī,4th,passive,indicative,present,plural,2nd,regular,\niuntur,4th,passive,indicative,present,plural,3rd,regular,\niar,4th,passive,subjunctive,present,singular,1st,regular,\niāris,4th,passive,subjunctive,present,singular,2nd,regular,\niāre,4th,passive,subjunctive,present,singular,2nd,regular,\niātur,4th,passive,subjunctive,present,singular,3rd,regular,\niāmur,4th,passive,subjunctive,present,plural,1st,regular,\niāminī,4th,passive,subjunctive,present,plural,2nd,regular,\niantur,4th,passive,subjunctive,present,plural,3rd,regular,\nābar,1st,passive,indicative,imperfect,singular,1st,regular,\nābāaris,1st,passive,indicative,imperfect,singular,2nd,regular,\nābāre,1st,passive,indicative,imperfect,singular,2nd,regular,\nābātur,1st,passive,indicative,imperfect,singular,3rd,regular,\nābāmur,1st,passive,indicative,imperfect,plural,1st,regular,\nābāminī,1st,passive,indicative,imperfect,plural,2nd,regular,\nābantur,1st,passive,indicative,imperfect,plural,3rd,regular,\nārer,1st,passive,subjunctive,imperfect,singular,1st,regular,\nārēris,1st,passive,subjunctive,imperfect,singular,2nd,regular,\nārēre,1st,passive,subjunctive,imperfect,singular,2nd,regular,\nārētur,1st,passive,subjunctive,imperfect,singular,3rd,regular,\nārēmur,1st,passive,subjunctive,imperfect,plural,1st,regular,\nārēminī,1st,passive,subjunctive,imperfect,plural,2nd,regular,\nārentur,1st,passive,subjunctive,imperfect,plural,3rd,regular,\nēbar,2nd,passive,indicative,imperfect,singular,1st,regular,\nēbāris,2nd,passive,indicative,imperfect,singular,2nd,regular,\nēbāre,2nd,passive,indicative,imperfect,singular,2nd,regular,\nēbātur,2nd,passive,indicative,imperfect,singular,3rd,regular,\nēbāmur,2nd,passive,indicative,imperfect,plural,1st,regular,\nēbāmini,2nd,passive,indicative,imperfect,plural,2nd,regular,\nēbantur,2nd,passive,indicative,imperfect,plural,3rd,regular,\nērer,2nd,passive,subjunctive,imperfect,singular,1st,regular,\nērēris,2nd,passive,subjunctive,imperfect,singular,2nd,regular,\nērēre,2nd,passive,subjunctive,imperfect,singular,2nd,regular,\nērētur,2nd,passive,subjunctive,imperfect,singular,3rd,regular,\nērēmur,2nd,passive,subjunctive,imperfect,plural,1st,regular,\nērēminī,2nd,passive,subjunctive,imperfect,plural,2nd,regular,\nērentur,2nd,passive,subjunctive,imperfect,plural,3rd,regular,\nēbar,3rd,passive,indicative,imperfect,singular,1st,regular,\nēbāris,3rd,passive,indicative,imperfect,singular,2nd,regular,\nēbāre,3rd,passive,indicative,imperfect,singular,2nd,regular,\nēbatur,3rd,passive,indicative,imperfect,singular,3rd,regular,\nēbāmur,3rd,passive,indicative,imperfect,plural,1st,regular,\nēbāminī,3rd,passive,indicative,imperfect,plural,2nd,regular,\nēbantur,3rd,passive,indicative,imperfect,plural,3rd,regular,\nerer,3rd,passive,subjunctive,imperfect,singular,1st,regular,\nerēris,3rd,passive,subjunctive,imperfect,singular,2nd,regular,\nerēre,3rd,passive,subjunctive,imperfect,singular,2nd,regular,\nerētur,3rd,passive,subjunctive,imperfect,singular,3rd,regular,\nerēmur,3rd,passive,subjunctive,imperfect,plural,1st,regular,\nerēminī,3rd,passive,subjunctive,imperfect,plural,2nd,regular,\nerentur,3rd,passive,subjunctive,imperfect,plural,3rd,regular,\niēbar,4th,passive,indicative,imperfect,singular,1st,regular,\niēbāris,4th,passive,indicative,imperfect,singular,2nd,regular,\niēbāre,4th,passive,indicative,imperfect,singular,2nd,regular,\niēbātur,4th,passive,indicative,imperfect,singular,3rd,regular,\niēbāmur,4th,passive,indicative,imperfect,plural,1st,regular,\niēbāminī,4th,passive,indicative,imperfect,plural,2nd,regular,\niēbantur,4th,passive,indicative,imperfect,plural,3rd,regular,\nīrer,4th,passive,subjunctive,imperfect,singular,1st,regular,\nīrēris,4th,passive,subjunctive,imperfect,singular,2nd,regular,\nīrēre,4th,passive,subjunctive,imperfect,singular,2nd,regular,\nīrētur,4th,passive,subjunctive,imperfect,singular,3rd,regular,\nīrēmur,4th,passive,subjunctive,imperfect,plural,1st,regular,\nīrēminī,4th,passive,subjunctive,imperfect,plural,2nd,regular,\nīrentur,4th,passive,subjunctive,imperfect,plural,3rd,regular,\nābor,1st,passive,indicative,future,singular,1st,regular,\nāberis,1st,passive,indicative,future,singular,2nd,regular,\nābere,1st,passive,indicative,future,singular,2nd,irregular,\nābitur,1st,passive,indicative,future,singular,3rd,regular,\nābimur,1st,passive,indicative,future,plural,1st,regular,\nābiminī,1st,passive,indicative,future,plural,2nd,regular,\nābuntur,1st,passive,indicative,future,plural,3rd,regular,\n,1st,passive,subjunctive,future,singular,1st,,\n,1st,passive,subjunctive,future,singular,2nd,,\n,1st,passive,subjunctive,future,singular,3rd,,\n,1st,passive,subjunctive,future,plural,1st,,\n,1st,passive,subjunctive,future,plural,2nd,,\n,1st,passive,subjunctive,future,plural,3rd,,\nēbor,2nd,passive,indicative,future,singular,1st,regular,\nēberis,2nd,passive,indicative,future,singular,2nd,regular,\nēbere,2nd,passive,indicative,future,singular,2nd,regular,\nēbitur,2nd,passive,indicative,future,singular,3rd,regular,\nēbimur,2nd,passive,indicative,future,plural,1st,regular,\nēbiminī,2nd,passive,indicative,future,plural,2nd,regular,\nēbuntur,2nd,passive,indicative,future,plural,3rd,regular,\n,2nd,passive,subjunctive,future,singular,1st,,\n,2nd,passive,subjunctive,future,singular,2nd,,\n,2nd,passive,subjunctive,future,singular,3rd,,\n,2nd,passive,subjunctive,future,plural,1st,,\n,2nd,passive,subjunctive,future,plural,2nd,,\n,2nd,passive,subjunctive,future,plural,3rd,,\nar,3rd,passive,indicative,future,singular,1st,regular,\nēris,3rd,passive,indicative,future,singular,2nd,regular,\nēre,3rd,passive,indicative,future,singular,2nd,irregular,\nētur,3rd,passive,indicative,future,singular,3rd,regular,\nēmur,3rd,passive,indicative,future,plural,1st,regular,\nēminī,3rd,passive,indicative,future,plural,2nd,regular,\nentur,3rd,passive,indicative,future,plural,3rd,regular,\n,3rd,passive,subjunctive,future,singular,1st,,\n,3rd,passive,subjunctive,future,singular,2nd,,\n,3rd,passive,subjunctive,future,singular,3rd,,\n,3rd,passive,subjunctive,future,plural,1st,,\n,3rd,passive,subjunctive,future,plural,2nd,,\n,3rd,passive,subjunctive,future,plural,3rd,,\niar,4th,passive,indicative,future,singular,1st,regular,\niēris,4th,passive,indicative,future,singular,2nd,regular,\nīēre,4th,passive,indicative,future,singular,2nd,irregular,\niētur,4th,passive,indicative,future,singular,3rd,regular,\niēmur,4th,passive,indicative,future,plural,1st,regular,\niēminī,4th,passive,indicative,future,plural,2nd,regular,\nientur,4th,passive,indicative,future,plural,3rd,regular,\n,4th,passive,subjunctive,future,singular,1st,,\n,4th,passive,subjunctive,future,singular,2nd,,\n,4th,passive,subjunctive,future,singular,3rd,,\n,4th,passive,subjunctive,future,plural,1st,,\n,4th,passive,subjunctive,future,plural,2nd,,\n,4th,passive,subjunctive,future,plural,3rd,,\nātus sum,1st,passive,indicative,perfect,singular,1st,regular,\nātus fui,1st,passive,indicative,perfect,singular,1st,regular,\nātus es,1st,passive,indicative,perfect,singular,2nd,regular,\nātus fuisti,1st,passive,indicative,perfect,singular,2nd,regular,\nātus est,1st,passive,indicative,perfect,singular,3rd,regular,\nātus fuit,1st,passive,indicative,perfect,singular,3rd,regular,\nāti sumus,1st,passive,indicative,perfect,plural,1st,regular,\nāti fuimus,1st,passive,indicative,perfect,plural,1st,irregular,\nāti estis,1st,passive,indicative,perfect,plural,2nd,regular,\nāti fuistis,1st,passive,indicative,perfect,plural,2nd,irregular,\nāti sunt,1st,passive,indicative,perfect,plural,3rd,regular,\nāti fuerunt,1st,passive,indicative,perfect,plural,3rd,irregular,\nātus sim,1st,passive,subjunctive,perfect,singular,1st,regular,\nātus fuerim,1st,passive,subjunctive,perfect,singular,1st,irregular,\nātus sis,1st,passive,subjunctive,perfect,singular,2nd,regular,\nātus fueris,1st,passive,subjunctive,perfect,singular,2nd,irregular,\nātus sit,1st,passive,subjunctive,perfect,singular,3rd,regular,\nātus fuerit,1st,passive,subjunctive,perfect,singular,3rd,regular,\nāti sīmus,1st,passive,subjunctive,perfect,plural,1st,regular,\nāti fuerimus,1st,passive,subjunctive,perfect,plural,1st,irregular,\nāti sītis,1st,passive,subjunctive,perfect,plural,2nd,regular,\nāti fueritis,1st,passive,subjunctive,perfect,plural,2nd,irregular,\nāti sint,1st,passive,subjunctive,perfect,plural,3rd,regular,\nāti fuerint,1st,passive,subjunctive,perfect,plural,3rd,irregular,\nitus sum,2nd,passive,indicative,perfect,singular,1st,regular,\nitus es,2nd,passive,indicative,perfect,singular,2nd,regular,\nitus est,2nd,passive,indicative,perfect,singular,3rd,regular,\nitī sumus,2nd,passive,indicative,perfect,plural,1st,regular,\nitī estis,2nd,passive,indicative,perfect,plural,2nd,regular,\nitī sunt,2nd,passive,indicative,perfect,plural,3rd,regular,\nitus sim,2nd,passive,subjunctive,perfect,singular,1st,regular,\nitus sīs,2nd,passive,subjunctive,perfect,singular,2nd,regular,\nitus sit,2nd,passive,subjunctive,perfect,singular,3rd,regular,\nitī sīmus,2nd,passive,subjunctive,perfect,plural,1st,regular,\nitī sītis,2nd,passive,subjunctive,perfect,plural,2nd,regular,\nitī sint,2nd,passive,subjunctive,perfect,plural,3rd,regular,\nus sum,3rd,passive,indicative,perfect,singular,1st,regular,\nus es,3rd,passive,indicative,perfect,singular,2nd,regular,\nus est,3rd,passive,indicative,perfect,singular,3rd,regular,\nī sumus,3rd,passive,indicative,perfect,plural,1st,regular,\nī estis,3rd,passive,indicative,perfect,plural,2nd,regular,\nī sunt,3rd,passive,indicative,perfect,plural,3rd,regular,\nus sim,3rd,passive,subjunctive,perfect,singular,1st,regular,\nus sīs,3rd,passive,subjunctive,perfect,singular,2nd,regular,\nus sit,3rd,passive,subjunctive,perfect,singular,3rd,regular,\nus sīmus,3rd,passive,subjunctive,perfect,plural,1st,regular,\nus sītis,3rd,passive,subjunctive,perfect,plural,2nd,regular,\nus sint,3rd,passive,subjunctive,perfect,plural,3rd,regular,\nītus sum,4th,passive,indicative,perfect,singular,1st,regular,\nītus es,4th,passive,indicative,perfect,singular,2nd,regular,\nītus est,4th,passive,indicative,perfect,singular,3rd,regular,\nītī sumus,4th,passive,indicative,perfect,plural,1st,regular,\nīti estis,4th,passive,indicative,perfect,plural,2nd,regular,\nīti sunt,4th,passive,indicative,perfect,plural,3rd,regular,\nītus sim,4th,passive,subjunctive,perfect,singular,1st,regular,\nītus sīs,4th,passive,subjunctive,perfect,singular,2nd,regular,\nītus sit,4th,passive,subjunctive,perfect,singular,3rd,regular,\nītī sīmus,4th,passive,subjunctive,perfect,plural,1st,regular,\nīti sītis,4th,passive,subjunctive,perfect,plural,2nd,regular,\nīti sint,4th,passive,subjunctive,perfect,plural,3rd,regular,\nātus eram,1st,passive,indicative,pluperfect,singular,1st,regular,\nātus fueram,1st,passive,indicative,pluperfect,singular,1st,irregular,\nātus eras,1st,passive,indicative,pluperfect,singular,2nd,regular,\nātus fueras,1st,passive,indicative,pluperfect,singular,2nd,irregular,\nātus erat,1st,passive,indicative,pluperfect,singular,3rd,regular,\nātus fuerat,1st,passive,indicative,pluperfect,singular,3rd,irregular,\nātī erāmus,1st,passive,indicative,pluperfect,plural,1st,regular,\nātī fueramus,1st,passive,indicative,pluperfect,plural,1st,irregular,\nātī erātis,1st,passive,indicative,pluperfect,plural,2nd,regular,\nātī fueratis,1st,passive,indicative,pluperfect,plural,2nd,irregular,\nātī erant,1st,passive,indicative,pluperfect,plural,3rd,regular,\nātī fuerant,1st,passive,indicative,pluperfect,plural,3rd,irregular,\nātus essem,1st,passive,subjunctive,pluperfect,singular,1st,regular,\nātus fuissem,1st,passive,subjunctive,pluperfect,singular,1st,irregular,\nātus esses,1st,passive,subjunctive,pluperfect,singular,2nd,regular,\nātus fuissēs,1st,passive,subjunctive,pluperfect,singular,2nd,irregular,\nātus esset,1st,passive,subjunctive,pluperfect,singular,3rd,regular,\nātus fuisset,1st,passive,subjunctive,pluperfect,singular,3rd,irregular,\nāti essēmus,1st,passive,subjunctive,pluperfect,plural,1st,regular,\nāti fuissēmus,1st,passive,subjunctive,pluperfect,plural,1st,irregular,\nāti essētis,1st,passive,subjunctive,pluperfect,plural,2nd,regular,\nāti fuissētis,1st,passive,subjunctive,pluperfect,plural,2nd,regular,\nāti essent,1st,passive,subjunctive,pluperfect,plural,3rd,regular,\nāti fuissent,1st,passive,subjunctive,pluperfect,plural,3rd,regular,\nitus eram,2nd,passive,indicative,pluperfect,singular,1st,regular,\nitus erās,2nd,passive,indicative,pluperfect,singular,2nd,regular,\nitus erat,2nd,passive,indicative,pluperfect,singular,3rd,regular,\nitī erāmus,2nd,passive,indicative,pluperfect,plural,1st,regular,\nitī erātis,2nd,passive,indicative,pluperfect,plural,2nd,regular,\nitī erant,2nd,passive,indicative,pluperfect,plural,3rd,regular,\nitus essem,2nd,passive,subjunctive,pluperfect,singular,1st,regular,\nitus essēs,2nd,passive,subjunctive,pluperfect,singular,2nd,regular,\nitus esset,2nd,passive,subjunctive,pluperfect,singular,3rd,regular,\nitī essēmus,2nd,passive,subjunctive,pluperfect,plural,1st,regular,\nīti essētis,2nd,passive,subjunctive,pluperfect,plural,2nd,regular,\nīti essent,2nd,passive,subjunctive,pluperfect,plural,3rd,regular,\nus eram,3rd,passive,indicative,pluperfect,singular,1st,regular,\nus erās,3rd,passive,indicative,pluperfect,singular,2nd,regular,\nus erat,3rd,passive,indicative,pluperfect,singular,3rd,regular,\nī erāmus,3rd,passive,indicative,pluperfect,plural,1st,regular,\nī erātis,3rd,passive,indicative,pluperfect,plural,2nd,regular,\nī erant,3rd,passive,indicative,pluperfect,plural,3rd,regular,\nus essem,3rd,passive,subjunctive,pluperfect,singular,1st,regular,\nus essēs,3rd,passive,subjunctive,pluperfect,singular,2nd,regular,\nus esset,3rd,passive,subjunctive,pluperfect,singular,3rd,regular,\nī essēmus,3rd,passive,subjunctive,pluperfect,plural,1st,regular,\nī essētis,3rd,passive,subjunctive,pluperfect,plural,2nd,regular,\nī essent,3rd,passive,subjunctive,pluperfect,plural,3rd,regular,\nītus eram,4th,passive,indicative,pluperfect,singular,1st,regular,\nītus erās,4th,passive,indicative,pluperfect,singular,2nd,regular,\nītus erat,4th,passive,indicative,pluperfect,singular,3rd,regular,\nītī erāmus,4th,passive,indicative,pluperfect,plural,1st,regular,\nīti erātis,4th,passive,indicative,pluperfect,plural,2nd,regular,\nītī erant,4th,passive,indicative,pluperfect,plural,3rd,regular,\nītus essem,4th,passive,subjunctive,pluperfect,singular,1st,regular,\nītus essēs,4th,passive,subjunctive,pluperfect,singular,2nd,regular,\nītus esset,4th,passive,subjunctive,pluperfect,singular,3rd,regular,\nītī essēmus,4th,passive,subjunctive,pluperfect,plural,1st,regular,\nīti essētis,4th,passive,subjunctive,pluperfect,plural,2nd,regular,\nīti essent,4th,passive,subjunctive,pluperfect,plural,3rd,regular,\nātus erō,1st,passive,indicative,future_perfect,singular,1st,regular,\nātus eris,1st,passive,indicative,future_perfect,singular,2nd,regular,\nātus erit,1st,passive,indicative,future_perfect,singular,3rd,regular,\nāti erimus,1st,passive,indicative,future_perfect,plural,1st,regular,\nāti eritis,1st,passive,indicative,future_perfect,plural,2nd,regular,\nāti erunt,1st,passive,indicative,future_perfect,plural,3rd,regular,\n,1st,passive,subjunctive,future_perfect,singular,1st,,\n,1st,passive,subjunctive,future_perfect,singular,2nd,,\n,1st,passive,subjunctive,future_perfect,singular,3rd,,\n,1st,passive,subjunctive,future_perfect,plural,1st,,\n,1st,passive,subjunctive,future_perfect,plural,2nd,,\n,1st,passive,subjunctive,future_perfect,plural,3rd,,\nitus erō,2nd,passive,indicative,future_perfect,singular,1st,regular,\nitus eris,2nd,passive,indicative,future_perfect,singular,2nd,regular,\nitus erit,2nd,passive,indicative,future_perfect,singular,3rd,regular,\nitī erimus,2nd,passive,indicative,future_perfect,plural,1st,regular,\nitī eritis,2nd,passive,indicative,future_perfect,plural,2nd,regular,\nitī erunt,2nd,passive,indicative,future_perfect,plural,3rd,regular,\n,2nd,passive,subjunctive,future_perfect,singular,1st,,\n,2nd,passive,subjunctive,future_perfect,singular,2nd,,\n,2nd,passive,subjunctive,future_perfect,singular,3rd,,\n,2nd,passive,subjunctive,future_perfect,plural,1st,,\n,2nd,passive,subjunctive,future_perfect,plural,2nd,,\n,2nd,passive,subjunctive,future_perfect,plural,3rd,,\nus erō,3rd,passive,indicative,future_perfect,singular,1st,regular,\nus eris,3rd,passive,indicative,future_perfect,singular,2nd,regular,\nus erit,3rd,passive,indicative,future_perfect,singular,3rd,regular,\nī erimus,3rd,passive,indicative,future_perfect,plural,1st,regular,\nī eritis,3rd,passive,indicative,future_perfect,plural,2nd,regular,\nī erunt,3rd,passive,indicative,future_perfect,plural,3rd,regular,\n,3rd,passive,subjunctive,future_perfect,singular,1st,,\n,3rd,passive,subjunctive,future_perfect,singular,2nd,,\n,3rd,passive,subjunctive,future_perfect,singular,3rd,,\n,3rd,passive,subjunctive,future_perfect,plural,1st,,\n,3rd,passive,subjunctive,future_perfect,plural,2nd,,\n,3rd,passive,subjunctive,future_perfect,plural,3rd,,\nītus erō,4th,passive,indicative,future_perfect,singular,1st,regular,\nītus eris,4th,passive,indicative,future_perfect,singular,2nd,regular,\nītus erit,4th,passive,indicative,future_perfect,singular,3rd,regular,\nītī erimus,4th,passive,indicative,future_perfect,plural,1st,regular,\nītī eritis,4th,passive,indicative,future_perfect,plural,2nd,regular,\nītī erunt,4th,passive,indicative,future_perfect,plural,3rd,regular,\n,4th,passive,subjunctive,future_perfect,singular,1st,,\n,4th,passive,subjunctive,future_perfect,singular,2nd,,\n,4th,passive,subjunctive,future_perfect,singular,3rd,,\n,4th,passive,subjunctive,future_perfect,plural,1st,,\n,4th,passive,subjunctive,future_perfect,plural,2nd,,\n,4th,passive,subjunctive,future_perfect,plural,3rd,,"

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "Index,Text\n2,Chiefly in poetry.\n3,\"In tenses based on the perfect stem (the perfect, pluperfect and future perfect of the Active voice) a v between two vowels is often lost with contraction of the two vowels, thus āvī to ā, ēvī to ē, ōvi to ō. Perfects in īvī often omit the v but rarely contract the vowels, except before ss or st, and sometimes in the third person. In addition to the use of v or u, the Active perfect stem can also be formed in a number of other ways, such as the addition of s to the root (eg carpsi), reduplication of the root (eg cecidi from cado), and simple lengthening of the vowel (eg vidī from video or legī from lego).\"\n4,\"Dic, duc, fac, and fer lack a final vowel in the imperative in classical Latin. The singular imperative of the verb sciō is always scītō, and the plural is usually scītōte.\"\n5,Common in epic poetry.\n6,Present in early Latin but chiefly confined to popular use until Livy and later writers.\n7,The verb fīō is a 4th conjugation verb that is irregular in only two forms: the present infinitive fierī and the imperfect subjunctive fierem."

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export language */
/* unused harmony export parts */
/* unused harmony export numbers */
/* unused harmony export cases */
/* unused harmony export declensions */
/* unused harmony export genders */
/* unused harmony export types */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dataSet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_papaparse__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_papaparse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_papaparse__);
/*
 * Latin language data module
 */





/*import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv';*/


// A language of this module
const language = __WEBPACK_IMPORTED_MODULE_0__lib_js__["e" /* languages */].greek;
// Create a language data set that will keep all language-related information
let dataSet = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["c" /* LanguageDataset */](language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
const parts = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.part, ['noun', 'adjective', 'verb'],{});
const numbers = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.number, ['singular', 'dual', 'plural'],{});
numbers.addImporter(importerName)
    .map('singular', numbers.singular)
    .map('dual', numbers.dual)
    .map('plural', numbers.plural);
const cases = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'vocative'],{});
cases.addImporter(importerName)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('vocative', cases.vocative);
const declensions = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.declension, ['first', 'second', 'third'],{});
declensions.addImporter(importerName)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third);
const genders = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.gender, ['masculine', 'feminine', 'neuter'],{});
genders.addImporter(importerName)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.type, ['regular', 'irregular'],{});
types.addImporter(importerName)
    .map('regular', types.regular)
    .map('irregular', types.irregular);
/*const conjugations = new Models.FeatureType(Lib.types.conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = new Models.FeatureType(Lib.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = new Models.FeatureType(Lib.types.voice, ['passive', 'active']);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = new Models.FeatureType(Lib.types.mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = new Models.FeatureType(Lib.types.person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third);*/
const footnotes = new __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["c" /* FeatureType */](__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.footnote, [],{});

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function(partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-';

    // First row are headers
    for (let i = 1; i < data.length; i++) {
        let dataItem = data[i];
        let suffixValue = dataItem[0];
        // Handle special suffix values
        if (suffixValue === noSuffixValue) {
            suffixValue = null;
        }

        let primary = false;
        let features = [partOfSpeech,
            numbers.importer.csv.get(dataItem[1]),
            cases.importer.csv.get(dataItem[2]),
            declensions.importer.csv.get(dataItem[3]),
            genders.importer.csv.get(dataItem[4]),
            types.importer.csv.get(dataItem[5])];
        if (dataItem[6] === 'primary') {
            primary = true;
        }
        if (dataItem[7]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = dataItem[7].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        let extendedGreekData = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["a" /* ExtendedGreekData */]();
        extendedGreekData.primary = primary;
        let extendedLangData = {
            [__WEBPACK_IMPORTED_MODULE_0__lib_js__["e" /* languages */].greek]: extendedGreekData
        };
        this.addSuffix(suffixValue, features, extendedLangData);
    }
};

// For verbs
dataSet.addVerbSuffixes = function(partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
    let noSuffixValue = '-';

    // First row are headers
    for (let i = 1; i < data.length; i++) {
        let suffix = data[i][0];
        // Handle special suffix values
        if (suffix === noSuffixValue) {
            suffix = null;
        }

        let features = [partOfSpeech,
            conjugations.importer.csv.get(data[i][1]),
            voices.importer.csv.get(data[i][2]),
            moods.importer.csv.get(data[i][3]),
            tenses.importer.csv.get(data[i][4]),
            numbers.importer.csv.get(data[i][5]),
            persons.importer.csv.get(data[i][6])];

        let grammarType = data[i][7];
        // Type information can be empty if no ending is provided
        if (grammarType) {
            features.push(types.importer.csv.get(grammarType));
        }
        // Footnotes
        if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][8].split(' ').map(function(index) {
                return footnotes.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

dataSet.addFootnotes = function(partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
    }
};

dataSet.loadData = function() {
    // Nouns
    let partOfSpeech = parts.noun;
    let suffixes = __WEBPACK_IMPORTED_MODULE_4_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_2__data_noun_suffixes_csv___default.a, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    let footnotes = __WEBPACK_IMPORTED_MODULE_4_papaparse___default.a.parse(__WEBPACK_IMPORTED_MODULE_3__data_noun_footnotes_csv___default.a, {});
    this.addFootnotes(partOfSpeech, footnotes.data);

    // Adjectives
    /*partOfSpeech = parts.adjective;
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
    this.addFootnotes(partOfSpeech, footnotes.data);*/

    // Verbs
    /*partOfSpeech = parts.verb;
    suffixes = papaparse.parse(verbSuffixesCSV, {});
    this.addVerbSuffixes(partOfSpeech, suffixes.data);
    footnotes = papaparse.parse(verbFootnotesCSV, {});
    this.addFootnotes(partOfSpeech, footnotes.data);*/
};


/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet.matcher = function(inflections, suffix) {
    "use strict";
    // All of those features must match between an inflection and an ending
    let obligatoryMatches = [__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [__WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.grmCase, __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.declension, __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.gender, __WEBPACK_IMPORTED_MODULE_1_alpheios_data_models__["a" /* Feature */].types.number];
    let bestMatchData = null; // Information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchData = new __WEBPACK_IMPORTED_MODULE_0__lib_js__["d" /* MatchData */](); // Create a match profile

        if (inflection.suffix === suffix.value) {
            matchData.suffixMatch = true;
        }

        // Check obligatory matches
        for (let feature of  obligatoryMatches) {
            let featureMatch = suffix.featureMatch(feature, inflection[feature]);
            //matchFound = matchFound && featureMatch;

            if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
                break;
            }
            // Inflection's value of this feature is matching the one of the suffix
            matchData.matchedFeatures.push(feature);
        }

        if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
            break;
        }

        // Check optional matches now
        for (let feature of optionalMatches) {
            let matchedValue = suffix.featureMatch(feature, inflection[feature]);
            if (matchedValue) {
                matchData.matchedFeatures.push(feature);
            }
        }

        if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
            // This is a full match
            matchData.fullMatch = true;

            // There can be only one full match, no need to search any further
            suffix.match = matchData;
            return suffix;
        }
        bestMatchData = this.bestMatch(bestMatchData, matchData);
    }
    if (bestMatchData) {
        // There is some match found
        suffix.match = bestMatchData;
        return suffix;
    }
    return null;
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function(matchA, matchB) {
    // If one of the arguments is not set, return the other one
    if (!matchA && matchB) {
        return matchB;
    }

    if (!matchB && matchA) {
        return matchA;
    }

    // Suffix match has a priority
    if (matchA.suffixMatch !== matchB.suffixMatch) {
        if (matchA.suffixMatch > matchB.suffixMatch) {
            return matchA;
        }
        else {
            return matchB;
        }
    }

    // If same on suffix matche, compare by how many features matched
    if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
        // Arbitrarily return matchA if matches are the same
        return matchA;
    }
    else {
        return matchB;
    }
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "Ending,Number,Case,Declension,Gender,Type,Primary,Footnote\nα,dual,accusative,1st,feminine,regular,primary,\nά,dual,accusative,1st,feminine,regular,,\nᾶ,dual,accusative,1st,feminine,regular,,2\nαιν,dual,dative,1st,feminine,regular,primary,\nαῖν,dual,dative,1st,feminine,regular,,\nαιιν,dual,dative,1st,feminine,irregular,,\nαιν,dual,genitive,1st,feminine,regular,primary,\nαῖν,dual,genitive,1st,feminine,regular,,\nαιιν,dual,genitive,1st,feminine,irregular,,\nα,dual,nominative,1st,feminine,regular,primary,\nά,dual,nominative,1st,feminine,regular,,\nᾶ,dual,nominative,1st,feminine,regular,,2\nα,dual,vocative,1st,feminine,regular,primary,\nά,dual,vocative,1st,feminine,regular,,\nᾶ,dual,vocative,1st,feminine,regular,,2\nα,dual,accusative,1st,masculine,regular,primary,\nά,dual,accusative,1st,masculine,regular,,\nᾶ,dual,accusative,1st,masculine,regular,,2\nαιν,dual,dative,1st,masculine,regular,primary,\nαῖν,dual,dative,1st,masculine,regular,,\nαιιν,dual,dative,1st,masculine,irregular,,\nαιν,dual,genitive,1st,masculine,regular,primary,\nαῖν,dual,genitive,1st,masculine,regular,,\nαιιν,dual,genitive,1st,masculine,irregular,,\nα,dual,nominative,1st,masculine,regular,primary,\nά,dual,nominative,1st,masculine,regular,,\nᾶ,dual,nominative,1st,masculine,regular,,2\nα,dual,vocative,1st,masculine,regular,primary,\nά,dual,vocative,1st,masculine,regular,,\nᾶ,dual,vocative,1st,masculine,regular,,2\nας,plural,accusative,1st,feminine,regular,primary,\nάς,plural,accusative,1st,feminine,regular,,\nᾶς,plural,accusative,1st,feminine,regular,,2\nανς,plural,accusative,1st,feminine,irregular,,\nαις,plural,accusative,1st,feminine,irregular,,\nαις,plural,dative,1st,feminine,regular,primary,\nαῖς,plural,dative,1st,feminine,regular,,\nῃσι,plural,dative,1st,feminine,irregular,,44\nῃσιν,plural,dative,1st,feminine,irregular,,4 44\nῃς,plural,dative,1st,feminine,irregular,,44\nαισι,plural,dative,1st,feminine,irregular,,44\nαισιν,plural,dative,1st,feminine,irregular,,4 44\nῶν,plural,genitive,1st,feminine,regular,primary,\nάων,plural,genitive,1st,feminine,irregular,,\nέων,plural,genitive,1st,feminine,irregular,,\nήων,plural,genitive,1st,feminine,irregular,,\nᾶν,plural,genitive,1st,feminine,irregular,,\nαι,plural,nominative,1st,feminine,regular,primary,\nαί,plural,nominative,1st,feminine,regular,,\nαῖ,plural,nominative,1st,feminine,regular,,2\nαι,plural,vocative,1st,feminine,regular,primary,\nαί,plural,vocative,1st,feminine,regular,,\nαῖ,plural,vocative,1st,feminine,regular,,2\nας,plural,accusative,1st,masculine,regular,primary,\nάς,plural,accusative,1st,masculine,regular,,\nᾶς,plural,accusative,1st,masculine,regular,,3\nανς,plural,accusative,1st,masculine,irregular,,\nαις,plural,accusative,1st,masculine,irregular,,\nαις,plural,dative,1st,masculine,regular,primary,\nαῖς,plural,dative,1st,masculine,regular,,\nῃσι,plural,dative,1st,masculine,irregular,,44\nῃσιν,plural,dative,1st,masculine,irregular,,4 44\nῃς,plural,dative,1st,masculine,irregular,,44\nαισι,plural,dative,1st,masculine,irregular,,44\nαισιν,plural,dative,1st,masculine,irregular,,4 44\nῶν,plural,genitive,1st,masculine,regular,primary,\nάων,plural,genitive,1st,masculine,irregular,,\nέων,plural,genitive,1st,masculine,irregular,,\nήων,plural,genitive,1st,masculine,irregular,,\nᾶν,plural,genitive,1st,masculine,irregular,,\nαι,plural,nominative,1st,masculine,regular,primary,\nαί,plural,nominative,1st,masculine,regular,,\nαῖ,plural,nominative,1st,masculine,regular,,3\nαι,plural,vocative,1st,masculine,regular,primary,\nαί,plural,vocative,1st,masculine,regular,,\nαῖ,plural,vocative,1st,masculine,regular,,3\nαν,singular,accusative,1st,feminine,regular,primary,\nην,singular,accusative,1st,feminine,regular,primary,\nήν,singular,accusative,1st,feminine,regular,,\nᾶν,singular,accusative,1st,feminine,regular,,2\nῆν,singular,accusative,1st,feminine,regular,,2\nάν,singular,accusative,1st,feminine,irregular,,63\nᾳ,singular,dative,1st,feminine,regular,primary,\nῃ,singular,dative,1st,feminine,regular,primary,\nῇ,singular,dative,1st,feminine,regular,,2\nᾷ,singular,dative,1st,feminine,regular,,2\nηφι,singular,dative,1st,feminine,irregular,,45\nηφιν,singular,dative,1st,feminine,irregular,,4 45\nῆφι,singular,dative,1st,feminine,irregular,,45\nῆφιv,singular,dative,1st,feminine,irregular,,4 45\nας,singular,genitive,1st,feminine,regular,primary,\nης,singular,genitive,1st,feminine,regular,primary,\nῆs,singular,genitive,1st,feminine,regular,,\nᾶs,singular,genitive,1st,feminine,regular,,2\nηφι,singular,genitive,1st,feminine,irregular,,45\nηφιν,singular,genitive,1st,feminine,irregular,,4 45\nῆφι,singular,genitive,1st,feminine,irregular,,45\nῆφιv,singular,genitive,1st,feminine,irregular,,4 45\nα,singular,nominative,1st,feminine,regular,primary,\nη,singular,nominative,1st,feminine,regular,primary,1\nή,singular,nominative,1st,feminine,regular,,\nᾶ,singular,nominative,1st,feminine,regular,,2\nῆ,singular,nominative,1st,feminine,regular,,2\nά,singular,nominative,1st,feminine,irregular,,63\nα,singular,vocative,1st,feminine,regular,primary,\nη,singular,vocative,1st,feminine,regular,primary,\nή,singular,vocative,1st,feminine,regular,,\nᾶ,singular,vocative,1st,feminine,regular,,2\nῆ,singular,vocative,1st,feminine,regular,,2\nά,singular,vocative,1st,feminine,irregular,,63\nαν,singular,accusative,1st,masculine,regular,primary,\nην,singular,accusative,1st,masculine,regular,primary,3\nήν,singular,accusative,1st,masculine,regular,,\nᾶν,singular,accusative,1st,masculine,regular,,3\nῆν,singular,accusative,1st,masculine,regular,,3\nεα,singular,accusative,1st,masculine,irregular,,\nᾳ,singular,dative,1st,masculine,regular,primary,\nῃ,singular,dative,1st,masculine,regular,primary,\nῇ,singular,dative,1st,masculine,regular,,\nᾷ,singular,dative,1st,masculine,regular,,3\nῆ,singular,dative,1st,masculine,regular,,3\nηφι,singular,dative,1st,masculine,irregular,,45\nηφιν,singular,dative,1st,masculine,irregular,,4 45\nῆφι,singular,dative,1st,masculine,irregular,,45\nῆφιv,singular,dative,1st,masculine,irregular,,4 45\nου,singular,genitive,1st,masculine,regular,primary,\nοῦ,singular,genitive,1st,masculine,regular,,\nαο,singular,genitive,1st,masculine,irregular,,\nεω,singular,genitive,1st,masculine,irregular,,\nηφι,singular,genitive,1st,masculine,irregular,,45\nηφιν,singular,genitive,1st,masculine,irregular,,4 45\nῆφι,singular,genitive,1st,masculine,irregular,,45\nῆφιv,singular,genitive,1st,masculine,irregular,,4 45\nω,singular,genitive,1st,masculine,irregular,,\nα,singular,genitive,1st,masculine,irregular,,\nας,singular,nominative,1st,masculine,regular,primary,\nης,singular,nominative,1st,masculine,regular,primary,\nής,singular,nominative,1st,masculine,regular,,\nᾶs,singular,nominative,1st,masculine,regular,,3\nῆs,singular,nominative,1st,masculine,regular,,3\nα,singular,vocative,1st,masculine,regular,primary,\nη,singular,vocative,1st,masculine,regular,primary,\nά,singular,vocative,1st,masculine,regular,,\nᾶ,singular,vocative,1st,masculine,regular,,3\nῆ,singular,vocative,1st,masculine,regular,,3\nω,dual,accusative,2nd,masculine feminine,regular,primary,\nώ,dual,accusative,2nd,masculine feminine,regular,,5\nοιν,dual,dative,2nd,masculine feminine,regular,primary,\nοῖν,dual,dative,2nd,masculine feminine,regular,,5\nοιιν,dual,dative,2nd,masculine feminine,irregular,,\nῴν,dual,dative,2nd,masculine feminine,irregular,,7\nοιν,dual,genitive,2nd,masculine feminine,regular,primary,\nοῖν,dual,genitive,2nd,masculine feminine,regular,,5\nοιιν,dual,genitive,2nd,masculine feminine,irregular,,\nῴν,dual,genitive,2nd,masculine feminine,irregular,,7\nω,dual,nominative,2nd,masculine feminine,regular,primary,60\nώ,dual,nominative,2nd,masculine feminine,regular,,60\nω,dual,vocative,2nd,masculine feminine,regular,primary,\nώ,dual,vocative,2nd,masculine feminine,regular,,5\nω,dual,accusative,2nd,neuter,regular,primary,\nώ,dual,accusative,2nd,neuter,regular,,6\nοιν,dual,dative,2nd,neuter,regular,primary,\nοῖν,dual,dative,2nd,neuter,regular,,6\nοιιν,dual,dative,2nd,neuter,irregular,,\nοιν,dual,genitive,2nd,neuter,regular,primary,\nοῖν,dual,genitive,2nd,neuter,regular,,6\nοιιν,dual,genitive,2nd,neuter,irregular,,\nω,dual,nominative,2nd,neuter,regular,primary,\nώ,dual,nominative,2nd,neuter,regular,,6\nω,dual,vocative,2nd,neuter,regular,primary,\nώ,dual,vocative,2nd,neuter,regular,,6\nους,plural,accusative,2nd,masculine feminine,regular,primary,\nούς,plural,accusative,2nd,masculine feminine,regular,,41\nοῦς,plural,accusative,2nd,masculine feminine,regular,,5\nονς,plural,accusative,2nd,masculine feminine,irregular,,\nος,plural,accusative,2nd,masculine feminine,irregular,,\nως,plural,accusative,2nd,masculine feminine,irregular,,\nοις,plural,accusative,2nd,masculine feminine,irregular,,\nώς,plural,accusative,2nd,masculine feminine,irregular,,7\nοις,plural,dative,2nd,masculine feminine,regular,primary,\nοῖς,plural,dative,2nd,masculine feminine,regular,,5\nοισι,plural,dative,2nd,masculine feminine,irregular,,\nοισιν,plural,dative,2nd,masculine feminine,irregular,,4\nῴς,plural,dative,2nd,masculine feminine,irregular,,7\nόφι,plural,dative,2nd,masculine feminine,irregular,,45\nόφιv,plural,dative,2nd,masculine feminine,irregular,,4 45\nων,plural,genitive,2nd,masculine feminine,regular,primary,\nῶν,plural,genitive,2nd,masculine feminine,regular,,5\nών,plural,genitive,2nd,masculine feminine,irregular,,7\nόφι,plural,genitive,2nd,masculine feminine,irregular,,45\nόφιv,plural,genitive,2nd,masculine feminine,irregular,,4 45\nοι,plural,nominative,2nd,masculine feminine,regular,primary,\nοί,plural,nominative,2nd,masculine feminine,regular,,41\nοῖ,plural,nominative,2nd,masculine feminine,regular,,5\nῴ,plural,nominative,2nd,masculine feminine,irregular,,7\nοι,plural,vocative,2nd,masculine feminine,regular,primary,\nοί,plural,vocative,2nd,masculine feminine,regular,,41\nοῖ,plural,vocative,2nd,masculine feminine,regular,,5\nα,plural,accusative,2nd,neuter,regular,primary,\nᾶ,plural,accusative,2nd,neuter,regular,,6\nοις,plural,dative,2nd,neuter,regular,primary,\nοῖς,plural,dative,2nd,neuter,regular,,6\nοισι,plural,dative,2nd,neuter,irregular,,\nοισιν,plural,dative,2nd,neuter,irregular,,4\nόφι,plural,dative,2nd,neuter,irregular,,45\nόφιv,plural,dative,2nd,neuter,irregular,,4 45\nων,plural,genitive,2nd,neuter,regular,primary,\nῶν,plural,genitive,2nd,neuter,regular,,6\nόφι,plural,genitive,2nd,neuter,irregular,,45\nόφιv,plural,genitive,2nd,neuter,irregular,,4 45\nα,plural,nominative,2nd,neuter,regular,primary,\nᾶ,plural,nominative,2nd,neuter,regular,,6\nα,plural,vocative,2nd,neuter,regular,primary,\nᾶ,plural,vocative,2nd,neuter,regular,,6\nον,singular,accusative,2nd,masculine feminine,regular,primary,\nόν,singular,accusative,2nd,masculine feminine,regular,primary,41\nουν,singular,accusative,2nd,masculine feminine,regular,,5\nοῦν,singular,accusative,2nd,masculine feminine,regular,,5\nω,singular,accusative,2nd,masculine feminine,irregular,,7 5\nωv,singular,accusative,2nd,masculine feminine,irregular,,7 59\nώ,singular,accusative,2nd,masculine feminine,irregular,,7 42 59\nών,singular,accusative,2nd,masculine feminine,irregular,,7 59\nῳ,singular,dative,2nd,masculine feminine,regular,primary,\nῷ,singular,dative,2nd,masculine feminine,regular,,5\nῴ,singular,dative,2nd,masculine feminine,irregular,,7\nόφι,singular,dative,2nd,masculine feminine,irregular,,45\nόφιv,singular,dative,2nd,masculine feminine,irregular,,4 45\nου,singular,genitive,2nd,masculine feminine,regular,primary,\nοῦ,singular,genitive,2nd,masculine feminine,regular,,5\nοιο,singular,genitive,2nd,masculine feminine,irregular,,\nοο,singular,genitive,2nd,masculine feminine,irregular,,\nω,singular,genitive,2nd,masculine feminine,irregular,,\nώ,singular,genitive,2nd,masculine feminine,irregular,,7\nόφι,singular,genitive,2nd,masculine feminine,irregular,,45\nόφιv,singular,genitive,2nd,masculine feminine,irregular,,4 45\nος,singular,nominative,2nd,masculine feminine,regular,primary,\nους,singular,nominative,2nd,masculine feminine,regular,,5\noῦς,singular,nominative,2nd,masculine feminine,regular,,5\nός,singular,nominative,2nd,masculine feminine,regular,,\nώς,singular,nominative,2nd,masculine feminine,irregular,,7 42\nως,singular,nominative,2nd,masculine feminine,irregular,,\nε,singular,vocative,2nd,masculine feminine,regular,primary,\nέ,singular,vocative,2nd,masculine feminine,regular,,\nοu,singular,vocative,2nd,masculine feminine,regular,,5\nοῦ,singular,vocative,2nd,masculine feminine,regular,,42\nός,singular,vocative,2nd,masculine feminine,irregular,,57\nον,singular,accusative,2nd,neuter,regular,primary,\nοῦν,singular,accusative,2nd,neuter,regular,,6\nῳ,singular,dative,2nd,neuter,regular,primary,\nῷ,singular,dative,2nd,neuter,regular,,6\nόφι,singular,dative,2nd,neuter,irregular,,45\nόφιv,singular,dative,2nd,neuter,irregular,,4 45\nου,singular,genitive,2nd,neuter,regular,primary,\nοῦ,singular,genitive,2nd,neuter,regular,,6\nοο,singular,genitive,2nd,neuter,irregular,,\nοιο,singular,genitive,2nd,neuter,irregular,,\nω,singular,genitive,2nd,neuter,irregular,,\nόφι,singular,genitive,2nd,neuter,irregular,,45\nόφιv,singular,genitive,2nd,neuter,irregular,,4 45\nον,singular,nominative,2nd,neuter,regular,primary,\nοῦν,singular,nominative,2nd,neuter,regular,,6\nον,singular,vocative,2nd,neuter,regular,primary,\nοῦν,singular,vocative,2nd,neuter,regular,,6\nε,dual,accusative,3rd,masculine feminine,regular,primary,\nει,dual,accusative,3rd,masculine feminine,regular,,\nῆ,dual,accusative,3rd,masculine feminine,regular,,18\nω,dual,accusative,3rd,masculine feminine,irregular,,32\nῖ,dual,accusative,3rd,masculine feminine,irregular,,33\nεε,dual,accusative,3rd,masculine feminine,irregular,,16 55 61\nοιν,dual,dative,3rd,masculine feminine,regular,primary,\nοῖν,dual,dative,3rd,masculine feminine,regular,,\nοιιν,dual,dative,3rd,masculine feminine,irregular,,54\nσι,dual,dative,3rd,masculine feminine,irregular,,33 37\nεσσι,dual,dative,3rd,masculine feminine,irregular,,33\nεσι,dual,dative,3rd,masculine feminine,irregular,,33\nέοιν,dual,dative,3rd,masculine feminine,irregular,,16 61\nῳν,dual,dative,3rd,masculine feminine,irregular,,49\nοιν,dual,genitive,3rd,masculine feminine,regular,primary,\nοῖν,dual,genitive,3rd,masculine feminine,regular,,\nοιιν,dual,genitive,3rd,masculine feminine,irregular,,54\nέοιν,dual,genitive,3rd,masculine feminine,irregular,,16 61\nῳν,dual,genitive,3rd,masculine feminine,irregular,,49\nε,dual,nominative,3rd,masculine feminine,regular,primary,\nει,dual,nominative,3rd,masculine feminine,regular,,\nῆ,dual,nominative,3rd,masculine feminine,regular,,18\nω,dual,nominative,3rd,masculine feminine,irregular,,32\nῖ,dual,nominative,3rd,masculine feminine,irregular,,33\nεε,dual,nominative,3rd,masculine feminine,irregular,,16 55 61\nε,dual,vocative,3rd,masculine feminine,regular,primary,\nει,dual,vocative,3rd,masculine feminine,regular,,\nῆ,dual,vocative,3rd,masculine feminine,regular,,18\nω,dual,vocative,3rd,masculine feminine,irregular,,32\nῖ,dual,vocative,3rd,masculine feminine,irregular,,33\nεε,dual,vocative,3rd,masculine feminine,irregular,,16 55 61\nε,dual,accusative,3rd,neuter,regular,primary,\nει,dual,accusative,3rd,neuter,regular,,\nα,dual,accusative,3rd,neuter,regular,,\nεε,dual,accusative,3rd,neuter,irregular,,16 61\nαε,dual,accusative,3rd,neuter,irregular,,16 61\nοιν,dual,dative,3rd,neuter,regular,primary,\nῷν,dual,dative,3rd,neuter,regular,,\nοις,dual,dative,3rd,neuter,irregular,,33 38\nοισι,dual,dative,3rd,neuter,irregular,,33 38\nοισι(ν),dual,dative,3rd,neuter,irregular,,4 33 38\nοιιν,dual,dative,3rd,neuter,irregular,,\nέοιν,dual,dative,3rd,neuter,irregular,,16 61\nάοιν,dual,dative,3rd,neuter,irregular,,16 61\nοιν,dual,genitive,3rd,neuter,regular,primary,\nῷν,dual,genitive,3rd,neuter,regular,,\nων,dual,genitive,3rd,neuter,irregular,,33 38\nοιιν,dual,genitive,3rd,neuter,irregular,,\nέοιν,dual,genitive,3rd,neuter,irregular,,16 61\nάοιν,dual,genitive,3rd,neuter,irregular,,16 61\nε,dual,nominative,3rd,neuter,regular,primary,\nει,dual,nominative,3rd,neuter,regular,,\nα,dual,nominative,3rd,neuter,regular,,\nεε,dual,nominative,3rd,neuter,irregular,,16 61\nαε,dual,nominative,3rd,neuter,irregular,,16 61\nε,dual,vocative,3rd,neuter,regular,primary,\nει,dual,vocative,3rd,neuter,regular,,\nα,dual,vocative,3rd,neuter,regular,,\nεε,dual,vocative,3rd,neuter,irregular,,16 61\nαε,dual,vocative,3rd,neuter,irregular,,16 61\nας,plural,accusative,3rd,masculine feminine,regular,primary,\nεις,plural,accusative,3rd,masculine feminine,regular,,17 41\nες,plural,accusative,3rd,masculine feminine,regular,,\nς,plural,accusative,3rd,masculine feminine,regular,,\nῦς,plural,accusative,3rd,masculine feminine,regular,,17 18 48\nως,plural,accusative,3rd,masculine feminine,regular,,30\nῆς,plural,accusative,3rd,masculine feminine,irregular,,56\nέας,plural,accusative,3rd,masculine feminine,irregular,,\nέος,plural,accusative,3rd,masculine feminine,irregular,,\nῆος,plural,accusative,3rd,masculine feminine,irregular,,\nῆες,plural,accusative,3rd,masculine feminine,irregular,,\nῆας,plural,accusative,3rd,masculine feminine,irregular,,\nους,plural,accusative,3rd,masculine feminine,irregular,,32\nούς,plural,accusative,3rd,masculine feminine,irregular,,32\nεῖς,plural,accusative,3rd,masculine feminine,irregular,,31 41\nεες,plural,accusative,3rd,masculine feminine,irregular,,55 61\nις,plural,accusative,3rd,masculine feminine,irregular,,\nινς,plural,accusative,3rd,masculine feminine,irregular,,\nῶς,plural,accusative,3rd,masculine feminine,irregular,,48\nσι,plural,dative,3rd,masculine feminine,regular,primary,\nσιν,plural,dative,3rd,masculine feminine,regular,primary,4\nσί,plural,dative,3rd,masculine feminine,regular,,41\nσίν,plural,dative,3rd,masculine feminine,regular,,4 41\nεσι,plural,dative,3rd,masculine feminine,regular,,41\nεσιν,plural,dative,3rd,masculine feminine,regular,,4 41\nέσι,plural,dative,3rd,masculine feminine,regular,,\nέσιν,plural,dative,3rd,masculine feminine,regular,,4\nψι,plural,dative,3rd,masculine feminine,regular,,\nψιν,plural,dative,3rd,masculine feminine,regular,,4\nψί,plural,dative,3rd,masculine feminine,regular,,\nψίν,plural,dative,3rd,masculine feminine,regular,,4\nξι,plural,dative,3rd,masculine feminine,regular,,\nξιν,plural,dative,3rd,masculine feminine,regular,,4\nξί,plural,dative,3rd,masculine feminine,regular,,\nξίν,plural,dative,3rd,masculine feminine,regular,,4\nφι,plural,dative,3rd,masculine feminine,irregular,,45\nφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nηφι,plural,dative,3rd,masculine feminine,irregular,,45\nηφιv,plural,dative,3rd,masculine feminine,irregular,,4 45\nῆφι,plural,dative,3rd,masculine feminine,irregular,,45\nῆφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nόφι,plural,dative,3rd,masculine feminine,irregular,,45\nόφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nαις,plural,dative,3rd,masculine feminine,irregular,,33 41\nοῖσι,plural,dative,3rd,masculine feminine,irregular,,33\nοῖσιv,plural,dative,3rd,masculine feminine,irregular,,4 33\nεσσι,plural,dative,3rd,masculine feminine,irregular,,16 61\nεσσιv,plural,dative,3rd,masculine feminine,irregular,,4 16 61\nυσσι,plural,dative,3rd,masculine feminine,irregular,,54\nυσσιv,plural,dative,3rd,masculine feminine,irregular,,4 54\nσσί,plural,dative,3rd,masculine feminine,irregular,,54\nσσίv,plural,dative,3rd,masculine feminine,irregular,,4 54\nων,plural,genitive,3rd,masculine feminine,regular,primary,\nῶν,plural,genitive,3rd,masculine feminine,regular,,\n-,plural,genitive,3rd,masculine feminine,irregular,,41\nφι,plural,genitive,3rd,masculine feminine,irregular,,45\nφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nηφι,plural,genitive,3rd,masculine feminine,irregular,,45\nηφιv,plural,genitive,3rd,masculine feminine,irregular,,4 45\nῆφι,plural,genitive,3rd,masculine feminine,irregular,,45\nῆφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nόφι,plural,genitive,3rd,masculine feminine,irregular,,45\nόφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nέων,plural,genitive,3rd,masculine feminine,irregular,,16 61\nες,plural,nominative,3rd,masculine feminine,regular,primary,\nως,plural,nominative,3rd,masculine feminine,regular,,30\nεις,plural,nominative,3rd,masculine feminine,regular,,17\nεῖς,plural,nominative,3rd,masculine feminine,regular,,18\nοί,plural,nominative,3rd,masculine feminine,irregular,,32\nαί,plural,nominative,3rd,masculine feminine,irregular,,33\nῆς,plural,nominative,3rd,masculine feminine,irregular,,18\nῄς,plural,nominative,3rd,masculine feminine,irregular,,31 41\nεες,plural,nominative,3rd,masculine feminine,irregular,,16 55 61\nοι,plural,nominative,3rd,masculine feminine,irregular,,33\nες,plural,vocative,3rd,masculine feminine,regular,primary,\nεις,plural,vocative,3rd,masculine feminine,regular,,17\nεῖς,plural,vocative,3rd,masculine feminine,regular,,18\nῆς,plural,vocative,3rd,masculine feminine,regular,,18\nως,plural,vocative,3rd,masculine feminine,regular,,30\nεες,plural,vocative,3rd,masculine feminine,irregular,,16 55 61\nα,plural,accusative,3rd,neuter,regular,primary,\nη,plural,accusative,3rd,neuter,regular,,\nς,plural,accusative,3rd,neuter,regular,,\nά,plural,accusative,3rd,neuter,irregular,,33\nαα,plural,accusative,3rd,neuter,irregular,,16 61\nεα,plural,accusative,3rd,neuter,irregular,,16 61\nσι,plural,dative,3rd,neuter,regular,primary,\nσιν,plural,dative,3rd,neuter,regular,primary,4\nσί,plural,dative,3rd,neuter,regular,,\nσίv,plural,dative,3rd,neuter,regular,,4\nασι,plural,dative,3rd,neuter,regular,,\nασιν,plural,dative,3rd,neuter,regular,,4\nεσι,plural,dative,3rd,neuter,regular,,\nεσιν,plural,dative,3rd,neuter,regular,,4\nέσι,plural,dative,3rd,neuter,regular,,\nέσιv,plural,dative,3rd,neuter,regular,,4\nεσσι,plural,dative,3rd,neuter,irregular,,54\nεσσιν,plural,dative,3rd,neuter,irregular,,4 54\nσσί,plural,dative,3rd,neuter,irregular,,54\nσσίv,plural,dative,3rd,neuter,irregular,,4 54\nασσι,plural,dative,3rd,neuter,irregular,,54\nασσιν,plural,dative,3rd,neuter,irregular,,4 54\nφι,plural,dative,3rd,neuter,irregular,,45\nφιν,plural,dative,3rd,neuter,irregular,,4 45\nηφι,plural,dative,3rd,neuter,irregular,,45\nηφιv,plural,dative,3rd,neuter,irregular,,4 45\nῆφι,plural,dative,3rd,neuter,irregular,,45\nῆφιν,plural,dative,3rd,neuter,irregular,,4 45\nόφι,plural,dative,3rd,neuter,irregular,,45\nόφιν,plural,dative,3rd,neuter,irregular,,4 45\nων,plural,genitive,3rd,neuter,regular,primary,\nῶν,plural,genitive,3rd,neuter,regular,primary,\nφι,plural,genitive,3rd,neuter,irregular,,\nφιν,plural,genitive,3rd,neuter,irregular,,4 45\nηφι,plural,genitive,3rd,neuter,irregular,,45\nηφιv,plural,genitive,3rd,neuter,irregular,,4 45\nῆφι,plural,genitive,3rd,neuter,irregular,,45\nῆφιν,plural,genitive,3rd,neuter,irregular,,4 45\nόφι,plural,genitive,3rd,neuter,irregular,,45\nόφιν,plural,genitive,3rd,neuter,irregular,,4 45\nέων,plural,genitive,3rd,neuter,irregular,,16 61\nάων,plural,genitive,3rd,neuter,irregular,,16 61\nα,plural,nominative,3rd,neuter,regular,primary,\nη,plural,nominative,3rd,neuter,regular,,\nες,plural,nominative,3rd,neuter,regular,,\nά,plural,nominative,3rd,neuter,irregular,,33\nεα,plural,nominative,3rd,neuter,irregular,,16 61\nαα,plural,nominative,3rd,neuter,irregular,,16 61\nα,plural,vocative,3rd,neuter,regular,primary,\nη,plural,vocative,3rd,neuter,regular,,\nες,plural,vocative,3rd,neuter,regular,,\nαα,plural,vocative,3rd,neuter,irregular,,16 61\nεα,plural,vocative,3rd,neuter,irregular,,16 61\nα,singular,accusative,3rd,masculine feminine,regular,primary,\nη,singular,accusative,3rd,masculine feminine,regular,,16\nν,singular,accusative,3rd,masculine feminine,regular,,\nιν,singular,accusative,3rd,masculine feminine,regular,,41\nῦν,singular,accusative,3rd,masculine feminine,regular,,18\nῶ,singular,accusative,3rd,masculine feminine,regular,,23\nυν,singular,accusative,3rd,masculine feminine,regular,,\nῦν,singular,accusative,3rd,masculine feminine,regular,,17\nύν,singular,accusative,3rd,masculine feminine,regular,,17\nέα,singular,accusative,3rd,masculine feminine,regular,,20\nην,singular,accusative,3rd,masculine feminine,regular,,24\nώ,singular,accusative,3rd,masculine feminine,regular,,19 41\nω,singular,accusative,3rd,masculine feminine,regular,,23\nεῖν,singular,accusative,3rd,masculine feminine,irregular,,31 41\nων,singular,accusative,3rd,masculine feminine,irregular,,33 41 49\nαν,singular,accusative,3rd,masculine feminine,irregular,,33 41\nον,singular,accusative,3rd,masculine feminine,irregular,,39\nῖς,singular,accusative,3rd,masculine feminine,irregular,,33\nεα,singular,accusative,3rd,masculine feminine,irregular,,61\nι,singular,dative,3rd,masculine feminine,regular,primary,\nί,singular,dative,3rd,masculine feminine,regular,,\nϊ,singular,dative,3rd,masculine feminine,regular,,17\nΐ,singular,dative,3rd,masculine feminine,regular,,40\nει,singular,dative,3rd,masculine feminine,regular,,16 17\nεῖ,singular,dative,3rd,masculine feminine,regular,,18\nαι,singular,dative,3rd,masculine feminine,regular,,\noῖ,singular,dative,3rd,masculine feminine,regular,,28 41\nῖ,singular,dative,3rd,masculine feminine,irregular,,33 46\nῆι,singular,dative,3rd,masculine feminine,irregular,,18\nᾳ,singular,dative,3rd,masculine feminine,irregular,,25\nῳ,singular,dative,3rd,masculine feminine,irregular,,33 34\nῷ,singular,dative,3rd,masculine feminine,irregular,,33\nιί,singular,dative,3rd,masculine feminine,irregular,,62\nυί,singular,dative,3rd,masculine feminine,irregular,,62\nέϊ,singular,dative,3rd,masculine feminine,irregular,,18 61\nος,singular,genitive,3rd,masculine feminine,regular,primary,\nός,singular,genitive,3rd,masculine feminine,regular,,\nους,singular,genitive,3rd,masculine feminine,regular,,16\nοῦς,singular,genitive,3rd,masculine feminine,regular,,19 46\nως,singular,genitive,3rd,masculine feminine,regular,,17 18\nώς,singular,genitive,3rd,masculine feminine,regular,,17 18 41\nῶς,singular,genitive,3rd,masculine feminine,regular,,47\nεως,singular,genitive,3rd,masculine feminine,regular,,17\nέως,singular,genitive,3rd,masculine feminine,regular,,\nεώς,singular,genitive,3rd,masculine feminine,regular,,\nέους,singular,genitive,3rd,masculine feminine,regular,,20\nω,singular,genitive,3rd,masculine feminine,irregular,,\nεος,singular,genitive,3rd,masculine feminine,irregular,,61\nΰς,singular,genitive,3rd,masculine feminine,irregular,,41 48\nῦς,singular,genitive,3rd,masculine feminine,irregular,,48\nνος,singular,genitive,3rd,masculine feminine,irregular,,22\nοῦ,singular,genitive,3rd,masculine feminine,irregular,,33\nηος,singular,genitive,3rd,masculine feminine,irregular,,55\nιός,singular,genitive,3rd,masculine feminine,irregular,,62\nuός,singular,genitive,3rd,masculine feminine,irregular,,62\nς,singular,nominative,3rd,masculine feminine,regular,primary,\n-,singular,nominative,3rd,masculine feminine,regular,primary,\nηρ,singular,nominative,3rd,masculine feminine,regular,,41\nις,singular,nominative,3rd,masculine feminine,regular,,\nϊς,singular,nominative,3rd,masculine feminine,regular,,\nώ,singular,nominative,3rd,masculine feminine,regular,,41\nψ,singular,nominative,3rd,masculine feminine,regular,,\nξ,singular,nominative,3rd,masculine feminine,regular,,\nρ,singular,nominative,3rd,masculine feminine,regular,,\nήρ,singular,nominative,3rd,masculine feminine,regular,,\nήν,singular,nominative,3rd,masculine feminine,regular,,50\nν,singular,nominative,3rd,masculine feminine,regular,,\nωρ,singular,nominative,3rd,masculine feminine,regular,,\nων,singular,nominative,3rd,masculine feminine,regular,,\nών,singular,nominative,3rd,masculine feminine,regular,,\nης,singular,nominative,3rd,masculine feminine,regular,,\nῆς,singular,nominative,3rd,masculine feminine,regular,,\nυς,singular,nominative,3rd,masculine feminine,regular,,\nῦς,singular,nominative,3rd,masculine feminine,regular,,\nεῦς,singular,nominative,3rd,masculine feminine,regular,,\nύς,singular,nominative,3rd,masculine feminine,regular,,\nής,singular,nominative,3rd,masculine feminine,regular,,33\nας,singular,nominative,3rd,masculine feminine,irregular,,\nῴ,singular,nominative,3rd,masculine feminine,irregular,,29 41\nώς,singular,nominative,3rd,masculine feminine,irregular,,27 41\nϋς,singular,nominative,3rd,masculine feminine,irregular,,41\nῄς,singular,nominative,3rd,masculine feminine,irregular,,31 41\nῖς,singular,nominative,3rd,masculine feminine,irregular,,\nεῖς,singular,nominative,3rd,masculine feminine,irregular,,31 41\nῶς,singular,nominative,3rd,masculine feminine,irregular,,48\nος,singular,nominative,3rd,masculine feminine,irregular,,33\n-,singular,vocative,3rd,masculine feminine,regular,primary,52\nς,singular,vocative,3rd,masculine feminine,regular,,30\nι,singular,vocative,3rd,masculine feminine,regular,,41\nῦ,singular,vocative,3rd,masculine feminine,regular,,15 17 18\nοῖ,singular,vocative,3rd,masculine feminine,regular,,19 41\nψ,singular,vocative,3rd,masculine feminine,regular,,\nξ,singular,vocative,3rd,masculine feminine,regular,,\nν,singular,vocative,3rd,masculine feminine,regular,,\nρ,singular,vocative,3rd,masculine feminine,regular,,\nων,singular,vocative,3rd,masculine feminine,regular,,50\nών,singular,vocative,3rd,masculine feminine,regular,,\nήν,singular,vocative,3rd,masculine feminine,regular,,\nερ,singular,vocative,3rd,masculine feminine,regular,,\nες,singular,vocative,3rd,masculine feminine,regular,,\nί,singular,vocative,3rd,masculine feminine,regular,,\nως,singular,vocative,3rd,masculine feminine,regular,,\nἶ,singular,vocative,3rd,masculine feminine,regular,,\nούς,singular,vocative,3rd,masculine feminine,regular,,51\nύ,singular,vocative,3rd,masculine feminine,regular,,15\nυ,singular,vocative,3rd,masculine feminine,regular,,51\nεις,singular,vocative,3rd,masculine feminine,regular,,20\nαν,singular,vocative,3rd,masculine feminine,regular,,\nώς,singular,vocative,3rd,masculine feminine,irregular,,27 41 46\nον,singular,vocative,3rd,masculine feminine,irregular,,\nυς,singular,vocative,3rd,masculine feminine,irregular,,33\nα,singular,accusative,3rd,neuter,regular,primary,15\n-,singular,accusative,3rd,neuter,regular,,33\nος,singular,accusative,3rd,neuter,regular,,\nας,singular,accusative,3rd,neuter,regular,,\nαρ,singular,accusative,3rd,neuter,regular,,21\nυ,singular,accusative,3rd,neuter,regular,,\nι,singular,dative,3rd,neuter,regular,primary,\nει,singular,dative,3rd,neuter,regular,,16\nαι,singular,dative,3rd,neuter,regular,,16 21\nϊ,singular,dative,3rd,neuter,irregular,,17\nᾳ,singular,dative,3rd,neuter,irregular,,25 33\nυϊ,singular,dative,3rd,neuter,irregular,,17\nαϊ,singular,dative,3rd,neuter,irregular,,21 61\nος,singular,genitive,3rd,neuter,regular,primary,\nους,singular,genitive,3rd,neuter,regular,,16\nως,singular,genitive,3rd,neuter,regular,,16\nεως,singular,genitive,3rd,neuter,regular,,17\nυς,singular,genitive,3rd,neuter,irregular,,26\nου,singular,genitive,3rd,neuter,irregular,,33\nαος,singular,genitive,3rd,neuter,irregular,,21 61\nα,singular,nominative,3rd,neuter,regular,primary,\n-,singular,nominative,3rd,neuter,regular,,33\nος,singular,nominative,3rd,neuter,regular,,\nαρ,singular,nominative,3rd,neuter,regular,,\nας,singular,nominative,3rd,neuter,regular,,16 21\nυ,singular,nominative,3rd,neuter,regular,,\nον,singular,nominative,3rd,neuter,irregular,,33\nα,singular,vocative,3rd,neuter,regular,primary,15\n-,singular,vocative,3rd,neuter,regular,,\nος,singular,vocative,3rd,neuter,regular,,\nας,singular,vocative,3rd,neuter,regular,,\nαρ,singular,vocative,3rd,neuter,regular,,21\nυ,singular,vocative,3rd,neuter,regular,,"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "Index,Text\n1,See  for Rules of variance within regular endings\n2,See  for Table of α- and ε- stem feminine 1st declension contracts\n3,See  for Table of α- and ε- stem masculine 1st declension contracts\n4,\"Previous, with (ν)\"\n5,See  for Table of o- and ε- stem masculine  2nd declension contracts\n6,See  for Table of o- and ε- stem neuter 2nd declension contracts\n7,(Attic) contracts of o-stems preceded by a long vowel\n15,\"This is not actually an “ending,” but the last letter of the “pure stem”. See\"\n16,\"See  &  for Table of Sigma (ες,ας,ος) stem contracts\"\n17,See  for Table of  ι and υ - stem contracts\n18,\"See  for Table of  ευ,αυ,and ου - stem contracts\"\n19,See  for stems in οι feminine 3rd declension contracts\n20,See  for Table of 3rd declension contracts of stems in -εσ- preceded by ε\n21,See  for Table of stems in τ and ατ neuter 3rd declension contracts\n22,\"On stem ending in ν, ν doubled in gen. Sing Aeolic (e.g. μῆνς,μῆννος...)\"\n23,Also in inscriptions and expressions of swearing\n24,(Borrowed from 1st decl) Sometimes in proper names whose nominative ends in -ης\n25,From -ας-stems (properly αι)\n26,(ε)υς instead of (ε)ος or ους (gen) for (3rd decl) words whose nominative ends in -ος\n27,In 3rd decl. Only in the words αἰδώς (Attic) and ἠώς (Homer and Ionic)\n28,Contraction of a stem in οι  and an ι-ending\n29,Stronger form of Ionic contractions of οι-stems (in the nominative)\n30,See  for Table of ω - stem contracts (masculine only)\n31,Nominative plural contraction of  -ειδ+ες  after dropping the δ (used for accusative too). See .a\n32,\"Plurals & duals occur rarely (and w/ 2nd decl endings) for 3rd decl οι-stem nouns. See .D.a,b,c\"\n33,See  for description and examples of Irreg. Decl involving 3rd decl endings\n34,(Homer)  for Attic  (ῳτ)ι\n35,(Homer) for Cretan ινς\n36,Also an irregular ending for other stem(s)\n37,In inscriptions\n38,\"Plural endings for otherwise dual noun,οσσε (eyes)\"\n39,\"“Poetical” (acc for ἔρως). See ,11\"\n40,\"Poetic for χρωτι,dat. of ὁ χρως\"\n41,No Masculine of this Form\n42,No Feminine of this Form\n44,See  D.9 and #215 regarding dialectic alternate forms of the Dative Plural\n45,\"Surviving in Homer (See ) Not truly genitive or dative, but instrumental/locative/ablative, associated with the remaining oblique cases (genitive & dative) only after being lost as cases themselves in Greek\"\n46,See Smyth # 266 for only surviving ος-stem in Attic (fem. singular of αἰδως)\n47,See  for Substantives in -εύς preceded by a vowel.\n48,\"See Smyth,  #275 D.1,2,3\"\n49,\"See , List of Principal Irregular Substantives\"\n50,\"See  for Table of stems in a Liquid (λ,ρ) or a Nasal (ν), and Note #259D for variants including Κρονίων...\"\n51,\"See  for Table of stems in a Dental (τ,δ,θ) or a Nasal (ν), and its notes including Ν.κόρυς (Voc. Κόρυ) & ὀδούς\"\n52,See  for general rule re 3rd Declension Masc/Fem Singular Vocative\n54,See  D\n55,See\n56,\"See  for other forms of endings for contracts of ευ,αυ,and ου - stems\"\n57,Nominative form used as Vocative. See\n58,\"See ,b\"\n59,\"See ,d\"\n60,This (Feminine or Masculine) Form only Masculine when derived from ε- or ο- contraction\n61,See Smyth Note 264 D.1 regarding Homer's use of Open Forms\n62,See Smyth Note 269 for alternate i-stem and u-stem endings\n63,See  D.2\n64,See  D.1"

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(this, function (module) {
  /* webextension-polyfill - v0.2.1 - Thu Oct 12 2017 12:31:04 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined") {
    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = () => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "export": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "import": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            }
          }
        },
        "downloads": {
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getBrowserInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (chrome.runtime.lastError) {
            promise.reject(chrome.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length === 1) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            target[name](...args, makeCallback({ resolve, reject }, metadata));
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the orginal method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);

        let handlers = {
          has(target, prop) {
            return prop in target || prop in cache;
          },

          get(target, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });

              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(target, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },

          defineProperty(target, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(target, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        return new Proxy(target, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });

      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let result = listener(message, sender);

          if (isThenable(result)) {
            result.then(sendResponse, error => {
              console.error(error);
              sendResponse(error);
            });

            return true;
          } else if (result !== undefined) {
            sendResponse(result);
          }
        };
      });

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers)
        }
      };

      // Create a new empty object and copy the properties of the original chrome object
      // to prevent a Proxy violation exception for the devtools API getter
      // (which is a read-only non-configurable property on the original target).
      const targetObject = Object.assign({}, chrome);

      return wrapObject(targetObject, staticWrappers, apiMetadata);
    };

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(); // eslint-disable-line no-undef
  } else {
    module.exports = browser; // eslint-disable-line no-undef
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map