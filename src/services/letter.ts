import { ALPHABET_STRING, ALPHABET_LENGTH } from "../constants/letter";
import { getRandomValidWord, getValidWords } from "./words";

export const getTwoRandomLetters = (allWords: string[]): string[] => {
    const firstLetter = ALPHABET_STRING.charAt(Math.floor(Math.random() * ALPHABET_LENGTH));
    const newValidWords: string[] = getValidWords(allWords, firstLetter); 
    const nextValidWord: string = getRandomValidWord(newValidWords, [firstLetter]);
    const secondLetter: string = nextValidWord[1].toUpperCase();
    return (firstLetter + secondLetter).split("");
};