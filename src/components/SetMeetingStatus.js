import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { Steps, Button, Modal } from 'antd-mobile'

const SetMeetingStatus = ({ intl, currentStep, onChangeSteps, steps }) => (
  <div className="meetingStatus-container">
    <div>
      <FormattedMessage id="SetMeeting.statusText" />
      <Button
        type="primary"
        size="small"
        className="meetingStatus-container__btn"
        onClick={(e) => {
          return Modal.alert(intl.formatMessage({
            id: 'SetMeetingStatus.alertTitle',
          }), intl.formatMessage({
            id: 'SetMeetingStatus.alertDesc',
          }), [{
            text: intl.formatMessage({
              id: 'Common.cancel',
            }),
            onPress: () => {},
          }, {
            text: intl.formatMessage({
              id: 'Common.confirm',
            }),
            onPress: () => {
              onChangeSteps(currentStep + 1)
            },
          }])
        }}
      >
        <FormattedMessage id="SetMeeting.nextStatusText" />
      </Button>
    </div>
    <Steps current={currentStep} size="small">
      {
        steps.map(
          (s, i) => (
            <Steps.Step
              key={i}
              title={s.title}
              className={i === currentStep ? 'active' : null}
            />
          ),
        )
      }
    </Steps>
  </div>
)

SetMeetingStatus.propTypes = {
  intl: intlShape.isRequired,
  currentStep: PropTypes.number,
  steps: PropTypes.array.isRequired,
  onChangeSteps: PropTypes.func.isRequired,
}

SetMeetingStatus.defaultProps = {
  currentStep: 0,
}

export default injectIntl(SetMeetingStatus)
