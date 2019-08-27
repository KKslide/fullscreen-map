<template>
  <div id="barChart" ref="barChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "PBarChart",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.9)', 'rgba(155,80,229,0.9)', 'rgba(13,99,175,0.9)', 'rgba(175,252,247,0.9)', 'rgba(72,160,188,0.9)', 'rgba(149,157,215,0.9)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)',
      baseLinerColor: [{
        startc: '#C9FFFF',
        endc: '#00DEF0'
      }, {
        startc: '#BFD8E8',
        endc: '#0089AF'
      }],
      pbarData: [6, 1588, 1985, 231, 4],
      dataX: ['3K以下', '3K-5K', '5K-10K', '10K-15K', '15K以上', ],
    }
  },
  mounted() {
    //console.log(this.data);
    this.getEchart1();
  },
  methods: {
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let barChart1 = this.$echarts.init(this.$el);
      let labelRight = {
        normal: {
          position: 'right',
        }
      };
      // 绘制图表
      barChart1.setOption({
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
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          position: 'bottom',
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true, // X轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
          data: this.dataX
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true, // Y轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
          splitLine: { show: false },
        },
        series: [{
          name: 'hill',
          type: 'pictorialBar',
          barCategoryGap: '-130%',
          barGap: '30%',
          barWidth: '60%',
          barMinHeight: '6',
          symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          // symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          label: {
            show: true,
            position: 'top',
            //formatter: "{d}%",
          },
          itemStyle: {
            normal: { //颜色渐变
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  { offset: 0, color: 'rgba(211,218,75,0.6)' },
                  { offset: 0.5, color: 'rgba(25,237,206,0.6)' },
                  { offset: 1, color: 'rgba(44,198,250,0.6)' }
                ]
              ),
              opcity: 0.5,
              shadowColor: 'rgba(255, 255, 255, 0.3)',
              shadowBlur: 6
            },
            emphasis: {
              opacity: 1
            }
          },
          data: this.pbarData,
          z: 10
        }, ]
      });
      window.addEventListener("resize", function() {
        barChart1.resize();
      });
    }
  },
  props: ['childClass', 'titleName']
};

</script>
<style lang="less">
#barChart1 {
  width: 100%;
  height: 50vh;
}

</style>
