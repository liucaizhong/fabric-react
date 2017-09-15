const meetingContentFilter = (state = '', action) => {
  switch (action.type) {
    case 'SET_MEETING_CONTENT_FILTER':
      return action.filter
    default:
      return state
  }
}

export default meetingContentFilter
