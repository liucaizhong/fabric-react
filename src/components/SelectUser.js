import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ListView, Checkbox, Icon } from 'antd-mobile'
import _ from 'lodash'
import CustomSearchBar from './CustomSearchBar'
import CheckFilterMenu from './CheckFilterMenu'

const CheckboxItem = Checkbox.CheckboxItem

class SelectUser extends Component {
  constructor(props) {
    super(props)

    // this.history = props.history
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        return row1 !== row2
      },
    })

    // const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
    // const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]
    //
    // const dataSource = new ListView.DataSource({
    //   getRowData,
    //   getSectionHeaderData: getSectionData,
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    //   sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    // })
    //
    // this.createDs = (ds, userList, checkedUser, users) => {
    //   const dataBlob = {}
    //   const sectionIDs = []
    //   const rowIDs = []
    //   Object.keys(userList).forEach((sectionID, index) => {
    //     sectionIDs.push(sectionID)
    //     dataBlob[sectionID] = sectionID
    //     rowIDs[index] = []
    //
    //     userList[sectionID].forEach((people, idx, arr) => {
    //       rowIDs[index].push(people.id)
    //
    //       const obj = users.find((user) => {
    //         return user.id === people.id
    //       })
    //
    //       if (obj) {
    //         people.checked = true
    //         checkedUser.push({
    //           id: people.id,
    //           name: people.name,
    //           phone: people.phone,
    //           title: people.title,
    //           dep: people.dep,
    //         })
    //       }
    //
    //       dataBlob[people.id] = people
    //     })
    //   })
    //   return {
    //     ds: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
    //     checkedUser,
    //   }
    // }

    const { editing } = props

    this.state = {
      dataSource,
      isLoading: true,
      // filter: '',
      editing,
      checkedUser: [],
      showFilterMenu: false,
      checkedFilter: [true, true],
      contentFilter: '',
    }
  }

  componentDidMount() {
    const { getUserList, url } = this.props

    getUserList(url, {
      method: 'GET',
    })
  }

  componentWillReceiveProps(nextProps) {
    const { userList, users } = nextProps
    const checkedUser = []

    // const obj = this.createDs(
    //   this.state.dataSource,
    //   userList,
    //   checkedUser,
    //   users,
    // )
    //
    // this.setState({
    //   dataSource: obj.ds,
    //   checkedUser: obj.checkedUser,
    //   isLoading: false,
    // })

    users.forEach((cur) => {
      const obj = userList.find((item) => {
        return item.id === cur.id
      })
      if (obj) {
        obj.checked = true
        checkedUser.push({
          id: obj.id,
          name: obj.name,
          phone: obj.phone,
          title: obj.title,
          dep: obj.dep,
        })
      }
    })

    // checkedUserList.sort((a, b) => {
    //   let res = 0
    //   if (a.checked) {
    //     res -= 1
    //   }
    //   if (b.checked) {
    //     res += 1
    //   }
    //   return res || a.id.localeCompare(b.id)
    // })

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(userList),
      checkedUser,
      isLoading: false,
    })
  }

  onBack() {
    const { onBack } = this.props
    onBack(this.state.checkedUser)
  }

  onClickItem(status, idx) {
    const { multi, userList } = this.props
    const newList = userList.filter((cur) => {
      return this.filterStatus(cur, this.state.checkedFilter) &&
        this.filterContent(cur, this.state.contentFilter)
    })
    const newUser = [].concat(this.state.checkedUser)

    newList[idx].checked = !newList[idx].checked

    if (multi) {
      const cIndex = newUser.findIndex((cur) => {
        return cur.id === newList[idx].id
      })

      if (cIndex === -1) {
        newUser.push({
          id: newList[idx].id,
          name: newList[idx].name,
          phone: newList[idx].phone,
          title: newList[idx].title,
          dep: newList[idx].dep,
        })
      } else if (!status) {
        newUser.splice(cIndex, 1)
      }
    } else {
      const cIndex = newUser.findIndex((cur) => {
        return cur.id === newList[idx].id
      })
      if (cIndex === -1) {
        let prevSelectedUser = newUser.pop()
        if (prevSelectedUser) {
          prevSelectedUser = newList.find((cur) => {
            return cur.id === prevSelectedUser.id
          })
          prevSelectedUser.checked = false
        }

        newUser.push({
          id: newList[idx].id,
          name: newList[idx].name,
          phone: newList[idx].phone,
          title: newList[idx].title,
          dep: newList[idx].dep,
        })
      } else if (!status) {
        newUser.splice(cIndex, 1)
      }
    }

    // newList.sort((a, b) => {
    //   let res = 0
    //   if (a.checked) {
    //     res -= 1
    //   }
    //   if (b.checked) {
    //     res += 1
    //   }
    //
    //   return res || a.id.localeCompare(b.id)
    // })

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newList.map((row) => {
        return { ...row }
      }).filter((cur) => {
        return this.filterStatus(cur, this.state.checkedFilter)
      })),
      checkedUser: newUser,
    })
  }

  onChange(filter) {
    const { userList } = this.props
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        userList.filter((cur) => {
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
    const { userList } = this.props

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        userList.filter((cur) => {
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
    return row.id.includes(filter)
    || row.name.includes(filter)
  }

  toggleFilterMenu() {
    const showFilterMenu = !this.state.showFilterMenu
    this.setState({
      showFilterMenu,
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
      return (
        <CheckboxItem
          key={rowID}
          className="SelectUser__row"
          disabled={!this.state.editing}
          onClick={(e) => {
            this.onClickItem(e.target.checked, rowID)
          }}
          checked={rowData.checked}
        >
          <div className="SelectUser__row-content">
            <span>{rowData.name}</span>
            <div>
              <span>{rowData.dep}</span>
              <span>{rowData.title}</span>
            </div>
          </div>
        </CheckboxItem>
      )
    }

    // const sectionHeader = (sectionData) => (
    //   <div>{sectionData}</div>
    // )

    return [
      <div key="0" className="SelectCustomer-navbar__div">
        <CustomSearchBar
          placeholder="SelectUser.searchBarPlaceholder"
          toggleBar={this.onBack.bind(this)}
          onSubmit={_.debounce((val) => this.onChange(val), 500)}
          onChange={_.debounce((val) => this.onChange(val), 500)}
        />
        <div className="SelectCustomer-navbar__btn">
          <a
            href="javascript:void(0)"
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
        className="SelectUser__lv"
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
      // <ListView.IndexedList
      //   key="1"
      //   className="SelectUser__lv"
      //   dataSource={this.state.dataSource}
      //   renderFooter={footer}
      //   renderSectionHeader={sectionHeader}
      //   renderRow={row}
      //   stickyHeader
      //   stickyProps={{
      //     stickyStyle: {
      //       zIndex: 89,
      //     },
      //   }}
      //   quickSearchBarStyle={{
      //     top: '1.5rem',
      //   }}
      //   delayTime={10}
      //   delayActivityIndicator={
      //     <div style={{ padding: '0.2rem', textAlign: 'center' }}>
      //       <FormattedMessage id="HomeMeetingList.loadingText0" />
      //     </div>
      //   }
      // />,
      this.state.showFilterMenu ?
        <CheckFilterMenu
          key="2"
          onToggleMenu={this.onToggleMenu.bind(this)}
          onMenuChange={this.onMenuChange.bind(this)}
          checked={this.state.checkedFilter}
        />
      : null,
    ]
  }
}

SelectUser.propTypes = {
  // history: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired,
  getUserList: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  url: PropTypes.string.isRequired,
  users: PropTypes.array,
  multi: PropTypes.bool,
}

SelectUser.defaultProps = {
  editing: true,
  // userRole: 'ALL',
  users: [],
  multi: false,
}

export default SelectUser
