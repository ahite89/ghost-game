import { HitPointsProps } from "../interfaces/hitPoints";
import HitPoint from "./HitPoint";

export default function HitPoints({currentHP}: HitPointsProps) {


    const renderedHitPoints = currentHP.map(hitPoint => {
        return (
            <HitPoint key={hitPoint.id}>{hitPoint.symbol}</HitPoint>
        );
    });

    return (
        <div>
            {renderedHitPoints}
        </div>
    );
}