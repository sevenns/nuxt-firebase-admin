<template lang='pug'>

div
  v-navigation-drawer.pb-0(
    :class='dark ? "" : color',
    fixed,
    mini-variant,
    app,
    v-model='state',
    :floating='true',
    mini-variant-width='80',
    disable-route-watcher,
    mobile-break-point='768'
  )
    v-layout.navigation-content(column, fill-height, justify-space-between)
      v-list(two-line)
        v-tooltip(
          right,
          open-on-hover,
          open-delay='0',
          close-delay='0'
        )
          v-list-tile(
            nuxt,
            to='/data',
            ripple,
            slot='activator',
            active-class='grey--text text--darken-4'
            exact
          )
            v-list-tile-action.pa-0
              v-icon(color='white') mdi-database
          span Manage data
      
      v-list(two-line)
        v-tooltip(
          right,
          open-on-hover,
          open-delay='0',
          close-delay='0'
        )
          v-list-tile(
            nuxt,
            to='/profile',
            ripple,
            slot='activator',
            active-class='grey--text text--darken-4'
            exact
          )
            v-list-tile-action
              v-icon(color='white') mdi-account
          span Profile
        v-tooltip(
          right,
          open-on-hover,
          color='red accent-2',
          open-delay='0',
          close-delay='0'
        )
          v-list-tile(
            @click='signout',
            ripple,
            color='red accent-2',
            slot='activator',
          )
            v-list-tile-action
              v-icon(color='red accent-2') mdi-logout
          span Logout

  v-toolbar.navigation-toolbar(color='transparent', fixed, flat, app)
    v-toolbar-side-icon(:color='color', flat, @click='changeNavigationState')
      v-icon(x-large, :color='dark ? "" : color', :style='getArrowState') chevron_left

</template>

<script>

import axios from '~/plugins/axios'

export default {
  props: {
    showed: {
      type: Boolean,
      default: false
    },

    color: {
      type: String,
      default: 'blue darken-4'
    },

    dark: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      state: this.showed
    }
  },

  computed: {
    getArrowState () {
      return {
        'transition': 'transform .4s ease',
        'transform': this.state ? 'rotate(0deg)' : 'rotate(-180deg)'
      }
    }
  },

  methods: {
    async signout () {
      await this.$store.dispatch('user/signout', {
        router: this.$router
      })
    },

    async changeNavigationState () {
      this.state = !this.state
      await axios.post('/api/user/change_navigation_state', { state: this.state })
    }
  }
}
</script>

<style lang='sass'>

@import '~@/assets/sass/mixins'


.navigation-toolbar
  max-width: 100%
  margin-top: 52px !important
  
  @include respond($sm)
    max-width: 144px

  @include respond(960)
    margin-top: 57px !important

  .toolbar__content
    @include respond($sm)
      justify-content: center
  
  .toolbar__side-icon
    margin: 0 !important
    margin-left: 12px !important

.navigation-content
  padding: 34px 0

  @include respond(960)
    padding: 45px 0

</style>
