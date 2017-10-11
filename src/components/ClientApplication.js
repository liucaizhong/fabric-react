import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import ClientApplyList from '../containers/CClientApplyList'
import CustomSearchBar from './CustomSearchBar'

class ClientApplication extends Component {
  constructor(props) {
    super(props)

    this.history = props.history
    this.axisData = props.location.state.data

    this.state = {
      showSearchBar: false,
      editing: props.location.state.editing,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editing: nextProps.location.state.editing,
    })
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
    const { onChange, onSubmit, clientApplyFilter } = this.props

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
              onSubmit={onSubmit}
              onChange={onChange}
              placeholder="ClientApplication.placeholder"
              defaultValue={clientApplyFilter}
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
                pathname: '/edit-client-apply',
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
          <FormattedMessage id="ClientApplication.navTitle" />
        </NavBar>

        <ClientApplyList
          history={this.history}
          axisData={this.axisData}
          editing={this.state.editing}
        />
      </div>
    )
  }
}

ClientApplication.propTypes = {
  history: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clientApplyFilter: PropTypes.string.isRequired,
}

export default ClientApplication
