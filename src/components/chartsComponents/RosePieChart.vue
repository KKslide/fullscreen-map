<template>
  <div id="rosePieChart"></div>
</template>
<script>
export default {
  name: "RosePieChart",
  data() {
    return {
      baseColor: ['#3398DB', '#AFFCF7', '#959DD7', '#04AEE5', '#0D63AF', '#9E43F8'],
      titleFontColor: 'rgba(80,178,240,0.8)',
      fontColor: 'rgba(255,255,255,0.8)',
      dataL: ['rose1', 'rose2', 'rose3', 'rose4'],
      data1: [
        { value: 10, name: 'rose1' },
        { value: 15, name: 'rose2' },
        { value: 30, name: 'rose3' },
        { value: 25, name: 'rose4' }
      ]
    }
  },
  mounted() {
    this.getRosePieChart();
  },
  methods: {
    getRosePieChart() {
      // 基于准备好的dom，初始化echarts实例
      let rosePieChart = this.$echarts.init(document.getElementById('rosePieChart'))
      // 绘制图表
      rosePieChart.setOption({
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
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: 'bottom',
          textStyle: {
            color: this.fontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '80%'
          },
          data: this.dataL
        },
        calculable: true,
        series: [{
          name: '面积模式',
          type: 'pie',
          radius: [20, 70],
          center: ['50%', '50%'],
          roseType: 'area',
          data: this.data1
        }]
      });
      window.addEventListener("resize", function() {
        rosePieChart.resize();
      });
    }

  }
};

</script>
<style lang="less">
#rosePieChart {
  width: 100%;
  height: 33.3vh;
}

</style>
