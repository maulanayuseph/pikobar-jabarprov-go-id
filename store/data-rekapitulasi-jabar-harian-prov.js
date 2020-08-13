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
    const { data } = await this.$covid19PublicApi.get('v1/rekapitulasi/jabar/harian?level=prov')
    commit('setItems', data.data.content)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  }
}
