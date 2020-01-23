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

  async function getScreenshotImages(screenshotDetailPages) {
    const mockData = [
      {
        fileId: 1957897542,
        imgThumbnail:
          'https://steamuserimages-a.akamaihd.net/ugc/772863713197024590/7D661D873ABA3F61CE0B24AFAB443CB348D1C525/?imw=512&impolicy=Letterbox',
        imgFullsize:
          'https://steamuserimages-a.akamaihd.net/ugc/772863713197024590/7D661D873ABA3F61CE0B24AFAB443CB348D1C525/'
      },
      {
        fileId: 1974776873,
        imgThumbnail:
          'https://steamuserimages-a.akamaihd.net/ugc/770613521987762482/AE907682F4B9DC046FE70DDDC77212FE5C0A0577/?imw=512&impolicy=Letterbox',
        imgFullsize:
          'https://steamuserimages-a.akamaihd.net/ugc/770613521987762482/AE907682F4B9DC046FE70DDDC77212FE5C0A0577/'
      }
    ]

    async function getImageData(url) {
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

    return await Promise.all(screenshotDetailPages.map(getImageData))
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
    const screenshotImages = await getScreenshotImages(screenshotDetailPages)
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
