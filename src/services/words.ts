export const getValidWords = (wordList: string[], characters: string): string[] => {
    return wordList.filter(word => word.startsWith(characters.toLowerCase()));
};