import { EXCLUDED_STARTING_LETTERS } from "../constants/letter";

const allWordsFromDictionary: string[] = require('an-array-of-english-words');
const allValidWordsFromDictionary = allWordsFromDictionary.filter(word => !EXCLUDED_STARTING_LETTERS.includes(word.slice(0, 2).toUpperCase()));

export default allValidWordsFromDictionary;