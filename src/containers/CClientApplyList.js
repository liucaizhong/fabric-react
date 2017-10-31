import { connect } from 'react-redux'
import ClientApplyList from '../components/ClientApplyList'
import { getClientApplyList, loadClientApplyList,
  deleteClientApplyList } from '../actions/index'

const mapStateToProps = (state) => {
  const { curMeetingInfo, curCompInfo, clientApplyStatusFilter,
    clientApplyFilter, clientApplyList } = state
  return {
    curMeetingInfo,
    curCompInfo,
    clientApplyFilter,
    clientApplyList,
    clientApplyStatusFilter,
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
  }
}

const CClientApplyList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientApplyList)

export default CClientApplyList
