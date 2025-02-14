import { LetterProps } from "../interfaces/letter";

export const getPointsFromRound = (letterString: LetterProps[], pointsWon: number): number => {
    return letterString.reduce((acc, curr) => acc + curr.pointValue, pointsWon);
}
