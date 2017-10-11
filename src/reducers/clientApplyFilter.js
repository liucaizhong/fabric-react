const clientApplyFilter = (state = '', action) => {
  switch (action.type) {
    case 'SET_CLIENT_APPLY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default clientApplyFilter
