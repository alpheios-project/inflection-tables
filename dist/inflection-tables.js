(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature$1 {

    /**
     * Initializes a Feature object
     * @param {string | string[]} value - A single feature value or, if this feature could have multiple
     * values, an array of values.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {LanguageModel} language - A language of a feature, allowed values are specified in 'languages' object.
     */
    constructor (value, type, language) {
        if (!Feature$1.types.isAllowed(type)) {
            throw new Error('Features of "' + type + '" type are not supported.');
        }
        if (!value) {
            throw new Error('Feature should have a non-empty value.');
        }
        if (!type) {
            throw new Error('Feature should have a non-empty type.');
        }
        if (!language || ! language instanceof LanguageModel) {
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
Feature$1.types = {
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
class FeatureType$1 {
    // TODO: value checking
    /**
     * Creates and initializes a Feature Type object.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string[] | string[][]} values - A list of allowed values for this feature type.
     * If an empty array is provided, there will be no
     * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
     * such as footnotes).
     * @param {LanguageModel} language - A language of a feature, allowed values are specified in 'languages' object.
     */
    constructor(type, values, language) {
        if (!Feature$1.types.isAllowed(type)) {
            throw new Error('Features of "' + type + '" type are not supported.');
        }
        if (!values || !Array.isArray(values)) {
            throw new Error('Values should be an array (or an empty array) of values.');
        }
        if (!language || ! language instanceof LanguageModel) {
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
                    this[element] = new Feature$1(element, this.type, this.language);
                    this._orderLookup[element] = index;
                }
            }
            else {
                this[value] = new Feature$1(value, this.type, this.language);
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
            return new Feature$1(value, this.type, this.language);
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
        return this.orderedValues.map((value) => new Feature$1(value, this.type, this.language));
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

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel$1 extends LanguageModel {

   /**
   */
   constructor() {
     super();
     this.source_language = LanguageModel.LANG_LATIN;
     this.context_forward = 0;
     this.context_backward = 0;
     this.direction = LanguageModel.DIR_LTR;
     this.base_unit = LanguageModel.UNIT_WORD;
     this.language_codes = ['la','lat'];
     this.features = this._initializeFeatures();
   }

   static supportsLanguage(a_code) {
     return ['la','lat'].includes(a_code);
   }

   _initializeFeatures() {
     let features = {};
     features[Feature$1.types.part] = new FeatureType$1(Feature$1.types.part, ['noun', 'adjective', 'verb'],this);
     features[Feature$1.types.number] = new FeatureType$1(Feature$1.types.number, ['singular', 'plural'],this);
     features[Feature$1.types.grmCase] = new FeatureType$1(Feature$1.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'ablative', 'locative', 'vocative'],this);
     features[Feature$1.types.declension] = new FeatureType$1(Feature$1.types.declension, ['first', 'second', 'third', 'fourth', 'fifth'],this);
     features[Feature$1.types.gender] = new FeatureType$1(Feature$1.types.gender, ['masculine', 'feminine', 'neuter'],this);
     features[Feature$1.types.type] = new FeatureType$1(Feature$1.types.type, ['regular', 'irregular'],this);
     features[Feature$1.types.tense] = new FeatureType$1(Feature$1.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],this);
     features[Feature$1.types.voice] = new FeatureType$1(Feature$1.types.voice, ['passive', 'active'],this);
     features[Feature$1.types.mood] = new FeatureType$1(Feature$1.types.mood, ['indicative', 'subjunctive'],this);
     features[Feature$1.types.person] =new FeatureType$1(Feature$1.types.person, ['first', 'second', 'third'],this);
     features[Feature$1.types.conjugation] = new FeatureType$1(Feature$1.types.conjugation, ['first', 'second', 'third', 'fourth'],this);
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

/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList$1 {

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
     * @param {LanguageModel} language - A word's language.
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
            if (!(element instanceof Feature$1)) {
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

/**
 * A basic unit of lexical meaning. Contains a Lemma object and one or more Inflection objects.
 */
class Lexeme {
    /**
     * Initializes a Lexeme object.
     * @param {Lemma} lemma - A lemma object.
     * @param {Inflection[]} inflections - An array of inflections.
     */
    constructor(lemma, inflections) {
        if (!lemma) {
            throw new Error('Lemma should not be empty.');
        }

        if (!(lemma instanceof Lemma)) {
            throw new Error('Lemma should be of Lemma object type.');
        }

        if (!inflections) {
            throw new Error('Inflections data should not be empty.');
        }

        if (!Array.isArray(inflections)) {
            throw new Error('Inflection data should be provided in an array.');
        }

        for (let inflection of inflections) {
            if (!(inflection instanceof Inflection)) {
                throw new Error('All inflection data should be of Inflection object type.');
            }
        }

        this.lemma = lemma;
        this.inflections = inflections;
    }

    static readObject(jsonObject) {
        let lemma = Lemma.readObject(jsonObject.lemma);
        let inflections = [];
        for (let inflection of jsonObject.inflections) {
            inflections.push(Inflection.readObject(inflection));
        }
        return new Lexeme(lemma, inflections);
    }
}

class Homonym$1 {
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
            if (!(lexeme instanceof Lexeme)) {
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
                lexemes.push(Lexeme.readObject(lexeme));
            }
        }
        let homonym = new Homonym$1(lexemes);
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

const languages = {
    type: 'language',
    latin: 'latin',
    greek: 'greek',
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
            if (feature.type === types.footnote) {
                suffixItem[types.footnote] = suffixItem[types.footnote] || [];
                suffixItem[types.footnote].push(feature.value);
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
                let partOfSpeech = inflection[types.part];
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

                result[types.part].push(partOfSpeech);
                result[partOfSpeech] = {};
                result[partOfSpeech].suffixes = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), []);
                result[partOfSpeech].footnotes = [];

                // Create a set so all footnote indexes be unique
                let footnotesIndex = new Set();
                // Scan all selected suffixes to build a unique set of footnote indexes
                for (let suffix of result[partOfSpeech].suffixes) {
                    if (suffix.hasOwnProperty(types.footnote)) {
                        // Footnote indexes are stored in an array
                        for (let index of suffix[types.footnote]) {
                            footnotesIndex.add(index);
                        }
                    }
                }
                // Add footnote indexes and their texts to a result
                for (let index of footnotesIndex) {
                    let footnote = this.footnotes.find(footnoteElement =>
                        footnoteElement.index === index && footnoteElement[types.part] === partOfSpeech
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
            this[language].loadData();
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

        if (jsonObject[types.footnote]) {
            suffix[types.footnote] = [];
            for (let footnote of jsonObject[types.footnote]) {
                suffix[types.footnote].push(footnote);
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

        if (this.hasOwnProperty(types.footnote)) {
            clone[types.footnote] = this[types.footnote];
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
            result = result && commonValues[feature].size === 2;
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
        this[types.part] = partOfSpeech;
    }

    static readObject(jsonObject) {
        this.index = jsonObject.index;
        this.text = jsonObject.text;
        this[types.part] = jsonObject[types.part];
        return new Footnote(jsonObject.index, jsonObject.text, jsonObject[types.part]);
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
        this[types.part] = []; // What parts of speech are represented by this object.
    }

    static readObject(jsonObject) {
        let homonym = Homonym.readObject(jsonObject.homonym);

        let wordData = new WordData(homonym);
        wordData.definition = jsonObject.definition;
        wordData[types.part] = jsonObject[types.part];

        for (let part of wordData[types.part]) {
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
    constructor(language) {
        "use strict";
        this.language = language;
    }

    /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
    addFeature(featureName) {
        this[featureName] = {};
        let language = this.language;

        this[featureName].add = function add(providerValue, alpheiosValue) {
            "use strict";
            this[providerValue] = alpheiosValue;
            return this;
        };

        this[featureName].get = function get(providerValue) {
            "use strict";
            if (!this.importer.has(providerValue)) {
                throw new Error("Skipping an unknown value '"
                    + providerValue + "' of a grammatical feature '" + featureName + "' of " + language + " language.");
            }
            else {
                return this.importer.get(providerValue);
            }

        };

        this[featureName].importer = new FeatureImporter();

        return this[featureName];
    }
}

let data = new ImportData(new LatinLanguageModel$1());
let types$1 = Feature$1.types;

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(Feature$1.types.part).importer
    .map('noun', data.language.features[types$1.part].noun)
    .map('adjective', data.language.features[types$1.part].adjective)
    .map('verb', data.language.features[types$1.part].verb);

data.addFeature(Feature$1.types.grmCase).importer
    .map('nominative', data.language.features[types$1.grmCase].nominative)
    .map('genitive', data.language.features[types$1.grmCase].genitive)
    .map('dative', data.language.features[types$1.grmCase].dative)
    .map('accusative', data.language.features[types$1.grmCase].accusative)
    .map('ablative', data.language.features[types$1.grmCase].ablative)
    .map('locative', data.language.features[types$1.grmCase].locative)
    .map('vocative', data.language.features[types$1.grmCase].vocative);

data.addFeature(Feature$1.types.declension).importer
    .map('1st', data.language.features[types$1.declension].first)
    .map('2nd', data.language.features[types$1.declension].second)
    .map('3rd', data.language.features[types$1.declension].third)
    .map('4th', data.language.features[types$1.declension].fourth)
    .map('5th', data.language.features[types$1.declension].fifth);

data.addFeature(Feature$1.types.number).importer
    .map('singular', data.language.features[types$1.number].singular)
    .map('plural', data.language.features[types$1.number].plural);

data.addFeature(Feature$1.types.gender).importer
    .map('masculine', data.language.features[types$1.gender].masculine)
    .map('feminine', data.language.features[types$1.gender].feminine)
    .map('neuter', data.language.features[types$1.gender].neuter)
    .map('common', [data.language.features[types$1.gender].masculine, data.language.features[types$1.gender].feminine])
    .map('all', [data.language.features[types$1.gender].masculine, data.language.features[types$1.gender].feminine, data.language.features[types$1.gender].neuter]);

data.addFeature(Feature$1.types.conjugation).importer
    .map('1st', data.language.features[types$1.conjugation].first)
    .map('2nd', data.language.features[types$1.conjugation].second)
    .map('3rd', data.language.features[types$1.conjugation].third)
    .map('4th', data.language.features[types$1.conjugation].fourth);

data.addFeature(Feature$1.types.tense).importer
    .map('present', data.language.features[types$1.tense].present)
    .map('imperfect', data.language.features[types$1.tense].imperfect)
    .map('future', data.language.features[types$1.tense].future)
    .map('perfect', data.language.features[types$1.tense].perfect)
    .map('pluperfect', data.language.features[types$1.tense].pluperfect)
    .map('future_perfect', data.language.features[types$1.tense]['future perfect']);

data.addFeature(Feature$1.types.voice).importer
    .map('active', data.language.features[types$1.voice].active)
    .map('passive', data.language.features[types$1.voice].passive);

data.addFeature(Feature$1.types.mood).importer
    .map('indicative', data.language.features[types$1.mood].indicative)
    .map('subjunctive', data.language.features[types$1.mood].subjunctive);

data.addFeature(Feature$1.types.person).importer
    .map('1st', data.language.features[types$1.person].first)
    .map('2nd', data.language.features[types$1.person].second)
    .map('3rd', data.language.features[types$1.person].third);

var Cupidinibus = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:cupidinibus:whitakerLat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"net.alpheios:tools:wordsxml.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-08-10T23:15:29.185581\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:cupidinibus\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": [\n        {\n          \"resource\": \"urn:uuid:idm140578094883136\"\n        },\n        {\n          \"resource\": \"urn:uuid:idm140578158026160\"\n        }\n      ],\n      \"Body\": [\n        {\n          \"about\": \"urn:uuid:idm140578094883136\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 2,\n                    \"$\": \"locative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 5,\n                    \"$\": \"dative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  }\n                }\n              ],\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"Cupido, Cupidinis\"\n                },\n                \"pofs\": {\n                  \"order\": 5,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                },\n                \"gend\": {\n                  \"$\": \"masculine\"\n                },\n                \"area\": {\n                  \"$\": \"religion\"\n                },\n                \"freq\": {\n                  \"order\": 4,\n                  \"$\": \"common\"\n                },\n                \"src\": {\n                  \"$\": \"Ox.Lat.Dict.\"\n                }\n              },\n              \"mean\": {\n                \"$\": \"Cupid, son of Venus; personification of carnal desire;\"\n              }\n            }\n          }\n        },\n        {\n          \"about\": \"urn:uuid:idm140578158026160\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 2,\n                    \"$\": \"locative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"common\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 5,\n                    \"$\": \"dative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"common\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"cupidin\"\n                    },\n                    \"suff\": {\n                      \"$\": \"ibus\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 5,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"var\": {\n                    \"$\": \"1st\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"num\": {\n                    \"$\": \"plural\"\n                  },\n                  \"gend\": {\n                    \"$\": \"common\"\n                  }\n                }\n              ],\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"cupido, cupidinis\"\n                },\n                \"pofs\": {\n                  \"order\": 5,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                },\n                \"gend\": {\n                  \"$\": \"common\"\n                },\n                \"freq\": {\n                  \"order\": 5,\n                  \"$\": \"frequent\"\n                },\n                \"src\": {\n                  \"$\": \"Ox.Lat.Dict.\"\n                }\n              },\n              \"mean\": {\n                \"$\": \"desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;\"\n              }\n            }\n          }\n        }\n      ]\n    }\n  }\n}\n";

var Mare = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:mare:morpheuslat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"org.perseus:tools:morpheus.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-09-08T06:59:48.639180\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:mare\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": [\n        {\n          \"resource\": \"urn:uuid:idm140446402389888\"\n        },\n        {\n          \"resource\": \"urn:uuid:idm140446402332400\"\n        },\n        {\n          \"resource\": \"urn:uuid:idm140446402303648\"\n        }\n      ],\n      \"Body\": [\n        {\n          \"about\": \"urn:uuid:idm140446402389888\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34070.1\",\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"mare\"\n                },\n                \"pofs\": {\n                  \"order\": 3,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                },\n                \"gend\": {\n                  \"$\": \"neuter\"\n                }\n              },\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 7,\n                    \"$\": \"nominative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 1,\n                    \"$\": \"vocative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mar\"\n                    },\n                    \"suff\": {\n                      \"$\": \"e\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 3,\n                    \"$\": \"noun\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 4,\n                    \"$\": \"accusative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"is_is\"\n                  }\n                }\n              ]\n            }\n          }\n        },\n        {\n          \"about\": \"urn:uuid:idm140446402332400\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34118.1\",\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"marum\"\n                },\n                \"pofs\": {\n                  \"order\": 3,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"2nd\"\n                },\n                \"gend\": {\n                  \"$\": \"neuter\"\n                }\n              },\n              \"infl\": {\n                \"term\": {\n                  \"lang\": \"lat\",\n                  \"stem\": {\n                    \"$\": \"mar\"\n                  },\n                  \"suff\": {\n                    \"$\": \"e\"\n                  }\n                },\n                \"pofs\": {\n                  \"order\": 3,\n                  \"$\": \"noun\"\n                },\n                \"decl\": {\n                  \"$\": \"2nd\"\n                },\n                \"case\": {\n                  \"order\": 1,\n                  \"$\": \"vocative\"\n                },\n                \"gend\": {\n                  \"$\": \"neuter\"\n                },\n                \"num\": {\n                  \"$\": \"singular\"\n                },\n                \"stemtype\": {\n                  \"$\": \"us_i\"\n                }\n              }\n            }\n          }\n        },\n        {\n          \"about\": \"urn:uuid:idm140446402303648\",\n          \"type\": {\n            \"resource\": \"cnt:ContentAsXML\"\n          },\n          \"rest\": {\n            \"entry\": {\n              \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:latlexent.lex34119.1\",\n              \"dict\": {\n                \"hdwd\": {\n                  \"lang\": \"lat\",\n                  \"$\": \"mas\"\n                },\n                \"pofs\": {\n                  \"order\": 2,\n                  \"$\": \"adjective\"\n                },\n                \"decl\": {\n                  \"$\": \"3rd\"\n                }\n              },\n              \"infl\": [\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mare\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 2,\n                    \"$\": \"adjective\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"masculine\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"irreg_adj3\"\n                  },\n                  \"morph\": {\n                    \"$\": \"indeclform\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mare\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 2,\n                    \"$\": \"adjective\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"feminine\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"irreg_adj3\"\n                  },\n                  \"morph\": {\n                    \"$\": \"indeclform\"\n                  }\n                },\n                {\n                  \"term\": {\n                    \"lang\": \"lat\",\n                    \"stem\": {\n                      \"$\": \"mare\"\n                    }\n                  },\n                  \"pofs\": {\n                    \"order\": 2,\n                    \"$\": \"adjective\"\n                  },\n                  \"decl\": {\n                    \"$\": \"3rd\"\n                  },\n                  \"case\": {\n                    \"order\": 3,\n                    \"$\": \"ablative\"\n                  },\n                  \"gend\": {\n                    \"$\": \"neuter\"\n                  },\n                  \"num\": {\n                    \"$\": \"singular\"\n                  },\n                  \"stemtype\": {\n                    \"$\": \"irreg_adj3\"\n                  },\n                  \"morph\": {\n                    \"$\": \"indeclform\"\n                  }\n                }\n              ]\n            }\n          }\n        }\n      ]\n    }\n  }\n}";

var Cepit = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:cepit:whitakerLat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"net.alpheios:tools:wordsxml.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-08-10T23:16:53.672068\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:cepit\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": {\n        \"resource\": \"urn:uuid:idm140578133848416\"\n      },\n      \"Body\": {\n        \"about\": \"urn:uuid:idm140578133848416\",\n        \"type\": {\n          \"resource\": \"cnt:ContentAsXML\"\n        },\n        \"rest\": {\n          \"entry\": {\n            \"infl\": {\n              \"term\": {\n                \"lang\": \"lat\",\n                \"stem\": {\n                  \"$\": \"cep\"\n                },\n                \"suff\": {\n                  \"$\": \"it\"\n                }\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"verb\"\n              },\n              \"conj\": {\n                \"$\": \"3rd\"\n              },\n              \"var\": {\n                \"$\": \"1st\"\n              },\n              \"tense\": {\n                \"$\": \"perfect\"\n              },\n              \"voice\": {\n                \"$\": \"active\"\n              },\n              \"mood\": {\n                \"$\": \"indicative\"\n              },\n              \"pers\": {\n                \"$\": \"3rd\"\n              },\n              \"num\": {\n                \"$\": \"singular\"\n              }\n            },\n            \"dict\": {\n              \"hdwd\": {\n                \"lang\": \"lat\",\n                \"$\": \"capio, capere, cepi, captus\"\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"verb\"\n              },\n              \"conj\": {\n                \"$\": \"3rd\"\n              },\n              \"kind\": {\n                \"$\": \"transitive\"\n              },\n              \"freq\": {\n                \"order\": 6,\n                \"$\": \"very frequent\"\n              },\n              \"src\": {\n                \"$\": \"Ox.Lat.Dict.\"\n              }\n            },\n            \"mean\": {\n              \"$\": \"take hold, seize; grasp; take bribe; arrest/capture; put on; occupy; captivate;\"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n";

var Pilsopo = "{\n  \"RDF\": {\n    \"Annotation\": {\n      \"about\": \"urn:TuftsMorphologyService:φιλόσοφος:morpheuslat\",\n      \"creator\": {\n        \"Agent\": {\n          \"about\": \"org.perseus:tools:morpheus.v1\"\n        }\n      },\n      \"created\": {\n        \"$\": \"2017-10-15T14:06:40.522369\"\n      },\n      \"hasTarget\": {\n        \"Description\": {\n          \"about\": \"urn:word:φιλόσοφος\"\n        }\n      },\n      \"title\": {},\n      \"hasBody\": {\n        \"resource\": \"urn:uuid:idm140446394225264\"\n      },\n      \"Body\": {\n        \"about\": \"urn:uuid:idm140446394225264\",\n        \"type\": {\n          \"resource\": \"cnt:ContentAsXML\"\n        },\n        \"rest\": {\n          \"entry\": {\n            \"uri\": \"http://data.perseus.org/collections/urn:cite:perseus:grclexent.lex78378.1\",\n            \"dict\": {\n              \"hdwd\": {\n                \"lang\": \"grc\",\n                \"$\": \"φιλόσοφος\"\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"noun\"\n              },\n              \"decl\": {\n                \"$\": \"2nd\"\n              },\n              \"gend\": {\n                \"$\": \"masculine\"\n              }\n            },\n            \"infl\": {\n              \"term\": {\n                \"lang\": \"grc\",\n                \"stem\": {\n                  \"$\": \"φιλοσοφ\"\n                },\n                \"suff\": {\n                  \"$\": \"ος\"\n                }\n              },\n              \"pofs\": {\n                \"order\": 3,\n                \"$\": \"noun\"\n              },\n              \"decl\": {\n                \"$\": \"2nd\"\n              },\n              \"case\": {\n                \"order\": 7,\n                \"$\": \"nominative\"\n              },\n              \"gend\": {\n                \"$\": \"masculine\"\n              },\n              \"num\": {\n                \"$\": \"singular\"\n              },\n              \"stemtype\": {\n                \"$\": \"os_ou\"\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}";

class WordTestData {
    constructor() {
        this._words = {
            'cupidinibus': Cupidinibus,
            'mare': Mare,
            'cepit': Cepit,
            'φιλόσοφος': Pilsopo
        };
    }

    get(word) {
        if (this._words.hasOwnProperty(word)) {
            return this._words[word];
        }
        throw new Error(`Word "${word}" does not exist in test data`);
    }
}

class TuftsAdapter {
    constructor({engine=null,url=null}) {
      let latin_code = data.language.toCode();
      this[latin_code] = data;
      //this[Lib.languages.greek] = TuftsGreekData;
      //this.langMap = new Map([['lat', TuftsLatinData]]);
      //this.langMap = new Lib.Importer().map('lat', Lib.languages.latin).map('grc', Lib.languages.greek);
      this.langMap = new FeatureImporter().map('lat', latin_code);
      this.engineLookup = engine;
      this.url = url;
      return this;
    }

    // Not implemented yet
    fetch(lang, word) {
      let engine = this.engineLookup[lang];
      let url = this.url.replace('r_WORD',word).replace('r_ENGINE',engine).replace('r_LANG',lang);
      return new Promise((resolve,reject) =>  {
        fetch(url).then(
          function(response) {
            let json = response.json();
            resolve(json);
          }
        ).catch((error) => {
            reject(error);
          }
        );

      });
    }

    fetchTestData(lang, word) {
        return new Promise((resolve, reject) => {
            try {
                let wordData = new WordTestData().get(word);
                console.log(wordData);
                let json = JSON.parse(wordData);
                resolve(json);
            }
            catch (error) {
                // Word is not found in test data
                reject(error);
            }
        });
    }

    /**
     * A function that maps a morphological service's specific data types and values into an inflection library standard.
     * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
     * @param {object} targetWord - the target of the analysis
     * @returns {Homonym} A library standard Homonym object.
     */
    transform (jsonObj,targetWord) {
        "use strict";
        let lexemes = [];
        let annotationBody = jsonObj.RDF.Annotation.Body;
        if (!Array.isArray(annotationBody)) {
            /*
            If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
            Let's convert it to an array so we can work with it in the same way no matter what format it is.
             */
            annotationBody = [annotationBody];
        }
        for (let lexeme of annotationBody) {
            // Get importer based on the language
            let language = this.langMap.get(lexeme.rest.entry.dict.hdwd.lang);
            let lemma = new Lemma(lexeme.rest.entry.dict.hdwd.$, language);

            let inflections = [];
            let inflectionsJSON = lexeme.rest.entry.infl;
            if (!Array.isArray(inflectionsJSON)) {
                // If only one inflection returned, it is a single object, not an array of objects. Convert it to an array for uniformity.
                inflectionsJSON = [inflectionsJSON];
            }
            for (let inflectionJSON of inflectionsJSON) {
                let inflection = new Inflection(inflectionJSON.term.stem.$, this[language].language);
                if (inflectionJSON.term.suff) {
                    // Set suffix if provided by a morphological analyzer
                    inflection.suffix = inflectionJSON.term.suff.$;
                }

                // Parse whatever grammatical features we're interested in
                if (inflectionJSON.pofs) {
                    inflection.feature = this[language][Feature$1.types.part].get(inflectionJSON.pofs.$);
                }

                if (inflectionJSON.case) {
                    inflection.feature = this[language][Feature$1.types.grmCase].get(inflectionJSON.case.$);
                }

                if (inflectionJSON.decl) {
                    inflection.feature = this[language][Feature$1.types.declension].get(inflectionJSON.decl.$);
                }

                if (inflectionJSON.num) {
                    inflection.feature = this[language][Feature$1.types.number].get(inflectionJSON.num.$);
                }

                if (inflectionJSON.gend) {
                    inflection.feature = this[language][Feature$1.types.gender].get(inflectionJSON.gend.$);
                }

                if (inflectionJSON.conj) {
                    inflection.feature = this[language][Feature$1.types.conjugation].get(inflectionJSON.conj.$);
                }

                if (inflectionJSON.tense) {
                    inflection.feature = this[language][Feature$1.types.tense].get(inflectionJSON.tense.$);
                }

                if (inflectionJSON.voice) {
                    inflection.feature = this[language][Feature$1.types.voice].get(inflectionJSON.voice.$);
                }

                if (inflectionJSON.mood) {
                    inflection.feature = this[language][Feature$1.types.mood].get(inflectionJSON.mood.$);
                }

                if (inflectionJSON.pers) {
                    inflection.feature = this[language][Feature$1.types.person].get(inflectionJSON.pers.$);
                }

                inflections.push(inflection);
            }
            lexemes.push(new Lexeme(lemma, inflections));
        }
        return new Homonym$1(lexemes,targetWord);
    }
}




var AlpheiosTuftsAdapter = Object.freeze({
	default: TuftsAdapter
});

let messages$1 = {
    Number: 'Number',
    Case: 'Case',
    Declension: 'Declension',
    Gender: 'Gender',
    Type: 'Type',
    Voice: 'Voice',
    'Conjugation Stem': 'Conjugation Stem',
    Mood: 'Mood',
    Person: 'Person'
};

let messages$2 = {
    Number: 'Number (GB)',
    Case: 'Case (GB)',
    Declension: 'Declension (GB)',
    Gender: 'Gender (GB)',
    Type: 'Type (GB)',
    Voice: 'Voice (GB)',
    'Conjugation Stem': 'Conjugation Stem (GB)',
    Mood: 'Mood (GB)',
    Person: 'Person (GB)'
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

function Compiler$1(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler$1.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler$1.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler$1.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler$1.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler$1.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};

var parser = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements
                };
            },
        peg$c2 = peg$FAILED,
        peg$c3 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c4 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText
                };
            },
        peg$c5 = /^[^ \t\n\r,.+={}#]/,
        peg$c6 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c7 = "{",
        peg$c8 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c9 = null,
        peg$c10 = ",",
        peg$c11 = { type: "literal", value: ",", description: "\",\"" },
        peg$c12 = "}",
        peg$c13 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c14 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2]
                };
            },
        peg$c15 = "number",
        peg$c16 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c17 = "date",
        peg$c18 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c19 = "time",
        peg$c20 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c21 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2]
                };
            },
        peg$c22 = "plural",
        peg$c23 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                };
            },
        peg$c25 = "selectordinal",
        peg$c26 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c27 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options
                }
            },
        peg$c28 = "select",
        peg$c29 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c30 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options
                };
            },
        peg$c31 = "=",
        peg$c32 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c33 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern
                };
            },
        peg$c34 = "offset:",
        peg$c35 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c36 = function(number) {
                return number;
            },
        peg$c37 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options
                };
            },
        peg$c38 = { type: "other", description: "whitespace" },
        peg$c39 = /^[ \t\n\r]/,
        peg$c40 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c41 = { type: "other", description: "optionalWhitespace" },
        peg$c42 = /^[0-9]/,
        peg$c43 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c44 = /^[0-9a-f]/i,
        peg$c45 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c46 = "0",
        peg$c47 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c48 = /^[1-9]/,
        peg$c49 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c50 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c51 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c52 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
        peg$c53 = "\\\\",
        peg$c54 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c55 = function() { return '\\'; },
        peg$c56 = "\\#",
        peg$c57 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c58 = function() { return '\\#'; },
        peg$c59 = "\\{",
        peg$c60 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c61 = function() { return '\u007B'; },
        peg$c62 = "\\}",
        peg$c63 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c64 = function() { return '\u007D'; },
        peg$c65 = "\\u",
        peg$c66 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c67 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c68 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c2;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c3(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c4(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c5.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c5.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
          }
        } else {
          s1 = peg$c2;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c7;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c10;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$c2;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$c2;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c2;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c9;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c12;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c13); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c14(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c17) {
          s1 = peg$c17;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c19) {
            s1 = peg$c19;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c20); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c10;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c9;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$c2;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c30(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c31;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c12;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c13); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c33(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c34) {
        s1 = peg$c34;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c36(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$c2;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c39.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c39.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
        }
      } else {
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c46;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c48.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c51.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c53) {
          s1 = peg$c53;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c56) {
            s1 = peg$c56;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c57); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c58();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c59) {
              s1 = peg$c59;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c60); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c61();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c62) {
                s1 = peg$c62;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c63); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c64();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c65) {
                  s1 = peg$c65;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c66); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$c2;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$c2;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$c2;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$c2;
                  }
                  if (s3 !== peg$FAILED) {
                    s3 = input.substring(s2, peg$currPos);
                  }
                  s2 = s3;
                  if (s2 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c68(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error(
            'The intl string context variable \'' + e.variableId + '\'' +
            ' was not provided to the string \'' + message + '\''
          );
        } else {
          throw e;
        }
      }
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
defineProperty(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
defineProperty(MessageFormat, '__localeData__', {value: objCreate(null)});
defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
defineProperty(MessageFormat, '__parse', {value: parser.parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new Compiler$1(locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value, err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = objCreate(defaults[type]);

        if (formats && hop.call(formats, type)) {
            extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

// GENERATED FILE
var defaultLocale = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

/* jslint esnext: true */

MessageFormat.__addLocaleData(defaultLocale);
MessageFormat.defaultLocale = 'en';

/**
 * Combines messages with the same locale code.
 */
class MessageBundle {

    /**
     * Creates a message bundle (a list of messages) for a locale.
     * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
     * @param {Object} messages - Messages for a locale in an object. Object keys are message IDss, strings that
     * are used to reference a message, and key values are message texts in a string format.
     */
    constructor(locale, messages) {
        if (!locale) {
            throw new Error('Locale data is missing');
        }
        if (!messages) {
            throw new Error('Messages data is missing');
        }

        this._locale = locale;

        for (let messageID in messages) {
            if (messages.hasOwnProperty(messageID)) {
                this[messageID] = new MessageFormat(messages[messageID], this._locale);
            }
        }
    }

    /**
     * Returns a (formatted) message for a message ID provided.
     * @param messageID - An ID of a message.
     * @param options - Options that can be used for message formatting.
     * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
     */
    get(messageID, options = undefined) {
        if (this[messageID]) {
            return this[messageID].format(options);
        }
        else {
            // If message with the ID provided is not in translation data, generate a warning.
            return `Not in translation data: "${messageID}"`;
        }
    }

    /**
     * Returns a locale of a current message bundle.
     * @return {string} A locale of this message bundle.
     */
    get locale() {
        return this._locale;
    }
}

/**
 * Combines several message bundle for different locales.
 */
class L10n {

    /**
     * Creates an object. If an array of message bundle data is provided, initializes an object with this data.
     * This function is chainable.
     * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
     * @returns {L10n} Returns a reference to self for chaining.
     */
    constructor(messageData) {
        this._locales = {};
        this._localeList = [];

        if (messageData) {
            this.addLocaleData(messageData);
        }
        return this;
    }

    /**
     * Adds one or several message bundles.
     * This function is chainable.
     * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
     * @return {L10n} - Returns self for chaining.
     */
    addLocaleData(messageData) {
        for (let messageBundle of messageData) {
            this._localeList.push(messageBundle.locale);
            this._locales[messageBundle.locale] = messageBundle;
        }
        return this;
    }

    /**
     * Returns a message bundle for a locale.
     * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
     * @returns {MessageBundle} A message bundle for a locale.
     */
    messages(locale) {
        if (!this._locales[locale]) {
            throw new Error('Locale "' + locale + '" is not found.');
        }
        return this._locales[locale];
    }

    /**
     * Returns a list of available locale codes.
     * @returns {string[]} Array of local codes.
     */
    get locales() {
        return this._localeList;
    }
}

const messages = [
    new MessageBundle('en-US', messages$1),
    new MessageBundle('en-GB', messages$2)
];

let classNames = {
    cell: 'infl-cell',
    widthPrefix: 'infl-cell--sp',
    fullWidth: 'infl-cell--fw',
    header: 'infl-cell--hdr',
    highlight: 'infl-cell--hl',
    hidden: 'hidden',
    suffix: 'infl-suff',
    suffixMatch: 'infl-suff--suffix-match',
    suffixFullFeatureMatch: 'infl-suff--full-feature-match',
    inflectionTable: 'infl-table',
    wideView: 'infl-table--wide',
    narrowViewsContainer: 'infl-table-narrow-views-cont',
    narrowView: 'infl-table--narrow',
    footnotesContainer: 'infl-footnotes'
};

let wideView = {
    column: {
        width: 1,
        unit: 'fr'
    }
};

let narrowView = {
    column: {
        width: 100,
        unit: 'px'
    }
};

let footnotes = {
    id: "inlection-table-footer"
};

let pageHeader = {
    html: `
        <button id="hide-empty-columns" class="switch-btn">Hide empty columns</button><button id="show-empty-columns" class="switch-btn hidden">Show empty columns</button>
        <button id="hide-no-suffix-groups" class="switch-btn">Hide top-level groups with no suffix matches</button><button id="show-no-suffix-groups" class="switch-btn hidden">Show top-level groups with no suffix matches</button><br>
        <p>Hover over the suffix to see its grammar features</p>
        `,
    hideEmptyColumnsBtnSel: '#hide-empty-columns',
    showEmptyColumnsBtnSel: '#show-empty-columns',
    hideNoSuffixGroupsBtnSel: '#hide-no-suffix-groups',
    showNoSuffixGroupsBtnSel: '#show-no-suffix-groups'
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var papaparse = createCommonjsModule(function (module, exports) {
/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (typeof undefined === 'function' && undefined.amd)
	{
		// AMD. Register as an anonymous module.
		undefined([], factory);
	}
	else {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
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
		};
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
		};

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
		};

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		};

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
		};

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
		};

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		};

		this._chunkError = function()
		{
			this._sendError(reader.error);
		};

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
		};
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		};
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
		};

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
		};

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
						emptyLinesCount++;
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
});

/*
 * Latin language data module
 */
let languageModel = new LatinLanguageModel$1();
let types$2 = Feature$1.types;
// A language of this module
const language = languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new LanguageDataset(language);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
languageModel.features[types$2.number].addImporter(importerName)
    .map('singular',  languageModel.features[types$2.number].singular)
    .map('plural', languageModel.features[types$2.number].plural);
languageModel.features[types$2.grmCase].addImporter(importerName)
    .map('nominative', languageModel.features[types$2.grmCase].nominative)
    .map('genitive', languageModel.features[types$2.grmCase].genitive)
    .map('dative', languageModel.features[types$2.grmCase].dative)
    .map('accusative', languageModel.features[types$2.grmCase].accusative)
    .map('ablative', languageModel.features[types$2.grmCase].ablative)
    .map('locative', languageModel.features[types$2.grmCase].locative)
    .map('vocative', languageModel.features[types$2.grmCase].vocative);
languageModel.features[types$2.declension].addImporter(importerName)
    .map('1st', languageModel.features[types$2.declension].first)
    .map('2nd', languageModel.features[types$2.declension].second)
    .map('1st 2nd', [languageModel.features[types$2.declension].first, languageModel.features[types$2.declension].second])
    .map('3rd', languageModel.features[types$2.declension].third)
    .map('4th', languageModel.features[types$2.declension].fourth)
    .map('5th', languageModel.features[types$2.declension].fifth);
languageModel.features[types$2.gender].addImporter(importerName)
    .map('masculine', languageModel.features[types$2.gender].masculine)
    .map('feminine', languageModel.features[types$2.gender].feminine)
    .map('neuter', languageModel.features[types$2.gender].neuter)
    .map('masculine feminine', [languageModel.features[types$2.gender].masculine, languageModel.features[types$2.gender].feminine]);
languageModel.features[types$2.type].addImporter(importerName)
    .map('regular', languageModel.features[types$2.type].regular)
    .map('irregular', languageModel.features[types$2.type].irregular);
languageModel.features[types$2.conjugation].addImporter(importerName)
    .map('1st', languageModel.features[types$2.conjugation].first)
    .map('2nd', languageModel.features[types$2.conjugation].second)
    .map('3rd', languageModel.features[types$2.conjugation].third)
    .map('4th', languageModel.features[types$2.conjugation].fourth);
languageModel.features[types$2.tense].addImporter(importerName)
    .map('present', languageModel.features[types$2.tense].present)
    .map('imperfect', languageModel.features[types$2.tense].imperfect)
    .map('future', languageModel.features[types$2.tense].future)
    .map('perfect', languageModel.features[types$2.tense].perfect)
    .map('pluperfect', languageModel.features[types$2.tense].pluperfect)
    .map('future_perfect', languageModel.features[types$2.tense]['future perfect']);
languageModel.features[types$2.voice].addImporter(importerName)
    .map('passive', languageModel.features[types$2.voice].passive)
    .map('active', languageModel.features[types$2.voice].active);
languageModel.features[types$2.mood].addImporter(importerName)
    .map('indicative', languageModel.features[types$2.mood].indicative)
    .map('subjunctive', languageModel.features[types$2.mood].subjunctive);
languageModel.features[types$2.person].addImporter(importerName)
    .map('1st', languageModel.features[types$2.person].first)
    .map('2nd', languageModel.features[types$2.person].second)
    .map('3rd', languageModel.features[types$2.person].third);
const footnotes$1 = new FeatureType$1(types$2.footnote, [], languageModel);

// endregion definition of grammatical features

// for noun and adjectives
dataSet.addsuffixes = function(partofspeech, data) {
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
            languageModel.features[types$2.number].importer.csv.get(data[i][1]),
            languageModel.features[types$2.grmCase].importer.csv.get(data[i][2]),
            languageModel.features[types$2.declension].importer.csv.get(data[i][3]),
            languageModel.features[types$2.gender].importer.csv.get(data[i][4]),
            languageModel.features[types$2.type].importer.csv.get(data[i][5])];
        if (data[i][6]) {
            // there can be multiple footnote indexes separated by spaces
            let indexes = data[i][6].split(' ').map(function(index) {
                return footnotes$1.get(index);
            });
            features.push(...indexes);
        }
        this.addsuffix(suffix, features);
    }
};

// for verbs
dataSet.addverbsuffixes = function(partofspeech, data) {
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
            languageModel.features[types$2.conjugation].importer.csv.get(data[i][1]),
            languageModel.features[types$2.voice].importer.csv.get(data[i][2]),
            languageModel.features[types$2.mood].importer.csv.get(data[i][3]),
            languageModel.features[types$2.tense].importer.csv.get(data[i][4]),
            languageModel.features[types$2.number].importer.csv.get(data[i][5]),
            languageModel.features[types$2.person].importer.csv.get(data[i][6])];

        let grammartype = data[i][7];
        // type information can be empty if no ending is provided
        if (grammartype) {
            features.push(types$2.importer.csv.get(grammartype));
        }
        // footnotes
        if (data[i][8]) {
            // there can be multiple footnote indexes separated by spaces
            let indexes = data[i][8].split(' ').map(function(index) {
                return footnotes$1.get(index);
            });
            features.push(...indexes);
        }
        this.addsuffix(suffix, features);
    }
};

dataSet.addfootnotes = function(partofspeech, data) {
    // first row are headers
    for (let i = 1; i < data.length; i++) {
        this.addfootnote(partofspeech, data[i][0], data[i][1]);
    }
};

dataSet.loaddata = function() {
    // nouns
    let partofspeech = parts.noun;
    let suffixes$$1 = papaparse.parse(nounsuffixescsv, {});
    this.addsuffixes(partofspeech, suffixes$$1.data);
    let footnotes = papaparse.parse(nounfootnotescsv, {});
    this.addfootnotes(partofspeech, footnotes.data);

    // adjectives
    partofspeech = parts.adjective;
    suffixes$$1 = papaparse.parse(adjectivesuffixescsv, {});
    this.addsuffixes(partofspeech, suffixes$$1.data);
    footnotes = papaparse.parse(adjectivefootnotescsv, {});
    this.addfootnotes(partofspeech, footnotes.data);

    // verbs
    partofspeech = parts.verb;
    suffixes$$1 = papaparse.parse(verbsuffixescsv, {});
    this.addverbsuffixes(partofspeech, suffixes$$1.data);
    footnotes = papaparse.parse(verbfootnotescsv, {});
    this.addfootnotes(partofspeech, footnotes.data);
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
    let obligatorymatches = [types$2.part];

    // any of those features must match between an inflection and an ending
    let optionalmatches = [types$2.grmcase, types$2.declension, types$2.gender, types$2.number];
    let bestmatchdata = null; // information about the best match we would be able to find

    /*
     there can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     but there could be multiple partial matches. so we should try to find the best match possible and return it.
     a fullfeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchdata = new lib.MatchData(); // Create a match profile

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

class Cell {
    /**
     * Creates a cell for an inflection table.
     * @param {Suffix[]} suffixes - A list of suffixes that belongs to this cell.
     * @param {Feature[]} features - A list of features this cell corresponds to.
     */
    constructor(suffixes, features) {
        this.suffixes = suffixes;
        if (!this.suffixes) {
            this.suffixes = [];
        }
        this.features = features;
        this.empty = (this.suffixes.length === 0);
        this.suffixMatches = !!this.suffixes.find(element => {
            if (element.match && element.match.suffixMatch) {
                return element.match.suffixMatch;
            }
        });

        this.column = undefined; // A column this cell belongs to
        this.row = undefined; // A row this cell belongs to

        this._index = undefined;

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        let element = document.createElement('div');
        element.classList.add(classNames.cell);
        for (let [index, suffix] of this.suffixes.entries()) {
            // Render each suffix
            let suffixElement = document.createElement('a');
            suffixElement.classList.add(classNames.suffix);
            if (suffix.match && suffix.match.suffixMatch) {
                suffixElement.classList.add(classNames.suffixMatch);
            }
            if (suffix.match && suffix.match.fullMatch) {
                suffixElement.classList.add(classNames.suffixFullFeatureMatch);
            }
            let suffixValue = suffix.value? suffix.value: '-';
            if (suffix.footnote && suffix.footnote.length) {
                suffixValue += '[' + suffix.footnote + ']';
            }
            suffixElement.innerHTML = suffixValue;
            element.appendChild(suffixElement);
            if (index < this.suffixes.length - 1) {
                element.appendChild(document.createTextNode(',\u00A0'));
            }
        }
        this.wNode = element;
        this.nNode = element.cloneNode(true);
    }

    /**
     * Returns an HTML element for a wide view.
     * @returns {HTMLElement}
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an HTML element for a narrow view.
     * @returns {HTMLElement}
     */
    get nvNode() {
        return this.nNode;
    }

    /**
     * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
     * @param {number} index - A unique cell index.
     */
    set index(index) {
        this._index = index;
        this.wNode.dataset.index = this._index;
        this.nNode.dataset.index = this._index;
    }

    /**
     * A proxy for adding an event listener for both wide and narrow view HTML elements.
     * @param {string} type - Listener type.
     * @param {EventListener} listener - Event listener function.
     */
    addEventListener(type, listener) {
        this.wNode.addEventListener(type, listener);
        this.nNode.addEventListener(type, listener);
    }

    /**
     * Hides an element.
     */
    hide() {
        if (!this.wNode.classList.contains(classNames.hidden)) {
            this.wNode.classList.add(classNames.hidden);
            this.nNode.classList.add(classNames.hidden);
        }
    }

    /**
     * Shows a previously hidden element.
     */
    show() {
        if (this.wNode.classList.contains(classNames.hidden)) {
            this.wNode.classList.remove(classNames.hidden);
            this.nNode.classList.remove(classNames.hidden);
        }
    }

    /**
     * Highlights a cell with color.
     */
    highlight() {
        if (!this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.add(classNames.highlight);
            this.nNode.classList.add(classNames.highlight);
        }
    }

    /**
     * Removes highlighting from a previously highlighted cell.
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.remove(classNames.highlight);
            this.nNode.classList.remove(classNames.highlight);
        }
    }

    /**
     * Highlights a row and a column this cell belongs to.
     */
    highlightRowAndColumn() {
        if (!this.column) {
            throw new Error('Column is undefined.');
        }
        if (!this.row) {
            throw new Error('Row is undefined.');
        }
        this.column.highlight();
        this.row.highlight();
    }

    /**
     * Removes highlighting form a previously highlighted row and column.
     */
    clearRowAndColumnHighlighting() {
        if (!this.column) {
            throw new Error('Column is undefined.');
        }
        if (!this.row) {
            throw new Error('Row is undefined.');
        }
        this.column.clearHighlighting();
        this.row.clearHighlighting();
    }
}

/**
 * A cell that specifies a title for a row in an inflection table.
 */
class RowTitleCell {

    /**
     * Initializes a row title cell.
     * @param {string} title - A text that will be shown within the cell.
     * @param {GroupFeatureType} groupingFeature - A grouping feature that specifies a row for which a title cell
     * is created.
     * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
     * and will have its own title cells, we need to create a copy of a title cell for each such group.
     */
    constructor(title, groupingFeature, nvGroupQty) {
        this.parent = undefined;
        this.title = title;
        this.feature = groupingFeature;
        this.nvGroupQty = nvGroupQty;

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        // Generate HTML representation for a wide view node
        this.wNode = document.createElement('div');
        this.wNode.classList.add(classNames.cell);
        if (this.feature.formsColumn) {
            this.wNode.classList.add(classNames.header);
        }
        if (this.feature.hasFullWidthRowTitle) {
            // This cell is taking an entire row
            this.wNode.classList.add(classNames.fullWidth);
        }
        if (this.feature.formsColumn && this.feature.groupFeatureList.titleColumnsQuantity > 1) {
            this.wNode.classList.add(classNames.widthPrefix + this.feature.groupFeatureList.titleColumnsQuantity);
        }
        this.wNode.innerHTML = this.title;

        // Copy HTML representation to all narrow view nodes (each narrow view group has its own node)
        this.nNodes = []; // Narrow nodes, one for each group
        for (let i = 0; i < this.nvGroupQty; i++) {
            this.nNodes.push(this.wNode.cloneNode(true));
        }
    }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an array HTML element for narrow view groups
     * @returns {HTMLElement[]} Array of HTML elements for narrow view group's cells.
     */
    getNvNode(index) {
        return this.nNodes[index];
    }

    /**
     * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
     * inserted into a table structure (i.e. when title cells occupy multiple columns.
     * @param {number} width - A number of columns placeholder cell will occupy.
     * @returns {HTMLElement} HTML element of a placeholder cell.
     */
    static placeholder(width = 1) {
        let placeholder = document.createElement('div');
        placeholder.classList.add(classNames.cell, classNames.widthPrefix + width);
        return placeholder;
    }

    /**
     * Some table layouts require multiple title cells to be shown for a row. These could be, for example, a title
     * cell for a parent category that will follow a title cell for a category that defines a row. In such situation a
     * title cell will have a parent, which will represent a parent cell object.
     * This function returns an array of title cells for a row, starting from the topmost parent and moving down
     * tot the current title cell.
     * @returns {RowTitleCell[]} An array of title row cells representing a title cell hierarchy list.
     */
    get hierarchyList() {
        let parentCells = [];
        if (this.parent) {
            parentCells = this.parent.hierarchyList;
        }
        return parentCells.concat(this);
    }

    /**
     * Highlights this row title cell
     */
    highlight() {
        this.wNode.classList.add(classNames.highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.add(classNames.highlight);
        }
    }

    /**
     * Removes highlighting from this row title cell
     */
    clearHighlighting() {
        this.wNode.classList.remove(classNames.highlight);
        for (let nNode of this.nNodes) {
            nNode.classList.remove(classNames.highlight);
        }
    }
}

/**
 * A cell in a header row, a column title cell.
 */
class HeaderCell {
    /**
     * Initializes a header cell.
     * @param {string} title - A title text that will be shown in the header cell.
     * @param {GroupFeatureType} groupingFeature - A feature that defines one or several columns this header forms.
     * @param {number} [span=1] - How many columns in a table this header cell forms.
     */
    constructor(title, groupingFeature, span = 1) {
        this.feature = groupingFeature;
        this.title = title;
        this.span = span;

        this.parent = undefined;
        this.children = [];
        this.columns = [];

        this.render();
    }

    /**
     * Renders an element's HTML representation.
     */
    render() {
        let element = document.createElement('div');
        element.classList.add(classNames.cell, classNames.header, classNames.widthPrefix + this.span);
        element.innerHTML = this.title;
        this.wNode = element;
        this.nNode = element.cloneNode(true);
    }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
    get wvNode() {
        return this.wNode;
    }

    /**
     * Returns an HTML element for a narrow view
     * @returns {HTMLElement} HTML element for a narrow view's cell.
     */
    get nvNode() {
        return this.nNode;
    }

    /**
     * Registers a column that's being formed by this header cell. Adds column to itself and to its parent(s).
     * @param {Column} column - A column that is formed by this header cell.
     */
    addColumn(column) {
        this.columns = this.columns.concat([column]);

        if (this.parent) {
            this.parent.addColumn(column);
        }
    }

    /**
     * Temporary changes a width of a header cell. This happens when one or several columns
     * that this header forms are hidden or shown.
     * @param value
     */
    changeSpan(value) {
        let currentWidthClass = classNames.widthPrefix + this.span;
        this.span += value;
        let newWidthClass = classNames.widthPrefix + this.span;
        this.wNode.classList.replace(currentWidthClass, newWidthClass);
        this.nNode.classList.replace(currentWidthClass, newWidthClass);
    }

    /**
     * This function will notify all parents and children of a title column that some columns under this headers cell
     * changed their state (i.e. were hidden or shown). This way parents and children will be able to update their
     * states accordingly.
     */
    columnStateChange() {
        let visibleColumns = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                visibleColumns++;
            }
        }
        if (this.span !== visibleColumns) {
            // Number of visible columns has been changed
            let change = visibleColumns - this.span;
            this.changeSpan(change);

            // Notify parents and children
            if (this.children.length) {
                for (let child of this.children) {
                    child.columnStateChange();
                }
            }
            if (this.parent) {
                this.parent.columnStateChange();
            }
        }
    }

    /**
     * Highlights a header cell, its parent and children
     */
    highlight() {
        if (!this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.add(classNames.highlight);
            this.nNode.classList.add(classNames.highlight);

            if (this.parent) {
                this.parent.highlight();
            }
        }
    }

    /**
     * Removes highlighting from a header cell, its parent and children
     */
    clearHighlighting() {
        if (this.wNode.classList.contains(classNames.highlight)) {
            this.wNode.classList.remove(classNames.highlight);
            this.nNode.classList.remove(classNames.highlight);

            if (this.parent) {
                this.parent.clearHighlighting();
            }
        }
    }
}

/**
 * Represent a column of cells in an inflection table.
 */
class Column {

    /**
     * Initializes column with a provided set of cells.
     * @param {Cell} cells - Cells that are within this column.
     */
    constructor(cells) {
        this.cells = cells;
        if (!cells) {
            this.cells = [];
        }
        this._headerCell = undefined;
        this.hidden = false;
        this.empty = this.cells.every(cell => cell.empty);
        this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches);

        for (let cell of this.cells) {
            cell.column = this;
        }
    }

    /**
     * Assigns a header cell to the column.
     * @param {HeaderCell} headerCell - A header cell of this column.
     */
    set headerCell(headerCell) {
        this._headerCell = headerCell;
        headerCell.addColumn(this);
    }

    /**
     * Returns a number of cells within this column.
     * @returns {Number} A number of cells this column contains.
     */
    get length() {
        return this.cells.length;
    }

    /**
     * Hides the column. Notifies a header about a state change.
     */
    hide() {
        if (!this.hidden) {
            this.hidden = true;

            for (let cell of this.cells) {
                cell.hide();
            }
            if (this._headerCell) {
                this._headerCell.columnStateChange();
            }
        }
    }

    /**
     * Shows the column. Notifies a header about a state change.
     */
    show() {
        if (this.hidden) {
            this.hidden = false;

            for (let cell of this.cells) {
                cell.show();
            }
            if (this._headerCell) {
                this._headerCell.columnStateChange();
            }
        }
    }

    /**
     * Highlights a column and its header.
     */
    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        if (this._headerCell) {
            this._headerCell.highlight();
        }
    }

    /**
     * Removes highlighting from a column and its header.
     */
    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        if (this._headerCell) {
            this._headerCell.clearHighlighting();
        }
    }
}

/**
 * Represents a row of cells
 */
class Row {

    /**
     * Populates row with cells
     * @param {Cell[]} cells - Cells that belong to this row
     */
    constructor(cells) {
        this.cells = cells;
        if (!cells) {
            this.cells = [];
        }
        this.titleCell = undefined;

        for (let cell of this.cells) {
            cell.row = this;
        }
    }

    /**
     * Adds a cell to the row.
     * This is a chainable function.
     * @param {Cell} cell - A cell to be added to the row
     */
    add(cell) {
        cell.row = this;
        this.cells.push(cell);
        return this;
    }

    /**
     * Returns a number of cells in a row
     * @returns {Number} A number of cells in a row
     */
    get length() {
        return this.cells.length;
    }

    /**
     * Returns a portion of a cells array starting from `from` item and up to, but not including, `upto` element.
     * It does not create new copies of cells to populate a newly created array; this array contains references to
     * the same cells that original Row refers to. It also does not update row reference within Cell objects.
     *
     * This function presents a way to create another structure of existing table's cells.
     * It can be useful for views that have a different structure (i.e. narrow view).
     * @param {number} from
     * @param {number} upto
     */
    slice(from, upto) {
        let slice = new Row();
        if (from < 0 && from > this.cells.length) {
            throw new Error ('"from" parameter is out of range.');
        }
        if (upto < 0 && upto > this.cells.length) {
            throw new Error ('"upto" parameter is out of range.');
        }
        for (let index = from; index < upto; index++) {
            slice.cells.push(this.cells[index]);
        }
        slice.titleCell = this.titleCell;
        return slice;
    }

    /**
     * Highlights all cells in a row, and a title cells
     */
    highlight() {
        for (let cell of this.cells) {
            cell.highlight();
        }
        if (this.titleCell) {
            this.titleCell.highlight();
        }
    }

    /**
     * Removes highlighting from all cells in a row, and from a title cell
     */
    clearHighlighting() {
        for (let cell of this.cells) {
            cell.clearHighlighting();
        }
        if (this.titleCell) {
            this.titleCell.clearHighlighting();
        }
    }
}

/**
 * This is a wrapper around a FeatureType object. When a Table object creates a
 * hierarchical tree of suffixes, it uses grammatical features as tree nodes.
 * GroupFeatureType extends a Feature object so that it'll be able to store additional information
 * that is required for that.
 */
class GroupFeatureType extends FeatureType$1 {

    /**
     * GroupFeatureType extends FeatureType to serve as a grouping feature (i.e. a feature that forms
     * either a column or a row in an inflection table). For that, it adds some additional functionality,
     * such as custom feature orders that will allow to combine suffixes from several grammatical features
     * (i.e. masculine and feminine) into a one column of a table.
     * @param {FeatureType} featureType - A feature that defines a type of this item.
     * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
     * language-specific message bundle.
     * @param {Feature[]} order - A custom sort order for this feature that redefines
     * a default one stored in FeatureType object (optional).
     * Use this parameter to redefine a deafult sort order for a type.
     */
    constructor(featureType, titleMessageID, order = featureType.orderedFeatures) {
        super(featureType.type, GroupFeatureType.featuresToValues(order), featureType.language);

        this.groupTitle = titleMessageID;
        this._groupType = undefined;

        this.groupFeatureList = undefined;


        // Properties below are required to store information during tree creation
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;

        this._formsColumn = false;
        this._formsRow = false;
        this.hasColumnRowTitle = false; // Whether this feature has a title of a suffix row in the left-side column.
        this.hasFullWidthRowTitle = false; // Whether this feature has a title of suffix rows that spans the whole table width.
    }

    /**
     * Converts a list of Feature objects into a list of strings that represent their values. Keeps tha original
     * array structure intact (work with up two two array levels).
     * @param {Feature[] | Feature[][]} features - An array of feature objects.
     * @return {string[] | strings[][]} A matching array of strings with feature values.
     */
    static featuresToValues(features) {
        return features.map( (feature) => {
            if (Array.isArray(feature)) {
                return feature.map( (feature) => feature.value );
            }
            else {
                return feature.value;
            }
        });
    }

    /**
     * This is a wrapper around orderedFeatures() that allows to set a custom feature order for particular columns.
     * @returns {Feature[] | Feature[][]} A sorted array of feature values.
     */
    getOrderedFeatures(ancestorFeatures) {
        return this.getOrderedValues(ancestorFeatures).map((value) => new Feature$1(value, this.type, this.language));
    }

    /**
     * This is a wrapper around orderedValues() that allows to set a custom feature order for particular columns.
     * By default it returns features in the same order that is defined in a base FeatureType class.
     * Redefine it to provide a custom grouping and sort order.
     * @returns {string[] | string[][]} A sorted array of feature values.
     */
    getOrderedValues(ancestorFeatures) {
        return this._orderIndex;
    }

    /**
     * Whether this feature forms a columns group.
     * @returns {boolean} True if this feature forms a column.
     */
    get formsColumn() {
        return this._formsColumn;
    }

    /**
     * Sets that this feature would form a column.
     * @param {boolean} value
     */
    set formsColumn(value) {
        this._formsColumn = value;
        this._formsRow = !value; // Can't do both
    }

    /**
     * Whether this feature forms a row group.
     * @returns {boolean} True if this feature forms a row.
     */
    get formsRow() {
        return this._formsRow;
    }

    /**
     * Sets that this feature would form a row.
     * @param {boolean} value
     */
    set formsRow(value) {
        this._formsRow = value;
        this._formsColumn = !value; // Can't do both
    }

    /**
     * How many groups this feature would form.
     * @returns {Number} A number of groupes formed by this feature.
     */
    get size() {
        return this.orderedValues.length;
    }

    /**
     * Checks if two grouping features are of the same type.
     * @param {GroupFeatureType} groupingFeature - A grouping feature to compare with the current one.
     * @returns {boolean} True if grouping features are of the same type.
     */
    isSameType(groupingFeature) {
        return this.type === groupingFeature.type;
    }

    /**
     * Creates a title cell for a feature from the current group.
     * @param {string} title - A text that will be shown within a cell.
     * @param {number} nvGroupQty - A number of narrow view groups.
     * @returns {RowTitleCell} A created RowTitleCell object.
     */
    createTitleCell(title, nvGroupQty) {
        return new RowTitleCell(title, this, nvGroupQty);
    }
}


/**
 * Holds a list of all grouping features of a table.
 */
class GroupFeatureList extends FeatureList$1 {

    /**
     * Initializes object with an array of grouping feature objects.
     * @param {GroupFeatureType[]} features - An array of features that form a table.
     * An order of features defines in what order a table tree would be built.
     */
    constructor(features) {
        super(features);
        this._columnFeatures = []; // Features that group cells into columns
        this._rowFeatures = []; // Features that group cells into rows

        this.forEach((feature) => feature.groupFeatureList = this);
    }

    /**
     * Return a list of all grouping features that form columns.
     * @returns {GroupFeatureType[]} - An array of grouping features.
     */
    get columnFeatures() {
        return this._columnFeatures;
    }

    /**
     * Defines what features form columns. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form columns and what order
     * these columns would follow.
     */
    set columns(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.formsColumn = true;
            this._columnFeatures.push(matchingFeature);
        }
    }

    /**
     * Returns a first column feature item.
     * @returns {GroupFeatureType} A fist column feature.
     */
    get firstColumnFeature() {
        if (this._columnFeatures && this._columnFeatures.length) {
            return this._columnFeatures[0];
        }
    }

    /**
     * Returns a last column feature item.
     * @returns {GroupFeatureType} A last column feature.
     */
    get lastColumnFeature() {
        if (this._columnFeatures && this._columnFeatures.length) {
            return this._columnFeatures[this._columnFeatures.length - 1];
        }
    }

    /**
     * Return a list of all grouping features that form rows.
     * @returns {GroupFeatureType[]} - An array of grouping rows.
     */
    get rowFeatures() {
        return this._rowFeatures;
    }

    /**
     * Defines what features form rows. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form rows and what order
     * these rows would follow.
     */
    set rows(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.formsRow = true;
            this._rowFeatures.push(matchingFeature);
        }
        return this;
    }

    /**
     * Returns a first row feature item.
     * @returns {GroupFeatureType} A fist row feature.
     */
    get firstRowFeature() {
        if (this._rowFeatures && this._rowFeatures.length) {
            return this._rowFeatures[0];
        }
    }

    /**
     * Returns a last row feature item.
     * @returns {GroupFeatureType} A last row feature.
     */
    get lastRowFeature() {
        if (this._rowFeatures && this._rowFeatures.length) {
            return this._rowFeatures[this._rowFeatures.length - 1];
        }
    }

    /**
     * Defines what are the titles of suffix cell rows within a table body.
     * The number of such items defines how many left-side title columns this table would have (default is one).
     * Full width titles (see below) does not need to be specified here.
     * @param {Feature | GroupingFeature} features - What suffix row titles this table would have.
     */
    set columnRowTitles(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.hasColumnRowTitle = true;
        }
    }

    /**
     * In inflection tables, titles of features are usually located in left-side columns. However, some titles that
     * group several rows together may span the whole table width. This setters defines
     * what those features are.
     * @param {Feature | GroupingFeature} features - What feature titles would take a whole row
     */
    set fullWidthRowTitles(features) {
        for (let feature of features) {
            let matchingFeature = this.ofType(feature.type);
            if (!matchingFeature) {
                throw new Error(`Feature of ${feature.type} is not found.`)
            }
            matchingFeature.hasFullWidthRowTitle = true;
        }
    }

    /**
     * Returns a quantity of grouping features.
     * @returns {number} - A number of grouping features.
     */
    get length() {
        return this._features.length;
    }

    /**
     * Calculate a number of title columns.
     * @returns {number} A number of title columns.
     */
    get titleColumnsQuantity() {
        let quantity = 0;
        for (let feature of this._features) {
            if (feature.hasColumnRowTitle) {
                quantity++;
            }
        }
        return quantity;
    }
}

/**
 * Stores group data during feature tree construction.
 */
class NodeGroup {

    /**
     * Creates feature group data structures.
     */
    constructor() {
        this.subgroups = []; // Each value of the feature
        this.cells = []; // All cells within this group and below
        this.parent = undefined;
        this.header = undefined;

        this.groupFeatureType = undefined; // Defines a feature type that forms a tree level this node is in.
        this.ancestorFeatures = undefined; // Defines feature values of this node's parents.
    }
}

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
class WideView {

    /**
     * Initializes a wide view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
    constructor(columns, rows, headers, titleColumnQty) {
        this.columns = columns;
        this.rows = rows;
        this.headers = headers;
        this.titleColumnQty = titleColumnQty;
        this.nodes = document.createElement('div');
        this.nodes.classList.add(classNames.inflectionTable, classNames.wideView);
    }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
    get visibleColumnQty() {
        let qty = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                qty++;
            }
        }
        return qty;
    }

    /**
     * Renders an HTML representation of a wide table view.
     * @returns {HTMLElement} A rendered HTML Element.
     */
    render() {
        // Remove any previously inserted nodes
        this.nodes.innerHTML = '';

        for (let row of this.headers) {
            this.nodes.appendChild(row.titleCell.wvNode);
            for (let cell of row.cells) {
                this.nodes.appendChild(cell.wvNode);
            }
        }

        for (let row of this.rows) {
            let titleCells = row.titleCell.hierarchyList;
            if (titleCells.length < this.titleColumnQty) {
                this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length));
            }
            for (let titleCell of titleCells) {
                this.nodes.appendChild(titleCell.wvNode);
            }

            for (let cell of row.cells) {
                this.nodes.appendChild(cell.wvNode);
            }
        }
        this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', '
            + wideView.column.width + wideView.column.unit + ')';

        return this.nodes;
    }
}

/**
 * A representation of a table that is shown on narrow screens (mobile devices).
 */
class NarrowView {

    /**
     * Initializes a narrow view.
     * @param {number} groupQty - A number of visible groups (sub tables) within a narrow view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
    constructor(groupQty, columns, rows, headers, titleColumnQty) {
        this.columns = columns;
        this.rows = rows;
        this.headers = headers;
        this.titleColumnQty = titleColumnQty;
        this.groups = [];
        this.groupQty = groupQty;
        this.groupSize = 0;
        if (groupQty) {
            this.groupSize = this.columns.length / groupQty;
        }

        this.nodes = document.createElement('div');
        this.nodes.classList.add(classNames.narrowViewsContainer);

        for (let [index, headerCell] of this.headers[0].cells.entries()) {
            this.createGroup(index, headerCell);
        }
    }

    /**
     * Creates a group within a table.
     * @returns {NarrowViewGroup} A newly created group.
     */
    createGroup(index, headerCell) {
        let group = new NarrowViewGroup(index, this.headers, this.rows, this.titleColumnQty);
        this.nodes.appendChild(group.nodes);
        this.groups.push(group);
    }

    /**
     * Generates an HTML representation of a view.
     * @returns {HTMLElement} - HTML representation of a view.
     */
    render() {
        for (let group of this.groups) {
            group.render();
        }
        return this.nodes;
    }
}

/**
 * Represents a group within a narrow view. A narrow view is split into separate sub tables
 * by values of a first grammatical feature that forms columns. Then each sub table would contain
 * a suffixes that belong to that grammatical feature value only. Each sub table becomes a
 * separated object and can be reflown on devices with narrow screens.
 */
class NarrowViewGroup {
    // TODO: Review constructor parameters

    /**
     * Initializes a narrow view group. Please note that column, rows, and headers are those of a whole table,
     * not of this particular group. NarrowViewGroup constructor will use this data to build
     * the corresponding objects of the group itself.
     * @param {number} index - An index of this group within a groups array, starting from zero.
     * @param {Row[]} headers - Table headers.
     * @param {Row[]} rows - Table rows.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
    constructor(index, headers, rows, titleColumnQty) {
        this.index = index;
        this.columns = headers[0].cells[index].columns;
        this.groupSize = this.columns.length;
        let columnsStartIndex = this.columns[0].index;
        let columnsEndIndex = this.columns[this.columns.length - 1].index;

        this.rows = [];
        for (let row of rows) {
            this.rows.push(row.slice(columnsStartIndex, columnsEndIndex + 1));
        }
        this.headers = [];
        /**
         * Since we group by the first column feature, there will be a single feature in a first header row,
         * its children in the second row, children of its children in a third row and so on.
         */
        for (let [headerIndex, headerRow] of headers.entries()) {
            let row = new Row();
            row.titleCell = headerRow.titleCell;
            if (headerIndex === 0) {
                row.cells.push(headerRow.cells[index]);
            }
            else {
                for (let headerCell of this.headers[headerIndex - 1].cells) {
                    row.cells = row.cells.concat(headerCell.children);
                }
            }
            this.headers.push(row);
        }
        this.titleColumnQty = titleColumnQty;

        this.nodes = document.createElement('div');
        this.nodes.classList.add(classNames.inflectionTable, classNames.narrowView);
    }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
    get visibleColumnQty() {
        let qty = 0;
        for (let column of this.columns) {
            if (!column.hidden) {
                qty++;
            }
        }
        return qty;
    }

    /**
     * Renders an HTML representation of a narrow view group.
     */
    render() {
        this.nodes.innerHTML = '';

        if (this.visibleColumnQty) {
            // This group is visible
            for (let headerRow of this.headers) {
                this.nodes.appendChild(headerRow.titleCell.getNvNode(this.index));
                for (let headerCell of headerRow.cells) {
                    this.nodes.appendChild(headerCell.nvNode);
                }
            }

            for (let row of this.rows) {
                let titleCells = row.titleCell.hierarchyList;
                if (titleCells.length < this.titleColumnQty) {
                    this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length));
                }
                for (let titleCell of titleCells) {
                    this.nodes.appendChild(titleCell.getNvNode(this.index));
                }

                for (let cell of row.cells) {
                    this.nodes.appendChild(cell.nvNode);
                }
            }
            this.nodes.classList.remove(classNames.hidden);
            this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', '
                + narrowView.column.width + narrowView.column.unit + ')';
            this.nodes.style.width = (this.visibleColumnQty + this.titleColumnQty) * narrowView.column.width
                + narrowView.column.unit;
        }
        else {
            // This group is hidden
            this.nodes.classList.add(classNames.hidden);
        }
    }
}

/**
 * Represents an inflection table.
 */
class Table {

    /**
     * Initializes an inflection table.
     * @param {GroupFeatureType[]} features - An array of grouping features. An order of elements in this array
     */
    constructor(features) {
        this.features = new GroupFeatureList(features);
        this.emptyColumnsHidden = false;
        this.cells = []; // Will be populated by groupByFeature()

        /*
        This is a special filter function that, if defined will do additional filtering of suffixes within a cell.
         */
        this.suffixCellFilter = undefined;
    }

    /**
     * Creates a table tree and other data structures (columns, rows, headers).
     * This function is chainabe.
     * @param {Suffix[]} suffixes - An array of suffixes to build table from.
     * @returns {Table} Reference to self for chaining.
     */
    construct(suffixes) {
        this.suffixes = suffixes;
        this.tree = this.groupByFeature(suffixes);
        this.headers = this.constructHeaders();
        this.columns = this.constructColumns();
        this.rows = this.constructRows();
        this.emptyColumnsHidden = false;
        return this;
    }

    /**
     * Builds wide and narrow views of the table.
     * This function is chainabe.
     * @returns {Table} Reference to self for chaining.
     */
    constructViews() {
        this.wideView = new WideView(this.columns, this.rows, this.headers, this.titleColumnQty);
        this.narrowView = new NarrowView(
            this.features.firstColumnFeature.size, this.columns, this.rows, this.headers, this.titleColumnQty);
        return this;
    }

    /**
     * Returns a number of columns with suffix cells in a table.
     * @returns {number} A number of columns with suffix cells in a table.
     */
    get suffixColumnQty() {
        if (!this.columns) {
            throw new Error('Columns are not populated yet.');
        }
        return this.columns.length;
    }

    /**
     * Returns a number of columns with row titles in a table.
     * @returns {number} A number of columns with row titles.
     */
    get titleColumnQty() {
        if (!this.features) {
            throw new Error('Features are not defined.');
        }
        return this.features.titleColumnsQuantity;
    }

    /**
     * Returns a number of rows with suffix cells in a table.
     * @returns {number} A number of rows with suffix cells.
     */
    get suffixRowQty() {
        if (!this.columns) {
            throw new Error('Columns are not populated yet.');
        }
        return this.columns[0].length;
    }

    /**
     * Returns true if an ending grammatical feature defined by featureType has a value that is listed in a featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {string} featureType - a grammatical feature type we need to filter on.
     * @param {string | string[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have.
     * @param {Suffix} suffix - an ending we need to filter out.
     * @returns {boolean} True if suffix has a value of a grammatical feature specified.
     */
    static filter(featureType, featureValues, suffix) {
        "use strict";

        // If not an array, convert it to array for uniformity
        if (!Array.isArray(featureValues)) {
            featureValues = [featureValues];
        }
        for (const value of featureValues) {
            if (suffix.features[featureType] === value) {
                return true;
            }
        }

        return false;
    };

    /**
     * Groups all suffixes into a tree according to their grammatical features. There are several levels in this tree.
     * Each level corresponds to a one grouping feature. The order of items in GroupingFeatures List object
     * defines an order of those levels.
     * Nodes on each level are values of a grammatical feature that forms this level. An order of those values
     * is determined by the order of values within a GroupFeatureType object of each feature.
     * This is a recursive function.
     * @param {Suffix[]} suffixes - Suffixes to be grouped.
     * @param {Feature[]} ancestorFeatures - A list of feature values on levels above the current.
     * @param {number} currentLevel - At what level in a tree we are now. Used to stop recursion.
     * @returns {NodeGroup} A top level group of suffixes that contain subgroups all way down to the last group.
     */
    groupByFeature(suffixes, ancestorFeatures = [], currentLevel = 0) {
        let group = new NodeGroup();
        group.groupFeatureType = this.features.items[currentLevel];
        group.ancestorFeatures = ancestorFeatures.slice();

        // Iterate over each value of the feature
        for (const featureValue of group.groupFeatureType.getOrderedFeatures(ancestorFeatures)) {
            if (ancestorFeatures.length>0 && ancestorFeatures[ancestorFeatures.length-1].type === group.groupFeatureType.type) {
                // Remove previously inserted feature of the same type
                ancestorFeatures.pop();
            }
            ancestorFeatures.push(featureValue);

            // Suffixes that are selected for current combination of feature values
            let selectedSuffixes = suffixes.filter(Table.filter.bind(this, group.groupFeatureType.type, featureValue.value));

            if (currentLevel < this.features.length - 1) {
                // Divide to further groups
                let subGroup = this.groupByFeature(selectedSuffixes, ancestorFeatures, currentLevel + 1);
                group.subgroups.push(subGroup);
                group.cells = group.cells.concat(subGroup.cells);
            }
            else {
                // This is the last level. This represent a cell with suffixes
                // Split result has a list of suffixes in a table cell. We need to combine items with same endings.
                if (selectedSuffixes.length > 0) {
                    if (this.suffixCellFilter) {
                        selectedSuffixes = selectedSuffixes.filter(this.suffixCellFilter);
                    }

                    selectedSuffixes = Suffix.combine(selectedSuffixes);
                }

                let cell = new Cell(selectedSuffixes, ancestorFeatures.slice());
                group.subgroups.push(cell);
                group.cells.push(cell);
                this.cells.push(cell);
                cell.index = this.cells.length - 1;
            }
        }
        ancestorFeatures.pop();
        return group;
    }

    /**
     * Create columns out of a suffixes organized into a tree.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Column[]} columns - An array of columns to be constructed.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} An array of columns of suffix cells.
     */
    constructColumns(tree = this.tree, columns = [], currentLevel = 0) {
        let currentFeature = this.features.items[currentLevel];

        let groups = [];
        for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate until it is the last row feature
            if (!currentFeature.isSameType(this.features.lastRowFeature)) {
                let currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1);
                if (currentFeature.formsRow) {
                    // TODO: Avoid creating extra cells


                    let group = {
                        titleText: featureValue,
                        groups: currentResult,
                        titleCell: currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size)
                    };
                    group.groups[0].titleCell.parent = group.titleCell;
                    groups.push(group);
                }
                else if (currentFeature.isSameType(this.features.lastColumnFeature)) {
                    let column = new Column(cellGroup.cells);
                    column.groups = currentResult;
                    column.header = featureValue;
                    column.index = columns.length;
                    columns.push(column);
                    column.headerCell = this.headers[this.headers.length-1].cells[columns.length - 1];
                }
            }
            else {
                // Last level
                cellGroup.titleCell = currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size);
                let group = {
                    titleText: featureValue,
                    cell: cellGroup,
                    titleCell: cellGroup.titleCell
                };
                groups.push(group);
            }
        }
        if (currentFeature.formsRow) {
            return groups;
        }
        return columns;
    }

    /**
     * Creates an array of header cell rows.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Row[]} headers - An array of rows with header cells.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} A two-dimensional array of header cell rows.
     */
    constructHeaders(tree = this.tree, headers = [], currentLevel = 0) {
        let currentFeature = this.features.columnFeatures[currentLevel];

        let cells = [];
        for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
            let cellGroup = tree.subgroups[index];

            // Iterate over all column features (features that form columns)
            if (currentLevel < this.features.columnFeatures.length - 1) {
                let subCells = this.constructHeaders(cellGroup, headers, currentLevel + 1);

                let columnSpan = 0;
                for (let cell of subCells) {
                    columnSpan += cell.span;
                }

                let headerCell = new HeaderCell(featureValue, currentFeature, columnSpan);
                headerCell.children = subCells;
                for (let cell of subCells) {
                    cell.parent = headerCell;
                }

                if (!headers[currentLevel]) {
                    headers[currentLevel] = new Row();
                }
                headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);

                headers[currentLevel].add(headerCell);
                cells.push(headerCell);
            }
            else {
                // Last level
                let headerCell = new HeaderCell(featureValue, currentFeature);

                if (!headers[currentLevel]) {
                    headers[currentLevel] = new Row();
                }

                headers[currentLevel].add(headerCell);
                headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);
                cells.push(headerCell);
            }
        }
        if (currentLevel === 0) {
            return headers;
        }
        else {
            return cells;
        }
    }

    /**
     * Creates an array of rows by parsing an array of columns.
     * @returns {Row[]} An array of rows.
     */
    constructRows() {
        let rows = [];
        for (let rowIndex = 0; rowIndex < this.suffixRowQty; rowIndex++) {
            rows[rowIndex] = new Row();
            rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell;
            for (let columnIndex = 0; columnIndex < this.suffixColumnQty; columnIndex++) {
                rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex]);
            }
        }
        return rows;
    }

    /**
     * Adds event listeners to each cell object.
     */
    addEventListeners() {
        for (let cell of this.cells) {
            cell.addEventListener('mouseenter', this.highlightRowAndColumn.bind(this));
            cell.addEventListener('mouseleave', this.clearRowAndColumnHighlighting.bind(this));
        }
    }

    /**
     * Highlights a row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
    highlightRowAndColumn(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].highlightRowAndColumn();
    }

    /**
     * Removes highlighting from row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
    clearRowAndColumnHighlighting(event) {
        let index = event.currentTarget.dataset.index;
        this.cells[index].clearRowAndColumnHighlighting();
    }

    /**
     * Hides empty columns in a table.
     */
    hideEmptyColumns() {
        for (let column of this.columns) {
            if (column.empty) {
                column.hide();
            }
        }
        this.emptyColumnsHidden = true;
    }

    /**
     * Show all empty columns that were previously hidden.
     */
    showEmptyColumns() {
        for (let column of this.columns) {
            if (column.hidden) {
                column.show();
            }
        }
        this.emptyColumnsHidden = false;
    }

    /**
     * Hide groups that have no suffix matches.
     */
    hideNoSuffixGroups() {
        for (let headerCell of this.headers[0].cells) {
            let matches = !!headerCell.columns.find(column => column.suffixMatches);
            if (!matches) {
                for (let column of headerCell.columns) {
                    column.hide();
                }
            }
        }
        this.suffixMatchesHidden = true;
    }

    /**
     * Show groups that have no suffix matches.
     */
    showNoSuffixGroups() {
        for (let column of this.columns) {
            column.show();
        }
        if (this.emptyColumnsHidden) {
            this.hideEmptyColumns();
        }
        this.suffixMatchesHidden = false;
    }
}

/**
 * Represents a list of footnotes.
 */
class Footnotes {

    /**
     * Initialises a Footnotes object.
     * @param {Footnote[]} footnotes - An array of footnote objects.
     */
    constructor(footnotes$$1) {
        this.footnotes = footnotes$$1;

        this.nodes = document.createElement('dl');
        this.nodes.id = footnotes.id;
        this.nodes.classList.add(classNames.footnotesContainer);
        for (let footnote of footnotes$$1) {
            let index = document.createElement('dt');
            index.innerHTML = footnote.index;
            this.nodes.appendChild(index);
            let text = document.createElement('dd');
            text.innerHTML = footnote.text;
            this.nodes.appendChild(text);
        }
    }

    /**
     * Returns an HTML representation of a Footnotes object.
     * @returns {HTMLElement} An HTML representation of a Footnotes object.
     */
    get html() {
        return this.nodes;
    }
}


/**
 * Represents a single view.
 */
class View {

    /**
     * Initializes a View object with options. There is at least one view per part of speech,
     * but there could be several views for the same part of speech that show different table representation of a view.
     * @param {Object} viewOptions
     */
    constructor() {

        //this.options = viewOptions;
        this.pageHeader = {};

        // An HTML element where this view is rendered
        this.container = undefined;

        // Must be implemented in a descendant
        this.id = 'baseView';
        this.name = 'base view';
        this.title = 'Base View';
        this.language = undefined;
        this.partOfSpeech = undefined;
    }

    /**
     * Converts a WordData, returned from inflection tables library, into an HTML representation of an inflection table
     * and inserts that HTML into a `container` HTML element. `messages` provides a translation for view's texts.
     * @param {HTMLElement} container - An HTML element where this view will be inserted.
     * @param {WordData} wordData - A result set from inflection tables library.
     * @param {MessageBundle} messages - A message bundle with message translations.
     */
    render(container, wordData, messages) {
        "use strict";

        this.messages = messages;
        this.container = container;
        this.wordData = wordData;
        let selection = wordData[this.partOfSpeech];

        this.footnotes = new Footnotes(selection.footnotes);

        //this.table = new Table(selection.suffixes, this.groupingFeatures, messages);
        //this.table = new Table();
        //this.setTableData();
        this.table.messages = messages;
        this.table.construct(selection.suffixes).constructViews();
        this.display();
    }

    /**
     * Renders a view's HTML representation and inserts it into `container` HTML element.
     */
    display() {
        // Clear the container
        this.container.innerHTML = '';

        let word = document.createElement('h2');
        word.innerHTML = this.wordData.homonym.targetWord;
        this.container.appendChild(word);

        let title = document.createElement('h3');
        title.innerHTML = this.title;
        this.container.appendChild(title);

        this.pageHeader = { nodes: document.createElement('div') };
        this.pageHeader.nodes.innerHTML = pageHeader.html;
        this.pageHeader.hideEmptyColumnsBtn = this.pageHeader.nodes.querySelector(pageHeader.hideEmptyColumnsBtnSel);
        this.pageHeader.showEmptyColumnsBtn = this.pageHeader.nodes.querySelector(pageHeader.showEmptyColumnsBtnSel);
        this.pageHeader.hideNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(pageHeader.hideNoSuffixGroupsBtnSel);
        this.pageHeader.showNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(pageHeader.showNoSuffixGroupsBtnSel);
        this.container.appendChild(this.pageHeader.nodes);


        // Insert a wide view
        this.container.appendChild(this.table.wideView.render());
        // Insert narrow views
        this.container.appendChild(this.table.narrowView.render());

        this.table.addEventListeners();

        this.container.appendChild(this.footnotes.html);

        this.pageHeader.hideEmptyColumnsBtn.addEventListener('click', this.hideEmptyColumns.bind(this));
        this.pageHeader.showEmptyColumnsBtn.addEventListener('click', this.showEmptyColumns.bind(this));

        this.pageHeader.hideNoSuffixGroupsBtn.addEventListener('click', this.hideNoSuffixGroups.bind(this));
        this.pageHeader.showNoSuffixGroupsBtn.addEventListener('click', this.showNoSuffixGroups.bind(this));
    }


    /**
     * Hides all empty columns of the view.
     */
    hideEmptyColumns() {
        this.table.hideEmptyColumns();
        this.display();
        this.pageHeader.hideEmptyColumnsBtn.classList.add(classNames.hidden);
        this.pageHeader.showEmptyColumnsBtn.classList.remove(classNames.hidden);
    }

    /**
     * Displays all previously hidden columns.
     */
    showEmptyColumns() {
        this.table.showEmptyColumns();
        this.display();
        this.pageHeader.showEmptyColumnsBtn.classList.add(classNames.hidden);
        this.pageHeader.hideEmptyColumnsBtn.classList.remove(classNames.hidden);
    }

    /**
     * Hides groups (formed by first column feature) that have no suffix matches.
     */
    hideNoSuffixGroups() {
        this.table.hideNoSuffixGroups();
        this.display();
        this.pageHeader.hideNoSuffixGroupsBtn.classList.add(classNames.hidden);
        this.pageHeader.showNoSuffixGroupsBtn.classList.remove(classNames.hidden);
    }

    /**
     * Displays previously hidden groups with no suffix matches.
     */
    showNoSuffixGroups() {
        this.table.showNoSuffixGroups();
        this.display();
        this.pageHeader.hideNoSuffixGroupsBtn.classList.add(classNames.hidden);
        this.pageHeader.showNoSuffixGroupsBtn.classList.remove(classNames.hidden);
    }
}

class LatinView extends View {
    constructor() {
        super();
        this.language = languages.latin;
        this.language_features = languageModel.features;

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
        this.features = {
            numbers: new undefined(this.language_features[Feature$1.types.number], 'Number'),
            cases: new undefined(this.language_features[Feature$1.types.case], 'Case'),
            declensions: new undefined(this.language_features[Feature$1.types.declension], 'Declension'),
            genders: new undefined(this.language_features[Feature$1.types.gender], 'Gender'),
            types: new undefined(this.language_features[Feature$1.types.type], 'Type')
        };
    }

    /**
     * Creates and initializes an inflection table. Redefine this method in child objects in order to create
     * an inflection table differently.
     */
    createTable() {
        this.table = new Table([this.features.declensions, this.features.genders,
            this.features.types, this.features.numbers, this.features.cases]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.declension], this.language_featuers[Feature$1.types.gender], this.language_features[features.types.type]];
        features.rows = [this.language_features[Feature$1.types.number], this.language_feature[features.types.case]];
        features.columnRowTitles = [this.language_features[Feature$1.types.case]];
        features.fullWidthRowTitles = [this.language_features[Feature$1.types.number]];
    }
}

class NounView extends LatinView {
    constructor() {
        super();
        this.id = 'nounDeclension';
        this.name = 'noun declension';
        this.title = 'Noun declension';
        this.partOfSpeech = this.language_features[Feature$1.types.part].noun.value;

        // Models.Feature that are different from base class values
        this.features.genders = new undefined(this.language_features[Feature$1.types.gender], 'Gender',
            [[this.language_features[Feature$1.types.gender].masculine, this.language_features[Feature$1.types.gender].feminine], this.language_features[Feature$1.types.gender].neuter]);

        this.createTable();
    }
}

class AdjectiveView extends LatinView {
    constructor() {
        super();
        this.id = 'adjectiveDeclension';
        this.name = 'adjective declension';
        this.title = 'Adjective declension';
        this.partOfSpeech = this.language_features[Feature$1.types.part].adjective.value;

        // Models.Feature that are different from base class values
        this.features.declensions = new undefined(this.language_features[Feature$1.types.declension], 'Declension',
            [this.language_features[Feature$1.types.declension].first, this.language_features[Feature$1.types.declension].second, this.language_features[Feature$1.types.declension].third]);

        this.createTable();
    }
}

class VerbView extends LatinView {
    constructor() {
        super();
        this.partOfSpeech = this.language_features[Feature$1.types.part].verb.value;

        this.features = {
            tenses: new undefined(this.language_features[Feature$1.types.tense], 'Tenses'),
            numbers: new undefined(this.language_features[Feature$1.types.number], 'Number'),
            persons: new undefined(this.language_features[Feature$1.types.person], 'Person'),
            voices: new undefined(this.language_features[Feature$1.types.voice], 'Voice'),
            conjugations: new undefined(this.language_features[Feature$1.types.conjugation], 'Conjugation Stem'),
            moods: new undefined(this.language_features[Feature$1.types.mood], 'Mood')
        };
    }
}

class VoiceConjugationMoodView extends VerbView {
    constructor() {
        super();
        this.id = 'verbVoiceConjugationMood';
        this.name = 'verb voice-conjugation-mood';
        this.title = 'Voice-Conjugation-Mood';

        this.createTable();
    }

    createTable() {
        this.table = new Table([this.features.voices, this.features.conjugations, this.features.moods,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.voice], this.language_features[Feature$1.types.conjugation], this.language_features[Feature$1.types.mood]];
        features.rows = [this.language_features[Feature$1.types.tense], this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.columnRowTitles = [this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.fullWidthRowTitles = [this.language_features[Feature$1.types.tense]];
    }
}

class VoiceMoodConjugationView extends VerbView {
    constructor() {
        super();
        this.id = 'verbVoiceMoodConjugation';
        this.name = 'verb voice-mood-conjugation';
        this.title = 'Voice-Mood-Conjugation';

        this.createTable();
    }

    createTable() {
        this.table = new Table([this.features.voices, this.features.moods, this.features.conjugations,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.voice], this.language_features[Feature$1.types.mood], this.language_features[Feature$1.types.conjugation]];
        features.rows = [this.language_features[Feature$1.types.tense], this.language_feautres[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.columnRowTitles = [this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.fullWidthRowTitles = [this.language_features[Feature$1.types.tense]];
    }
}

class ConjugationVoiceMoodView extends VerbView {
    constructor() {
        super();
        this.id = 'verbConjugationVoiceMood';
        this.name = 'verb conjugation-voice-mood';
        this.title = 'Conjugation-Voice-Mood';

        this.createTable();
    }

    createTable() {
        this.table = new Table([this.features.conjugations, this.features.voices, this.features.moods,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.conjugation], this.language_features[Feature$1.types.voice], this.language_features[Feature$1.types.mood]];
        features.rows = [this.language_features[Feature$1.types.tense], this.language_features[Feature$1.types.number],this.language_features[Feature$1.types.person]];
        features.columnRowTitles = [this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.fullWidthRowTitles = [this.language_features[Feature$1.types.tense]];
    }
}

class ConjugationMoodVoiceView extends VerbView {
    constructor() {
        super();
        this.id = 'verbConjugationMoodVoice';
        this.name = 'verb conjugation-mood-voice';
        this.title = 'Conjugation-Mood-Voice';

        this.createTable();
    }

    createTable() {
        this.table = new Table([this.features.conjugations, this.features.moods, this.features.voices,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.conjugation], this.langage_features[Feature$1.types.mood], this.language_features[Feature$1.types.voice]];
        features.rows = [this.language_features[Feature$1.types.tense], this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.columnRowTitles = [this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.fullWidthRowTitles = [this.language_features[Feature$1.types.tense]];
    }
}

class MoodVoiceConjugationView extends VerbView {
    constructor() {
        super();
        this.id = 'verbMoodVoiceConjugation';
        this.name = 'verb mood-voice-conjugation';
        this.title = 'Mood-Voice-Conjugation';

        this.createTable();
    }

    createTable() {
        this.table = new Table([this.features.moods, this.features.voices, this.features.conjugations,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.mood], this.language_features[Feature$1.types.voice], this.language_features[Feature$1.types.conjugation]];
        features.rows = [this.language_features[Feature$1.types.tense], this.language_features[Feature$1.types.number], this.langage_features[Feature$1.types.person]];
        features.columnRowTitles = [this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.fullWidthRowTitles = [this.language_feautres[Feature$1.types.tense]];
    }
}

class MoodConjugationVoiceView extends VerbView {
    constructor() {
        super();
        this.id = 'verbMoodConjugationVoice';
        this.name = 'verb mood-conjugation-voice';
        this.title = 'Mood-Conjugation-Voice';

        this.createTable();
    }

    createTable() {
        this.table = new Table([this.features.moods, this.features.conjugations, this.features.voices,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [this.language_features[Feature$1.types.mood], this.language_feautres[Feature$1.types.conjugation], this.language_features[Feature$1.types.voice]];
        features.rows = [this.language_features[Feature$1.types.tense], this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.columnRowTitles = [this.language_features[Feature$1.types.number], this.language_features[Feature$1.types.person]];
        features.fullWidthRowTitles = [this.language_features[Feature$1.types.tense]];
    }
}

var viewsLatin = [new NounView(), new AdjectiveView(),
    // Verbs
    new VoiceConjugationMoodView(), new VoiceMoodConjugationView(), new ConjugationVoiceMoodView(),
    new ConjugationMoodVoiceView(), new MoodVoiceConjugationView(), new MoodConjugationVoiceView()];

var nounSuffixesCSV = "Ending,Number,Case,Declension,Gender,Type,Primary,Footnote\nα,dual,accusative,1st,feminine,regular,primary,\nά,dual,accusative,1st,feminine,regular,,\nᾶ,dual,accusative,1st,feminine,regular,,2\nαιν,dual,dative,1st,feminine,regular,primary,\nαῖν,dual,dative,1st,feminine,regular,,\nαιιν,dual,dative,1st,feminine,irregular,,\nαιν,dual,genitive,1st,feminine,regular,primary,\nαῖν,dual,genitive,1st,feminine,regular,,\nαιιν,dual,genitive,1st,feminine,irregular,,\nα,dual,nominative,1st,feminine,regular,primary,\nά,dual,nominative,1st,feminine,regular,,\nᾶ,dual,nominative,1st,feminine,regular,,2\nα,dual,vocative,1st,feminine,regular,primary,\nά,dual,vocative,1st,feminine,regular,,\nᾶ,dual,vocative,1st,feminine,regular,,2\nα,dual,accusative,1st,masculine,regular,primary,\nά,dual,accusative,1st,masculine,regular,,\nᾶ,dual,accusative,1st,masculine,regular,,2\nαιν,dual,dative,1st,masculine,regular,primary,\nαῖν,dual,dative,1st,masculine,regular,,\nαιιν,dual,dative,1st,masculine,irregular,,\nαιν,dual,genitive,1st,masculine,regular,primary,\nαῖν,dual,genitive,1st,masculine,regular,,\nαιιν,dual,genitive,1st,masculine,irregular,,\nα,dual,nominative,1st,masculine,regular,primary,\nά,dual,nominative,1st,masculine,regular,,\nᾶ,dual,nominative,1st,masculine,regular,,2\nα,dual,vocative,1st,masculine,regular,primary,\nά,dual,vocative,1st,masculine,regular,,\nᾶ,dual,vocative,1st,masculine,regular,,2\nας,plural,accusative,1st,feminine,regular,primary,\nάς,plural,accusative,1st,feminine,regular,,\nᾶς,plural,accusative,1st,feminine,regular,,2\nανς,plural,accusative,1st,feminine,irregular,,\nαις,plural,accusative,1st,feminine,irregular,,\nαις,plural,dative,1st,feminine,regular,primary,\nαῖς,plural,dative,1st,feminine,regular,,\nῃσι,plural,dative,1st,feminine,irregular,,44\nῃσιν,plural,dative,1st,feminine,irregular,,4 44\nῃς,plural,dative,1st,feminine,irregular,,44\nαισι,plural,dative,1st,feminine,irregular,,44\nαισιν,plural,dative,1st,feminine,irregular,,4 44\nῶν,plural,genitive,1st,feminine,regular,primary,\nάων,plural,genitive,1st,feminine,irregular,,\nέων,plural,genitive,1st,feminine,irregular,,\nήων,plural,genitive,1st,feminine,irregular,,\nᾶν,plural,genitive,1st,feminine,irregular,,\nαι,plural,nominative,1st,feminine,regular,primary,\nαί,plural,nominative,1st,feminine,regular,,\nαῖ,plural,nominative,1st,feminine,regular,,2\nαι,plural,vocative,1st,feminine,regular,primary,\nαί,plural,vocative,1st,feminine,regular,,\nαῖ,plural,vocative,1st,feminine,regular,,2\nας,plural,accusative,1st,masculine,regular,primary,\nάς,plural,accusative,1st,masculine,regular,,\nᾶς,plural,accusative,1st,masculine,regular,,3\nανς,plural,accusative,1st,masculine,irregular,,\nαις,plural,accusative,1st,masculine,irregular,,\nαις,plural,dative,1st,masculine,regular,primary,\nαῖς,plural,dative,1st,masculine,regular,,\nῃσι,plural,dative,1st,masculine,irregular,,44\nῃσιν,plural,dative,1st,masculine,irregular,,4 44\nῃς,plural,dative,1st,masculine,irregular,,44\nαισι,plural,dative,1st,masculine,irregular,,44\nαισιν,plural,dative,1st,masculine,irregular,,4 44\nῶν,plural,genitive,1st,masculine,regular,primary,\nάων,plural,genitive,1st,masculine,irregular,,\nέων,plural,genitive,1st,masculine,irregular,,\nήων,plural,genitive,1st,masculine,irregular,,\nᾶν,plural,genitive,1st,masculine,irregular,,\nαι,plural,nominative,1st,masculine,regular,primary,\nαί,plural,nominative,1st,masculine,regular,,\nαῖ,plural,nominative,1st,masculine,regular,,3\nαι,plural,vocative,1st,masculine,regular,primary,\nαί,plural,vocative,1st,masculine,regular,,\nαῖ,plural,vocative,1st,masculine,regular,,3\nαν,singular,accusative,1st,feminine,regular,primary,\nην,singular,accusative,1st,feminine,regular,primary,\nήν,singular,accusative,1st,feminine,regular,,\nᾶν,singular,accusative,1st,feminine,regular,,2\nῆν,singular,accusative,1st,feminine,regular,,2\nάν,singular,accusative,1st,feminine,irregular,,63\nᾳ,singular,dative,1st,feminine,regular,primary,\nῃ,singular,dative,1st,feminine,regular,primary,\nῇ,singular,dative,1st,feminine,regular,,2\nᾷ,singular,dative,1st,feminine,regular,,2\nηφι,singular,dative,1st,feminine,irregular,,45\nηφιν,singular,dative,1st,feminine,irregular,,4 45\nῆφι,singular,dative,1st,feminine,irregular,,45\nῆφιv,singular,dative,1st,feminine,irregular,,4 45\nας,singular,genitive,1st,feminine,regular,primary,\nης,singular,genitive,1st,feminine,regular,primary,\nῆs,singular,genitive,1st,feminine,regular,,\nᾶs,singular,genitive,1st,feminine,regular,,2\nηφι,singular,genitive,1st,feminine,irregular,,45\nηφιν,singular,genitive,1st,feminine,irregular,,4 45\nῆφι,singular,genitive,1st,feminine,irregular,,45\nῆφιv,singular,genitive,1st,feminine,irregular,,4 45\nα,singular,nominative,1st,feminine,regular,primary,\nη,singular,nominative,1st,feminine,regular,primary,1\nή,singular,nominative,1st,feminine,regular,,\nᾶ,singular,nominative,1st,feminine,regular,,2\nῆ,singular,nominative,1st,feminine,regular,,2\nά,singular,nominative,1st,feminine,irregular,,63\nα,singular,vocative,1st,feminine,regular,primary,\nη,singular,vocative,1st,feminine,regular,primary,\nή,singular,vocative,1st,feminine,regular,,\nᾶ,singular,vocative,1st,feminine,regular,,2\nῆ,singular,vocative,1st,feminine,regular,,2\nά,singular,vocative,1st,feminine,irregular,,63\nαν,singular,accusative,1st,masculine,regular,primary,\nην,singular,accusative,1st,masculine,regular,primary,3\nήν,singular,accusative,1st,masculine,regular,,\nᾶν,singular,accusative,1st,masculine,regular,,3\nῆν,singular,accusative,1st,masculine,regular,,3\nεα,singular,accusative,1st,masculine,irregular,,\nᾳ,singular,dative,1st,masculine,regular,primary,\nῃ,singular,dative,1st,masculine,regular,primary,\nῇ,singular,dative,1st,masculine,regular,,\nᾷ,singular,dative,1st,masculine,regular,,3\nῆ,singular,dative,1st,masculine,regular,,3\nηφι,singular,dative,1st,masculine,irregular,,45\nηφιν,singular,dative,1st,masculine,irregular,,4 45\nῆφι,singular,dative,1st,masculine,irregular,,45\nῆφιv,singular,dative,1st,masculine,irregular,,4 45\nου,singular,genitive,1st,masculine,regular,primary,\nοῦ,singular,genitive,1st,masculine,regular,,\nαο,singular,genitive,1st,masculine,irregular,,\nεω,singular,genitive,1st,masculine,irregular,,\nηφι,singular,genitive,1st,masculine,irregular,,45\nηφιν,singular,genitive,1st,masculine,irregular,,4 45\nῆφι,singular,genitive,1st,masculine,irregular,,45\nῆφιv,singular,genitive,1st,masculine,irregular,,4 45\nω,singular,genitive,1st,masculine,irregular,,\nα,singular,genitive,1st,masculine,irregular,,\nας,singular,nominative,1st,masculine,regular,primary,\nης,singular,nominative,1st,masculine,regular,primary,\nής,singular,nominative,1st,masculine,regular,,\nᾶs,singular,nominative,1st,masculine,regular,,3\nῆs,singular,nominative,1st,masculine,regular,,3\nα,singular,vocative,1st,masculine,regular,primary,\nη,singular,vocative,1st,masculine,regular,primary,\nά,singular,vocative,1st,masculine,regular,,\nᾶ,singular,vocative,1st,masculine,regular,,3\nῆ,singular,vocative,1st,masculine,regular,,3\nω,dual,accusative,2nd,masculine feminine,regular,primary,\nώ,dual,accusative,2nd,masculine feminine,regular,,5\nοιν,dual,dative,2nd,masculine feminine,regular,primary,\nοῖν,dual,dative,2nd,masculine feminine,regular,,5\nοιιν,dual,dative,2nd,masculine feminine,irregular,,\nῴν,dual,dative,2nd,masculine feminine,irregular,,7\nοιν,dual,genitive,2nd,masculine feminine,regular,primary,\nοῖν,dual,genitive,2nd,masculine feminine,regular,,5\nοιιν,dual,genitive,2nd,masculine feminine,irregular,,\nῴν,dual,genitive,2nd,masculine feminine,irregular,,7\nω,dual,nominative,2nd,masculine feminine,regular,primary,60\nώ,dual,nominative,2nd,masculine feminine,regular,,60\nω,dual,vocative,2nd,masculine feminine,regular,primary,\nώ,dual,vocative,2nd,masculine feminine,regular,,5\nω,dual,accusative,2nd,neuter,regular,primary,\nώ,dual,accusative,2nd,neuter,regular,,6\nοιν,dual,dative,2nd,neuter,regular,primary,\nοῖν,dual,dative,2nd,neuter,regular,,6\nοιιν,dual,dative,2nd,neuter,irregular,,\nοιν,dual,genitive,2nd,neuter,regular,primary,\nοῖν,dual,genitive,2nd,neuter,regular,,6\nοιιν,dual,genitive,2nd,neuter,irregular,,\nω,dual,nominative,2nd,neuter,regular,primary,\nώ,dual,nominative,2nd,neuter,regular,,6\nω,dual,vocative,2nd,neuter,regular,primary,\nώ,dual,vocative,2nd,neuter,regular,,6\nους,plural,accusative,2nd,masculine feminine,regular,primary,\nούς,plural,accusative,2nd,masculine feminine,regular,,41\nοῦς,plural,accusative,2nd,masculine feminine,regular,,5\nονς,plural,accusative,2nd,masculine feminine,irregular,,\nος,plural,accusative,2nd,masculine feminine,irregular,,\nως,plural,accusative,2nd,masculine feminine,irregular,,\nοις,plural,accusative,2nd,masculine feminine,irregular,,\nώς,plural,accusative,2nd,masculine feminine,irregular,,7\nοις,plural,dative,2nd,masculine feminine,regular,primary,\nοῖς,plural,dative,2nd,masculine feminine,regular,,5\nοισι,plural,dative,2nd,masculine feminine,irregular,,\nοισιν,plural,dative,2nd,masculine feminine,irregular,,4\nῴς,plural,dative,2nd,masculine feminine,irregular,,7\nόφι,plural,dative,2nd,masculine feminine,irregular,,45\nόφιv,plural,dative,2nd,masculine feminine,irregular,,4 45\nων,plural,genitive,2nd,masculine feminine,regular,primary,\nῶν,plural,genitive,2nd,masculine feminine,regular,,5\nών,plural,genitive,2nd,masculine feminine,irregular,,7\nόφι,plural,genitive,2nd,masculine feminine,irregular,,45\nόφιv,plural,genitive,2nd,masculine feminine,irregular,,4 45\nοι,plural,nominative,2nd,masculine feminine,regular,primary,\nοί,plural,nominative,2nd,masculine feminine,regular,,41\nοῖ,plural,nominative,2nd,masculine feminine,regular,,5\nῴ,plural,nominative,2nd,masculine feminine,irregular,,7\nοι,plural,vocative,2nd,masculine feminine,regular,primary,\nοί,plural,vocative,2nd,masculine feminine,regular,,41\nοῖ,plural,vocative,2nd,masculine feminine,regular,,5\nα,plural,accusative,2nd,neuter,regular,primary,\nᾶ,plural,accusative,2nd,neuter,regular,,6\nοις,plural,dative,2nd,neuter,regular,primary,\nοῖς,plural,dative,2nd,neuter,regular,,6\nοισι,plural,dative,2nd,neuter,irregular,,\nοισιν,plural,dative,2nd,neuter,irregular,,4\nόφι,plural,dative,2nd,neuter,irregular,,45\nόφιv,plural,dative,2nd,neuter,irregular,,4 45\nων,plural,genitive,2nd,neuter,regular,primary,\nῶν,plural,genitive,2nd,neuter,regular,,6\nόφι,plural,genitive,2nd,neuter,irregular,,45\nόφιv,plural,genitive,2nd,neuter,irregular,,4 45\nα,plural,nominative,2nd,neuter,regular,primary,\nᾶ,plural,nominative,2nd,neuter,regular,,6\nα,plural,vocative,2nd,neuter,regular,primary,\nᾶ,plural,vocative,2nd,neuter,regular,,6\nον,singular,accusative,2nd,masculine feminine,regular,primary,\nόν,singular,accusative,2nd,masculine feminine,regular,primary,41\nουν,singular,accusative,2nd,masculine feminine,regular,,5\nοῦν,singular,accusative,2nd,masculine feminine,regular,,5\nω,singular,accusative,2nd,masculine feminine,irregular,,7 5\nωv,singular,accusative,2nd,masculine feminine,irregular,,7 59\nώ,singular,accusative,2nd,masculine feminine,irregular,,7 42 59\nών,singular,accusative,2nd,masculine feminine,irregular,,7 59\nῳ,singular,dative,2nd,masculine feminine,regular,primary,\nῷ,singular,dative,2nd,masculine feminine,regular,,5\nῴ,singular,dative,2nd,masculine feminine,irregular,,7\nόφι,singular,dative,2nd,masculine feminine,irregular,,45\nόφιv,singular,dative,2nd,masculine feminine,irregular,,4 45\nου,singular,genitive,2nd,masculine feminine,regular,primary,\nοῦ,singular,genitive,2nd,masculine feminine,regular,,5\nοιο,singular,genitive,2nd,masculine feminine,irregular,,\nοο,singular,genitive,2nd,masculine feminine,irregular,,\nω,singular,genitive,2nd,masculine feminine,irregular,,\nώ,singular,genitive,2nd,masculine feminine,irregular,,7\nόφι,singular,genitive,2nd,masculine feminine,irregular,,45\nόφιv,singular,genitive,2nd,masculine feminine,irregular,,4 45\nος,singular,nominative,2nd,masculine feminine,regular,primary,\nους,singular,nominative,2nd,masculine feminine,regular,,5\noῦς,singular,nominative,2nd,masculine feminine,regular,,5\nός,singular,nominative,2nd,masculine feminine,regular,,\nώς,singular,nominative,2nd,masculine feminine,irregular,,7 42\nως,singular,nominative,2nd,masculine feminine,irregular,,\nε,singular,vocative,2nd,masculine feminine,regular,primary,\nέ,singular,vocative,2nd,masculine feminine,regular,,\nοu,singular,vocative,2nd,masculine feminine,regular,,5\nοῦ,singular,vocative,2nd,masculine feminine,regular,,42\nός,singular,vocative,2nd,masculine feminine,irregular,,57\nον,singular,accusative,2nd,neuter,regular,primary,\nοῦν,singular,accusative,2nd,neuter,regular,,6\nῳ,singular,dative,2nd,neuter,regular,primary,\nῷ,singular,dative,2nd,neuter,regular,,6\nόφι,singular,dative,2nd,neuter,irregular,,45\nόφιv,singular,dative,2nd,neuter,irregular,,4 45\nου,singular,genitive,2nd,neuter,regular,primary,\nοῦ,singular,genitive,2nd,neuter,regular,,6\nοο,singular,genitive,2nd,neuter,irregular,,\nοιο,singular,genitive,2nd,neuter,irregular,,\nω,singular,genitive,2nd,neuter,irregular,,\nόφι,singular,genitive,2nd,neuter,irregular,,45\nόφιv,singular,genitive,2nd,neuter,irregular,,4 45\nον,singular,nominative,2nd,neuter,regular,primary,\nοῦν,singular,nominative,2nd,neuter,regular,,6\nον,singular,vocative,2nd,neuter,regular,primary,\nοῦν,singular,vocative,2nd,neuter,regular,,6\nε,dual,accusative,3rd,masculine feminine,regular,primary,\nει,dual,accusative,3rd,masculine feminine,regular,,\nῆ,dual,accusative,3rd,masculine feminine,regular,,18\nω,dual,accusative,3rd,masculine feminine,irregular,,32\nῖ,dual,accusative,3rd,masculine feminine,irregular,,33\nεε,dual,accusative,3rd,masculine feminine,irregular,,16 55 61\nοιν,dual,dative,3rd,masculine feminine,regular,primary,\nοῖν,dual,dative,3rd,masculine feminine,regular,,\nοιιν,dual,dative,3rd,masculine feminine,irregular,,54\nσι,dual,dative,3rd,masculine feminine,irregular,,33 37\nεσσι,dual,dative,3rd,masculine feminine,irregular,,33\nεσι,dual,dative,3rd,masculine feminine,irregular,,33\nέοιν,dual,dative,3rd,masculine feminine,irregular,,16 61\nῳν,dual,dative,3rd,masculine feminine,irregular,,49\nοιν,dual,genitive,3rd,masculine feminine,regular,primary,\nοῖν,dual,genitive,3rd,masculine feminine,regular,,\nοιιν,dual,genitive,3rd,masculine feminine,irregular,,54\nέοιν,dual,genitive,3rd,masculine feminine,irregular,,16 61\nῳν,dual,genitive,3rd,masculine feminine,irregular,,49\nε,dual,nominative,3rd,masculine feminine,regular,primary,\nει,dual,nominative,3rd,masculine feminine,regular,,\nῆ,dual,nominative,3rd,masculine feminine,regular,,18\nω,dual,nominative,3rd,masculine feminine,irregular,,32\nῖ,dual,nominative,3rd,masculine feminine,irregular,,33\nεε,dual,nominative,3rd,masculine feminine,irregular,,16 55 61\nε,dual,vocative,3rd,masculine feminine,regular,primary,\nει,dual,vocative,3rd,masculine feminine,regular,,\nῆ,dual,vocative,3rd,masculine feminine,regular,,18\nω,dual,vocative,3rd,masculine feminine,irregular,,32\nῖ,dual,vocative,3rd,masculine feminine,irregular,,33\nεε,dual,vocative,3rd,masculine feminine,irregular,,16 55 61\nε,dual,accusative,3rd,neuter,regular,primary,\nει,dual,accusative,3rd,neuter,regular,,\nα,dual,accusative,3rd,neuter,regular,,\nεε,dual,accusative,3rd,neuter,irregular,,16 61\nαε,dual,accusative,3rd,neuter,irregular,,16 61\nοιν,dual,dative,3rd,neuter,regular,primary,\nῷν,dual,dative,3rd,neuter,regular,,\nοις,dual,dative,3rd,neuter,irregular,,33 38\nοισι,dual,dative,3rd,neuter,irregular,,33 38\nοισι(ν),dual,dative,3rd,neuter,irregular,,4 33 38\nοιιν,dual,dative,3rd,neuter,irregular,,\nέοιν,dual,dative,3rd,neuter,irregular,,16 61\nάοιν,dual,dative,3rd,neuter,irregular,,16 61\nοιν,dual,genitive,3rd,neuter,regular,primary,\nῷν,dual,genitive,3rd,neuter,regular,,\nων,dual,genitive,3rd,neuter,irregular,,33 38\nοιιν,dual,genitive,3rd,neuter,irregular,,\nέοιν,dual,genitive,3rd,neuter,irregular,,16 61\nάοιν,dual,genitive,3rd,neuter,irregular,,16 61\nε,dual,nominative,3rd,neuter,regular,primary,\nει,dual,nominative,3rd,neuter,regular,,\nα,dual,nominative,3rd,neuter,regular,,\nεε,dual,nominative,3rd,neuter,irregular,,16 61\nαε,dual,nominative,3rd,neuter,irregular,,16 61\nε,dual,vocative,3rd,neuter,regular,primary,\nει,dual,vocative,3rd,neuter,regular,,\nα,dual,vocative,3rd,neuter,regular,,\nεε,dual,vocative,3rd,neuter,irregular,,16 61\nαε,dual,vocative,3rd,neuter,irregular,,16 61\nας,plural,accusative,3rd,masculine feminine,regular,primary,\nεις,plural,accusative,3rd,masculine feminine,regular,,17 41\nες,plural,accusative,3rd,masculine feminine,regular,,\nς,plural,accusative,3rd,masculine feminine,regular,,\nῦς,plural,accusative,3rd,masculine feminine,regular,,17 18 48\nως,plural,accusative,3rd,masculine feminine,regular,,30\nῆς,plural,accusative,3rd,masculine feminine,irregular,,56\nέας,plural,accusative,3rd,masculine feminine,irregular,,\nέος,plural,accusative,3rd,masculine feminine,irregular,,\nῆος,plural,accusative,3rd,masculine feminine,irregular,,\nῆες,plural,accusative,3rd,masculine feminine,irregular,,\nῆας,plural,accusative,3rd,masculine feminine,irregular,,\nους,plural,accusative,3rd,masculine feminine,irregular,,32\nούς,plural,accusative,3rd,masculine feminine,irregular,,32\nεῖς,plural,accusative,3rd,masculine feminine,irregular,,31 41\nεες,plural,accusative,3rd,masculine feminine,irregular,,55 61\nις,plural,accusative,3rd,masculine feminine,irregular,,\nινς,plural,accusative,3rd,masculine feminine,irregular,,\nῶς,plural,accusative,3rd,masculine feminine,irregular,,48\nσι,plural,dative,3rd,masculine feminine,regular,primary,\nσιν,plural,dative,3rd,masculine feminine,regular,primary,4\nσί,plural,dative,3rd,masculine feminine,regular,,41\nσίν,plural,dative,3rd,masculine feminine,regular,,4 41\nεσι,plural,dative,3rd,masculine feminine,regular,,41\nεσιν,plural,dative,3rd,masculine feminine,regular,,4 41\nέσι,plural,dative,3rd,masculine feminine,regular,,\nέσιν,plural,dative,3rd,masculine feminine,regular,,4\nψι,plural,dative,3rd,masculine feminine,regular,,\nψιν,plural,dative,3rd,masculine feminine,regular,,4\nψί,plural,dative,3rd,masculine feminine,regular,,\nψίν,plural,dative,3rd,masculine feminine,regular,,4\nξι,plural,dative,3rd,masculine feminine,regular,,\nξιν,plural,dative,3rd,masculine feminine,regular,,4\nξί,plural,dative,3rd,masculine feminine,regular,,\nξίν,plural,dative,3rd,masculine feminine,regular,,4\nφι,plural,dative,3rd,masculine feminine,irregular,,45\nφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nηφι,plural,dative,3rd,masculine feminine,irregular,,45\nηφιv,plural,dative,3rd,masculine feminine,irregular,,4 45\nῆφι,plural,dative,3rd,masculine feminine,irregular,,45\nῆφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nόφι,plural,dative,3rd,masculine feminine,irregular,,45\nόφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nαις,plural,dative,3rd,masculine feminine,irregular,,33 41\nοῖσι,plural,dative,3rd,masculine feminine,irregular,,33\nοῖσιv,plural,dative,3rd,masculine feminine,irregular,,4 33\nεσσι,plural,dative,3rd,masculine feminine,irregular,,16 61\nεσσιv,plural,dative,3rd,masculine feminine,irregular,,4 16 61\nυσσι,plural,dative,3rd,masculine feminine,irregular,,54\nυσσιv,plural,dative,3rd,masculine feminine,irregular,,4 54\nσσί,plural,dative,3rd,masculine feminine,irregular,,54\nσσίv,plural,dative,3rd,masculine feminine,irregular,,4 54\nων,plural,genitive,3rd,masculine feminine,regular,primary,\nῶν,plural,genitive,3rd,masculine feminine,regular,,\n-,plural,genitive,3rd,masculine feminine,irregular,,41\nφι,plural,genitive,3rd,masculine feminine,irregular,,45\nφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nηφι,plural,genitive,3rd,masculine feminine,irregular,,45\nηφιv,plural,genitive,3rd,masculine feminine,irregular,,4 45\nῆφι,plural,genitive,3rd,masculine feminine,irregular,,45\nῆφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nόφι,plural,genitive,3rd,masculine feminine,irregular,,45\nόφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nέων,plural,genitive,3rd,masculine feminine,irregular,,16 61\nες,plural,nominative,3rd,masculine feminine,regular,primary,\nως,plural,nominative,3rd,masculine feminine,regular,,30\nεις,plural,nominative,3rd,masculine feminine,regular,,17\nεῖς,plural,nominative,3rd,masculine feminine,regular,,18\nοί,plural,nominative,3rd,masculine feminine,irregular,,32\nαί,plural,nominative,3rd,masculine feminine,irregular,,33\nῆς,plural,nominative,3rd,masculine feminine,irregular,,18\nῄς,plural,nominative,3rd,masculine feminine,irregular,,31 41\nεες,plural,nominative,3rd,masculine feminine,irregular,,16 55 61\nοι,plural,nominative,3rd,masculine feminine,irregular,,33\nες,plural,vocative,3rd,masculine feminine,regular,primary,\nεις,plural,vocative,3rd,masculine feminine,regular,,17\nεῖς,plural,vocative,3rd,masculine feminine,regular,,18\nῆς,plural,vocative,3rd,masculine feminine,regular,,18\nως,plural,vocative,3rd,masculine feminine,regular,,30\nεες,plural,vocative,3rd,masculine feminine,irregular,,16 55 61\nα,plural,accusative,3rd,neuter,regular,primary,\nη,plural,accusative,3rd,neuter,regular,,\nς,plural,accusative,3rd,neuter,regular,,\nά,plural,accusative,3rd,neuter,irregular,,33\nαα,plural,accusative,3rd,neuter,irregular,,16 61\nεα,plural,accusative,3rd,neuter,irregular,,16 61\nσι,plural,dative,3rd,neuter,regular,primary,\nσιν,plural,dative,3rd,neuter,regular,primary,4\nσί,plural,dative,3rd,neuter,regular,,\nσίv,plural,dative,3rd,neuter,regular,,4\nασι,plural,dative,3rd,neuter,regular,,\nασιν,plural,dative,3rd,neuter,regular,,4\nεσι,plural,dative,3rd,neuter,regular,,\nεσιν,plural,dative,3rd,neuter,regular,,4\nέσι,plural,dative,3rd,neuter,regular,,\nέσιv,plural,dative,3rd,neuter,regular,,4\nεσσι,plural,dative,3rd,neuter,irregular,,54\nεσσιν,plural,dative,3rd,neuter,irregular,,4 54\nσσί,plural,dative,3rd,neuter,irregular,,54\nσσίv,plural,dative,3rd,neuter,irregular,,4 54\nασσι,plural,dative,3rd,neuter,irregular,,54\nασσιν,plural,dative,3rd,neuter,irregular,,4 54\nφι,plural,dative,3rd,neuter,irregular,,45\nφιν,plural,dative,3rd,neuter,irregular,,4 45\nηφι,plural,dative,3rd,neuter,irregular,,45\nηφιv,plural,dative,3rd,neuter,irregular,,4 45\nῆφι,plural,dative,3rd,neuter,irregular,,45\nῆφιν,plural,dative,3rd,neuter,irregular,,4 45\nόφι,plural,dative,3rd,neuter,irregular,,45\nόφιν,plural,dative,3rd,neuter,irregular,,4 45\nων,plural,genitive,3rd,neuter,regular,primary,\nῶν,plural,genitive,3rd,neuter,regular,primary,\nφι,plural,genitive,3rd,neuter,irregular,,\nφιν,plural,genitive,3rd,neuter,irregular,,4 45\nηφι,plural,genitive,3rd,neuter,irregular,,45\nηφιv,plural,genitive,3rd,neuter,irregular,,4 45\nῆφι,plural,genitive,3rd,neuter,irregular,,45\nῆφιν,plural,genitive,3rd,neuter,irregular,,4 45\nόφι,plural,genitive,3rd,neuter,irregular,,45\nόφιν,plural,genitive,3rd,neuter,irregular,,4 45\nέων,plural,genitive,3rd,neuter,irregular,,16 61\nάων,plural,genitive,3rd,neuter,irregular,,16 61\nα,plural,nominative,3rd,neuter,regular,primary,\nη,plural,nominative,3rd,neuter,regular,,\nες,plural,nominative,3rd,neuter,regular,,\nά,plural,nominative,3rd,neuter,irregular,,33\nεα,plural,nominative,3rd,neuter,irregular,,16 61\nαα,plural,nominative,3rd,neuter,irregular,,16 61\nα,plural,vocative,3rd,neuter,regular,primary,\nη,plural,vocative,3rd,neuter,regular,,\nες,plural,vocative,3rd,neuter,regular,,\nαα,plural,vocative,3rd,neuter,irregular,,16 61\nεα,plural,vocative,3rd,neuter,irregular,,16 61\nα,singular,accusative,3rd,masculine feminine,regular,primary,\nη,singular,accusative,3rd,masculine feminine,regular,,16\nν,singular,accusative,3rd,masculine feminine,regular,,\nιν,singular,accusative,3rd,masculine feminine,regular,,41\nῦν,singular,accusative,3rd,masculine feminine,regular,,18\nῶ,singular,accusative,3rd,masculine feminine,regular,,23\nυν,singular,accusative,3rd,masculine feminine,regular,,\nῦν,singular,accusative,3rd,masculine feminine,regular,,17\nύν,singular,accusative,3rd,masculine feminine,regular,,17\nέα,singular,accusative,3rd,masculine feminine,regular,,20\nην,singular,accusative,3rd,masculine feminine,regular,,24\nώ,singular,accusative,3rd,masculine feminine,regular,,19 41\nω,singular,accusative,3rd,masculine feminine,regular,,23\nεῖν,singular,accusative,3rd,masculine feminine,irregular,,31 41\nων,singular,accusative,3rd,masculine feminine,irregular,,33 41 49\nαν,singular,accusative,3rd,masculine feminine,irregular,,33 41\nον,singular,accusative,3rd,masculine feminine,irregular,,39\nῖς,singular,accusative,3rd,masculine feminine,irregular,,33\nεα,singular,accusative,3rd,masculine feminine,irregular,,61\nι,singular,dative,3rd,masculine feminine,regular,primary,\nί,singular,dative,3rd,masculine feminine,regular,,\nϊ,singular,dative,3rd,masculine feminine,regular,,17\nΐ,singular,dative,3rd,masculine feminine,regular,,40\nει,singular,dative,3rd,masculine feminine,regular,,16 17\nεῖ,singular,dative,3rd,masculine feminine,regular,,18\nαι,singular,dative,3rd,masculine feminine,regular,,\noῖ,singular,dative,3rd,masculine feminine,regular,,28 41\nῖ,singular,dative,3rd,masculine feminine,irregular,,33 46\nῆι,singular,dative,3rd,masculine feminine,irregular,,18\nᾳ,singular,dative,3rd,masculine feminine,irregular,,25\nῳ,singular,dative,3rd,masculine feminine,irregular,,33 34\nῷ,singular,dative,3rd,masculine feminine,irregular,,33\nιί,singular,dative,3rd,masculine feminine,irregular,,62\nυί,singular,dative,3rd,masculine feminine,irregular,,62\nέϊ,singular,dative,3rd,masculine feminine,irregular,,18 61\nος,singular,genitive,3rd,masculine feminine,regular,primary,\nός,singular,genitive,3rd,masculine feminine,regular,,\nους,singular,genitive,3rd,masculine feminine,regular,,16\nοῦς,singular,genitive,3rd,masculine feminine,regular,,19 46\nως,singular,genitive,3rd,masculine feminine,regular,,17 18\nώς,singular,genitive,3rd,masculine feminine,regular,,17 18 41\nῶς,singular,genitive,3rd,masculine feminine,regular,,47\nεως,singular,genitive,3rd,masculine feminine,regular,,17\nέως,singular,genitive,3rd,masculine feminine,regular,,\nεώς,singular,genitive,3rd,masculine feminine,regular,,\nέους,singular,genitive,3rd,masculine feminine,regular,,20\nω,singular,genitive,3rd,masculine feminine,irregular,,\nεος,singular,genitive,3rd,masculine feminine,irregular,,61\nΰς,singular,genitive,3rd,masculine feminine,irregular,,41 48\nῦς,singular,genitive,3rd,masculine feminine,irregular,,48\nνος,singular,genitive,3rd,masculine feminine,irregular,,22\nοῦ,singular,genitive,3rd,masculine feminine,irregular,,33\nηος,singular,genitive,3rd,masculine feminine,irregular,,55\nιός,singular,genitive,3rd,masculine feminine,irregular,,62\nuός,singular,genitive,3rd,masculine feminine,irregular,,62\nς,singular,nominative,3rd,masculine feminine,regular,primary,\n-,singular,nominative,3rd,masculine feminine,regular,primary,\nηρ,singular,nominative,3rd,masculine feminine,regular,,41\nις,singular,nominative,3rd,masculine feminine,regular,,\nϊς,singular,nominative,3rd,masculine feminine,regular,,\nώ,singular,nominative,3rd,masculine feminine,regular,,41\nψ,singular,nominative,3rd,masculine feminine,regular,,\nξ,singular,nominative,3rd,masculine feminine,regular,,\nρ,singular,nominative,3rd,masculine feminine,regular,,\nήρ,singular,nominative,3rd,masculine feminine,regular,,\nήν,singular,nominative,3rd,masculine feminine,regular,,50\nν,singular,nominative,3rd,masculine feminine,regular,,\nωρ,singular,nominative,3rd,masculine feminine,regular,,\nων,singular,nominative,3rd,masculine feminine,regular,,\nών,singular,nominative,3rd,masculine feminine,regular,,\nης,singular,nominative,3rd,masculine feminine,regular,,\nῆς,singular,nominative,3rd,masculine feminine,regular,,\nυς,singular,nominative,3rd,masculine feminine,regular,,\nῦς,singular,nominative,3rd,masculine feminine,regular,,\nεῦς,singular,nominative,3rd,masculine feminine,regular,,\nύς,singular,nominative,3rd,masculine feminine,regular,,\nής,singular,nominative,3rd,masculine feminine,regular,,33\nας,singular,nominative,3rd,masculine feminine,irregular,,\nῴ,singular,nominative,3rd,masculine feminine,irregular,,29 41\nώς,singular,nominative,3rd,masculine feminine,irregular,,27 41\nϋς,singular,nominative,3rd,masculine feminine,irregular,,41\nῄς,singular,nominative,3rd,masculine feminine,irregular,,31 41\nῖς,singular,nominative,3rd,masculine feminine,irregular,,\nεῖς,singular,nominative,3rd,masculine feminine,irregular,,31 41\nῶς,singular,nominative,3rd,masculine feminine,irregular,,48\nος,singular,nominative,3rd,masculine feminine,irregular,,33\n-,singular,vocative,3rd,masculine feminine,regular,primary,52\nς,singular,vocative,3rd,masculine feminine,regular,,30\nι,singular,vocative,3rd,masculine feminine,regular,,41\nῦ,singular,vocative,3rd,masculine feminine,regular,,15 17 18\nοῖ,singular,vocative,3rd,masculine feminine,regular,,19 41\nψ,singular,vocative,3rd,masculine feminine,regular,,\nξ,singular,vocative,3rd,masculine feminine,regular,,\nν,singular,vocative,3rd,masculine feminine,regular,,\nρ,singular,vocative,3rd,masculine feminine,regular,,\nων,singular,vocative,3rd,masculine feminine,regular,,50\nών,singular,vocative,3rd,masculine feminine,regular,,\nήν,singular,vocative,3rd,masculine feminine,regular,,\nερ,singular,vocative,3rd,masculine feminine,regular,,\nες,singular,vocative,3rd,masculine feminine,regular,,\nί,singular,vocative,3rd,masculine feminine,regular,,\nως,singular,vocative,3rd,masculine feminine,regular,,\nἶ,singular,vocative,3rd,masculine feminine,regular,,\nούς,singular,vocative,3rd,masculine feminine,regular,,51\nύ,singular,vocative,3rd,masculine feminine,regular,,15\nυ,singular,vocative,3rd,masculine feminine,regular,,51\nεις,singular,vocative,3rd,masculine feminine,regular,,20\nαν,singular,vocative,3rd,masculine feminine,regular,,\nώς,singular,vocative,3rd,masculine feminine,irregular,,27 41 46\nον,singular,vocative,3rd,masculine feminine,irregular,,\nυς,singular,vocative,3rd,masculine feminine,irregular,,33\nα,singular,accusative,3rd,neuter,regular,primary,15\n-,singular,accusative,3rd,neuter,regular,,33\nος,singular,accusative,3rd,neuter,regular,,\nας,singular,accusative,3rd,neuter,regular,,\nαρ,singular,accusative,3rd,neuter,regular,,21\nυ,singular,accusative,3rd,neuter,regular,,\nι,singular,dative,3rd,neuter,regular,primary,\nει,singular,dative,3rd,neuter,regular,,16\nαι,singular,dative,3rd,neuter,regular,,16 21\nϊ,singular,dative,3rd,neuter,irregular,,17\nᾳ,singular,dative,3rd,neuter,irregular,,25 33\nυϊ,singular,dative,3rd,neuter,irregular,,17\nαϊ,singular,dative,3rd,neuter,irregular,,21 61\nος,singular,genitive,3rd,neuter,regular,primary,\nους,singular,genitive,3rd,neuter,regular,,16\nως,singular,genitive,3rd,neuter,regular,,16\nεως,singular,genitive,3rd,neuter,regular,,17\nυς,singular,genitive,3rd,neuter,irregular,,26\nου,singular,genitive,3rd,neuter,irregular,,33\nαος,singular,genitive,3rd,neuter,irregular,,21 61\nα,singular,nominative,3rd,neuter,regular,primary,\n-,singular,nominative,3rd,neuter,regular,,33\nος,singular,nominative,3rd,neuter,regular,,\nαρ,singular,nominative,3rd,neuter,regular,,\nας,singular,nominative,3rd,neuter,regular,,16 21\nυ,singular,nominative,3rd,neuter,regular,,\nον,singular,nominative,3rd,neuter,irregular,,33\nα,singular,vocative,3rd,neuter,regular,primary,15\n-,singular,vocative,3rd,neuter,regular,,\nος,singular,vocative,3rd,neuter,regular,,\nας,singular,vocative,3rd,neuter,regular,,\nαρ,singular,vocative,3rd,neuter,regular,,21\nυ,singular,vocative,3rd,neuter,regular,,";

var nounFootnotesCSV = "Index,Text\n1,See  for Rules of variance within regular endings\n2,See  for Table of α- and ε- stem feminine 1st declension contracts\n3,See  for Table of α- and ε- stem masculine 1st declension contracts\n4,\"Previous, with (ν)\"\n5,See  for Table of o- and ε- stem masculine  2nd declension contracts\n6,See  for Table of o- and ε- stem neuter 2nd declension contracts\n7,(Attic) contracts of o-stems preceded by a long vowel\n15,\"This is not actually an “ending,” but the last letter of the “pure stem”. See\"\n16,\"See  &  for Table of Sigma (ες,ας,ος) stem contracts\"\n17,See  for Table of  ι and υ - stem contracts\n18,\"See  for Table of  ευ,αυ,and ου - stem contracts\"\n19,See  for stems in οι feminine 3rd declension contracts\n20,See  for Table of 3rd declension contracts of stems in -εσ- preceded by ε\n21,See  for Table of stems in τ and ατ neuter 3rd declension contracts\n22,\"On stem ending in ν, ν doubled in gen. Sing Aeolic (e.g. μῆνς,μῆννος...)\"\n23,Also in inscriptions and expressions of swearing\n24,(Borrowed from 1st decl) Sometimes in proper names whose nominative ends in -ης\n25,From -ας-stems (properly αι)\n26,(ε)υς instead of (ε)ος or ους (gen) for (3rd decl) words whose nominative ends in -ος\n27,In 3rd decl. Only in the words αἰδώς (Attic) and ἠώς (Homer and Ionic)\n28,Contraction of a stem in οι  and an ι-ending\n29,Stronger form of Ionic contractions of οι-stems (in the nominative)\n30,See  for Table of ω - stem contracts (masculine only)\n31,Nominative plural contraction of  -ειδ+ες  after dropping the δ (used for accusative too). See .a\n32,\"Plurals & duals occur rarely (and w/ 2nd decl endings) for 3rd decl οι-stem nouns. See .D.a,b,c\"\n33,See  for description and examples of Irreg. Decl involving 3rd decl endings\n34,(Homer)  for Attic  (ῳτ)ι\n35,(Homer) for Cretan ινς\n36,Also an irregular ending for other stem(s)\n37,In inscriptions\n38,\"Plural endings for otherwise dual noun,οσσε (eyes)\"\n39,\"“Poetical” (acc for ἔρως). See ,11\"\n40,\"Poetic for χρωτι,dat. of ὁ χρως\"\n41,No Masculine of this Form\n42,No Feminine of this Form\n44,See  D.9 and #215 regarding dialectic alternate forms of the Dative Plural\n45,\"Surviving in Homer (See ) Not truly genitive or dative, but instrumental/locative/ablative, associated with the remaining oblique cases (genitive & dative) only after being lost as cases themselves in Greek\"\n46,See Smyth # 266 for only surviving ος-stem in Attic (fem. singular of αἰδως)\n47,See  for Substantives in -εύς preceded by a vowel.\n48,\"See Smyth,  #275 D.1,2,3\"\n49,\"See , List of Principal Irregular Substantives\"\n50,\"See  for Table of stems in a Liquid (λ,ρ) or a Nasal (ν), and Note #259D for variants including Κρονίων...\"\n51,\"See  for Table of stems in a Dental (τ,δ,θ) or a Nasal (ν), and its notes including Ν.κόρυς (Voc. Κόρυ) & ὀδούς\"\n52,See  for general rule re 3rd Declension Masc/Fem Singular Vocative\n54,See  D\n55,See\n56,\"See  for other forms of endings for contracts of ευ,αυ,and ου - stems\"\n57,Nominative form used as Vocative. See\n58,\"See ,b\"\n59,\"See ,d\"\n60,This (Feminine or Masculine) Form only Masculine when derived from ε- or ο- contraction\n61,See Smyth Note 264 D.1 regarding Homer's use of Open Forms\n62,See Smyth Note 269 for alternate i-stem and u-stem endings\n63,See  D.2\n64,See  D.1";

/*
 * Latin language data module
 */
/*import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv';*/
// A language of this module
const language$1 = languages.greek;
// Create a language data set that will keep all language-related information
let dataSet$1 = new LanguageDataset(language$1);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName$1 = 'csv';
const parts$1 = dataSet$1.defineFeatureType(Feature.types.part, ['noun', 'adjective', 'verb']);
const numbers = dataSet$1.defineFeatureType(Feature.types.number, ['singular', 'dual', 'plural']);
numbers.addImporter(importerName$1)
    .map('singular', numbers.singular)
    .map('dual', numbers.dual)
    .map('plural', numbers.plural);
const cases = dataSet$1.defineFeatureType(Feature.types.grmCase, ['nominative', 'genitive', 'dative', 'accusative', 'vocative']);
cases.addImporter(importerName$1)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('vocative', cases.vocative);
const declensions = dataSet$1.defineFeatureType(Feature.types.declension, ['first', 'second', 'third']);
declensions.addImporter(importerName$1)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third);
const genders = dataSet$1.defineFeatureType(Feature.types.gender, ['masculine', 'feminine', 'neuter']);
genders.addImporter(importerName$1)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types$3 = dataSet$1.defineFeatureType(Feature.types.type, ['regular', 'irregular']);
types$3.addImporter(importerName$1)
    .map('regular', types$3.regular)
    .map('irregular', types$3.irregular);
/*const conjugations = dataSet.defineFeatureType(Lib.types.conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = dataSet.defineFeatureType(Lib.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = dataSet.defineFeatureType(Lib.types.voice, ['passive', 'active']);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = dataSet.defineFeatureType(Lib.types.mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = dataSet.defineFeatureType(Lib.types.person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third);*/
const footnotes$5 = dataSet$1.defineFeatureType(Feature.types.footnote, []);

// endregion Definition of grammatical features

// For noun and adjectives
dataSet$1.addSuffixes = function(partOfSpeech, data) {
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
            types$3.importer.csv.get(dataItem[5])];
        if (dataItem[6] === 'primary') {
            primary = true;
        }
        if (dataItem[7]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = dataItem[7].split(' ').map(function(index) {
                return footnotes$5.get(index);
            });
            features.push(...indexes);
        }
        let extendedGreekData = new ExtendedGreekData();
        extendedGreekData.primary = primary;
        let extendedLangData = {
            [languages.greek]: extendedGreekData
        };
        this.addSuffix(suffixValue, features, extendedLangData);
    }
};

// For verbs
dataSet$1.addVerbSuffixes = function(partOfSpeech, data) {
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
            features.push(types$3.importer.csv.get(grammarType));
        }
        // Footnotes
        if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
            let language = this.language;
            let indexes = data[i][8].split(' ').map(function(index) {
                return footnotes$5.get(index);
            });
            features.push(...indexes);
        }
        this.addSuffix(suffix, features);
    }
};

dataSet$1.addFootnotes = function(partOfSpeech, data) {
    // First row are headers
    for (let i = 1; i < data.length; i++) {
        this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
    }
};

dataSet$1.loadData = function() {
    // Nouns
    let partOfSpeech = parts$1.noun;
    let suffixes = papaparse.parse(nounSuffixesCSV, {});
    this.addSuffixes(partOfSpeech, suffixes.data);
    let footnotes = papaparse.parse(nounFootnotesCSV, {});
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
dataSet$1.matcher = function(inflections, suffix) {
    "use strict";
    // All of those features must match between an inflection and an ending
    let obligatoryMatches = [Feature.types.part];

    // Any of those features must match between an inflection and an ending
    let optionalMatches = [Feature.types.grmCase, Feature.types.declension, Feature.types.gender, Feature.types.number];
    let bestMatchData = null; // Information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     A fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
    for (let inflection of inflections) {
        let matchData = new MatchData(); // Create a match profile

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
dataSet$1.bestMatch = function(matchA, matchB) {
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

class GreekView extends View {
    constructor() {
        super();
        this.language = languages.greek;

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
        this.features = {
            numbers: new GroupFeatureType(numbers, 'Number'),
            cases: new GroupFeatureType(cases, 'Case'),
            declensions: new GroupFeatureType(declensions, 'Declension'),
            genders: new GroupFeatureType(genders, 'Gender'),
            types: new GroupFeatureType(types$3, 'Type')
        };
    }

    /**
     * Creates and initializes an inflection table. Redefine this method in child objects in order to create
     * an inflection table differently.
     */
    createTable() {
        this.table = new Table([this.features.declensions, this.features.genders,
            this.features.types, this.features.numbers, this.features.cases]);
        let features = this.table.features;
        features.columns = [declensions, genders, types$3];
        features.rows = [numbers, cases];
        features.columnRowTitles = [cases];
        features.fullWidthRowTitles = [numbers];
    }
}

class NounView$1 extends GreekView {
    constructor() {
        super();
        this.id = 'nounDeclension';
        this.name = 'noun declension';
        this.title = 'Noun declension';
        this.partOfSpeech = parts$1.noun.value;

        this.features.genders.getOrderedValues = function getOrderedValues(ancestorFeatures) {
            if (ancestorFeatures) {
                if (ancestorFeatures[0].value === declensions.second.value ||
                    ancestorFeatures[0].value === declensions.third.value) {
                    return [[genders.masculine.value, genders.feminine.value], genders.neuter.value];
                }
            }
            return [genders.masculine.value, genders.feminine.value, genders.neuter.value];
        };

        this.createTable();
    }
}

class NounViewSimplified extends NounView$1 {
    constructor() {
        super();
        this.id = 'nounDeclensionSimplified';
        this.name = 'noun declension simplified';
        this.title = 'Noun declension (simplified)';
        this.partOfSpeech = parts$1.noun.value;

        this.features.genders.getOrderedValues = function getOrderedValues(ancestorFeatures) {
            if (ancestorFeatures) {
                if (ancestorFeatures[0].value === declensions.second.value) {
                    return [[genders.masculine.value, genders.feminine.value], genders.neuter.value];
                }
                if (ancestorFeatures[0].value === declensions.third.value) {
                    return [[genders.masculine.value, genders.feminine.value, genders.neuter.value]];
                }
            }
            return [genders.masculine.value, genders.feminine.value, genders.neuter.value];
        };

        this.createTable();

        this.table.suffixCellFilter = NounViewSimplified.suffixCellFilter;
    }

    static suffixCellFilter(suffix) {
        return suffix.extendedLangData[languages.greek].primary;
    }
}

var viewsGreek = [new NounView$1(), new NounViewSimplified()];

/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
class Presenter {
    constructor(viewContainer, viewSelectorContainer, localeSelectorContainer, wordData, locale = 'en-US') {

        this.viewContainer = viewContainer;
        this.viewSelectorContainer = viewSelectorContainer;
        this.localeSelectorContainer = localeSelectorContainer;
        this.wordData = wordData;

        // All views registered by the Presenter
        this.views = [];
        this.viewIndex = {};

        for (let view of viewsLatin) {
            this.addView(view);
        }
        for (let view of viewsGreek) {
            this.addView(view);
        }

        // Views available for parts of speech that are present in a Result Set
        this.availableViews = this.getViews(this.wordData);

        this.defaultView = this.availableViews[0];
        this.activeView = undefined;

        this.locale = locale; // This is a default locale
        this.l10n = new L10n(messages);

        return this;
    }

    addView(view) {
       //let view =  new View.View(viewOptions);
       this.views.push(view);
       this.viewIndex[view.id] = view;
    }

    setLocale(locale) {
        this.locale = locale;
        this.activeView.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale));
    }

    render() {
        // Show a default view
        if (this.defaultView) {
            this.defaultView.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale));
            this.activeView = this.defaultView;

            this.appendViewSelector(this.viewSelectorContainer);
            //this.appendLocaleSelector(this.localeSelectorContainer);
        }
        return this;
    }

    appendViewSelector(targetContainer) {
        targetContainer.innerHTML = '';
        if (this.availableViews.length > 1) {
            let id = 'view-selector-list';
            let viewLabel = document.createElement('label');
            viewLabel.setAttribute('for', id);
            viewLabel.innerHTML = "View:&nbsp;";
            let viewList = document.createElement('select');
            viewList.classList.add('alpheios-ui-form-control');
            for (const view of this.availableViews) {
                let option = document.createElement("option");
                option.value = view.id;
                option.text = view.name;
                viewList.appendChild(option);
            }
            viewList.addEventListener('change', this.viewSelectorEventListener.bind(this));
            targetContainer.appendChild(viewLabel);
            targetContainer.appendChild(viewList);
        }
        return this;
    }

    viewSelectorEventListener(event) {
        let viewID = event.target.value;
        let view = this.viewIndex[viewID];
        view.render(this.viewContainer, this.wordData, this.l10n.messages(this.locale));
        this.activeView = view;
    }

    appendLocaleSelector(targetContainer) {
        let id = 'locale-selector-list';
        targetContainer.innerHTML = ''; // Erase whatever was there
        let localeLabel = document.createElement('label');
        localeLabel.setAttribute('for', id);
        localeLabel.innerHTML = "Locale:&nbsp;";
        let localeList = document.createElement('select');
        localeList.classList.add('alpheios-ui-form-control');
        localeList.id = id;
        for (let locale of this.l10n.locales) {
            let option = document.createElement("option");
            option.value = locale;
            option.text = locale;
            localeList.appendChild(option);
        }
        localeList.addEventListener('change', this.localeSelectorEventListener.bind(this));
        targetContainer.appendChild(localeLabel);
        targetContainer.appendChild(localeList);
        return this;
    }

    localeSelectorEventListener() {
        let locale = event.target.value;
        this.setLocale(locale);
    }

    getViews(wordData) {
        // First view in a returned array will be a default one
        let views = [];
        for (let view of this.views) {
            if (wordData.language === view.language && wordData[Models.Feature.types.part].includes(view.partOfSpeech)) {
                views.push(view);
            }
        }
        return views;
    }
}

// Import shared language data
// Load language data
let langData = new LanguageData([dataSet, dataSet$1]).loadData();

let testCases = [
    {word: "cupidinibus", value: "latin_noun_cupidinibus", type: "noun", language: 'latin'},
    {word: "mare", value: "latin_noun_adj_mare", type: "noun, adjective", language: 'latin'},
    {word: "cepit", value: "latin_verb_cepit", type: "regular verb", language: 'latin'},
    {word: "φιλόσοφος", value: "greek_noun_pilsopo", type: "noun", language: 'greek'},
];
let selectList = document.querySelector("#test-selector");

for (const testCase of testCases) {
    let option = document.createElement("option");
    option.value = testCase.value;
    option.text = `${testCase.word} (${testCase.language} ${testCase.type})`;
    selectList.appendChild(option);
}

selectList.addEventListener('change', event => {
    if (event.target.value !== 'select') {
        show(event.target.selectedOptions[0].innerHTML, event.target.value);
    }
});


let show = function show(word, fileNameBase) {
    let dir = 'tests/data/';
    let extension = '.json';
    loadData(dir + fileNameBase + extension)
        .then(json => {
            json = JSON.parse(json);

            // Transform Morphological Analyzer's response into a library standard Homonym object
            let homonym = new AlpheiosTuftsAdapter().transform(json);

            // Get matching suffixes from an inflection library
            let wordData = langData.getSuffixes(homonym);
            wordData.homonym.targetWord = word;

            // Insert rendered view to a page
            let container = document.querySelector('#id-inflections-table');
            let viewSelectorContainer = document.querySelector('#view-switcher');
            let localeSwitcherContainer = document.querySelector('#locale-selector');
            new Presenter(container, viewSelectorContainer, localeSwitcherContainer, wordData).render();

        }).catch(error => {
        console.error(error);
    });
};

})));
//# sourceMappingURL=inflection-tables.js.map
