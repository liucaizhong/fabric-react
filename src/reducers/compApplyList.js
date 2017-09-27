const compApplyList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_COMPAPPLY_LIST':
      return action.data
    case 'UPDATE_COMAPPLY_DEADLINE': {
      // console.log('state', state)
      // console.log('action', action)
      const newState = state
      const { rowId, deadline } = action
      newState[rowId].deadline = deadline
      return newState
    }
    case 'UPDATE_A_COMAPPLY_INFO': {
      const newState = state
      const { id } = action.comp
      const data = action.data
      const row = newState.find((cur) => {
        return cur.id === id
      })
      console.log('action', action)
      if (row.plan) {
        if (row.plan[data.date]) {
          const planIdx = row.plan[data.date].findIndex((cur) => {
            return cur.start === data.start && cur.end === data.end
          })

          if (planIdx !== -1) {
            row.plan[data.date][planIdx] =
              Object.assign(row.plan[data.date][planIdx], data)
          } else {
            row.plan[data.date].push(data)
          }
        } else {
          row.plan[data.date] = [data]
        }
      } else {
        row.plan = {
          [data.date]: [data],
        }
      }
      console.log('newState', newState)
      return newState
    }
    default:
      return state
  }
}

export default compApplyList
