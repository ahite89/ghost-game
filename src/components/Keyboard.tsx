import Key from "./Key";
import { keyOptions } from "../constants/keyboard";
import { KeyboardProps } from "../interfaces/keyboard";

export default function Keyboard({handleKeySelected}: KeyboardProps) {

    const renderedKeys = keyOptions().map(key => {
        return (
            <Key 
                onClick={handleKeySelected} 
                key={key.name}
                keyName={key.name}
            >
                {key.name}
            </Key>
        );
    });

    return (
        <div>
            {renderedKeys}
        </div>
    );
}