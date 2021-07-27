import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

// Function for getting a random number
function getRandomInt(max: number) {
	return Math.floor(Math.random() * Math.floor(max + 1));
}

const event: EventOptions = {
	name: 'spawn',
	once: true,
	execute(bot, logger) {
		logger.log(`${gray(bot.host)} Bot has joined ✔️`)

		// @ts-ignore
		bot.autoEat.options = {
			priority: "foodPoints",
			startAt: 18,
			bannedFood: ['rotten_flesh', 'pufferfish', 'chorus_fruit'],
		}

		bot.runPlayerEvents = false
		bot.setControlState('forward', true)

		setTimeout(() => {
			bot.clearControlStates()
			bot.runPlayerEvents = true
		}, 1000)

		setInterval(() => {
			const totemName = 'totem_of_undying'
			const totem = bot.inventory.items().find(item => item.name === totemName)

			if (totem && !bot.inventory.slots[45]) {
				bot.equip(totem, 'off-hand')
			} else if (totem && bot.inventory.slots[45] && bot.inventory.slots[45].name !== totemName) {
				bot.equip(totem, 'off-hand')
			}
		}, 50)

		setInterval(async () => {
			const request = bot.messageQueue.shift()

			if (!request) return

			logger.chat(request.output)
		}, 1000)

		setInterval(() => {
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

			const number = getRandomInt(messages.length)
			const message: string = messages[number]

			bot.chat(message)
		}, 10 * 60 * 1000)
	},
}

export default event
