import { LetterStringProps } from "../interfaces/letterString";
import { Stack, Typography } from "@mui/material";

export default function LetterString({letters, cursorBlinking}: LetterStringProps) {


    // Blinking cursor
    // https://www.amitmerchant.com/simple-blinking-cursor-animation-using-css/

    return (
        <Stack direction="row">
            <Typography sx={{paddingRight: ".5rem"}} className="letterString" variant="h2" fontWeight="400">
                {letters.join('')}
            </Typography>
            {cursorBlinking &&
                <Typography className="blinkingCursor" variant="h2"></Typography>
            }
        </Stack>
    );
}