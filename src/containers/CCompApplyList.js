import { connect } from 'react-redux'
import CompApplyList from '../components/CompApplyList'
import { getCompApplyList, updateCompApplyDeadline } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    compApplyList: state.compApplyList,
    compApplyFilter: state.compApplyFilter,
    meetingDeadline: state.curMeetingInfo.deadline,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompApplyList: (url, config) => {
      dispatch(getCompApplyList(url, config))
    },
    updateCompApplyDeadline: (rowId, deadline) => {
      dispatch(updateCompApplyDeadline(rowId, deadline))
    },
  }
}

const CCompApplyList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompApplyList)

export default CCompApplyList
