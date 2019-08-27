<template>
  <div ref="chart" :style="this.childClass2"></div>
</template>
<script>
var startIndex = 0;
export default {
  name: "PictorialBarChart",
  data() {
    return {
      baseColor: ['#3398DB', '#AFFCF7', '#959DD7'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'white',
      isPlay: true,
      dl11: [],
      dl12: [],
      dataL: ['广州', '珠海'],
      baseLinerColor: [{
        startc: '#31C9FA',
        endc: 'rgba(255,255,255,0.6)'
      }, {
        startc: '#B998D6',
        endc: 'rgba(255,255,255,0.6)'
      }]
    }
  },
  mounted() {
    //console.log(this.crightData);
    this.getEchart();
  },
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.chart)
      // 绘制图表
      let option = {
        title: {
          text: '近7天交易趋势',
          left: 'left',
          padding: [10, 20],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            // fontWeight: 'bold',
            fontSize: '30'
          }
        },
        color: this.baseColor,
        backgroundColor: '',
        textStyle: {
          color: this.fontColor,
          fontSize: '50%'
        },
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: {
//             type: 'cross',
//             label: {
//               backgroundColor: '#6a7985'
//             }
//           }
//         },
//         legend: {
//           data: this.dataL,
// 					top:'10%',
//           bottom: '2%',
//           textStyle: {
//             color: this.fontColor,
//             fontSize: '0',
//           }
//         },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.crightData.dataX,
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
        series: [{
          name: this.dataL[0],
          type: 'pictorialBar',
          barWidth: '80%',
          barGap: '-30%',
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              opacity: 0.5
            },
            emphasis: {
              opacity: 1
            }
          },
          data: [],
          z: 10
        }, {
          name: this.dataL[1],
          type: 'pictorialBar',
          barWidth: '80%',
          barGap: '-60%',
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              opacity: 0.5
            },
            emphasis: {
              opacity: 1
            }
          },
          data: [],
          z: 10
        }]
      };
      var that = this;
      setInterval(function() {
        if (!that.isPlay) return;
        var d1 = [],
          d2 = [],
          indexArr = [];
        startIndex++;
        for (let i = startIndex; i < that.crightData.data1.length; i++) {
          if (i < startIndex + 6) {
            d1.push(that.crightData.data1[i]);
            indexArr.push(that.crightData.dataX[i])
          }
        }
//         for (let i = startIndex; i < that.crightData.data1.length; i++) {
//           if (i < startIndex + 6) {
//             d2.push(that.crightData.data2[i]);
//           }
//         }

        if (d1.length < 6) {
          startIndex = -1;
        }

        myChart.setOption({
          xAxis: [{
            data: indexArr
          }],
          series: [{
            name: '广州',
            data: d1
          }, 
// 					{
//             name: '珠海',
//             data: d2
//           },
					]
        });
      }, 2000);
      // 使用刚指定的配置项和数据显示图表。
      if (that.isPlay) {
        myChart.setOption(option);
      }
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }

  },
  props: ['childClass2', 'crightData']
};

</script>
<style lang="less">
#pictorialBarChart {
  width: 100%;
  height: 50vh;
}

</style>
