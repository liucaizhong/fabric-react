const meetingList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MEETING_LIST':
      return action.data
    default:
      return state
  }
}

export default meetingList
