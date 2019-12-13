<template>
    <div id="map" ref="map" :style="this.childClass"></div>
</template>
<script>
import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据

export default {
    name: 'ChinaMap',
    data() {
        return {
            // titleFontColor: 'rgba(80,178,240,0.8)',
            titleFontColor: 'white',
            mapColor: [
                [0, '#BCBFD8'],
                [0.3, '#6B759D'],
                [0.4, '#AFFCF7'],
                [1, '#46B9DE']
            ],
            list: [],
            //   title: '\n1.城市1 \n2.城市2 \n3.城市3 \n4.城市4 \n5.城市5',
            title: '\nTop5: '
        }
    },
    mounted() {
        setTimeout(() => {
            this.getMap();
            // this.dataList();
        }, 800)

    },
    methods: {

        changeNum(num) {
            return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0]
        },

        dataList() {
            var geoCoordMapList = [
                { name: "北京", coord: [116.40, 40.40] },
                { name: "新疆", coord: [86.61, 40.79] },
                { name: "西藏", coord: [89.13, 30.66] },
                { name: "黑龙江", coord: [128.34, 47.05] },
                { name: "吉林", coord: [126.32, 43.38] },
                { name: "辽宁", coord: [123.42, 41.29] },
                { name: "内蒙古", coord: [112.17, 42.81] },
                { name: "宁夏", coord: [106.27, 36.76] },
                { name: "山西", coord: [111.95, 37.65] },
                { name: "河北", coord: [115.21, 38.44] },
                { name: "天津", coord: [117.04, 39.52] },
                { name: "青海", coord: [97.07, 35.62] },
                { name: "甘肃", coord: [103.82, 36.05] },
                { name: "山东", coord: [118.01, 36.37] },
                { name: "陕西", coord: [108.94, 34.46] },
                { name: "河南", coord: [113.46, 34.25] },
                { name: "安徽", coord: [117.28, 31.86] },
                { name: "江苏", coord: [120.26, 32.54] },
                { name: "上海", coord: [121.46, 31.28] },
                { name: "四川", coord: [103.36, 30.65] },
                { name: "湖北", coord: [112.29, 30.98] },
                { name: "浙江", coord: [120.15, 29.28] },
                { name: "重庆", coord: [107.51, 29.63] },
                { name: "湖南", coord: [112.08, 27.79] },
                { name: "江西", coord: [115.89, 27.97] },
                { name: "贵州", coord: [106.91, 26.67] },
                { name: "福建", coord: [118.31, 26.07] },
                { name: "云南", coord: [101.71, 24.84] },
                { name: "台湾", coord: [121.01, 23.54] },
                { name: "广西", coord: [108.67, 23.68] },
                { name: "广东", coord: [113.98, 22.82] },
                { name: "海南", coord: [110.03, 19.33] },
                { name: "澳门", coord: [113.54, 22.19] },
                { name: "香港", coord: [114.17, 22.32] }
            ];
            var that = this
            var a = -1;
            setInterval(function () {
                if (a > 34) {
                    a = 0;
                } else {
                    a++;
                }
                that.list = []
                var localName = ''


                for (var i = 0; i < that.nationMapValueData.length; i++) {
                    if (geoCoordMapList[a] == undefined) {
                        var b = Number(that.nationMapValueData[0].amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0]


                        that.title = that.nationMapValueData[0].type + " " + b + " " + "笔"
                        localName = that.nationMapValueData[0].type
                        that.list.push(geoCoordMapList[0])
                    } else {
                        if (geoCoordMapList[a]["name"] == that.nationMapValueData[i].type) {
                            var b = Number(that.nationMapValueData[i].amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0]
                            that.title = that.nationMapValueData[i].type + " " + b + " " + "笔"
                            localName = that.nationMapValueData[i].type
                            that.list.push(geoCoordMapList[a])
                        }
                    }
                }
                that.getMap(localName)
            }, 2000)

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

            var data = this.nationMapValueData;
            //   存Top5 前五名
            var topArr = this.nationMapValueData.sort(this.compare("amount")).slice(-5).reverse();

            for (var i = 0; i < topArr.length; i++) {
                // this.title += (i + 1) + '. ' + topArr[i].type + ' : ' + this.changeNum(topArr[i].amount) + '\n'
                this.title += topArr[i].type + this.changeNum(topArr[i].amount) + '   '
            }


            var result = data[0].amount;
            for (var i = 0; i < data.length; i++) {
                result = Math.max(result, data[i].amount);
            }

            // 全国城市坐标
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

            // 基于准备好的dom，初始化echarts实例
            let chinaMap = this.$echarts.init(this.$el);
            // let chinaMap = this.$echarts.init(this.$refs.map);
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
                    // top: '5%',
                },
                // 左下角的条子
                visualMap: {
                    show: false,
                    min: 0,
                    max: result,
                    left: 'center',
                    top: '5%',
                    // bottom: '5%',
                    calculable: false,
                    // seriesIndex: [1],
                    inRange: {
                        // color: ['#2fb9ea', '#0f58ce'] // 蓝绿
                    }
                },
                geo: [
                    {
                        type: 'map',
                        map: 'china',
                        top: '32%',
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
                                areaColor: '#2fb9ea',
                                borderColor: '#2fb9ea',
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
                        top: '30%',
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
                                areaColor: '#0f58ce',
                                // areaColor: 'red',
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
                        // geoCoord: convertData(data),
                        itemStyle: {
                            color:
                                function (params) {
                                    if (params.name == mapname) {
                                        return "yellow"                                    }
                                }
                        },
                        markPoint: {
                            symbol: 'pin',
                            symbolsize: 5,
                            itemStyle: {
                                color: 'yellow'
                            },
                            data: this.list
                        },
                    },
                    /* 普通点 */
                    {
                        name: '',
                        // type: 'scatter',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: 12,
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
                        data: convertData(data.sort(function (a, b) {
                            return b.amount - a.amount;
                        }).slice(0, 5)),
                        symbolSize: function (val) {
                            if (val[2] == 0) {
                                return 0
                            } else {
                                return maxNum -= 3;
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

            chinaMap.setOption(option);
            var that = this
            chinaMap.on('touch', function (params) { });

            // 轮播事件
            // 轮播事件

        }
    },
    props: ['childClass', 'nationMapValueData', 'titleName']
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
