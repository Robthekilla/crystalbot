import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'ignore',
	execute(bot, args, author) {
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        if (args[0]) {
            const player = bot.players[args[0]]

            if (!player) return bot.chat('Player not found.')
            else {
                bot.chat(`/ignore ${player.username}`)
                bot.chat(`Used /ignore on ${player.username}`)
            }
        }
	},
}

export default command
