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
    execute(bot, logger, args, author) {
        if (args.length > 0) {
            const players = Object.values(bot.players).filter((player) => player.ping !== 0)

            let player = null

            switch (args[0]) {
                case 'lowest':
                    player = players.find((player) => player.ping === getLowestLatency(players))
                    bot.chat(`> ${player.username} has the lowest ping with ${player.ping}ms`)
                    break

                case 'highest':
                    player = players.find((player) => player.ping === getHighestLatency(players))
                    bot.chat(`> ${player.username} has the highest ping with ${player.ping}ms`)
                    break

                default:
                    player = bot.players[args[0]]

                    if (!player) bot.chat('> Player not found. (Suffixes dont work incase u have one)')

                    bot.chat(`> ${player.username} has a ping of ${player.ping}ms`)
                    break
            }

            return null
        }

        bot.chat(`> My ping is ${bot.player.ping}ms. Your ping is ${bot.players[author].ping}ms`)
    }
}

export default command
