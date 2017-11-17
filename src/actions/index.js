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
// set filter for comp apply list status
export const setCompApplyStatusFilter = makeActionCreator(
  TYPES.SET_COMPAPPLY_STATUS_FILTER,
  'filter',
)
// set filter for client apply list status
export const setClientApplyStatusFilter = makeActionCreator(
  TYPES.SET_CLIENTAPPLY_STATUS_FILTER,
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
// set current comp info
export const setCurCompInfo = makeActionCreator(
  TYPES.SET_CUR_COMP_INFO,
  'info',
)
// update current comp application info
export const updateCurCompInfo = makeActionCreator(
  TYPES.UPDATE_CUR_COMP_INFO,
  'info',
)
// set current comp application plan
export const setCurCompApplyPlan = makeActionCreator(
  TYPES.SET_CUR_COMP_APPLY_PLAN,
  'data',
)
// get current comp application plan
export const getCurCompApplyPlan = makeActionCreator(
  TYPES.GET_CUR_COMP_APPLY_PLAN,
  'url',
  'config',
)
// update current comp application plan
export const updateCurCompApplyPlan = makeActionCreator(
  TYPES.UPDATE_CUR_COMP_APPLY_PLAN,
  'data',
)
// update current comp application plan: application list
export const updateCurCompApplyPlanApplyList = makeActionCreator(
  TYPES.UPDATE_CUR_COMP_APPLY_PLAN_APPLICATION,
  'axis',
  'data',
)
// delete current comp application plan
export const deleteCurCompApplyPlan = makeActionCreator(
  TYPES.DELETE_CUR_COMP_APPLY_PLAN,
  'data',
)
// reset current comp application plan
export const resetCurCompApplyPlan = makeActionCreator(
  TYPES.RESET_CUR_COMP_APPLY_PLAN,
  'data',
)
// set filter for comp application list
export const setCompApplyFilter = makeActionCreator(
  TYPES.SET_COMP_APPLY_FILTER,
  'filter',
)
// get comp list
export const getCompList = makeActionCreator(
  TYPES.GET_COMP_LIST,
  'url',
  'config',
)
// load comp list
export const loadCompList = makeActionCreator(
  TYPES.LOAD_COMP_LIST,
  'data',
)
// get user list
export const getUserList = makeActionCreator(
  TYPES.GET_USER_LIST,
  'url',
  'config',
)
// load user list
export const loadUserList = makeActionCreator(
  TYPES.LOAD_USER_LIST,
  'data',
)
// set filter for client application list
export const setClientApplyFilter = makeActionCreator(
  TYPES.SET_CLIENT_APPLY_FILTER,
  'filter',
)
// get client application list
export const getClientApplyList = makeActionCreator(
  TYPES.GET_CLIENTAPPLY_LIST,
  'url',
  'config',
)
// load client application list
export const loadClientApplyList = makeActionCreator(
  TYPES.LOAD_CLIENTAPPLY_LIST,
  'data',
)
// update client application list
export const updateClientApplyList = makeActionCreator(
  TYPES.UPDATE_CLIENTAPPLY_LIST,
  'data',
)
// delete client application list
export const deleteClientApplyList = makeActionCreator(
  TYPES.DELETE_CLIENTAPPLY_LIST,
  'data',
)
// reset client application list
export const resetClientApplyList = makeActionCreator(
  TYPES.RESET_CLIENTAPPLY_LIST,
  'data',
)
// get customer list
export const getCustomerList = makeActionCreator(
  TYPES.GET_CUSTOMER_LIST,
  'url',
  'config',
)
// load customer list
export const loadCustomerList = makeActionCreator(
  TYPES.LOAD_CUSTOMER_LIST,
  'data',
)
// get comp schedule
export const getCompSchedule = makeActionCreator(
  TYPES.GET_COMP_SCHEDULE,
  'url',
  'config',
)
