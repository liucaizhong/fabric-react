import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ListView, Checkbox, Icon } from 'antd-mobile'
import _ from 'lodash'
import CustomSearchBar from './CustomSearchBar'
import CheckFilterMenu from './CheckFilterMenu'
import SelectCustomerPerson from '../containers/CSelectUser'

const CheckboxItem = Checkbox.CheckboxItem

class SelectCustomer extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      isLoading: true,
      // filter: '',
      // checkedCustomerList: [],
      showFilterMenu: false,
      showPerson: false,
      checkedFilter: [true, true],
      contentFilter: '',
      selectedCustomer: [],
    }
  }

  componentDidMount() {
    const { getCustomerList } = this.props

    getCustomerList('/customerListData.json', {
      method: 'GET',
    })
  }

  componentWillReceiveProps(nextProps) {
    const { customerList, customer } = nextProps

    // const checkedCustomerList = [].concat(customerList)
    const selectedCustomer = []

    customer.forEach((cur) => {
      const obj = customerList.find((item) => {
        return item.cid === cur.cid
      })
      if (obj) {
        obj.checked = true
        selectedCustomer.push({
          comp: obj.name,
          cid: obj.cid,
          level: obj.level,
          sales: obj.sales,
          persons: [].concat(cur.persons),
        })
      }
    })

    // checkedCustomerList.sort((a, b) => {
    //   let res = 0
    //   if (a.checked) {
    //     res -= 1
    //   }
    //   if (b.checked) {
    //     res += 1
    //   }
    //   return res || a.cid.localeCompare(b.cid)
    // })

    console.log('selectedCustomer', selectedCustomer)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(customerList),
      isLoading: false,
      // checkedCustomerList,
      selectedCustomer,
    })
  }

  onBack() {
    const { onBack } = this.props
    onBack(this.state.selectedCustomer)
  }

  onClickItem(status, idx, data) {
    console.log('status', status)
    console.log('idx', idx)
    console.log('data', data)
    const { level,
      multiCustomer,
      multiCustomerPerson,
      customerList,
    } = this.props
    const newList = customerList.filter((cur) => {
      return this.filterStatus(cur, this.state.checkedFilter) &&
        this.filterContent(cur, this.state.contentFilter)
    })
    const newCustomer = [].concat(this.state.selectedCustomer)
    let showPerson = false

    if (level) {
      this.selectingCustomerCid = newList[idx].cid
      this.selectingCustomerUrl = `/personListData.json?cid=${newList[idx].cid}` // just for test
      // goto select person
      showPerson = true
    } else {
      newList[idx].checked = !newList[idx].checked
    }

    const cIndex = newCustomer.findIndex((cur) => {
      return cur.cid === newList[idx].cid
    })
    if (cIndex === -1) {
      if (!multiCustomer && !multiCustomerPerson && !level) {
        let prevSelectedCustomer = newCustomer.pop()
        if (prevSelectedCustomer) {
          prevSelectedCustomer = newList.find((cur) => {
            return cur.cid === prevSelectedCustomer.cid
          })
          prevSelectedCustomer.checked = false
        }
      }
      newCustomer.push({
        comp: newList[idx].name,
        cid: newList[idx].cid,
        level: newList[idx].level,
        sales: newList[idx].sales,
        persons: [],
      })
    } else if (!status) {
      if (!level) {
        newCustomer.splice(cIndex, 1)
      }
    }

    // if (multiCustomer || multiCustomerPerson) {
    //   if (cIndex === -1) {
    //     newCustomer.push({
    //       comp: newList[idx].name,
    //       cid: newList[idx].cid,
    //       level: newList[idx].level,
    //       sales: newList[idx].sales,
    //       persons: [],
    //     })
    //   } else if (!status) {
    //     if (!level) {
    //       newCustomer.splice(cIndex, 1)
    //     }
    //   }
    // } else {
    //   const cIndex = newCustomer.findIndex((cur) => {
    //     return cur.cid === newList[idx].cid
    //   })
    //   if (cIndex === -1) {
    //     let prevSelectedCustomer = newCustomer.pop()
    //     if (prevSelectedCustomer) {
    //       prevSelectedCustomer = newList.find((cur) => {
    //         return cur.cid === prevSelectedCustomer.cid
    //       })
    //       prevSelectedCustomer.checked = false
    //     }
    //
    //     newCustomer.push({
    //       comp: newList[idx].name,
    //       cid: newList[idx].cid,
    //       level: newList[idx].level,
    //       sales: newList[idx].sales,
    //       persons: [],
    //     })
    //   } else if (!status) {
    //     newCustomer.splice(cIndex, 1)
    //   }
    // }

    // newList.sort((a, b) => {
    //   let res = 0
    //   if (a.checked) {
    //     res -= 1
    //   }
    //   if (b.checked) {
    //     res += 1
    //   }
    //   return res || a.cid.localeCompare(b.cid)
    // })

    // console.log('checkedCustomerList', newList)
    console.log('selectedCustomer', newCustomer)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newList.map((row) => {
        return { ...row }
      }).filter((cur) => {
        return this.filterStatus(cur, this.state.checkedFilter)
      })),
      // checkedCustomerList: newList,
      selectedCustomer: newCustomer,
      showPerson,
    })
  }

  onChange(filter) {
    const { customerList } = this.props
    console.log('customerList', customerList)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        customerList.filter((cur) => {
          return this.filterStatus(cur, this.state.checkedFilter) &&
            this.filterContent(cur, filter)
        }),
      ),
      contentFilter: filter,
    })
  }

  onToggleMenu(e) {
    const destroy = (tagName) => tagName === 'DIV'
    if (destroy(e.target.tagName)) {
      this.toggleFilterMenu()
    }
  }

  onMenuChange(status, idx) {
    const newCheckedFilter = [].concat(this.state.checkedFilter)
    newCheckedFilter[idx] = status
    const { customerList } = this.props

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        customerList.filter((cur) => {
          return this.filterStatus(cur, newCheckedFilter) &&
            this.filterContent(cur, this.state.contentFilter)
        }),
      ),
      checkedFilter: newCheckedFilter,
    })
  }

  filterStatus(row, filter) {
    const f0 = filter[0] || filter[1]
    const f1 = (row.checked || false) === !filter[0]
    const f2 = (row.checked || false) === filter[1]
    return f0 && (f1 || f2)
  }

  filterContent(row, filter) {
    return row.name.includes(filter)
    || row.level.includes(filter)
    || row.type.includes(filter)
    || row.region.includes(filter)
    || row.sales.includes(filter)
  }

  toggleFilterMenu() {
    const showFilterMenu = !this.state.showFilterMenu
    this.setState({
      showFilterMenu,
    })
  }

  closeSelectPerson(persons) {
    const { customerList, multiCustomer, multiCustomerPerson } = this.props
    const newList = [].concat(customerList)
    let selectedCustomer = [].concat(this.state.selectedCustomer)
    const curCid = this.selectingCustomerCid

    console.log('curCid', curCid)
    if (!multiCustomer && !multiCustomerPerson) {
      selectedCustomer = selectedCustomer.filter((cur) => {
        const findListObj = newList.find((row) => {
          return row.cid === cur.cid
        })

        console.log('findListObj', findListObj)

        if (findListObj.cid !== curCid) {
          if (persons && persons.length) {
            console.log('cur0', cur)
            findListObj.checked = false
            return false
          }
        } else if (!persons || !persons.length) {
          console.log('cur1', cur)
          findListObj.checked = false
          return false
        } else {
          console.log('cur2', cur)
          findListObj.checked = true
          cur.persons = [...persons]
        }
        return true
      })
    } else {
      const findListObj = newList.find((cur) => {
        return cur.cid === curCid
      })
      if (findListObj) {
        if (persons && persons.length) {
          findListObj.checked = true
        } else {
          findListObj.checked = false
        }
      }

      const findIndex = selectedCustomer.findIndex((cur) => {
        return cur.cid === curCid
      })
      if (findIndex !== -1) {
        if (persons && persons.length) {
          selectedCustomer[findIndex].persons = [...persons]
        } else {
          selectedCustomer.splice(findIndex, 1)
        }
      }
    }

    console.log('selectedCustomer', selectedCustomer)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newList.map((row) => {
        return { ...row }
      }).filter((cur) => {
        return this.filterStatus(cur, this.state.checkedFilter) &&
          this.filterContent(cur, this.state.contentFilter)
      })),
      showPerson: false,
      selectedCustomer,
    })
  }

  render() {
    const { multiCustomerPerson } = this.props

    const footer = () => (<span>
      {this.state.isLoading
        ? <FormattedMessage id="HomeMeetingList.loadingText0" />
        : this.state.dataSource.getRowCount() ?
          <FormattedMessage id="HomeMeetingList.loadingText1" />
        : null
      }
    </span>)

    const row = (rowData, sectionID, rowID) => {
      // const { multiCustomer, multiCustomerPerson } = this.props
      return (
        <CheckboxItem
          key={rowID}
          className="Comp-applyList__row"
          onClick={(e) => {
            this.onClickItem(e.target.checked, rowID, rowData)
          }}
          extra={rowData.sales}
          checked={rowData.checked}
        >
          <div className="Comp-applyList__row-content">
            <div>
              <span>{rowData.name}</span>
            </div>
            <div>
              <span>{rowData.level}</span>
              <span>{rowData.type}</span>
              <span>{rowData.region}</span>
            </div>
          </div>
        </CheckboxItem>
      )
    }

    return this.state.showPerson ?
      <SelectCustomerPerson
        url={this.selectingCustomerUrl}
        multi={multiCustomerPerson}
        onBack={this.closeSelectPerson.bind(this)}
        users={this.state.selectedCustomer.find((cur) => {
          if (this.selectingCustomerCid) {
            return this.selectingCustomerCid === cur.cid
          }
          return false
        }).persons}
      /> :
    [
      <div key="0" className="SelectCustomer-navbar__div">
        <CustomSearchBar
          placeholder="SelectCustomer.searchBarPlaceholder"
          toggleBar={this.onBack.bind(this)}
          onSubmit={_.debounce((val) => this.onChange(val), 500)}
          onChange={_.debounce((val) => this.onChange(val), 500)}
        />
        <div className="SelectCustomer-navbar__btn">
          <a
            href="javascript:void(0);"
            role="button"
            onClick={(e) => {
              e.preventDefault()
              this.setState({
                showFilterMenu: true,
              })
            }}
          >
            <Icon
              type={require('../assets/icons/filter.svg')}
            />
          </a>
        </div>
      </div>,
      <ListView
        key="1"
        className="SelectCustomer-lv__div"
        dataSource={this.state.dataSource}
        renderFooter={footer}
        renderRow={row}
        renderSeparator={null}
        initialListSize={20}
        pageSize={6}
        useBodyScroll
        scrollRenderAheadDistance={500}
        scrollEventThrottle={200}
      />,
      this.state.showFilterMenu ?
        <CheckFilterMenu
          key="2"
          onToggleMenu={this.onToggleMenu.bind(this)}
          onMenuChange={this.onMenuChange.bind(this)}
          checked={this.state.checkedFilter}
          checkId={[0, 1]}
          checkStatus={[
            'Check.Status.text0',
            'Check.Status.text1',
          ]}
        />
      : null,
    ]
  }
}

SelectCustomer.propTypes = {
  // intl: intlShape.isRequired,
  // history: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  multiCustomer: PropTypes.bool,
  multiCustomerPerson: PropTypes.bool,
  level: PropTypes.number,
  customerList: PropTypes.array.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  customer: PropTypes.array,
}

SelectCustomer.defaultProps = {
  multiCustomer: false,
  multiCustomerPerson: false,
  level: 1, // 0: only show customer agency,1: show agency and persons
  customer: [],
}

export default SelectCustomer
