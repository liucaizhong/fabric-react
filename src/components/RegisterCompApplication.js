import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectComp from '../containers/CSelectComp'
import RegisterCalendar from '../containers/CRegisterCalendar'

class RegisterCompApplication extends Component {
  constructor(props) {
    super(props)

    const { editing } = props.location.state

    this.state = {
      editing,
    }
  }

  onBack() {
    const { history } = this.props
    history.goBack()
  }

  onClickItem(rowData) {
    console.log('rowData', rowData)
    this.setState({
      editing: false,
      comp: Object.assign({}, rowData),
    })
  }

  render() {
    const { history } = this.props

    return this.state.editing ?
      <SelectComp
        onBack={this.onBack.bind(this)}
        onClickItem={this.onClickItem.bind(this)}
      /> :
      <RegisterCalendar
        editing
        history={history}
        location={{
          state: this.state.comp,
        }}
      />
  }
}

RegisterCompApplication.propTypes = {
  history: PropTypes.object.isRequired,
}

export default RegisterCompApplication
