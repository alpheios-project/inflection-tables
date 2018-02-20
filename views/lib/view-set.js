import {Constants} from 'alpheios-data-models'
// Latin views
import LatinNounView from '../lang/latin/latin-noun-view.js'
import LatinAdjectiveView from '../lang/latin/latin-adjective-view.js'
import LatinVoiceConjugationMoodView from '../lang/latin/latin-voice-conjugation-mood-view.js'
import LatinVoiceMoodConjugationView from '../lang/latin/latin-voice-mood-conjugation-view.js'
import LatinConjugationVoiceMoodView from '../lang/latin/latin-conjugation-voice-mood-view.js'
import LatinConjugationMoodVoiceView from '../lang/latin/latin-conjugation-mood-voice-view.js'
import LatinMoodVoiceConjugationView from '../lang/latin/latin-mood-voice-conjugation-view.js'
import LatinMoodConjugationVoiceView from '../lang/latin/latin-mood-conjugation-voice-view.js'
import LatinImperativeView from '../lang/latin/latin-imperative-view.js'
import LatinSupineView from '../lang/latin/latin-supine-view.js'
import LatinVerbParticipleView from '../lang/latin/latin-verb-participle-view.js'
import LatinInfinitiveView from '../lang/latin/latin-infinitive-view.js'

// Greek views
import GreekNounView from '../lang/greek/greek-noun-view.js'
import GreekNounSimplifiedView from '../lang/greek/greek-noun-simplified-view.js'
import GreekGenderPronounView from '../lang/greek/greek-gender-pronoun-view.js'
import GreekLemmaGenderPronounView from '../lang/greek/greek-lemma-gender-pronoun-view.js'
import GreekPersonGenderPronounView from '../lang/greek/greek-person-gender-pronoun-view.js'

/**
 * A set of inflection table views that represent all possible forms of inflection data. A new ViewSet instance
 * mast be created for each new inflection data piece.
 */
export default class ViewSet {
  constructor (inflectionData, messages) {
    this.views = new Map([
      [
        Constants.LANG_LATIN,
        [
          LatinNounView,
          LatinAdjectiveView,
          LatinVoiceConjugationMoodView,
          LatinVoiceMoodConjugationView,
          LatinConjugationVoiceMoodView,
          LatinConjugationMoodVoiceView,
          LatinMoodVoiceConjugationView,
          LatinMoodConjugationVoiceView,
          LatinImperativeView,
          LatinSupineView,
          LatinVerbParticipleView,
          LatinInfinitiveView
        ]
      ],
      [
        Constants.LANG_GREEK,
        [
          GreekNounView,
          GreekNounSimplifiedView,
          GreekGenderPronounView,
          GreekPersonGenderPronounView,
          GreekLemmaGenderPronounView
        ]
      ]
    ])
    this.inflectionData = inflectionData
    this.languageID = this.inflectionData.languageID
    this.messages = messages
    this.matchingViews = []

    if (this.views.has(this.languageID)) {
      for (let ViewConstructor of this.views.get(this.languageID)) {
        if (ViewConstructor.matchFilter(this.inflectionData)) {
          this.matchingViews.push(new ViewConstructor(this.inflectionData, this.messages))
        }
      }
    }

    this.partsOfSpeech = []
    for (const view of this.matchingViews) {
      if (!this.partsOfSpeech.includes(view.partOfSpeech)) {
        this.partsOfSpeech.push(view.partOfSpeech)
      }
    }
  }

  getViews (partOfSpeech = undefined) {
    if (partOfSpeech) {
      return this.matchingViews.filter(view => view.partOfSpeech === partOfSpeech)
    } else {
      return this.matchingViews
    }
  }

  updateMessages (messages) {
    this.messages = messages
    for (let view of this.matchingViews) {
      view.updateMessages(messages)
    }
  }
}
