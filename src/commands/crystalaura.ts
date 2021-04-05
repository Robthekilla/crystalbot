import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
	name: 'crystalaura',
	execute(bot, args, author, defaultMovement) {

        // If the autocrystal is enabled we disable it
        if (bot.AutoCrystalEnabled) {
            bot.autoCrystal.disable()
            bot.AutoCrystalEnabled = false
            bot.chat('Autocrystal Disabled.')
        } 

         // If the autocrystal is disabled we enable it
        else if (!bot.AutoCrystalEnabled) {
            bot.autoCrystal.enable()
            bot.AutoCrystalEnabled = true
            bot.chat('Autocrystal Enabled.')
        }
	},
}

export default command