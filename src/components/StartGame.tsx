import { Button, Box, Typography, Stack, Modal } from '@mui/material';
import { FaGhost } from 'react-icons/fa';
import { StartGameProps } from '../interfaces/startGame';

export default function StartGame({ openModal, onClick }: StartGameProps) {

    return (
        <div>   
          <Modal open={openModal}>
            <Box sx={modalStyle}>
                <Stack sx={{padding: "2rem", textAlign: "center"}} alignItems="center">
                    <FaGhost size={50} style={{paddingBottom: "2rem"}} />
                    <Typography className="start-screen-title" variant="h3" paddingBottom="2rem">ghost</Typography>
                    <Typography variant="h6" paddingBottom="2rem">Earn points by not spelling the longest word</Typography>
                    <Button className="play-button" onClick={onClick}>
                        Play
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
    backgroundColor: "#d3d6da"
};