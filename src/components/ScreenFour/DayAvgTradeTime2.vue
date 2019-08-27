<template>
  <div id="dayAvgTradeTime" ref="dayAvgTradeTime"></div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.getChart();
  },
  methods: {
    getChart() {
      let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
      let myChart = this.$echarts.init(this.$refs.dayAvgTradeTime)
      let option = {
        // backgroundColor: '#0e2147',
        title: {
          show:false,
          text: '当天交易平均处理时间',
          left: 'center',
          top: '10%',
          textStyle: {
            color: '#fff',
            fontFamily: 'Arial',
            fontWeight: '400',
            fontSize: '35'
          }
        },
        grid: {
          left: '11%',
          top: '20%',
          right: '10%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          show: false,
        }],
        yAxis: [{
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16',
            }
          },
          data: ['交易类型1', '交易类型2', '交易类型3', '交易类型4', '交易类型5', '交易类型6', '交易类型7', '交易类型8', '交易类型9'].slice(0,5)
        },
        {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16',
            }
          },
          data: ['9', '8', '7', '6', '5', '4', '3', '2', '1'].slice(-5)
        },
        {
          show: false,
          name: '当前一分钟交易量',
          nameGap: '5',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: '16',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: [],
        }],
        series: [
          {
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [13, 25, 29, 38, 44, 50, 52, 60, 72].slice(0,5),
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#ffffff',
                  fontSize: '16',
                }
              }
            },
            barWidth: 12,
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
              }
            },
            z: 2
          }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [ 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5].slice(0,5),
            barWidth: 20,
            itemStyle: {
              normal: {
                color: '#0e2147',
                barBorderRadius: 5,
              }
            },
            z: 1
          }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [ 100, 100, 100, 100, 100, 100, 100, 100, 100].slice(0,5),
            barWidth: 25,
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
                barBorderRadius: 5,
              }
            },
            z: 0
          },
          {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0].slice(0,5),
            yAxisIndex: 2,
            symbolSize: 20,
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num]
                },
                opacity: 1,
              }
            },
            z: 2
          }
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
#dayAvgTradeTime {
  width: 100%;
  height: 100%;
}
</style>