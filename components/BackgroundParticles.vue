<template lang='pug'>

.background-particles
  vue-particles(
    :color='color',
    :linesColor='color',
    :particlesNumber='50',
    clickMode='repulse'
  )

</template>

<script>

export default {
  props: {
    color: {
      type: String,
      default: '#222'
    }
  }
}

</script>

<style lang='sass' scoped>

.background-particles
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

  & > div
    height: 100%

</style>

