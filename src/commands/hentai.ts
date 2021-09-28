import { CommandOptions } from '../interfaces/commandOptions'
import axios from 'axios'

const command: CommandOptions = {
    name: 'hentai',
    aliases: ['h'],
    async execute(bot, logger, _args, _author, _defaultMovement) {
        const { data } = await axios.get('https://nekos.life/api/v2/img/hentai')
        bot.chat(data.url)
    }
}

export default command
