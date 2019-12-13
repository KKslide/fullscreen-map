<template>
    <div class="pieChart" ref="chart"></div>
</template>

<script>
export default {
    name: "PieChart",
    data() {
        return {
            baseColor: ['rgba(44,198,250,0.6)', 'rgba(97,148,143,0.8)', 'rgba(142,216,142,0.6)', 'rgba(216,194,67,0.6)'],
            fontColor: 'rgba(255,255,255,0.9)',
            titleFontColor: 'rgba(12, 236, 228, 0.8)'
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
            let pieChart = this.$echarts.init(this.$refs.chart)
            pieChart.setOption(
                {
                    color: ['#f95e74', '#44e5c5', '#479df6', '#edba4d', '#617aff', '#99dee7'],
                    title: this.pieChart.title, // 使用父组件传来的值
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '50%',
                            center: this.pieChart.series[0].center,
                            data: this.pieChart.series[0].data,
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: '10%',
                                        color: 'rgba(255, 255, 255, 1)'
                                    },

                                    formatter: function (params) {
                                        if (params.percent == 0) {
                                            return params.name
                                        } else {
                                            return params.name + ':' + params.percent + '%'
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
                                    length: 1,
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
    props: ['pieChart'],
    //   watch:{ // 我也不知道为什么这里监听不到
    // 	  'pieChart.data':function (nv,ov) {
    // 		  console.log('123123132');
    // 	  }
    //   }
}
</script>

<style lang="less" scoped>
.pieChart {
    height: 100%;
}
</style>