import axios from '~/plugins/axios'

export const state = () => ({
  data: null
})

export const mutations = {
  SET (state, data) {
    state.data = data
  }
}

export const getters = {
  GET (state) {
    return state.data
  }
}

export const actions = {
  async signin (context, payload) {
    const response = await axios.post('/api/auth/signin', payload)
    const { uuid, status, message } = response.data

    if (status) {
      const user = await axios.post('/api/user/get', { uuid })

      context.commit('SET', user.data)
    }

    return { status, message }
  },

  async signout ({ commit }, { router }) {
    await axios.get('/api/auth/signout')
    commit('SET', null)
    router.push('/')
  },

  async changePassword ({ commit }, password) {
    const response = await axios.post('/api/user/change_password', { password })

    return response.data
  },

  async changeTheme ({ state, commit }) {
    const currentTheme = state.data.appearance.theme
    const currentColor = state.data.appearance.color

    const response = await axios.post('/api/user/change_theme', {
      theme: currentTheme,
      color: currentColor
    })

    if (response.data.status) {
      this.$cookies.set('theme', currentTheme, { maxAge: 604800 })
      this.$cookies.set('color', currentColor, { maxAge: 604800 })
    }

    return response.data
  }
}
