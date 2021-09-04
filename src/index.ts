import path from 'path'
import dotenv from 'dotenv'

import eventHandler from './handlers/events'
import commandHandler from './handlers/commands'

// @ts-ignore
import AutoEat from 'mineflayer-auto-eat'
import Mineflayer from 'mineflayer'
import Loggaby from 'loggaby'
import Enmap from 'enmap'

import { autoCrystal } from 'mineflayer-autocrystal'
import { pathfinder } from 'mineflayer-pathfinder'

import { CustomBot } from './interfaces/customBot'

dotenv.config({ path: path.join(__dirname, '../.env') })

const logger = new Loggaby({
    levels: [
        {
            name: 'Chat',
            color: '#835eff'
        }
    ]
})

const host = process.argv[2] ?? 'oldfag.org'

init(host)

export default async function init(host: string) {
    // @ts-ignore
    const bot: CustomBot = Mineflayer.createBot({
        host,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    })

    // Settings
    bot.playerEvents = false // Should it log when a player joins and leaves?
    bot.owners = ['Link0069']
    bot.prefix = '?'
    bot.debugMode = false

    // Required values that are set on startup
    bot.AutoCrystalEnabled = false
    bot.host = host
    bot.commands = new Map()
    bot.database = new Enmap({ name: `${host}`, fetchAll: true, autoFetch: true })

    bot.setMaxListeners(100)

    bot.loadPlugin(pathfinder)
    bot.loadPlugin(autoCrystal)
    bot.loadPlugin(AutoEat)

    await eventHandler(bot, logger)
    await commandHandler(bot, logger)
}
