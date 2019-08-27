<template>
  <div id="radarChart" ref="radarChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "RadarChart",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.6)', 'rgba(97,148,143,0.8)', 'rgba(142,216,142,0.6)', 'rgba(216,194,67,0.6)'],
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)'
    }
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      let radarChart = this.$echarts.init(this.$el)
      // 绘制图表
      radarChart.setOption({
        title: {
          text: this.titleName,
          left: 'left',
          padding: [10, 20],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '110%'
          }
        },
        color: this.baseColor,
        backgroundColor: '',
        textStyle: {
          color: this.fontColor,
          fontFamily: 'Arial',
          fontWeight: 'lighter',
          fontSize: '80%'
        },
        tooltip: {
          trigger: 'item',
          //formatter: "{a} <br/>{b}: {c} ({d}%)"
          formatter: "{a} <br/>{b}: {c}"
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0)',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          nameGap: '5',
          radius: '80%',
          center: ['50%', '55%'],
          //splitNumber: 1, // 雷达图圈数设置 
          name: { textStyle: { color: '#838D9E', }, },
          axisLine: { lineStyle: { color: 'rgba(23,216,188,0.2)', }, }, // 设置雷达图中间射线的颜色
          indicator: this.radarIData,
          //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea: {
            show: true,
            areaStyle: {
              color: 'rgba(255,255,255,0.1)', // 图表背景的颜色 
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(23,216,188,0.3)', // 设置网格的颜色 
            },
          },
        },
        series: [{
          name: this.titleName,
          type: 'radar',
          // itemStyle: { normal: { areaStyle: { type: 'default' } } },
          areaStyle: { normal: {} },
          data: [{
            value: [709, 1599, 1365, 1, 140],
            name: '年龄分布',
            // 设置区域边框和区域的颜色 
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: 'rgba(44,198,250,0.6)' },
                    { offset: 0.6, color: 'rgba(155,80,229,0.6)' },
                    { offset: 1, color: 'rgba(175,252,247,0.6)' }
                  ]
                ),
                opcity: 0.6,
                shadowColor: 'rgba(255, 255, 255, 0.3)',
                shadowBlur: 6,
                lineStyle: {
                  color: 'rgba(3,252,245,0.8)',
                  shadowColor: 'rgba(255, 255, 255, 0.3)',
                  shadowBlur: 6
                }
              },
            }
          }]
        }]
      });
      window.addEventListener("resize", function() {
        radarChart.resize();
      });
    }
  },
  props: ['childClass', 'titleName', 'radarIData']
};

</script>
<style lang="less">
#radarChart {
  width: 100%;
  height: 50vh;
}

</style>
