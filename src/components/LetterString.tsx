import { LetterStringProps } from "../interfaces/letterString";
import Letter from "./Letter";

export default function LetterString({letters}: LetterStringProps) {

    return (
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
    );
}