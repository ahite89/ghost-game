import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";
import { getPointsFromRound } from "../services/score";
import { useEffect, useState } from "react";

export default function Score({pointsWon, letters}: ScoreProps) {

    //const pointsFromRound = getPointsFromRound(letters, pointsWon);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        if (number >= 50) return;

        const interval = setInterval(() => {
        setNumber((prev) => (prev < 50 ? prev + 1 : 50));
        }, 10);

        return () => clearInterval(interval);
    }, [number, 50, 10]);

    return (
        <Typography style={{border: "2px solid black", padding: ".5rem", borderRadius: "50%"}} variant="h6">
            {number}
        </Typography>
    );
}