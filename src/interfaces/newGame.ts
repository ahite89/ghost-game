import { ReactNode } from 'react';

export interface NewGameProps {
    onClick: () => Promise<void> | void,
    message: string,
    roundsWon: number,
    [x: string]: any
}