import { connect } from 'react-redux'
import _ from 'lodash'
import CompApplication from '../components/CompApplication'
import { setCompApplyFilter } from '../actions/index'

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (val) => {
      dispatch(setCompApplyFilter(val))
    },
    onChange: _.debounce((val) => {
      dispatch(setCompApplyFilter(val))
    }, 500),
  }
}

const CCompApplication = connect(
  undefined,
  mapDispatchToProps,
)(CompApplication)

export default CCompApplication
