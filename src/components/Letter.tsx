import { Stack, Typography } from "@mui/material";
import { LetterProps } from "../interfaces/letter";

export default function Letter({letter, blinking}: LetterProps) {

    const className = blinking ? "blinking-letter letter" : "letter";
    
    return (
        <Stack>            
            <Typography className={className} fontWeight="400">
                {letter}
            </Typography>
        </Stack>
    );
}