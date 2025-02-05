import { LetterStringProps } from "../interfaces/letterString";
import { Box, Stack, Typography } from "@mui/material";
import Letter from "./Letter";

export default function LetterString({letters, cursorBlinking}: LetterStringProps) {

    const renderedLetters = letters.map(letter => {
        return (
            <Letter key={letter.letter} playedBy={letter.playedBy} letter={letter.letter} pointValue={letter.pointValue}>
                {letter.letter}
            </Letter>
        );
    });

    return (
        <Stack direction="row">
            <Box sx={{paddingRight: ".5rem"}} className="letterString">
                {renderedLetters}
            </Box>
            {cursorBlinking &&
                <Typography className="blinkingCursor" variant="h2"></Typography>
            }
        </Stack>
    );
}