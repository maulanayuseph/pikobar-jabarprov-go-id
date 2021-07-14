import { get, getInfo } from '../api/oxygen'

export const state = () => ({
  items: [],
  isItemsLoading: true,
  infoItems: [],
  isInfoItemsLoading: true
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setItemsLoading (state, isItemsLoading) {
    state.isItemsLoading = isItemsLoading
  },
  setInfoItems (state, infoItems) {
    state.infoItems = infoItems
  },
  setInfoItemsLoading (state, isInfoItemsLoading) {
    state.isInfoItemsLoading = isInfoItemsLoading
  }
}

export const actions = {
  async getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      commit('setItemsLoading', true)
      const items = await get()
      commit('setItems', items)
      commit('setItemsLoading', false)
    }
    return state.items
  },
  async getInfoItems ({ state, commit }) {
    const { infoItems } = state
    if (!infoItems || !infoItems.length) {
      commit('setInfoItemsLoading', true)
      const items = await getInfo()
      commit('setInfoItems', items)
      commit('setInfoItemsLoading', false)
    }
    return state.infoItems
  }
}
