<!--
  广东省地图 
  childClass1 ：动态样式
  leftData：数据源
-->
<template>
  <div id="map"
       :style="this.childClass1">
  </div>
</template>
<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

import guangdong from '@/js/guangdong.js';

export default {
  name: 'HighMap',
  data () {
    return {
      titleFontColor: 'rgba(80,178,240,0.8)',
      mapColor: [
        [0, '#BCBFD8'],
        [0.3, '#6B759D'],
        [0.4, '#AFFCF7'],
        [1, '#46B9DE']
      ]
    }
  },
  mounted () {
    this.getMap();
  },
  methods: {
    getMap () {
      // 初始化图表
      var map = new Highcharts.Map('map', {
        chart: {  // 图表配置：关于图表区和图形区的参数及一般图表通用参数
          className: '', // css类名，在样式模式下使用
          backgroundColor: '',
        },
        title: {
          text: '日活跃用户数<h1 style="color:white;">345,732</h1>万人',
          align: 'left',
          // floating: true,
          useHTML: true,
          style: {
            "color": this.titleFontColor,
            "fontSize": "1.2rem",
            "left": "0"
          }
        },
        colorAxis: {
          min: 0,
          // minColor: '#7B84B3',
          // maxColor: '#6BE6C6',
          stops: this.mapColor
        },
        colors: [],
        credits: {
          enabled: false,
          href: " ",
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'bottom'
        },
        series: [{
          data: this.leftData,
          name: '随机数据',
          mapData: guangdong,
          animation: {
            duration: 1000
          },
          joinBy: 'name', // 根据 name 属性进行关联
          dataLabels: {
            enabled: true,
            color: 'white',
            format: '{point.name}'
          },
          name: 'Population density',
          tooltip: {
            pointFormat: '{point.name}: {point.value}/km²'
          }
        }]
      });
    }
  },
  props: ['childClass1', 'leftData']
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#map {
  width: 100%;
  height: 100vh;
}
</style>
