import InflectionProperties from '../../inflection-properties.js'
import { Constants, Feature } from 'alpheios-data-models'

export default class GreekInflectionProperties extends InflectionProperties {
  constructor (partOfSpeech) {
    super(partOfSpeech)
    if (partOfSpeech) {
      // If there is a single part of speech info in an inflection
      if (partOfSpeech === Constants.POFS_NOUN) {
        this.suffixBased = true
      }
      if (partOfSpeech === Constants.POFS_PRONOUN) {
        this.fullFormBased = true
      }
    }
  }

  get obligatoryMatches () {
    if (this.partOfSpeech === Constants.POFS_PRONOUN) {
      return [Feature.types.grmClass]
    }

    if (this.fullFormBased) {
      return [Feature.types.word]
    }
    return [Feature.types.part] // Default value
  }
}
