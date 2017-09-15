import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

class MeetingDatesExtra extends Component {
  render() {
    const { dates } = this.props
    let start = ''
    let end = ''

    if (dates.length) {
      start = moment(
        dates[0].date,
        'YYYYMMDD',
      ).format('L')

      end = moment(
        dates[dates.length - 1].date,
        'YYYYMMDD',
      ).format('L')
    }

    return (
      <div>
        { dates.length ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            <span>{start}</span>
            <FormattedMessage id="Common.To" />
            <span>{end}</span>
          </div> :
          <FormattedMessage
            id="SetMeeting.listExtraText"
          />
        }
      </div>
    )
  }
}

MeetingDatesExtra.propTypes = {
  dates: PropTypes.array,
}

MeetingDatesExtra.defaultProps = {
  dates: [],
}

export default MeetingDatesExtra
