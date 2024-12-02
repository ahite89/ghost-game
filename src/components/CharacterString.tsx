import { CharacterStringProps } from "../interfaces/characterString";

export default function CharacterString({characters}: CharacterStringProps) {
    return (
        <div>{characters.join('')}</div>
    );
}