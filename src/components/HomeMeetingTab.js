import React from 'react'
import PropTypes from 'prop-types'
import HomeSearchBar from '../containers/CHomeSearchBar'
import HomeMeetingList from '../containers/CHomeMeetingList'

const HomeMeetingTab = ({ history }) => (
  <div>
    <HomeSearchBar />
    <HomeMeetingList history={history} />
  </div>
)

HomeMeetingTab.propTypes = {
  history: PropTypes.object.isRequired,
}

export default HomeMeetingTab
