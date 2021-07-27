import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
    name: 'reset',
    execute(bot, args, author, defaultMovement) {
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        bot.database.delete(`${args[0]}.PROFANITY`)
        bot.database.delete(`${args[0]}.SEVERE_TOXICITY`)

        bot.chat(`Cleared all data for ${args[0]}`)
    },
}

export default command
