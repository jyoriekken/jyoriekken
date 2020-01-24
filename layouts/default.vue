<template lang="pug">
  div
    nuxt
</template>

<script>
export default {
  mounted() {
    window.exploder = new EmojiExploder.default()

    setInterval(function() {
      if (!document.hasFocus()) return
      let { cursorX, cursorY } = window.exploder
      window.exploder.cursorX = Math.random() * window.innerWidth
      window.exploder.cursorY = Math.random() * window.innerHeight
      window.exploder.explodeAtCursor()
    }, 1450)
  }
}
</script>

<style lang="scss">
body {
  color: black;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 16px;
  overflow-x: hidden;

  background-color: hotpink;
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-light.png');
}

.container {
  max-width: 425px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 5vw;
}

header {
  margin-top: 7vh;

  h1 {
    font-size: 32px;
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

    @media (min-width: 540px) {
      font-size: 54px;
    }

    div {
      color: white;
      margin-top: -10px;
      padding: 10px;
      letter-spacing: 0.3em;
      background-color: rgba(255, 159, 219, 0.69);
    }
  }
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

h1 {
  margin-bottom: 0;
}

h2 {
  color: white;
  margin-top: 0;
  margin-bottom: 1em;
}

h2 a:hover {
  color: blueviolet;
  text-decoration: none;
}

ul li {
  margin-bottom: 1em;
}

ul li ul {
  margin-top: 1.5em;
  padding-left: 2em;
  line-height: 1;
}

a,
a:visited,
a:active {
  color: #ff0081;
}

a:hover {
  color: tomato;
  text-decoration: none;
}
</style>
