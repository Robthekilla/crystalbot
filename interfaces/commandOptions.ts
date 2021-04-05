import { Movements } from "mineflayer-pathfinder";
import { CustomBot } from "./customBot";

export interface CommandOptions {
    name: string,
    aliases?: string[],
    execute (Bot: CustomBot, args?: string[], author?: string, defaultMovement?: Movements): void
}