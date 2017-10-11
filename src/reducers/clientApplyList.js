const clientApplyList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CLIENTAPPLY_LIST':
      return action.data
    case 'DELETE_CLIENTAPPLY_LIST': {
      const newState = [].concat(state)
      const { cid, pid } = action.data
      const idx = newState.findIndex((obj) => {
        return obj.cid === cid && obj.pid === pid
      })
      newState.splice(idx, 1)
      return newState
    }
    default:
      return state
  }
}

export default clientApplyList
