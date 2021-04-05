import SingleMultiple from '../utils/singleMultiple'
import { CommandOptions } from '../interfaces/commandOptions'

interface CustomPlayer {
	username: string | number
	toxicity: number
}

function getLeast(data: Array<CustomPlayer>, property: string) {
	// @ts-ignore
	return Math.min(...data.map((player) => player[property]))
}

function getMost(data: Array<CustomPlayer>, property: string) {
	// @ts-ignore
	return Math.max(...data.map((player) => player[property]))
}

const command: CommandOptions = {
	name: 'toxic',
	execute(bot, args, author) {
		let player: CustomPlayer = { username: author, toxicity: 0 }
		let players: CustomPlayer[] = []

		let keyArray = bot.database.keyArray()

		// We filter the database for users with a PROFANITY property
		keyArray = keyArray.filter((key) => key.toString().split('.')[1] === 'SEVERE_TOXICITY')

		// We get the data and push it to the players array
		for (const player of keyArray) {
			const count = bot.database.get(player) ?? 0
			const playerName = player.toString().split('.')[0]

			players.push({ username: playerName, toxicity: count })
		}

		if (args.length > 0) {
			switch (args[0]) {
				case 'lowest':
					// We find the player with the lowest toxicity
					player = players.find((player) => player.toxicity === getLeast(players, 'toxicity'))
					bot.chat(
						`> ${player.username} has the least with ${player.toxicity} ${SingleMultiple(player.toxicity, 'message')} ` +
							`that ${SingleMultiple(player.toxicity, 'include', true)} toxicity.`
					)
					break

				case 'highest':
					// We find the player with the highest toxicity
					player = players.find((player) => player.toxicity === getMost(players, 'toxicity'))
					bot.chat(
						`> ${player.username} has the most with ${player.toxicity} ${SingleMultiple(player.toxicity, 'message')} ` +
							`that ${SingleMultiple(player.toxicity, 'include', true)} toxicity.`
					)
					break

				default:
					if (!bot.players[args[0]]) return bot.chat('Player not found. (Special endings dont work btw)')

					player = players.find((value) => value.username === args[0])

					bot.chat(
						`> ${args[0]} has sent ${player.toxicity ? player.toxicity : 0} ${SingleMultiple(player.toxicity ? player.toxicity : 0, 'message')} ` +
							`that ${SingleMultiple(player.toxicity ? player.toxicity : 0, 'include', true)} toxicity in this server so far.`
					)
					break
			}

			return null
		}

		player = players.find((value) => value.username === author)

		bot.chat(
			`> You have sent ${player.toxicity ? player.toxicity : 0} ${SingleMultiple(player.toxicity ? player.toxicity : 0, 'message')} ` +
				`that ${SingleMultiple(player.toxicity ? player.toxicity : 0, 'include', true)} toxicity in this server so far.`
		)
	},
}

export default command
