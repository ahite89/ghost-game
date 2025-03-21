import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";
import { useEffect } from "react";

export default function Score({pointsFromRound, totalPoints, setTotalPoints}: ScoreProps) {
    const newScore = totalPoints + pointsFromRound;

    useEffect(() => {
        if (totalPoints >= newScore) return;

        const interval = setInterval(() => {
            setTotalPoints((prev) => (prev < newScore ? prev + 1 : newScore));
        }, 30);

        return () => clearInterval(interval);
    }, [pointsFromRound]);

    return (
        <Typography variant="h6">
            {totalPoints} pts
        </Typography>
    );
}