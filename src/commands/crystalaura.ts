import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'crystalaura',
	execute(bot, args, author, defaultMovement) {
        if (bot.AutoCrystalEnabled) {
            bot.autoCrystal.disable()
            bot.AutoCrystalEnabled = false
            bot.chat('Autocrystal Disabled.')
        }

        else if (!bot.AutoCrystalEnabled) {
            bot.autoCrystal.enable()
            bot.AutoCrystalEnabled = true
            bot.chat('Autocrystal Enabled.')
        }
	},
}

export default command