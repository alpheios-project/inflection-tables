import * as Lib from "../../../lib/lib.js";
import * as LibLatin from "../../../lib/lang/latin/latin.js";
import Handlebars from "../../support/handlebars-4.0.10/handlebars-v4.0.10";  // CommonJS module
import template from './noun-declension.hbs';

export {render};

/**
 * A name of a template as auto generated by Handlebars compiler
 */
let templateName = 'noun-declension/noun-declension';

/**
 * These values are used to define sorting and grouping order. 'featureOrder' determine a sequence in which
 * feature will be used for sorting. The same sequence will be used to group items when building a view matrix.
 * All feature types has a default sort order. This order is defined by a sequence of feature values provided
 * as arguments to each feature type constructor. However, this can be overriden here, as shown by the 'gender'
 * example. If suffixes with several values must be combines, such values can be provided within an array,
 * as shown by 'masculine' and 'feminine' values.
 */
let genderFeature = LibLatin.genders;
genderFeature.order = [[LibLatin.genders.masculine, LibLatin.genders.feminine], LibLatin.genders.neuter];
let featureOrder = [LibLatin.numbers, LibLatin.cases, LibLatin.declensions, genderFeature, LibLatin.types];

/**
 * By what feature (multiple features not supported yet) should suffixes be combined within a table cell. If this is
 * set to 'gender', and there are ending that has an 'gender' feature group, and their 'gender' values are not the
 * same and within group values, those ending records will be combined into one
 */
let deduplicateBy = LibLatin.genders;


/**
 * A compare function that can be used to sort ending according to specific requirements of the current view.
 * This function is for use with Array.prototype.sort().
 * @param {FeatureType[]} featureOrder
 * @param {Suffix} a
 * @param {Suffix} b
 */
let compare = function compare(featureOrder, a, b) {
    "use strict";

    // Set custom sort order if necessary
    // Custom sort order for each declension
    //LibLatin.genders.order = [LibLatin.genders.feminine];


    for (let [index, feature] of featureOrder.entries()) {
        let featureTypeA = a.features[feature.type],
            featureTypeB = b.features[feature.type];

        if (feature.orderLookup[featureTypeA] > feature.orderLookup[featureTypeB]) {
            return 1;
        }
        else if (feature.orderLookup[featureTypeA] < feature.orderLookup[featureTypeB]) {
            return -1;
        }
        /*
         If values on this level are equal, continue comparing using values of the next level.
         If we are at the last level of comparison (defined by featureOrder) and elements are equal, return 0.
         */
        else if (index === featureOrder.length-1) {
            // This is the last sort order item
            return 0;
        }
    }

};

/**
 * Returns true if an ending grammatical feature defined by featureType has value that is listed in featureValues array.
 * This function is for use with Array.prototype.filter().
 * @param {FeatureType} featureType - a grammatical feature type we need to filter on
 * @param {Feature[]} featureValues - a list of possible values of a type specified by featureType that
 * this ending should have
 * @param {Suffix} ending - an ending we need to filter out
 * @returns {boolean}
 */
let filter = function filter(featureType, featureValues, ending) {
    "use strict";

    // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
        featureValues = [featureValues];
    }
    for (const value of featureValues) {
        if (ending.features[featureType] === value) {
            return true;
        }
    }

    return false;
};

/**
 * This function provide a view-specific logic that is used to merge two suffixes together when they are combined.
 * @param {Suffix} endingA - A first of two suffixes to merge (to be returned).
 * @param {Suffix} endingB - A second ending to merge (to be discarded).
 * @returns {Suffix} A modified value of ending A.
 */
let merge = function merge(endingA, endingB) {
    let commonGroups = Lib.Suffix.getCommonGroups([endingA, endingB]);
    for (let type of commonGroups) {
        // Combine values using a comma separator. Can do anything else if we need to.
        endingA.features[type] = endingA.features[type] + ', ' + endingB.features[type];
    }
    return endingA;
};

/**
 * A recursive function that organizes suffixes by features from a groupFeatures list into a multi-dimensional
 * array. Each of levels of this array corresponds to a feature from a groupFeatures list.
 * @param {Suffix[]} endings - A list of suffixes.
 * @param {FeatureType[]} groupFeatures - A list of feature types to be used for grouping.
 * @param {function} mergeFunction - A function that merges two suffixes together.
 * @param {number} currentLevel - A recursion level, used to stop recursion.
 * @returns {Suffix[]} Endings grouped into a multi-dimensional array.
 */
let groupByFeature = function groupByFeature(endings, groupFeatures, mergeFunction, currentLevel = 0) {
    let feature = groupFeatures[currentLevel];
    let grouped = [];
    for (const featureValue of feature.orderIndex) {
        let result = {
            type: feature.type,
            value: featureValue
        };
        let selected = endings.filter(filter.bind(this, feature.type, featureValue));
        if (currentLevel < groupFeatures.length - 1) {
            // Split more
            selected = groupByFeature(selected, groupFeatures, mergeFunction, currentLevel + 1);
        }
        else {
            // This is the last level
            // Split result has a list of suffixes in a table cell. We can now combine duplicated items if we want
            if (selected.length >0) {
                selected = Lib.Suffix.combine(selected, mergeFunction);
            }

        }
        result.data = selected;
        grouped.push(result);
    }
    return grouped;
};

/**
 * Formats results according to requirements of the view.
 * @param {ResultSet} resultSet - A results that needs to be displayed.
 * @returns {ResultSet} Formatted result.
 */
let format = function format(resultSet) {
    let formatted = resultSet;
    for (let suffix of formatted.suffixes) {
        if (suffix.value === null) {
            suffix.value = '-';
        }
    }
    return formatted;
};

/**
 * Converts a ResultSet, returned from inflection tables library, into an HTML representation of an inflection table.
 * @param {ResultSet} resultSet - A result set from inflection tables library.
 * @returns {string} HTML code representing an inflection table.
 */
let render = function data(resultSet) {
    "use strict";

    // We can sort suffixes if we need to
    //let sorted = resultSet.suffixes.sort(compare.bind(this, featureOrder));

    // Create data structure for a template
    let displayData = {};

    displayData.word = resultSet.word;
    let formatted = format(resultSet);
    displayData.suffixes = groupByFeature(formatted.suffixes, featureOrder, merge);
    displayData.footnotes = resultSet.footnotes;

    let compiled = Handlebars.compile(template);

    return compiled(displayData);
};