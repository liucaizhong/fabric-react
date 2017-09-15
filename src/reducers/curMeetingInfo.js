const curMeetingInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUR_MEETING_INFO':
      return action.info
    case 'UPDATE_CUR_MEETING_INFO':
      return Object.assign({}, state, action.info)
    case 'RESET_CUR_MEETING_INFO':
      return Object.assign({}, action.info)
    default:
      return state
  }
}

export default curMeetingInfo
