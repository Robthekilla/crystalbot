import { CommandOptions } from '../interfaces/commandOptions'

const command: CommandOptions = {
    name: 'crystalaura',
    execute(bot, logger, _args, _author, _defaultMovement) {
        if (bot.AutoCrystalEnabled) {
            bot.autoCrystal.disable()
            bot.AutoCrystalEnabled = false
            bot.chat('Autocrystal Disabled.')
        } else if (!bot.AutoCrystalEnabled) {
            bot.autoCrystal.enable()
            bot.AutoCrystalEnabled = true
            bot.chat('Autocrystal Enabled.')
        }
    }
}

export default command
