import { LetterProps } from "../interfaces/letter";

export const getTwoRandomLetters = (cpuWordList: string[]): LetterProps[] => {
    const startingWord: string = getRandomStartingWord(cpuWordList);
    return [{ letter: startingWord[0].toUpperCase(), pointValue: 0 }, { letter: startingWord[1].toUpperCase(), pointValue: 0 }];
};

const getRandomStartingWord = (wordList: string[]): string => {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}