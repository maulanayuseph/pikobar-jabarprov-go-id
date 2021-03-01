export const state = () => ({
  items: null,
  isLoading: true,
  metadata: {}
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setIsLoading (state, item) {
    state.isLoading = item
  },
  setMetadata (state, item) {
    state.metadata = item
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    commit('setIsLoading', true)
    await this.$dashboardPikobarPtPosApi.get('isolasi/lastdata_kemenkes_v2').then((res) => {
      commit('setItems', res.data.data)
      commit('setMetadata', res.data.metadata)
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
  },
  metadata (state) {
    return state.metadata
  }
}
