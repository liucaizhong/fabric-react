import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd-mobile'

class HomeLoginCard extends Component {
  render() {
    const { name, comp, avatar } = this.props
    const HeaderTitle = () => (
      <div className="home-setting__cardHeaderTitle">
        <span>{name}</span>
        <span>{comp}</span>
      </div>
    )

    return (
      <Card full className="home-setting__card">
        <Card.Header
          title={<HeaderTitle />}
          thumb={avatar}
        />
      </Card>
    )
  }
}

HomeLoginCard.propTypes = {
  name: PropTypes.string,
  comp: PropTypes.string,
  avatar: PropTypes.node,
}

HomeLoginCard.defaultProps = {
  name: '',
  comp: '',
  avatar: require('../assets/images/login-avatar.png'),
}

export default HomeLoginCard
