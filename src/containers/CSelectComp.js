import { connect } from 'react-redux'
import SelectComp from '../components/SelectComp'
import { getCompList } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    compList: state.compList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompList: (url, config) => {
      dispatch(getCompList(url, config))
    },
  }
}

const CSelectComp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectComp)

export default CSelectComp
