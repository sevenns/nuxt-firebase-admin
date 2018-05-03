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
    const response = await axios.post('/api/user/change_theme', {
      theme: state.data.appearance.theme,
      color: state.data.appearance.color
    })

    return response.data
  }
}
