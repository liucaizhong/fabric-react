import { connect } from 'react-redux'
import _ from 'lodash'
import CompApplication from '../components/CompApplication'
import { setCompApplyFilter,
  setCompApplyStatusFilter } from '../actions/index'

const mapStateToProps = (state) => {
  const { compApplyFilter, compApplyStatusFilter } = state
  return {
    compApplyFilter,
    compApplyStatusFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (val) => {
      dispatch(setCompApplyFilter(val))
    },
    onChange: _.debounce((val) => {
      dispatch(setCompApplyFilter(val))
    }, 500),
    onMenuChange: (val, idx) => {
      dispatch(setCompApplyStatusFilter({
        index: idx,
        value: val,
      }))
    },
  }
}

const CCompApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompApplication)

export default CCompApplication
