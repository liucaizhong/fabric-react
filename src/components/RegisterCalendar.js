import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Tabs, Modal } from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import _ from 'lodash'
import moment from 'moment'
import CustomCalendar from './CustomCalendar'

class RegisterCalendar extends Component {
  constructor(props) {
    super(props)

    this.history = props.history
    const { editing, back2Step } = props.location.state
    const { curCompInfo, curCompApplyPlan } = props
    // const compApplication = props.compApplyList.find((cur) => {
    //   return !cur.code.localeCompare(curCompInfo.code)
    // })
    // this.initialEditing = editing
    // console.log('this.initialEditing', this.initialEditing)
    this.state = {
      ...curCompInfo,
      // ...compApplication,
      back2Step,
      editing,
      showModal: false,
      plan: _.isEmpty(curCompApplyPlan)
        ? null : Object.assign({}, curCompApplyPlan),
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { getCurCompApplyPlan, curCompApplyPlan,
      resetClientApplyList } = this.props
    resetClientApplyList([])
    if (!this.state.editing || _.isEmpty(curCompApplyPlan)) {
      getCurCompApplyPlan('/compApplyPlan.json', {
        method: 'GET',
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { curCompApplyPlan } = nextProps
    const { editing, back2Step } = nextProps.location.state
    console.log('back2Step', back2Step)

    this.setState({
      plan: Object.assign({}, curCompApplyPlan),
      editing,
      back2Step,
      showModal: editing && !_.isEmpty(curCompApplyPlan),
    })
  }

  onCancel() {
    const { intl, resetCurCompApplyPlan } = this.props

    Modal.alert(intl.formatMessage({
      id: 'RegisterCalendar.alertTitle0',
    }), intl.formatMessage({
      id: 'RegisterCalendar.alertDesc0',
    }), [{
      text: intl.formatMessage({
        id: 'Common.cancel',
      }),
      onPress: () => {},
    }, {
      text: intl.formatMessage({
        id: 'Common.confirm',
      }),
      onPress: () => {
        resetCurCompApplyPlan({})
        this.history.go(-2)
      },
    }])
  }

  onBack() {
    const { resetCurCompApplyPlan, setCurCompInfo } = this.props
    resetCurCompApplyPlan({})
    setCurCompInfo({})
    this.history.go(this.state.back2Step ? -2 : -1)
  }

  onSave() {
    console.log('store a new comp application')
  }

  render() {
    const { curMeetingInfo, intl } = this.props
    console.log('curMeetingInfo', curMeetingInfo)

    const dates = curMeetingInfo.dates || [{
      start: '09:00',
      end: '18:00',
      interval: '60',
      date: moment().format('YYYYMMDD'),
    }]

    return (
      <div>
        <NavBar
          className="Setmeeting-navbar__div"
          iconName={null}
          leftContent={
            this.state.editing ?
              <Icon
                type="cross"
                role="button"
                onClick={(e) => {
                  e.preventDefault()
                  this.onCancel()
                }}
              />
              : <Icon
                type="left"
                role="button"
                onClick={(e) => {
                  e.preventDefault()
                  this.onBack()
                }}
              />
          }
          rightContent={
            this.state.editing ?
              <Icon
                type="check"
                role="button"
                onClick={(e) => {
                  e.preventDefault()
                  this.onSave()
                }}
              />
            : null
          }
        >
          <FormattedMessage id="RegisterCalendar.navTitle" />
        </NavBar>
        <Tabs
          defaultActiveKey="0"
          animated={false}
          className="RegisterCalendar-tabs__div"
        >
          {dates.map((d, i) => {
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
                <CustomCalendar
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
                />
              </Tabs.TabPane>
            )
          })}
        </Tabs>
        <Modal
          title={intl.formatMessage({
            id: 'RegisterCalendar.modal.titleText',
          })}
          visible={this.state.showModal}
          transparent
          maskClosable={false}
          footer={[
            {
              text: intl.formatMessage({
                id: 'RegisterCalendar.modal.btnText0',
              }),
              onPress: () => {
                this.history.replace('/apply-calendar', {
                  editing: false,
                  back2Step: true,
                })
              },
            },
            {
              text: intl.formatMessage({
                id: 'RegisterCalendar.modal.btnText1',
              }),
              onPress: () => {
                this.history.go(-2)
              },
            },
          ]}
        >
          <FormattedMessage id="RegisterCalendar.modal.desc" />
        </Modal>
      </div>
    )
  }
}

RegisterCalendar.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
  curCompInfo: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // compApplyList: PropTypes.array.isRequired,
  curCompApplyPlan: PropTypes.object.isRequired,
  getCurCompApplyPlan: PropTypes.func.isRequired,
  resetCurCompApplyPlan: PropTypes.func.isRequired,
  resetClientApplyList: PropTypes.func.isRequired,
  setCurCompInfo: PropTypes.func.isRequired,
}

export default injectIntl(RegisterCalendar)
