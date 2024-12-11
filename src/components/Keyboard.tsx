import Key from "./Key";
import { keyboardOptions } from "../constants/keyboard";
import { KeyboardProps } from "../interfaces/keyboard";
import { Stack } from "@mui/material";

export default function Keyboard({handleKeySelected, disableKeyboard}: KeyboardProps) {

    const renderedKeys = keyboardOptions.map((keyboardRow, rowIndex) => {
        return (
            <div key={rowIndex}>
                {keyboardRow.map((key, keyIndex) => 
                    <Key 
                        onClick={handleKeySelected} 
                        key={keyIndex}
                        keyName={key}
                        disableKeyboard={disableKeyboard}
                    >
                        {key}
                    </Key>
                )}
            </div>  
        );
    });

    return (
        <Stack flexWrap="nowrap" alignItems="center">
           {renderedKeys}
        </Stack>
    );
}