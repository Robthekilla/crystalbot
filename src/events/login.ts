import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

const event: EventOptions = {
    name: 'login',
    once: true,
    execute(bot, logger) {
        logger.log(`${gray(bot.host)} Bot has logged in ✔️`)
    }
}

export default event
