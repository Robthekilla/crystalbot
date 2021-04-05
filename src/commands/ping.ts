import { Player } from 'mineflayer'
import { CommandOptions } from '../interfaces/commandOptions'

function getLowestLatency(data: Array<Player>) {
	return Math.min(...data.map((player) => player.ping))
}

function getHighestLatency(data: Array<Player>) {
	return Math.max(...data.map((player) => player.ping))
}

const command: CommandOptions = {
	name: 'ping',
	execute(bot, args, author) {
		if (args.length > 0) {
			// We filter players that don't have a 0ms ping
			const players = Object.values(bot.players).filter((player) => player.ping !== 0)

			let player = null

			switch (args[0]) {
				case 'lowest':
					// We get the player with the lowest ping
					player = players.find((player) => player.ping === getLowestLatency(players))
					bot.chat(`> ${player.username} has the lowest ping with ${player.ping}ms`)
					break

				case 'highest':
					player = players.find((player) => player.ping === getHighestLatency(players))
					bot.chat(`> ${player.username} has the highest ping with ${player.ping}ms`)
					break

				default:
					player = bot.players[args[0]]
					bot.chat(player ? `> ${player.username} has a ping of ${player.ping}ms` : '> Player not found. (Special endings dont work btw)')
					break
			}

			return null
		}

		bot.chat(`> My ping is ${bot.player.ping}ms. Your ping is ${bot.players[author].ping}ms`)
	},
}

export default command
