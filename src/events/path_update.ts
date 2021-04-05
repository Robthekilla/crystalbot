import { EventOptions } from '../interfaces/eventOptions'
import { gray } from 'chalk'

const event: EventOptions = {
	name: 'path_update',
	execute(bot, logger, r) {
		const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)

		let output = `${gray(bot.host)} `
		output += `I can get there in ${r.path.length} moves. `
		output += `Computation took ${r.time.toFixed(2)} ms (${r.visitedNodes} nodes, ${nodesPerTick} nodes/tick)`

		if (bot.debugMode) logger.debug(output)
	},
}

export default event
