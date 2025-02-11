export const getValidWords = (wordList: string[], letters: string): string[] => {
    return wordList.filter(word => word.startsWith(letters.toLowerCase()));
};

export const getRandomValidWord = (validWords: string[], letterString: string[]): string => {
    // Is there another word in the array beside this word that starts with the same letters?
    debugger

    validWords = validWords.filter(word => word.toUpperCase() !== letterString.join(""));
    //let longerWords = validWords.filter(word => word.length > letterString.length);
    
    let validLongerWords = validWords.filter(word => word.toUpperCase().includes(letterString.join("")));
    let randomIndex = Math.floor(Math.random() * validLongerWords.length);
    return validLongerWords[randomIndex];
};