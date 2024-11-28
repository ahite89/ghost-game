import { KeyProps } from "../interfaces/key";

export default function Key({ children }: KeyProps) {

    const handleClick = () => {
        console.log('clicked!');
    };

    return (
        <div onClick={handleClick}>{children}</div>
    );
}