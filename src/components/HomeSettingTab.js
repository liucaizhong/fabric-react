import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { NavBar, WhiteSpace } from 'antd-mobile'
import HomeLoginCard from '../containers/CHomeLoginCard'
import HomeSettingList from './HomeSettingList'

const HomeSettingTab = ({ intl }) => (
  <div>
    <NavBar
      iconName={null}
      leftContent={intl.formatMessage({
        id: 'Home.SettingTab.navLeftText',
      })}
    />
    <HomeLoginCard />
    <WhiteSpace />
    <HomeSettingList />
  </div>
)

HomeSettingTab.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(HomeSettingTab)
