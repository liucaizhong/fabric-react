import { combineReducers } from 'redux'
import meetingContentFilter from './meetingContentFilter'
import meetingStatusFilter from './meetingStatusFilter'
import loginUser from './loginUser'
import curMeetingInfo from './curMeetingInfo'
import meetingList from './meetingList'
import compApplyList from './compApplyList'
import compApplyFilter from './compApplyFilter'
import compList from './compList'
import userList from './userList'

const rootReducer = combineReducers({
  meetingContentFilter,
  meetingStatusFilter,
  loginUser,
  curMeetingInfo,
  meetingList,
  compApplyList,
  compApplyFilter,
  compList,
  userList,
})

export default rootReducer
