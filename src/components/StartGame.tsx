import { Button, Box, Typography, Stack, Modal } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import { FaGhost } from 'react-icons/fa';
import { StartGameProps } from '../interfaces/startGame';
import { MODAL_STYLING } from '../constants/modal';

export default function StartGame({ openModal, onClick }: StartGameProps) {

    return (
        <AnimatePresence>
            {openModal && (   
                <Modal open={openModal}>
                    <Box 
                        sx={MODAL_STYLING}
                        component={motion.div}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Stack sx={{padding: "2rem", textAlign: "center"}} alignItems="center">
                            <FaGhost size={50} style={{paddingBottom: "2rem"}} />
                            <Typography className="start-screen-title" variant="h3" paddingBottom="2rem">ghost</Typography>
                            <Typography variant="h6" paddingBottom="2rem">
                                Take turns building a word one letter at a time<br />
                                Avoid completing the longest word to win the round and earn points!
                            </Typography>
                            <Button className="play-button" onClick={onClick}>
                                Play
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            )}
        </AnimatePresence>
    );
};