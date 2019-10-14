<template>
  <div id="heat_map" ref="heat_map"></div>
</template>

<script>
import '../../../node_modules/echarts/map/js/china.js'
import allCity from '../../js/allCity'
export default {
  data() {
    return {
      mapDataLocal: []
    }
  },
  mounted() { },
  methods: {
    getMap(mapdata) {
      let HeatMap = this.$echarts.init(this.$el)

      /*
              const geoCoordMap = { // 全国所有城市坐标案例
                "海门": [121.15, 31.89],
                "鄂尔多斯": [109.781327, 39.608266],
                "招远": [120.38, 37.35],
                "舟山": [122.207216, 29.985295],
                "齐齐哈尔": [123.97, 47.33],
                "盐城": [120.13, 33.38],
                "赤峰": [118.87, 42.28],
                "青岛": [120.33, 36.07]
              };
        */

        const geoCoordMap = allCity;
        
      /*
              let dataValue = [ // 父组件传来的值 该写成这样
                { name: "海门", value: 100 },
                { name: "鄂尔多斯", value: 112 },
                { name: "招远", value: 112 },
                { name: "舟山", value: 112 },
                { name: "齐齐哈尔", value: 114 }
              ];
        */

      let dataValue = mapdata

      dataValue.map(e => {
        e["name"] = e["name"] ? e["name"] : e["type"];
        e["amount"] = Math.round(Number(e["amount"]))
      })


      let convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push(geoCoord.concat(data[i].amount));
          }
        }
        return res;
      };

      let option = {
        title: {
          text: '热力图',
          subtext: '',
          left: 'center',
          textStyle: {
            color: '#fff'
          },
          show: false
        },
        // backgroundColor: '#404a59',
        visualMap: { // 就是控制热力图的图标范围控件
          show: false,
          min: 0,
          max: 500,
          splitNumber: 5,
          inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba', 'red'].reverse()
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          top: '30%',
          bottom: '3%',
          left: '10%',
          right: '5%',
          label: {
            normal: {
              show: false,
              color: '#fff'
            },
            emphasis: { // 高亮状态下 
              show: false,
              color: '#fff'
            },
          },
          // emphasis: { // 高亮状态下
          //     label: {
          //         show: false,
          //         color: 'rgba(255,0,0,1)'
          //     }
          // },
          zoom: 0.9, // 当前视角的缩放比例。
          aspectScale: 1, // 用于 scale 地图的长宽比
          roam: false, // 鼠标缩放和平移漫游
          itemStyle: {
            normal: {
              areaColor: '#0f58ce',
              borderColor: '#2fb9ea',
              shadowColor: 'rgba(0,0,0,.75)',
              shadowBlur: 100
            },
            emphasis: {
              show: false,
              areaColor: '#2a333d'
            }
          }
        },
        series: [{
          name: 'AQI',
          type: 'heatmap',
          coordinateSystem: 'geo',
          pointSize: 8, // 设置 热力图 点 的大小
          blurSize: 5, // 设置点的 阴影半径
          data: convertData(dataValue)
        }]
      };

      HeatMap.setOption(option);

    }
  },
  props: ['mapData'],
  watch: {
    mapData(nv, ov) {
      this.getMap(nv)
    },
    // mapData: (nv, ov) => {
    //   this.getMap(nv)
    // }
  }
}
</script>

<style lang="less" scoped>
#heat_map {
  height: 100%;
}
</style>