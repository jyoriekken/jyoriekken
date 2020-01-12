<template lang="pug">
  div
    header.container
      h1 smol #[div gumball]
    main.container
      ul.links
        li
          | 👩‍💻&nbsp;
          a(href='https://github.com/smolgumball' target='_blank' rel='noopener') https://github.com/smolgumball
          ul
            li
              | 🎥 #[a(href='https://github.com/smolgumball/node-twitch-vod-export') twitch VOD exporter]
            li
              | 🌐 #[a(href='https://github.com/smolgumball/webby-site') this website]
            li
              | 💥 #[a(href='https://github.com/smolgumball/emoji-exploder') emoji exploder]
        li
          | 📺&nbsp;
          a(href='https://www.twitch.tv/smolgumball' target='_blank' rel='noopener') https://www.twitch.tv/smolgumball
        li
          | 🐤&nbsp;
          a(href='https://twitter.com/smol_gumball' target='_blank' rel='noopener') https://twitter.com/smol_gumball
      p(style='text-align: right')
        | 💙 gumball
    footer
      p Click on background for extra fun 🎉

</template>

<script>
export default {}
</script>

<style lang="scss">
h1 {
  font-size: 54px;
  text-align: left;
  color: #86b3d7;
  font-weight: 700;
  text-transform: uppercase;

  /* prettier-ignore */
  text-shadow: 1px 1px 0px brown,
               2px 2px 0px black,
               3px 3px 0px brown,
               4px 4px 0px black,
               5px 5px 0px brown,
               7px 7px 0px black,
               9px 9px 0px brown,
               11px 11px 0px black;

  div {
    color: white;
    margin: -10px;
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
</style>
