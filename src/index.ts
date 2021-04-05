import path from 'path'
import dotenv from 'dotenv'

import eventHandler from './handlers/events'
import commandHandler from './handlers/commands'

import Mineflayer from 'mineflayer'
import Loggaby from 'loggaby'
import Enmap from 'enmap'
// @ts-ignore
import AutoEat from 'mineflayer-auto-eat'

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

// If there is no process argument we just connect to oldfag.org
const host = process.argv[2] ?? 'oldfag.org'
init(host)

// The export is so we can use it in the disconnect event so we can reconnect

export default async function init(host: string) {
	// @ts-ignore
	const bot: CustomBot = Mineflayer.createBot({
		host,
		username: process.env.USERNAME,
		password: process.env.PASSWORD
	})

	// Settings
	bot.playerEvents = false // Should it log when a player joins and leaves?
	bot.owners = ['Link0069'] // Array of minecraft usernames with who the owners are of the bot
	bot.prefix = '?' // Command prefix of the bot
	bot.debugMode = false // If it should be in debug mode (will log stuff like path_update event but will spam logs)

	// Required values that are set on startup
	bot.AutoCrystalEnabled = false
	bot.host = host // the host to connect to
	bot.messageQueue = [] // Its so we don't spam requests to perspective api
	bot.commands = new Map() // A map object where all the commands are stored and loaded
	bot.database = new Enmap({ name: `${host}`, fetchAll: true, autoFetch: true }) // The database for the server the bot is connected to

	// Add more listeners (this is optional)
	bot.setMaxListeners(100)

	// Load the plugins
	bot.loadPlugin(pathfinder)
	bot.loadPlugin(autoCrystal)
	bot.loadPlugin(AutoEat)

	// Execute the handlers
	await eventHandler(bot, logger)
	await commandHandler(bot, logger)
}
