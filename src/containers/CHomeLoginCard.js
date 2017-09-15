import { connect } from 'react-redux'
import HomeLoginCard from '../components/HomeLoginCard'

const mapStateToProps = (state) => {
  return {
    ...state.loginUser,
  }
}

const CHomeLoginCard = connect(
  mapStateToProps,
)(HomeLoginCard)

export default CHomeLoginCard
