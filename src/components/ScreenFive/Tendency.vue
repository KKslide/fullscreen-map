<template>
  <div id="tendency" ref="tendency"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      echartElement: null
    };
  },
  mounted() {
    let timer = setInterval(() => {
      //   if (this.pieData.length != 0) {
      clearInterval(timer);
      this.getCharts();
      //   }
    }, 500);
  },
  methods: {
    getCharts() {
      this.echartElement = echarts.init(this.$el);
      let dateData = this.sevenDayOpenAccountTendency.range;
      let amountData = this.sevenDayOpenAccountTendency.value;
      let option = {
        title: {
          show: false,
          text: "单位(户)",
          top: "5%",
          left: "40%",
          textStyle: {
            color: "#FFF",
            fontSize: "12%"
          }
        },
        grid: {
          top: "25%",
          left: "10%",
          right: "10%",
          bottom: "18%"
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.9)"
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              show: true,
              interval: 0,
              rotate: 10,
              // formatter: "{value} 月",
              formatter: "{value}万",
              textStyle: {
                color: "#d1e6eb",
                margin: 10,
                fontSize: "12%"
              }
            },
            axisTick: {
              show: false
            },
            data: dateData
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 3,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: "#d1e6eb",
                fontSize: "12%"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbolSize: 8,
            lineStyle: {
              normal: {
                // color: "#53fdfe", // 线条颜色
                color: "rgba(0,0,0,0)" // 线条颜色
              },
              //   borderColor: '#f0f'
              borderColor: "#f0f"
            },
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
                color: "rgba(255,255,255,1)"
              }
            },
            tooltip: {
              show: false
            },
            data: amountData
          },
          {
            type: "bar",
            animation: false,
            barWidth: 10,
            hoverAnimation: false,
            data: amountData,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255,255,255, 0.6)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255, 0)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                label: {
                  show: false
                }
              }
            }
          }
        ]
      };
      this.echartElement.setOption(option);
    }
  },
  props: ["sevenDayOpenAccountTendency"],
  watch: {
    sevenDayOpenAccountTendency(nv) {
      this.getCharts();
    }
  },
  beforeDestroy() {
    this.echartElement.dispose();
  }
};
</script>

<style lang="less" scoped>
#tendency {
  width: 100%;
  height: 100%;
}
</style>