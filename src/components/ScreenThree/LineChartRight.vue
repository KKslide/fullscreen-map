<template>
  <div id="lineChart2" ref="lineChart2"></div>
</template>
<script>
let startIndex = 0;
export default {
  name: "lineChart2",
  data() {
    return {
      isPlay: true,
      baseColor: ['rgba(92,196,10)', 'rgba(209,205,211)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228,0.8)',
      dataL: ['自营', '陆金所', '京东', '拉卡拉', '比财'],
    }
  },
  mounted() {
    this.getLineChart();
    this.play();
  },
  methods: {
    getLineChart() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart2 = this.$echarts.init(this.$el)
      // 绘制图表
      let option = {
        title: {
          show: false,
          text: this.titleName,
          left: 'left',
          padding: [10, 20],
          textStyle: {
            color: "white",
            fontFamily: 'Arial',
            fontWeight: '',
            fontSize: '25'
          }
        },
        color: this.baseColor,
        backgroundColor: '',
        textStyle: {
          color: this.fontColor,
          fontSize: '80%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.dataL,
          bottom: "3%",
          left: 'center',
          textStyle: {
            color: this.fontColor,
            fontSize: '20'
          }
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '13%',
          top: "20%",
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          splitLine: { //X轴网格线修改
            show: false,
          },
          axisLine: {
            show: true, // X轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              // color: 'red',
              fontSize: 18
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: { //Y轴网格线修改
            show: false,
          },

          axisLine: {
            show: true, // Y轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              // color: 'red',
              fontSize: 18
            }
          }
        },
        series: [
          {
            name: this.dataL[0],
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#f7c368'
                },
                {
                  offset: 1,
                  color: '#fc4b4b'
                }]),
                opacity: 0.8,
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10
              }
            },
            areaStyle: { // 设置折线图区域渐变
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(247,195,104, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(252,75,75, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 12
                }
              }
            },
            data: []
          },
          {
            name: this.dataL[1],
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#479df6'
                },
                {
                  offset: 1,
                  color: '#f95e74'
                }]),
                opacity: 0.8,
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10
              }
            },
            areaStyle: { // 设置折线图区域渐变
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            data: []
          },
          {
            name: this.dataL[2],
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#479df6'
                },
                {
                  offset: 1,
                  color: '#f95e74'
                }]),
                opacity: 0.8,
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10,
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 12
                }
              }
            },
            areaStyle: { // 设置折线图区域渐变
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            data: []
          },
          {
            name: this.dataL[3],
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#479df6'
                },
                {
                  offset: 1,
                  color: '#f95e74'
                }]),
                opacity: 0.8,
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10,
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 12
                }
              }
            },
            areaStyle: { // 设置折线图区域渐变
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(197,234,175, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(112,229,193, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            data: []
          },
          {
            name: this.dataL[4],
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#479df6'
                },
                {
                  offset: 1,
                  color: '#f95e74'
                }]),
                opacity: 0.8,
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10,
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 12
                }
              }
            },
            areaStyle: { // 设置折线图区域渐变
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(197,234,175, 0.5)'
                }, {
                  offset: 0.8,
                  color: 'rgba(112,229,193, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            data: []
          }
        ]
      };
      var that = this;
      setInterval(function () {
        if (!that.isPlay) return;
        var d1 = [],
          d2 = [],
          d3 = [],
          d4 = [],
          d5 = [],
          indexArr = [];
        startIndex++;
        for (let i = startIndex; i < that.diffTradeWayData
          .data1.length; i++) {
          if (i < startIndex + 6) {
            d1.push(that.diffTradeWayData.data1[i]);
            indexArr.push(that.diffTradeWayData.date[i])
          }
        }
        for (let i = startIndex; i < that.diffTradeWayData.data2.length; i++) {
          if (i < startIndex + 6) {
            d2.push(that.diffTradeWayData.data2[i]);
            d3.push(that.diffTradeWayData.data3[i]);
            d4.push(that.diffTradeWayData.data4[i]);
            d5.push(that.diffTradeWayData.data5[i]);
          }
        }
        if (d1.length < 6) {
          startIndex = -1;
        }

        lineChart2.setOption({
          xAxis: [{
            data: indexArr
          }],
          series: [{
            name: that.dataL[0],
            data: d1
          }, {
            name: that.dataL[1],
            data: d2
          }, {
            name: that.dataL[2],
            data: d3
          }, {
            name: that.dataL[3],
            data: d4
          },{
            name: that.dataL[4],
            data: d5
          }]
        });
      }, 2000);
      // 使用刚指定的配置项和数据显示图表。
      // 使用刚指定的配置项和数据显示图表。
      if (that.isPlay) {
        lineChart2.setOption(option);
      }
      window.addEventListener("resize", function () {
        lineChart2.resize();
      });
    },
    //控制myChart1的暂停与开始
    play() {
      let that = this;
      let lineChart = document.getElementById('lineChart2')
      lineChart.onclick = function () {
        that.isPlay = !that.isPlay;
        setInterval(() => {
          that.isPlay = true;
        }, 60000);
      }
    }
  },
  props: ['diffTradeWayData', 'titleName']
};

</script>
<style lang="less" scoped>
#lineChart2 {
  width: 100%;
  height: 100%;
}
</style>
