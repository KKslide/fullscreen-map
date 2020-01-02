<template>
    <div id="map" ref="chinaMap" :style="this.childClass"></div>
</template>
<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
export default {
    name: 'ChinaMap',
    data() {
        return {
            title: '\nTop5: ',
            echartElement: null,
        }
    },
    mounted() { },
    methods: {
        changeNum(num) {
            return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0]
        },

        // 排序
        compare(prop) {
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
        getMap() {
            // 基于准备好的dom，初始化echarts实例
            this.echartElement = echarts.init(this.$el);

            var data = this.$deepClone(this.nationMapValueData);
            //   存Top5 前五名
            var topArr = data.sort(this.compare("value")).slice(-5).reverse();

            for (var i = 0; i < topArr.length; i++) {
                this.title += topArr[i].type + this.changeNum(topArr[i].value) + '   '
            }

            var result = data[0].value;
            for (var i = 0; i < data.length; i++) {
                result = Math.max(result, data[i].value);
            }

            // 全国省份坐标
            var geoCoordMap = {
                "新疆": [86.61, 40.79],
                "西藏": [89.13, 30.66],
                "黑龙江": [128.34, 47.05],
                "吉林": [126.32, 43.38],
                "辽宁": [123.42, 41.29],
                "内蒙古": [112.17, 42.81],
                "北京": [116.40, 40.40],
                "宁夏": [106.27, 36.76],
                "山西": [111.95, 37.65],
                "河北": [115.21, 38.44],
                "天津": [117.04, 39.52],
                "青海": [97.07, 35.62],
                "甘肃": [103.82, 36.05],
                "山东": [118.01, 36.37],
                "陕西": [108.94, 34.46],
                "河南": [113.46, 34.25],
                "安徽": [117.28, 31.86],
                "江苏": [120.26, 32.54],
                "上海": [121.46, 31.28],
                "四川": [103.36, 30.65],
                "湖北": [112.29, 30.98],
                "浙江": [120.15, 29.28],
                "重庆": [107.51, 29.63],
                "湖南": [112.08, 27.79],
                "江西": [115.89, 27.97],
                "贵州": [106.91, 26.67],
                "福建": [118.31, 26.07],
                "云南": [101.71, 24.84],
                "台湾": [121.01, 23.54],
                "广西": [108.67, 23.68],
                "广东": [113.98, 22.82],
                "海南": [110.03, 19.33],
                "澳门": [113.54, 22.19],
                "香港": [114.17, 22.32]
            };

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].type];

                    if (geoCoord) {
                        res.push({
                            name: data[i].type,
                            value: geoCoord.concat(data[i].value),

                        });
                    }
                }
                return res;
            };

            let maxNum = 30;

            // 绘制图表
            let option = {
                title: {
                    text: '',
                    show: false,
                    right: '10%',
                    top: "15%",
                    padding: [10, 10],
                    textStyle: {
                        color: "#FFF",
                        fontFamily: 'Arial',
                        fontWeight: '500',
                        fontSize: '22%'
                    },
                },
                textStyle: {
                    color: this.fontColor,
                    fontSize: '80%'
                },
                tooltip: {
                    position: 'top',
                    show: true,
                    textStyle: {
                        color: "white",
                        fontSize: '10%'
                    },
                    formatter: function (params) {
                        if (params.data == undefined) {
                            return
                        } else {
                            return "交易金额(万元):</br>" + params.name + ': ' + Number(params.data.value[2]).toFixed(2) + "%";
                        }
                    }
                },
                animation: false,
                grid: {
                    backgroundColor: 'rgba(255,0,0,.8)',
                },
                // 左下角的条子
                visualMap: {
                    show: false,
                    min: 0,
                    max: result,
                    left: 'center',
                    top: '5%',
                    calculable: false,
                    inRange: {}
                },
                geo: [
                    {
                        type: 'map',
                        map: 'china',
                        top: '15%',
                        bottom: '25%',
                        left: '10%',
                        right: '30%',
                        zoom: 1.2,
                        aspectScale: 1.1,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                // areaColor: '#2fb9ea',
                                // borderColor: '#2fb9ea',

                                areaColor: '#031525',
                                borderWidth: 3,
                                borderColor: '#00FEFF',
                                shadowColor: 'rgba(3,221,255,0.8)',
                                shadowBlur: 30,
                                label: {
                                    show: true,
                                }
                            },
                            emphasis: {
                                areaColor: '#2fb9ea'
                            }
                        }
                    },
                    {
                        type: 'map',
                        top: '15%',
                        bottom: '25%',
                        left: '10%',
                        right: '30%',
                        zoom: 1.2,
                        aspectScale: 1.1,
                        map: 'china',
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: 'white',
                                    fontSize: 16,
                                }
                            },
                            emphasis: {
                                color: "#fff",
                                show: false
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#00177b',
                                borderColor: '#2fb9ea',
                            },
                            emphasis: {
                                areaColor: '#2fb9ea'
                            }
                        },
                    },
                ],
                series: [
                    {
                        geoIndex: 1,
                        type: 'map',
                        name: '',
                        roam: false,
                        data: convertData(data),
                        itemStyle: {},
                        markPoint: {
                            symbol: 'pin',
                            symbolsize: 5,
                            itemStyle: {
                                color: 'yellow'
                            }
                        },
                    },
                    /* 普通点 */
                    {
                        name: '',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
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
                                fontSize: 12,
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
                        data: convertData(data.sort(this.compare("value")).slice(-5)).reverse(),
                        symbolSize: function (val) {
                            if (val[2] == 0) {
                                return 0
                            } else {
                                return maxNum -= 4;
                            }
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
            this.echartElement.setOption(option);
        }
    },
    props: ['childClass', 'nationMapValueData', 'titleName'],
    watch: {
        nationMapValueData(newVal) {
            this.getMap()
        }
    },
    beforeDestroy() {
        this.echartElement.dispose();
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#map {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
