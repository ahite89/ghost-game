export const getTwoRandomLetters = (cpuWordList: string[]): string[] => {
    const startingWord: string = getRandomStartingWord(cpuWordList);
    return [startingWord[0].toUpperCase(), startingWord[1].toUpperCase()];
};

const getRandomStartingWord = (wordList: string[]): string => {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}