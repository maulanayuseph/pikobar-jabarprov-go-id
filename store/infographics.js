import { get, getById } from '~/api/infographic'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  clearItems (state) {
    state.items = []
  },
  appendItems (state, items) {
    state.items = [...state.items, ...items]
  },
  prependItems (state, items) {
    state.items = [...items, ...state.items]
  }
}

export const actions = {
  getItems ({ state, commit }, options = { perPage: 3, fresh: false }) {
    if (!state.items || !state.items.length || options.fresh) {
      return get(options)
        .then((arr) => {
          commit('setItems', arr)
          return state.items
        })
    }
    return state.items
  },
  getItemById ({ commit }, id) {
    return getById(id)
  }
}
