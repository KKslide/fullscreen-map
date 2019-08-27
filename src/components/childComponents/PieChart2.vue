<template>
  <div id="pieChart2" ref="pieChart2" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "PieChart2",
  data() {
    return {
      baseColor: ['rgba(23,216,188,1)', 'rgba(23,216,188,0.9)', 'rgba(23,216,188,0.8)', 'rgba(23,216,188,0.7)', 'rgba(23,216,188,0.6)', 'rgba(23,216,188,0.5)', 'rgba(23,216,188,0.4)', 'rgba(23,216,188,0.3)', 'rgba(23,216,188,0.2)'],
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
      let pieChart2 = this.$echarts.init(this.$el)
      // 绘制图表
      pieChart2.setOption({
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
          name: '受教育程度',
          type: 'pie',
          radius: ['20%', '70%'],
          center: ['50%', '55%'],
          startAngle: 90,
          minAngle: 36,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              //position: 'inner',
              //formatter: "{b}\n{d}%",
              formatter: "{d}%",
              verticalAlign: 'middle',
              lineHeight: 18,
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(26,32,54,1)',
              borderWidth: 2,
            }
          },
          data: this.pieData
        }]
      });
      window.addEventListener("resize", function() {
        pieChart2.resize();
      });
    }
  },
  props: ['childClass', 'titleName', 'pieData']
};

</script>
<style lang="less">
#pieChart2 {
  width: 100%;
  height: 50vh;
}

</style>
