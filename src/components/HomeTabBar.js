import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { TabBar, Icon } from 'antd-mobile'
import HomeMeetingTab from './HomeMeetingTab'
import HomeSettingTab from './HomeSettingTab'
import HomeNotesTab from './HomeNotesTab'

// let count = 0
class HomeTabBar extends Component {
  constructor(props) {
    super(props)

    const { hash } = props.location

    this.state = {
      selectedTab: hash.slice(1),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps.location
    this.setState({
      selectedTab: hash.slice(1),
    })
  }

  render() {
    // icon color is set to:
    // unselected:#cdcdcd, selected:#108ee9
    const barTintColor = '#fff'
    const { intl, history } = this.props

    return (
      <TabBar
        barTintColor={barTintColor}
      >
        <TabBar.Item
          key={'meetingList'}
          title={intl.formatMessage({
            id: 'Home.TabBar.title0',
          })}
          icon={
            <Icon
              type={require('../assets/icons/meeting.svg')}
              className="home-tabbar__icon"
            />
          }
          selectedIcon={
            <Icon
              type={require('../assets/icons/meeting-selected.svg')}
              className="home-tabbar__icon"
            />
          }
          selected={this.state.selectedTab === 'meetingList'}
          onPress={() => {
            // this.setState({
            //   selectedTab: 'meetingList',
            // })
            history.push({
              pathname: '/index',
              hash: '#meetingList',
            })
            history.goForward()
          }}
        >
          <HomeMeetingTab history={history} />
        </TabBar.Item>
        <TabBar.Item
          key={'notesList'}
          badge={5}
          title={intl.formatMessage({
            id: 'Home.TabBar.title1',
          })}
          icon={
            <Icon
              type={require('../assets/icons/notice.svg')}
              className="home-tabbar__icon"
            />
          }
          selectedIcon={
            <Icon
              type={require('../assets/icons/notice-selected.svg')}
              className="home-tabbar__icon"
            />
          }
          selected={this.state.selectedTab === 'notesList'}
          onPress={() => {
            // if (!count) {
            //   setTimeout(() => {
            //     if (count < 2) {
            //       console.log('click the notes tab')
            //     } else {
            //       console.log('dbclick the notes tab')
            //     }
            //     count = 0
            //   }, 200)
            // }
            // ++count
            // this.setState({
            //   selectedTab: 'notesList',
            // })
            history.push({
              pathname: '/index',
              hash: '#notesList',
            })
            history.goForward()
          }}
        >
          <HomeNotesTab />
        </TabBar.Item>
        <TabBar.Item
          key={'more'}
          title={intl.formatMessage({
            id: 'Home.TabBar.title2',
          })}
          icon={
            <Icon
              type={require('../assets/icons/more.svg')}
              className="home-tabbar__icon"
            />
          }
          selectedIcon={
            <Icon
              type={require('../assets/icons/more-selected.svg')}
              className="home-tabbar__icon"
            />
          }
          selected={this.state.selectedTab === 'more'}
          onPress={() => {
            // this.setState({
            //   selectedTab: 'more',
            // })
            history.push({
              pathname: '/index',
              hash: '#more',
            })
            history.goForward()
          }}
        >
          <HomeSettingTab history={history} />
        </TabBar.Item>
      </TabBar>
    )
  }
}

HomeTabBar.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default injectIntl(HomeTabBar)
