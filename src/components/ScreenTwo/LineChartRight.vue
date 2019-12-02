<template>
  <div id="lineChartRight" ref="lineChartRight"></div>
</template>

<script>
export default {
  data() {
    return {
      titleName: '近7天的交易趋势'
    }
  },
  methods: {
    getChart() {
      let lineChartRight = this.$echarts.init(this.$el)
      //   let xData = ['芝罘区', '福山区', '莱山区', '牟平区', '海阳市', '莱阳市', '蓬莱市', '栖霞市', '龙口市', '长岛县', '招远市', '莱州市', '开发区', '高新区', '昆嵛山', '龙海', '机场', '核电'];
      //   let y1Data = [10758, 3975, 2980, 1831, 2122, 3018, 3525, 1729, 2764, 380, 3988, 2333, 3596, 453, 365, 9, 67, 48];
      //   let y2Data = [28, 4.4, 5.9, 0.9, 0.7, 1.1, 2.1, 0.4, 1.9, 3.8, 1.6, 0.7, 5.7, 6.1, 0.7, 1.1, 28, 4.4];
      let xData = this.areaData.date,
        y1Data = this.areaData.data1,
        y2Data = this.areaData.data2,
        option = {
          title: {
            text: this.titleName,
            left: 'left',
            padding: [10, 20],
            textStyle: {
              color: "white",
              fontFamily: 'PingFang SC',
              fontWeight: '400',
              fontSize: '25.5'
            }
          },
          grid: {
            left: '12%',
            right: '12%',
            top: '25%',
            bottom: '12%',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['借款金额(万元)', '还款金额(万元)'],
            right: '3%',
            top: '5%',
            itemWidth: 11,
            itemHeight: 11,
            textStyle: {
              color: '#ffffff',
              fontSize: 15
            }
          },
          toolbox: {
            show: false,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              show: true,
              axisTick: {
                show: false
              },
              axisLabel: {
                fontSize: 13,
                color: '#d0d0d0',
                margin: 8,
                interval: 0,
                rotate: 20
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#4e608b',//左边线的颜色
                  width: '1'//坐标线的宽度
                }
              },
              data: xData
            }
          ],
          yAxis: [
            { // 左
              type: 'value',
              scale: true,
              name: '',
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: '#4e608b',//左边线的颜色
                  width: '1'//坐标线的宽度
                }
              },
              splitNumber: 4,
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: { // 使用深浅的间隔色
                  color: '#4e608b'
                }
              },
              axisLabel: {
                fontSize: 13,
                color: '#d0d0d0',
                margin: 12,
              },
              min: 0,
              max:'dataMax',
              boundaryGap: [0.2, 0.2]
            },
            { // 右
              type: 'value',
              scale: true,
              axisLine: {
                show: false,
                lineStyle: {
                  type: 'solid',
                  color: '#4e608b',//左边线的颜色
                  width: '1'//坐标线的宽度
                }
              },
              splitNumber: 3,
              axisTick: {
                show: false
              },
              axisLabel: {
                fontSize: 13,
                color: '#d0d0d0',
                margin: 12,
                show: false
              },
              splitLine: {
                lineStyle: {
                  // 使用深浅的间隔色
                  color: '#4e608b'
                }
              },
              name: '',
              min: 0,
              //   max: function (val) {
              //     if (val.max <= 10) return 10;
              //     let temp = val.max.toString().split("");
              //     temp[1] = parseInt(temp[1]) + 1;
              //     return temp.join("");
              //   },
              boundaryGap: [0.2, 0.2]
            },

          ],
          series: [
            { // 柱状
              name: '借款金额(万元)',
              yAxisIndex: 0,
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#1dacfe'
                  },
                  formatter: '{c}'
                }
              },
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#4889fb" // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: "#15b3ff" // 100% 处的颜色
                  }], false)
                }
              },
              barWidth: '40%',
              data: y1Data
            },
            { // 折线
              name: '还款金额(万元)',
              yAxisIndex: 0,
              type: 'line',
              color: '#ffd300',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#ffd300'
                  },
                  formatter: '{c}'
                }
              },
              lineStyle: {
                color: '#ffd300'
              },
              data: y2Data
            }
          ]
        };
      lineChartRight.setOption(option);
    }
  },
  mounted() {
    // this.getChart()
  },
  props: ['areaData'],
  watch: {
    areaData(nv, ov) {
      this.getChart()
    }
  }
}
</script>

<style lang="less" scoped>
#lineChartRight {
  width: 100%;
  height: 100%;
}
</style>