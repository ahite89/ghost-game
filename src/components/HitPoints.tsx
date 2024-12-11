import { HitPointsProps } from "../interfaces/hitPoints";
import HitPoint from "./HitPoint";
import { Player } from "../constants/player";
import { FaHeart, FaGhost } from "react-icons/fa";

export default function HitPoints({currentHP, player}: HitPointsProps) {

    const hpIcon = player === Player.User ? <FaHeart /> : <FaGhost />;

    const renderedHitPoints = currentHP.map(hitPoint => {
        return (
            <HitPoint key={hitPoint.id}>{hpIcon}</HitPoint>
        );
    });

    return (
        <div>
            {renderedHitPoints}
        </div>
    );
}