import Inflections from './inflections.js'

export default class InflectionSet {
  constructor (partOfSpeech) {
    this.partOfSpeech = partOfSpeech
    this.items = new Map()
  }

  addItems (inflections) {
    if (!inflections) {
      throw new Error(`Inflection items object must not be empty`)
    }
    if (!(inflections instanceof Inflections)) {
      throw new Error(`Inflection items object must be of InflectionItems type`)
    }
    const type = inflections.type
    if (!type) {
      throw new Error(`Inflection items must have a valid type`)
    }

    this.items.set(type, inflections)
  }
}
