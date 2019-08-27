<template>
  <div id="areaChart"
       ref="areaChart"
       :style="this.childClass"></div>
</template>
<script>
export default {
  name: "AreaChart",
  data () {
    return {
      baseColor: ['rgba(0,188,198)', 'rgba(177,166,74,0.6)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228,0.8)',
      dataL: ['借款金额', '还款金额'],
      titleName: '近七日借/还款金额',
      areaData: {
        dataX: ['04.15', '04.16', '04.17', '04.18', '04.19', '04.20'],
        data1: [126.2, 556.3, 334.5, 490, 590, 120],
        data2: [126.2, 356.3, 534.5, 490, 390, 120]
      }
    }
  },
  mounted () {
    this.getLineChart();
  },
  methods: {
    getLineChart () {
      // 基于准备好的dom，初始化echarts实例
      let areaChart = this.$echarts.init(this.$el)
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
          data: this.areaData.dataX,
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
          name: this.dataL[0],
          type: 'line',
          //smooth: true,
          itemStyle: {
            normal: {
              shadowColor: 'rgba(255, 255, 255, 0.7)',
              shadowBlur: 10
            }
          },
          areaStyle: {},
          data: this.areaData.data1
        },
        {
          name: this.dataL[1],
          type: 'line',
          //smooth: true,
          itemStyle: {
            normal: {
              shadowColor: 'rgba(255, 255, 255, 0.7)',
              shadowBlur: 10
            }
          },
          areaStyle: {},
          data: this.areaData.data2
        }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      areaChart.setOption(option);
      window.addEventListener("resize", function () {
        areaChart.resize();
      });
    }
  },
  props: ['childClass']
};

</script>
<style lang="less">
#areaChart {
  width: 100%;
  height: 32.8vh;
}
</style>
