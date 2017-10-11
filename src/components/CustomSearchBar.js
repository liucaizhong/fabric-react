import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    const { intl, toggleBar, placeholder,
      onChange, onSubmit, defaultValue } = this.props

    // console.log('CustomSearchBar', this.props)

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
            toggleBar(this.state.show)
          }}
          size="xs"
        />
        <SearchBar
          className="custom-search-bar"
          placeholder={intl.formatMessage({
            id: placeholder,
          })}
          cancelText={intl.formatMessage({
            id: 'Common.cancel',
          })}
          onChange={onChange}
          onSubmit={onSubmit}
          defaultValue={defaultValue}
        />
      </div>
    )
  }
}

CustomSearchBar.propTypes = {
  intl: intlShape.isRequired,
  placeholder: PropTypes.string,
  toggleBar: PropTypes.func.isRequired,
  show: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
}

CustomSearchBar.defaultProps = {
  placeholder: 'CustomSearchBar.placeholder',
  show: true,
  defaultValue: '',
}

export default injectIntl(CustomSearchBar)
