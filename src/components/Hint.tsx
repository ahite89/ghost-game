import { Badge } from "@mui/material";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { HintProps } from "../interfaces/hint";

export default function Hint({hintCount, onClick}: HintProps) {

    const handleHintButtonClick = () => {
        onClick(hintCount);
    };

    return (
            <Badge 
                style={{cursor: "pointer", border: "2px solid black", padding: ".5rem", borderRadius: "50%"}} 
                onClick={handleHintButtonClick} badgeContent={hintCount} color="error" showZero>
                    <HiOutlineLightBulb size={28}>Hint</HiOutlineLightBulb>
            </Badge>
    );
};