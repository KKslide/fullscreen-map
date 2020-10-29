<template>
    <div id="lineChart2" ref="lineChart2"></div>
</template>
<script>
import echarts from 'echarts'
let startIndex = 0;
export default {
    name: "lineChart2",
    data() {
        return {
            isPlay: true,
            baseColor: ['rgba(92,196,10)', 'rgba(209,205,211)'],
            axisColor: 'rgba(255,255,255,0.5)',
            fontColor: 'rgba(255,255,255,0.9)',
            titleFontColor: 'rgba(12, 236, 228,0.8)',
            dataL: ['存款金额', '存款笔数'],
            echartElement: null,
        }
    },
    mounted() {
        this.getLineChart();
        // this.play();
    },
    methods: {
        getLineChart() {
            // 基于准备好的dom，初始化echarts实例
            this.echartElement = echarts.init(this.$el)
            // 绘制图表
            let option = {
                title: {
                    show: false,
                    text: this.titleName,
                    left: 'left',
                    padding: [10, 20],
                    textStyle: {
                        color: "white",
                        fontFamily: 'Arial',
                        fontWeight: '',
                        fontSize: '25'
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
                    bottom: "3%",
                    left: 'center',
                    textStyle: {
                        color: this.fontColor,
                        fontSize: 15
                    }
                },
                grid: {
                    left: '3%',
                    right: '5%',
                    top: '15%',
                    bottom: '13%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.productRealTimeLine.hour,
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
                    axisLabel: {
                        show: true,
                        textStyle: {
                            // color: 'red',
                            fontSize: 12
                        }
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        splitLine: { //Y轴网格线修改
                            show: false,
                        },

                        axisLine: {
                            show: true, // Y轴轴线颜色类型的修改
                            lineStyle: {
                                type: 'solid',
                                color: this.axisColor
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                // color: 'red',
                                fontSize: 13
                            },
                            formatter: '{value} 万元'
                        }
                    },
                    {
                        type: 'value',
                        splitLine: { //Y轴网格线修改
                            show: false,
                        },

                        axisLine: {
                            show: true, // Y轴轴线颜色类型的修改
                            lineStyle: {
                                type: 'solid',
                                color: this.axisColor
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                // color: 'red',
                                fontSize: 13
                            },
                            formatter: '{value} 笔'
                        }
                    }
                ],
                series: [
                    { // 金额
                        name: this.dataL[0],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#f7c368'
                                },
                                {
                                    offset: 1,
                                    color: '#fc4b4b'
                                }]),
                                opacity: 0.8,
                                shadowColor: 'rgba(255, 255, 255, 0.7)',
                                shadowBlur: 10,
                                label: {
                                    show: true,
                                    position: 'top',
                                    fontSize: 12,
                                    formatter: function (params) {
                                        return parseInt(params.value)
                                    }
                                }
                            }
                        },
                        areaStyle: { // 设置折线图区域渐变
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(247,195,104, 0.5)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(252,75,75, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10,
                                label: {
                                    show: true,
                                    position: 'top',
                                    fontSize: 12
                                }
                            }
                        },
                        data: this.productRealTimeLine.data1,
                        zlevel: 2
                    },
                    { // 笔数
                        name: this.dataL[1],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#a0a8e4'
                                },
                                {
                                    offset: 1,
                                    color: '#626d90'
                                }]),
                                opacity: 0.8,
                                shadowColor: 'rgba(255, 255, 255, 0.7)',
                                shadowBlur: 10,
                                label: {
                                    show: false,
                                    position: 'top',
                                    fontSize: 12
                                }
                            }
                        },
                        areaStyle: { // 设置折线图区域渐变
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(160,168,228, 0.5)' //#a0a8e4
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(98,109,144, 0)' // #626d90
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        data: this.productRealTimeLine.data2,
                        yAxisIndex: 1, // 当有多个Y轴的时候，选择跟哪个Y轴
                    },
                ]
            };
            var that = this;
            /* setInterval(function () {
              if (!that.isPlay) return;
              var d1 = [],
                d2 = [],
                //   d3 = [],
                indexArr = [];
              startIndex++;
              for (let i = startIndex; i < that.productRealTimeLine
                .data1.length; i++) {
                if (i < startIndex + 6) {
                  d1.push(that.productRealTimeLine.data1[i]);
                  indexArr.push(that.productRealTimeLine.hour[i])
                }
              }
              for (let i = startIndex; i < that.productRealTimeLine.data2.length; i++) {
                if (i < startIndex + 6) {
                  d2.push(that.productRealTimeLine.data2[i]);
                }
              }
              if (d1.length < 6) {
                startIndex = -1;
              }
      
              this.echartElement.setOption({
                xAxis: [{
                  data: indexArr
                }],
                series: [{
                  name: that.dataL[0],
                  data: d1
                }, {
                  name: that.dataL[1],
                  data: d2
                }]
              });
            }, 2000); */
            // 使用刚指定的配置项和数据显示图表。
            if (that.isPlay) {
                this.echartElement.setOption(option);
            }
            window.addEventListener("resize", () => {
                this.echartElement.resize();
            });
        },
    },
    props: ['productRealTimeLine', 'titleName'],
    watch: {
        productRealTimeLine(nv) {
            this.getLineChart()
        }
    },
    beforeDestroy(){
        this.echartElement.dispose();
    }
};

</script>
<style lang="less" scoped>
#lineChart2 {
    width: 100%;
    height: 100%;
}
</style>
