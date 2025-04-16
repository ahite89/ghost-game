import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PointsAnimationProps } from "../interfaces/pointsAnimation";

export default function PointsAnimation({ startScoringAnimation, pointsArray, handleIncrementScore }: PointsAnimationProps) {

    const [scoringStage, setScoringStage] = useState(0);
    const pointsFromRound = pointsArray.reduce((a, b) => a + b, 0);

    useEffect(() => {
        if (startScoringAnimation) {
            setScoringStage(1);
        }
    }, [startScoringAnimation]);

    const goToNextScoringStage = (nextStage: number, delay = 1000, completeScoring = false) => {
        setTimeout(() => setScoringStage(nextStage), delay);
        if (completeScoring) {
            handleIncrementScore(pointsFromRound);
        }
    };

    return (
        <>
            {scoringStage === 1 &&
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        top: "-1.5em",
                        width: "100%",
                        justifyContent: "center",
                        gap: "0.2em",
                    }}
                >
                    {pointsArray.map((pointValue, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: startScoringAnimation ? 1 : 0, scale: startScoringAnimation ? 1 : 0.8 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            exit={{ opacity: 0 }}
                            onAnimationComplete={() => goToNextScoringStage(2, 1500)}
                            style={{
                                fontSize: "1rem",
                                color: "black",
                                padding: "5px",
                                minWidth: "1rem",
                                textAlign: "center"
                            }}
                        >
                            +{pointValue}
                        </motion.span>
                    ))}
                </div>
            }   
            {scoringStage === 2 &&
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: startScoringAnimation ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    exit={{ opacity: 0, y: 0 }}
                    onAnimationComplete={() => goToNextScoringStage(3, 1500, true)}
                    style={{
                        display: "flex",
                        position: "absolute",
                        top: "-2em",
                        fontSize: "1.5rem",
                        color: "black",
                        padding: "5px",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    +{pointsFromRound}
                </motion.div>
            }
        </>
    );
}