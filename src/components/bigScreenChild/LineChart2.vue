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
      dataL: ['昨日', '前日'],
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
          bottom: "1%",
          left: 'center',
          textStyle: {
            color: this.fontColor,
            fontSize: '20'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '13%',
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
          // 近24小时
          {
            name: this.dataL[0],
            type: 'line',
            smooth: true,
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
          // 上24小时
          {
            name: this.dataL[1],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#479df6'
                  },
                  {
                    offset: 1,
                    color: '#f95e74'
                  }
                ]),
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
            data: [] // 所有的
          }
        ]
      };
      var that = this;
      var timer = setInterval(function () {
        // clearInterval(timer);
        if (!that.isPlay) return;
        var d1 = [],
          d2 = [],
          indexArr = [];
        startIndex++;
        // 近24小时
        for (let i = startIndex; i < that.latest24Data.date24.length; i++) {
          if (i < startIndex + 6) {
            d1.push(that.latest24Data.date24[i]);
            indexArr.push(that.latest24Data.hour[i])
          }
        }
        // 上24小时
        for (let i = startIndex; i < that.latest24Data.date24_before.length; i++) {
          if (i < startIndex + 6) {
            d2.push(that.latest24Data.date24_before[i]);
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
  props: ['latest24Data', 'titleName']
};

</script>
<style lang="less">
#lineChart2 {
  width: 100%;
  height: 32.8vh;
}
</style>
