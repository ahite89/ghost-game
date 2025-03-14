import { Stack, Typography } from "@mui/material";
import { LetterProps } from "../interfaces/letter";

export default function Letter({letter, fontSize}: LetterProps) {

    return (
        <Stack>            
            <Typography sx={{ fontSize: fontSize }} className="letter" fontWeight="400">
                {letter}
            </Typography>
        </Stack>
    );
}