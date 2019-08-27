<template>
  <div id="lineChart2" ref="lineChart2" :style="this.childClass1"></div>
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
      dataL: ['近24小时', '上24小时'],
    }
  },
  mounted() {
    console.log(this.titleName);
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
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '110%'
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
          bottom: 0,
          left: 'center',
          textStyle: {
            color: this.fontColor,
            fontSize: '80%'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '12%',
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
          }
        },
        series: [{
            name: this.dataL[0],
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10
              }
            },
            data: []
          },
          {
            name: this.dataL[1],
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10
              }
            },
            data: []
          }
        ]
      };
      var that = this;
      setInterval(function() {
        if (!that.isPlay) return;
        var d1 = [],
          d2 = [],
          indexArr = [];
        startIndex++;
        for (let i = startIndex; i < that.line2Data
          .data1.length; i++) {
          if (i < startIndex + 6) {
            d1.push(that.line2Data.data1[i]);
            indexArr.push(that.line2Data.dataX[i])
          }
        }
        for (let i = startIndex; i < that.line2Data.data2.length; i++) {
          if (i < startIndex + 6) {
            d2.push(that.line2Data.data2[i]);
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
      window.addEventListener("resize", function() {
        lineChart2.resize();
      });
    },
    //控制myChart1的暂停与开始
    play() {
      let that = this;
      let lineChart = document.getElementById('lineChart2')
      lineChart.onclick = function() {
        that.isPlay = !that.isPlay;
        setInterval(() => {
          that.isPlay = true;
        }, 60000);
      }
    }
  },
  props: ['childClass1', 'line2Data', 'titleName']
};

</script>
<style lang="less">
#lineChart2 {
  width: 100%;
  height: 32.8vh;
}

</style>
