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
  async signin ({ commit }, data) {
    let authStatus = await axios.post('/api/auth/signin', data)
    let user = null

    authStatus = authStatus.data.data.authStatus

    if (authStatus.status) {
      user = await axios.post('/api/user/get', { uuid: authStatus.uuid })
      commit('SET', user.data.data.user)
    }

    return authStatus
  },

  async signout ({ commit }, { router }) {
    await axios.get('/api/auth/signout')
    commit('SET', null)
    router.push('/')
  },

  async changePassword ({ commit }, password) {
    const response = await axios.post('/api/user/change_password', { password })

    return response.data.data.response
  },

  async changeTheme ({ state, commit }) {
    const response = await axios.post('/api/user/change_theme', {
      theme: state.data.appearance.theme,
      color: state.data.appearance.color
    })

    return response.data.data.response
  }
}
