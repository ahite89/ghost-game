import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";

export default function Score({roundsWon}: ScoreProps) {
    return (
        <Typography variant="h6">Rounds won: {roundsWon}</Typography>
    );
}