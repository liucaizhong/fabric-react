const compList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_COMP_LIST':
      return action.data
    default:
      return state
  }
}

export default compList
