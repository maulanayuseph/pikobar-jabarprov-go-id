import axios from 'axios'

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    const { data } = await axios.get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=prov')
    commit('setItems', data.data.content)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  }
}
