import { ReactNode } from "react";
import { Player } from "../constants/player";

export interface LetterProps {
    letter: string,
    pointValue: number,
    playedBy?: Player,
    children?: ReactNode
}