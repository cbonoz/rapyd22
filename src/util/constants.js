export const APP_NAME = 'RapydRewards'
export const APP_DESC = 'Personalized card recommendations powered by Rapyd'

export const CARD_ROUTE_DESCRIPTION = `
Returns the top three recommended cards based on the user's provided cards and the category of purchase.
`

export const BASE_URL = process.env.BASE_URL || 'http://localhost:8000'

export const EXAMPLE_RECOMMENDED_CARDS = JSON.stringify([{"name":"Capital One SavorOne Cash Rewards Credit Card","link":"CARD_LINK", "image": "CARD_IMAGE","rewards":{"ticket":{"percentage":8},"restaurant":{"percentage":3},"entertainment":{"percentage":3},"supermarket":{"percentage":3},"streaming":{"percentage":3},"all":{"percentage":1}}}, {name: '...'}], null, '\t')