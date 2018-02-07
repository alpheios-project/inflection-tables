import { Constants, Feature } from 'alpheios-data-models'

export default class InflectionProperties {
  constructor (partOfSpeech) {
    this.partOfSpeech = partOfSpeech
    this.suffixBased = false
    this.fullFormBased = false
    if (partOfSpeech) {
      // If there is a single part of speech info in an inflection
      if (partOfSpeech === Constants.POFS_NOUN) {
        this.suffixBased = true
      }
    }
  }

  get obligatoryMatches () {
    if (this.fullFormBased) {
      return [Feature.types.word]
    }
    return [Feature.types.part] // Default value
  }
}
