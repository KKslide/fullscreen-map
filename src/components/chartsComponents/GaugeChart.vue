<template>
  <div id="myChart2" :style="this.childClass2"></div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      baseColor: [
        [0.25, '#3398DB'],
        [0.5, '#AFFCF7'],
        [1, '#959DD7']
      ],
      axisColor: 'rgba(255,255,255,0.5)',
      titleFontColor: 'rgba(80,178,240,0.8)',
      data: {
        dataX: ['2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01'],
        data1: [110, 152, 206, 336, 396],
        data2: [121, 165, 200, 333, 390],
        data3: [256, 172, 386, 345, 406]
      },
      baseLinerColor: [{
        startc: '#FAB4AA',
        endc: '#E4644F'
      }, {
        startc: '#AFFCF7',
        endc: '#08D6C6'
      }, {
        startc: '#FCE589',
        endc: '#FCCB05'
      }, {
        startc: '#B7E0FA',
        endc: '#038EEA'
      }]
    }
  },
  mounted() {
    this.getEchart2();
  },
  methods: {
    getEchart2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart2.setOption({
        title: {
          text: '百分比',
          left: 'left',
          padding: [15, 30],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '20'
          }
        },
        backgroundColor: '',
        grid: {
          top: '3%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [{
          name: '百分比',
          type: 'gauge',
          min: 0,
          max: 100,
          splitNumber: 10,
          radius: '80%',
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: this.baseColor,
              width: 3,
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          axisLabel: { // 坐标轴小标记
            textStyle: { // 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          axisTick: { // 坐标轴小标记
            length: 15, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          splitLine: { // 分隔线
            length: 25, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          pointer: { // 分隔线
            shadowColor: '#fff', //默认透明
            shadowBlur: 5
          },
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 18,
              fontStyle: 'italic',
              fontFamily: 'Arial',
              fontWeight: 'lighter',
              color: this.titleFontColor,
              shadowColor: '#fff', //默认透明
              shadowBlur: 15
            }
          },
          detail: {
            formatter: '{value}%',
            // backgroundColor: 'rgba(30,144,255,0.8)',
            // borderWidth: 1,
            // borderColor: '#fff',
            // shadowColor: '#fff', //默认透明
            // shadowBlur: 5,
            // offsetCenter: [0, '50%'], // x, y，单位px
            textStyle: {
              fontFamily: 'Arial',
              fontWeight: 'bolder',
              fontSize: 22
            }
          },
          // detail: { formatter: '{value}%' },
          data: [{ value: 89.1, name: '百分比' }]
        }]
      });
      window.addEventListener("resize", function() {
        myChart2.resize();
      });
    }
  },
  props: ['childClass2']
};

</script>
<style lang="less">
#myChart2 {
  width: 100%;
  height: 50vh;
}

</style>
