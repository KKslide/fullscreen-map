<template>
  <div id="DayAvgTradeTime" ref="dayAvgTradeTime"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.getChart()
  },
  methods: {
    getChart() {
      let myChart = this.$echarts.init(this.$refs.dayAvgTradeTime)
      let option = {
        "series": [
          {
            // show: false,
            "title": {
              "show": false
            },
            "name": "",
            "type": "gauge",
            "min": 0,
            "max": 100,
            "splitNumber": 10,
            "startAngle": 180,
            "endAngle": 0,
            "center": ["50%", 440],
            "radius": 200,
            "axisLabel": {
              "distance": 0,
              "fontFamily": "Microsoft YaHei UI",
              "fontSize": 16,
              "fontWeight": "normal",
              "fontStyle": "normal",
              "color": "#FFFFFF"
            },
            "axisLine": {
              "lineStyle": {
                "width": 2,
                "color": [
                  [1, {
                    "x": "0.00",
                    "y": "0.00",
                    "x2": "1.00",
                    "y2": "1.00",
                    "type": "linear",
                    "global": false,
                    "colorStops": [{
                      "offset": 0,
                      "color": "rgba(0,0,0,1)"
                    }, {
                      "offset": 1,
                      "color": "rgba(152,202,236,1)"
                    }, {
                      "offset": 0.3579,
                      "color": "rgba(43,225,247,1)"
                    }, {
                      "offset": 0.6895,
                      "color": "rgba(39,124,230,1)"
                    }, {
                      "offset": 0.1211,
                      "color": "rgba(49,91,200,1)"
                    }, {
                      "offset": 0.8105,
                      "color": "rgba(24,66,174,1)"
                    }]
                  }]
                ]
              }
            },
            "pointer": {
              "show": true
            },
            "itemStyle": {
              "normal": {
                "color": {
                  "x": "0.00",
                  "y": "0.00",
                  "x2": "1.00",
                  "y2": "1.00",
                  "type": "linear",
                  "global": false,
                  "colorStops": [{
                    "offset": 0,
                    "color": "rgba(0,0,0,1)"
                  }, {
                    "offset": 1,
                    "color": "rgba(202,95,95,1)"
                  }, {
                    "offset": 0.3579,
                    "color": "rgba(34,72,61,1)"
                  }, {
                    "offset": 0.6895,
                    "color": "rgba(224,229,37,1)"
                  }]
                },
                "borderColor": {
                  "x": "0.00",
                  "y": "0.00",
                  "x2": "1.00",
                  "y2": "1.00",
                  "type": "linear",
                  "global": false,
                  "colorStops": [{
                    "offset": 0,
                    "color": "rgba(0,0,0,1)"
                  }, {
                    "offset": 1,
                    "color": "rgba(202,95,95,1)"
                  }, {
                    "offset": 0.3579,
                    "color": "rgba(34,72,61,1)"
                  }, {
                    "offset": 0.6895,
                    "color": "rgba(224,229,37,1)"
                  }]
                },
                "borderWidth": 1
              }
            },
            "axisTick": {
              "length": 16,
              "lineStyle": {
                "width": 4,
                "color": "#5c53de"
              }
            },
            "splitLine": {
              "length": 32,
              "lineStyle": {
                "width": 4,
                "color": "#5c53de"
              }
            },
            "detail": {
              "show": false
            },
            "data": [{
              "value": 66,
              "name": "半圆仪表_0"
            }]
          },
          {
            "title": {
              "show": false
            },
            "name": "",
            "type": "gauge",
            "min": 0,
            "max": 100,
            "splitNumber": 1,
            "startAngle": 180,
            "endAngle": 0,
            "center": ["50%", 440],
            "radius": 225,
            "axisLine": {
              "lineStyle": {
                "width": 25.6,
                "color": [
                  [0.78, {
                    "x": "0.00",
                    "y": "0.00",
                    "x2": "1.00",
                    "y2": "1.00",
                    "type": "linear",
                    "global": false,
                    "colorStops": [{
                      "offset": 0,
                      "color": "rgba(0,0,0,1)"
                    }, {
                      "offset": 1,
                      "color": "rgba(43,225,247,1)"
                    }, {
                      "offset": 0.3579,
                      "color": "rgba(39,124,230,1)"
                    }, {
                      "offset": 0.6895,
                      "color": "rgba(24,66,174,1)"
                    }]
                  }],
                  [1, "rgba(0,0,0,0)"]
                ],
                shadowColor: '#975df7', //默认透明
                shadowBlur: 20
              }
            },
            "pointer": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "show": false
            },
            "splitLine": {
              "show": false
            },
            "detail": {
              "show": false
            }
          },
          {
            "title": {
              "show": false
            },
            "name": "",
            "type": "gauge",
            "min": 0,
            "max": 100,
            "splitNumber": 1,
            "startAngle": 180,
            "endAngle": 0,
            "center": ["50%", 440],
            "radius": 225,
            "axisLine": {
              "lineStyle": {
                "width": 2,
                "color": [
                  [1, {
                    "x": "0.00",
                    "y": "0.00",
                    "x2": "1.00",
                    "y2": "1.00",
                    "type": "linear",
                    "global": false,
                    "colorStops": [{
                      "offset": 0,
                      "color": "rgba(0,0,0,1)"
                    }, {
                      "offset": 1,
                      "color": "rgba(152,202,236,1)"
                    }, {
                      "offset": 0.3579,
                      "color": "rgba(43,225,247,1)"
                    }, {
                      "offset": 0.6895,
                      "color": "rgba(39,124,230,1)"
                    }, {
                      "offset": 0.1211,
                      "color": "rgba(49,91,200,1)"
                    }, {
                      "offset": 0.8105,
                      "color": "rgba(24,66,174,1)"
                    }]
                  }]
                ]
              }
            },
            "pointer": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            "axisLabel": {
              "show": false
            },
            "splitLine": {
              "length": 25.6,
              "lineStyle": {
                "width": 2,
                "color": {
                  "x": "0.00",
                  "y": "0.00",
                  "x2": "1.00",
                  "y2": "1.00",
                  "type": "linear",
                  "global": false,
                  "colorStops": [{
                    "offset": 0,
                    "color": "rgba(0,0,0,1)"
                  }, {
                    "offset": 1,
                    "color": "rgba(202,95,95,1)"
                  }, {
                    "offset": 0.3579,
                    "color": "rgba(34,72,61,1)"
                  }, {
                    "offset": 0.6895,
                    "color": "rgba(39,175,88,1)"
                  }, {
                    "offset": 0.1211,
                    "color": "rgba(52,225,41,1)"
                  }, {
                    "offset": 0.8105,
                    "color": "rgba(218,190,35,1)"
                  }]
                }
              }
            },
            "detail": {
              "show": false
            }
          }
        ],
        "grid": {
          "top": 16,
          "left": 16,
          "right": 16,
          "bottom": 16,
          "containLabel": false
        }
      }
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
#DayAvgTradeTime {
  width: 100%;
  height: 100%;
}
</style>