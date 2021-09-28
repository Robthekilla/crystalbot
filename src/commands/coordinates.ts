import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
    name: 'coordinates',
    aliases: ['coords', 'pos', 'position'],
    execute(bot, logger, args, author) {
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        const { x, y, z } = bot.entity.position

        bot.chat(`/msg ${author} X: ${Math.round(x)} Y: ${Math.round(y)} Z: ${Math.round(z)}`)
    }
}

export default command
