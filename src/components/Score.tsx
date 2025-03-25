import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";
import { useEffect } from "react";

export default function Score({ incrementScore, pointsFromRound, totalPoints, setTotalPoints }: ScoreProps) {

    useEffect(() => {
        if (incrementScore) {
            let startingPointValue = totalPoints;
            let newPointTotal = totalPoints + pointsFromRound;
            const interval = setInterval(() => {
                setTotalPoints((prev) => prev + 1);
                startingPointValue++;
            
                if (startingPointValue === newPointTotal) {
                    clearInterval(interval);
                }
            }, 50);
        }
    }, [incrementScore]);

    return (
        <Typography variant="h6">
            {totalPoints} pts
        </Typography>
    );
}