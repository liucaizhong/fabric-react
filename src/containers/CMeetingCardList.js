import { connect } from 'react-redux'
import MeetingCardList from '../components/MeetingCardList'

const mapStateToProps = (state) => {
  return {
    meetingList: state.meetingList,
  }
}

const CMeetingCardList = connect(
  mapStateToProps,
)(MeetingCardList)

export default CMeetingCardList
