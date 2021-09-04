import { goals } from 'mineflayer-pathfinder'
import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

const event: EventOptions = {
    name: 'goal_reached',
    execute(bot, logger, goal: goals.Goal) {
        if (bot.debugMode) logger.debug(`${gray(bot.host)} Goal reached ${JSON.stringify(goal)}`)
    }
}

export default event
