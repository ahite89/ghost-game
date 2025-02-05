import { useMemo } from 'react';
import { NewGameProps } from '../interfaces/newGame';
import { Button, Box, Typography, Stack } from '@mui/material';

export default function NewGame({ 
    message,
    onClick,
    pointsWon
}: NewGameProps) {

    const numberOfPointsWon: number = useMemo(() => {
        return pointsWon;
      }, [pointsWon]);

    return (
        <Box sx={{ m: 2, p: 2, display: "flex", justifyContent: "center" }}>
            <Stack alignItems="center">
                <Typography paddingBottom="2rem">You scored {numberOfPointsWon} points!</Typography>
                <Button style={{margin: ".2rem", color: "black", borderColor: "black"}} variant='outlined' onClick={() => onClick()}>
                    {message}
                </Button>
            </Stack>
        </Box>
    );
}