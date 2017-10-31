import { connect } from 'react-redux'
import AutoSchedule from '../components/AutoSchedule'

const mapStateToProps = (state) => {
  return {
    curMeetingInfo: state.curMeetingInfo,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // todo...
//   }
// }

const CAutoSchedule = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(AutoSchedule)

export default CAutoSchedule
