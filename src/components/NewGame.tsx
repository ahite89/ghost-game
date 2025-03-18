import { useMemo } from 'react';
import { NewGameProps } from '../interfaces/newGame';
import { Button, Box, Typography, Stack, Modal } from '@mui/material';

export default function NewGame({ 
    message,
    onClick,
    pointsWon,
    highScore,
    openModal
}: NewGameProps) {

    const numberOfPointsWon: number = useMemo(() => {
        return pointsWon;
    }, [pointsWon]);

    return (
        <div>   
          <Modal open={openModal}>
            <Box sx={modalStyle}>
                <Stack alignItems="center">
                    <Typography paddingBottom="2rem">You scored {numberOfPointsWon} points</Typography>
                    <Typography paddingBottom="2rem">High score: {highScore}</Typography>
                    <Button style={{margin: ".2rem", color: "black", borderColor: "black"}} variant='outlined' onClick={onClick}>
                        {message}
                    </Button>
                </Stack>
            </Box>
          </Modal>
        </div>
    );
};
    
const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    bgcolor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};