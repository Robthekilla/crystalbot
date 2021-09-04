import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'kit',
	execute(bot, args, _author, _defaultMovement) {
        if (!args[0]) return bot.chat('This command does /kit *argument*. Please give me a kit name (only use if this server has a /kit command)')

        if (args[0]) {
            bot.chat('Ok.')
            bot.chat(`/kit ${args[0]}`)
        }
	},
}

export default command
