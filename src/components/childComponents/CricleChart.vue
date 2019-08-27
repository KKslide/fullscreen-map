<template>
  <div id="cricleChart" ref="cricleChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "CricleChart",
  data() {
    return {
      axisColor: 'rgba(255,255,255,0.5)',
      //precent1: 81,
      total: 100,
      titleFontColor: 'rgba(12, 236, 228,0.8)',
      colorLiner: {
        normal: { //颜色渐变
          color: new this.$echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: this.baseColorLiner[0] },
              //{ offset: 0.6, color: '#AFFCF7' },
              { offset: 1, color: this.baseColorLiner[1] }
            ]
          ),
          shadowColor: 'rgba(255, 255, 255, 0.5)',
          shadowBlur: 15
        }
      }
    }
  },
  mounted() {
    //console.log(this.precent2);
    this.getEchart1();
  },
  computed: {
    precent2: function() {
      return this.total - this.precent1
    }
  },
  methods: {
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let cricleChart = this.$echarts.init(this.$el);
      var label1 = {
        normal: {
          show: false,
          position: 'center',
          textStyle: {
            fontSize: '120%',
            fontWeight: 'bold',
            color: '#fff'
          },
          formatter: "{d}%"
        }
      }
      var label2 = {
        normal: {
          show: false
        }
      }
      // 绘制图表
      cricleChart.setOption({
        title: {
          text: this.titleName,
          left: 'left',
          padding: [0, 10],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '110%'
          }
        },
        backgroundColor: '',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['55%', '70%'],
          labelLine: {
            show: false
          },
          data: [{
              name: 'GoogleMaps',
              value: this.precent1,
              label: label1,
              itemStyle: this.colorLiner
            },
            {
              name: 'other',
              value: this.precent2,
              label: label2,
              itemStyle: {
                normal: {
                  color: 'rgba(255,255,255,0.5)'
                }
              }
            }
          ]
        }]
      });
      window.addEventListener("resize", function() {
        cricleChart.resize();
      });
    }
  },
  props: ['childClass', 'titleName', 'precent1', 'baseColorLiner']
};

</script>
<style lang="less">
#cricleChart {
  width: 100%;
  height: 50vh;
}

</style>
