import { HitPointsProps } from "../interfaces/hitPoints";
import HitPoint from "./HitPoint";
import { FaHeart } from "react-icons/fa";

export default function HitPoints({currentHP}: HitPointsProps) {

    const hpIcon = <FaHeart size={28} />;

    const renderedHitPoints = currentHP.map(hitPoint => {
        return (
            <HitPoint key={hitPoint.id}>{hpIcon}</HitPoint>
        );
    });

    return (
        <div className="flex flex-row">
            {renderedHitPoints}
        </div>
    );
}