<template>
  <div id="barChart" ref="barChart" :style="this.childClass"></div>
</template>
<script>
export default {
  name: "PBarChart",
  data() {
    return {
      baseColor: ['rgba(44,198,250,0.9)', 'rgba(44,198,250,0.1)'],
      axisColor: 'rgba(255,255,255,0.5)',
      fontColor: 'rgba(255,255,255,0.9)',
      titleFontColor: 'rgba(12, 236, 228, 0.8)',
      baseLinerColor: [{
        startc: '#C9FFFF',
        endc: '#00DEF0'
      }, {
        startc: '#BFD8E8',
        endc: '#0089AF'
      }],
      // dataY: ['国家机关、党群组织、企业、事业单位负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员,农、林、牧、渔、水利业生产人员', '生产、运输设备操作人员及有关人员', '不便分类的其他从业人员', '未知'],
      // barProcessData: [232, 132, 434, 337, 89, 61, 232, 2297]
      dataY: ['国家机关、党群组织、企业、事业单位负责人', '专业技术人员', '办事人员和有关人员', '商业', '不便分类的其他从业人员', '未知'],
      barProcessData: [232, 132, 434, 337, 232, 2297]
    }
  },
  mounted() {
    //console.log(this.data);
    this.getEchart1();
  },
  methods: {
    getEchart1() {
      let data1 = [];
      let data2 = [];
      let total = 0;
      for (let i = 0; i < this.barProcessData.length; i++) {
        total += this.barProcessData[i];
      }
      for (let j = 0; j < this.barProcessData.length; j++) {
        data1.push(parseInt(this.barProcessData[j] / total * 100));
      }
      for (let m = 0; m < data1.length; m++) {
        data2.push(100 - parseInt(data1[m]));
      }
      // 基于准备好的dom，初始化echarts实例
      let barChart1 = this.$echarts.init(this.$el);
      let labelRight = {
        normal: {
          position: 'right',
        }
      };
      // 绘制图表
      barChart1.setOption({
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
          fontSize: '80%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '15%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }, //不显示刻度
          axisLine: { show: false },
          boundaryGap: false, //坐标轴两边留白策略
        }],
        yAxis: [{
          type: 'category',
          boundaryGap: false,
          position: 'top',
          data: this.dataY,
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }, //不显示刻度
          axisLine: { show: false },
        }],
        series: [{
            name: '可用',
            type: 'bar',
            stack: '职业类型',
            barWidth: '40%', //柱条的宽度
            barGap: '1%',
            barCategoryGap: '1%',
            itemStyle: {
              barBorderRadius: [5, 5, 5, 5], // 统一设置四个角的圆角大小
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  { offset: 0, color: 'rgba(211,218,75,0.8)' },
                  { offset: 0.5, color: 'rgba(175,252,247,0.8)' },
                  { offset: 1, color: 'rgba(44,198,250,0.8)' }
                ]
              ),
            },
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'right',
            //     formatter: "{c}%",
            //   }
            // },
            data: data1
          },
          {
            name: '不可用',
            type: 'bar',
            stack: '职业类型',
            barWidth: '40%', //柱条的宽度
            barGap: '1%',
            barCategoryGap: '1%',
            itemStyle: {
              barBorderRadius: [0, 5, 5, 0], // 统一设置四个角的圆角大小
              color: 'rgba(44,198,250,0.1)'
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: "{c}%",
              }
            },
            data: data2
          }
        ]
      });
      window.addEventListener("resize", function() {
        barChart1.resize();
      });
    }
  },
  props: ['childClass', 'titleName']
};

</script>
<style lang="less">
#barChart1 {
  width: 100%;
  height: 50vh;
}

</style>
