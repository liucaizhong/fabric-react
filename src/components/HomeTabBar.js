import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { TabBar, Icon } from 'antd-mobile'
import HomeMeetingTab from './HomeMeetingTab'
import HomeSettingTab from './HomeSettingTab'
import HomeNotesTab from './HomeNotesTab'

class HomeTabBar extends Component {
  state = {
    selectedTab: 'meetingList',
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
            this.setState({
              selectedTab: 'meetingList',
            })
          }}
        >
          <HomeMeetingTab history={history} />
        </TabBar.Item>
        <TabBar.Item
          key={'addMeeting'}
          dot
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
          selected={this.state.selectedTab === 'addMeeting'}
          onPress={() => {
            this.setState({
              selectedTab: 'addMeeting',
            })
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
            this.setState({
              selectedTab: 'more',
            })
          }}
        >
          <HomeSettingTab />
        </TabBar.Item>
      </TabBar>
    )
  }
}

HomeTabBar.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
}

export default injectIntl(HomeTabBar)
