import axios from 'axios'

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
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    const { data } = await axios.get('http://dashboard-pikobar-api.digitalservice.id/sebaran/polygon', {
      headers: {
        'api-key': '480d0aeb78bd0064d45ef6b2254be9b3'
      }
    })
    commit('setItems', data.data)
  },

  async getItem ({ commit }, query, options) {
    commit('setIsLoading', true)
    const { data } = await axios.get('http://dashboard-pikobar-api.digitalservice.id/sebaran/polygon?' + query, {
      headers: {
        'api-key': '480d0aeb78bd0064d45ef6b2254be9b3'
      }
    })
    commit('setItem', data.data)
    commit('setIsLoading', false)
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
  }
}
