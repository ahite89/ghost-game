import { MessageCenterProps } from "../interfaces/messageCenter";

export default function MessageCenter({message}: MessageCenterProps) {
    return (
        <div>{message}</div>
    );
}