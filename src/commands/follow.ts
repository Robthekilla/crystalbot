import { CommandOptions } from '../interfaces/commandOptions'
import { goals } from 'mineflayer-pathfinder'

const { GoalFollow } = goals

const command: CommandOptions = {
    name: 'follow',
    execute(bot, logger, _args, author, defaultMovement) {
        const target = bot.players[author] ? bot.players[author].entity : null

        if (!target) {
            return bot.chat('You are not in my range.')
        }

        bot.chat(`Now following ${author}`)

        bot.pathfinder.setMovements(defaultMovement)
        bot.pathfinder.setGoal(new GoalFollow(target, 5), true)
    }
}

export default command
