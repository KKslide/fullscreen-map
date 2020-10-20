<template>
    <div id="map" ref="map" :style="this.childClass"></div>
</template>
<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
import { mapData } from './HeatMapTemp'; // 引入热力图数据
import allCity from 'e:/Work/nantian/梅州客商大屏/05上线阶段/tomcat/apache-tomcat-7.0.94/webapps/usp_ks/fxxking_big_screen/src/js/allCity.js';

export default {
    name: 'ChinaMap',
    data() {
        return {
            titleFontColor: 'white',
            mapColor: [
                [0, '#BCBFD8'],
                [0.3, '#6B759D'],
                [0.4, '#AFFCF7'],
                [1, '#46B9DE']
            ],
            list: [],
            title: '\nTop5: ',
            echartElement: null,
        }
    },
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
        getMap(mapname) {
            // 基于准备好的dom，初始化echarts实例
            this.echartElement = echarts.init(this.$el);
            var data = this.$deepClone(this.nationMapValueData);
            //   存Top5 前五名
            var topArr = data.sort(this.compare("amount")).slice(-5).reverse();

            for (var i = 0; i < topArr.length; i++) {
                // this.title += (i + 1) + '. ' + topArr[i].type + ' : ' + this.changeNum(topArr[i].amount) + '\n'
                this.title += topArr[i].type + this.changeNum(topArr[i].amount) + '   '
            }

            var result = data[0].amount;
            for (var i = 0; i < data.length; i++) {
                result = Math.max(result, data[i].amount);
            }

            // 全国城市坐标
            var geoCoordMap = allCity;

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].type];
                    if (geoCoord) {
                        res.push({
                            name: data[i].type,
                            value: geoCoord.concat(data[i].amount),
                        });
                    }
                }
                return res;
            };

            let maxNum = 30;

            // 绘制图表
            let option = {
                title: {
                    text: this.titleName,
                    subtext: this.title,
                    show: false,
                    left: 'left',
                    top: "2%",
                    padding: [10, 10],
                    textStyle: {
                        color: this.titleFontColor,
                        fontFamily: 'Arial',
                        // fontWeight: 'lighter',
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
                // backgroundColor: 'pink',
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
                            return "交易金额(万元):</br>" + params.name + ': ' + parseInt(params.data.value[2]);
                        }
                    }
                },
                animation: false,
                grid: {
                    backgroundColor: 'rgba(255,0,0,.8)',
                    // height: '0%',
                    // x: '15%',
                    // y: '5%'
                    // left: 'center',
                    //   top: '35%',
                },
                // 左下角的条子
                visualMap: {
                    show: false,
                    min: 0,
                    max: result,
                    left: 'center',
                    top: '10%',
                    // bottom: '5%',
                    calculable: false,
                    // seriesIndex: [1],
                    inRange: {
                        // color: ['#2fb9ea', '#0f58ce'] // 蓝绿
                        // color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
                    }
                },
                geo: [
                    {
                        type: 'map',
                        map: 'china',
                        top: '35%',
                        left: '12%',
                        right: '12%',
                        bottom: '10%',
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
                        top: '35%',
                        left: '12%',
                        right: '12%',
                        bottom: '10%',
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
                    /* 普通地图 */
                    {
                        geoIndex: 1,
                        type: 'map',
                        name: '',
                        roam: false,
                        data: convertData(data),
                        // geoCoord: convertData(data),
                        itemStyle: {},
                        markPoint: {
                            symbol: 'pin',
                            symbolsize: 5,
                            itemStyle: {
                                color: 'yellow'
                            },
                            data: this.list
                        },
                    },
                    /* 热力图 */
                    {
                        geoIndex: 1,
                        name: '',
                        type: 'heatmap',
                        coordinateSystem: 'geo',
                        data: convertData(mapData)
                    },
                    /* 普通点 */
                    // {
                    //     name: '',
                    //     // type: 'scatter',
                    //     type: 'effectScatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(data),
                    //     // symbolSize: 12,
                    //     symbolSize: function (val) {
                    //         if (val[2] == "0.0" || val[2] == "") {
                    //             return 0
                    //         } else {
                    //             return 12;
                    //         };
                    //     },
                    //     showEffectOn: 'render',
                    //     rippleEffect: {
                    //         brushType: 'stroke'
                    //     },
                    //     label: {
                    //         normal: {
                    //             formatter: '{b}',
                    //             position: 'top',
                    //             show: true,
                    //             color: 'white',
                    //             fontSize: 16,
                    //         },
                    //         emphasis: {
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#07b6ea',
                    //         },
                    //         emphasis: {
                    //             color: '#07b6ea'
                    //         }
                    //     }
                    // },
                    // /* 动画点 */
                    // {
                    //     name: '',
                    //     type: 'effectScatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(data.sort(function (a, b) {
                    //         return b.amount - a.amount;
                    //     }).slice(0, 5)),
                    //     symbolSize: function (val) {
                    //         if (val[2] == 0) {
                    //             return 0
                    //         } else {
                    //             return maxNum -= 3;
                    //         }
                    //     },
                    //     // showEffectOn: 'none',
                    //     showEffectOn: 'render',
                    //     rippleEffect: {
                    //         brushType: 'stroke'
                    //     },
                    //     // show:false,
                    //     hoverAnimation: true,
                    //     label: {
                    //         normal: {
                    //             formatter: '{b}',
                    //             position: 'right',
                    //             show: false
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#00ffff',
                    //             shadowBlur: 10,
                    //             shadowColor: '#07b6ea'
                    //         }
                    //     },
                    //     zlevel: 1
                    // },
                ]
            };

            this.echartElement.setOption(option);
        }
    },
    props: ['childClass', 'nationMapValueData', 'titleName'],
    watch: {
        nationMapValueData(v) {
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
