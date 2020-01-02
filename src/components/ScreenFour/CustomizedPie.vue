<template>
    <div class="pieChart" ref="chart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: "PieChart",
    data() {
        return {
            baseColor: ['rgba(44,198,250,0.6)', 'rgba(97,148,143,0.8)', 'rgba(142,216,142,0.6)', 'rgba(216,194,67,0.6)'],
            fontColor: 'rgba(255,255,255,0.9)',
            titleFontColor: 'rgba(12, 236, 228, 0.8)',
            echartElement: null,
        }
    },
    mounted() {
        let timer = setInterval(() => {
            if (this.pieChart.series[0].data.length != 0) {
                clearInterval(timer)
                this.getPieChhart()
            }
        }, 500);
    },
    methods: {
        getPieChhart() {
            this.echartElement = echarts.init(this.$refs.chart)
            this.echartElement.setOption(
                {
                    color: ['#479df6', '#99dee7', '#f95e74', '#44e5c5', '#edba4d', '#617aff'],
                    title: this.pieChart.title, // 使用父组件传来的值
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: this.pieChart.series[0].radius || '50%',
                            center: this.pieChart.series[0].center,
                            data: this.pieChart.series[0].data,
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: '18',
                                        color: 'rgba(255, 255, 255, 1)'
                                    },

                                    formatter: (params) => {
                                        if (params.percent == 0) {
                                            return params.name
                                        } else {
                                            if (this.pieChartSuccessData) {
                                                return params.name + '\n' + '成功率:' + this.pieChartSuccessData[params.dataIndex].value + '%' + '\n失败率：' + this.pieChartSuccessData[params.dataIndex].fail+'%'
                                            } else {
                                                return params.name + ': ' + params.percent + '%'
                                            }
                                        }
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.8)'
                                    },
                                    smooth: 0.2,
                                    length: 1.5,
                                    length2: 5
                                }
                            },
                            itemStyle: {
                                normal: {
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                }
            )
        }
    },
    props: ['pieChart', 'pieChartSuccessData'],
    beforeDestroy() {
        this.echartElement.dispose();
    }
}
</script>

<style lang="less" scoped>
.pieChart {
    height: 100%;
}
</style>