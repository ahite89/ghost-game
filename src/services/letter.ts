import { LetterProps } from "../interfaces/letter";
import { letterToPointsMap } from "../constants/letter";
import { Player } from "../constants/player";

export const getTwoRandomLetters = (cpuWordList: string[]): LetterProps[] => {
    const startingWord: string = getRandomStartingWord(cpuWordList);
    return [
        { 
            letter: startingWord[0].toUpperCase(),
            pointValue: letterToPointsMap[startingWord[0].toUpperCase()],
            playedBy: Player.None
        },
        { 
            letter: startingWord[1].toUpperCase(),
            pointValue: letterToPointsMap[startingWord[1].toUpperCase()],
            playedBy: Player.None
        }
    ];
};

const getRandomStartingWord = (wordList: string[]): string => {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

export const getLettersFromLetterPropsArray = (letterString: LetterProps[]): string[] => {
    return letterString.map((letter) => letter.letter);
}