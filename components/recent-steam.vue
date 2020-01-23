<template lang="pug">
  .recent_games
    h2.games_headline
      | Games...
      div
        a(href='https://www.youtube.com/watch?v=DYivGrFkgIk' target='_blank' rel='noreferrer') Love games?
          img(src='/mr-gregg.jpg')
    p.join_me
      | I play a lot of vidja. Reach out and
      |
      a(href='https://steamcommunity.com/id/smolgumball' target='_blank' rel='noreferrer') friend me on Steam
      |
      | so we can play togther! Here's a realtime peek at my current favs 👀
    .games_wrap
      .games_loading(v-if='!validGames.length')
      .games_inner(v-else)
        a.game(
          v-for='game in validGames'
          :key='game.appid'
          href='https://steamcommunity.com/id/smolgumball'
          target='_blank'
          rel='noreferrer'
        )
          h3.game_name(:title='game.name') {{ game.name }}
          img.game_img(:src='imgEndpoint(game.appid, game.img_logo_url)')
          .game_playtime(v-if='+game.playtime_2weeks > 0')
            | {{ playTime(game) }}
</template>

<script>
const devPrefix =
  process.env.NODE_ENV == 'development' ? 'http://localhost:9000' : ''
const ENDPOINT_RECENT = `${devPrefix}/.netlify/functions/get-recent-steam-games`

export default {
  data() {
    return {
      games: []
    }
  },
  computed: {
    validGames() {
      if (!this.games.length) return []
      return this.games.filter(x => !!x.name)
    }
  },
  async mounted() {
    setTimeout(async () => {
      let res = {}
      let json
      try {
        res = await fetch(ENDPOINT_RECENT)
        json = await res.json()
        if (!json) {
          throw 'no resp'
        }
      } catch (err) {
        console.error(err)
      }
      this.games = json
    }, 10)
  },
  methods: {
    imgEndpoint(appId, hash) {
      // return `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${hash}.jpg`
      return `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`
    },
    playTime(game) {
      const time = game.playtime_2weeks
      const isHrs = time > 60
      if (isHrs) {
        return `${Math.round(time / 60, 1)} hrs`
      } else {
        return `${time} mins`
      }
    }
  }
}
</script>

<style lang="scss">
.recent_games {
  margin-top: 6vh;
}

.games_headline {
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
    margin-left: 1em;
    color: #ff0076;
    padding: 5px;
    background-color: rgba(255, 255, 0, 0.5);

    &:hover {
      img {
        opacity: 1;
        transform: translateY(-5px);
      }
    }
  }

  a {
    display: block;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: blue;
    }
  }

  img {
    border-radius: 50%;
    transition: all 0.4s;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    width: 125px;
    top: -100%;
    left: calc(100% + 1em);
    display: none;

    @media (min-width: 540px) {
      display: block;
    }
  }
}

.join_me {
  margin-top: 1em;
  font-size: 16px;
  color: #560930;
  line-height: 1.45;

  a {
    display: inline-block;
    color: bisque;
    text-decoration: none;
    padding: 0 0.3em;
    background-color: deeppink;
    font-size: 14px;

    &:hover {
      background-color: bisque;
      color: deeppink;
    }

    @media (min-width: 540px) {
      font-size: 16px;
    }
  }
}

.games_wrap {
  margin-top: 1.5em;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1em;
}

.games_inner {
  display: grid;
  grid-gap: 2ch;

  @media (min-width: 540px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

.games_loading {
  height: 300px;
  background-color: rgba(255, 255, 255, 0.2);
}

.game {
  text-decoration: none;
  color: inherit;
  margin-bottom: 1em;
}

.game_name {
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 0.5em 0;
  text-transform: lowercase;
  font-size: 16px;
  font-weight: 600;
  color: #ff0076;
}

.game_img {
  display: block;
  width: 100%;
  box-shadow: 8px 12px 15px fade-out(deeppink, 0.75);
}

.game_playtime {
  margin-top: 0.5em;
  display: inline-block;
  padding: 0.1em 0.5em;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 15px;

  @media (min-width: 540px) {
    float: right;
  }
}
</style>
