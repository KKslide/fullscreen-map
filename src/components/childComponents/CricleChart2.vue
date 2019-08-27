<template>
  <div id="cricleChart" ref="cricleChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "CricleChart",
  data() {
    return {
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.8)',
      total: 100,
      titleFontColor: 'rgba(12, 236, 228,0.8)',
      baseColor: ['rgba(250,247,75,0.6)', 'rgba(60,159,221,0.3)'],
    }
  },
  mounted() {
    console.log(this.cricleData);
    this.getEchart1();
  },
  computed: {},
  methods: {
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let cricleChart = this.$echarts.init(this.$el);
      // 绘制图表
      cricleChart.setOption({
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
        backgroundColor: '',
        color: this.baseColor,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        textStyle: {
          color: this.fontColor,
          fontFamily: 'Arial',
          fontWeight: 'lighter',
          fontSize: '80%'
        },
        series: [{
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['50%', '68%'],
          label: {
            show: true,
            formatter: "{b}\n{d}%",
            verticalAlign: 'middle',
            lineHeight: 16
          },
          labelLine: {
            show: true,
            length: 8,
            length2: 8
          },
          data: this.cricleData
        }]
      });
      window.addEventListener("resize", function() {
        cricleChart.resize();
      });
    }
  },
  props: ['childClass', 'titleName', 'cricleData']
};

</script>
<style lang="less">
#cricleChart {
  width: 100%;
  height: 50vh;
}

</style>
