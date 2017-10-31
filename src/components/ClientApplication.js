import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import ClientApplyList from '../containers/CClientApplyList'
import CustomSearchBar from './CustomSearchBar'
import CheckFilterMenu from './CheckFilterMenu'

class ClientApplication extends Component {
  constructor(props) {
    super(props)

    this.history = props.history
    this.initialEditing = props.location.state.editing
    this.axisData = props.location.state.data

    this.state = {
      showSearchBar: false,
      showFilterMenu: false,
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     editing: nextProps.location.state.editing,
  //   })
  // }

  onBack() {
    // update application list of curCompApplyPlan
    const { clientApplyList,
      updateCurCompApplyPlanApplyList } = this.props

    if (this.initialEditing) {
      updateCurCompApplyPlanApplyList(this.axisData, clientApplyList)
    }
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
    const { onChange, onSubmit, clientApplyFilter,
      clientApplyStatusFilter, onMenuChange } = this.props

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
              placeholder="ClientApplication.placeholder"
              defaultValue={clientApplyFilter}
            />,
            <Link
              key="1"
              style={{ marginRight: '0.32rem' }}
              to={{
                pathname: '/edit-client-apply',
                state: {
                  initialEditing: this.initialEditing,
                  axisData: this.axisData,
                  add: true,
                },
              }}
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
          <FormattedMessage id="ClientApplication.navTitle" />
        </NavBar>

        <ClientApplyList
          history={this.history}
          axisData={this.axisData}
          editing={this.initialEditing}
        />

        {this.state.showFilterMenu ?
          <CheckFilterMenu
            onToggleMenu={this.onToggleMenu.bind(this)}
            onMenuChange={onMenuChange}
            checked={clientApplyStatusFilter}
            checkId={[0, 1, 2, 3, 4]}
            checkStatus={[
              'ClientApplyList.applystatus0',
              'ClientApplyList.applystatus1',
              'ClientApplyList.applystatus2',
              'ClientApplyList.applystatus3',
              'ClientApplyList.applystatus4',
            ]}
          />
        : null}
      </div>
    )
  }
}

ClientApplication.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clientApplyList: PropTypes.array.isRequired,
  clientApplyFilter: PropTypes.string.isRequired,
  updateCurCompApplyPlanApplyList: PropTypes.func.isRequired,
  clientApplyStatusFilter: PropTypes.array.isRequired,
  onMenuChange: PropTypes.func.isRequired,
}

export default ClientApplication
