import { connect } from 'react-redux'
import ClientApplyList from '../components/ClientApplyList'
import { getClientApplyList, loadClientApplyList, deleteClientApplyList,
  updateCurCompApplyPlanApplyList } from '../actions/index'

const mapStateToProps = (state) => {
  const { curMeetingInfo, curCompInfo,
    clientApplyFilter, clientApplyList } = state
  return {
    curMeetingInfo,
    curCompInfo,
    clientApplyFilter,
    clientApplyList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClientApplyList: (url, config) => {
      dispatch(getClientApplyList(url, config))
    },
    loadClientApplyList: (data) => {
      dispatch(loadClientApplyList(data))
    },
    deleteClientApplyList: (data) => {
      dispatch(deleteClientApplyList(data))
    },
    updateCurCompApplyPlanApplyList: (axis, data) => {
      dispatch(updateCurCompApplyPlanApplyList(axis, data))
    },
  }
}

const CClientApplyList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientApplyList)

export default CClientApplyList
