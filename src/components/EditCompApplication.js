import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  NavBar,
  Icon,
  List,
  DatePicker,
  InputItem,
  TextareaItem,
  Picker,
} from 'antd-mobile'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import moment from 'moment'

class EditCompApplication extends Component {
  constructor(props) {
    super(props)

    this.history = props.history
    this.initialEditing = props.location.state.editing
    this.state = {
      ...props.location.state,
    }
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
    if (this.initialEditing) {
      this.history.goBack()
    } else {
      this.setState({
        editing: !this.state.editing,
      })
    }

    // save new comp application
    // todo...
  }

  onEdit() {
    this.setState({
      editing: !this.state.editing,
    })
  }

  onChangeComp(comp) {
    this.setState({
      comp,
    })
  }

  onChangeIndus(indus) {
    this.setState({
      indus,
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

  render() {
    const { intl, curMeetingInfo } = this.props

    const formData = [{
      label: intl.formatMessage({
        id: 'CompApplyList.Form.text0',
      }),
      value: '0',
    }, {
      label: intl.formatMessage({
        id: 'CompApplyList.Form.text1',
      }),
      value: '1',
    }, {
      label: intl.formatMessage({
        id: 'CompApplyList.Form.text2',
      }),
      value: '2',
    }]

    const minDate = curMeetingInfo.dates[0]
    const maxDate = curMeetingInfo.dates[curMeetingInfo.dates.length - 1]

    return (
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
          <FormattedMessage id="CompApplication.navTitle" />
        </NavBar>
        <List className="Editcompapplication-list__div">
          <InputItem
            type="text"
            placeholder={intl.formatMessage({
              id: 'EditCompApplication.placeholderText0',
            })}
            value={this.state.comp}
            onChange={(val) => {
              this.onChangeComp(val)
            }}
            clear
            editable={this.state.editing}
          >
            <FormattedMessage id="EditCompApplication.listText0" />
          </InputItem>
          <InputItem
            type="text"
            placeholder={intl.formatMessage({
              id: 'EditCompApplication.placeholderText1',
            })}
            value={this.state.indus}
            onChange={(val) => {
              this.onChangeIndus(val)
            }}
            clear
            editable={this.state.editing}
          >
            <FormattedMessage id="EditCompApplication.listText1" />
          </InputItem>
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
              this.onChangeDate(val)
            }}
            disabled={!this.state.editing}
            minDate={moment(minDate.date, 'YYYYMMDD')}
            maxDate={moment(maxDate.date, 'YYYYMMDD')}
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
                this.onChangeStart(val)
              }}
              disabled={!this.state.editing}
              minuteStep={15}
              minDate={moment(minDate.start, 'HH:mm')}
              maxDate={moment(maxDate.end, 'HH:mm')}
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
                this.onChangeEnd(val)
              }}
              disabled={!this.state.editing}
              minuteStep={15}
              minDate={moment(minDate.start, 'HH:mm')}
              maxDate={moment(maxDate.end, 'HH:mm')}
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
      </div>
    )
  }
}

EditCompApplication.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
}

export default injectIntl(EditCompApplication)
