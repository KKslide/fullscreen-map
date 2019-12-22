<template>
        <div id="tradeMap" ref="map"></div>
</template>

<script>
import echarts from 'echarts'
import allCity from '../../js/allCity';
export default {
    name: 'LiveTrapMap',
    data() {
        return {
            echartElement: null,
            realData: {},
        }
    },
    methods: {
        getMap(pos) {
            const geoCoordMap = allCity;
            this.echartElement = echarts.init(this.$el);
            this.echartElement.clear(); // 清空还未绘制完成的路线
            // 不同地方的交易起点位置
            let BJData = [
                // [ { name: pos, value: 100 }, { name: '梅州' } ],
                // [{ name: '昆明', value: 70 }, { name: '梅州' }],
                // [{ name: '哈尔滨', value: 30 }, { name: '梅州' }],
                // [{ name: '青岛', value: 50 }, { name: '梅州' }],
                // [{ name: '南昌', value: 20 }, { name: '梅州' }],
                // [{ name: '银川', value: 10 }, { name: '梅州' }],
                // [{ name: '拉萨', value: 80 }, { name: '梅州' }],
                // [{ name: '西安', value: 55 }, { name: '梅州' }],
                // [{ name: '乌鲁木齐', value: 90 }, { name: '梅州' }]
            ];
            if (pos) BJData.push([{ name: pos.address, value: 100 }, { name: '梅州' }]);
            
            let convertData = function (data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let dataItem = data[i];
                    let fromCoord = geoCoordMap[dataItem[0].name];
                    let toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                            value: dataItem[0].value
                        }, {
                            coord: toCoord,
                        }]);
                    }
                }
                return res;
            };

            let series = [];
            [['梅州', BJData]].forEach((item, i) => {
                series.push(
                    { // 地图样貌
                        type: 'map',
                        show: false,
                        map: 'china',
                        geoIndex: 1,
                        // layoutCenter: ['50%', '50%'],
                        // layoutSize: "100%",
                        top: '30%',
                        bottom: '5%',
                        left: '3%',
                        right: '3%',
                        selectedMode: 'single',
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#00177B',
                                borderColor: '#0073DA',
                                borderWidth: 1
                            },
                            emphasis: {
                                label: {
                                    show: false
                                },
                                areaColor: '#00177B'
                            }
                        },
                        data: [
                            {
                                name: '梅州',
                                selected: false,
                                itemStyle: {
                                    areaColor: {
                                        type: 'radial',
                                        x: 0.5,
                                        y: 0.5,
                                        r: 0.5,
                                        colorStops: [{
                                            offset: 0,
                                            color: 'rgba(0,255,255, 0.1)'
                                        }, {
                                            offset: 1,
                                            color: 'rgba(0,255,255, 0.7)'
                                        }],
                                        global: false // 缺省为 false
                                    }
                                }
                            }
                        ]
                    },
                    { // 动画线条
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 5,
                            trailLength: 0.7,
                            symbol: 'arrow',
                            symbolSize: 5,
                        },
                        lineStyle: {
                            normal: {
                                color: '#00FAFA',
                                width: 1,
                                opacity: 0,
                                curveness: 0.2
                            }
                        },

                        data: convertData(item[1])
                    },
                    { // 线条起始位置的地名标签
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                backgroundColor: 'rgba(1,247,248, 0.1)',
                                formatter: '{b}',
                                padding: [10, 12],
                                borderRadius: 0,
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.1)',
                                color: '#FFFFFF',

                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'circle',
                        symbolSize: function (val) {
                            return 1;
                        },
                        itemStyle: {
                            normal: {
                                show: false,
                                color: '#fff',
                                shadowBlur: 10,
                            }
                        },
                        data: item[1].map(function (dataItem) {
                            return {
                                name: dataItem[0].name,
                                value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                            };
                        }),
                    },
                    { //被攻击点
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                color: '#00ffff',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#00ffff"
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 1,
                        itemStyle: {
                            normal: {
                                color: '#fff',
                                shadowBlur: 1,
                            }
                        },
                        data: [{
                            name: item[0],
                            value: geoCoordMap[item[0]].concat([100]),
                        }],
                    }
                );
            });

            let option = {
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    // layoutCenter: ['50%', '50%'],
                    // layoutSize: "100%",
                    top: '30%',
                    bottom: '5%',
                    left: '3%',
                    right: '3%',
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderWidth: 3,
                            borderColor: '#00FEFF',
                            shadowColor: 'rgba(3,221,255,0.8)',
                            shadowBlur: 30
                        }
                    }
                },
                series: series
            };
            this.echartElement.setOption(option);
        }
    },
    watch:{
        '$store.state.currentTrade':function (newVal) {
            this.getMap(newVal)
        }
    },
    beforeDestroy(){
        this.echartElement.dispose();
    }
}
</script>

<style lang="less" scoped>
#tradeMap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>