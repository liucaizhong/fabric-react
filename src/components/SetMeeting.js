import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
  NavBar,
  Icon,
  List,
  InputItem,
  Toast,
  TextareaItem,
  DatePicker } from 'antd-mobile'
import moment from 'moment'
import MeetingDatesExtra from './MeetingDatesExtra'
import SetMeetingStatus from './SetMeetingStatus'

class SetMeeting extends Component {
  constructor(props) {
    super(props)
    this.history = props.history
    this.updateCurMeetingInfo = props.updateCurMeetingInfo
    this.state = {
      ...props.curMeetingInfo,
    }
  }

  // componentDidMount() {
  //   const { loadCurMeetingInfo } = this.props
  //   if (location.state) {
  //     loadCurMeetingInfo(location.state)
  //   }
  // }
  onChangeName(name) {
    this.setState({
      name,
    }, this.updateCurMeetingInfo({
      name,
    }))
  }

  onChangeDesc(desc) {
    this.setState({
      desc,
    }, this.updateCurMeetingInfo({
      desc,
    }))
  }

  onChangeDeadline(val) {
    const newDeadline = val.format('YYYYMMDD')
    this.setState({
      deadline: newDeadline,
    }, this.updateCurMeetingInfo({
      deadline: newDeadline,
    }))
  }

  onCancel() {
    this.history.goBack()
  }

  onSave() {
    const { intl, submitAMeeting } = this.props
    const data = {
      ...this.state,
    }
    // validate data
    // 0: empty data is not permitted
    const f = ['name', 'dates', 'deadline', 'statusStep', 'desc'].every(
      (key) => {
        const val = data[key]
        if (Array.isArray(val)) {
          return val.length
        } else {
          return val !== undefined && val !== ''
        }
      },
    )
    if (f) {
      // todo: submit data to database
      submitAMeeting(data)
      this.history.goBack()
    } else {
      Toast.fail(
        intl.formatMessage({
          id: 'SetMeetingDate.error2',
        }),
        2,
        null,
        true,
      )
    }
  }

  onChangeStatus(statusStep) {
    this.setState({
      statusStep,
    }, this.updateCurMeetingInfo({
      statusStep,
    }))
  }

  render() {
    const { intl } = this.props
    const steps = [{
      title: intl.formatMessage({
        id: 'Meeting.Status.text0',
      }),
    }, {
      title: intl.formatMessage({
        id: 'Meeting.Status.text1',
      }),
    }, {
      title: intl.formatMessage({
        id: 'Meeting.Status.text2',
      }),
    }, {
      title: intl.formatMessage({
        id: 'Meeting.Status.text3',
      }),
    }, {
      title: intl.formatMessage({
        id: 'Meeting.Status.text4',
      }),
    }, {
      title: intl.formatMessage({
        id: 'Meeting.Status.text5',
      }),
    }]

    return (
      <div>
        <NavBar
          className="Setmeeting-navbar__div"
          iconName={null}
          leftContent={<Icon
            type="cross"
            role="button"
            onClick={(e) => {
              e.preventDefault()
              this.onCancel()
            }}
          />}
          rightContent={
            <Icon
              type="check"
              role="button"
              onClick={(e) => {
                e.preventDefault()
                this.onSave()
              }}
            />
          }
        >
          <FormattedMessage id="SetMeeting.navTitle" />
        </NavBar>
        <List className="Setmeeting-list__div">
          <InputItem
            type="text"
            placeholder={intl.formatMessage({
              id: 'SetMeeting.listPlaceholder0',
            })}
            value={this.state.name}
            onChange={(val) => {
              this.onChangeName(val)
            }}
            clear
          >
            <FormattedMessage id="SetMeeting.listText0" />
          </InputItem>
          <TextareaItem
            rows={4}
            count={60}
            value={this.state.desc}
            clear
            placeholder={intl.formatMessage({
              id: 'SetMeeting.listPlaceholder1',
            })}
            onChange={(val) => {
              this.onChangeDesc(val)
            }}
          />
          <List.Item
            extra={<MeetingDatesExtra dates={this.state.dates} />}
            onClick={() => {
              this.history.push('/set-m-d')
              this.history.goForward()
            }}
          >
            <FormattedMessage id="SetMeeting.listText1" />
          </List.Item>
          <DatePicker
            mode="date"
            title={intl.formatMessage({
              id: 'Common.selectDate',
            })}
            extra={intl.formatMessage({
              id: 'SetMeeting.listExtraText2',
            })}
            value={this.state.deadline ?
              moment(this.state.deadline, 'YYYYMMDD')
              : ''
            }
            onChange={(val) => {
              this.onChangeDeadline(val)
            }}
          >
            <List.Item>
              <FormattedMessage id="SetMeeting.listText2" />
            </List.Item>
          </DatePicker>
          <List.Item>
            <SetMeetingStatus
              currentStep={this.state.statusStep}
              steps={steps}
              onChangeSteps={this.onChangeStatus.bind(this)}
            />
          </List.Item>
        </List>
      </div>
    )
  }
}

SetMeeting.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
  updateCurMeetingInfo: PropTypes.func.isRequired,
  submitAMeeting: PropTypes.func.isRequired,
}

export default injectIntl(SetMeeting)
