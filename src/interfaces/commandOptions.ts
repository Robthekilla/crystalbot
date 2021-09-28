import { Movements } from 'mineflayer-pathfinder'
import { CustomBot } from './customBot'

export interface CommandOptions {
    name: string
    aliases?: string[]
    execute(Bot: CustomBot, logger: any, args?: string[], author?: string, defaultMovement?: Movements): void
}