import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BarEchart from './BarEchart'
import PieEchart from './PieEchart'

class StatisticDiagram extends Component {
  constructor(props) {
    super(props)

    const { mainTitle, subText, legendText, data } = props

    this.state = {
      mainTitle,
      subText,
      legendText,
      data,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mainTitle, subText, legendText, data } = nextProps
    this.setState({
      mainTitle,
      subText,
      legendText,
      data,
    })
  }

  render() {
    return [
      <div
        key="0"
        style={{
          paddingTop: '0.3rem',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        <span>{this.state.mainTitle}</span>
      </div>,
      <BarEchart
        key="1"
        style={{
          padding: '0.3rem 0',
          height: '5rem',
        }}
        option={{
          legend: {
            textStyle: {
              fontSize: '25',
            },
            data: this.state.legendText,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: [''],
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                fontSize: '22',
              },
            },
          ],
          series: [
            {
              name: this.state.legendText[0],
              type: 'bar',
              data: [this.state.data[0]],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: '22',
                },
              },
            },
            {
              name: this.state.legendText[1],
              type: 'bar',
              data: [this.state.data[1]],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: '22',
                },
              },
            },
            {
              name: this.state.legendText[2],
              type: 'bar',
              stack: this.state.legendText[1],
              data: [this.state.data[2]],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: '22',
                },
              },
            },
            {
              name: this.state.legendText[3],
              type: 'bar',
              stack: this.state.legendText[1],
              data: [this.state.data[3]],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: '22',
                },
              },
            },
          ],
        }}
      />,
      <PieEchart
        key="2"
        style={{
          padding: '0.3rem 0',
          height: '5rem',
        }}
        option={{
          title: {
            subtext: this.state.subText,
            x: 'center',
            subtextStyle: {
              fontSize: '22',
            },
          },
          legend: {
            orient: 'vertical',
            left: '30',
            top: '40',
            textStyle: {
              fontSize: '25',
            },
            data: this.state.legendText.slice(2),
          },
          color: ['#1D4386', '#F13611'],
          series: [
            {
              name: this.state.legendText[1],
              type: 'pie',
              radius: [0, '70%'],
              center: ['50%', '60%'],
              data: this.state.data.slice(2).map((v, i) => {
                return {
                  value: v,
                  name: this.state.legendText[i + 2],
                  label: {
                    normal: {
                      show: true,
                      fontSize: '22',
                      formatter: '{b} : {c} ({d}%)',
                    },
                  },
                }
              }),
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }}
      />,
    ]
  }
}

StatisticDiagram.propTypes = {
  mainTitle: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  legendText: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}

export default StatisticDiagram
