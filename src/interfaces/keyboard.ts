import { KeyProps } from "./key"

export interface KeyboardProps {
    keys?: KeyProps[],
    cpuTurn: boolean,
    handleKeySelected: (key: string) => void
}