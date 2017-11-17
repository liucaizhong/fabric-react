import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'antd-mobile'

class MeetingCardList extends Component {
  constructor(props) {
    super(props)

    const { meetingList, contentFilter } = props

    this.state = {
      data: meetingList.filter((cur) => {
        return cur.statusStep >= 2 && cur.statusStep < 5 &&
        (cur.name.includes(contentFilter) || cur.desc.includes(contentFilter)
        || this.concatDatesStr(cur.dates).includes(contentFilter))
      }),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { meetingList, contentFilter } = nextProps

    this.setState({
      data: meetingList.filter((cur) => {
        return cur.statusStep >= 2 && cur.statusStep < 5 &&
        (cur.name.includes(contentFilter) || cur.desc.includes(contentFilter)
        || this.concatDatesStr(cur.dates).includes(contentFilter))
      }),
    })
  }

  concatDatesStr(dates) {
    const start = dates[0].date
    const end = dates[dates.length - 1].date

    return `${start} - ${end}`
  }

  render() {
    const { history, url } = this.props

    return this.state.data.map((cur, i) => {
      return (
        <Card
          key={i}
          onClick={() => {
            console.log('click the card')
            history.push(url, {
              meetingInfo: cur,
            })
            history.goForward()
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
  history: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  meetingList: PropTypes.array.isRequired,
  contentFilter: PropTypes.string.isRequired,
}

export default MeetingCardList
