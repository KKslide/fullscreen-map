<template>
    <div id="funnelChart" ref="funnelChart"></div>
</template>
<script>
export default {
    name: "FunnelChart",
    data() {
        return {
            //baseColor: ['rgba(245,252,75,0.3)', 'rgba(23,216,188,0.5)'],
            // baseColor: ['#46b2e1', '#70e5c1', '#626d90', '#a0a8e4', '#c5eaaf'],
            baseColor: ['#f95e74', '#44e5c5', '#479df6', '#edba4d', '#617aff'],
            // fontColor: 'rgba(255,255,255,0.9)',
            titleFontColor: 'rgba(12, 236, 228, 0.8)',
        }
    },
    mounted() {
        // this.getEchart();
    },
    methods: {
        compare(prop) {
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
        getEchart(val) {
            //   return
            // 基于准备好的dom，初始化echarts实例
            let funnelChart = this.$echarts.init(this.$el)
            // 绘制图表
            funnelChart.setOption(
                {
                    title: {
                        show: false,
                        text: this.titleName,
                        left: 'left',
                        padding: [10, 20],
                        textStyle: {
                            color: this.titleFontColor,
                            fontFamily: 'Arial',
                            fontWeight: 'lighter',
                            fontSize: '12'
                        }
                    },
                    color: this.baseColor,
                    backgroundColor: '',
                    textStyle: {
                        color: this.fontColor,
                        fontFamily: 'Arial',
                        fontWeight: 'lighter',
                        fontSize: '20%',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c}%",
                        show: false,
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '5%',
                        // data: ['产品推荐', '客户回应', '签约成功', '交易笔数', '衍生产品签约'],
                        // data: ['购买', '充值', '录取'],
                        // data: val.map(v => { return v.name }),
                        textStyle: {
                            fontSize: '15%',
                            color: '#fff',
                            padding: [0, 55, 0, 0]
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'funnel',
                            x: '35%',
                            top: 'center',
                            // bottom: '5%',
                            width: '15%',
                            height: '55%',
                            // height: {totalHeight} - y - y2,
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending', // 倒三角 - 降序
                            //   sort: 'ascending', // 正三角- 升序
                            gap: 0, //数据图形间距
                            funnelAlign: 'right',
                            center: ['50%', '50%'],
                            label: {
                                show: true,
                                position: 'left',
                                // formatter: "{d}%",
                                fontWeight: '600',
                                fontSize: '16',
                                formatter: '累计{b}笔数:{d}%'
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            itemStyle: {
                                borderColor: 'rgba(26,32,54,1)',
                                borderWidth: 0,
                                shadowBlur: 20,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            // emphasis: {
                            //   label: {
                            //     fontSize: '5%'
                            //   }
                            // },
                            data: val.trade_amount
                        },
                        {
                            name: '',
                            type: 'funnel',
                            x: '50%',
                            top: 'center',
                            // bottom: '5%',
                            width: '15%',
                            height: '55%',
                            // height: {totalHeight} - y - y2,
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending', // 倒三角 - 降序
                            //   sort: 'ascending', // 正三角- 升序
                            gap: 0, //数据图形间距
                            funnelAlign: 'left',
                            center: ['50%', '50%'],
                            label: {
                                show: true,
                                position: 'right',
                                // formatter: "{d}%",
                                fontWeight: '600',
                                fontSize: '16',
                                formatter: '累计{b}金额:{d}%'
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            itemStyle: {
                                borderColor: 'rgba(26,32,54,1)',
                                borderWidth: 0,
                                shadowBlur: 20,
                                shadowOffsetX: 0,
                                shadowOffsetY: 5,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            // emphasis: {
                            //   label: {
                            //     fontSize: '5%'
                            //   }
                            // },
                            data: val.trade_count
                        }
                    ]
                });
            window.addEventListener("resize", () => {
                funnelChart.resize();
            });
        }
    },
    props: ['titleName', 'funnelData'],
    watch: {
        funnelData(nv, ov) {
            var newData = this.funnelData;
            for (const index of Object.keys(newData)) {
                newData[index].map(v => {
                    return v.name = v.name.replace(/累计/g, '').replace(/笔数/g, '').replace(/金额/g, '')
                })
            }
            this.getEchart(this.funnelData)
        }
    }
};

</script>
<style lang="less" scoped>
#funnelChart {
    width: 100%;
    height: 100%;
}
</style>
