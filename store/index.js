import axios from '~/plugins/axios'

export const strict = false

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    const uuid = req.session.uuid

    if (uuid) {
      const user = await axios.post('/api/user/get', { uuid })
      commit('user/SET', user.data)
    }
  }
}
