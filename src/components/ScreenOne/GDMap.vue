<template>
  <div id="GDmap" ref="GDmap" :style="this.childClass"></div>
</template>
<script>
//import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/guangdong.js'; // 引入广东地图数据
//import '../../js/echarts-all.js'; 
//import '../../js/china.js'; 
//import '../../js/guangdong.js'; 

export default {
  name: 'GuangdongMap',
  data() {
    return {
      titleFontColor: 'white',
      mapColor: [],
      list: [],
      title: '\nTop5: ',
    }
  },

  mounted() {
    setTimeout(() => {
      this.getMap();
      //   this.dataList();
    }, 800)

  },
  methods: {
    changeNum(num) {
      return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0]
    },
    getMap(mapname) {
      var mapdata = this.localMapValueData;
      // console.log(mapdata);
      var topArr = this.localMapValueData.sort(this.compare("value")).slice(-5).reverse();

      for (var i = 0; i < topArr.length; i++) {
        // this.title += (i + 1) + '. ' + topArr[i].name + ' : ' + this.changeNum(topArr[i].value) + '\n'
        this.title += topArr[i].name + this.changeNum(topArr[i].value) + '   '
      }

      var result = mapdata[0].value;
      for (var i = 0; i < mapdata.length; i++) {
        result = Math.max(result, mapdata[i].value);
      }


      var placeList = [
        { name: '广州市', coord: [113.5, 23.5] },
        { name: '云浮市', coord: [111.8, 23.1] },
        { name: '梅州市', coord: [116.1, 24.55] },
        { name: '汕尾市', coord: [115.5, 23.2] },
        { name: '潮州市', coord: [116.76, 24] },
        { name: '汕头市', coord: [116.69, 23.39] },
        { name: '湛江市', coord: [110.1, 21.270708] },
        { name: '揭阳市', coord: [116, 23.55] },
        { name: '东莞市', coord: [113.85, 23.08] },
        { name: '韶关市', coord: [113.8, 25.1] },
        { name: '清远市', coord: [113.01, 24.4] },
        { name: '中山市', coord: [113.38, 22.6] },
        { name: '深圳市', coord: [114.07, 22.62] },
        { name: '珠海市', coord: [113.52, 22.3] },
        { name: '佛山市', coord: [113, 23.24] },
        { name: '茂名市', coord: [110.95, 22] },
        { name: '阳江市', coord: [111.75, 22.2] },
        { name: '惠州市', coord: [114.4, 23.5] },
        { name: '江门市', coord: [112.7, 22.58] },
        { name: '肇庆市', coord: [112.1, 23.74] },
        { name: '河源市', coord: [115.1, 24.36] },
      ];

      var geoCoordMap = {
        '广州市': [113.5, 23.5],
        '云浮市': [111.8, 23.1],
        '梅州市': [116.1, 24.55],
        '汕尾市': [115.5, 23.2],
        '潮州市': [116.76, 24],
        '汕头市': [116.69, 23.39],
        '湛江市': [110.1, 21.270708],
        '揭阳市': [116, 23.55],
        '东莞市': [113.85, 23.08],
        '韶关市': [113.8, 25.1],
        '清远市': [113.01, 24.4],
        '中山市': [113.38, 22.6],
        '深圳市': [114.07, 22.62],
        '珠海市': [113.52, 22.3],
        '佛山市': [113, 23.24],
        '茂名市': [110.95, 22],
        '阳江市': [111.75, 22.2],
        '惠州市': [114.4, 23.5],
        '江门市': [112.7, 22.58],
        '肇庆市': [112.1, 23.74],
        '河源市': [115.1, 24.36]
      }

      var getGeoCoord = function () {
        var rst = {};
        for (var i = 0; i < placeList.length; i++) {
          rst[placeList[i].name] = placeList[i].geoCoord;
        }
        for (var i = 0; i < 10; i++) {
          rst['提示' + i] = [118, 25.4 - 0.2 * i];
        }
        return rst;
      }

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      let maxNum = 30;
      // 基于准备好的dom，初始化echarts实例
      let mapChart = this.$echarts.init(document.getElementById('GDmap'));
      // 绘制图表
      let options = {
        title: {
          show: false,
          text: this.titleName,
          subtext: this.title,
          left: 'left',
          top: "2%",
          padding: [10, 10],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: '500',
            fontSize: '22%'
          },
          subtextStyle: {
            color: 'white',// 副标题文字颜色
            fontSize: '15%',
            lineHeight: 25,
            align: 'left',
            height: 200,
          },
        },
        backgroundColor: '',
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '100%',
          x: "25%",
          y: "25%"
        },
        visualMap: {
          show: false,
          min: 0,
          max: result,
          right: '10%',
          //		        top: 'bottom',
          bottom: '5%',
          calculable: false,
          //		        seriesIndex: [1],
          inRange: {
            // color: ['#2fb9ea', '#0f58ce'] // 蓝绿
          }
        },
        geo: [
          {
            map: '广东',
            silent: true,
            aspectScale: 1.5, //0.75 geoBoundingRect.width / geoBoundingRect.height * aspectScale
            top: '47%',
            zoom: 1.2,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 16,
                }
              },
              emphasis: {
                show: false,
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#2fb9ea',
                borderColor: '#2fb9ea',
                borderWidth: 2,
              },
              emphasis: {
                areaColor: 'transparent',
                borderWidth: 2,
                shadowColor: 'transparent'
              }
            }
          },
          {
            map: '广东',
            zoom: 1.2,
            aspectScale: 1.5,
            top: '45%',

            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#0f58ce',
                borderColor: '#2fb9ea',
                label: {
                  show: false,
                  textStyle: {
                    color: 'white',
                    fontSize: 18,
                  }
                }
              },
              emphasis: {
                // label: {
                //   show: false,
                // },
                areaColor: '#2fb9ea',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        series: [
          {
            geoIndex: 1,
            type: 'map',
            name: '交易情况',
            roam: false,
            data: convertData(mapdata),
            geoCoord: getGeoCoord(),
            itemStyle: {
              color:
                function (params) {

                  //   console.log(params.name)
                  if (params.name == mapname) {
                    return "#2fb9ea"                  }
                }
            },
            markPoint: {
              symbol: 'pin',
              symbolsize: 5,
              itemStyle: {
                // color:'rgba(4,64,97,0.8)',
                color: 'yellow'
              },
              data: this.list
              //             [
              //               {name:'广州',coord:[113.23, 23.16]},
              //               
              //             ]
            },

          },
          /* 普通点 */
          {
            name: '',
            // type: 'scatter',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(mapdata),
            symbolSize: function (val) {
              if (val[2] == "0.0") {
                return 0
              } else {
                return 12;
              };
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'top',
                show: true,
                color: 'white',
                fontSize: 16,
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#07b6ea',
              },
              emphasis: {
                color: '#07b6ea'
              }
            }
          },
          /* 动画点 */
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(mapdata.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function (val) {
              if (val[2] == "0.0") return 0;
              return maxNum -= 3;
            },
            // showEffectOn: 'none',
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            // show:false,
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#00ffff',
                shadowBlur: 10,
                shadowColor: '#07b6ea'
              }
            },
            zlevel: 1
          },
        ]
      };
      mapChart.setOption(options);


      //       window.addEventListener("resize", function() {
      //         mapChart.resize();
      //       });
    },

    // 排序
    compare(prop) {
      return function (a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      }
    },
  },//methods
  props: ['childClass', 'titleName', 'localMapValueData']
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#GDmap {
  width: 100%;
  height: 100%;
}
</style>
