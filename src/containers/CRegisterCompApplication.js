import { connect } from 'react-redux'
import RegisterCompApplication from '../components/RegisterCompApplication'
import { setCurCompInfo } from '../actions/index'

const mapStateToProps = (state) => {
  const { curMeetingInfo } = state
  return {
    curMeetingInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurCompInfo: (data) => {
      dispatch(setCurCompInfo(data))
    },
  }
}

const CRegisterCompApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterCompApplication)

export default CRegisterCompApplication
