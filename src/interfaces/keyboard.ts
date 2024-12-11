import { KeyProps } from "./key";

export interface KeyboardProps {
    keys?: KeyProps[],
    disableKeyboard: boolean,
    handleKeySelected: (key: string) => void
}