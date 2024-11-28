import { hitPointArray } from "../constants/hitPoints";
import HitPoint from "./HitPoint";

export default function HitPoints() {

    const renderedHitPoints = hitPointArray.map(hitPoint => {
        return (
            <HitPoint key={hitPoint.id}>{hitPoint.value}</HitPoint>
        );
    });

    return (
        <div>
            {renderedHitPoints}
        </div>
    );
}