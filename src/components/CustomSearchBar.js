import React, { Component } from 'react'
import { SearchBar, Icon } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'

class CustomSearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: props.show,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
    })
  }

  render() {
    const { intl, toggleBar } = this.props

    return (
      <div style={{
        display: this.state.show ? 'block' : 'none',
      }}
      >
        <Icon
          className="custom-search-bar__icon"
          type={require('../assets/icons/left-back.svg')}
          role="button"
          onClick={(e) => {
            // clear search filter
            toggleBar(this.state.show)
          }}
          size="xs"
        />
        <SearchBar
          key="0"
          className="custom-search-bar"
          placeholder={intl.formatMessage({
            id: 'CustomSearchBar.placeholder',
          })}
          maxLength={20}
          cancelText={intl.formatMessage({
            id: 'Common.cancel',
          })}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      </div>
    )
  }
}

CustomSearchBar.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(CustomSearchBar)
