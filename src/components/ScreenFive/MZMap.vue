<template>
  <div class="MZmap" ref="MZmap" :style="this.childClass"></div>
</template>
<script>
import echarts from "echarts";
import meizhou from "../../js/meizhou";

export default {
  name: "MeiZhouMap",
  data() {
    return {
      echartElement: null, // 地图页面元素
      titleFontColor: "white",
      mapColor: [],
      list: [],
      title: "\nTop5: "
    };
  },
  methods: {
    changeNum(num) {
      return Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .split(".")[0];
    },
    getMap(val) {
      echarts.registerMap("梅州", meizhou);
      var mapdata = val; // 所有数据
      var topArr = mapdata
        .sort(this.compare("value"))
        .slice(-5)
        .reverse(); // 前5名数据

      for (var i = 0; i < topArr.length; i++) {
        // this.title += (i + 1) + '. ' + topArr[i].name + ' : ' + this.changeNum(topArr[i].value) + '\n'
        this.title += topArr[i].name + this.changeNum(topArr[i].value) + "   ";
      }

      var result = mapdata[0].value;
      for (var i = 0; i < mapdata.length; i++) {
        result = Math.max(result, mapdata[i].value);
      }

      var placeList = [
        { name: "梅江区", coord: [116.12116, 24.302593] },
        { name: "梅县区", coord: [116.083482, 24.267825] },
        { name: "大埔县", coord: [116.69552, 24.351587] },
        { name: "丰顺县", coord: [116.184419, 23.752771] },
        { name: "五华县", coord: [115.775004, 23.925424] },
        { name: "平远县", coord: [115.891729, 24.569651] },
        { name: "蕉岭县", coord: [116.170531, 24.653313] },
        { name: "兴宁市", coord: [115.731648, 24.138077] }
      ];

      var geoCoordMap = {
        梅江区: [116.12116, 24.302593],
        梅县区: [116.083482, 24.267825],
        大埔县: [116.69552, 24.351587],
        丰顺县: [116.184419, 23.752771],
        五华县: [115.775004, 23.925424],
        平远县: [115.891729, 24.569651],
        蕉岭县: [116.170531, 24.653313],
        兴宁市: [115.731648, 24.138077]
      };

      var getGeoCoord = function() {
        var rst = {};
        for (var i = 0; i < placeList.length; i++) {
          rst[placeList[i].name] = placeList[i].geoCoord;
        }
        for (var i = 0; i < 10; i++) {
          rst["提示" + i] = [118, 25.4 - 0.2 * i];
        }
        return rst;
      };

      var convertData = function(data) {
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
      this.echartElement = echarts.init(this.$el);

      // 绘制图表
      let options = {
        title: {
          show: false,
          text: this.titleName,
          subtext: this.title,
          left: "5%",
          bottom: "2%",
          padding: [10, 10],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: "Arial",
            fontWeight: "500",
            fontSize: "22%"
          },
          subtextStyle: {
            color: "white", // 副标题文字颜色
            fontSize: "15%",
            lineHeight: 25,
            align: "left",
            height: 200
          }
        },
        backgroundColor: "",
        tooltip: {
          position: "top",
          formatter: params => {
            if (params.data == undefined) {
              return;
            } else {
              //   return "交易金额(万元):</br>" + params.name + ': ' + this.changeNum(params.data.value[2]);
              return (
                "交易金额(万元):</br>" +
                params.name +
                ": " +
                parseInt(params.data.value[2])
              );
            }
          }
        },
        animation: false,
        grid: {
          height: "100%",
          left: "10%",
          bottom: "5%"
        },
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: result,
        //   right: "10%",
        //   // top: 'bottom',
        //   bottom: "5%",
        //   calculable: false,
        //   // seriesIndex: [1],
        //   inRange: {
        //     // color: ['#2fb9ea', '#0f58ce'] // 蓝绿
        //   }
        // },
        geo: [
          {
            map: "梅州",
            silent: true,
            aspectScale: 1.5, //0.75 geoBoundingRect.width / geoBoundingRect.height * aspectScale
            top: "23%",
            left: "10%",
            right: "10%",
            bottom: "20%",
            zoom: 1.2,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "white",
                  fontWeight: "500",
                  fontSize: 16
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#2fb9ea",
                borderColor: "#2fb9ea",
                borderWidth: 2
              },
              emphasis: {
                areaColor: "transparent",
                borderWidth: 2,
                shadowColor: "transparent"
              }
            }
          },
          {
            map: "梅州",
            zoom: 1.2,
            aspectScale: 1.5,
            top: "21%",
            left: "10%",
            right: "10%",
            bottom: "22%",
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#0f58ce",
                borderColor: "#2fb9ea",
                label: {
                  show: false,
                  textStyle: {
                    color: "white",
                    fontSize: 18
                  }
                }
              },
              emphasis: {
                // label: {
                //   show: false,
                // },
                areaColor: "#2fb9ea",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        series: [
          {
            geoIndex: 1,
            type: "map",
            name: "",
            roam: false,
            data: convertData(mapdata),
            geoCoord: getGeoCoord(),
            markPoint: {
              symbol: "pin",
              symbolsize: 5,
              itemStyle: {
                // color:'rgba(4,64,97,0.8)',
                color: "yellow"
              },
              data: this.list
            }
          },
          /* 普通点 */
          {
            name: "",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(mapdata),
            symbolSize: function(val) {
              if (val[2] == "0.0") {
                return 0;
              } else {
                return 12;
              }
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "top",
                show: true,
                color: "white",
                fontSize: 16
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#07b6ea"
              },
              emphasis: {
                color: "#07b6ea"
              }
            }
          },
          /* 动画点 */
          {
            name: "",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              mapdata
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            symbolSize: function(val) {
              if (val[2] == "0.0") return 0;
              return (maxNum -= 3);
            },
            // showEffectOn: 'none',
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            // show:false,
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "#00ffff",
                shadowBlur: 10,
                shadowColor: "#07b6ea"
              }
            },
            zlevel: 1
          }
        ]
      };
      this.echartElement.setOption(options);

      window.addEventListener("resize", _ => {
        this.echartElement.resize();
      });
    },

    // 排序
    compare(prop) {
      return function(a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      };
    }
  },
  props: ["childClass", "titleName", "meizhouMapValueData"],
  watch: {
    meizhouMapValueData(nv) {
      let newVal = this.$deepClone(nv);
      this.getMap(newVal);
    }
  },
  beforeDestroy() {
    this.echartElement.dispose();
  }
};
</script>
<style lang="less">
.MZmap {
  width: 100%;
  height: 100%;
}
</style>
