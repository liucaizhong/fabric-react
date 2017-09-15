import { connect } from 'react-redux'
import SetMeetingDate from '../components/SetMeetingDate'
import { updateCurMeetingInfo } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    curMeetingInfo: state.curMeetingInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurMeetingInfo: (info) => {
      dispatch(updateCurMeetingInfo(info))
    },
  }
}
const CSetMeetingDate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetMeetingDate)

export default CSetMeetingDate
