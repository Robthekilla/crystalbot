import minecraftData from 'minecraft-data'
import { gray, green, cyan } from 'chalk'
import { Movements } from 'mineflayer-pathfinder'
import { EventOptions } from '../interfaces/eventOptions'

const event: EventOptions = {
	name: 'chat',
	async execute(bot, logger, author: string, message: string) {
		// We make an output variable that has the base template
		let output = `${gray(bot.host)} <${author}> `

		// If the message comes from the bot we highlight it with cyan
		if (author === bot.username) output += cyan(message)
		// If the message starts with > and doesn't come from the bot we make it green
		else if (message.startsWith('>') && author !== bot.username) output += green(message)
		// If none of the above has triggered we just add the message normally without any colors
		else if (author !== bot.username) output += message

		// We add the message to the internal message queue
		bot.messageQueue.push({ author, message, output })

		// Return if the message doesn't start with the command prefix or the author is the bot
		if (!message.startsWith(bot.prefix) || author === bot.username) return

		// Get the arguments after the command
		const args = message.slice(bot.prefix.length).trim().split(/ +/)

		// Remove the first element so we only have arguments in the array and we can retrieve the commandName
		const commandName = args.shift().toLowerCase()

		if (!bot.commands.get(commandName)) return

		try {
			// Create an mcdata instance
			const mcData = minecraftData(bot.version)
			// We use mcdata to create the movements that the commands use
			const defaultMovement = new Movements(bot, mcData)

			// We change the movements so it can use obsidian to place and it can fall 1000 blocks for crystal pvp servers
			// @ts-ignore
			defaultMovement.canDig = false
			defaultMovement.allow1by1towers = true
			defaultMovement.maxDropDown = 1000
			defaultMovement.scafoldingBlocks.push(mcData.itemsByName.obsidian.id)

			// We execute the command the user is trying to use
			bot.commands.get(commandName).execute(bot, args, author, defaultMovement)
		} catch (error) {
			// We respond that the command failed to execute if an error has occured
			logger.error(error)
			bot.chat('There was an error trying to execute that command.')
		}

	},
}

export default event
