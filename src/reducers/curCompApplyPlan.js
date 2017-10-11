const curCompApplyPlan = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUR_COMP_APPLY_PLAN':
      return Object.assign({}, action.data)
    case 'UPDATE_CUR_COMP_APPLY_PLAN': {
      const { data } = action
      const { date, start, end } = data
      const newState = Object.assign({}, state)
      newState[data.date] = newState[data.date] || []
      const idx = newState[date].findIndex((obj) => {
        return obj.start === start && obj.end === end
      })
      if (idx !== -1) {
        Object.assign(newState[date][idx], data)
      } else {
        newState[data.date].push(data)
      }
      return newState
    }
    case 'DELETE_CUR_COMP_APPLY_PLAN': {
      const { date, start, end } = action.data
      const newState = Object.assign({}, state)
      const idx = newState[date].findIndex((obj) => {
        return obj.start === start && obj.end === end
      })
      if (idx !== -1) {
        newState[date].splice(idx, 1)
      }
      return newState
    }
    case 'RESET_CUR_COMP_APPLY_PLAN':
      return Object.assign({}, action.data)
    case 'UPDATE_CUR_COMP_APPLY_PLAN_APPLICATION': {
      const { axis, data } = action
      const newState = Object.assign({}, state)
      const findObj = newState[axis.date] && newState[axis.date].find((cur) => {
        return cur.start === axis.start && cur.end === axis.end
      })
      if (findObj) {
        findObj.application = Object.assign({}, data)
      }

      return newState
    }
    default:
      return state
  }
}

export default curCompApplyPlan
