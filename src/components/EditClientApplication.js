import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  NavBar,
  Icon,
  List,
  TextareaItem,
  Toast,
  WhiteSpace,
  Button,
  Modal,
  InputItem,
} from 'antd-mobile'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
// import SelectUser from '../containers/CSelectUser'
import SelectCustomer from '../containers/CSelectCustomer'

const FIELDS = ['id', 'cid', 'comp', 'level', 'pid', 'guest', 'title',
  'sales', 'demand']

class EditClientApplication extends Component {
  constructor(props) {
    super(props)

    this.initialEditing = props.location.state.editing
    this.history = props.history
    this.axisData = props.location.state.axisData
    console.log('this.axisData', this.axisData)
    const data = props.location.state.data.d || props.location.state.data

    this.state = {
      ...FIELDS.reduce((t, k) => {
        return Object.assign(t, {
          [k]: data[k],
        })
      }, {}),
      editing: props.location.state.editing,
      // showSelectUser: false,
      showSelectCustomer: false,
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
    const { intl } = this.props
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
        if (k !== 'id' && k !== 'demand' && !obj[k]) {
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
        // updateCurCompApplyPlan(data)
        // this.history.goBack()
      } else {
        // todo: submit to database
        // updateCurCompApplyPlan(data)
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

  onChangeTitle(title) {
    this.setState({
      title,
    })
  }

  onChangeDemand(demand) {
    this.setState({
      demand,
    })
  }

  // closeSelectUser(sales) {
  //   this.setState({
  //     showSelectUser: false,
  //     sales,
  //   })
  // }
  //
  // openSelectUser() {
  //   this.setState({
  //     showSelectUser: true,
  //   })
  // }

  openSelectCustomer() {
    if (this.state.editing) {
      this.setState({
        showSelectCustomer: true,
      })
    }
  }

  closeSelectCustomer([customer]) {
    this.setState({
      showSelectCustomer: false,
      ...customer,
    })
  }

  render() {
    // const { intl, curMeetingInfo, curCompInfo } = this.props
    const { intl } = this.props

    return this.state.showSelectCustomer ?
      <SelectCustomer
        onBack={this.closeSelectCustomer.bind(this)}
        level={0}
        customer={[{
          cid: this.state.cid,
          pid: [this.state.pid],
        }]}
      />
      : (
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
            <FormattedMessage id="EditClientApplication.navTitle" />
          </NavBar>
          <List
            className="Editclientapplication-list__div"
            renderHeader={() => (
              <span>
                {`${this.axisData.date} ${this.axisData.start}-${this.axisData.end}`}
              </span>
            )}
          >
            <List.Item
              extra={
                this.state.guest || intl.formatMessage({
                  id: 'EditClientApplication.extraText0',
                })
              }
              onClick={this.openSelectCustomer.bind(this)}
            >
              <FormattedMessage id="EditClientApplication.listText0" />
            </List.Item>
            <InputItem
              value={this.state.title}
              onChange={(val) => {
                this.onChangeTitle(val)
              }}
              editable={this.state.editing}
              clear
            >
              <FormattedMessage id="EditClientApplication.listText1" />
            </InputItem>
            <InputItem
              value={this.state.comp}
              editable={false}
            >
              <FormattedMessage id="EditClientApplication.listText2" />
            </InputItem>
            <InputItem
              value={this.state.level}
              editable={false}
            >
              <FormattedMessage id="EditClientApplication.listText3" />
            </InputItem>
            <InputItem
              value={this.state.sales}
              editable={false}
            >
              <FormattedMessage id="EditClientApplication.listText4" />
            </InputItem>
            <TextareaItem
              rows={4}
              count={50}
              value={this.state.demand}
              clear
              placeholder={intl.formatMessage({
                id: 'EditClientApplication.placeholderText5',
              })}
              onChange={(val) => {
                this.onChangeDemand(val)
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
                  id: 'EditClientApplication.alertTitle0',
                }), intl.formatMessage({
                  id: 'EditClientApplication.alertDesc0',
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

                    if (this.initialEditing) {
                      // deleteCurCompApplyPlan({
                      //   date,
                      //   start,
                      //   end,
                      // })
                      // this.history.goBack()
                    } else {
                      // todo: submit to database
                      // deleteCurCompApplyPlan({
                      //   date,
                      //   start,
                      //   end,
                      // })
                      // this.history.goBack()
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

EditClientApplication.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // curMeetingInfo: PropTypes.object.isRequired,
  // curCompInfo: PropTypes.object.isRequired,
}

export default injectIntl(EditClientApplication)
