import axios from 'axios'

export const state = () => ({
  items: null,
  isLoading: true
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setIsLoading (state, item) {
    state.isLoading = item
  }
}

export const actions = {
  async getItems ({ commit }, params, options) {
    commit('setIsLoading', true)
    const { data } = await axios.get('http://coredata.digitalservice.id/master/wilayah_merge_kemendagri_2017_bps_2018_kecamatan', {
      params
    })
    commit('setItems', data.data)
    commit('setIsLoading', false)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  },
  isLoading (state) {
    return state.isLoading
  }
}
