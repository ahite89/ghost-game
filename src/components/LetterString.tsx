import { Stack, Typography } from "@mui/material";
import { LetterStringProps } from "../interfaces/letterString";
import Letter from "./Letter";

export default function LetterString({letters, cursorBlinking}: LetterStringProps) {

    return (
        <>
            <div
                style={{
                    display: "flex",
                    whiteSpace: "nowrap",
                    justifyContent: "center",
                    paddingRight: "0.5em",
                }}
            >
                {letters.map((letter, index) => (
                    <Letter 
                        key={index} 
                        color={letter.color} 
                        blinking={letter.blinking} 
                        letter={letter.letter} 
                        pointValue={letter.pointValue}
                    />
                ))}
            </div>
            {cursorBlinking &&
                <Typography 
                    sx={{ alignSelf: "center", "--cursor-height": "3.5rem" } as React.CSSProperties} 
                    className="blinkingCursor">                           
                </Typography>
            }
        </>
    );
}