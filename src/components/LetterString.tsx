import { LetterStringProps } from "../interfaces/letterString";
import { Box, Stack, Typography } from "@mui/material";
import Letter from "./Letter";

export default function LetterString({letters, cursorBlinking}: LetterStringProps) {

    const renderedLetters = letters.map((letter, index) => {
        return (
            <Letter key={index} playedBy={letter.playedBy} letter={letter.letter} pointValue={letter.pointValue}></Letter>
        );
    });

    return (
        <Stack direction="row">
            <Stack sx={{paddingRight: ".5rem"}} className="letterString" direction="row">
                {renderedLetters}
            </Stack>
            {cursorBlinking &&
                <Typography className="blinkingCursor" variant="h2"></Typography>
            }
        </Stack>
    );
}