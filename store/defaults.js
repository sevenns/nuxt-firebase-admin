export const state = () => ({
  appearance: null
})

export const mutations = {
  SET_APPEARANCE (state, data) {
    state.appearance = data
  }
}

export const getters = {
  GET_APPEARANCE (state) {
    return state.appearance
  }
}
