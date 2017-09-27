const compApplyFilter = (state = '', action) => {
  switch (action.type) {
    case 'SET_COMP_APPLY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default compApplyFilter
