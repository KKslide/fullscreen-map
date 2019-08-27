<template>
  <div id="lineChart" ref="lineChart" :style="this.childClass1"></div>
</template>
<script>
let startIndex = 0;
export default {
  name: "LineChart",
  data() {
    return {
      isPlay: true,
      baseColor: ['rgba(44,198,250,0.9)', 'rgba(155,80,229,0.9)', 'rgba(175,252,247,0.9)', 'rgba(149,157,215,0.9)', 'rgba(72,160,188,0.9)', 'rgba(13,99,175,0.9)'],
      // baseColor: ['#3398DB', '#AFFCF7', '#959DD7', '#04AEE5', '#0D63AF', '#9E43F8'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228,0.8)',
      lineDataL1: ['今日购买金额', '今日购买等数', '今日开户数量'],
    }
  },
  mounted() {
    //console.log(this.childClass1);
    this.getLineChart();
    this.play();
  },
  methods: {
    getLineChart() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart = this.$echarts.init(this.$el);
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
          data: this.lineDataL,
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
          },
        },
        yAxis: {
          type: 'value',
          splitLine: { //X轴网格线修改
            show: false,
          },
          axisLine: {
            show: true, // Y轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
        },
        series: [{
            name: this.lineDataL1[0],
            type: 'line',
            //symbol: 'pin',
            //标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            // symbolSize: 10,
            smooth: true,
            lineStyle: {
              normal: {
                //type: 'dotted',
                //默认为solid实线dotted点线 dashed虚线
                shadowColor: 'rgba(255, 255, 255, 0.7)', //阴影颜色
                shadowBlur: 0, //阴影的模糊大小
                shadowOffsetX: 0, //阴影水平方向上的偏移距离
                shadowOffsetY: 0, //阴影垂直方向上的偏移距离
                opacity: 1, //图形透明度.支持从0到1 的数字
              }
            },
            itemStyle: {
              normal: {
                shadowColor: 'rgba(255, 255, 255, 0.7)',
                shadowBlur: 10
              }
            },
            data: []
          },
          {
            name: this.lineDataL1[1],
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
            name: this.lineDataL1[2],
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
          d3 = [],
          indexArr = [];
        startIndex++;
        for (let i = startIndex; i < that.lineData.data1.length; i++) {
          if (i < startIndex + 6) {
            d1.push(that.lineData.data1[i]);
            indexArr.push(that.lineData.dataX[i])
          }
        }
        for (let i = startIndex; i < that.lineData.data2.length; i++) {
          if (i < startIndex + 6) {
            d2.push(that.lineData.data2[i]);
          }
        }
        for (let i = startIndex; i < that.lineData.data3.length; i++) {
          if (i < startIndex + 6) {
            d3.push(that.lineData.data3[i]);
          }
        }

        if (d1.length < 6) {
          startIndex = -1;
        }

        lineChart.setOption({
          xAxis: [{
            data: indexArr
          }],
          series: [{
            name: that.lineDataL1[0],
            data: d1
          }, {
            name: that.lineDataL1[1],
            data: d2
          }, {
            name: that.lineDataL1[2],
            data: d3
          }]
        });
      }, 2000);
      // 使用刚指定的配置项和数据显示图表。
      if (that.isPlay) {
        lineChart.setOption(option);
      }
      window.addEventListener("resize", function() {
        lineChart.resize();
      });
    },
    //控制myChart1的暂停与开始
    play() {
      let that = this;
      let lineChart = document.getElementById('lineChart')
      lineChart.onclick = function() {
        that.isPlay = !that.isPlay;
        setInterval(() => {
          that.isPlay = true;
        }, 60000);
      }
    }
  },
  props: ['childClass1', 'lineData', 'titleName', 'lineDataL']
};

</script>
<style lang="less">
#lineChart {
  width: 100%;
  height: 32.8vh;
}

</style>
