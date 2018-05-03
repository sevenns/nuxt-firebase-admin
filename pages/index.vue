<template lang='pug'>

div
  v-card.elevation-6
    v-card-title
      v-layout(justify-center)
        .display-1.orange--text Administration tools
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
          required, color='orange'
        )
        v-text-field(
          label='Password', hint='At least 6 characters',
          v-model='password', min='6', maxlength='20',
          :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
          :append-icon-cb='() => (passwordHidden = !passwordHidden)',
          :type="passwordHidden ? 'password' : 'text'",
          counter='20', prepend-icon='lock',
          required, :rules='rules.password',
          color='orange'
        )

    v-card-title
      v-spacer
      v-btn(
        outline,
        color='orange',
        :loading='isLoading',
        @click='signin',
        :disabled='!valid'
      )
        | Signin
        v-icon(right) check_circle
      v-spacer
  
  v-snackbar(
    v-model='snackbar.state',
    top,
    multi-line
  )
    span {{ snackbar.message }}
    v-btn(flat, fab, @click.native='snackbar.state = false')
      v-icon close

</template>

<script>

export default {
  layout: 'centered',

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
