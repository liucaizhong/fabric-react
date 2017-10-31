const clientApplyStatusFilter = (state = [
  true,
  true,
  true,
  true,
  true,
  true,
], action) => {
  switch (action.type) {
    case 'SET_CLIENTAPPLY_STATUS_FILTER': {
      const newState = [].concat(state)
      const { index, value } = action.filter
      newState[index] = value
      return newState
    }
    default:
      return state
  }
}

export default clientApplyStatusFilter
