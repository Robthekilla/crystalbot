import minecraftData from 'minecraft-data'
import { gray, green, cyan } from 'chalk'
import { Movements } from 'mineflayer-pathfinder'
import { EventOptions } from '../interfaces/eventOptions'

const event: EventOptions = {
	name: 'chat',
	async execute(bot, logger, author: string, message: string) {
		if (bot.database.has(`${author}.BLOCKED`)) return

		let output = `${gray(bot.host)} <${author}> `

		if (author === bot.username) output += cyan(message)
		else if (message.startsWith('>') && author !== bot.username) output += green(message)
		else if (author !== bot.username) output += message

		bot.messageQueue.push({ author, message, output })

		if (!message.startsWith(bot.prefix) || author === bot.username) return

		const args = message.slice(bot.prefix.length).trim().split(/ +/)
		const commandName = args.shift().toLowerCase()

		if (!bot.commands.get(commandName)) return

		try {
			const mcData = minecraftData(bot.version)
			// @ts-ignore
			const defaultMovement = new Movements(bot, mcData)

			// @ts-ignore
			defaultMovement.canDig = false
			defaultMovement.allow1by1towers = true
			defaultMovement.maxDropDown = 1000
			defaultMovement.scafoldingBlocks.push(mcData.itemsByName.obsidian.id)

			bot.commands.get(commandName).execute(bot, args, author, defaultMovement)
		} catch (error) {
			logger.error(error)
			bot.chat('There was an error trying to execute that command.')
		}
	},
}

export default event
