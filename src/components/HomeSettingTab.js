import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { NavBar, WhiteSpace } from 'antd-mobile'
import HomeLoginCard from '../containers/CHomeLoginCard'
import HomeSettingList from './HomeSettingList'

const HomeSettingTab = ({ intl, history }) => (
  <div>
    <NavBar
      iconName={null}
      leftContent={intl.formatMessage({
        id: 'Home.SettingTab.navLeftText',
      })}
    />
    <HomeLoginCard />
    <WhiteSpace />
    <HomeSettingList history={history} />
  </div>
)

HomeSettingTab.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
}

export default injectIntl(HomeSettingTab)
