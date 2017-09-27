import { connect } from 'react-redux'
import _ from 'lodash'
import HomeSearchBar from '../components/HomeSearchBar'
import {
  setMeetingContentFilter,
  setCurMeetingInfo,
} from '../actions/index'

const mapStateToProps = (state) => {
  const { roleId } = state.loginUser
  return {
    roleId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (val) => {
      dispatch(setMeetingContentFilter(val))
    },
    onChange: _.debounce((val) => {
      dispatch(setMeetingContentFilter(val))
    }, 500),
    onClickLink: (state) => {
      dispatch(setCurMeetingInfo({
        ...state,
      }))
    },
  }
}

const CHomeSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeSearchBar)

export default CHomeSearchBar
