import { CharacterStringProps } from "../interfaces/characterString";
import { Typography } from "@mui/material";

export default function CharacterString({characters}: CharacterStringProps) {
    return (
        <div>
            <Typography variant="h3">
                {characters.join('')}
            </Typography>
        </div>
    );
}