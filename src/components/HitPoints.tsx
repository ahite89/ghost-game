import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { motion } from "framer-motion";

import { HitPointsProps } from "../interfaces/hitPoints";
import HitPoint from "./HitPoint";
import { FULL_HP_ARRAY } from "../constants/hitPoints";

export default function HitPoints({currentHP}: HitPointsProps) {

    const renderedHitPoints = FULL_HP_ARRAY.map(hitPoint => {
        return (
            <motion.div
                key={hitPoint.id}
                initial={{ scale: 1 }}
                animate={{ scale: [1.2, 0.9, 1] }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ display: "flex", gap: "4px", alignItems: "center" }}
            >
                {
                    hitPoint.id! <= currentHP.length ? (
                        <motion.span
                            initial={{ scale: 1 }}
                            animate={{ scale: [1.2, 0.9, 1] }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <HitPoint>
                                <FaHeart size={28} />
                            </HitPoint>
                        </motion.span>
                    ) : 
                    (
                        <HitPoint>
                            <FaRegHeart size={28} />
                        </HitPoint>
                    )
                }
            </motion.div>      
        );
    });

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {renderedHitPoints}
        </div>
    );
}