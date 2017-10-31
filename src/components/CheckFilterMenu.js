import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { List, Checkbox } from 'antd-mobile'

class CheckFilterMenu extends Component {
  constructor(props) {
    super(props)
    const checked = [...props.checked]
    // const lastChecked = checked.pop()
    // checked.push(lastChecked.mine)
    this.state = {
      checked,
    }
  }

  onClickItem(status, idx) {
    const { onMenuChange } = this.props
    const nextChecked = [...this.state.checked]
    nextChecked[idx] = status
    this.setState({
      checked: nextChecked,
    })
    onMenuChange(status, idx)
  }

  render() {
    const { onToggleMenu, checkId, checkStatus, mine } = this.props

    return (
      <div
        className="home-searchbar__filterMenu"
        onClick={onToggleMenu}
      >
        <List>
          {mine ?
            <Checkbox.CheckboxItem
              key={checkId.length}
              onClick={(e) => {
                this.onClickItem(e.target.checked, checkId.length)
              }}
              checked={this.state.checked[checkId.length]}
            >
              <FormattedMessage id={'Common.mine'} />
            </Checkbox.CheckboxItem>
          : null}
          {checkId.map((val) => (
            <Checkbox.CheckboxItem
              key={val}
              onClick={(e) => {
                this.onClickItem(e.target.checked, val)
              }}
              checked={this.state.checked[val]}
            >
              <FormattedMessage id={checkStatus[val]} />
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
  checked: PropTypes.array.isRequired,
  checkId: PropTypes.array.isRequired,
  checkStatus: PropTypes.array.isRequired,
  mine: PropTypes.bool,
}

CheckFilterMenu.defaultProps = {
  mine: true,
}

export default CheckFilterMenu
