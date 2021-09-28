import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

// Function for getting a random number
function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max + 1))
}

const event: EventOptions = {
    name: 'spawn',
    once: true,
    execute(bot, logger) {
        const prefix = bot.prefix

        logger.log(`${gray(bot.host)} Bot has joined ✔️`)

        // @ts-ignore
        bot.autoEat.options = {
            priority: 'foodPoints',
            startAt: 18,
            bannedFood: ['rotten_flesh', 'pufferfish', 'chorus_fruit']
        }

        bot.runPlayerEvents = false
        bot.setControlState('forward', true)

        setTimeout(() => {
            bot.clearControlStates()
            bot.runPlayerEvents = true
        }, 1000)

        setInterval(() => {
            const totemName = 'totem_of_undying'
            const totem = bot.inventory.items().find((item) => item.name === totemName)

            if (totem && !bot.inventory.slots[45]) {
                bot.equip(totem, 'off-hand')
            } else if (totem && bot.inventory.slots[45] && bot.inventory.slots[45].name !== totemName) {
                bot.equip(totem, 'off-hand')
            }
        }, 50)

        setInterval(() => {
			const messages: string[] = [
				`> You can see all my commands using ${prefix}help`,
                `> Make me go anywhere you want using ${prefix}goto`,
                `> You can use ${prefix}goto without any parameters to make me walk to you`,
                `> I can follow you if you use ${prefix}follow`,
                `> Use ${prefix}crystalaura to toggle my crystal aura`
            ]

            const number = getRandomInt(messages.length)
            const message: string = messages[number]

            bot.chat(message)
        }, 10 * 60 * 1000)
    }
}

export default event
