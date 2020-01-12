<template lang="pug">
  nav
    nuxt-link(href="/") home
</template>

<script>
export default {}
</script>

<style lang="scss">
nav {
  background-color: rgba(255, 255, 255, 0.25);
  padding: 0 1em 1em 1em;
  margin: 5vh -1em 0 -1em;
}

nav a {
  color: inherit;
  display: inline-block;
  text-decoration: none;
  padding: 0.75em 1.65em;
}

nav a:visited {
  color: inherit;
}

nav button {
  background-color: #0078d7;
  color: white;
  border: none;
  padding: 0;
  margin-right: 1em;
  margin-top: 1em;
}

nav button:hover {
  background-color: black;
}
</style>
