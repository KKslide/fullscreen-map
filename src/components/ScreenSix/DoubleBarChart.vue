<template>
    <div id="doubleBar"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            echartElement: null,
        }
    },
    methods: {
        getChart() {
            // 基于准备好的dom，初始化echarts实例
            this.echartElement = echarts.init(document.getElementById('doubleBar'));
            var xData = ['0-10 万元', '10-20万元', '20-30万元', '30-40万元', '40-50万元', '50-60万元', '60-70万元','70-80万元','80-100万元','> 100万元']
            var lineData = [100, 100, 100, 100, 100, 100, 100]
            var lastYearData = [3, 20, 62, 34, 55, 65, 33,85,74,33];
            var thisYearData = [11, 38, 23, 39, 66, 66, 79,45,52,69];
            var timeLineData = [1];
            let legend = ['授信用户', '用信用户'];
            var background = ""; //背景 
            let textColor = "#fff";
            let lineColor = "rgba(255,255,255,0.2)";
            let colors = [{
                borderColor: "rgba(227,161,96,1)",
                start: "rgba(227,161,96,0.8)",
                end: "rgba(227,161,96,0.3)"
            },
            {
                borderColor: "rgba(0,222,255,1)",
                start: "rgba(0,222,255,0.3)",
                end: "rgba(0,222,255,0.8)"
            },
            ];
            let borderData = [];
            let scale = 2;
            borderData = xData.map(item => {
                return scale;
            });
            var option = {
                baseOption: {
                    backgroundColor: background,
                    timeline: {
                        show: false,
                        top: 0,
                        data: []
                    },
                    legend: {
                        top: '5%',
                        right: '5%',
                        itemWidth: 20,
                        itemHeight: 5,
                        // itemGap: 343,
                        icon: 'horizontal',
                        textStyle: {
                            color: '#ffffff',
                            fontSize: 20,
                        },
                        data: legend
                    },
                    grid: [{
                        show: false,
                        left: '5%',
                        top: '15%',
                        bottom: '10%',
                        containLabel: true,
                        width: '37%'
                    }, {
                        show: false,
                        left: '53%',
                        top: '15%',
                        bottom: '10%',
                        width: '0%'
                    }, {
                        show: false,
                        right: '2%',
                        top: '15%',
                        bottom: '10%',
                        containLabel: true,
                        width: '37%'
                    }],
                    xAxis: [
                        {
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: true,
                                color: textColor
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            },
                        },
                        {
                            gridIndex: 1,
                            show: false
                        },
                        {
                            gridIndex: 2,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: true,
                                color: textColor
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            },

                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            data: xData
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                padding: [30, 0, 0, 0],
                                interval:0,
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 20
                                },
                                align: "center"

                            },
                            data: xData.map(function (value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center'
                                    }
                                }
                            })
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: lineColor
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false

                            },
                            data: xData
                        }],
                    series: []

                },
                options: []
            }

            option.baseOption.timeline.data.push(timeLineData[0])
            option.options.push({
                series: [{
                    name: "授信用户",
                    type: "bar",
                    barWidth: 25,
                    stack: "1",
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: colors[0].start
                            },
                            {
                                offset: 1,
                                color: colors[0].end
                            }
                            ]),
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: lastYearData,
                    animationEasing: "elasticOut"
                },
                {
                    name: "授信用户",
                    type: "bar",
                    barWidth: 25,
                    stack: "1",
                    itemStyle: {
                        normal: {
                            color: colors[0].borderColor

                        }
                    },
                    data: borderData
                },
                {
                    name: "用信用户",
                    type: "bar",
                    stack: "2",
                    barWidth: 25,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: colors[1].start
                            },
                            {
                                offset: 1,
                                color: colors[1].end
                            }
                            ]),
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: thisYearData,
                    animationEasing: "elasticOut"
                },
                {
                    name: "用信用户",
                    type: "bar",
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    barWidth: 25,
                    stack: "2",
                    itemStyle: {
                        normal: {
                            color: colors[1].borderColor

                        }
                    },
                    data: borderData
                },
                ]
            });
            this.echartElement.setOption(option);
        }
    },
    mounted() {
        this.getChart()
    },
    beforeDestroy() {
        this.echartElement.dispose();
    }
}
</script>

<style lang="less" scoped>
#doubleBar {
    width: 100%;
    height: 100%;
}
</style>