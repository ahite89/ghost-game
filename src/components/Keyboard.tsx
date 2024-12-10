import Key from "./Key";
import { keyOptions } from "../constants/keyboard";
import { KeyboardProps } from "../interfaces/keyboard";
import { Grid2 as Grid } from "@mui/material";

export default function Keyboard({handleKeySelected, disableKeyboard}: KeyboardProps) {

    const renderedKeys = keyOptions().map(key => {
        return (
            <Key 
                onClick={handleKeySelected} 
                key={key.name}
                keyName={key.name}
                disableKeyboard={disableKeyboard}
            >
                {key.name}
            </Key>
        );
    });

    return (
        <Grid justifyContent="center" container spacing={{ xs: 0.5, md: 0.5 }} columns={{ xs: 8, sm: 8, md: 8 }}>
           <Grid>
                {renderedKeys.slice(0, 10)}
            </Grid>
            <Grid>
                {renderedKeys.slice(10, 19)}
            </Grid>
            <Grid>
                {renderedKeys.slice(19, 28)}
            </Grid>
        </Grid>
    );
}