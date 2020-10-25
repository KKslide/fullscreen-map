<template>
    <div id="heatMap"></div>
</template>

<script>
import echarts from 'echarts'
import allCity from '../../js/allCity'; // 全国所有的城市!!!
// import { mapData } from './HeatMapTemp'; // 引入临时热力图数据
export default {
    name: '',
    data() {
        return {
            echartElement: null
        }
    },
    methods: {
        compare(prop) { // 排序
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
        getMap(heatData) {
            this.echartElement = echarts.init(document.getElementById("heatMap"));
            const geoCoordMap = allCity;
            const convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].type];
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
                    max: Number(heatData[0]["value"])/1000, // 最值改为最大值除以100的值
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
                    data: convertData(this.nationMapValueData)
                }]
            };
            this.echartElement.setOption(option);
        }
    },
    props:["nationMapValueData"],
    watch: {
        nationMapValueData(nv, ov) {
            let tempData = this.$deepClone(nv).sort(this.compare("value"));
            this.getMap(tempData.reverse());
        }
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