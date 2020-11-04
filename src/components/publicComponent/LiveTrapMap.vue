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
            const geoCoordMap = { // 全省
                '黑龙江': [127.9688, 45.368],
                '大庆': [126.9688, 45.868],
                '内蒙古': [110.3467, 41.4899],
                "吉林": [125.8154, 44.2584],
                '北京': [116.4551, 40.2539],
                "辽宁": [123.1238, 42.1216],
                "河北": [114.4995, 38.1006],
                "天津": [117.4219, 39.4189],
                "山西": [112.3352, 37.9413],
                "陕西": [109.1162, 34.2004],
                "甘肃": [103.5901, 36.3043],
                "宁夏": [106.3586, 38.1775],
                "青海": [101.4038, 36.8207],
                "新疆": [87.9236, 43.5883],
                "西藏": [91.11, 29.97],
                "四川": [103.9526, 30.7617],
                "重庆": [108.384366, 30.439702],
                "山东": [117.1582, 36.8701],
                "河南": [113.4668, 34.6234],
                "江苏": [118.8062, 31.9208],
                "安徽": [117.29, 32.0581],
                "湖北": [114.3896, 30.6628],
                "浙江": [119.5313, 29.8773],
                "福建": [119.4543, 25.9222],
                "江西": [116.0046, 28.6633],
                "湖南": [113.0823, 28.2568],
                "贵州": [106.6992, 26.7682],
                "云南": [102.9199, 25.4663],
                "广东": [113.12244, 23.009505],
                "广西": [108.479, 23.1152],
                "海南": [110.3893, 19.8516],
                '上海': [121.4648, 31.2891],
                "梅州": [116.1, 24.55]
            };
            this.echartElement = echarts.init(this.$el);
            // this.echartElement.clear(); // 清空还未绘制完成的路线
            // let allCurrentTrade = this.$deepClone(this.$store.getters.getAllCurrentTrade)
            let allCurrentTrade;
            if (Array.isArray(pos) && pos.length != 0) {
                allCurrentTrade = this.$deepClone(pos)
            } else {
                allCurrentTrade = JSON.parse(localStorage.getItem('allCurrentTrade'));
            }

            // 不同地方的交易起点位置
            let BJData = [
                // [ { name: pos, value: 100 }, { name: '梅州' } ],
            ];
            if (allCurrentTrade) {
                console.log('↓↓↓ 当前页面实时数据 ↓↓↓',allCurrentTrade);
                BJData = allCurrentTrade.map(v => {
                    return [{
                        name: v.address.match(/.+?(省|市|自治区|自治州|县|区)/g)[0].replace(/省|壮族自治区|自治区|回族自治区|维吾尔自治区|市/, ''),
                        value: parseInt(Math.random() * 100)
                    },
                    { name: '梅州' }]
                });
            }

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
                        top: this.position.top || '30%',
                        bottom: this.position.bottom || '5%',
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
                        showEffectOn: 'render',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                // position: 'inside',
                                // backgroundColor: 'rgba(1,247,248, 0.1)',
                                formatter: '{b}',
                                // padding: [10, 12],
                                // borderRadius: 0,
                                // borderWidth: 1,
                                // borderColor: 'rgba(0,0,0,0.1)',
                                color: '#FFFFFF',

                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'circle',
                        symbolSize: function (val) {
                            return 3;
                        },
                        itemStyle: {
                            // normal: {
                            //     show: false,
                            //     color: '#fff',
                            //     shadowBlur: 10,
                            // }
                            normal: {
                                color: '#00ffff',
                                shadowBlur: 10,
                                shadowColor: '#07b6ea'
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
                                color: '#fff',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#fff"
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        /**
                         * "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABrCAYAAAAYTP40AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQpJREFUeNrs3V1sFFUUB/DZw5c2lgQomlSCiZDyANSkDaiAWogiDwSQYHwAnowQHsSYJobw4kdUIprYN2N8kpDQBp5IeahCC+FLCPiASsLyoQ0gKlpj0NZEWvyf7m6ytNv96N5759w75yT/XHZ3Zrr97c3tnWFmJxV5Uj9H02vRvIdsQuqQG8hnyO76qO+uD79DyhPomWi+Rp4o8HIXsh7g/YptBrobWVBksR5ktXRwEg49C82xEtBcy5FOLF+jPXv80EeRORWsJrqHpwKCztWJLPhfim0XOldnkZXSwEkYdCOaU1VCcy3mDwzbe1R79mjkB9G8gbyDTDG46T7kLeRLCXPxVBkQE9DMQEz/pZ+KzEeeQzZkf4atuo7sR04il5B/DG//b+QPfKD3KsYGMO+hvYq8hDQhkyKtUsUzoDNIB7IH8ANFsYHMj99E3kUeUr9x16/I6wDfXxAb0JPRtGd7s5aZ+hRpzQ0vlNej9yq08eJR4v2RU7+tyMtqY6V2ojM/PzyM4B88Nv9keTaQ9PoeaeSevUmhrRcfSGth7LVq4aTWMnazOjipZsaeqQ5Oqp7UwFlNUGyHpdgOa6KBbRzM7iXdDtjpMeRDZEk1G+GdmntVrH8BacK+/2DovTJ73spl5JFxbqK32mHkeBKgh6cSUd8dNOfjHLPnJ2W8Rc+eGJU+pcIqdgvexAsJ8d6GzI57NtIB8IWB9+o1aNokTP2mId2hgmehD5iwMjXPrgsRPA/ayP/BmtypCQrcNLSNPcgceKPn0BtNQ9vaXWfw43jDT3oMvSeycPqGrWMjfALOV76B50FbcbF5IMorcNvQtrG9AXcB7QJbPLgraFfYYsFdQrvEFgfuGto1thjwOKDjwI4dPC7ouLBjA48TOk5s5+BxQ8eN7QxcArQEbOvgUqClYFsDlwQtCds4uDRoadjGwCVCS8SuGlwqtFTsHHgP4FaEAi0Zm4svse4sF1w6tHTsssF9gPYBuyQ4nt/sAzRXtWexuqz/kI+RfcjNKPM1GVuQ1zx5/70+YftevXrlgY7Zii2lfowyX9JyS7HtFX8DztP1Ud/jyDKkHo9XI78pttniC+2fAfA3+U/i8SE0S7OzE8U2BL0CsAWvRsPzV9C0+ABOPkP7Bk6+Q/sETiFA+wJOoUD7AC5td70o9FC64Vk026PM5c0/ILupIX2x0LL4veZGme90lfIVoaKOjZSCbkXzyYin/0VeAfhBD8DFHBspBb2jADTXA8gBvL7GhyGFPIHeVWT9Sb6Ak+fQXoFTANDegFMg0F6AU0DQ4sEpMGjR4BQgtFhwChRaJDgFDC0OnAKHFgVOCYAWA04JgRYBTgmCjh2cEgYdKzglEDo2cEoodCzglGBo5+CUcGin4KTQ7sBJod2Bk0K7AyeFdgdOCu0OnLEHFdoJ+ABjn1ZoJ+CnGPttNlNoI+C/j7E+36D5I8KC3VHmxpsjF+xR6IrBlyHfjXjpKrIKr6fz7+HL583xzeGnI9fw4oWxfmoCofOLrzTeUORkTh4tnkIeHn4YRedzt5ep+Cb3CYcuC9zIPFuhRw0p6ypZKVUBNF+U/7k631c8PLyIHn7EGDaga7NTm1r1HVVpYM8zOYwsUugxqwGdcZZJ7Bo1rd6xXOxz6jlm/YncMPeJNKR/QdOurgWrDT5Dpqd+PBvpUtv76gvkA+NTv7yZCR8DWBpZuGmOR9WPHEaP/raSlf4XYAAIW7VA0KRqTgAAAABJRU5ErkJggg==",
                         */
                        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABrCAYAAAAYTP40AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQpJREFUeNrs3V1sFFUUB/DZw5c2lgQomlSCiZDyANSkDaiAWogiDwSQYHwAnowQHsSYJobw4kdUIprYN2N8kpDQBp5IeahCC+FLCPiASsLyoQ0gKlpj0NZEWvyf7m6ytNv96N5759w75yT/XHZ3Zrr97c3tnWFmJxV5Uj9H02vRvIdsQuqQG8hnyO76qO+uD79DyhPomWi+Rp4o8HIXsh7g/YptBrobWVBksR5ktXRwEg49C82xEtBcy5FOLF+jPXv80EeRORWsJrqHpwKCztWJLPhfim0XOldnkZXSwEkYdCOaU1VCcy3mDwzbe1R79mjkB9G8gbyDTDG46T7kLeRLCXPxVBkQE9DMQEz/pZ+KzEeeQzZkf4atuo7sR04il5B/DG//b+QPfKD3KsYGMO+hvYq8hDQhkyKtUsUzoDNIB7IH8ANFsYHMj99E3kUeUr9x16/I6wDfXxAb0JPRtGd7s5aZ+hRpzQ0vlNej9yq08eJR4v2RU7+tyMtqY6V2ojM/PzyM4B88Nv9keTaQ9PoeaeSevUmhrRcfSGth7LVq4aTWMnazOjipZsaeqQ5Oqp7UwFlNUGyHpdgOa6KBbRzM7iXdDtjpMeRDZEk1G+GdmntVrH8BacK+/2DovTJ73spl5JFxbqK32mHkeBKgh6cSUd8dNOfjHLPnJ2W8Rc+eGJU+pcIqdgvexAsJ8d6GzI57NtIB8IWB9+o1aNokTP2mId2hgmehD5iwMjXPrgsRPA/ayP/BmtypCQrcNLSNPcgceKPn0BtNQ9vaXWfw43jDT3oMvSeycPqGrWMjfALOV76B50FbcbF5IMorcNvQtrG9AXcB7QJbPLgraFfYYsFdQrvEFgfuGto1thjwOKDjwI4dPC7ouLBjA48TOk5s5+BxQ8eN7QxcArQEbOvgUqClYFsDlwQtCds4uDRoadjGwCVCS8SuGlwqtFTsHHgP4FaEAi0Zm4svse4sF1w6tHTsssF9gPYBuyQ4nt/sAzRXtWexuqz/kI+RfcjNKPM1GVuQ1zx5/70+YftevXrlgY7Zii2lfowyX9JyS7HtFX8DztP1Ud/jyDKkHo9XI78pttniC+2fAfA3+U/i8SE0S7OzE8U2BL0CsAWvRsPzV9C0+ABOPkP7Bk6+Q/sETiFA+wJOoUD7AC5td70o9FC64Vk026PM5c0/ILupIX2x0LL4veZGme90lfIVoaKOjZSCbkXzyYin/0VeAfhBD8DFHBspBb2jADTXA8gBvL7GhyGFPIHeVWT9Sb6Ak+fQXoFTANDegFMg0F6AU0DQ4sEpMGjR4BQgtFhwChRaJDgFDC0OnAKHFgVOCYAWA04JgRYBTgmCjh2cEgYdKzglEDo2cEoodCzglGBo5+CUcGin4KTQ7sBJod2Bk0K7AyeFdgdOCu0OnLEHFdoJ+ABjn1ZoJ+CnGPttNlNoI+C/j7E+36D5I8KC3VHmxpsjF+xR6IrBlyHfjXjpKrIKr6fz7+HL583xzeGnI9fw4oWxfmoCofOLrzTeUORkTh4tnkIeHn4YRedzt5ep+Cb3CYcuC9zIPFuhRw0p6ypZKVUBNF+U/7k631c8PLyIHn7EGDaga7NTm1r1HVVpYM8zOYwsUugxqwGdcZZJ7Bo1rd6xXOxz6jlm/YncMPeJNKR/QdOurgWrDT5Dpqd+PBvpUtv76gvkA+NTv7yZCR8DWBpZuGmOR9WPHEaP/raSlf4XYAAIW7VA0KRqTgAAAABJRU5ErkJggg==',
                        symbolSize: 15,
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
                    aspectScale: 1.05,
                    top: this.position.top || '30%',
                    bottom: this.position.bottom || '5%',
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
    mounted() {},
    watch: {
        // '$store.state.currentTrade': function (newVal) {
        // this.getMap(newVal)
        // },
        '$store.state.allCurrentTrade': function (newVal) {
            this.getMap(newVal)
        }
    },
    beforeDestroy() {
        this.echartElement.dispose();
    },
    props: ['position',]
}
</script>

<style lang="less" scoped>
#tradeMap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>