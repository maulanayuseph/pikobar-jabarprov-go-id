export const state = () => ({
  items: null
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
    const { data } = await this.$dashboardPikobarPtPosApi.get('isolasi/harian_kemenkes_v2')
    commit('setItems', data.data)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  }
}
