import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { NavBar } from 'antd-mobile'

const HomeNotesTab = ({ intl }) => (
  <div>
    <NavBar
      iconName={null}
      leftContent={intl.formatMessage({
        id: 'Home.NotesTab.navLeftText',
      })}
    />
  </div>
)

HomeNotesTab.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(HomeNotesTab)
