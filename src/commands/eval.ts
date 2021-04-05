import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'eval',
	execute(bot, args, author) {
        // Return if the author is not a bot owner
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        // A restart function we can use in the eval command
        // Must be used with pm2 to be able to actually restart
        // @ts-ignore
        function restart() {
            bot.chat('Restarting...')
            process.exit(0)
        }

        // If we recieved some input we execute it and send the output back
        if (args[0]) {
            const output = eval(args.join(' '))
            bot.chat(output)
        }
	},
}

export default command
