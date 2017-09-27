const userList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_USER_LIST':
      return action.data
    default:
      return state
  }
}

export default userList
