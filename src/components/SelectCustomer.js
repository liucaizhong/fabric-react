import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ListView, Checkbox } from 'antd-mobile'
import _ from 'lodash'
import CustomSearchBar from './CustomSearchBar'

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
      filter: '',
      checkedCustomerList: [],
      showPerson: false,
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

    const checkedCustomerList = [].concat(customerList)
    const selectedCustomer = []

    customer.forEach((cur) => {
      const obj = checkedCustomerList.find((item) => {
        return item.cid === cur.cid
      })
      if (obj) {
        obj.checked = true
        selectedCustomer.push({
          comp: obj.name,
          cid: obj.cid,
          level: obj.level,
          sales: obj.sales,
          persons: [].concat(cur.pid),
        })
      }
    })

    checkedCustomerList.sort((a, b) => {
      let res = 0
      if (a.checked) {
        res -= 1
      }
      if (b.checked) {
        res += 1
      }
      return res || a.cid.localeCompare(b.cid)
    })

    console.log('checkedCustomerList', checkedCustomerList)
    console.log('selectedCustomer', selectedCustomer)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(checkedCustomerList),
      isLoading: false,
      checkedCustomerList,
      selectedCustomer,
    })
  }

  onBack() {
    const { onBack } = this.props
    onBack(this.state.checked)
  }

  onChange(filter) {
    const { customerList } = this.props
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        customerList.filter((cur) => {
          return cur.name.includes(filter)
          || cur.level.includes(filter)
          || cur.type.includes(filter)
          || cur.region.includes(filter)
          || cur.sales.includes(filter)
        }),
      ),
    })
  }

  onClickItem(status, idx, data) {
    console.log('status', status)
    console.log('idx', idx)
    console.log('data', data)
    const { level, multiCustomer, multiCustomerPerson } = this.props
    const newList = [].concat(this.state.checkedCustomerList)
    const newCustomer = [].concat(this.state.selectedCustomer)

    newList[idx].checked = !newList[idx].checked

    // 1: two level menu
    if (level) {
      console.log('multiCustomerPerson', multiCustomerPerson)
    } else if (multiCustomer) {
      // 0: one level menu
      const cIndex = newCustomer.findIndex((cur) => {
        return cur.cid === newList[idx].cid
      })
      if (cIndex === -1) {
        newCustomer.push({
          comp: newList[idx].name,
          cid: newList[idx].cid,
          level: newList[idx].level,
          sales: newList[idx].sales,
          persons: [],
        })
      } else if (!status) {
        newCustomer.splice(cIndex, 1)
      }
    } else {
      const cIndex = newCustomer.findIndex((cur) => {
        return cur.cid === newList[idx].cid
      })
      if (cIndex === -1) {
        let prevSelectedCustomer = newCustomer.pop()
        if (prevSelectedCustomer) {
          prevSelectedCustomer = newList.find((cur) => {
            return cur.cid === prevSelectedCustomer.cid
          })
          prevSelectedCustomer.checked = false
        }

        newCustomer.push({
          comp: newList[idx].name,
          cid: newList[idx].cid,
          level: newList[idx].level,
          sales: newList[idx].sales,
          persons: [],
        })
      } else if (!status) {
        newCustomer.splice(cIndex, 1)
      }
    }

    newList.sort((a, b) => {
      let res = 0
      if (a.checked) {
        res -= 1
      }
      if (b.checked) {
        res += 1
      }
      return res || a.cid.localeCompare(b.cid)
    })

    console.log('checkedCustomerList', newList)
    console.log('selectedCustomer', newCustomer)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newList),
      checkedCustomerList: newList,
      selectedCustomer: newCustomer,
    })
  }

  render() {
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
            <span>{rowData.name}</span>
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
      <div>customer persons</div> :
    [
      <CustomSearchBar
        placeholder="SelectCustomer.searchBarPlaceholder"
        toggleBar={this.onBack.bind(this)}
        onSubmit={_.debounce((val) => this.onChange(val), 500)}
        onChange={_.debounce((val) => this.onChange(val), 500)}
      />,
      <ListView
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
  level: 0, // 0: only show customer agency,1: show agency and persons
  customer: [],
}

export default SelectCustomer
