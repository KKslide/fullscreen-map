<template>
    <div class="SPTcontainer">
        <div class="logo"></div>
        <div class="title">移动支付业务情况</div>
        <div class="content">
            <!-- 左边 -->
            <div class="content-l-wrap">
                <div class="l-top">
                    <div class="top_title">
                        <span>商户情况</span>
                    </div>
                    <div class="l-top-custom">
                        <div
                            class="l-top-custom-item"
                            v-for="(item,index) in customSituation"
                            :key="index"
                        >
                            <span v-text="item.text + ': ' + item.value + item.unit"></span>
                        </div>
                    </div>
                    <div class="l-top-rank">
                        <div class="l-top-rank-title">交易金额排名</div>
                        <ul>
                            <li>
                                <div>序号</div>
                                <div>商户</div>
                                <div>金额</div>
                            </li>
                            <li v-for="(item,index) in preTradeValueRank" :key="index">
                                <div v-text="index+1"></div>
                                <div v-text="item.name"></div>
                                <div v-text="item.value+'元'"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="l-top-rank">
                        <div class="l-top-rank-title">交易笔数排名</div>
                        <ul>
                            <li>
                                <div>序号</div>
                                <div>商户</div>
                                <div>笔数</div>
                            </li>
                            <li v-for="(item,index) in preTradeAmountRank" :key="index">
                                <div v-text="index+1"></div>
                                <div v-text="item.name"></div>
                                <div v-text="item.value+'笔'"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="l-mid">
                    <div class="top_title">
                        <span>交易金额情况</span>
                    </div>
                    <div class="l-mid-detail">
                        <div
                            class="l-mid-detai-item"
                            v-text="tradeCountDataAvg.name+': '+tradeCountDataAvg.value+tradeCountDataAvg.unit"
                        >历史日均交易金额：424.45万</div>
                        <div
                            class="l-mid-detai-item"
                            v-text="tradeCountDataMax.name+': '+tradeCountDataMax.value+tradeCountDataMax.unit"
                        >历史单日最高交易金额：1119.16万</div>
                    </div>
                    <bar-chart :tradeCountData="tradeCountData"></bar-chart>
                </div>
                <div class="l-bot">
                    <div class="top_title">
                        <span>交易笔数时间分布</span>
                    </div>
                    <div class="l-mid-detail">
                        <div
                            class="l-mid-detai-item"
                            v-text="tradeTimeDataMax.name+': '+tradeTimeDataMax.value+tradeTimeDataMax.unit"
                        ></div>
                    </div>
                    <line-chart :tradeTimeDistribution="tradeTimeDistribution"></line-chart>
                </div>
            </div>
            <!-- 右边 -->
            <div class="content-r-wrap">
                <div class="content-r-wrap-t">
                    <div class="top_title">
                        <span>支付交易分布图</span>
                    </div>
                    <china-map :nationMapValueData="nationMapValueData"></china-map>
                    <div class="nationMapTop5">
                        <div class="nationMapTop5Title">Top5:</div>
                        <p
                            v-for="(item,index) in nationTradeValueTop5"
                            :key="index"
                            v-text="(index+1)+'.'+item.type+': '+item.value+'%'"
                        ></p>
                    </div>
                    <div class="tradeAmountSummary">
                        <div class="tradeAmountHistory">
                            <div
                                v-for="(item,index) in historyTradeAmount"
                                :key="index"
                                v-text="item.name+': '+item.value+item.unit"
                            ></div>
                        </div>
                        <div class="tradeAmountCurrent" v-if="false">
                            <div
                                v-for="(item,index) in currentTradeAmount"
                                :key="index"
                                v-text="item.name+': '+item.value+item.unit"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="content-r-wrap-b">
                    <div class="content-r-wrap-b-left">
                        <div class="top_title">
                            <span v-text="pieChartL.title.text">客户支付方式</span>
                        </div>
                        <pie-com-l :pieChart="pieChartL"></pie-com-l>
                    </div>
                    <div class="content-r-wrap-b-right">
                        <div class="top_title">
                            <span>客户支付成功率</span>
                        </div>
                        <pie-com-r :pieChart="pieChartR" :pieChartSuccessData="pieChartSuccessData"></pie-com-r>
                    </div>
                </div>
            </div>
        </div>
        <page-switcher :prePagePath="'/screenpic3'" :nextPagePath="'/screenpic1'"></page-switcher>
    </div>
</template>
<script>
import BarChart from '@/components/ScreenFour/BarChart' // 交易金额情况
import LineChart from '@/components/ScreenFour/LineChart'; // 交易笔数时间分布
import ChinaMap from '@/components/ScreenFour/ChinaMap' // 全国地图
import PieComponent from '@/components/ScreenFour/CustomizedPie' // 右下角饼图
import PageSwitcher from '@/components/publicComponent/PageSwitch' // 前进后退按钮控件
export default {
    name: 'ScreenPic4',
    data() {
        return {
            customSituation: [], // 商户情况
            preTradeValueRank: [], // 上月交易金额排名
            preTradeAmountRank: [], // 上月交易笔数排名
            tradeCountData: {}, // 交易金额情况
            tradeCountDataAvg: {}, // 历史日均交易金额
            tradeCountDataMax: {}, // 历史单日最高交易金额
            tradeTimeDistribution: [], // 交易笔数时间分布
            // tradeTimeDataAvg: {}, // 
            tradeTimeDataMax: {}, // 
            nationMapValueData: [],
            nationTradeValueTop5: [],
            historyTradeAmount: {}, // 历史累计交易笔数
            currentTradeAmount: {}, // 2020年累计交易笔数
            pieChartL: { // 饼图数据（左边）
                title: {
                    text: '', //上月客户支付方式
                    top: '10%',
                    left: 'left',
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontSize: '18%',
                        fontWeight: 'normal'
                    }
                },
                roseType: '',
                series: [
                    {
                        name: '',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data: []
                    }
                ]
            },
            pieChartR: { // 饼图数据（右边）
                title: {
                    text: '', //上月客户支付方式
                    top: 'center',
                    left: 'center',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: '18%',
                        fontWeight: 'normal'
                    }
                },
                series: [
                    {
                        name: '',
                        radius: ['35%', '50%'],
                        center: ['50%', '50%'],
                        data: []
                    }
                ]
            },
            pieChartSuccessData: []
        }
    },
    components: {
        'page-switcher': PageSwitcher, // 前进后退按钮控件
        'bar-chart': BarChart, // 交易金额情况
        'line-chart': LineChart, // 交易笔数时间分布
        'china-map': ChinaMap, // 全国地图
        'pie-com-l': PieComponent, // 饼图组件
        'pie-com-r': PieComponent, // 饼图组件
    },
    mounted() {
        this.getData()
        window.chartTimer.dataAutoRefrash = setInterval(_ => {
            this.getData();
        }, 60 * 1000 * 10); // 十分钟更新一次
        this.$setCarousel('ScreenPic1')
    },
    methods: {
        getData() {
            this.$axios({
                url: this.$http.screenpic4.url, // 本地
                method: this.$http.screenpic4.method,
                data: {},
            })
                .then(res => {
                    this.customSituation = res.data.customSituation
                    this.preTradeValueRank = res.data.preTradeValueRank
                    this.preTradeAmountRank = res.data.preTradeAmountRank

                    this.tradeCountData = this.fixedForm(res.data.tradeCount.data)
                    this.tradeCountDataAvg = res.data.tradeCount.avgTradeValue // 历史日均交易金额
                    this.tradeCountDataMax = res.data.tradeCount.maxTradeValue // 历史单日最高交易金额

                    this.tradeTimeDistribution = this.fixedForm(res.data.tradeTimeDistribution.data)
                    this.tradeTimeDataMax = res.data.tradeTimeDistribution.tradeTimeDataMax

                    this.nationMapValueData = res.data.nationmap;
                    this.historyTradeAmount = res.data.historyTradeAmount;
                    this.currentTradeAmount = res.data.currentTradeAmount;
                    // 全国交易金额前五名
                    this.nationTradeValueTop5 = this.nationMapValueData.sort(this.compare("value")).slice(-5).reverse();
                    this.pieChartL.title.text = res.data.paymentType.name // 饼图名称(左)
                    this.pieChartL.series[0].data = res.data.paymentType.data // 饼图数据(左)

                    this.pieChartR.title.text = res.data.parmentSuccessRate.total + '%' // 饼图名称(右)
                    this.pieChartR.series[0].data = res.data.paymentType.data // 饼图数据(右)
                    this.pieChartSuccessData = res.data.parmentSuccessRate.data // 饼图数据(右)
                })
        },
        // json的数据格式在转换
        fixedForm(data) {
            let obj = {}, keys = [];
            data.forEach(e => keys = keys.concat(Object.keys(e))); // 先去重掉keys
            this.unique(keys).forEach(ele => {
                obj[ele] = data.map(val => val[ele])
            });
            return obj;
        },
        // 去重
        unique(arr) {
            return arr.filter(function (item, index, arr) {
                //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
                return arr.indexOf(item, 0) === index;
            });
        },
        compare(prop) { // 排序
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
    },
    beforeDestroy() {
        console.log('444---页面4销毁');
    }
}
</script>

<style lang="less" scoped>
.top_title {
    font-size: 0.2rem;
    color: white;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    text-align: left;
    text-indent: 0.15rem;
    padding: 0.05rem 0;
    .top_title_after::after {
        content: attr(attr-title);
        font-size: 15px;
        padding-left: 5px;
        position: absolute;
        right: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
    }
}
.SPTcontainer {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    .logo {
        background-image: url("../../../static/images/logo.png");
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 1%;
        left: 1%;
        width: 100%;
        height: 6vh;
    }
    .title {
        background: url(../../../static/images/top3.png) no-repeat;
        background-size: 100% 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
        font-size: 0.28rem;
        color: white;
        line-height: 0.45rem;
    }
    .content {
        width: 100vw;
        height: 90vh;
        padding: 1vh 1vw;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        .content-l-wrap {
            width: 48.5vw;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .l-top {
                height: 28.5vh;
                margin-bottom: 0.1rem;
                background: url(../../../static/images/wrap_bg4.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                display: flex;
                justify-content: space-around;
                padding-top: 8%;
                .l-top-custom {
                    position: absolute;
                    top: 10%;
                    right: 3%;
                    // width: 80%;
                    height: 10%;
                    display: flex;
                    // justify-content: space-between;
                    .l-top-custom-item {
                        font-size: 18px;
                        color: #fff;
                        padding: 0 15px;
                        border-right: 1px solid #fff;
                    }
                    .l-top-custom-item:last-child {
                        border: none;
                    }
                }
                .l-top-rank {
                    width: 50%;
                    height: 80%;
                    .l-top-rank-title {
                        font-size: 18px;
                        color: #fff;
                        text-indent: 1em;
                    }
                    ul {
                        margin: 0;
                        padding: 3%;
                        li {
                            list-style: none;
                            display: flex;
                            justify-content: space-between;
                            padding: 1%;
                            div {
                                font-size: 15px;
                                color: #fff;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            div:nth-child(2) {
                                overflow: hidden;
                                width: 270px;
                            }
                        }
                        li:first-child {
                            justify-content: space-between;
                        }
                    }
                }
            }
            .l-mid {
                height: 28.5vh;
                margin-bottom: 0.1rem;
                background: url(../../../static/images/wrap_bg4.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                .l-mid-detail {
                    position: absolute;
                    top: 3%;
                    right: 3%;
                    font-size: 18px;
                    color: #fff;
                    display: flex;
                    .l-mid-detai-item {
                        padding-left: 20px;
                    }
                }
            }
            .l-bot {
                height: 28.5vh;
                background: url(../../../static/images/wrap_bg4.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                .l-mid-detail {
                    position: absolute;
                    top: 3%;
                    right: 3%;
                    font-size: 18px;
                    color: #fff;
                    display: flex;
                    .l-mid-detai-item {
                        padding-left: 20px;
                    }
                }
            }
        }
        .content-r-wrap {
            width: 48.5vw;
            display: flex;
            flex-direction: column;
            .content-r-wrap-t {
                height: 55vh;
                margin-bottom: 0.1rem;
                background: url("../../../static/images/wrap_bg4.png") center
                    center no-repeat;
                background-size: 100% 100%;
                position: relative;
                .nationMapTop5 {
                    position: absolute;
                    top: 15%;
                    right: 8%;
                    font-size: 18px;
                    color: #fff;
                    .nationMapTop5Title {
                        font-size: 30px;
                    }
                    p {
                        padding: 5px 0;
                    }
                }
                .tradeAmountSummary {
                    position: absolute;
                    left: 5%;
                    bottom: 5%;
                    font-size: 18px;
                    color: #fff;
                    .tradeAmountHistory,
                    .tradeAmountCurrent {
                        display: flex;
                        div {
                            padding-right: 25px;
                        }
                    }
                }
            }
            .content-r-wrap-m {
                flex: 1.5;
                margin-bottom: 0.1rem;
                background: url("../../../static/images/wrap_bg4.png") center
                    center no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
            .content-r-wrap-b {
                width: 48.5vw;
                height: 32vh;
                background: url("../../../static/images/wrap_bg4.png") center
                    center no-repeat;
                background-size: 100% 100%;
                position: relative;
                display: flex;
                justify-content: space-around;
                .content-r-wrap-b-left,
                .content-r-wrap-b-right {
                    position: relative;
                    width: 50%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
