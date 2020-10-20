<template>
  <div class="pieChart" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "PieChart",
  data() {
    return {
      baseColor: [
        "rgba(44,198,250,1)",
        "rgba(44,198,250,0.8)",
        "rgba(44,198,215,0.7)",
        "rgba(44,198,250,0.6)",
        "rgba(44,198,250,0.4)",
        "rgba(44,198,250,0.2)"

        // "rgba(97,148,143,0.8)",
        // "rgba(142,216,142,0.6)",
        // "rgba(216,194,67,0.6)"
      ],
      fontColor: "rgba(255,255,255,0.9)",
      titleFontColor: "rgba(12, 236, 228, 0.8)",
      echartElement: null
    };
  },
  mounted() {
    this.getPieChhart();
    let timer = setInterval(() => {
      //   if (this.pieData.length != 0) {
      clearInterval(timer);
      this.getPieChhart();
      //   }
    }, 500);
  },
  methods: {
    getPieChhart() {
      this.echartElement = echarts.init(this.$refs.chart);
      this.echartElement.setOption({
        color: this.baseColor,
        title: "",
        textStyle: {
          color: "rgba(255, 255, 255, 1)",
          fontSize: "12%"
        },
        // legend: {
        //   show: true,
        //   orient: "vertical",
        //   top: "15%",
        //   right: "15%",
        //   data: this.pieData.name,
        //   textStyle: {
        //     fontSize: "18",
        //     color: "rgba(255, 255, 255, 1)",
        //     fontSize: "15%"
        //   }
        // },
        series: [
          {
            name: "百分比",
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside",
                rotate: 0,
                formatter: "{b}\n{d}%",
                verticalAlign: "middle",
                lineHeight: 18
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(255,255,255,0)",
                borderWidth: 35,
                shadowColor: "rgba(0,0,0,0.6)",
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            },
            data: this.pieData // 使用父组件传来的值
          }
        ]
      });
    }
  },
  props: ["pieData"],
  beforeDestroy() {
    this.echartElement.dispose();
  }
};
</script>

<style lang="less" scoped>
.pieChart {
  width: 100%;
  height: 100%;
}
</style>