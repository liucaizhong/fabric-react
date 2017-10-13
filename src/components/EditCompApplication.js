import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  NavBar,
  Icon,
  List,
  DatePicker,
  TextareaItem,
  Picker,
  Toast,
  WhiteSpace,
  Button,
  Modal,
} from 'antd-mobile'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import moment from 'moment'
import SelectUser from '../containers/CSelectUser'

const FIELDS = ['id', 'date', 'start', 'end', 'form', 'attendee',
  'analyst', 'remarks']

class EditCompApplication extends Component {
  constructor(props) {
    super(props)

    this.initialEditing = props.location.state.editing
    this.history = props.history
    const data = props.location.state.data.d || props.location.state.data

    this.state = {
      ...FIELDS.reduce((t, k) => {
        return Object.assign(t, {
          [k]: data[k],
        })
      }, {}),
      editing: props.location.state.editing,
      showSelectUser: false,
    }
    console.log('state', this.state)
  }

  onCancel() {
    if (this.initialEditing) {
      this.history.goBack()
    } else {
      this.setState({
        editing: !this.state.editing,
      })
    }
  }

  onBack() {
    this.history.goBack()
  }

  onSave() {
    const { intl, updateCurCompApplyPlan } = this.props
    const data = {
      ...FIELDS.reduce((t, k) => {
        return Object.assign(t, {
          [k]: this.state[k],
        })
      }, {}),
    }

    // validate data
    // 0: empty data is not permitted
    const f = ((obj) => {
      for (const k in obj) {
        if (k !== 'id' && k !== 'remarks' && !obj[k]) {
          return true
        }
      }
      return false
    })(data)

    if (f) {
      Toast.fail(
        intl.formatMessage({
          id: 'SetMeetingDate.error2',
        }),
        2,
        null,
        true,
      )
    } else {
      // save new comp application
      console.log('save data', data)
      if (this.initialEditing) {
        updateCurCompApplyPlan(data)
        this.history.goBack()
      } else {
        // todo: submit to database
        updateCurCompApplyPlan(data)
        this.setState({
          editing: !this.state.editing,
        })
      }
    }
  }

  onEdit() {
    this.setState({
      editing: !this.state.editing,
    })
  }

  onChangeDate(date) {
    this.setState({
      date,
    })
  }

  onChangeStart(start) {
    this.setState({
      start,
    })
  }

  onChangeEnd(end) {
    this.setState({
      end,
    })
  }

  onChangeForm(form) {
    this.setState({
      form,
    })
  }

  // onChangeAnalyst(analyst) {
  //   this.setState({
  //     analyst: [].concat(analyst),
  //   })
  // }

  onChangeAttendee(attendee) {
    this.setState({
      attendee,
    })
  }

  onChangeRemarks(remarks) {
    this.setState({
      remarks,
    })
  }

  // onClickItem() {
  //   const { openSelectUser } = this.props
  //   openSelectUser()
  // }

  closeSelectUser(analyst) {
    console.log('back analyst', analyst)

    this.setState({
      showSelectUser: false,
      analyst,
    })
  }

  openSelectUser() {
    console.log('openSelectUser', this.state)
    this.setState({
      showSelectUser: true,
    })
  }

  render() {
    const { intl, curMeetingInfo, curCompInfo } = this.props

    const formData = [{
      label: intl.formatMessage({
        id: 'CompApplyList.Form.text0',
      }),
      value: 0,
    }, {
      label: intl.formatMessage({
        id: 'CompApplyList.Form.text1',
      }),
      value: 1,
    }, {
      label: intl.formatMessage({
        id: 'CompApplyList.Form.text2',
      }),
      value: 2,
    }]

    const dates = curMeetingInfo.dates || [{
      start: '09:00',
      end: '18:00',
      interval: '60',
      date: moment().format('YYYYMMDD'),
    }]

    const dateRow = dates.find((cur) => {
      return !cur.date.localeCompare(this.state.date)
    })
    const datesLen = dates && dates.length
    const minDate = datesLen ? dates[0].date : ''
    const maxDate = datesLen ? dates[datesLen - 1].date : ''
    const minTime = dateRow && dateRow.start || ''
    const maxTime = dateRow && dateRow.end || ''

    return this.state.showSelectUser ?
      <SelectUser
        onBack={this.closeSelectUser.bind(this)}
        editing={this.state.editing}
        url="/userListData.json"
        users={this.state.analyst}
        multi
      /> :
      (
        <div>
          <NavBar
            className="Compapplication-navbar__div"
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
                /> :
                <Icon
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
                /> :
                <Icon
                  type={require('../assets/icons/edit.svg')}
                  role="button"
                  onClick={(e) => {
                    e.preventDefault()
                    this.onEdit()
                  }}
                  size="xs"
                />
            }
          >
            <FormattedMessage id="EditCompApplication.navTitle" />
          </NavBar>
          <List
            className="Editcompapplication-list__div"
            renderHeader={() => (
              <span>{`${curCompInfo.name} ${curCompInfo.code}`}</span>
            )}
          >
            <DatePicker
              mode="date"
              title={intl.formatMessage({
                id: 'Common.selectDate',
              })}
              extra={intl.formatMessage({
                id: 'EditCompApplication.extraText2',
              })}
              value={this.state.date ?
                moment(this.state.date, 'YYYYMMDD')
                : ''
              }
              onChange={(val) => {
                this.onChangeDate(val.format('YYYYMMDD'))
              }}
              disabled={!this.state.editing}
              minDate={moment(minDate, 'YYYYMMDD')}
              maxDate={moment(maxDate, 'YYYYMMDD')}
            >
              <List.Item>
                <FormattedMessage id="EditCompApplication.listText2" />
              </List.Item>
            </DatePicker>
            <div className="Editcompapplication-list__time">
              <DatePicker
                mode="time"
                title={intl.formatMessage({
                  id: 'Common.selectTime',
                })}
                extra={intl.formatMessage({
                  id: 'EditCompApplication.extraText3',
                })}
                value={this.state.start ?
                  moment(this.state.start, 'HH:mm')
                  : ''
                }
                onChange={(val) => {
                  this.onChangeStart(val.format('HH:mm'))
                }}
                disabled={!this.state.editing}
                minuteStep={15}
                minDate={moment(minTime, 'HH:mm')}
                maxDate={moment(maxTime, 'HH:mm')}
              >
                <List.Item>
                  <FormattedMessage id="EditCompApplication.listText3" />
                </List.Item>
              </DatePicker>
              <DatePicker
                mode="time"
                title={intl.formatMessage({
                  id: 'Common.selectTime',
                })}
                extra={intl.formatMessage({
                  id: 'EditCompApplication.extraText4',
                })}
                value={this.state.end ?
                  moment(this.state.end, 'HH:mm')
                  : ''
                }
                onChange={(val) => {
                  this.onChangeEnd(val.format('HH:mm'))
                }}
                disabled={!this.state.editing}
                minuteStep={15}
                minDate={moment(minTime, 'HH:mm')}
                maxDate={moment(maxTime, 'HH:mm')}
              >
                <List.Item />
              </DatePicker>
            </div>
            <Picker
              data={formData}
              cols={1}
              onChange={(val) => {
                this.onChangeForm(val[0])
              }}
              value={[this.state.form]}
              disabled={!this.state.editing}
              okText={intl.formatMessage({
                id: 'Common.confirm',
              })}
              dismissText={intl.formatMessage({
                id: 'Common.cancel',
              })}
              extra={intl.formatMessage({
                id: 'EditCompApplication.extraText5',
              })}
              title={intl.formatMessage({
                id: 'EditCompApplication.extraText5',
              })}
            >
              <List.Item>
                <FormattedMessage id="EditCompApplication.listText5" />
              </List.Item>
            </Picker>
            <List.Item
              extra={this.state.analyst && this.state.analyst.length ?
                (<span>{this.state.analyst.reduce((t, v, i) => {
                  // console.log('analyst v', v)
                  if (i === 0) {
                    return `${t}${v.name}`
                  }
                  return `${t}, ${v.name}`
                }, '')}</span>)
                : intl.formatMessage({
                  id: 'EditCompApplication.extraText8',
                })
              }
              onClick={this.openSelectUser.bind(this)}
            >
              <FormattedMessage id="EditCompApplication.listText8" />
            </List.Item>
            <TextareaItem
              rows={3}
              count={30}
              value={this.state.attendee}
              clear
              placeholder={intl.formatMessage({
                id: 'EditCompApplication.placeholderText6',
              })}
              onChange={(val) => {
                this.onChangeAttendee(val)
              }}
              editable={this.state.editing}
            />
            <TextareaItem
              rows={4}
              count={50}
              value={this.state.remarks}
              clear
              placeholder={intl.formatMessage({
                id: 'EditCompApplication.placeholderText7',
              })}
              onChange={(val) => {
                this.onChangeRemarks(val)
              }}
              editable={this.state.editing}
            />
          </List>
          <WhiteSpace size="md" />
          {this.state.editing ?
            <Button
              className="delBtnPanel"
              activeClassName="delBtnPanel__active"
              onClick={() => {
                Modal.alert(intl.formatMessage({
                  id: 'EditCompApplication.alertTitle0',
                }), intl.formatMessage({
                  id: 'EditCompApplication.alertDesc0',
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
                    console.log('confirm delete')
                    const { date, start, end } = this.state
                    const { deleteCurCompApplyPlan } = this.props
                    if (this.initialEditing) {
                      deleteCurCompApplyPlan({
                        date,
                        start,
                        end,
                      })
                      this.history.goBack()
                    } else {
                      // todo: submit to database
                      deleteCurCompApplyPlan({
                        date,
                        start,
                        end,
                      })
                      this.history.goBack()
                    }
                  },
                }])
              }}
            >
              {intl.formatMessage({
                id: 'Common.delete',
              })}
            </Button>
          : null}
        </div>
      )
  }
}

EditCompApplication.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
  curCompInfo: PropTypes.object.isRequired,
  updateCurCompApplyPlan: PropTypes.func.isRequired,
  deleteCurCompApplyPlan: PropTypes.func.isRequired,
}

export default injectIntl(EditCompApplication)
