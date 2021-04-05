import { gray } from 'chalk'
import { EventOptions } from '../interfaces/eventOptions'

const event: EventOptions = {
	name: 'kicked',
	execute(bot, logger, reason: string) {
		logger.warn(`${gray(bot.host)} Bot was kicked for reason: ${reason}`)
	},
}

export default event
