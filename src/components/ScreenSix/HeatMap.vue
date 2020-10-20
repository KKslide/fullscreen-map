<template>
    <div id="heatMap"></div>
</template>

<script>
import echarts from 'echarts'
import allCity from './allCity'; // 全国所有的城市!!!
import { mapData } from './HeatMapTemp'; // 引入热力图数据
export default {
    name: '',
    data() {
        return {
            echartElement: null,
            dataList: mapData.map(v => {
                v["value"] = Math.random() * 290 + 10
                return v
            })
        }
    },
    methods: {
        getMap(pos) {
            this.echartElement = echarts.init(document.getElementById("heatMap"));
            const geoCoordMap = allCity;

            const convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push(geoCoord.concat(data[i].value));
                    }
                }
                return res;
            };
            let option = {
                title: {
                    text: '',
                    left: 'center',
                    top: '5%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                backgroundColor: '',
                visualMap: {
                    show: false,
                    min: 0,
                    max: 500,
                    splitNumber: 5,
                    inRange: {
                        color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
                    },
                    textStyle: {
                        color: '#fff'
                    },

                },
                geo: {
                    type:'map',
                    map: 'china',
                    top: '35%',
                    left: '12%',
                    right: '12%',
                    bottom: '10%',
                    zoom: 1.2,
                    aspectScale: 1.1,
                    label: {
                        emphasis: {
                            show: true,
                            color: '#fff'
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            // areaColor: '#00177b',
                            areaColor: '#073f85',
                            borderColor: '#fff'
                        },
                        emphasis: {
                            areaColor: '#2fb9ea'
                        }
                    }
                },
                series: [{
                    name: '',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: convertData(mapData)
                }]
            };

            this.echartElement.setOption(option);
        }
    },
    mounted() {
        this.getMap();
    },
    beforeDestroy() {
        this.echartElement.dispose();
    },
}
</script>

<style lang="less" scoped>
#heatMap{
    height: 100%;
    width: 100%;
}
</style>