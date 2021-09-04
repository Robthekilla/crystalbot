import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'help',
	execute(bot, args, author) {
		const commands = []
		const ownerCommands = ['eval', 'reset', 'ignore']

		for (const command of bot.commands.keys()) {
			if (!bot.owners.includes(author) && ownerCommands.includes(command)) continue
			else commands.push(command)
		}

		bot.chat(`> My commands are: ${commands.join(', ')}`)
	},
}

export default command
