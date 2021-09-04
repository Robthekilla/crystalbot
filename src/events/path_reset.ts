import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

const event: EventOptions = {
    name: 'path_reset',
    execute(bot, logger, reason: string) {
        if (bot.debugMode) logger.debug(`${gray(bot.host)} Path has been reset for reason: ${reason}`)
    }
}

export default event
