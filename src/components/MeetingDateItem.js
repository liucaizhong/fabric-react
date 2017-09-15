import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Picker, DatePicker, List, Icon, Toast } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'
import moment from 'moment'

class MeetingDateItem extends Component {
  constructor(props) {
    super(props)
    this.intl = this.props.intl
    this.state = {
      ...props.data,
      error: [false, false],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.data,
    })
  }

  componentDidUpdate() {
    const current = { ...this.state }
    const { data: origin, onUpdateDates } = this.props

    for (const k in origin) {
      if ({}.hasOwnProperty.call(origin, k)) {
        let shouldUpdate = false
        if (k !== 'error') {
          shouldUpdate = shouldUpdate || (current[k] !== origin[k])
          if (shouldUpdate) {
            onUpdateDates(current)
            break
          }
        }
      }
    }
  }

  onChangeDate(date) {
    this.setState({
      date,
    })
  }

  onChangeStart(start) {
    this.verifyInput(Object.assign({}, this.state, {
      start,
    }))
  }

  onChangeEnd(end) {
    this.verifyInput(Object.assign({}, this.state, {
      end,
    }))
  }

  onChangeInterval(interval) {
    this.verifyInput(Object.assign({}, this.state, {
      interval,
    }))
  }

  verifyInput(state) {
    const { start, end, interval, error } = state
    this.setState(state)
    function calMins(str) {
      return str.split(':').reverse().reduce(
        (t, v, i) => t + ((+v) * (60 ** i))
      , 0)
    }
    if (start && end) {
      const gap = calMins(end) - calMins(start)
      if (gap <= 0) {
        error[0] = true
        Toast.fail(
          this.intl.formatMessage({
            id: 'SetMeetingDate.error0',
          }),
          2,
          null,
          true,
        )
        this.setState({
          error,
        })
      } else if (interval && gap < +interval) {
        error[1] = true
        Toast.fail(
          this.intl.formatMessage({
            id: 'SetMeetingDate.error1',
          }),
          2,
          null,
          true,
        )
        this.setState({
          error,
        })
      } else {
        this.setState({
          error: [false, false],
        })
      }
    }
  }

  render() {
    const { onDelete } = this.props
    const intervalData = [
      {
        label: `30${this.intl.formatMessage({
          id: 'Common.Minutes',
        })}`,
        value: '30',
      },
      {
        label: `45${this.intl.formatMessage({
          id: 'Common.Minutes',
        })}`,
        value: '45',
      },
      {
        label: `60${this.intl.formatMessage({
          id: 'Common.Minutes',
        })}`,
        value: '60',
      },
    ]

    return (
      <div className="meetingdate-item">
        <Icon
          type={require('../assets/icons/delete.svg')}
          className="meetingdate-item__icon"
          onClick={(e) => {
            e.preventDefault()
            onDelete()
          }}
          role="button"
        />
        <DatePicker
          mode="date"
          title={this.intl.formatMessage({
            id: 'Common.selectDate',
          })}
          extra={this.intl.formatMessage({
            id: 'Common.holdingDate',
          })}
          onChange={(val) => {
            this.onChangeDate(val.format('YYYYMMDD'))
          }}
          value={this.state.date ? moment(this.state.date, 'YYYYMMDD') : ''}
        >
          <List.Item className="meetingdate-item__date" />
        </DatePicker>
        <DatePicker
          mode="time"
          title={this.intl.formatMessage({
            id: 'Common.selectTime',
          })}
          extra={this.intl.formatMessage({
            id: 'Common.beginTime',
          })}
          format={(val) => val.format('LT')}
          onChange={(val) => {
            this.onChangeStart(val.format('HH:mm'))
          }}
          value={this.state.start ? moment(this.state.start, 'HH:mm') : ''}
          minuteStep={15}
        >
          <List.Item className={this.state.error[0] ? 'error' : ''} />
        </DatePicker>
        <DatePicker
          mode="time"
          title={this.intl.formatMessage({
            id: 'Common.selectTime',
          })}
          extra={this.intl.formatMessage({
            id: 'Common.endTime',
          })}
          format={(val) => val.format('LT')}
          onChange={(val) => {
            this.onChangeEnd(val.format('HH:mm'))
          }}
          value={this.state.end ? moment(this.state.end, 'HH:mm') : ''}
          minuteStep={15}
        >
          <List.Item className={this.state.error[0] ? 'error' : ''} />
        </DatePicker>
        <Picker
          data={intervalData}
          cols={1}
          title={this.intl.formatMessage({
            id: 'SetMeeting.onceDuration',
          })}
          extra={this.intl.formatMessage({
            id: 'SetMeeting.onceDuration',
          })}
          onChange={(val) => {
            this.onChangeInterval(val[0])
          }}
          value={[this.state.interval]}
        >
          <List.Item className={this.state.error[1] ? 'error' : ''} />
        </Picker>
      </div>
    )
  }
}

MeetingDateItem.propTypes = {
  intl: intlShape.isRequired,
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateDates: PropTypes.func.isRequired,
}

export default injectIntl(MeetingDateItem)
