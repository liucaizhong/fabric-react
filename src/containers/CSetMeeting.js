import { connect } from 'react-redux'
import _ from 'lodash'
import SetMeeting from '../components/SetMeeting'
import { updateCurMeetingInfo, submitAMeeting } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    curMeetingInfo: state.curMeetingInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurMeetingInfo: _.debounce((info) => {
      dispatch(updateCurMeetingInfo(info))
    }, 500),
    submitAMeeting: (data) => {
      dispatch(submitAMeeting(data))
    },
  }
}

const CSetMeeting = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetMeeting)

export default CSetMeeting
