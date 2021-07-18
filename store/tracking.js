import { getTrackingResult } from '../api/tracking'

// export const state = () => ({
//   items: [],
//   isItemsLoading: true,
//   infoItems: [],
//   isInfoItemsLoading: true
// })

// export const mutations = {
//   setItems (state, items) {
//     state.items = items
//   },
//   setItemsLoading (state, isItemsLoading) {
//     state.isItemsLoading = isItemsLoading
//   },
//   setInfoItems (state, infoItems) {
//     state.infoItems = infoItems
//   },
//   setInfoItemsLoading (state, isInfoItemsLoading) {
//     state.isInfoItemsLoading = isInfoItemsLoading
//   }
// }

export const actions = {
  async getTracking () {
    const items = await getTrackingResult()
    return items
  }
}
