import { connect } from 'react-redux'
import _ from 'lodash'
import ClientApplication from '../components/ClientApplication'
import { setClientApplyFilter } from '../actions/index'

const mapStateToProps = (state) => {
  const { clientApplyFilter } = state
  return {
    clientApplyFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (val) => {
      dispatch(setClientApplyFilter(val))
    },
    onChange: _.debounce((val) => {
      dispatch(setClientApplyFilter(val))
    }, 500),
  }
}

const CClientApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientApplication)

export default CClientApplication
