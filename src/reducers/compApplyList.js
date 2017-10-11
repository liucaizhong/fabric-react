const compApplyList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_COMPAPPLY_LIST':
      return action.data
    default:
      return state
  }
}

export default compApplyList
