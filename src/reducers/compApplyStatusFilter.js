const compApplyStatusFilter = (state = [
  true,
  true,
  true,
  true,
], action) => {
  switch (action.type) {
    case 'SET_COMPAPPLY_STATUS_FILTER': {
      const newState = [...state]
      const { index, value } = action.filter

      // if (typeof newState[index] !== 'boolean') {
      //   newState[index].mine = value
      // } else {
      newState[index] = value
      // }

      return newState
    }
    default:
      return state
  }
}

export default compApplyStatusFilter
