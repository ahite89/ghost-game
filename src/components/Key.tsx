import { KeyProps } from "../interfaces/key";
import { Button } from "@mui/material";

export default function Key({ keyName, children, cpuTurn, onClick }: KeyProps) {

    const handleKeyClick = () => {
        onClick(keyName);
    };

    return (
        <Button 
            style={{margin: '.2rem'}}
            onClick={handleKeyClick} 
            variant="outlined"
            disabled={cpuTurn}
        >
            {children}
        </Button>         
    );
}