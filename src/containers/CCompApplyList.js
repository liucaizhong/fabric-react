import { connect } from 'react-redux'
import CompApplyList from '../components/CompApplyList'
import { getCompApplyList, setCurCompInfo,
  updateCurCompInfo } from '../actions/index'

const mapStateToProps = (state) => {
  const { compApplyList, compApplyFilter,
    curMeetingInfo, compApplyStatusFilter } = state
  return {
    compApplyList,
    compApplyFilter,
    curMeetingInfo,
    compApplyStatusFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompApplyList: (url, config) => {
      dispatch(getCompApplyList(url, config))
    },
    setCurCompInfo: (data) => {
      dispatch(setCurCompInfo(data))
    },
    updateCurCompInfo: (deadline) => {
      dispatch(updateCurCompInfo(deadline))
    },
  }
}

const CCompApplyList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompApplyList)

export default CCompApplyList
