<template>
    <div id="areaChart" ref="areaChart"></div>
</template>
<script>
export default {
    name: "AreaChart",
    data() {
        return {
            baseColor: ['rgba(0,188,198)', 'rgba(177,166,74,0.6)'],
            axisColor: 'rgba(255,255,255,0.5)',
            fontColor: 'rgba(255,255,255,0.9)',
            titleFontColor: 'rgba(12, 236, 228,0.8)',
            dataL: ['借款金额', '还款金额'],
            titleName: '近7天的交易趋势'
        }
    },
    mounted() {
        this.getLineChart();
    },
    methods: {
        getLineChart() {
            // 基于准备好的dom，初始化echarts实例
            let areaChart = this.$echarts.init(this.$el)
            // 绘制图表
            let option = {
                title: {
                    // show:false,
                    text: this.titleName,
                    left: 'left',
                    padding: [10, 20],
                    textStyle: {
                        color: "white",
                        fontFamily: 'PingFang SC',
                        fontWeight: '400',
                        fontSize: '25.5'
                    }
                },
                color: this.baseColor,
                backgroundColor: '',
                textStyle: {
                    color: this.fontColor,
                    fontSize: '80%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: this.dataL,
                    bottom: '3%',
                    left: 'center',
                    textStyle: {
                        color: this.fontColor,
                        fontSize: '20',
                        padding: [0, 50, 0, 0]
                    }
                },
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '20%',
                    top: '25%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.areaData.date,
                    splitLine: { //X轴网格线修改
                        show: false,
                    },
                    axisLine: {
                        show: true, // X轴轴线颜色类型的修改
                        lineStyle: {
                            type: 'solid',
                            color: this.axisColor
                        }
                    },
                    axisLabel: { // 坐标轴刻度标签的相关设置。
                        show: true,
                        textStyle: {
                            // color: '#c3dbff',  //更改坐标轴文字颜色
                            fontSize: 16      //更改坐标轴文字大小
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: { //X轴网格线修改
                        show: false,
                    },
                    axisLine: {
                        show: true, // Y轴轴线颜色类型的修改
                        lineStyle: {
                            type: 'solid',
                            color: this.axisColor
                        }
                    },
                    axisLabel: { // 坐标轴刻度标签的相关设置。
                        show: true,
                        textStyle: {
                            // color: '#c3dbff',  //更改坐标轴文字颜色
                            fontSize: 16      //更改坐标轴文字大小
                        }
                    },
                },
                series: [
                    {
                        name: this.dataL[0],
                        type: 'line',
                        // smooth: true, // 是否用平滑曲线
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(225,59,31,0.87)'
                                },
                                {
                                    offset: 0.03,
                                    color: 'rgba(225,59,31,0.85)'
                                },
                                {
                                    offset: 0.48,
                                    color: 'rgba(136,78,121,0.62)'
                                },
                                {
                                    offset: 0.96,
                                    color: 'rgba(54,95,203,0.36)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(46,97,210,0.36)'
                                }]),
                                shadowColor: 'rgba(255, 255, 255, 0.7)',
                                shadowBlur: 10
                            }
                        },
                        areaStyle: {},
                        data: this.areaData.data1
                    },
                    {
                        name: this.dataL[1],
                        type: 'line',
                        // smooth: true, // 是否用平滑曲线
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 129, 10, 0.87)'
                                },
                                {
                                    offset: 0.03,
                                    color: 'rgba(225, 138, 31, 0.85)'
                                },
                                {
                                    offset: 0.48,
                                    color: 'rgba(236, 212, 55, 0.62)'
                                },
                                {
                                    offset: 0.96,
                                    color: 'rgba(238, 241, 80, 0.36)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(208, 249, 92, 0.36)'
                                }]),
                                shadowColor: 'rgba(255, 255, 255, 0.7)',
                                shadowBlur: 10
                            }
                        },
                        areaStyle: {},
                        data: this.areaData.data2
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            areaChart.setOption(option);
            window.addEventListener("resize", function () {
                areaChart.resize();
            });
        }
    },
    props: ['areaData'],
    watch: {
        areaData() {
            this.getLineChart();
        }
    }
};

</script>
<style lang="less" scoped>
#areaChart {
    width: 100%;
    height: 100%;
}
</style>
