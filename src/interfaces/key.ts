import { ReactNode } from 'react';

export interface KeyProps {
    keyName: string,
    children: ReactNode,
    disableKeyboard: boolean,
    onClick: (key: string) => void
}