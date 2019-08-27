<template>
  <div id="funnelChart" ref="funnelChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "FunnelChart",
  data() {
    return {
      //baseColor: ['rgba(245,252,75,0.3)', 'rgba(23,216,188,0.5)'],
      baseColor: ['rgba(44,198,250,0.6)', 'rgba(222,222,222,0.2)'],
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
      let funnelChart = this.$echarts.init(this.$el)
      // 绘制图表
      funnelChart.setOption({
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
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [{
            name: 'funnel1',
            type: 'funnel',
            left: '16%',
            top: '20%',
            //x2: 80,
            bottom: '5%',
            width: '65%',
            height: '75%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0, //数据图形间距
            label: {
              show: true,
              position: 'left',
              formatter: "{d}%",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: 'rgba(26,32,54,1)',
              borderWidth: 0
            },
            emphasis: {
              label: {
                fontSize: '110%'
              }
            },
            data: this.funnelData
          },
          {
            name: 'funnel2',
            type: 'funnel',
            left: '20%',
            top: '20%',
            bottom: '5%',
            width: '65%',
            height: '75%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 0, //数据图形间距
            label: {
              show: true,
              position: 'right',
              //formatter: "{d}%",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: 'rgba(26,32,54,1)',
              borderWidth: 0,
              opacity: 0.3
            },
            data: this.funnelData
          },
        ]
      });
      window.addEventListener("resize", function() {
        funnelChart.resize();
      });
    }
  },
  props: ['childClass', 'titleName', 'funnelData']
};

</script>
<style lang="less">
#funnelChart {
  width: 100%;
  height: 50vh;
}

</style>
