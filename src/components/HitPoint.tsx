import { HitPointProps } from "../interfaces/hitPoint";

export default function HitPoint({ children }: HitPointProps) {
    return (
        <div style={{marginLeft: ".5rem", color: "#d32f2f"}}>{children}</div>
    );
}