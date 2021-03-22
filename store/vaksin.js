import vaksin from '~/api/vaksin'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    commit('setItems', vaksin)
  }
}
