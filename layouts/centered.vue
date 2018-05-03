<template lang='pug'>

v-app(dark)
  v-content
    no-ssr
      background-particles
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          nuxt

</template>

<script>

import BackgroundParticles from '~/components/BackgroundParticles'
import '~/assets/icons/dist'

export default {
  components: { 'background-particles': BackgroundParticles }
}

</script>
