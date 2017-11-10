import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import MeetingCardList from '../containers/CMeetingCardList'
import CustomSearchBar from './CustomSearchBar'

class MyAgenda extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      showSearchBar: false,
    }
  }

  onSubmit(val) {
    this.setState({
      filter: val,
    })
  }

  onChange(val) {
    console.log('the filter', val)
    this.setState({
      filter: val,
    })
  }

  onBack() {
    const { history } = this.props
    history.goBack()
  }

  onToggleSearchBar(show) {
    this.setState({
      showSearchBar: !show,
    })
  }

  render() {
    const { history } = this.props
    return (
      <div className="myagenda-div">
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
          ]}
          rightContent={[
            <CustomSearchBar
              key="0"
              show={this.state.showSearchBar}
              toggleBar={this.onToggleSearchBar.bind(this)}
              onSubmit={this.onSubmit.bind(this)}
              onChange={_.debounce(this.onChange.bind(this), 500)}
              placeholder="MyAgenda.placeholder"
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
        >
          <FormattedMessage id="MyAgenda.navTitle" />
        </NavBar>
        <MeetingCardList
          history={history}
          url="/agenda-calendar"
          contentFilter={this.state.filter}
        />
      </div>
    )
  }
}

MyAgenda.propTypes = {
  history: PropTypes.object.isRequired,
}

export default MyAgenda
