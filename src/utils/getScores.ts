import { google } from 'googleapis'

export default async function getScores(message: string): Promise<Array<{ type: string; value: number }>> {
	try {
		// We create the client that we use to get the scores
		const client: any = await google.discoverAPI('https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1')

		// We set some requestedAttributes as well as the text we want to analyze
		const options = {
			comment: {
				text: message,
			},
			requestedAttributes: {
				SEVERE_TOXICITY: {},
				PROFANITY: {},
			},
		}

		// We send a request to them using our api key
		const response = await client.comments.analyze({
			key: process.env.API_KEY,
			resource: options,
		})

		const scores: Array<{ type: string; value: number }> = []

		for (const type of Object.keys(response.data.attributeScores)) {
			// We multiply the value here because the original would look like 0.99 but we want 99%
			const value = Math.floor(response.data.attributeScores[type].summaryScore.value * 100)
			scores.push({ type, value })
		}

		// We return the collected scores
		return scores
	} catch (error) {
		// Uppon error we just return an empty array
		return []
	}
}
