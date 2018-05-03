<template lang='pug'>

v-app(v-if='user', :light='getTheme("light")', :dark='getTheme("dark")')
  navigation(
    :showed='user.appearance.navigation',
    :dark='getTheme("dark")',
    :color='user.appearance.color'
  )
  v-content
    .inner-content
      nuxt

</template>

<script>

import Navigation from '~/components/Navigation'
import { mapGetters } from 'vuex'
import '~/assets/icons/dist'

export default {
  components: {
    'navigation': Navigation
  },

  computed: mapGetters({ user: 'user/GET' }),

  methods: {
    getTheme (theme) {
      return theme === this.user.appearance.theme.toLowerCase()
    }
  }
}

</script>

<style lang='sass'>

@import '~@/assets/sass/variables'
@import '~@/assets/sass/mixins'


.inner-content
  max-width: 1440px
  padding: 0 12px
  padding-left: 52px
  
  @include respond($sm)
    padding: 0 144px

</style>
