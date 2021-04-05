import getScores from '../utils/getScores'
import { EventOptions } from '../interfaces/eventOptions'
import { gray, yellow } from 'chalk'

// Function for getting a random number
function getRandomInt(max: number) {
	return Math.floor(Math.random() * Math.floor(max + 1));
}

const event: EventOptions = {
	name: 'spawn',
	once: true,
	execute(bot, logger) {
		logger.log(`${gray(bot.host)} Bot has joined ✔️`)

		// We set some options for the auto eat
		// @ts-ignore
		bot.autoEat.options = {
			priority: "foodPoints",
			startAt: 18,
			bannedFood: ['rotten_flesh', 'pufferfish', 'chorus_fruit'],
		}

		// We move forward so we are able to chat on servers that require you to move a bit to be able to chat
		bot.runPlayerEvents = false
		bot.setControlState('forward', true)

		setTimeout(() => {
			bot.clearControlStates()
			bot.runPlayerEvents = true
		}, 1000)

		// Auto totem that triggers every tick
		setInterval(() => {
			const totemName = 'totem_of_undying'

			// We search for a totem in our inventory
			const totem = bot.inventory.items().find(item => item.name === totemName)

			// If we don't have a totem equiped or the offhand item isn't a totem we equip a totem
			if (totem && !bot.inventory.slots[45]) {
				bot.equip(totem, 'off-hand')
			} else if (totem && bot.inventory.slots[45] && bot.inventory.slots[45].name !== totemName) {
				bot.equip(totem, 'off-hand')
			}
		}, 50)

		setInterval(async () => {
			// Get the latest message in the queue
			const request = bot.messageQueue.shift()
			if (!request) return

			// Get the scores from perspective api
			const toxicityScores = await getScores(request.message)

			// Boolean to know if the message is positive
			let isToxic = false

			for (const score of toxicityScores) {
				// Just to make it human readable
				const scoreName = score.type.toLowerCase().replace('_', '')

				// Add the user in the database if the user doesn't exist
				if (!bot.database.has(`${request.author}.${score.type}`)) {
					bot.database.set(`${request.author}.${score.type}`, 0)
				}

				// If the score is above 80 we count it as toxic
				if (score.value >= 80) {
					isToxic = true

					// We get the old counter and add 1 to it
					const oldCount = bot.database.get(`${request.author}.${score.type}`)
					const newCount = oldCount + 1
					bot.database.set(`${request.author}.${score.type}`, newCount)

					// If the counter is divisible by 20 (aka every 20th message) we send a message that the user has reached X messages in the X score
					if (newCount % 20 === 0) bot.chat(`> ${request.author} just reached ${newCount} messages with ${scoreName} in this server.`)
				}
			}

			// If the message is toxic we add a suffix to it with a yellow text called TOXIC to know that it is identified
			if (isToxic) request.output += ` ${yellow('TOXIC')}`

			// We finnally log the chat message
			logger.chat(request.output)
		}, 1000)

		// This interval is for the bot to promote itself
		setInterval(() => {

			// Possible messages the bot can send into chat
			const messages: string[] = [
				'> Want to see how many toxic messages you or someone else has sent? try doing "?toxic" or "?toxic *username*"',
				'> Want to see how many messages with profanity you or someone else has sent? try doing "?profanity" or "?profanity *username*"',
				'> You can see who has the most toxic messages with ?toxic highest',
				'> You can see who has the most messages with profanity with ?profanity highest',
				'> Make me go anywhere you want using ?goto',
				'> Did you know you can use ?goto without any parameters to make me walk to you?',
				'> I can follow you if you use ?follow',
				'> I also have a Crystal Aura! Use ?crystalaura to enable or disable it'
			]

			// We pick a random message to send
			const number = getRandomInt(messages.length)
			const message: string = messages[number]

			// We send it
			bot.chat(message)
		}, 5 * 60 * 1000)
	},
}

export default event
