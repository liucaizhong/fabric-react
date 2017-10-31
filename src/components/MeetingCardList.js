import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'antd-mobile'

class MeetingCardList extends Component {
  constructor(props) {
    super(props)

    const { meetingList } = props

    this.state = {
      data: meetingList.filter((cur) => {
        return cur.statusStep >= 2 && cur.statusStep < 5
      }),
    }
  }

  concatDatesStr(dates) {
    const start = dates[0].date
    const end = dates[dates.length - 1].date

    return `${start} - ${end}`
  }

  render() {
    return this.state.data.map((cur, i) => {
      return (
        <Card
          key={i}
          onClick={() => {
            console.log('click the card')
          }}
        >
          <Card.Header
            title={
              <div className="meetingcard">
                <span>{cur.name}</span>
                <span>{this.concatDatesStr(cur.dates)}</span>
              </div>
            }
            extra={
              <Icon
                type="ellipsis"
                size="sm"
              />
            }
          />
          <Card.Body>
            <div>{cur.desc}</div>
          </Card.Body>
        </Card>
      )
    })
  }
}

MeetingCardList.propTypes = {
  // history: PropTypes.object.isRequired,
  // url: PropTypes.string.isRequired,
  meetingList: PropTypes.array.isRequired,
}

export default MeetingCardList
