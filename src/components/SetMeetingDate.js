import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WhiteSpace, Toast } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl'
import MeetingDateItem from './MeetingDateItem'

class SetMeetingDate extends Component {
  constructor(props) {
    super(props)
    this.history = props.history
    this.state = {
      dates: props.curMeetingInfo.dates ?
        [].concat(props.curMeetingInfo.dates) : [],
    }
  }

  onCancel(e) {
    if (e.target.tagName !== 'DIV') {
      this.history.goBack()
    }
  }

  onSave(d) {
    const { intl, updateCurMeetingInfo } = this.props
    const { dates } = this.state
    let f = false
    dates.sort((a, b) => {
      return a.date.localeCompare(b.date)
    })
    // validate the dates
    // 0.empty data is not permitted
    // 1:data with errors is not permitted
    // 2:duplicated data is not permitted
    try {
      dates.forEach((date, i, arr) => {
        const preDate = i ? arr[i - 1] : arr[i]
        for (const k in date) {
          if (!date[k]) {
            throw new Error('0')
          } else if (k === 'error') {
            const hasError = date[k].reduce((t, b) => {
              return t || b
            }, false)
            if (hasError) {
              throw new Error('1')
            }
          } else if (i && !date.date.localeCompare(preDate.date)) {
            throw new Error('2')
          }
        }
      })
    } catch (e) {
      f = true
      switch (e.message) {
        case '0':
          Toast.fail(
            intl.formatMessage({
              id: 'SetMeetingDate.error2',
            }),
            2,
            null,
            true,
          )
          break
        case '1':
          Toast.fail(
            intl.formatMessage({
              id: 'SetMeetingDate.error3',
            }),
            2,
            null,
            true,
          )
          break
        case '2':
          Toast.fail(
            intl.formatMessage({
              id: 'SetMeetingDate.error4',
            }),
            2,
            null,
            true,
          )
          break
        default:
          Toast.fail(
            intl.formatMessage({
              id: 'SetMeetingDate.error5',
            }),
            2,
            null,
            true,
          )
          break
      }
    } finally {
      if (!f) {
        updateCurMeetingInfo({
          dates,
        })
        this.history.goBack()
      }
    }
  }

  onAdd() {
    const { dates } = this.state
    dates.push({
      date: '',
      start: '',
      end: '',
      interval: '',
    })
    this.setState({
      dates,
    })
  }

  onDelete(key) {
    const { dates } = this.state
    dates.splice(key, 1)
    this.setState({
      dates,
    })
  }

  onUpdateDates(index, data) {
    const { dates } = this.state
    Object.assign(dates[index], data)
    this.setState({
      dates,
    })
  }

  render() {
    return (
      <div>
        <NavBar
          iconName="left"
          leftContent={null}
          onLeftClick={(e) => {
            e.preventDefault()
            this.onCancel(e)
          }}
          rightContent={[
            <Icon
              key={0}
              type={require('../assets/icons/add.svg')}
              style={{
                paddingRight: '0.1rem',
              }}
              role="button"
              onClick={(e) => {
                e.preventDefault()
                this.onAdd()
              }}
            />,
            <Icon
              key={1}
              type="check"
              role="button"
              onClick={(e) => {
                e.preventDefault()
                this.onSave()
              }}
            />,
          ]}
        >
          <FormattedMessage id="SetMeetingDate.navTitle" />
        </NavBar>
        <WhiteSpace size="lg" />
        { this.state.dates.length ? this.state.dates.map((item, index) => (
          <MeetingDateItem
            key={index}
            data={item}
            onDelete={this.onDelete.bind(this, index)}
            onUpdateDates={this.onUpdateDates.bind(this, index)}
          />)) : null
        }
      </div>
    )
  }
}

SetMeetingDate.propTypes = {
  // intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
  updateCurMeetingInfo: PropTypes.func.isRequired,
}

export default injectIntl(SetMeetingDate)
