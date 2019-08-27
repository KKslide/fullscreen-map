<template>
  <div id="HourAvgTradeTime" ref="HourAvgTradeTime"></div>
</template>

<script>
export default {
  mounted() {
    this.getChart();
  },
  methods: {
    getChart() {
      let targetValue = 200;
      let realValue = 88;
      let data = {
        title: '仪表盘',
        value: (100 * realValue / targetValue).toFixed(2),
        color: {
          pieMini: '#ffca1c', //小圆形颜色
          pieMiniMini: '#fff', //小小圆形颜色
          piePlus: '#5DD1FA', //大圆形颜色
          value: '#687284', //底部数值颜色
        },
      }
      let option = {
        title: {
          show:false,
          text: '当前一小时平均处理时间',
          left: 'center',
          top: '10%',
        //   padding: [-30, 0],
          textStyle: {
            color: '#fff',
            fontFamily: 'Arial',
			fontSize: '35',
			fontWeight:'400',
            align: 'center'
          }
        },
        series: [
          { // 外部刻度
            show: false,
            name: '外部刻度',
            type: 'gauge',
            radius: '70%',
            min: 0, //最小刻度
            max: 100, //最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
			endAngle: -45,
			center: ["50%", "60%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [
                  //   [1, 'rgba(0,0,0,0)']
                  [1, '#8dbcff']
                ]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: '#8dbcff',
              distance: 25,
              formatter: function (v) {
                switch (v + '') {
                  case '0':
                    return '0';
                  case '10':
                    return '10';
                  case '20':
                    return '20';
                  case '30':
                    return '30';
                  case '40':
                    return '40';
                  case '50':
                    return '50';
                  case '60':
                    return '60';
                  case '70':
                    return '70';
                  case '80':
                    return '80';
                  case '90':
                    return '90';
                  case '100':
                    return '100';
                }
              },
              fontSize: '25'
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: '#5c53de', //用颜色渐变函数不起作用
                width: 1,
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: '#5c53de', //用颜色渐变函数不起作用
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          { // 内部的圆环
            name: "内部圆环",
            type: "gauge",
			radius: '55%',
			center: ["50%", "60%"],
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 16,
                color: [
                  [
                    0.6, new this.$echarts.graphic.LinearGradient(
                      0, 0, 1, 0,
                      [
                        { offset: 0, color: '#ae3df6' },
                        { offset: 1, color: '#53bef9' }
                      ]
                    )
                  ],
                  [
                    1, '#222e7d'
                  ]
                ]
              }
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
				// show:false,
              formatter: function (value) {
                if (value !== 0) {
                  var num = Math.round(value);
                  return parseInt(num).toFixed(0) + " 分钟";
                } else {
                  return 0;
                }
              },
              offsetCenter: [0, "60%"],
              textStyle: {
                padding: [0, 0, 200, 0],
                fontSize: '35%',
                fontWeight: '700',
				// color: data.color.value || '#83af98'
				color:'#fff'
              }
            },
            title: {
              color: '#fff',
              fontSize: 10,
              offsetCenter: [0, "-25%"]
            },
            data: [{
              //   name: targetValue + "万吨",
              //   value: data.value,
              value: '2.33',
              show: false
            }],
            pointer: {
              show: false,
              length: '75%',
              width: 20, //指针粗细
            },
          }
        ]
      };
      let myChart = this.$echarts.init(this.$refs.HourAvgTradeTime);
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
#HourAvgTradeTime {
  width: 100%;
  height: 100%;
}
</style>