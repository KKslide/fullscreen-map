<template>
  <div id="pictorialBarChart" ref="chart" :style="this.childClass2"></div>
</template>
<script>
var startIndex = 0;
export default {
  name: "PictorialBarChart",
  data() {
    return {
      baseColor: ['red', '#AFFCF7', '#959DD7'],
      axisColor: 'rgba(255,255,255,0.8)',
      fontColor: 'white',
      titleFontColor: 'white',
      isPlay: true,
      dl11: [],
      dl12: [],
      // dataL: ['广州', '珠海'],
      dataL: ['haha'],
      baseLinerColor: [{
        startc: '#31C9FA',
        endc: 'rgba(255,255,255,0.6)'
      }, {
        startc: '#B998D6',
        endc: 'rgba(255,255,255,0.6)'
      }],
      crightData: {
        dataX: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
      }
    }
  },
  mounted() {
    // console.log(this.crightData);

    this.getEchart();


  },
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById('pictorialBarChart'))
      let myChart = this.$echarts.init(this.$refs.chart)
      // 绘制图表
      let option = {
        title: {
          show: false,
          text: '当天每个小时交易量',
          left: 'center',
          top: '10',
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: '400',
            fontSize: '35'
          }
        },
        color: this.baseColor,
        // color:rgba(46,97,210,0.36),
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
              backgroundColor: '#6a7985',
              show: false,
            }
          }
        },
        legend: {
          data: this.dataL,
          top: '10%',
          textStyle: {
            color: this.fontColor,
            fontSize: '0'
          }
        },
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.crightData.dataX,
          //横坐标倾斜不间隔显示
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "white",
              fontSize: "14"
            },
          },
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
            },
          },
        }],
        yAxis: [{
          type: 'value',
          splitLine: { //x轴网格线修改
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "white",
              fontSize: "14"
            },
          },
          axisLine: {
            show: true, // X轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
        }],
        series: [
          {
            name: this.dataL[0],
            // type: 'pictorialBar',
            type: 'bar',
            barWidth: '50%',
            barGap: '-30%',
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            // barCategoryGap: '-130%',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{c}',
                textStyle: {
                  fontSize: 18,
                  color: 'white'
                }
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(225,59,31,0.87)'
                },
                {
                  offset: 0.03,
                  color: 'rgba(225,59,31,0.85)'
                },
                {
                  offset: 0.48,
                  color: 'rgba(136,78,121,0.62)'
                },
                {
                  offset: 0.96,
                  color: 'rgba(54,95,203,0.36)'
                },
                {
                  offset: 1,
                  color: 'rgba(46,97,210,0.36)'
                }]),
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            data: [],
            z: 10
          }
        ]
      };
      var that = this;
      setInterval(function () {
        if (!that.isPlay) return;
        var d1 = [],
          // d2 = [],
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
            name: '',
            data: d1
          },
            // 					{
            //             name: '珠海',
            //             data: d2
            //           },
          ]
        });
      }, 3000);
      // 使用刚指定的配置项和数据显示图表。
      if (that.isPlay) {
        myChart.setOption(option);
      }
      //       window.addEventListener("resize", function() {
      //         myChart.resize();
      //       });
    }

  },
  //   props: ['childClass2', 'crightData']
  props: ['childClass2']
};

</script>
<style lang="less">
#pictorialBarChart {
  width: 100%;
  // height: 50vh;
  height: 35vh;
}
</style>
