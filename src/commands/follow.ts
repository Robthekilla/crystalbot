import { CommandOptions } from '../interfaces/commandOptions'
import { goals } from 'mineflayer-pathfinder'

const { GoalFollow } = goals

const command: CommandOptions = {
	name: 'follow',
	execute(bot, args, author, defaultMovement) {
        // We follow the player if the player is in range 
        const target = bot.players[author] ? bot.players[author].entity : null

        if (!target) {
            return bot.chat('You are not in my range.')
        }

        bot.chat(`> Now following ${author}`)

        bot.pathfinder.setMovements(defaultMovement)
        // @ts-ignore
        bot.pathfinder.setGoal(new GoalFollow(target, 3), true)
	},
}

export default command
