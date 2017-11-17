import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Tabs } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'

class MyAgendaOfDays extends Component {
  constructor(props) {
    super(props)
    const meetingInfo = props.location.state.meetingInfo
    console.log('meetingInfo', props.location)
    this.state = {
      meetingInfo,
    }
  }

  componentDidMount() {

  }

  onBack() {
    const { history } = this.props
    history.goBack()
  }

  render() {
    return (
      <div className="myagendaofdays-div">
        <NavBar
          className="Compapplication-navbar__div"
          iconName={null}
          leftContent={[
            <Icon
              key="0"
              type="left"
              role="button"
              style={{ marginRight: '0.32rem' }}
              onClick={(e) => {
                e.preventDefault()
                this.onBack()
              }}
            />,
          ]}
        >
          <FormattedMessage id="MyAgendaOfDays.navTitle" />
        </NavBar>
        <Tabs
          defaultActiveKey="0"
          animated={false}
          className="RegisterCalendar-tabs__div"
        >
          {this.state.meetingInfo.dates.map((d, i) => {
            return (
              <Tabs.TabPane
                key={i}
                tab={
                  <div className="RegisterCalendar-tab__div">
                    <FormattedMessage
                      id="Common.dayOfMeeting"
                      values={{
                        num: i + 1,
                      }}
                    />
                    <span>{d.date}</span>
                  </div>
                }
              >
                {/* <CustomCalendar
                  yAxis={{
                    date: d.date,
                    start: d.start,
                    end: d.end,
                    interval: d.interval,
                  }}
                  data={this.state.plan && this.state.plan[d.date]
                    ? this.state.plan[d.date]
                    : []
                  }
                  editing={this.state.editing}
                  deadline={{
                    meetingDeadline: curMeetingInfo.deadline,
                    compDeadline: this.state.deadline,
                  }}
                /> */}
              </Tabs.TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

MyAgendaOfDays.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MyAgendaOfDays
