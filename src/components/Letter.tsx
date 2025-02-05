import { Typography } from "@mui/material";
import { LetterProps } from "../interfaces/letter";

export default function Letter({children}: LetterProps) {
    return (
        <>
            <Typography className="letter" variant="h2" fontWeight="400">
                {children}
            </Typography>
        </>
    );
}