<template>
  <div id="pieChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "PieChart",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.6)', 'rgba(97,148,143,0.8)', 'rgba(142,216,142,0.6)', 'rgba(216,194,67,0.6)'],
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)'
    }
  },
  mounted() {
    this.getPieEchart1();
  },
  methods: {
    getPieEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let pieChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      pieChart.setOption({
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
        grid: {
          left: '3%',
          right: '3%',
          top: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: this.pieData.name
        },
        series: [{
          name: '百分比',
          type: 'pie',
          radius: '70%',
          center: ['50%', '55%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inner',
              formatter: "{b}\n{d}%",
              verticalAlign: 'middle',
              lineHeight: 18,
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(255,255,255,0)',
              borderWidth: 10,
              // shadowColor: 'rgba(255,255,255,0.5)',
              // shadowBlur: 10,
              // shadowOffsetX: 5,
              // shadowOffsetY: 5
            }
          },
          data: this.pieData
        }]
      });
      window.addEventListener("resize", function() {
        pieChart.resize();
      });
    }
  },
  props: ['childClass', 'titleName', 'pieData']
};

</script>
<style lang="less">
#pieChart {
  width: 100%;
  height: 50vh;
}

</style>
