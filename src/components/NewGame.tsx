import { useMemo } from 'react';
import { Button, Box, Typography, Stack, Modal } from '@mui/material';
import { FaGhost } from 'react-icons/fa';
import { NewGameProps } from '../interfaces/newGame';
import { MODAL_STYLING } from '../constants/modal';

export default function NewGame({ 
    onClick,
    pointsWon,
    highScore,
    openModal
}: NewGameProps) {

    const numberOfPointsWon: number = useMemo(() => {
        return pointsWon;
    }, [pointsWon]);

    const highScoreMessage = (): string => {
        if (pointsWon < highScore) {
            return `High score: ${highScore}`;
        } else {
            return `That's a new high score!`;
        }
    };

    return (
        <div>   
          <Modal open={openModal}>
            <Box sx={MODAL_STYLING}>
                <Stack alignItems="center">
                    <FaGhost size={50} style={{paddingBottom: "2rem"}} />
                    <Typography variant="h6" paddingBottom="2rem">You scored {numberOfPointsWon} points!</Typography>
                    <Typography variant="h6" paddingBottom="2rem">{highScoreMessage()}</Typography>
                    <Button className="play-button" onClick={onClick}>
                        Play again?
                    </Button>
                </Stack>
            </Box>
          </Modal>
        </div>
    );
};