import { Bot } from 'mineflayer'
import { goals, Movements } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import { CommandOptions } from './commandOptions';
import Enmap from 'enmap'

export interface CustomBot extends Bot {
	owners: string[]
	prefix: string
    host?: string
    playerEvents?: boolean
    runPlayerEvents?: boolean
    debugMode?: boolean
    mode?: string
    messageQueue?: Array<{author: string, message: string, output: string}>
	commands: Map<string, CommandOptions>
    database?: Enmap
    AutoCrystalEnabled: boolean
    pathfinder: {
        setGoal (Goal: goals.Goal): void,
        setMovements (Movements: Movements): void
    },
    autoCrystal: {
        enable: () => void,
        disable: () => void,
        getHoles: () => Promise<Vec3[]>
    }
}