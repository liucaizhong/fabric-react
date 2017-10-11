const customerList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CUSTOMER_LIST':
      return action.data
    default:
      return state
  }
}

export default customerList
