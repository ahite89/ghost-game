import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";
import { useEffect } from "react";

export default function Score({ incrementScore, pointsFromRound, totalPoints, setTotalPoints }: ScoreProps) {

    useEffect(() => {
        if (incrementScore) {
            // const interval = setInterval(() => {
            //     setTotalPoints((prev) => (prev < newScore ? prev + 1 : newScore));
            // }, 30);

            // return () => clearInterval(interval);
            let startingPointValue = totalPoints;
            let newPointTotal = totalPoints + pointsFromRound;
            const interval = setInterval(() => {
                setTotalPoints((prev) => prev + 1);
                startingPointValue++;
            
                if (startingPointValue === newPointTotal) {
                    clearInterval(interval); // Stop when points are fully added
                }
            }, 50); // Adjust speed here (smaller = faster)
        }
    }, [incrementScore]);

    // const incrementScoreGradually = (points: number) => {
    //     let count = 0;
    //     const interval = setInterval(() => {
    //       setScore((prev) => prev + 1);
    //       count++;
    
    //       if (count === points) {
    //         clearInterval(interval); // Stop when points are fully added
    //       }
    //     }, 50); // Adjust speed here (smaller = faster)
    //   };

    return (
        <Typography variant="h6">
            {totalPoints} pts
        </Typography>
    );
}