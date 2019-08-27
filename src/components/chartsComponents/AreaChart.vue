<template>
  <div id="areaChart"
       :style="this.childClass1"></div>
</template>
<script>
var startIndex = 0;
export default {
  name: "BarChart",
  data () {
    return {
      baseColor: ['rgba(44,198,250,0.9)', 'rgba(155,80,229,0.9)', 'rgba(175,252,247,0.9)', 'rgba(149,157,215,0.9)', 'rgba(72,160,188,0.9)', 'rgba(13,99,175,0.9)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(80,178,240,0.8)',
      baseLinerColor: [{
        startc: 'rgba(50,153,199,0.8)',
        endc: 'rgba(255,255,255,0.6)'
      }, {
        startc: 'rgba(135,97,163,0.8)',
        endc: 'rgba(255,255,255,0.6)'
      }],
      isPlay: true,
      dl11: [],
      dl12: [],
      dataL: ['广州', '珠海'],
      areaData: {
        dataX: ['2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01', '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01', '2017-12-01', '2018-01-01', '2018-02-01', '2018-03-01', '2018-04-01', '2018-05-01', '2018-06-01', '2018-07-01', '2018-08-01', '2018-09-01', '2018-10-01', '2018-11-01', '2018-12-01'],
        data1: [660, 692, 716, 636, 626, 710, 732, 656, 660, 696, 672, 756, 660, 692, 716, 636, 626, 710, 732, 656, 660, 696, 672, 756],
        data2: [176, 192, 286, 176, 166, 271, 269, 156, 153, 159, 269, 276, 176, 192, 286, 176, 166, 271, 269, 156, 153, 159, 269, 276]
      }
    }
  },
  mounted () {
    //console.log(this.childClass1);
    this.getAreaChart();
  },
  methods: {
    getAreaChart () {
      // 基于准备好的dom，初始化echarts实例
      let areaChart = this.$echarts.init(document.getElementById('areaChart'));
      // 绘制图表
      let option = {
        title: {
          text: '时点余额',
          left: 'left',
          padding: [10, 20],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '18'
          }
        },
        color: this.baseColor,
        backgroundColor: '',
        textStyle: {
          color: this.fontColor,
          fontSize: '80%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.dataL,
          bottom: '3%',
          left: 'center',
          textStyle: {
            color: this.fontColor,
            fontSize: '80%'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true, // x轴轴线颜色类型的修改
            lineStyle: {
              type: 'solid',
              color: this.axisColor
            }
          },
          data: this.areaData.dataX
        },
        yAxis: {
          type: 'value',
          //boundaryGap: [0, '100%'],
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
        },
        series: [{
          name: '广州',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#31C9FA'
            }
          },
          stack: 'a',
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.baseLinerColor[0].startc
              }, {
                offset: 1,
                color: this.baseLinerColor[0].endc
              }])
            }
          },
          data: []
        },
        {
          name: '珠海',
          type: 'line',
          smooth: true,
          stack: 'a',
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            normal: {
              color: '#AF6FC1'
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.baseLinerColor[1].startc
              }, {
                offset: 1,
                color: this.baseLinerColor[1].endc
              }])
            }
          },
          data: []
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
        for (let i = startIndex; i < that.areaData.data1.length; i++) {
          if (i < startIndex + 10) {
            d1.push(that.areaData.data1[i]);
            indexArr.push(that.areaData.dataX[i])
          }
        }
        for (let i = startIndex; i < that.areaData.data1.length; i++) {
          if (i < startIndex + 10) {
            d2.push(that.areaData.data2[i]);
          }
        }

        if (d1.length < 10) {
          startIndex = -1;
        }

        areaChart.setOption({
          xAxis: [{
            data: indexArr
          }],
          series: [{
            name: '广州',
            data: d1
          }, {
            name: '珠海',
            data: d2
          }]
        });
      }, 2000);
      // 使用刚指定的配置项和数据显示图表。
      if (that.isPlay) {
        areaChart.setOption(option);
      }
      window.addEventListener("resize", function () {
        areaChart.resize();
      });
    }
  },
  props: ['childClass1']
};

</script>
<style lang="less">
#areaChart {
  width: 100%;
  height: 50vh;
}
</style>
