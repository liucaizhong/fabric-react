import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectComp from '../containers/CSelectComp'
// import RegisterCalendar from '../containers/CRegisterCalendar'

class RegisterCompApplication extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   const { editing } = props.location.state
  //
  //   this.state = {
  //     editing,
  //   }
  // }

  onBack() {
    const { history } = this.props
    history.goBack()
  }

  onClickItem(rowData) {
    const { setCurCompInfo, curMeetingInfo, history } = this.props

    setCurCompInfo({
      ...rowData,
      deadline: curMeetingInfo.deadline,
    })

    history.push('/apply-calendar', {
      editing: true,
    })
  }

  render() {
    return (
      <SelectComp
        onBack={this.onBack.bind(this)}
        onClickItem={this.onClickItem.bind(this)}
      />
    )
  }
}

RegisterCompApplication.propTypes = {
  history: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
  setCurCompInfo: PropTypes.func.isRequired,
}

export default RegisterCompApplication
