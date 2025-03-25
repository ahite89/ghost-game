import { LetterProps } from "./letter";

export interface ScoreProps {
    pointsFromRound: number,
    totalPoints: number,
    setTotalPoints: React.Dispatch<React.SetStateAction<number>>,
    incrementScore: boolean
}