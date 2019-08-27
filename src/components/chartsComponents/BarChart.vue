<!--
  柱状加折线 
  childClass2 ：动态样式
  rbottomData：数据源
-->
<template>
  <div id="myChart1"
       :style="this.childClass2"></div>
</template>
<script>
export default {
  name: "BarChart",
  data () {
    return {
      baseColor: ['#A071B2', '#AFFCF7', '#959DD7'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(80,178,240,0.8)',
      dataL: ['广州', '珠海', '中山'],
      baseLinerColor: [{
        startc: '#C9FFFF',
        endc: '#00DEF0'
      }, {
        startc: '#BFD8E8',
        endc: '#0089AF'
      }]
    }
  },
  mounted () {
    //console.log(this.data);
    this.getEchart1();
  },
  methods: {
    getEchart1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart1.setOption({
        title: {
          text: '时点余额',
          left: 'left',
          padding: [15, 30],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '20'
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
          bottom: '2%',
          textStyle: {
            color: this.fontColor,
            fontSize: '80%'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.rbottomData.dataX,
          axisTick: {
            alignWithLabel: true
          },
          splitLine: { //x轴网格线修改
            show: false,
          },
          axisLine: {
            show: true, // X轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
        }],
        yAxis: [{
          type: 'value',
          splitLine: { //y轴网格线修改
            show: false,
          },
          axisLine: {
            show: true, // y轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          }

        }],
        series: [{
          name: this.dataL[0],
          type: 'bar',
          barWidth: '22%',
          barCategoryGap: '50%', //调整柱子宽度
          itemStyle: {
            emphasis: {
              barBorderRadius: 15
            },
            normal: {
              barBorderRadius: 15,
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: this.baseLinerColor[0].startc
                }, {
                  offset: 1,
                  color: this.baseLinerColor[0].endc
                }])
            }
          },
          barGap: 0,
          data: this.rbottomData.data1
        }, {
          name: this.dataL[1],
          type: 'bar',
          barWidth: '22%',
          barCategoryGap: '50%', //调整柱子宽度
          itemStyle: {
            emphasis: {
              barBorderRadius: 15
            },
            normal: {
              barBorderRadius: 15,
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1, [{
                  offset: 0,
                  color: this.baseLinerColor[1].startc
                }, {
                  offset: 1,
                  color: this.baseLinerColor[1].endc
                }])
            }
          },
          barGap: 0,
          data: this.rbottomData.data2
        }, {
          name: this.dataL[2],
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: { //颜色渐变
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#3398DB' },
                  { offset: 0.3, color: '#AFFCF7' },
                  { offset: 0.6, color: '#6E779F' },
                  { offset: 1, color: '#959DD7' }
                ]
              ),
              shadowColor: 'rgba(255, 255, 255, 0.7)',
              shadowBlur: 10
            }
          },
          data: this.rbottomData.data3
        }]
      });
      window.addEventListener("resize", function () {
        myChart1.resize();
      });
    }
  },
  props: ['childClass2', 'rbottomData']
};

</script>
<style lang="less">
#myChart1 {
  width: 100%;
  height: 50vh;
}
</style>
