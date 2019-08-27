<template>
  <div id="pictorialBar" ref="pictorialBar" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "PictorialBar",
  data() {
    return {
      baseColor: ['rgba(252,240,100,0.6)', 'rgba(198,198,198,0.4)', 'rgba(255,255,255,0.9)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)',
      barDataL: ['放款金额', '放款笔数'],
    }
  },
  mounted() {
    //console.log(this.data);
    this.getEchart1();
  },
  methods: {
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      let pictorialBar = this.$echarts.init(this.$el);
      var pathSymbols = {
        ship: 'path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z'
      };

      // 绘制图表
      let option = {
        title: {
          text: this.barTitle,
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
          fontSize: '80%'
        },
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        legend: {
          show: false,
          //orient: 'vertical',
          bottom: '1%',
          data: this.dataL
        },
        xAxis: {
          type: 'value',
          position: 'top',
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: {
            show: true,
            textStyle: {
              color: this.fontColor,
              fontSize: '80%'
            }
          },
          axisTick: { show: false },
          splitLine: { show: false },
          data: this.barData.dataY
        },
        series: [{
            name: this.barData.dataY[0],
            type: 'bar',
            barWidth: '40%', //柱条的宽度
            barGap: 0, //不同系列的柱间距离
            barCategoryGap: '10%', //同一系列的柱间距离，默认为类目间距的20%
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                formatter: '{c}%',
                fontSize: '70%'
              }
            },
            data: this.barData.data1
          },
          {
            name: this.barData.dataY[1],
            type: 'bar',
            barWidth: '40%', //柱条的宽度
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                formatter: "{c}%",
                fontSize: '60%'
              }
            },
            data: this.barData.data2
          },
          {
            type: 'pictorialBar',
            symbolRepeat: false,
            symbolSize: ['50%', '100%'],
            symbol: pathSymbols.ship,
            barCategoryGap: '40%',
            data: this.barData.dataT
          }
        ]
      };
      var barGaps = ['-100%', '0'];
      var loopIndex = 0;

      setInterval(function() {
        var barGap = barGaps[loopIndex];

        pictorialBar.setOption({
          series: [{
            barGap: barGap
          }]
        });
        loopIndex = (loopIndex + 1) % barGaps.length;

      }, 2000);
      pictorialBar.setOption(option);
      window.addEventListener("resize", function() {
        pictorialBar.resize();
      });
    }
  },
  props: ['childClass', 'barTitle', 'barData']
};

</script>
<style lang="less">
#pictorialBar {
  width: 100%;
  height: 50vh;
}

</style>
