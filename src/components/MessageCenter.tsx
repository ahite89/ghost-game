import { Stack } from "@mui/material";
import { MessageCenterProps } from "../interfaces/messageCenter";

export default function MessageCenter({message, cpuThinking}: MessageCenterProps) {
    
    const content = (): JSX.Element => {
        if (cpuThinking) 
            return <div className="loader"></div>;
        else 
            return <div>{message}</div>;    
    };
    
    return (
        <Stack>
            {content()}
        </Stack>
    );
}