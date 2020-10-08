import axios from 'axios'

export const state = () => ({
  items: null,
  isLoading: true
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setIsLoading (state, item) {
    state.isLoading = item
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    commit('setIsLoading', true)
    const { data } = await axios.get('https://pikobar-api-static.digitalservice.id/v2/covid-cases-new', {
      headers: {
      }
    })
    commit('setItems', data)
    commit('setIsLoading', false)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  },
  isLoading (state) {
    return state.isLoading
  }
}
