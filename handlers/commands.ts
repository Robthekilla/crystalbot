import fs from 'fs'
import path from 'path'
import { gray } from 'chalk'
import { CommandOptions } from '../interfaces/commandOptions'
import { CustomBot } from '../interfaces/customBot'

export default async function run(bot: CustomBot, logger: any) {
	// We get all command files that end with .js
	const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter((file) => file.endsWith('.js'))

	// We load the individual commands
	for (const file of commandFiles) {
		const command: CommandOptions = require(path.join(__dirname, '../commands', file)).default
		if (command.name !== 'come') bot.commands.set(command.name, command)
	}

	logger.log(`${gray(bot.host)} Commands have been loaded ✔️`)

	return true
}
