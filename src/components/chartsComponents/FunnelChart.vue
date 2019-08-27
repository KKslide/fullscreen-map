<template>
  <div id="fnnelChart" :style="this.childClass1"></div>
</template>
<script>
export default {
  name: "FunnelChart",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.9)', 'rgba(155,80,229,0.9)', 'rgba(13,99,175,0.9)', 'rgba(175,252,247,0.9)', 'rgba(72,160,188,0.9)', 'rgba(149,157,215,0.9)'],
      fontColor: 'rgba(255,255,255,0.8)',
      axisColor: 'rgba(255,255,255,0.5)',
      titleFontColor: 'rgba(80,178,240,0.8)',
      dataL: ['展现', '点击', '访问', '咨询', '订单'],
    }
  },
  mounted() {
    //console.log(this.bottomData);
    this.getEchart();
  },
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('fnnelChart'))
      // 绘制图表
      myChart1.setOption({
        title: {
          text: '时点余额',
          left: 'left',
          padding: [15, 30],
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
          fontSize: '80%'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        legend: {
          bottom: '2%',
          textStyle: {
            color: this.fontColor,
            fontSize: '80%'
          },
          data: this.dataL
        },
        calculable: true,
        series: [{
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '75%',
            label: {
              normal: {
                textStyle: {
                  color: this.fontColor,
                  fontSize: '80%'
                },
                formatter: '{b}预期'
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}预期: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.2,
              }
            },
            data: [
              { value: 60, name: '访问' },
              { value: 40, name: '咨询' },
              { value: 20, name: '订单' },
              { value: 80, name: '点击' },
              { value: 100, name: '展现' }
            ]
          },
          {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '75%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: this.fontColor,
                  fontSize: '80%'
                },
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.6,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 2,
                shadowColor: 'rgba(255, 255, 255, 0.2)',
                shadowBlur: 3
              }
            },
            data: [
              { value: 30, name: '访问' },
              { value: 10, name: '咨询' },
              { value: 5, name: '订单' },
              { value: 50, name: '点击' },
              { value: 80, name: '展现' }
            ]
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart1.resize();
      });
    }
  },
  props: ['childClass1', 'bottomData']
};

</script>
<style lang="less">
#fnnelChart {
  width: 100%;
  height: 50vh;
}

</style>
