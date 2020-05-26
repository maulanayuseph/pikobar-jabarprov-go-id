export const state = () => ({
  selectedLogistics: []
})

export const mutations = {
  SET_SELECTED_LOGISTICS (state, logistics) {
    state.selectedLogistics = logistics
  },
  ADD_SELECTED_LOGISTIC (state, logistic) {
    state.selectedLogistics.push(logistic)
  },
  REMOVE_SELECTED_LOGISTIC (state, logistic) {
    const rowIndex = state.selectedLogistics.indexOf(logistic)
    if (rowIndex > -1) {
      state.selectedLogistics.splice(rowIndex, 1)
    }
  },
  UPDATE_QUANTITY_SELECTED_LOGISTIC (state, params) {
    console.log(params)
    state.selectedLogistics.map((result) => {
      if (result.id === params.logistic.id) {
        result.quantity = parseInt(params.quantity)
      }
    })
  }
}

export const actions = {}
