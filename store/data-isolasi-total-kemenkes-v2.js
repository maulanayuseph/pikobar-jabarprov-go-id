export const state = () => ({
  items: null,
  isLoading: false
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
    const { data } = await this.$dashboardPikobarPtPosApi.get('isolasi/total_kemenkes_v2')
    commit('setItems', data.data)
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
