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
      // fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)'
    }
  },
  mounted() {
    this.getEchart();
  },
  methods: {
    compare(prop) {
      return function (a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      }
    },
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      let funnelChart = this.$echarts.init(this.$el)
      // 绘制图表
      funnelChart.setOption(
        {
          title: {
            show: false,
            text: this.titleName,
            left: 'left',
            padding: [10, 20],
            textStyle: {
              color: this.titleFontColor,
              fontFamily: 'Arial',
              fontWeight: 'lighter',
              fontSize: '12'
            }
          },
          color: this.baseColor,
          backgroundColor: '',
          textStyle: {
            color: this.fontColor,
            fontFamily: 'Arial',
            fontWeight: 'lighter',
            fontSize: '20%',
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%",
            // show:false
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            data: ['展现', '点击', '访问', '咨询', '订单'],
            textStyle: {
              fontSize: '15%',
              color: '#fff',
              padding: [0, 50, 0, 0]
            }
          },
          series: [
            {
              name: 'funnel1',
              type: 'funnel',
              left: 'center',
              top: 'center',
              // bottom: '5%',
              width: '55%',
              height: '55%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              // sort: 'descending', // 倒三角 - 降序
              sort: 'ascending', // 正三角- 升序
              gap: 0, //数据图形间距
              label: {
                show: true,
                position: 'right',
                formatter: "{d}%",
                fontSize: '15',
                formatter:'{a}:{b}'
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
              // emphasis: {
              //   label: {
              //     fontSize: '5%'
              //   }
              // },
              data: this.funnelData
            }
          ]
        });
      window.addEventListener("resize", function () {
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
