import init from '..'
import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

const event: EventOptions = {
    name: 'end',
    execute(bot, logger) {
        logger.warn(`${gray(bot.host)} Connection has been closed.`)
        logger.warn(`${gray(bot.host)} Reconnecting in 5 seconds...`)

        setTimeout(async () => {
            await init(bot.host)
        }, 5000)
    }
}

export default event
