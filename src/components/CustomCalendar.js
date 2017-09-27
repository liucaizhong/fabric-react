import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

class CustomCalendar extends Component {
  constructor(props) {
    super(props)

    const { data, yAxis, editing } = props
    this.comp = props.comp
    this.state = {
      data: this.initGridData(yAxis, data),
      editing,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, yAxis } = nextProps
    this.state = {
      data: this.initGridData(yAxis, data),
    }
  }

  initGridData({ start, end, interval, date }, data) {
    const startM = moment(start, 'HH:mm')
    const endM = moment(end, 'HH:mm')
    const diff = endM.diff(startM, 'minutes')
    const len = Math.ceil(diff / +interval)
    // console.log('len', len)

    const d = []
    for (let i = 0; i < len; ++i) {
      d[i] = {
        start: startM.format('HH:mm'),
        end: moment.min(startM.add(+interval, 'minutes'), endM)
          .format('HH:mm'),
        date,
      }
    }

    data.forEach((cur) => {
      const find = d.find((item) => {
        return !item.start.localeCompare(cur.start) &&
          !item.end.localeCompare(cur.end)
      })

      if (find) {
        find.d = Object.assign({}, cur)
      }
    })

    return d
  }

  render() {
    return (
      <div
        className="custom-calendar-grid__div"
      >
        {this.state.data.map((row, idx, arr) => {
          return (
            <div key={idx} className="custom-calendar-grid__row">
              <div className="custom-calendar-grid__row-time">
                <span>{row.start}</span>
              </div>
              <div className="custom-calendar-grid__row-comp">
                <Link to={{
                  pathname: '/edit-comp-apply',
                  state: {
                    data: row,
                    editing: this.state.editing,
                    comp: this.comp,
                  },
                }}
                >
                  <div
                    className="custom-calendar-grid__row-comp-content"
                    style={row.d ? {
                      backgroundColor: '#8FBAF3',
                    } : {}}
                  >
                    {row.d ? <FormattedMessage
                      id={`CompApplyList.Form.text${row.d.form}`}
                    /> : null}
                  </div>
                </Link>
              </div>
              <div className="custom-calendar-grid__row-client">
                <Link to={{
                  pathname: '/edit-comp-apply',
                  state: {
                    data: row,
                    editing: this.state.editing,
                    comp: this.comp,
                  },
                }}
                >
                  <div
                    className="custom-calendar-grid__row-client-content"
                    style={row.d ? {
                      backgroundColor: '#C5E3F6',
                    } : {}}
                  >
                    {
                      row.d ?
                        row.d.application ?
                          <FormattedMessage
                            id="CustomCalendar.hasApplication"
                            values={{
                              num: row.d.application.length,
                            }}
                          />
                        : <FormattedMessage id="CustomCalendar.noApplication" />
                      : null
                    }
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
        <div
          key={this.state.data.length - 1}
          className="custom-calendar-grid__row"
        >
          <div className="custom-calendar-grid__row-time">
            <span>{this.state.data[this.state.data.length - 1].end}</span>
          </div>
          <div className="custom-calendar-grid__row-comp" />
          <div className="custom-calendar-grid__row-client" />
        </div>
      </div>
    )
  }
}

CustomCalendar.propTypes = {
  yAxis: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
}

export default CustomCalendar
