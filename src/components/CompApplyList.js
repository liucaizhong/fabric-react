import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, ListView, SwipeAction, Modal } from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

class CompApplyList extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      isLoading: true,
    }
  }

  componentDidMount() {
    const { getCompApplyList } = this.props

    getCompApplyList('/compApplyData.json', {
      method: 'GET',
    })
  }

  componentWillReceiveProps(nextProps) {
    const { compApplyList, compApplyFilter } = nextProps

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        compApplyList.filter((cur) => {
          return cur.comp.includes(compApplyFilter)
          || cur.date.includes(compApplyFilter)
          || cur.indus.includes(compApplyFilter)
          || cur.receptionist.includes(compApplyFilter)
        }),
      ),
      isLoading: false,
    })
  }

  concatDateTimeStr = (rowData) => {
    return `${rowData.date} ${rowData.start}-${rowData.end}`
  }

  clickListItem(data) {
    const { history } = this.props

    history.push('/edit-comp-apply', {
      editing: false,
      ...data,
    })
    history.goForward()
  }

  render() {
    const { intl } = this.props

    const footer = () => (<span>
      {this.state.isLoading
        ? <FormattedMessage id="HomeMeetingList.loadingText0" />
        : <FormattedMessage id="HomeMeetingList.loadingText1" />
      }
    </span>)

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        className="Comp-applylist__separator"
      />
    )

    const row = (rowData, sectionID, rowID) => {
      return (
        <SwipeAction
          key={rowID}
          right={[
            {
              text: 'Delete',
              onPress: () => {
                return Modal.alert(intl.formatMessage({
                  id: 'CompApplyList.alertTitle',
                }), intl.formatMessage({
                  id: 'CompApplyList.alertDesc',
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
                    console.log('confirm delete comp application')
                  },
                }])
              },
              style: {
                backgroundColor: '#F4333C',
                color: 'white',
              },
            },
          ]}
        >
          <List.Item
            className="Comp-applyList__row"
            onClick={this.clickListItem.bind(this, rowData)}
            extra={rowData.receptionist}
          >
            <div className="Comp-applyList__row-content">
              <div className="Comp-applyList__row-header">
                <span>{rowData.comp}</span>
              </div>
              <p className="Comp-applyList__row-date">
                {this.concatDateTimeStr(rowData)}
              </p>
              <div className="Comp-applyList__row-footer">
                <span>{rowData.indus}</span>
                <FormattedMessage
                  id={`CompApplyList.Form.text${rowData.form}`}
                />
              </div>
            </div>
          </List.Item>
        </SwipeAction>
      )
    }

    return (
      <ListView
        ref={(el) => {
          this.lv = el
        }}
        className="Comp-applylist__div"
        dataSource={this.state.dataSource}
        renderFooter={footer}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={10}
        pageSize={6}
        useBodyScroll
        scrollRenderAheadDistance={500}
        scrollEventThrottle={200}
      />
    )
  }
}

CompApplyList.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  getCompApplyList: PropTypes.func.isRequired,
  compApplyList: PropTypes.array.isRequired,
  compApplyFilter: PropTypes.string.isRequired,
}

export default injectIntl(CompApplyList)
