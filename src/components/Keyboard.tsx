import Key from "./Key";
import { keyOptions } from "../constants/keyboard";

export default function Keyboard() {

    const renderedKeys = keyOptions().map(key => {
        return (
            <Key key={key.name}>{key.name}</Key>
        );
    });

    return (
        <div>
            {renderedKeys}
        </div>
    );
}