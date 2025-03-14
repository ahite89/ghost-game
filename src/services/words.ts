export const getValidWords = (wordList: string[], letters: string): string[] => {
    return wordList.filter(word => word.startsWith(letters.toLowerCase()));
};

export const findNextValidCpuWord = (letterString: string[], cpuValidWordsList: string[], allValidWordsList: string[]): string | null => {
    return getRandomValidWord(cpuValidWordsList, letterString) || getRandomValidWord(allValidWordsList, letterString) || null;
};

export const getRandomValidWord = (validWords: string[], letterString: string[]): string => {

    // validWords = validWords.filter(word => word.toUpperCase() !== letterString.join(""));
    
    let newValidWords = validWords.filter(word => 
        word.toUpperCase().includes(letterString.join("")) && word.toUpperCase() !== letterString.join(""));
    let randomIndex = Math.floor(Math.random() * newValidWords.length);
    return newValidWords[randomIndex];
};