import { Keys } from "../constants/keyboard";
import { KeyProps } from "../interfaces/key";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Key({ keyName, children, disableKeyboard, onClick }: KeyProps) {

    const handleKeyClick = () => {
        onClick(keyName);
    };

    const actionKeyClass = keyName === (Keys.Enter || Keys.Delete) ? "actionKey" : "";
    children = keyName === Keys.Delete ? <FaDeleteLeft /> : children;
    
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