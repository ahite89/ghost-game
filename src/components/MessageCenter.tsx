import { Box, Typography } from "@mui/material";
import { MessageCenterProps } from "../interfaces/messageCenter";

export default function MessageCenter({message}: MessageCenterProps) {
    return (
        <Box>
            <Typography sx={{fontSize: "1.25rem"}}>{message}</Typography>
        </Box>
    );
}