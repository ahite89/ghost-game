export const getValidWords = (wordList: string[], characters: string): string[] => {
    return wordList.filter(word => word.startsWith(characters.toLowerCase()));
};

export const getRandomValidWord = (validWords: string[], characterStringLength: number): string => {
    let longerWords = validWords.filter(word => word.length > characterStringLength);
    let randomIndex = Math.floor(Math.random() * longerWords.length);
    return longerWords[randomIndex];
};