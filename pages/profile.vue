<template lang='pug'>

div(v-if='user')
  page-title(:color='getTextColor') Profile

  v-container.pl-0.pr-0(grid-list-xl)
    v-layout(row, wrap)
      v-flex(xs12, md6)
        v-card
          v-card-title
            v-icon.mr-3 invert_colors
            .headline
              | Appearance
          v-card-text.text-xs-center
            v-select(
              :items='customize.themes',
              v-model='user.appearance.theme',
              label='Theme', single-line,
              :color='user.appearance.color',
              @change='changeTheme(user.appearance.theme)'
            )

            v-select(
              :items='user.appearance.theme === "Light" ? customize.colors.light : customize.colors.dark',
              v-model='user.appearance.color',
              label='Accent color', single-line,
              :color='user.appearance.color',
            )

            v-btn(
              outline,
              :color='user.appearance.color',
              @click='saveTheme',
              :loading='customize.isChanging'
            )
              span Save

      v-flex(xs12, md6)
        v-card
          v-card-title
            v-icon.mr-3 lock
            .headline
              | Password
          v-card-text
            v-form.text-xs-center(v-model='password.valid', ref='password')
              v-text-field(
                label='New password',
                v-model='password.new',
                :rules='password.rules',
                hint='At least 6 characters',
                :counter='18',
                maxlength='18',
                :color='user.appearance.color',
                required,
                :append-icon="password.watchNew ? 'visibility' : 'visibility_off'",
                :append-icon-cb='() => (password.watchNew = !password.watchNew)',
                :type="password.watchNew ? 'password' : 'text'",
                )
              v-text-field(
                label='Repeat',
                v-model='password.repeat',
                :rules='password.rules',
                hint='At least 6 characters',
                :counter='20',
                maxlength='20',
                :color='user.appearance.color',
                required,
                :append-icon="password.watchRepeat ? 'visibility' : 'visibility_off'",
                :append-icon-cb='() => (password.watchRepeat = !password.watchRepeat)',
                :type="password.watchRepeat ? 'password' : 'text'",
              )

              v-btn(
                outline,
                :color='user.appearance.color',
                @click='savePassword',
                :loading='password.isChanging',
                :disabled='!password.valid || password.new !== password.repeat'
              )
                span Save
  
  v-snackbar(
    v-model='snackbar.state',
    top, :color='isLight ? user.appearance.color : ""',
    multi-line
  )
    span {{ snackbar.message }}
    v-btn(flat, fab, @click.native='snackbar.state = false')
      v-icon close

</template>

<script>

import { mapGetters } from 'vuex'
import PageTitle from '~/components/PageTitle'

export default {
  components: {
    'page-title': PageTitle
  },

  data () {
    return {
      snackbar: {
        state: false,
        message: ''
      },

      customize: {
        isChanging: false,
        themes: ['Light', 'Dark'],
        colors: {
          light: [
            'blue darken-4',
            'indigo',
            'light-blue darken-3',
            'teal',
            'light-green darken-3',
            'brown',
            'blue-grey'
          ],

          dark: [
          'orange',
          'light-blue darken-3',
          'teal',
          'light-green darken-3',
          'blue-grey'
        ]
        }
      },

      password: {
        valid: true,
        new: '',
        repeat: '',
        watchNew: true,
        watchRepeat: true,
        rules: [
          (v) => !!v || 'Password is required',
          (v) => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ],
        isChanging: false
      }
    }
  },

  computed: {
    ...mapGetters({ user: 'user/GET' }),

    getTextColor () {
      const first = this.user.appearance.color.split(' ')[0]
      const second = this.user.appearance.color.split(' ')[1]

      return second ? `${first}--text text--${second}` : `${first}--text`
    },

    isLight () {
      return this.user.appearance.theme === 'Light'
    }
  },

  methods: {
    changeTheme (theme) {
      theme = theme.toLowerCase()

      if (theme === 'light') {
        if (!this.customize.colors.dark.includes(this.user.appearance.color)) {
          this.user.appearance.color = 'orange'
        }
      } else {
        if (!this.customize.colors.light.includes(this.user.appearance.color)) {
          this.user.appearance.color = 'blue darken-4'
        }
      }
    },

    async saveTheme () {
      let response = null
      const dispatch = this.$store.dispatch

      this.customize.isChanging = true
      response = await dispatch('user/changeTheme')

      this.snackbar.message = response.message
      this.snackbar.state = true
      this.customize.isChanging = false
    },

    async savePassword () {
      if (this.$refs.password.validate()) {
        const dispatch = this.$store.dispatch

        this.password.isChanging = true
        const response = await dispatch('user/changePassword', this.password.new)

        this.snackbar.message = response.message
        this.snackbar.state = true

        if (response.status) {
          this.password.new = ''
          this.password.repeat = ''
        }

        this.password.isChanging = false
      }
    }
  }
}

</script>
