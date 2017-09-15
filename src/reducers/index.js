import { combineReducers } from 'redux'
import meetingContentFilter from './meetingContentFilter'
import meetingStatusFilter from './meetingStatusFilter'
import loginUser from './loginUser'
import curMeetingInfo from './curMeetingInfo'
import meetingList from './meetingList'
import compApplyList from './compApplyList'

const rootReducer = combineReducers({
  meetingContentFilter,
  meetingStatusFilter,
  loginUser,
  curMeetingInfo,
  meetingList,
  compApplyList,
})

export default rootReducer
