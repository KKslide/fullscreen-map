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
      dataL: ['金额', '笔数'],
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
        legend: {
          show: true,
          data: this.dataL,
          type: 'plain',
          left: 'center',
          bottom: '5%',
          textStyle: {
            color: '#fff',
            fontSize: '16'
          }
        },
        grid: {
          top: '30%',
          left: '8%',
          right: '5%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.crightData.dataX,
            //横坐标倾斜不间隔显示
            axisLabel: {
              interval: 0, // 强制设置坐标轴分割间隔
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
            axisLine: { // X轴轴线颜色类型的修改
              show: true,
              lineStyle: {
                type: 'solid',
                color: this.axisColor
              },
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { //x轴网格线修改
              show: false,
            },
            axisLabel: { // 坐标轴刻度标签的相关设置
              textStyle: {
                color: "white",
                fontSize: "14"
              },
            },
            axisLine: { // X轴轴线颜色类型的修改
              show: true,
              lineStyle: {
                type: 'solid',
                color: this.axisColor
              }
            },
          }
        ],
        series: [
          { // 金额bar
            name: this.dataL[0],
            type: 'bar',
            barWidth: '20',
            barGap: '30%',
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
            itemStyle: { // 设置条子渐变的地方
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
          },
          { // 笔数bar
            name: this.dataL[1],
            type: 'bar',
            barWidth: '20',
            barGap: '30%',
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
            itemStyle: { // 设置条子渐变的地方
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(247,195,104, 0.8)'
                },
                {
                  offset: 0.03,
                  color: 'rgba(247,195,104, 1)'
                },
                {
                  offset: 0.48,
                  color: 'rgba(247,195,104,0.5)'
                },
                // {
                //   offset: 0.96,
                //   color: 'rgba(54,95,203,0.36)'
                // },
                {
                  offset: 1,
                  color: 'rgba(247,195,104,0.1)'
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
          d2 = [],
          indexArr = [];
        startIndex++;
        for (let i = startIndex; i < that.crightData.data1.length; i++) {
          if (i < startIndex + 6) {
            d1.push(that.crightData.data1[i]);
            d2.push(that.crightData.data2[i]);
            indexArr.push(that.crightData.dataX[i])
          }
        }

        if (d1.length < 6) {
          startIndex = -1;
        }

        myChart.setOption({
          xAxis: [{
            data: indexArr
          }],
          series: [
            {
              name: '金额',
              data: d1
            },
            {
              name: '笔数',
              data: d2
            }
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
  props: ['childClass2', 'crightData']
};

</script>
<style lang="less">
#pictorialBarChart {
  width: 100%;
  // height: 50vh;
  height: 35vh;
}
</style>
