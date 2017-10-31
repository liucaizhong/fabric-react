import { connect } from 'react-redux'
import EditClientApplication from '../components/EditClientApplication'
import { updateClientApplyList, deleteClientApplyList } from '../actions/index'

const mapStateToProps = (state) => {
  const { curMeetingInfo, curCompInfo } = state
  return {
    curMeetingInfo,
    curCompInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateClientApplyList: (data) => {
      dispatch(updateClientApplyList(data))
    },
    deleteClientApplyList: (data) => {
      dispatch(deleteClientApplyList(data))
    },
  }
}

const CEditClientApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditClientApplication)

export default CEditClientApplication
