import { KeyProps } from "./key"

export interface KeyboardProps {
    keys?: KeyProps[],
    handleKeySelected: (key: string) => void
}