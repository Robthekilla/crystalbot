import { CommandOptions } from '../interfaces/commandOptions'
import { goals } from 'mineflayer-pathfinder'

const { GoalBlock, GoalXZ, GoalY, GoalNear } = goals

let x = 0
let y = 0
let z = 0

const command: CommandOptions = {
    name: 'goto',
    execute(bot, logger, args, author, defaultMovement) {
        switch (args.length) {
            default:
                const target = bot.players[author] ? bot.players[author].entity : null

                if (!target) {
                    return bot.chat('You are not in my range.')
                }

                const p = target.position

                bot.chat('Moving to ur position.')

                bot.pathfinder.setMovements(defaultMovement)
                bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
                break

            case 1:
                y = parseInt(args[0], 10)

                if (isNaN(y)) return bot.chat('You have to give me numbers as arguments.')

                bot.chat(`> Moving to y: ${y}`)

                bot.pathfinder.setMovements(defaultMovement)
                bot.pathfinder.setGoal(new GoalY(y))
                break

            case 2:
                x = parseInt(args[0], 10)
                z = parseInt(args[1], 10)

                if (isNaN(x) || isNaN(z)) return bot.chat('You have to give me numbers as arguments.')

                bot.chat(`> Moving to x: ${x} z: ${z}`)

                bot.pathfinder.setMovements(defaultMovement)
                bot.pathfinder.setGoal(new GoalXZ(x, z))
                break

            case 3:
                x = parseInt(args[0], 10)
                y = parseInt(args[1], 10)
                z = parseInt(args[2], 10)

                if (isNaN(x) || isNaN(y) || isNaN(z)) return bot.chat('You have to give me numbers as arguments.')

                bot.chat(`> Moving to x: ${x} y: ${y} z: ${z}`)

                bot.pathfinder.setMovements(defaultMovement)
                bot.pathfinder.setGoal(new GoalBlock(x, y, z))
                break
        }
    }
}

export default command
