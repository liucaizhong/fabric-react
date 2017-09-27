import { connect } from 'react-redux'
import RegisterCalendar from '../components/RegisterCalendar'

const mapStateToProps = (state) => {
  const { dates } = state.curMeetingInfo
  return {
    dates,
    compApplyList: state.compApplyList,
  }
}

const CRegisterCalendar = connect(
  mapStateToProps,
)(RegisterCalendar)

export default CRegisterCalendar
