import { connect } from 'react-redux'
import SelectCustomer from '../components/SelectCustomer'
import { getCustomerList } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    customerList: state.customerList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerList: (url, config) => {
      dispatch(getCustomerList(url, config))
    },
  }
}

const CSelectCustomer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectCustomer)

export default CSelectCustomer
