import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { ListView, Checkbox } from 'antd-mobile'
import _ from 'lodash'
import CustomSearchBar from './CustomSearchBar'

const CheckboxItem = Checkbox.CheckboxItem

class SelectUser extends Component {
  constructor(props) {
    super(props)

    // this.history = props.history
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    const { editing, users } = props

    this.state = {
      dataSource,
      isLoading: true,
      filter: '',
      editing,
      all: [],
      checked: [].concat(users),
      unchecked: [],
    }
  }

  componentDidMount() {
    const { getUserList, userRole } = this.props

    getUserList(`/userListData.json?type=${userRole}`, {
      method: 'GET',
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps start')
    const { userList } = nextProps
    let { checked } = this.state
    checked = checked.map((cur) => {
      return {
        ...cur,
        checked: true,
      }
    }).sort((a, b) => {
      return a.id.localeCompare(b.id)
    })

    const unchecked = userList.filter((cur) => {
      cur.checked = false
      return !checked.find((obj) => {
        return obj.id === cur.id
      })
    }).sort((a, b) => {
      return a.id.localeCompare(b.id)
    })

    const all = checked.concat(unchecked)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        all,
      ),
      all,
      checked,
      unchecked,
      isLoading: false,
    })
  }

  onBack() {
    const { onBack } = this.props
    onBack(this.state.checked)
  }

  onClickItem(val, rowID) {
    console.log('click item checked value is:', val)

    let { checked, unchecked } = this.state
    const boundary = checked.length

    if (rowID < boundary) {
      unchecked = unchecked.concat({
        ...checked.splice(rowID, 1)[0],
        checked: false,
      }).sort((a, b) => {
        return a.id.localeCompare(b.id)
      })
    } else {
      checked = checked.concat({
        ...unchecked.splice(rowID - boundary, 1)[0],
        checked: true,
      }).sort((a, b) => {
        return a.id.localeCompare(b.id)
      })
    }

    const all = checked.concat(unchecked)

    this.setState({
      all,
      checked,
      unchecked,
      dataSource: this.state.dataSource.cloneWithRows(
        all,
      ),
    })
  }

  onChange(filter) {
    const { userList } = this.props
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        userList.filter((cur) => {
          return cur.id.includes(filter)
          || cur.name.includes(filter)
        }),
      ),
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
          onChange={(e) => {
            this.onClickItem(e.target.checked, rowID)
          }}
          checked={rowData.checked}
        >
          {rowData.name}
        </CheckboxItem>
      )
    }

    return (
      <div>
        <CustomSearchBar
          placeholder="SelectUser.searchBarPlaceholder"
          toggleBar={this.onBack.bind(this)}
          onSubmit={_.debounce((val) => this.onChange(val), 500)}
          onChange={_.debounce((val) => this.onChange(val), 500)}
        />
        <ListView
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
        />
      </div>
    )
  }
}

SelectUser.propTypes = {
  // history: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired,
  getUserList: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  userRole: PropTypes.string,
  users: PropTypes.array,
}

SelectUser.defaultProps = {
  editing: true,
  userRole: 'ALL',
  users: [],
}

export default SelectUser
