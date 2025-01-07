import { Keys } from "../constants/keyboard";
import { KeyProps } from "../interfaces/key";

export default function Key({ keyName, children, disableKeyboard, onClick }: KeyProps) {

    const handleKeyClick = () => {
        onClick(keyName);
    };

    const actionKeyClass = keyName === (Keys.Enter || Keys.Delete) ? "actionKey" : "";

    return (
        <button
            className={"key " + actionKeyClass}
            onClick={handleKeyClick} 
            disabled={disableKeyboard}
        >
            {children}
        </button>
    );
}