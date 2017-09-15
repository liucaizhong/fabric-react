import { connect } from 'react-redux'
import CompApplyList from '../components/CompApplyList'
import { getCompApplyList } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    compApplyList: state.compApplyList,
    compApplyFilter: state.compApplyFilter || '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompApplyList: (url, config) => {
      dispatch(getCompApplyList(url, config))
    },
  }
}

const CCompApplyList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompApplyList)

export default CCompApplyList
