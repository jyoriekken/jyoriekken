<template lang="pug">
  .smol_steam_screenshots
    h2.screenshots_headline
      | 📸
      div Fresh
      | Screenies
    .screenshots_wrap
      .screenshots_loading(v-if='!screenshots.length')
      .screenshots_inner(v-else)
        a.screenshot(
          v-for='shot in screenshots'
          :key='shot.fileId'
          :href='`https://steamcommunity.com/sharedfiles/filedetails/?id=${shot.fileId}`'
          target='_blank'
          rel='noreferrer'
        )
          img.screenshot_img(:src='shot.imgThumbnail')
</template>

<script>
const devPrefix =
  process.env.NODE_ENV == 'development' ? 'http://localhost:9000' : ''
const ENDPOINT_SCREENSHOTS = `${devPrefix}/.netlify/functions/get-recent-steam-screenshots`

export default {
  data() {
    return {
      screenshots: []
    }
  },
  async mounted() {
    setTimeout(async () => {
      let res = {}
      let json
      try {
        res = await fetch(ENDPOINT_SCREENSHOTS)
        json = await res.json()
        if (!json) {
          throw 'no resp'
        }
      } catch (err) {
        console.error(err)
      }
      if (!json) return
      this.screenshots = json
    }, 10)
  }
}
</script>

<style lang="scss">
.smol_steam_screenshots {
  margin-top: 6vh;
}

.screenshots_headline {
  font-size: 18px;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0;

  /* prettier-ignore */
  text-shadow: 1px 1px 1px brown,
               3px 3px 1px white,
               4px 4px 1px brown;

  @media (min-width: 540px) {
    font-size: 24px;
  }

  div {
    position: relative;
    display: inline-block;
    margin: 0 0.5em 0 0.7em;
    color: blue;
    padding: 5px 10px 5px 5px;
    background-color: #adf19a;
  }
}

.screenshots_wrap {
  margin-top: 1.5em;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1em;
}

.screenshots_inner {
  display: grid;
  grid-gap: 2ch;

  @media (min-width: 540px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

.screenshots_loading {
  height: 430px;
  background-color: rgba(255, 255, 255, 0.2);
}

.screenshot {
  text-decoration: none;
  color: inherit;
  margin-bottom: 1em;
}

.screenshot_img {
  max-width: 100%;
  display: block;
  box-shadow: 8px 12px 15px fade-out(deeppink, 0.75);
}
</style>
