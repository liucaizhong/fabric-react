const clientApplyList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CLIENTAPPLY_LIST':
      return action.data
    case 'UPDATE_CLIENTAPPLY_LIST': {
      const newState = [].concat(state)
      const { cid, pid } = action.data
      const newObj = newState.find((obj) => {
        return obj.cid === cid && obj.pid === pid
      })
      if (newObj) {
        Object.assign(newObj, {
          ...action.data,
        })
      } else {
        newState.push({
          ...action.data,
        })
      }
      return newState
    }
    case 'DELETE_CLIENTAPPLY_LIST': {
      const newState = [].concat(state)
      const { cid, pid } = action.data
      const idx = newState.findIndex((obj) => {
        return obj.cid === cid && obj.pid === pid
      })
      newState.splice(idx, 1)
      return newState
    }
    case 'RESET_CLIENTAPPLY_LIST': {
      const newState = action.data
      return newState
    }
    default:
      return state
  }
}

export default clientApplyList
