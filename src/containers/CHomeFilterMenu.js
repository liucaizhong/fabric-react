import { connect } from 'react-redux'
import HomeFilterMenu from '../components/HomeFilterMenu'
import { setMeetingStatusFilter } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    checked: state.meetingStatusFilter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMenuChange: (e, val) => {
      dispatch(setMeetingStatusFilter({
        index: val,
        value: e.target.checked,
      }))
    },
  }
}

const CHomeFilterMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeFilterMenu)

export default CHomeFilterMenu
