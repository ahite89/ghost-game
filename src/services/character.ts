export const getRandomCharacter = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    return characters.charAt(Math.floor(Math.random() * charactersLength));
};