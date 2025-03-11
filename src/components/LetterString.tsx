import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { LetterStringProps } from "../interfaces/letterString";
import Letter from "./Letter";

export default function LetterString({letters, cursorBlinking, animating}: LetterStringProps) {

  return (
    <Stack direction="row">
        <div style={{ position: "relative", display: "flex", textAlign: "center" }}>
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    top: "-1.5em",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    justifyContent: "center",
                    gap: "0.2em",
                }}
            >
                {animating &&
                    letters.map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: animating ? 1 : 0, scale: animating ? 1 : 0.8 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            style={{
                                fontSize: "1rem",
                                background: "slategray",
                                color: "white",
                                padding: "0.3em",
                                borderRadius: "5px",
                                minWidth: "2em",
                                textAlign: "center",
                            }}
                        >
                            {letter.pointValue}
                        </motion.span>
                    ))
                }
            </div>
            <div
                style={{
                    display: "flex",
                    fontSize: "2vw",
                    justifyContent: "center",
                    gap: "0.2em",
                    paddingRight: "0.5em",
                }}
            >
                {letters.map((letter, index) => (
                    <Letter 
                        key={index} 
                        color={letter.color} 
                        playedBy={letter.playedBy} 
                        letter={letter.letter} 
                        pointValue={letter.pointValue} />
                ))}
            </div>
            {cursorBlinking && !animating &&
                <Typography sx={{alignSelf: "end"}} className="blinkingCursor" variant="h2"></Typography>
            }
        </div>
    </Stack>
  );
}