import { connect } from 'react-redux'
import EditCompApplication from '../components/EditCompApplication'

const mapStateToProps = (state) => {
  return {
    curMeetingInfo: state.curMeetingInfo,
  }
}


const CEditCompApplication = connect(
  mapStateToProps,
)(EditCompApplication)

export default CEditCompApplication
