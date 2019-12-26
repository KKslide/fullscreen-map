<template>
    <div id="GDmap" ref="GDmap" :style="this.childClass"></div>
</template>
<script>
//import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
// import '../../../node_modules/echarts/map/js/province/guangdong.js'; // 引入广东地图数据
//import '../../js/echarts-all.js'; 
//import '../../js/china.js'; 
// import '../../js/guangdong'; 
import some from '../../js/temp'; // 拼凑出来的json格式的包括部分县级的地标数据

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
        }, 800)

    },
    methods: {
        changeNum(num) {
            return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0]
        },
        getMap(mapname) {
            this.$echarts.registerMap('广东', some);

            var mapdata = this.localMapValueData; // 所有数据

            var topArr = this.localMapValueData.sort(this.compare("value")).slice(-5).reverse(); // 前5名数据

            for (var i = 0; i < topArr.length; i++) {
                // this.title += (i + 1) + '. ' + topArr[i].name + ' : ' + this.changeNum(topArr[i].value) + '\n'
                this.title += topArr[i].name + this.changeNum(topArr[i].value) + '   '
            }

            var result = mapdata[0].value;
            for (var i = 0; i < mapdata.length; i++) {
                result = Math.max(result, mapdata[i].value);
            }

            var placeList = [
                { name: '广州', coord: [113.5, 23.5] },
                { name: '云浮', coord: [111.8, 23.1] },
                { name: '梅州', coord: [116.1, 24.55] },
                { name: '汕尾', coord: [115.5, 23.2] },
                { name: '潮州', coord: [116.76, 24] },
                { name: '汕头', coord: [116.69, 23.39] },
                { name: '湛江', coord: [110.1, 21.270708] },
                { name: '揭阳', coord: [116, 23.55] },
                { name: '东莞', coord: [113.85, 23.08] },
                { name: '韶关', coord: [113.8, 25.1] },
                { name: '清远', coord: [113.01, 24.4] },
                { name: '中山', coord: [113.38, 22.6] },
                { name: '深圳', coord: [114.07, 22.62] },
                { name: '珠海', coord: [113.52, 22.3] },
                { name: '佛山', coord: [113, 23.24] },
                { name: '茂名', coord: [110.95, 22] },
                { name: '阳江', coord: [111.75, 22.2] },
                { name: '惠州', coord: [114.4, 23.5] },
                { name: '江门', coord: [112.7, 22.58] },
                { name: '肇庆', coord: [112.1, 23.74] },
                { name: '河源', coord: [115.1, 24.36] },
                { name: '新兴', coord: [112.23083, 22.703204] },
                { name: '鹤山', coord: [112.961795, 22.768104] },
                { name: '阳春', coord: [111.7905, 22.169598] },
                { name: '清新', coord: [113.015203, 23.736949] },
                { name: '佛冈', coord: [113.534094, 23.866739] },
                { name: '阳山', coord: [112.634019, 24.470286] },
                { name: '英德', coord: [113.405404, 24.18612] },
                { name: '连州', coord: [112.379271, 24.783966] },
                { name: '曲江', coord: [113.605582, 24.680195] },
                { name: '霞兴', coord: [113.748627, 25.088226] },
                { name: '南雄', coord: [114.311231, 25.115328] },
                { name: '开平', coord: [112.692262, 22.366286] },
                { name: '恩平', coord: [112.314051, 22.182956] },
                { name: '阳东', coord: [112.011267, 21.864728] },
                { name: '阳西', coord: [111.617556, 21.75367] },
                { name: '揭阳', coord: [116.355733, 23.543778] },
                { name: '丰顺', coord: [116.184419, 23.752771] }
            ];

            var geoCoordMap = {
                '广州': [113.5, 23.5],
                '云浮': [111.8, 23.1],
                '梅州': [116.1, 24.55],
                '汕尾': [115.5, 23.2],
                '潮州': [116.76, 24],
                '汕头': [116.69, 23.39],
                '湛江': [110.1, 21.270708],
                '揭阳': [116, 23.55],
                '东莞': [113.85, 23.08],
                '韶关': [113.8, 25.1],
                '清远': [113.01, 24.4],
                '中山': [113.38, 22.6],
                '深圳': [114.07, 22.62],
                '珠海': [113.52, 22.3],
                '佛山': [113, 23.24],
                '茂名': [110.95, 22],
                '阳江': [111.75, 22.2],
                '惠州': [114.4, 23.5],
                '江门': [112.7, 22.58],
                '肇庆': [112.1, 23.74],
                '河源': [115.1, 24.36],
                '新兴': [112.23083, 22.703204],
                "鹤山": [112.961795, 22.768104],
                "阳春": [111.7905, 22.169598],
                "清新": [113.015203, 23.736949],
                "佛冈": [113.534094, 23.866739],
                "阳山": [112.634019, 24.470286],
                "英德": [113.405404, 24.18612],
                "连州": [112.379271, 24.783966],
                "曲江": [113.605582, 24.680195],
                "霞兴": [113.748627, 25.088226],
                "南雄": [114.311231, 25.115328],
                "开平": [112.692262, 22.366286],
                "恩平": [112.314051, 22.182956],
                "阳东": [112.011267, 21.864728],
                "阳西": [111.617556, 21.75367],
                "揭阳": [116.355733, 23.543778],
                "丰顺": [116.184419, 23.752771]

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
                    position: 'top',
                    formatter: params => {
                        if (params.data == undefined) {
                            return
                        } else {
                            //   return "交易金额(万元):</br>" + params.name + ': ' + this.changeNum(params.data.value[2]);
                            return "交易金额(万元):</br>" + params.name + ': ' + parseInt(params.data.value[2]);
                        }
                    }
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
                    // top: 'bottom',
                    bottom: '5%',
                    calculable: false,
                    // seriesIndex: [1],
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
                        name: '',
                        roam: false,
                        data: convertData(mapdata),
                        geoCoord: getGeoCoord(),
                        itemStyle: {
                            color:
                                function (params) {
                                    if (params.name == mapname) {
                                        return "#2fb9ea"                                    }
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
                            //   [
                            //     { name: '广州', coord: [113.23, 23.16] },

                            //     ]
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

            window.addEventListener("resize", function() {
              mapChart.resize();
            });
        },

        // 排序
        compare(prop) {
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
    },
    props: ['childClass', 'titleName', 'localMapValueData']
};

</script>
<style lang="less">
#GDmap {
    width: 100%;
    height: 100%;
}
</style>
