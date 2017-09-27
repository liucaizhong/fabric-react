import { connect } from 'react-redux'
import SelectUser from '../components/SelectUser'
import { getUserList } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (url, config) => {
      dispatch(getUserList(url, config))
    },
  }
}

const CSelectUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectUser)

export default CSelectUser
