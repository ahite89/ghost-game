import { StartGameProps } from '../interfaces/startGame';
import { Button, Box, Typography, Stack, Modal } from '@mui/material';

export default function StartGame({ openModal, onClick }: StartGameProps) {

    return (
        <div>   
          <Modal open={openModal}>
            <Box sx={modalStyle}>
                <Stack sx={{padding: "2rem", textAlign: "center"}} alignItems="center">
                    <Typography className="start-screen-title" variant="h3" paddingBottom="2rem">ghost</Typography>
                    <Typography variant="h6" paddingBottom="2rem">Try not to spell the longest word!</Typography>
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
    backgroundColor: "lightgray"
};