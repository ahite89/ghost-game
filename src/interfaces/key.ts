import { ReactNode } from 'react';

export interface KeyProps {
    keyName: string,
    children: ReactNode,
    cpuTurn: boolean,
    onClick: (key: string) => void
}