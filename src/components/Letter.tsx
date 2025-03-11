import { Stack, Typography } from "@mui/material";
import { LetterProps } from "../interfaces/letter";

export default function Letter({letter}: LetterProps) {

    return (
        <Stack>            
            <Typography className="letter" variant="h2" fontWeight="400">
                {letter}
            </Typography>
        </Stack>
    );
}