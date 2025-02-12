import { ReactNode } from "react";
import { Player } from "../constants/player";

export interface LetterProps {
    letter: string,
    color?: string,
    pointValue: number,
    playedBy: Player,
}