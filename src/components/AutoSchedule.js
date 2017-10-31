import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { ActivityIndicator, NavBar, Icon, Result } from 'antd-mobile'
import moment from 'moment'
import StatisticDiagram from './StatisticDiagram'

class AutoSchedule extends Component {
  constructor(props) {
    super(props)

    // for test
    const { intl } = props
    const code = 2
    const result = {
      code,
      title: intl.formatMessage({
        id: `AutoSchedule.resultTitle${code}`,
      }),
      desc: intl.formatMessage({
        id: `AutoSchedule.resultDesc${code}`,
      }),
      comp: [100, 288, 260, 28],
      client: [150, 388, 360, 28],
    }


    this.state = {
      refresh: false,
      // result: null,
      ...result, // for test
    }
  }

  componentDidMount() {
    // get result by request from database
    // todo...
  }

  componentWillReceiveProps(nextProps) {
    // load result
    const { intl, curMeetingInfo } = this.props
    console.log('curMeetingInfo', curMeetingInfo)
    // 0: success, 1: fail, 2: none
    const code = 2
    const result = {
      code,
      title: intl.formatMessage({
        id: `AutoSchedule.resultTitle${code}`,
      }),
      desc: intl.formatMessage({
        id: `AutoSchedule.resultDesc${code}`,
      }),
      comp: [100, 288, 260, 28],
      client: [150, 388, 360, 28],
    }
    this.setState({
      ...result,
    })
  }

  onBack() {
    const { history } = this.props
    history.goBack()
  }

  onRefresh() {
    // todo: reschedule
    console.log('reshedule start')
    const start = moment()
    setTimeout(() => {
      const end = moment()
      console.log('interval', end.diff(start, 'seconds'))
    }, 1555)
    this.setState({
      comp: [100, 288, 28, 260],
    })
  }

  onDownload() {
    // todo: extract excel
    console.log('download start')
  }

  render() {
    const { intl } = this.props
    const resultIcon = [
      require('../assets/icons/success.svg'),
      require('../assets/icons/cross-fill.svg'),
      require('../assets/icons/clock.svg'),
    ]
    const echarts = [{
      mainTitle: intl.formatMessage({
        id: 'CompStatistic.mainTitle',
      }),
      subText: intl.formatMessage({
        id: 'CompStatistic.subText',
      }, {
        num: this.state.comp[0],
      }),
      legendText: [0, 1, 2, 3].map((i) => {
        return intl.formatMessage({
          id: `CompStatistic.legendText${i}`,
        })
      }),
      data: this.state.comp,
    }, {
      mainTitle: intl.formatMessage({
        id: 'ClientStatistic.mainTitle',
      }),
      subText: intl.formatMessage({
        id: 'ClientStatistic.subText',
      }, {
        num: this.state.client[0],
      }),
      legendText: [0, 1, 2, 3].map((i) => {
        return intl.formatMessage({
          id: `ClientStatistic.legendText${i}`,
        })
      }),
      data: this.state.client,
    }]

    return [
      <ActivityIndicator
        key="0"
        animating={this.state.refresh}
        toast
        text={intl.formatMessage({
          id: 'HomeMeetingList.loadingText0',
        })}
      />,
      <div
        key="1"
      >
        <NavBar
          className="Setmeeting-navbar__div"
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
            <Icon
              key="0"
              type={require('../assets/icons/refresh.svg')}
              style={{ marginRight: '0.32rem' }}
              role="button"
              onClick={(e) => {
                e.preventDefault()
                this.onRefresh()
              }}
            />,
            <Icon
              key="1"
              type={require('../assets/icons/download.svg')}
              role="button"
              onClick={(e) => {
                e.preventDefault()
                this.onDownload()
              }}
            />,
          ]}
        >
          <FormattedMessage id="AutoSchedule.navTitle" />
        </NavBar>
        <div className="Autoschedule-result__div">
          <Result
            img={
              <Icon
                type={resultIcon[this.state.code]}
                className="Autoschedule-result__icon"
              />
            }
            title={this.state.title}
            message={this.state.desc}
            style={{
              marginBottom: '0.18rem',
            }}
          />
          {echarts.map((d, i) => {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: '#fff',
                  marginBottom: '0.18rem',
                }}
              >
                <StatisticDiagram
                  mainTitle={d.mainTitle}
                  subText={d.subText}
                  legendText={d.legendText}
                  data={d.data}
                />
              </div>
            )
          })}
        </div>
      </div>,
    ]
  }
}

AutoSchedule.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  curMeetingInfo: PropTypes.object.isRequired,
}

export default injectIntl(AutoSchedule)
