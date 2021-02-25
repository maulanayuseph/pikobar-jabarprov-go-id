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
    await this.$dashboardPikobarPtPosApi.get('isolasi/total_kemenkes_v2').then((res) => {
      commit('setItems', res.data.data)
      commit('setIsLoading', false)
    }).catch((err) => {
      commit('setIsLoading', false)
      console.log(err)
    })
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
