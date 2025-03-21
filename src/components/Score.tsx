import { Typography } from "@mui/material";
import { ScoreProps } from "../interfaces/score";
import { getPointsFromRound } from "../services/score";
import { useEffect, useState } from "react";

export default function Score({pointsWon, letters}: ScoreProps) {
    debugger
    const pointsFromRound = getPointsFromRound(letters, 0);
    const [totalNumberOfPoints, setTotalNumberOfPoints] = useState(pointsWon);

    useEffect(() => {
        if (totalNumberOfPoints >= pointsWon + pointsFromRound) return;

        const interval = setInterval(() => {
            setTotalNumberOfPoints((prev) => (prev < pointsWon + pointsFromRound ? prev + 1 : pointsWon + pointsFromRound));
        }, 10);

        return () => clearInterval(interval);
    }, [totalNumberOfPoints]);

    return (
        <Typography variant="h6">
            {totalNumberOfPoints} pts
        </Typography>
    );
}

// const AnimatedCounter = ({ start = 0, end = 100, speed = 10 }) => {
//     const [number, setNumber] = useState(start);
  
//     useEffect(() => {
//       if (number >= end) return; // Stop when reaching the end value
  
//       const interval = setInterval(() => {
//         setNumber((prev) => (prev < end ? prev + 1 : end));
//       }, speed); // Speed controls how fast the numbers change
  
//       return () => clearInterval(interval); // Cleanup interval on unmount
//     }, [number, end, speed]);
  
//     return <h1>{number}</h1>;
//   };