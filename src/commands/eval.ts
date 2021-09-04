import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'eval',
	execute(bot, args, author) {
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        if (args[0]) {
            const output = eval(args.join(' '))
            bot.chat(output)
        }
	},
}

export default command
