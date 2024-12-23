import { HitPointProps } from "../interfaces/hitPoint";

export default function HitPoint({ children }: HitPointProps) {
    return (
        <div style={{marginLeft: ".5rem", color: "darkred"}}>{children}</div>
    );
}