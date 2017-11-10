import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { ListView, List, Icon, RefreshControl } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'

class HomeMeetingList extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      // isLoading: false,
      showHeader: false,
      refreshing: true,
      // hasMore: false,
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
  }

  componentWillReceiveProps(nextProps) {
    const { meetingList } = this.props
    const { meetingList: nextMeetingList,
      statusFilter, contentFilter } = nextProps
    const preLen = meetingList.length
    const delta = nextMeetingList.length - preLen

    const loadMeetingListPromise = new Promise((resolve, reject) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          nextMeetingList.filter((cur) => {
            return statusFilter[cur.statusStep] &&
          (cur.name.includes(contentFilter) || cur.desc.includes(contentFilter)
          || this.concatDatesStr(cur.dates).includes(contentFilter))
          }),
        ),
        // refreshing: false,
      }, resolve())
    })

    loadMeetingListPromise.then(() => {
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

  concatDatesStr = (dates) => {
    const start = dates[0].date
    const end = dates[dates.length - 1].date

    return `${start} - ${end}`
  }

  switchRouter = (statusStep) => {
    const { history } = this.props

    switch (statusStep) {
      case 0:
        history.push('/apply')
        break
      default:
    }
    history.goForward()
  }

  render() {
    const { getMeetingList, clickLink, roleId } = this.props

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        className="Home-meetingList__separator"
      />
    )

    const row = (rowData, sectionID, rowID) => {
      return (
        <List.Item
          className="Home-meetingList__row"
          key={rowID}
          multipleLine
          onClick={() => {
            clickLink(rowData)
            this.switchRouter(rowData.statusStep)
          }}
        >
          <div className="Home-meetingList__row-content">
            <div className="Home-meetingList__row-header">
              <span>{rowData.name}</span>
              {!roleId ?
                <div>
                  <Link
                    to={{
                      pathname: '/set-m',
                      // search: `?m_id=${rowData.id}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      clickLink(rowData)
                    }}
                    style={{ marginRight: '0.22rem' }}
                  >
                    <Icon
                      type={require('../assets/icons/edit-meeting.svg')}
                      size="sm"
                    />
                  </Link>
                  <Link
                    to={{
                      pathname: '/schedule',
                      // search: `?m_id=${rowData.id}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      clickLink(rowData)
                    }}
                  >
                    <Icon
                      type={require('../assets/icons/run.svg')}
                      size="sm"
                    />
                  </Link>
                </div>
              : null}
            </div>
            <p className="Home-meetingList__row-desc">{rowData.desc}</p>
            <div className="Home-meetingList__row-footer">
              <span>{this.concatDatesStr(rowData.dates)}</span>
              <FormattedMessage
                id={`Meeting.Status.text${rowData.statusStep}`}
              />
            </div>
          </div>
        </List.Item>
      )
    }

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
            id="HomeMeetingList.newContentText0"
          />
        )
        : (
          <FormattedMessage
            id="HomeMeetingList.newContentText1"
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

    const onRefresh = () => {
      if (!this.state.refreshing) {
        this.setState({ refreshing: true })
      }

      getMeetingList('/meetingListData.json', {
        method: 'GET',
      })
    }

    // not use temporarily
    // onEndReached={onEndReached}
    // onEndReachedThreshold={20}
    // const onEndReached = () => {
    //   // not trigger by first loading
    //   if (!this.initialLoading) {
    //     this.initialLoading = true
    //     return false
    //   }
    //   // not trigger by 1.is loading or 2.not has more records
    //   if (this.state.isLoading && !this.state.hasMore) {
    //     return false
    //   }
    //
    //   this.setState({ isLoading: true })
    //   setTimeout(() => {
    //     this.rData = [ ...this.rData, ...genData(++pageIndex) ]
    //     console.log('reachEnd', this.rData)
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //       isLoading: false,
    //     })
    //   }, 1000)
    // }

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
        className="Home-meetingList__div"
        style={{
          height: this.state.height,
        }}
        dataSource={this.state.dataSource}
        renderHeader={header}
        renderFooter={footer}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={6}
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

HomeMeetingList.propTypes = {
  // intl: intlShape.isRequired,
  getMeetingList: PropTypes.func.isRequired,
  clickLink: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  statusFilter: PropTypes.array.isRequired,
  contentFilter: PropTypes.string.isRequired,
  roleId: PropTypes.number.isRequired,
}

export default injectIntl(HomeMeetingList)
