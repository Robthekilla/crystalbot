import fs from 'fs'
import path from 'path'
import { gray } from 'chalk'
import { CustomBot } from '../interfaces/customBot'
import { EventOptions } from '../interfaces/eventOptions'

export default async function run(bot: CustomBot, logger: any) {
	// We get all the event files that end with .js
	const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter((file) => file.endsWith('.js'))

	for (const file of eventFiles) {
		const event: EventOptions = require(path.join(__dirname, '../events', file)).default

		// If the event has .once set to true we will only listen to the event once
		// Else we will listen to it normally
		if (event.once) {
			// We pass the bot and logger to it as well as any other values the event provides
			bot.once(event.name, (...args: any) => event.execute(bot, logger, ...args))
		} else {
			// We pass the bot and logger to it as well as any other values the event provides
			bot.on(event.name, (...args: any) => event.execute(bot, logger, ...args))
		}
	}

	logger.log(`${gray(bot.host)} Events have been loaded ✔️`)

	return true
}
