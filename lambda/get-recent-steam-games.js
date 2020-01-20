import fetch from 'node-fetch'

export async function handler(event, context) {
  const API_KEY = process.env.STEAM_API_KEY
  const MY_STEAM_ID = process.env.MY_STEAM_ID
  const ENDPOINT_RECENT = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${API_KEY}&steamid=${MY_STEAM_ID}&format=json`

  try {
    const response = await fetch(ENDPOINT_RECENT)
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    return {
      statusCode: 200,
      body: JSON.stringify((await response.json()).response.games)
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
