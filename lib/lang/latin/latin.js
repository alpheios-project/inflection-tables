/*
 * Latin language data module
 */
export {language, languageModel, dataSet};
import * as Models from 'alpheios-data-models';
import * as Lib from "../../lib.js";
import nounSuffixesCSV from './data/noun/suffixes.csv';
import nounFootnotesCSV from './data/noun/footnotes.csv';
import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv';
import papaparse from "papaparse";

let languageModel = new Models.LatinLanguageModel();
let types = Models.Feature.types;
// A language of this module
const language = Lib.languages.latin;
// Create a language data set that will keep all language-related information
let dataSet = new Lib.LanguageDataset(language);

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
const footnotes = new Models.FeatureType(types.footnote, [], language);

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
    let suffixes = papaparse.parse(nounSuffixesCSV, {});
    this.addSuffixes(partofspeech, suffixes.data);
    let footnotes = papaparse.parse(nounFootnotesCSV, {});
    this.addFootnotes(partofspeech, footnotes.data);

    // adjectives
    partofspeech = languageModel.features[types.part].adjective;
    suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
    this.addSuffixes(partofspeech, suffixes.data);
    footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
    this.addFootnotes(partofspeech, footnotes.data);

    // verbs
    partofspeech = languageModel.features[types.part].verb;
    suffixes = papaparse.parse(verbSuffixesCSV, {});
    this.addVerbSuffixes(partofspeech, suffixes.data);
    footnotes = papaparse.parse(verbFootnotesCSV, {});
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
        let matchData = new Lib.MatchData(); // Create a match profile

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
