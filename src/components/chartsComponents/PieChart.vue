<template>
  <div id="pieChart" :style="this.childClass2"></div>
</template>
<script>
export default {
  name: "PieChart",
  data() {
    return {
      baseColor: ['#3398DB', '#AFFCF7', '#959DD7', '#04AEE5', '#0D63AF', '#9E43F8'],
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(80,178,240,0.8)',
    }
  },
  mounted() {
    this.getPieEchart1();
  },
  methods: {
    getPieEchart1() {
      var labelFromatter = {
        normal: {
          label: {
            formatter: function(params) {
              return 100 - params.value + '%'
            },
            textStyle: {
              baseline: 'top'
            }
          }
        },
      }
      // 基于准备好的dom，初始化echarts实例
      let pieChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      pieChart.setOption({
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
          fontFamily: 'Arial',
          fontWeight: 'lighter',
          fontSize: '60%'
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //   orient: 'vertical',
        //   left: '3.5%',
        //   top: '18%',
        //   data: this.cleftData.name,
        //   textStyle: {
        //     color: this.fontColor,
        //     fontSize: '80%'
        //   }
        // },

        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            normal: {
              // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              formatter: '  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(0,31,78,0.5)',
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 13,
                  fontFamily: 'Arial',
                  lineHeight: 30
                },
                per: {
                  color: '#eee',
                  backgroundColor: 'rgba(165,165,165,0.15)',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          itemStyle: {
            normal: {
              shadowColor: 'rgba(255, 255, 255, 0.5)',
              shadowBlur: 3
            }
          },
          data: this.cleftData
        }]
      });
      window.addEventListener("resize", function() {
        pieChart.resize();
      });
    }
  },
  props: ['childClass2', 'cleftData']
};

</script>
<style lang="less">
#pieChart {
  width: 100%;
  height: 50vh;
}

</style>
