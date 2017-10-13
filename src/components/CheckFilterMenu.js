import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { List, Checkbox } from 'antd-mobile'

class CheckFilterMenu extends Component {
  constructor(props) {
    super(props)
    const { checked } = props
    this.state = {
      checked,
    }
  }

  onClickItem(status, idx) {
    const { onMenuChange } = this.props
    const nextChecked = [].concat(this.state.checked)
    nextChecked[idx] = status
    this.setState({
      checked: nextChecked,
    })
    onMenuChange(status, idx)
  }

  render() {
    const { onToggleMenu } = this.props
    const checkStatus = [0, 1]

    return (
      <div
        className="home-searchbar__filterMenu"
        onClick={onToggleMenu}
      >
        <List>
          {checkStatus.map((val) => (
            <Checkbox.CheckboxItem
              key={val}
              onClick={(e) => {
                this.onClickItem(e.target.checked, val)
              }}
              checked={this.state.checked[val]}
            >
              <FormattedMessage id={`Check.Status.text${val}`} />
            </Checkbox.CheckboxItem>
          ))}
        </List>
      </div>
    )
  }
}

CheckFilterMenu.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  onMenuChange: PropTypes.func.isRequired,
  checked: PropTypes.array,
}

CheckFilterMenu.defaultProps = {
  checked: [true, true],
}

export default CheckFilterMenu
