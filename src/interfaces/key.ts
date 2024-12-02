import { ReactNode } from 'react';

export interface KeyProps {
    keyName: string,
    children: ReactNode,
    onClick: (key: string) => void
}