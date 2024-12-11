import { Box } from "@mui/material";
import { MessageCenterProps } from "../interfaces/messageCenter";

export default function MessageCenter({message}: MessageCenterProps) {
    return (
        <Box>
            <div>{message}</div>
        </Box>
    );
}