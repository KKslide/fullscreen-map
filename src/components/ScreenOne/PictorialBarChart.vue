<template>
    <div ref="chart" class="pictorialBarChart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: "PictorialBarChart",

    data() {
        return {
            echartElement: null,
            baseColor: ['red', '#AFFCF7', '#959DD7'],
            axisColor: 'rgba(255,255,255,0.5)',
            fontColor: 'white',
            titleFontColor: 'white',
            isPlay: true,
            dataL: [],
            baseLinerColor: [
                {
                    startc: '#31C9FA',
                    endc: 'rgba(255,255,255,0.6)'
                }, {
                    startc: '#B998D6',
                    endc: 'rgba(255,255,255,0.6)'
                }
            ],
            fulldata: {}
        }
    },
    mounted() {
        this.getEchart();
    },
    methods: {
        getEchart() {
            // 基于准备好的dom，初始化echarts实例
            this.echartElement = echarts.init(this.$el);
            this.fulldata = this.crightData;

            let dataX = this.fulldata.dataX.map(v => {
                return v.slice(4, v.length)
            })
            let data1 = this.fulldata.data1.map(v => {
                return parseInt(Number(v))
            })
            //******************* */
            // 绘制图表
            let option = {
                title: {
                    // text: '近一个月交易量趋势（单位：元）',
                    // left: 'left',
                    left: "5%",
                    // padding: [20, 20],
                    //subtext: "横坐标：近一个月，纵坐标：交易量（单位：元）",
                    subtextStyle: {
                        color: 'white',// 副标题文字颜色
                        fontSize: '15%',
                        lineHeight: "50"
                    },

                    top: '10',
                    textStyle: {
                        color: this.titleFontColor,
                        // fontFamily: 'Arial',
                        fontWeight: '500',
                        fontSize: '21%'
                    }
                },
                color: this.baseColor,
                // color:rgba(46,97,210,0.36),
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
                            backgroundColor: '#6a7985',
                            show: false,
                        }
                    }
                },
                grid: {
                    // top:'30%',
                    left: '0%',
                    right: '10%',
                    bottom: '20%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: this.crightData.dataX,
                    //横坐标倾斜不间隔显示
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: "white",
                            fontSize: "13%"
                        },
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    splitLine: { //x轴网格线修改
                        show: false,
                    },
                    axisLine: {
                        show: false, // X轴轴线颜色类型的修改
                        lineStyle: {
                            type: 'solid',
                            color: this.axisColor
                        },
                    },
                    data: dataX
                }],
                yAxis: [{
                    type: 'value',
                    show: false,
                    splitLine: { //x轴网格线修改
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: "white",
                            fontSize: "13%",
                        },
                    },
                    axisLine: {
                        show: false, // X轴轴线颜色类型的修改
                        lineStyle: {
                            type: 'solid',
                            color: this.axisColor
                        }
                    },
                }],
                series: [
                    {
                        name: this.dataL[0],
                        type: 'bar',
                        barWidth: '50%',
                        barGap: '-30%',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: function (e) {
                                    return Number(e.data).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0] + '万元'
                                },
                                textStyle: {
                                    fontSize: "14%",
                                },
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(225,59,31,0.6)'
                                },
                                {
                                    offset: 0.03,
                                    color: 'rgba(225,59,31,0.55)'
                                },
                                {
                                    offset: 0.48,
                                    color: 'rgba(136,78,121,0.3)'
                                },
                                {
                                    offset: 0.96,
                                    color: 'rgba(54,95,203,0.4)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(46,97,210,0.1)'
                                }]),
                                opacity: 1
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data: data1,
                        z: 10
                    },
                    {
                        name: '',
                        // yAxisIndex: 0,
                        type: 'line',
                        color: '#ffd300',
                        label: {
                            normal: {
                                show: false,
                                position: 'top',
                                textStyle: {
                                    color: '#ffd300',
                                    fontSize: '14%'
                                },
                                formatter: '{c}万元'
                            }
                        },
                        lineStyle: {
                            color: 'rgba(102, 255, 255, 0.83)'
                        },
                        data: data1
                    }
                ]
            };
            //******************* */
            this.echartElement.setOption(option)
        }
    },
    watch: {
        
    },
    props: ['crightData'],
    beforeDestroy(){
        this.echartElement.dispose();
    }
};

</script>
<style lang="less" scoped>
.pictorialBarChart {
    width: 100%;
    // height: 32vh !important;
    height: 100%;
}
</style>
