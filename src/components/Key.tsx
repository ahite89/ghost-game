import { Keys } from "../constants/keyboard";
import { KeyProps } from "../interfaces/key";
import { FaDeleteLeft } from "react-icons/fa6";

export default function Key({ keyName, disableKeyboard, onClick }: KeyProps) {

    const handleKeyClick = () => {
        onClick(keyName);
    };

    const actionKeyID = keyName === Keys.Enter || keyName === Keys.Delete ? "actionKey" : "";
    let keyDisplay = keyName === Keys.Delete ? <FaDeleteLeft size={22} /> : keyName;
    
    return (
        <button
            id={actionKeyID}
            className={"key"}
            onClick={handleKeyClick} 
            disabled={disableKeyboard}
        >
            {keyDisplay}
        </button>
    );
}