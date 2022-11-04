<template lang="pug">
  div
    // Woosh
    smol-scroll-woosh

    header.container
      h1 smol #[div gumball]
    main.container
      ul.links
        li
          | 👩‍💻&nbsp;
          a(href='https://github.com/smolgumball' target='_blank' rel='noreferrer')
            | github
          ul
            li
              | 💻 #[a(href='https://github.com/smolgumball/bb-vue') bb-vue - use Vue to enhance BitBurner]
            li
              | 🎥 #[a(href='https://github.com/smolgumball/node-twitch-vod-export') twitch VOD exporter]
            li
              | 🌐 #[a(href='https://github.com/smolgumball/webby-site') this website]
            li
              | 💥 #[a(href='https://github.com/smolgumball/emoji-exploder') emoji exploder]
        li
          | 🎮&nbsp;
          a(href='https://steamcommunity.com/id/smolgumball' target='_blank' rel='noreferrer')
            | steam

      // Steam gamz
      smol-steam-recent

      // Steam screenshots
      smol-steam-screenshots

    footer
      span 💙#[br]smol#[br]gumball

</template>

<script>
import SmolSteamRecent from '~/components/smol-steam-recent'
import SmolSteamScreenshots from '~/components/smol-steam-screenshots'
import SmolScrollWoosh from '~/components/smol-scroll-woosh'

export default {
  components: {
    SmolSteamRecent,
    SmolSteamScreenshots,
    SmolScrollWoosh
  }
}
</script>

<style lang="scss">
.links {
  background-color: #ffb4da;
  background-image: url('/hexasm.jpg');
  background-size: 830px;
  background-position: top left;
  background-blend-mode: luminosity;
  padding: 1.5em 2.5em;
  margin-top: 6vh;
  font-size: 14px;

  @media (min-width: 540px) {
    font-size: 16px;
  }
}
</style>
