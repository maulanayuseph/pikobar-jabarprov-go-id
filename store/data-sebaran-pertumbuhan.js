
export const state = () => ({
  items: null,
  item: null,
  isLoading: false
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setItem (state, item) {
    state.item = item
  },
  setIsLoading (state, item) {
    state.isLoading = item
  },
  setMetaData (state, item) {
    state.metadata = item
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    const { data } = await this.$dashboardPikobarApi.get('sebaran/pertumbuhan')
    commit('setItems', data.data)
  },

  async getItem ({ commit }, query, options) {
    commit('setIsLoading', true)
    const { data } = await this.$dashboardPikobarApi.get('sebaran/pertumbuhan?' + query)
    commit('setItem', data.data)
    commit('setIsLoading', false)
    commit('setMetaData', data.metadata)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  },
  itemMap (state) {
    return state.item
  },
  isLoading (state) {
    return state.isLoading
  },
  metadata (state) {
    return state.metadata
  }
}
