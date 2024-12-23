import { HitPointProps } from "./hitPoint";
import { Player } from "../constants/player";

export interface HitPointsProps {
    currentHP: HitPointProps[],
    player?: Player
}