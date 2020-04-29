import { getCollectedDonations } from '../api/donation'

export const state = () => ({
  collectedDonations: null
})

export const mutations = {
  setCollectedDonations (state, donations) {
    state.collectedDonations = donations
  }
}

export const actions = {
  async getCollectedDonations ({ state, commit }) {
    if (!state.collectedDonations || !state.collectedDonations.length) {
      await getCollectedDonations()
        .then((donations) => {
          commit('setCollectedDonations', donations)
        })
    }
    return state.collectedDonations
  }
}
