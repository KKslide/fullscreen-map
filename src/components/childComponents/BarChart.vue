<template>
  <div id="barChart1" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "BarChart1",
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
        title: {
          text: '交易...情况',
          left: 'left',
          padding: [10, 10],
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
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
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
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: ['five', 'four', 'three', 'two', 'one']
        },
        series: [{
            name: '辅助',
            type: 'bar',
            stack: '总量',
            barWidth: '80%', //柱条的宽度
            barGap: '30%', //不同系列的柱间距离
            barCategoryGap: '80%', //同一系列的柱间距离，默认为类目间距的20%
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [0, 500, 700, 450, 100]
          },
          {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            barWidth: '80%', //柱条的宽度
            barGap: '30%', //不同系列的柱间距离
            barCategoryGap: '80%', //同一系列的柱间距离，默认为类目间距的20%
            itemStyle: {
              normal: { //颜色渐变
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: 'rgba(44,198,250,0.6)' },
                    { offset: 0.6, color: 'rgba(155,80,229,0.6)' },
                    { offset: 1, color: 'rgba(175,252,247,0.6)' }
                  ]
                ),
                opcity: 0.5,
                shadowColor: 'rgba(255, 255, 255, 0.3)',
                shadowBlur: 6
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: [1500, 700, 300, 900, 1300]
          }
        ]
      });
      window.addEventListener("resize", function() {
        barChart1.resize();
      });
    }
  },
  props: ['childClass']
};

</script>
<style lang="less">
#barChart1 {
  width: 100%;
  height: 50vh;
}

</style>
