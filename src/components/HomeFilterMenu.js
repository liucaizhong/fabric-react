import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { List, Checkbox } from 'antd-mobile'

class HomeFilterMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [...props.checked],
    }
  }

  render() {
    const { onToggleMenu, onMenuChange } = this.props
    const meetingStatus = [0, 1, 2, 3, 4]

    return (
      <div
        className="home-searchbar__filterMenu"
        onClick={onToggleMenu}
      >
        <List>
          {meetingStatus.map((val) => (
            <Checkbox.CheckboxItem
              key={val}
              onChange={(e) => {
                const nextChecked = [...this.state.checked]
                nextChecked[val] = e.target.checked
                this.setState({
                  checked: nextChecked,
                }, onMenuChange(e, val))
              }}
              checked={this.state.checked[val]}
            >
              <FormattedMessage id={`Meeting.Status.text${val}`} />
            </Checkbox.CheckboxItem>
          ))}
        </List>
      </div>
    )
  }
}

HomeFilterMenu.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  onMenuChange: PropTypes.func.isRequired,
  checked: PropTypes.array.isRequired,
}

export default HomeFilterMenu
