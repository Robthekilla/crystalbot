import { EventOptions } from '../interfaces/eventOptions'
import { gray, yellow } from 'chalk'
import { Player } from 'mineflayer'

const event: EventOptions = {
	name: 'playerLeft',
	execute(bot, logger, player: Player) {
		if (bot.runPlayerEvents && bot.playerEvents) logger.chat(`${gray(bot.host)} ${yellow(player.username)} has left the server.`)
	},
}

export default event
