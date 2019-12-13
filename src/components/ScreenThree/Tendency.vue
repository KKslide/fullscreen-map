<template>
    <div id="tendency" ref="tendency"></div>
</template>

<script>
export default {
    mounted() {
        this.getCharts()
    },
    methods: {
        getCharts() {
            let lineChart = this.$echarts.init(this.$el);
            let dateData = this.sevenDayOpenAccountTendency.date;
            let amountData = this.sevenDayOpenAccountTendency.data;
            let option = {
                // backgroundColor: '#0F2B5C',
                title: {
                    show: false,
                    text: '单位(户)',
                    top: '5%',
                    left: '40%',
                    textStyle: {
                        color: "#FFF",
                        fontSize: 15
                    }
                },
                grid: {
                    top: '15%',
                    left: '10%',
                    right: '10%',
                    bottom: '20%',
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.4)'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        interval: 0,
                        rotate: 30,
                        textStyle: {
                            color: '#d1e6eb',
                            margin: 15,
                            fontSize: 15
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: dateData
                }],
                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 3,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                        margin: 20,
                        textStyle: {
                            color: '#d1e6eb',
                            fontSize: 15
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [
                    {
                        name: '',
                        type: 'line',
                        // smooth: true, //是否平滑曲线显示
                        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbolSize: 8,
                        lineStyle: {
                            normal: {
                                // color: "#53fdfe", // 线条颜色
                                color: "rgba(0,0,0,0)", // 线条颜色
                            },
                            //   borderColor: '#f0f'
                            borderColor: '#f0f'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                            textStyle: {
                                color: '#fff',
                                fontSize: 15
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "rgba(255,255,255,1)",
                            }
                        },
                        tooltip: {
                            show: false
                        },
                        data: amountData
                    },
                    {
                        type: 'bar',
                        animation: false,
                        barWidth: 10,
                        hoverAnimation: false,
                        data: amountData,
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(255,255,255, 0.6)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,255,255, 0)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                label: {
                                    show: false
                                }
                            }
                        }
                    }
                ]
            };
            lineChart.setOption(option);
        }
    },
    props: ["sevenDayOpenAccountTendency"],
    watch: {
        sevenDayOpenAccountTendency(nv) {
            this.getCharts()
        }
    }
}
</script>

<style lang="less" scoped>
#tendency {
    width: 100%;
    height: 100%;
}
</style>