<template>
  <div id="barChart"></div>
</template>
<script>
export default {
  name: "barChart",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.6)', 'rgba(175,252,247,0.6)', 'rgba(155,80,229,0.6)', 'rgba(13,99,175,0.6)', 'rgba(72,160,188,0.9)', 'rgba(149,157,215,0.9)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)',
      dataL: ['放款金额', '放款笔数'],
      barData: {
        type: ['O2O贷款业务', '联合授信业务'],
        data1: [1034, 1360],
        data2: [413, 502]
      },
      baseLinerColor: [{
        startc: '#C9FFFF',
        endc: '#00DEF0'
      }, {
        startc: '#BFD8E8',
        endc: '#0089AF'
      }]
    }
  },
  mounted() {
    // this.getEchart();
  },
  methods: {
    getEchart(val) {
      // 基于准备好的dom，初始化echarts实例
      let barChart = this.$echarts.init(document.getElementById('barChart'));
      let labelRight = {
        normal: {
          position: 'right',
        }
      };
      // 绘制图表
      barChart.setOption({
        title: {
          text: '按放款类型统计',
          left: 'left',
          padding: [10, 20],
          // show:false,
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
          fontSize: '0.16rem'
        },
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'
        },
        grid: {
          top: '20%',
          left: '32%',
          right: '18%',
          bottom: '5%',
          containLabel: true
        },
        legend: { // 不同系列的标记, 可以通过点击图例控制哪些系列不显示。
          show: false,
          //orient: 'vertical',
          bottom: '1%',
          data: this.dataL,
          textStyle: {
            color: 'white',
            fontSize: '20',
            padding: [0, 50, 0, 0]
          }
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: {
            show: true,
            textStyle: {
              color: this.fontColor,
              fontSize: '20%'
            }
          },
          axisTick: { show: false },
          splitLine: { show: false },
          data: val.type // 纵坐标
        },
        series: [
          {
            name: '放款金额',
            type: 'bar',
            barWidth: '15%', //柱条的宽度
            barGap: '80%', //不同系列的柱间距离
            barCategoryGap: '0%', //同一系列的柱间距离，默认为类目间距的20%
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            itemStyle: {
              normal: { //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#f7c368' },
                    { offset: 1, color: '#fc4b4b' }
                  ]
                ),
                opcity: 0.5,
                shadowColor: 'rgba(255, 255, 255, 0.3)',
                shadowBlur: 6,
                barBorderRadius: 7,
              },
              emphasis: {
                barBorderRadius: 7
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            data: val.data1
          },
          {
            name: '放款笔数',
            type: 'bar',
            barWidth: '15%', //柱条的宽度
            barGap: '80%', //不同系列的柱间距离
            itemStyle: {
              normal: { //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#44e5c5' },
                    { offset: 1, color: '#00a2ff' }
                  ]
                ),
                opcity: 0.5,
                shadowColor: 'rgba(255, 255, 255, 0.3)',
                shadowBlur: 6,
                barBorderRadius: 7
              },
              emphasis: {
                barBorderRadius: 7
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
            data: val.data2
          }
        ]
      });
      window.addEventListener("resize", function () {
        barChart.resize();
      });
    }
  },
  props: ['barChartData'],
  watch: {
    barChartData(nv, ov) {
      this.getEchart(nv)
    }
  }
};

</script>
<style lang="less" scoped>
#barChart {
  width: 100%;
  height: 100%;
}
</style>
