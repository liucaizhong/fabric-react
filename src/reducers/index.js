import { combineReducers } from 'redux'
import meetingContentFilter from './meetingContentFilter'
import meetingStatusFilter from './meetingStatusFilter'
import loginUser from './loginUser'
import curMeetingInfo from './curMeetingInfo'
import curCompInfo from './curCompInfo'
import curCompApplyPlan from './curCompApplyPlan'
import meetingList from './meetingList'
import compApplyList from './compApplyList'
import compApplyFilter from './compApplyFilter'
import compList from './compList'
import userList from './userList'
import clientApplyFilter from './clientApplyFilter'
import clientApplyList from './clientApplyList'
import customerList from './customerList'
import compApplyStatusFilter from './compApplyStatusFilter'
import clientApplyStatusFilter from './clientApplyStatusFilter'

const rootReducer = combineReducers({
  meetingContentFilter,
  meetingStatusFilter,
  loginUser,
  curMeetingInfo,
  curCompInfo,
  meetingList,
  compApplyList,
  compApplyFilter,
  compList,
  userList,
  clientApplyFilter,
  curCompApplyPlan,
  clientApplyList,
  customerList,
  compApplyStatusFilter,
  clientApplyStatusFilter,
})

export default rootReducer
