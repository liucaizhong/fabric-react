// home page
import React from 'react'
import PropTypes from 'prop-types'
import HomeTabBar from '../components/HomeTabBar'

const Home = ({ history }) => (
  <div>
    <HomeTabBar history={history} />
  </div>
)

Home.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Home
