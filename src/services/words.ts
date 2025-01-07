export const getValidWords = (wordList: string[], letters: string): string[] => {
    return wordList.filter(word => word.startsWith(letters.toLowerCase()));
};

export const getRandomValidWord = (validWords: string[], letterString: string[]): string => {
    let longerWords = validWords.filter(word => word.length > letterString.length);
    
    // This isn't working
    let validLongerWords = longerWords.filter(longWord => !longWord.includes(letterString.join("")));
    let randomIndex = Math.floor(Math.random() * validLongerWords.length);
    return validLongerWords[randomIndex];
};