import { LetterStringProps } from "../interfaces/letterString";
import { Typography } from "@mui/material";

export default function LetterString({letters}: LetterStringProps) {
    return (
        <div>
            <Typography variant="h2" fontWeight="400">
                {letters.join('')}
            </Typography>
        </div>
    );
}