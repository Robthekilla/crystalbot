import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

const event: EventOptions = {
	name: 'error',
	execute(bot, logger, error: Error) {
		logger.error(`${gray(bot.host)}`, error)
	},
}

export default event
