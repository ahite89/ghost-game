import { KeyProps } from "../interfaces/key";
import { Button } from "@mui/material";

export default function Key({ keyName, children, disableKeyboard, onClick }: KeyProps) {

    const handleKeyClick = () => {
        onClick(keyName);
    };

    return (
        <Button 
            style={{margin: ".2rem", color: "black", borderColor: "black"}}
            onClick={handleKeyClick} 
            variant="outlined"
            disabled={disableKeyboard}
        >
            {children}
        </Button>
    );
}