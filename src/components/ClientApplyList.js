import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { List, ListView, SwipeAction, Modal, RefreshControl } from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

class ClientApplyList extends Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.initialEditing = props.editing
    console.log('props', props)

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
  }

  componentWillReceiveProps(nextProps) {
    const { clientApplyList } = this.props
    const { clientApplyList: nextClientApplyList,
      clientApplyFilter } = nextProps
    const preLen = clientApplyList.length
    const delta = nextClientApplyList.length - preLen

    const loadClientApplyListPromise = new Promise((resolve, reject) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          nextClientApplyList.filter((cur) => {
            return cur.comp.includes(clientApplyFilter)
            || cur.guest.includes(clientApplyFilter)
            || cur.level.includes(clientApplyFilter)
            || cur.sales.includes(clientApplyFilter)
          }),
        ),
        // isLoading: false,
      }, resolve())
    })

    loadClientApplyListPromise.then(() => {
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
    // update application list of curCompApplyPlan
    const { axisData, clientApplyList,
      updateCurCompApplyPlanApplyList } = this.props
    updateCurCompApplyPlanApplyList(axisData, clientApplyList)
  }

  // concatDateTimeStr = (rowData) => {
  //   return `${rowData.date} ${rowData.start}-${rowData.end}`
  // }

  clickListItem(data) {
    const { history, axisData } = this.props

    history.push('/edit-client-apply', {
      editing: this.initialEditing,
      axisData,
      data,
    })
    history.goForward()
  }

  render() {
    const { intl, getClientApplyList } = this.props

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
            id="ClientApplyList.newContentText0"
          />
        )
        : (
          <FormattedMessage
            id="ClientApplyList.newContentText1"
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
      return (
        <SwipeAction
          key={rowID}
          right={[
            {
              text: intl.formatMessage({
                id: 'Common.delete',
              }),
              onPress: () => {
                return Modal.alert(intl.formatMessage({
                  id: 'ClientApplyList.alertTitle0',
                }), intl.formatMessage({
                  id: 'ClientApplyList.alertDesc0',
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
                    if (this.initialEditing) {
                      const { deleteClientApplyList } = this.props
                      deleteClientApplyList(rowData)
                    } else {
                      // todo: submit to database
                      const { deleteClientApplyList } = this.props
                      deleteClientApplyList(rowData)
                    }
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
            extra={rowData.sales}
          >
            <div className="Comp-applyList__row-content">
              <span>{rowData.comp}</span>
              <div>
                <span>{rowData.guest}</span>
                <span>{rowData.level}</span>
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

      if (!this.firstLoad) {
        this.firstLoad = true
        const { axisData, loadClientApplyList } = this.props
        const listData = axisData.d && axisData.d.application
        if (listData && listData.length) {
          loadClientApplyList(listData)
        } else {
          this.setState({ refreshing: false })
        }
      } else {
        getClientApplyList('/clientApplyList.json', {
          method: 'GET',
        })
      }
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

ClientApplyList.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  // curMeetingInfo: PropTypes.object.isRequired,
  // curCompInfo: PropTypes.object.isRequired,
  clientApplyList: PropTypes.array.isRequired,
  clientApplyFilter: PropTypes.string.isRequired,
  getClientApplyList: PropTypes.func.isRequired,
  loadClientApplyList: PropTypes.func.isRequired,
  deleteClientApplyList: PropTypes.func.isRequired,
  updateCurCompApplyPlanApplyList: PropTypes.func.isRequired,
}

export default injectIntl(ClientApplyList)
