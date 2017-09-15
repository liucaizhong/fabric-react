import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import CompApplyList from '../containers/CCompApplyList'
import CustomSearchBar from './CustomSearchBar'

class CompApplication extends Component {
  constructor(props) {
    super(props)

    this.history = props.history

    this.state = {
      showSearchBar: false,
    }
  }

  onBack() {
    this.history.goBack()
  }

  onToggleSearchBar(show) {
    this.setState({
      showSearchBar: !show,
    })
  }

  render() {
    return (
      <div>
        <NavBar
          className="Compapplication-navbar__div"
          iconName={null}
          leftContent={<Icon
            type="left"
            role="button"
            onClick={(e) => {
              e.preventDefault()
              this.onBack()
            }}
          />}
          rightContent={[
            <CustomSearchBar
              key="0"
              show={this.state.showSearchBar}
              toggleBar={this.onToggleSearchBar.bind(this)}
            />,
            <Icon
              key="1"
              role="button"
              type="search"
              style={{ marginRight: '0.32rem' }}
              onClick={(e) => {
                const showSearchBar = !this.state.showSearchBar
                this.setState({
                  showSearchBar,
                })
              }}
            />,
            <Link
              key="2"
              to={{
                pathname: '/edit-comp-apply',
                state: {
                  editing: true,
                },
              }}
            >
              <Icon
                type={require('../assets/icons/edit.svg')}
                size="xs"
              />
            </Link>,
          ]}
        >
          <FormattedMessage id="CompApplication.navTitle" />
        </NavBar>

        <CompApplyList
          history={this.history}
        />
      </div>
    )
  }
}

CompApplication.propTypes = {
  history: PropTypes.object.isRequired,
}

export default CompApplication
