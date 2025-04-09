export interface NewGameProps {
    onClick: () => Promise<void> | void,
    pointsWon: number,
    highScore: number,
    [x: string]: any,
    openModal: boolean
}