<template>
  <div id="multipleChart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      echartElement: null,
    };
  },
  methods: {
    getChart() {
      this.echartElement = echarts.init(document.getElementById("multipleChart"));
      var attr = [
        {
          name: "授信用户",
          unit: "户",
        },
        {
          name: "用信用户",
          unit: "户",
        }
      ];
      var xData = [ "0-10万元", "10-20万元", "20-30万元", "30-40万元", "40-50万元", "50-60万元", "60-70万元", "70-80万元", "> 80万元", ];
      var lines = [
        [400, 400, 300, 300, 300, 400, 400, 400, 350],
        [400, 330, 220, 850, 120, 666, 340, 540, 250]
      ];
      var option = {
        backgroundColor: "",
        tooltip: {
          trigger: "axis",
          backgroundColor: "none",
          padding: 5,
          formatter: function (param) {
            var resultTooltip =
              "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>" +
              "<div style='text-align:center;'>" +
              param[0].name +
              "</div>" +
              "<div style='padding-top:5px;'>";
            for (var i = 0; i < param.length; i++) {
              resultTooltip +=
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:" +
                param[i].color.colorStops[0].color +
                ";'></span>" +
                "<span style=''> " +
                param[i].seriesName +
                ": </span>" +
                "<span style='color:" +
                param[i].color +
                "'>" +
                param[i].value +
                "</span></span><span>" +
                attr[i].unit +
                "</span></br>";
            }
            resultTooltip += "</div>";

            return resultTooltip;
          },
        },
        grid: {
          left: "10%",
          top: "15%",
          right: "5%",
          bottom: "10%",
        },
        legend: {
          show: true,
          icon: "pin",
          orient: "horizontal",
          top: "5%",
          right: "8%",
          itemWidth: 18.5,
          itemHeight: 6,
          itemGap: 30,
          textStyle: {
            color: '#FFFFFF',
            fontSize:20
          },
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisLabel: {
              show: true,
              fontSize: 15,
              textStyle: {
                color: "#C9C8CD", //X轴文字颜色
              },
              interval:0,
              rotate: 20
            },
            axisLine: {
              show: true, //不显示x轴
              lineStyle:{
                  color:"#fff"
              }
            },
            axisTick: {
              show: true, //不显示刻度
            },
            // boundaryGap: false,
            splitLine: {
              show: true,
              width: 0.08,
              lineStyle: {
                type: "solid",
                color: "#FFF",
              },
            },
            axisPointer: {
              //轴指示器
              type: "shadow",
              z: 1,
              shadowStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(18,155,249,0)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(18,155,249,1)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 5,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // scale: true, //坐标轴起点不限制0
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 15,
                color: "#C9C8CD", //X轴文字颜色
              },
            },
            splitLine: {
              show: false,
              lineStyle:{
                  color:"#FFF"
              }
            },
            axisTick: {
              show: false, //不显示刻度
            },
            axisLine: {
              show: true,
              lineStyle:{
                  color:"#FFF",
              }
            },
            nameTextStyle: {
              color: "#FFFFFF",
            },
            splitArea: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "授信用户",
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#A35AE0",
                  },
                  {
                    offset: 1,
                    color: "#6830E7",
                  },
                ]),
                barBorderRadius: 11,
              },
            },
            data: lines[0],
          },
          {
            name: "用信用户",
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0CEBEA",
                  },
                  {
                    offset: 1,
                    color: "#368BFF",
                  },
                ]),
                barBorderRadius: 12,
              },
            },
            data: lines[1],
          },
        ],
      };
      this.echartElement.setOption(option);
    },
  },
  mounted() {
    this.getChart();
  },
  beforeDestroy() {
    this.echartElement.dispose();
  },
};
</script>

<style lang="less" scoped>
#multipleChart {
  width: 100%;
  height: 100%;
}
</style>