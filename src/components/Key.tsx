import { KeyProps } from "../interfaces/key";
import { Button } from "@mui/material";

export default function Key({ keyName, children, onClick }: KeyProps) {

    const handleKeyClick = () => {
        onClick(keyName);
    };

    return (
        <div>
            <Button onClick={handleKeyClick} variant="outlined">
                {children}
            </Button>         
        </div>
    );
}