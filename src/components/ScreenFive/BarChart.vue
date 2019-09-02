<template>
  <div id="barChart1"></div>
</template>
<script>
export default {
  name: "BarChart1",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.6)', 'rgba(175,252,247,0.6)', 'rgba(155,80,229,0.6)', 'rgba(13,99,175,0.6)', 'rgba(72,160,188,0.9)', 'rgba(149,157,215,0.9)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)',
      dataL: ['放款金额', '放款笔数'],
      barData: {
        dataY: ['笔数', '\n金额'],
        data1: [1034, ''],
        data2: ['', 502]
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
    //console.log(this.data);
    this.getEchart1();
  },
  methods: {
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let barChart1 = this.$echarts.init(document.getElementById('barChart1'));
      let labelRight = {
        normal: {
          position: 'right',
        }
      };
      // 绘制图表
      barChart1.setOption({
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
          top: '28%',
          left: '15%',
          right: '10%',
          bottom: '10%',
          containLabel: true
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
          data: this.barData.dataY
        },
        series: [
          {
            name: '放款金额',
            type: 'bar',
            barWidth: '25%', //柱条的宽度
            // barGap: '-100%', //不同系列的柱间距离
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
            data: this.barData.data1
          },
          {
            name: '放款笔数',
            type: 'bar',
            barWidth: '25%', //柱条的宽度
            // barGap: '50%', //不同系列的柱间距离
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
            data: this.barData.data2
          }
        ]
      });
      window.addEventListener("resize", function () {
        barChart1.resize();
      });
    }
  },
  props: []
};

</script>
<style lang="less" scoped>
#barChart1 {
  width: 100%;
  height: 100% !important;
}
</style>
