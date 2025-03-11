import { ReactNode } from 'react';

export interface KeyProps {
    keyName: string,
    disableKeyboard: boolean,
    onClick: (key: string) => void
}