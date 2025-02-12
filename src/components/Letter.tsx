import { Typography } from "@mui/material";
import { LetterProps } from "../interfaces/letter";

export default function Letter({letter, color}: LetterProps) {
    return (
        <>
            <Typography className="letter" style={{color: color}} variant="h2" fontWeight="400">
                {letter}
            </Typography>
        </>
    );
}