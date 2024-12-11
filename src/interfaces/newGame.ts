import { ReactNode } from 'react';

export interface NewGameProps {
    onClick: () => Promise<void> | void,
    message: string,
    [x: string]: any
}