// import action types
import * as TYPES from './type'

// define factory function for generating action creator
function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[arg] = args[index]
    })
    return action
  }
}

// export action creators
// set meeting content filter for Home
export const setMeetingContentFilter = makeActionCreator(
  TYPES.SET_MEETING_CONTENT_FILTER,
  'filter',
)
// set login user
export const setLoginUser = makeActionCreator(TYPES.SET_LOGIN_USER, 'user')
// set meeting status filter for Home
export const setMeetingStatusFilter = makeActionCreator(
  TYPES.SET_MEETING_STATUS_FILTER,
  'filter',
)
// set current meeting info
export const setCurMeetingInfo = makeActionCreator(
  TYPES.SET_CUR_MEETING_INFO,
  'info',
)
// update current meeting info
export const updateCurMeetingInfo = makeActionCreator(
  TYPES.UPDATE_CUR_MEETING_INFO,
  'info',
)
// reset current meeting info
export const resetCurMeetingInfo = makeActionCreator(
  TYPES.RESET_CUR_MEETING_INFO,
  'info',
)

// get meeting list
export const getMeetingList = makeActionCreator(
  TYPES.GET_MEETING_LIST,
  'url',
  'config',
)

// load meeting list
export const loadMeetingList = makeActionCreator(
  TYPES.LOAD_MEETING_LIST,
  'data',
)

// submit a meeting
export const submitAMeeting = makeActionCreator(
  TYPES.SUBMIT_A_MEETING,
  'data',
)

// get comp application list
export const getCompApplyList = makeActionCreator(
  TYPES.GET_COMPAPPLY_LIST,
  'url',
  'config',
)

// load comp application list
export const loadCompApplyList = makeActionCreator(
  TYPES.LOAD_COMPAPPLY_LIST,
  'data',
)
