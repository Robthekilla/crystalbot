import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'help',
	execute(bot, args, author) {
		const commands = []
		const ownerCommands = ['eval', 'reset', 'ignore']

		for (const command of bot.commands.keys()) {
			// We push an empty string if the command is owner only and the user is not a bot owner
			if (!bot.owners.includes(author) && ownerCommands.includes(command)) commands.push('')
			else commands.push(command)
		}

		// We filter the commands and don't includes strings that are empty
		bot.chat(`> My commands are: ${commands.filter(command => command.length !== 0).join(', ')}`)
	},
}

export default command
