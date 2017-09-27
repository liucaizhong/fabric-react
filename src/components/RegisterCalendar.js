import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Tabs, Modal } from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import _ from 'lodash'
import CustomCalendar from './CustomCalendar'

class RegisterCalendar extends Component {
  constructor(props) {
    super(props)

    this.history = props.history
    const { code } = props.location.state
    const { editing } = props
    const compApplication = props.compApplyList.find((cur) => {
      return !cur.code.localeCompare(code)
    })

    this.state = {
      ...compApplication,
      ...props.location.state,
      editing,
      showModal: editing && !_.isEmpty(compApplication),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { compApplyList } = nextProps
    const { code } = this.state
    const compApplication = compApplyList.find((cur) => {
      return !cur.code.localeCompare(code)
    })

    this.setState({
      ...compApplication,
    })
  }

  onCancel() {
    const { intl } = this.props

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
        this.history.goBack()
      },
    }])
  }

  onBack() {
    this.history.goBack()
  }

  onSave() {
    console.log('store a new comp application')
  }

  render() {
    const { dates, intl } = this.props

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
                  data={this.state.plan ? this.state.plan[d.date] : []}
                  editing={this.state.editing}
                  comp={{
                    id: this.state.id,
                    name: this.state.name,
                    code: this.state.code,
                    indus: this.state.indus,
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
                this.setState({
                  editing: false,
                  showModal: false,
                })
              },
            },
            {
              text: intl.formatMessage({
                id: 'RegisterCalendar.modal.btnText1',
              }),
              onPress: () => {
                this.history.goBack()
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
  editing: PropTypes.bool,
  history: PropTypes.object.isRequired,
  dates: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  compApplyList: PropTypes.array.isRequired,
}

RegisterCalendar.defaultProps = {
  editing: false,
}

export default injectIntl(RegisterCalendar)
