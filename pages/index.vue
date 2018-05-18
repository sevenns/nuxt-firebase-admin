<template lang='pug'>

div
  v-card.elevation-6
    v-card-title
      v-layout(justify-center)
        .display-1(:class='getTextColor') Administration tools
    v-card-text
      v-form(
        v-model='valid',
        ref='form',
        lazy-validation,
        @keyup.native.enter='signin'
      )
        v-text-field(
          prepend-icon='mail', label='E-mail',
          v-model='email', :rules='rules.email',
          required, :color='getColor'
        )
        v-text-field(
          label='Password', hint='At least 6 characters',
          v-model='password', min='6', maxlength='20',
          :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
          :append-icon-cb='() => (passwordHidden = !passwordHidden)',
          :type="passwordHidden ? 'password' : 'text'",
          counter='20', prepend-icon='lock',
          required, :rules='rules.password',
          :color='getColor'
        )

    v-card-title
      v-spacer
      v-btn(
        outline,
        :color='getColor',
        :loading='isLoading',
        @click='signin',
        :disabled='!valid'
      )
        | Signin
        v-icon(right) check_circle
      v-spacer
  
  v-snackbar(
    v-model='snackbar.state',
    top, :color='getSnackbarColor',
    multi-line
  )
    span {{ snackbar.message }}
    v-btn(flat, fab, @click.native='snackbar.state = false')
      v-icon close

</template>

<script>

import axios from '~/plugins/axios'
import { mapGetters } from 'vuex'

export default {
  layout: 'index',

  async fetch ({ store }) {
    const url = '/api/settings/get/defaults/appearance'
    const response = await axios.get(url)

    if (response.data) {
      store.commit('defaults/SET_APPEARANCE', response.data)
    }
  },

  data () {
    return {
      snackbar: {
        state: false,
        message: ''
      },

      email: '',
      password: '',

      isLoading: false,
      valid: true,
      passwordHidden: true,
      rules: {
        email: [
          (v) => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: [
          (v) => !!v || 'Password is required',
          (v) => (v && v.length >= 6) || 'Password must be at least 6 characters'
        ]
      }
    }
  },

  computed: {
    ...mapGetters({ appearance: 'defaults/GET_APPEARANCE' }),

    getColor () {
      const cookiesColor = this.$cookies.get('color')

      return !cookiesColor ? this.appearance.color : cookiesColor
    },

    getTextColor () {
      const cookiesColor = this.$cookies.get('color')

      if (cookiesColor) {
        const first = cookiesColor.split(' ')[0]
        const second = cookiesColor.split(' ')[1]

        return second ? `${first}--text text--${second}` : `${first}--text`
      } else {
        return `${this.appearance.color}--text`
      }
    },

    getSnackbarColor () {
      const cookiesTheme = this.$cookies.get('theme')
      const cookiesColor = this.$cookies.get('color')

      return cookiesTheme ? cookiesColor : this.appearance.color
    }
  },

  methods: {
    async signin () {
      if (this.$refs.form.validate()) {
        const dispatch = this.$store.dispatch
        let response = null
        const data = {
          email: this.email,
          password: this.password
        }

        this.isLoading = true
        response = await dispatch('user/signin', data)
        this.isLoading = false

        if (response.status) {
          this.$router.push('/profile')
        } else {
          this.snackbar.message = response.message
          this.snackbar.state = true
        }
      }
    }
  }
}

</script>
