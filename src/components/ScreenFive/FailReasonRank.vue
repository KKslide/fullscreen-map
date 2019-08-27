<template>
  <div id="lineChart2" ref="lineChart2"></div>
</template>
<script>
let startIndex = 0;
export default {
  name: "lineChart2",
  data() {
    return {
      isPlay: true,
      baseColor: ['rgba(92,196,10)', 'rgba(209,205,211)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228,0.8)',
      //   dataL: ['原因1', '原因2', '原因3', '原因4', '原因5'],

    }
  },
  mounted() {
    this.getLineChart()
  },
  methods: {
    getLineChart() {
      // 基于准备好的dom，初始化echarts实例
      let lineChart2 = this.$echarts.init(this.$el)
      // 绘制图表
      let option = {
        // backgroundColor: "#05224d",
        // tooltip: {},
        grid: {
          top: '20%',
          left: '1%',
          right: '5%',
          bottom: '10%',
          containLabel: true,
        },
        legend: {
          itemGap: 50,
          data: ['失败交易笔数', '失败交易金额'],
          textStyle: {
            color: '#f9f9f9',
            borderColor: '#fff'
          },
          bottom: '5%',
          left: 'center'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#f9f9f9',
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#d1e6eb',
                margin: 15
              },
              fontSize: 16
            },
            axisTick: {
              show: false
            },
            data: ['原因1', '原因2', '原因3', '原因4', '原因5', '原因6', '原因7'],
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0a3256'
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#d1e6eb',

              },
            },
            axisTick: {
              show: false,
            },
          }
        ],
        series: [
          {
            name: '失败交易笔数',
            type: 'line',
            // smooth: true, //是否平滑曲线显示
            // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: "#28ffb3", // 线条颜色
              },
              borderColor: '#f0f'
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#28ffb3",

              }
            },
            tooltip: {
              show: false
            },
            areaStyle: { //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,154,120,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)'
                }
                ], false),
                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [393, 415, 485, 631, 689, 824, 850]
          },
          {
            name: '失败交易金额',
            type: 'bar',
            barWidth: 20,
            tooltip: {
              show: false
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 20
              }
            },
            itemStyle: {
              normal: {
                // barBorderRadius: 5,
                // color: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1,
                //     [{
                //             offset: 0,
                //             color: '#14c8d4'
                //         },
                //         {
                //             offset: 1,
                //             color: '#43eec6'
                //         }
                //     ]
                // )
                color: function (params) {
                  var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: [200, 215, 102, 267, 186, 315, 316]
          }
        ]
      };
      lineChart2.setOption(option);
      window.addEventListener("resize", function () {
        lineChart2.resize();
      });
    },

    fixedForm(data) {
      let obj = {}, keys = [];
      data.forEach(e => keys = keys.concat(Object.keys(e))); // 先去重掉keys
      this.unique(keys).forEach(ele => {
        obj[ele] = data.map(val => val[ele])
      });
      return obj;
    },
    // 去重
    unique(arr) {
      return arr.filter(function (item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
      });
    }
  },
  props: ['titleName']
};

</script>
<style lang="less" scoped>
#lineChart2 {
  width: 100%;
  height: 50vh;
}
</style>
