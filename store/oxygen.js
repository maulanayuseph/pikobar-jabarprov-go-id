import { get, getInfo } from '../api/oxygen'

export const state = () => ({
  items: [],
  infoItems: []
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setInfoItems (state, infoItems) {
    state.infoItems = infoItems
  }
}

export const actions = {
  async getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      await get().then((items) => {
        commit('setItems', items)
      })
    }
    return state.items
  },
  async getInfoItems ({ state, commit }) {
    const { infoItems } = state
    if (!infoItems || !infoItems.length) {
      await getInfo().then((items) => {
        commit('setInfoItems', items)
      })
    }
    return state.infoItems
  }
}
