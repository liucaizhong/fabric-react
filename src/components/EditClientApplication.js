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
  'sales', 'demand', 'status']

class EditClientApplication extends Component {
  constructor(props) {
    super(props)

    this.initialEditing = props.location.state.initialEditing
    this.add = props.location.state.add
    this.history = props.history
    this.axisData = props.location.state.axisData
    console.log('this.axisData', this.axisData)
    let data = props.location.state.data
    if (data && data.d) {
      data = Object.assign({}, data.d)
    }

    this.state = {
      ...(data ? FIELDS.reduce((t, k) => {
        return Object.assign(t, {
          [k]: data[k],
        })
      }, {}) : {}),
      editing: props.location.state.editing || this.add,
      // showSelectUser: false,
      showSelectCustomer: false,
    }
    console.log('state', this.state)
  }

  onCancel() {
    if (this.add) {
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
    const { intl, updateClientApplyList } = this.props
    const data = {
      ...FIELDS.reduce((t, k) => {
        return Object.assign(t, {
          [k]: this.state[k],
        })
      }, {}),
    }

    console.log('data', data)
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
        updateClientApplyList(data)
        this.history.goBack()
      } else {
        // todo: submit to database
        updateClientApplyList(data)
        if (this.add) {
          this.history.goBack()
        } else {
          this.setState({
            editing: !this.state.editing,
          })
        }
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
    // todo...
    console.log('back customer', customer)
    const person = customer.persons[0]
    const newCustomer = {
      cid: customer.cid,
      comp: customer.comp,
      level: customer.level,
      sales: customer.sales,
      guest: person && person.name,
      pid: person && person.id,
      title: person && person.title,
    }
    this.setState({
      showSelectCustomer: false,
      ...newCustomer,
    })
  }

  render() {
    // const { intl, curMeetingInfo, curCompInfo } = this.props
    const { intl, deleteClientApplyList } = this.props

    return this.state.showSelectCustomer ?
      <SelectCustomer
        onBack={this.closeSelectCustomer.bind(this)}
        customer={[{
          cid: this.state.cid,
          persons: [{
            id: this.state.pid,
            name: this.state.guest,
            title: this.state.title,
          }],
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
          {this.state.editing && !this.add ?
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
                      deleteClientApplyList({
                        cid: this.state.cid,
                        pid: this.state.pid,
                      })
                      this.history.goBack()
                    } else {
                      // todo: submit to database
                      deleteClientApplyList({
                        cid: this.state.cid,
                        pid: this.state.pid,
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

EditClientApplication.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // curMeetingInfo: PropTypes.object.isRequired,
  // curCompInfo: PropTypes.object.isRequired,
  updateClientApplyList: PropTypes.func.isRequired,
  deleteClientApplyList: PropTypes.func.isRequired,
}

export default injectIntl(EditClientApplication)
