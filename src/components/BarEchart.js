import React, { Component } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legendScroll'

class BarEchart extends Component {
  componentDidMount() {
    this.init()
  }

  componentDidUpdate() {
    this.init()
  }

  init() {
    const { option } = this.props
    const chart = echarts.getInstanceByDom(this.el) || echarts.init(this.el)

    chart.setOption(option)
    window.onresize = () => {
      chart.resize()
    }
  }

  render() {
    const { style } = this.props

    return (
      <div
        ref={(el) => {
          this.el = el
        }}
        style={style}
      />
    )
  }
}

BarEchart.propTypes = {
  style: PropTypes.object,
  option: PropTypes.object,
}

BarEchart.defaultProps = {
  style: {
    width: '100%',
    height: '3.6rem',
  },
  option: {},
}

export default BarEchart
