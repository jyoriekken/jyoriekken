import fetch from 'node-fetch'
import cheerio from 'cheerio'

export async function handler(event, context) {
  const SCREENSHOTS_PAGE = `https://steamcommunity.com/id/smolgumball/screenshots`

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  function addCorsHeaders(returnObject) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept'
    }

    returnObject.headers = { ...returnObject.headers, ...corsHeaders }
    return returnObject
  }

  function getFileDetailUrls(screenshotsPageSource) {
    const $pageDom = cheerio.load(screenshotsPageSource)
    const screenshotDetailPages = $pageDom(
      `.imageWallRow a[href*='filedetails/?id=']`
    )
      .map((i, el) => $pageDom(el).attr('href'))
      .toArray()
    screenshotDetailPages.sort(() => 0.5 - Math.random())
    return screenshotDetailPages.slice(0, 6)
  }

  async function getScreenshotUrls(url) {
    let fileId = url.match(/\?id=(\d+)/)
    if (!fileId[1]) return

    // Good fileId value
    fileId = fileId[1]
    const detailPage = await fetch(url)
    const detailPageSource = await detailPage.text()
    const $pageDom = cheerio.load(detailPageSource)
    const fullsizeImageUrl = $pageDom('.actualmediactn a').attr('href')

    return {
      fileId,
      imgThumbnail: `${fullsizeImageUrl}?imw=512&impolicy=Letterbox`,
      imgFullsize: `${fullsizeImageUrl}`
    }
  }

  try {
    const response = await fetch(SCREENSHOTS_PAGE)
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return addCorsHeaders({
        statusCode: response.status,
        body: response.statusText
      })
    }
    const screenshotPageSource = await response.text()
    const screenshotDetailPages = getFileDetailUrls(screenshotPageSource)
    const screenshotImages = await Promise.all(
      screenshotDetailPages.map(getScreenshotUrls)
    )
    return addCorsHeaders({
      statusCode: response.status,
      body: JSON.stringify(screenshotImages)
    })
  } catch (err) {
    console.log(err) // output to netlify function log
    return addCorsHeaders({
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    })
  }
}
