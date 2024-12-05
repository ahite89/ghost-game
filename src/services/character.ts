import { ALPHABET_STRING, ALPHABET_LENGTH } from "../constants/character";
import { getRandomValidWord, getValidWords } from "./words";

export const getTwoRandomCharacters = (allWords: string[]): string[] => {
    const firstLetter = ALPHABET_STRING.charAt(Math.floor(Math.random() * ALPHABET_LENGTH));
    const newValidWords: string[] = getValidWords(allWords, firstLetter); 
    const nextValidWord: string = getRandomValidWord(newValidWords, 1);
    const secondLetter: string = nextValidWord[1].toUpperCase();
    return (firstLetter + secondLetter).split(""); 
};