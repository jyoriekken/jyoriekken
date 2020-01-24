<template lang="pug">
  .smol_scroll_woosh
</template>

<script>
/**
 * TODO
 * * Structure w/ Vue data
 * * Cleanup event handlers w/ removeEventListener on destroy
 * * Consider non-planck implementation for lighter weight
 * * Use fetch vs. XHR
 * * Allow swapping of scroll sound through props
 * * Allow tuning of speed, volume, decay, etc. through props
 * *
 */

export default {
  data() {
    return {}
  },
  async mounted() {
    this.initPlanck()

    // use XHR to load an audio track, and
    // decodeAudioData to decode it and stick it in a buffer.
    // Then we put the buffer into the source

    function getData() {
      let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      let sfxSource = audioCtx.createBufferSource()
      let gainNode = audioCtx.createGain()
      gainNode.gain.value = 0

      let request = new XMLHttpRequest()
      request.open('GET', '/sound/scroll-drone.wav', true)
      request.responseType = 'arraybuffer'

      request.onload = function() {
        let audioData = request.response

        audioCtx.decodeAudioData(
          audioData,
          function(buffer) {
            sfxSource.buffer = buffer
            sfxSource.playbackRate.value = 0.4
            sfxSource.loop = true
            sfxSource.connect(gainNode)
            gainNode.connect(audioCtx.destination)

            window.audioCtx = audioCtx
            window.sfxSource = sfxSource
            window.gainNode = gainNode
          },

          function(e) {
            'Error with decoding audio data' + e.error
          }
        )

        sfxSource.start(0)
      }

      request.send()
    }

    getData()
  },
  methods: {
    initPlanck() {
      const pl = require('planck-js/dist/planck.commonjs').planck
      const world = new pl.World()

      let circle = world.createDynamicBody({
        linearDamping: 7,
        fixedRotation: true
      })
      let fixture = circle.createFixture(pl.Circle(2.0), {
        density: 1,
        friction: 1
      })

      function loop() {
        if (!window.gainNode || !window.sfxSource || !window.audioCtx) {
          window.requestAnimationFrame(loop)
          return
        }

        world.step(1 / 60)

        const velY = roundNumber(Math.abs(circle.getLinearVelocity().y), 2)
        const gainValue = scale(velY, [0, 100], [0, 0.3])
        const playbackRate = scale(velY, [0, 100], [0.2, 2.5])

        window.gainNode.gain.value = lerp(
          window.gainNode.gain.value,
          gainValue,
          0.1
        )
        window.sfxSource.playbackRate.value = lerp(
          window.sfxSource.playbackRate.value,
          playbackRate,
          0.1
        )

        // request a new frame
        window.requestAnimationFrame(loop)
      }
      loop()

      window.prevScrollY = window.scrollY
      document.addEventListener('scroll', function(event) {
        if (window.audioCtx) {
          window.audioCtx.resume()
        }
        const delta = Math.abs(window.scrollY - window.prevScrollY)
        const impulse = delta * 200
        window.prevScrollY = window.scrollY
        circle.applyForceToCenter(pl.Vec2(0, impulse), true)
      })

      function lerp(a, b, n) {
        return (1 - n) * a + n * b
      }

      function scale(inputY, yRange, xRange) {
        const [xMin, xMax] = xRange
        const [yMin, yMax] = yRange

        const percent = (inputY - yMin) / (yMax - yMin)
        const outputX = percent * (xMax - xMin) + xMin

        return outputX
      }

      function roundNumber(num, scale) {
        if (!('' + num).includes('e')) {
          return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
        } else {
          var arr = ('' + num).split('e')
          var sig = ''
          if (+arr[1] + scale > 0) {
            sig = '+'
          }
          return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
          )
        }
      }
    }
  }
}
</script>

<style lang="scss"></style>
