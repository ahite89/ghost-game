import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";

export default function Score({pointsWon}: ScoreProps) {
    return (
        <Typography variant="h6">{pointsWon} pts</Typography>
    );
}