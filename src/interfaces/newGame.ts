import { ReactNode } from 'react';

export interface NewGameProps {
    onClick: () => Promise<void> | void,
    message: string,
    pointsWon: number,
    highScore: number,
    [x: string]: any
}