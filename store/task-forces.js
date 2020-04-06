import { get } from '~/api/task-force'

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return get(options)
        .then((items) => {
          commit('setItems', items)
          return state.items
        })
    }
    return Promise.resolve(state.items)
  }
}
