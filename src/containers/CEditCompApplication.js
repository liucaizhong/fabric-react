import { connect } from 'react-redux'
import EditCompApplication from '../components/EditCompApplication'
import { updateACompApplyInfo } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    curMeetingInfo: state.curMeetingInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateACompApplyInfo: (comp, data) => {
      dispatch(updateACompApplyInfo(comp, data))
    },
  }
}

const CEditCompApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCompApplication)

export default CEditCompApplication
