import { ReactNode } from 'react';

export interface HintProps {
    hintCount: number,
    onClick: (hitCount: number) => void,
    children?: ReactNode,
}