import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
    name: 'coordinates',
    aliases: ['coords', 'pos', 'position'],
    execute(bot, logger, args, author) {
        if (!bot.owners.includes(author)) return bot.chat('You cant use this.')

        const { x, y, z } = bot.entity.position

        bot.chat(`/msg ${author} X: ${x} Y: ${y} Z: ${z}`)
    }
}

export default command