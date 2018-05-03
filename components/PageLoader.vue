<template lang='pug'>

.page-loader__wrapper
  transition(name='page-loader')
    .page-loader(v-if='loading', :style='generateLoaderColor(user)')
      .page-loader__circle(:class='generateCircleColor(user)')

</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },

  computed: mapGetters({ user: 'user/GET' }),

  methods: {
    start () { this.loading = true },

    finish () {
      setTimeout(() => { this.loading = false }, 500)
    },

    generateLoaderColor (user) {
      let theme = 'dark'

      if (user) {
        theme = user.appearance.theme.toLowerCase()
      }

      return {
          'background-color': theme === 'light' ? '#fafafa' : '#303030'
        }
    },

    generateCircleColor (user) {
      let color = 'orange'

      if (user) {
        color = user.appearance.color
      }
      return color
    }
  }
}
</script>

<style lang='sass' scoped>

.page-loader
  align-items: center
  display: flex
  height: 100%
  justify-content: center
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 99999

.page-loader__circle
  width: 40px
  height: 40px
  margin: 100px auto
  border-radius: 100%
  animation: sk-scaleout 1.0s infinite ease-in-out

  @keyframes sk-scaleout
    0%
      transform: scale(0)

    100%
      transform: scale(1)
      opacity: 0

.page-loader-leave-active
  transition: opacity .5s ease, transform .5s ease

.page-loader-enter,
.page-loader-leave-to
  opacity: 0
  transform: scale(1.2)

</style>
