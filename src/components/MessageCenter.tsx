import { Stack } from "@mui/material";
import { MessageCenterProps } from "../interfaces/messageCenter";

export default function MessageCenter({message}: MessageCenterProps) {
    return (
        <Stack>
            <div>{message}</div>
        </Stack>
    );
}