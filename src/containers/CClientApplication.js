import { connect } from 'react-redux'
import _ from 'lodash'
import ClientApplication from '../components/ClientApplication'
import { setClientApplyFilter, setClientApplyStatusFilter,
  updateCurCompApplyPlanApplyList } from '../actions/index'

const mapStateToProps = (state) => {
  const { clientApplyList, clientApplyFilter,
    clientApplyStatusFilter } = state
  return {
    clientApplyList,
    clientApplyFilter,
    clientApplyStatusFilter,
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
    updateCurCompApplyPlanApplyList: (axis, data) => {
      dispatch(updateCurCompApplyPlanApplyList(axis, data))
    },
    onMenuChange: (val, idx) => {
      dispatch(setClientApplyStatusFilter({
        index: idx,
        value: val,
      }))
    },
  }
}

const CClientApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientApplication)

export default CClientApplication
