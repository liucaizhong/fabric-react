import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { List, ListView, SwipeAction, Modal, Icon,
  RefreshControl, Toast } from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import moment from 'moment'

class CompApplyList extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      // isLoading: true,
      showHeader: false,
      refreshing: true,
      height: document.documentElement.clientHeight,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      height: this.state.height - findDOMNode(this.lv).offsetTop,
    }), 0)

    // register event handler for touchstart&touchmove
    this.lv.getInnerViewNode().addEventListener('touchstart', this.ts =
    (e) => {
      this.startY = e.touches[0].pageY
    })

    this.lv.getInnerViewNode().addEventListener('touchmove', this.tm =
    (e) => {
      this.endY = e.touches[0].pageY
      if (this.endY > this.startY && this.st <= 0 && document.body.scrollTop > 0) {
        this.domScroller.options.preventDefaultOnTouchMove = false
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined
      }
    })
    // const { getCompApplyList } = this.props
    //
    // getCompApplyList('/compApplyData.json', {
    //   method: 'GET',
    // })
  }

  componentWillReceiveProps(nextProps) {
    const { compApplyList } = this.props
    const { compApplyList: nextCompApplyList, compApplyFilter } = nextProps
    const preLen = compApplyList.length
    const delta = nextCompApplyList.length - preLen

    const loadCompApplyListPromise = new Promise((resolve, reject) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          nextCompApplyList.filter((cur) => {
            return cur.name.includes(compApplyFilter)
            || cur.indus.includes(compApplyFilter)
            || cur.code.includes(compApplyFilter)
            || this.applyStatus(cur.deadline).text.includes(compApplyFilter)
          }),
        ),
        // isLoading: false,
      }, resolve())
    })

    loadCompApplyListPromise.then(() => {
      const preRefreshing = this.state.refreshing
      setTimeout(() => {
        this.setState({
          showHeader: preRefreshing ? preLen ? delta || true : true : false,
          refreshing: false,
        })
      }, 1000)
    }).catch((err) => {
      console.log(err)
    })
  }

  componentWillUnmount() {
    this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts)
    this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm)
  }

  applyStatus = (deadline) => {
    const { intl, meetingDeadline } = this.props
    const d0 = moment(meetingDeadline, 'YYYYMMDD')
    const d1 = moment(deadline, 'YYYYMMDD')
    const d2 = moment()
    const flag = d2 <= moment.max(d0, d1)
    const text = flag
    ? intl.formatMessage({
      id: 'CompApplyList.applystatus0',
    })
    : intl.formatMessage({
      id: 'CompApplyList.applystatus1',
    })

    return {
      text,
      flag,
    }
  }

  // concatDateTimeStr = (rowData) => {
  //   return `${rowData.date} ${rowData.start}-${rowData.end}`
  // }

  clickListItem(data) {
    const { history } = this.props

    history.push('/apply-calendar', {
      code: data.code,
      indus: data.indus,
      name: data.name,
      id: data.id,
      // editing: false,
    })
    history.goForward()
  }

  render() {
    const { intl, getCompApplyList } = this.props

    const header = () => {
      if (this.state.showHeader) {
        setTimeout(() => {
          this.setState({
            showHeader: false,
          })
        }, 500)

        return typeof this.state.showHeader === 'boolean'
        ? (
          <FormattedMessage
            id="CompApplyList.newContentText0"
          />
        )
        : (
          <FormattedMessage
            id="CompApplyList.newContentText1"
            values={{
              num: this.state.showHeader,
            }}
          />
        )
      }
      return null
    }

    const footer = () => (<span>
      {this.state.refreshing ? null :
        this.state.isLoading
        ? (<FormattedMessage id="HomeMeetingList.loadingText0" />)
          : this.state.dataSource.getRowCount() ?
          (<FormattedMessage id="HomeMeetingList.loadingText1" />)
        : null}
    </span>)

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        className="Comp-applylist__separator"
      />
    )

    const row = (rowData, sectionID, rowID) => {
      const { updateCompApplyDeadline } = this.props
      const applyStatus = this.applyStatus(rowData.deadline)

      return (
        <SwipeAction
          key={rowID}
          right={[
            {
              text: intl.formatMessage({
                id: 'CompApplyList.modifyApplyDeadline',
              }),
              onPress: () => {
                return Modal.alert(intl.formatMessage({
                  id: 'CompApplyList.alertTitle0',
                }), intl.formatMessage({
                  id: 'CompApplyList.alertDesc0',
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
                    if (applyStatus.flag) {
                      Toast.fail(
                        intl.formatMessage({
                          id: 'CompApplyList.error0',
                        }),
                        2,
                        null,
                        true,
                      )
                    } else {
                      // todo: update database
                      const newDeadline = moment().add(5, 'days').format('YYYYMMDD')
                      updateCompApplyDeadline(+rowID, newDeadline)
                      this.lv.forceUpdate()
                    }
                  },
                }])
              },
              style: {
                backgroundColor: '#33A42A',
                color: 'white',
                fontSize: '0.26rem',
              },
            },
            {
              text: intl.formatMessage({
                id: 'Common.delete',
              }),
              onPress: () => {
                return Modal.alert(intl.formatMessage({
                  id: 'CompApplyList.alertTitle1',
                }), intl.formatMessage({
                  id: 'CompApplyList.alertDesc1',
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
                fontSize: '0.26rem',
              },
            },
          ]}
        >
          <List.Item
            className="Comp-applyList__row"
            onClick={this.clickListItem.bind(this, rowData)}
            extra={
              <div className="Comp-applyList__row-extra">
                <Icon
                  type={applyStatus.flag
                    ? require('../assets/icons/circular-green.svg')
                    : require('../assets/icons/circular-red.svg')
                  }
                  size="xs"
                />
                <span>{applyStatus.text}</span>
              </div>
            }
          >
            <div className="Comp-applyList__row-content">
              <span>{rowData.name}</span>
              <div>
                <span>{rowData.indus}</span>
                <span>{rowData.code}</span>
              </div>
            </div>
          </List.Item>
        </SwipeAction>
      )
    }

    const onRefresh = () => {
      if (!this.state.refreshing) {
        this.setState({ refreshing: true })
      }

      getCompApplyList('/compApplyData.json', {
        method: 'GET',
      })
    }

    const onScroll = (e) => {
      this.st = e.scroller.getValues().top
      this.domScroller = e
    }

    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 2

    return (
      <ListView
        ref={(el) => {
          this.lv = el
        }}
        className="Comp-applylist__div"
        style={{
          height: this.state.height,
        }}
        dataSource={this.state.dataSource}
        renderHeader={header}
        renderFooter={footer}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={10}
        pageSize={6}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={200}
        scrollerOptions={{ scrollbars: true }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={onRefresh}
            icon={[
              <div key="0" className="am-refresh-control-pull">
                <FormattedMessage id="HomeMeetingList.pullDownText" />
              </div>,
              <div key="1" className="am-refresh-control-release">
                <FormattedMessage id="HomeMeetingList.releaseText" />
              </div>,
            ]}
            distanceToRefresh={(50 / 2) * dpr}
          />
        }
        onScroll={onScroll}
      />
    )
  }
}

CompApplyList.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  getCompApplyList: PropTypes.func.isRequired,
  updateCompApplyDeadline: PropTypes.func.isRequired,
  compApplyList: PropTypes.array.isRequired,
  compApplyFilter: PropTypes.string.isRequired,
  meetingDeadline: PropTypes.string.isRequired,
}

export default injectIntl(CompApplyList)
