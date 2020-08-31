// import axios from 'axios'

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
    const { data } = await this.$dashboardPikobarApi.get('v2/kasus/nasional')
    commit('setItems', data.data.update.harian)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  }
}
