<template>
  <div ref="chart" class="dynamicBarChart"></div>
</template>
<script>
import echarts from "echarts";
let startIndex = 0;
export default {
  name: "DynamicBarChart",

  data() {
    return {
      echartElement: null,
      isPlay: true,
      baseColor: ["red", "#AFFCF7", "#959DD7"],
      axisColor: "rgba(255,255,255,0.8)",
      fontColor: "white",
      titleFontColor: "white",
      dataL: [],
      baseLinerColor: [
        {
          startc: "#31C9FA",
          endc: "rgba(255,255,255,0.6)"
        },
        {
          startc: "#B998D6",
          endc: "rgba(255,255,255,0.6)"
        }
      ],
      fulldata: {}
    };
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      this.echartElement = echarts.init(this.$el);
      //******************* */
      // 绘制图表
      let datax = this.crightData.year;
      let data1 = this.crightData.value;
      let option = {
        title: {
          // text: '近一个月交易量趋势（单位：元）',
          // left: 'left',
          left: "5%",
          // padding: [20, 20],
          //subtext: "横坐标：近一个月，纵坐标：交易量（单位：元）",
          subtextStyle: {
            color: "white", // 副标题文字颜色
            fontSize: "12%",
            lineHeight: "50"
          },

          top: "10",
          textStyle: {
            color: this.titleFontColor,
            // fontFamily: 'Arial',
            fontWeight: "500",
            fontSize: "12%"
          }
        },
        color: this.baseColor,
        // color:rgba(46,97,210,0.36),
        backgroundColor: "",
        textStyle: {
          color: this.fontColor,
          fontSize: "12%"
        },
        tooltip: {
          trigger: "axis",

          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
              show: false
            }
          }
        },
        grid: {
          top: "30%",
          left: "1%",
          right: "8%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            show: true,
            //data:"",
            //横坐标倾斜不间隔显示
            axisLabel: {
              show: true,
              interval: 0,
              // formatter: '{value} 月',
              formatter: "{value}",
              textStyle: {
                color: "white",
                fontSize: "12%"
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              //x轴网格线修改
              show: false
            },
            axisLine: {
              show: false, // X轴轴线颜色类型的修改
              lineStyle: {
                type: "solid",
                color: this.axisColor
              }
            },
            data: datax
          }
        ],

        yAxis: [
          {
            type: "value",
            show: false,
            splitLine: {
              //y轴网格线修改
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "white",
                fontSize: "12%"
              }
            },
            axisLine: {
              show: false, // y轴轴线颜色类型的修改
              lineStyle: {
                type: "solid",
                color: this.axisColor
              }
            }
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "50%",
            barGap: "-30%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(e) {
                  return (
                    Number(e.data)
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                      .split(".")[0] + ""
                    // .split(".")[0] + "万元"
                  );
                },
                textStyle: {
                  fontSize: "10%"
                }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(225,59,31,0.6)"
                  },
                  {
                    offset: 0.03,
                    color: "rgba(225,59,31,0.55)"
                  },
                  {
                    offset: 0.48,
                    color: "rgba(136,78,121,0.3)"
                  },
                  {
                    offset: 0.96,
                    color: "rgba(54,95,203,0.4)"
                  },
                  {
                    offset: 1,
                    color: "rgba(46,97,210,0.1)"
                  }
                ]),
                opacity: 1
              },
              emphasis: {
                opacity: 1
              }
            },
            // data: "",
            data: data1,
            z: 10
          },
          {
            name: "",
            // yAxisIndex: 0,
            type: "line",
            color: "#ffd300",
            label: {
              normal: {
                show: false,
                position: "top",
                textStyle: {
                  color: "#ffd300",
                  fontSize: "14%"
                },
                formatter: "{c}万元"
              }
            },
            lineStyle: {
              color: "rgba(102, 255, 255, 0.83)"
            },
            // data: "",
            data: data1
          }
        ]
      };
      //******************* */
      var that = this;
      //   let dataX = that.crightData.month;
      //   let data1 = that.crightData.value;
      //   var timter = setInterval(function() {
      //     if (!that.isPlay) return;
      //     var d1 = [],
      //       indexArr = [];
      //     for (let i = startIndex; i < data1.length; i++) {
      //       if (i <= startIndex + 6) {
      //         d1.push(data1[i]);
      //         indexArr.push(dataX[i]);
      //       }
      //     }
      //     if (d1.length <= 6) {
      //       startIndex = -1;
      //     }
      // startIndex++;
      //     that.echartElement.setOption({
      //       xAxis: [
      //         {
      //           data: indexArr
      //         }
      //       ],
      //       series: [
      //         {
      //           name: "",
      //           data: d1
      //         },
      //         {
      //           name: "",
      //           data: d1
      //         }
      //       ]
      //     });
      //   }, 2000);
      // 使用刚指定的配置项和数据显示图表。
      if (that.isPlay) {
        this.echartElement.setOption(option);
      }
      //   window.addEventListener("resize", function() {
      //     this.echartElement.resize();
      //   });
      // this.echartElement.setOption(option)
    }
  },
  watch: {
    crightData(nv) {
      this.getEchart();
    }
  },
  props: ["crightData"],
  beforeDestroy() {
    this.echartElement.dispose();
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.dynamicBarChart {
  width: 100%;
  // height: 32vh !important;
  height: 100%;
}
</style>
