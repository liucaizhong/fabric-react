import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { List, ListView } from 'antd-mobile'
import _ from 'lodash'
import CustomSearchBar from './CustomSearchBar'

class SelectComp extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      isLoading: true,
      filter: '',
    }
  }

  componentDidMount() {
    const { getCompList } = this.props

    getCompList('/compListData.json', {
      method: 'GET',
    })
  }

  componentWillReceiveProps(nextProps) {
    const { compList } = nextProps

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(compList),
      isLoading: false,
    })
  }

  // onBack() {
  //   this.history.goBack()
  // }

  onChange(filter) {
    const { compList } = this.props
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        compList.filter((cur) => {
          return cur.name.includes(filter)
          || cur.code.includes(filter)
          || cur.indus.includes(filter)
        }),
      ),
    })
  }

  onClickItem(data) {
    const { onClickItem } = this.props
    onClickItem(data)
  }

  render() {
    const { onBack } = this.props

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
        <List.Item
          key={rowID}
          className="SelectComp__row"
          onClick={this.onClickItem.bind(this, rowData)}
        >
          <span>{rowData.name}</span>
          <span>{rowData.code}</span>
          <span>{rowData.indus}</span>
        </List.Item>
      )
    }

    return (
      <div>
        <CustomSearchBar
          placeholder="SelectComp.searchBarPlaceholder"
          toggleBar={onBack}
          onSubmit={_.debounce((val) => this.onChange(val), 500)}
          onChange={_.debounce((val) => this.onChange(val), 500)}
        />
        <ListView
          className="SelectComp__lv"
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

SelectComp.propTypes = {
  // intl: intlShape.isRequired,
  // history: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
  compList: PropTypes.array.isRequired,
  getCompList: PropTypes.func.isRequired,
}

export default SelectComp
