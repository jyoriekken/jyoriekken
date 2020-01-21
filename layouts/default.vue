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

a {
  color: blue;
}

a:visited,
a:active {
  color: blueviolet;
}

a:hover {
  color: tomato;
  text-decoration: none;
}
</style>
