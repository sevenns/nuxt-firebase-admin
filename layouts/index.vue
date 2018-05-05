<template lang='pug'>

v-app(:light='getTheme("light")', :dark='getTheme("dark")')
  v-content
    no-ssr
      background-particles(:color='getParticlesColor()')
    v-container(fluid, fill-height)
      v-layout(align-center, justify-center)
        v-flex(xs12, sm8, md4)
          nuxt

</template>

<script>

import BackgroundParticles from '~/components/BackgroundParticles'
import { mapGetters } from 'vuex'
import '~/assets/icons/dist'

export default {
  components: { 'background-particles': BackgroundParticles },

  computed: mapGetters({
    user: 'user/GET',
    appearance: 'defaults/GET_APPEARANCE'
  }),

  methods: {
    getTheme (theme) {
      const cookiesTheme = this.$cookies.get('theme')

      if (this.user) {
        return theme === this.user.appearance.theme.toLowerCase()
      } else if (cookiesTheme) {
        return theme === cookiesTheme.toLowerCase()
      } else {
        return theme === this.appearance.theme.toLowerCase()
      }
    },

    getParticlesColor () {
      return this.getTheme('dark') ? '#222222' : '#dadada'
    }
  }
}

</script>
