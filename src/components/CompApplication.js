import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import CompApplyList from '../containers/CCompApplyList'
import CustomSearchBar from './CustomSearchBar'
import CheckFilterMenu from './CheckFilterMenu'

class CompApplication extends Component {
  constructor(props) {
    super(props)

    this.history = props.history

    this.state = {
      showSearchBar: false,
      showFilterMenu: false,
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

  onToggleMenu(e) {
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
    const { onChange, onSubmit, compApplyFilter,
      compApplyStatusFilter, onMenuChange } = this.props

    return (
      <div>
        <NavBar
          className="Compapplication-navbar__div"
          iconName={null}
          leftContent={[
            <Icon
              key="0"
              type="left"
              role="button"
              style={{ marginRight: '0.32rem' }}
              onClick={(e) => {
                e.preventDefault()
                this.onBack()
              }}
            />,
            <Icon
              key="1"
              role="button"
              type="search"
              onClick={(e) => {
                const showSearchBar = !this.state.showSearchBar
                this.setState({
                  showSearchBar,
                })
              }}
            />,
          ]}
          rightContent={[
            <CustomSearchBar
              key="0"
              show={this.state.showSearchBar}
              toggleBar={this.onToggleSearchBar.bind(this)}
              onSubmit={onSubmit}
              onChange={onChange}
              placeholder="CompApplication.placeholder"
              defaultValue={compApplyFilter}
            />,
            <Link
              key="1"
              to="/register-comp"
              style={{ marginRight: '0.32rem' }}
            >
              <Icon
                type={require('../assets/icons/edit.svg')}
                size="xs"
              />
            </Link>,
            <a
              key="2"
              href="javascript:void(0);"
              role="button"
              onClick={(e) => {
                e.preventDefault()
                this.setState({
                  showFilterMenu: true,
                })
              }}
            >
              <Icon
                type={require('../assets/icons/filter.svg')}
              />
            </a>,
          ]}
        >
          <FormattedMessage id="CompApplication.navTitle" />
        </NavBar>

        <CompApplyList
          history={this.history}
        />

        {this.state.showFilterMenu ?
          <CheckFilterMenu
            onToggleMenu={this.onToggleMenu.bind(this)}
            onMenuChange={onMenuChange}
            checked={compApplyStatusFilter}
            checkId={[0, 1, 2]}
            checkStatus={[
              'CompApplyList.applystatus0',
              'CompApplyList.applystatus1',
              'CompApplyList.applystatus2',
            ]}
            mine
          />
        : null}
      </div>
    )
  }
}

CompApplication.propTypes = {
  history: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  compApplyFilter: PropTypes.string.isRequired,
  compApplyStatusFilter: PropTypes.array.isRequired,
  onMenuChange: PropTypes.func.isRequired,
}

export default CompApplication
