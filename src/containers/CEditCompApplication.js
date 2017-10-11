import { connect } from 'react-redux'
import EditCompApplication from '../components/EditCompApplication'
import { updateCurCompApplyPlan, deleteCurCompApplyPlan } from '../actions/index'

const mapStateToProps = (state) => {
  const { curMeetingInfo, curCompInfo } = state
  return {
    curMeetingInfo,
    curCompInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurCompApplyPlan: (data) => {
      dispatch(updateCurCompApplyPlan(data))
    },
    deleteCurCompApplyPlan: (data) => {
      dispatch(deleteCurCompApplyPlan(data))
    },
  }
}

const CEditCompApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCompApplication)

export default CEditCompApplication
