import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { injectIntl, intlShape } from 'react-intl'
import { SearchBar, Icon } from 'antd-mobile'
import HomeFilterMenu from '../containers/CHomeFilterMenu'

class HomeSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilterMenu: false,
    }
  }

  onToggleMenu(e) {
    // e.preventDefault()
    const destroy = (tagName) => tagName === 'DIV'
    if (destroy(e.target.tagName)) {
      this.toggleFilterMenu()
    }
  }

  toggleFilterMenu() {
    const showFilterMenu = !this.state.showFilterMenu
    this.setState({
      showFilterMenu,
    })
  }

  render() {
    const { intl, onChange, onSubmit, roleId, onClickLink,
      meetingContentFilter } = this.props
    const { showFilterMenu } = this.state

    return (
      <div className="home-searchbar__div">
        <SearchBar
          placeholder={intl.formatMessage({
            id: 'Home.SearchBar.placeholder',
          })}
          maxLength={20}
          onChange={onChange}
          onSubmit={onSubmit}
          className="home-searchbar__input"
          defaultValue={meetingContentFilter}
        />
        {
          !roleId ?
            <div
              className="home-searchbar__btn"
            >
              <Link
                to={{
                  pathname: '/set-m',
                  search: '?m_id=',
                }}
                onClick={() => {
                  onClickLink({
                    statusStep: 0,
                  })
                }}
              >
                <Icon
                  type={require('../assets/icons/add.svg')}
                />
              </Link>
            </div>
          : null
        }
        <div className="home-searchbar__btn">
          <a
            href="javascript:void(0);"
            role="button"
            onClick={(e) => {
              e.preventDefault()
              this.toggleFilterMenu()
            }}
          >
            <Icon
              type={require('../assets/icons/filter.svg')}
            />
          </a>
        </div>
        {
          showFilterMenu ?
            <div>
              <HomeFilterMenu
                onToggleMenu={this.onToggleMenu.bind(this)}
              />
            </div>
          : null
        }
      </div>
    )
  }
}

HomeSearchBar.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired,
  onClickLink: PropTypes.func.isRequired,
  meetingContentFilter: PropTypes.string.isRequired,
}

export default injectIntl(HomeSearchBar)
