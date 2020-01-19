<template lang="pug">
  div
    header.container
      h1 smol #[div gumball]
    main.container
      ul.links
        li
          | 👩‍💻&nbsp;
          a(href='https://github.com/smolgumball' target='_blank' rel='noreferrer') https://github.com/smolgumball
          ul
            li
              | 🎥 #[a(href='https://github.com/smolgumball/node-twitch-vod-export') twitch VOD exporter]
            li
              | 🌐 #[a(href='https://github.com/smolgumball/webby-site') this website]
            li
              | 💥 #[a(href='https://github.com/smolgumball/emoji-exploder') emoji exploder]
        li
          | 📺&nbsp;
          a(href='https://www.twitch.tv/smolgumball' target='_blank' rel='noreferrer') https://www.twitch.tv/smolgumball
        li
          | 🐤&nbsp;
          a(href='https://twitter.com/smol_gumball' target='_blank' rel='noreferrer') https://twitter.com/smol_gumball
        li
          | 🎮&nbsp;
          a(href='https://steamcommunity.com/id/smolgumball' target='_blank' rel='noreferrer') https://steamcommunity.com/id/smolgumball

      // Steam gamz
      recent-steam

    footer
      span 💙#[br]smol#[br]gumball

</template>

<script>
import RecentSteam from '~/components/recent-steam'

export default {
  components: {
    RecentSteam
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 54px;
  text-align: left;
  color: #86b3d7;
  font-weight: 700;
  text-transform: uppercase;

  /* prettier-ignore */
  text-shadow: 1px 1px 1px brown,
               2px 2px 1px black,
               3px 3px 1px brown,
               4px 4px 1px black,
               5px 5px 1px brown,
               7px 7px 1px black,
               9px 9px 1px brown,
               11px 11px 1px black;

  div {
    color: white;
    margin-top: -10px;
    padding: 10px;
    letter-spacing: 0.3em;
    background-color: violet;
  }
}

.links {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1.5em 2.5em;
  margin-top: 8vh;
}

footer {
  width: 105px;
  height: 105px;
  text-align: center;
  margin: 8vh auto;
  padding: 2em;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);

  span {
    position: relative;
    top: 20px;
  }
}
</style>
