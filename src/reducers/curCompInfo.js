const curCompInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUR_COMP_INFO':
      return action.info
    case 'UPDATE_CUR_COMP_INFO':
      return Object.assign({}, state, action.info)
    default:
      return state
  }
}

export default curCompInfo
