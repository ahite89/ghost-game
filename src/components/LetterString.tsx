import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { LetterStringProps } from "../interfaces/letterString";
import Letter from "./Letter";
import { getPointsFromRound } from "../services/score";

export default function LetterString({letters, cursorBlinking, animating}: LetterStringProps) {

    // const maxFontSize = 4;
    // const letterFontSize = letters.length > 8 ? 3 : maxFontSize;

    // const textRef = useRef<HTMLDivElement | null>(null);
    // const [cursorHeight, setCursorHeight] = useState("3.5rem");

    // useEffect(() => {
    //     if (textRef.current) {
    //         setCursorHeight(`3.5rem`);
    //     }
    // }, [letters]);

    const [combineScore, setCombineScore] = useState(false);
    const [pointsFromRound, setPointsFromRound] = useState(0);
    const [startAnimating, setStartAnimating] = useState(animating);

    useEffect(() => {
        if (animating) {
            setStartAnimating(true);
            setTimeout(() => {
                setStartAnimating(false);
                setPointsFromRound(getPointsFromRound(letters, 0));
                setCombineScore(true);
            }, 1000);
        }
        setCombineScore(false);
    }, [animating]);

    return (
        <Stack direction="row">
            <div style={{ position: "relative", display: "flex", textAlign: "center" }}>
                {combineScore &&
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        exit={{ opacity: 0, y: 0 }}
                        style={{
                            position: "absolute",
                            top: "-2em",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "1.5rem",
                            color: "black",
                            padding: "5px",
                            minWidth: "1rem",
                            textAlign: "center",
                            fontWeight: "bold"
                        }}
                    >
                        +{pointsFromRound}
                    </motion.div>
                }
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
                    {startAnimating &&
                        letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: animating ? 1 : 0, scale: animating ? 1 : 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    fontSize: "1rem",
                                    color: "black",
                                    padding: "5px",
                                    minWidth: "1rem",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                +{letter.pointValue}
                            </motion.span>
                        ))
                    }
                </div>
                <div
                    // ref={textRef}
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
                            playedBy={letter.playedBy} 
                            letter={letter.letter} 
                            pointValue={letter.pointValue}
                        />
                    ))}
                </div>
                {cursorBlinking && !animating &&
                    <Typography 
                        sx={{ alignSelf: "center", "--cursor-height": "3.5rem" } as React.CSSProperties} 
                        className="blinkingCursor">                           
                    </Typography>
                }
            </div>
        </Stack>
    );
}