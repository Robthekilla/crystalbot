import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
    name: 'ignore',
    execute(bot, args, author) {
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        if (args[0]) {
            const player = bot.players[args[0]]

            if (!player) return bot.chat('Player not found.')

            const isBlocked = bot.database.has(`${player.username}.BLOCKED`)

            if (isBlocked) {
                bot.database.set(`${player.username}.BLOCKED`, false)
                bot.chat(`Now no longer ignoring ${player.username}`)
            } else {
                bot.database.set(`${player.username}.BLOCKED`, true)
                bot.chat(`Now ignoring ${player.username}`)
            }
        }
    } 
}

export default command
