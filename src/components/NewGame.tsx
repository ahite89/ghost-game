import { NewGameProps } from '../interfaces/newGame';
import { Button, Box } from '@mui/material';

export default function NewGame({ 
    message,
    onClick
}: NewGameProps) {

    return (
        <Box sx={{ m: 2, p: 2, display: 'flex', justifyContent: 'center' }}>
            <Button style={{margin: '.2rem'}} variant='outlined' onClick={() => onClick()}>
                {message}
            </Button>
        </Box>
    );
}