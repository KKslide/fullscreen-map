<template>
    <div class="SPTcontainer">
        <div class="logo"></div>
        <div class="title">喜之郎供应链业务</div>
        <div class="content">
            <!-- 左边 -->
            <div class="content-l-wrap">
                <div class="l-top">
                    <div class="l-top-title top_title">
                        <span>注册及额度情况</span>
                    </div>
                    <count-part :iconItemData1="iconItemData1"></count-part>
                </div>
                <div class="l-bot">
                    <div class="top_title">
                        <span>成功注册用户分布情况</span>
                    </div>
                    <!-- Top5排行 -->
                    <heat-map-rank :mapDataRank="mapDataTop5"></heat-map-rank>
                    <!-- Top5排行 -->
                    <heat-map :nationMapValueData="mapData"></heat-map>
                </div>
            </div>
            <!-- 中间 -->
            <div class="content-mid-wrap">
                <div class="content-mid-wrap-t">
                    <div class="top_title">
                        <span>授信及用信情况</span>
                    </div>
                    <div class="chart_box">
                        <div class="chart_table">
                            <div class="chart_table_item" v-for="(item,index) in iconItemData2.slice(0,5)" :key="index">
                                <span class="chart_table_title" v-html="item.text">贷款金额</span>
                                <p class="chart_table_val" v-html="item.value"></p>
                                <span class="chart_table_unit" v-html="item.unit">万元</span>
                            </div>
                        </div>
                        <div class="split_line"></div>
                        <div class="chart_table">
                            <div class="chart_table_item" v-for="(item,index) in iconItemData2.slice(5,10)" :key="index">
                                <span class="chart_table_title" v-html="item.text">贷款金额</span>
                                <p class="chart_table_val" v-html="item.value"></p>
                                <span class="chart_table_unit" v-html="item.unit">万元</span>
                            </div>
                        </div>
                        <div class="chart_table" v-if="false">
                            <div class="chart_table_item">
                                <span class="chart_table_title">户均贷款金额</span>
                                <p class="chart_table_val">999,999</p>
                                <span class="chart_table_unit">万元</span>
                            </div>
                            <div class="chart_table_item">
                                <span class="chart_table_title">笔数</span>
                                <p class="chart_table_val">999,999</p>
                                <span class="chart_table_unit">笔</span>
                            </div>
                            <div class="chart_table_item">
                                <span class="chart_table_title">笔数最大</span>
                                <p class="chart_table_val">999,999</p>
                                <span class="chart_table_unit">笔</span>
                            </div>
                            <div class="chart_table_item">
                                <span class="chart_table_title">笔数最小</span>
                                <p class="chart_table_val">999,999</p>
                                <span class="chart_table_unit">万元</span>
                            </div>
                            <div class="chart_table_item">
                                <span class="chart_table_title">笔均</span>
                                <p class="chart_table_val">999,999</p>
                                <span class="chart_table_unit">万元</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-mid-wrap-b">
                    <div class="top_title">
                        <span class="top_title_after">全国客户省份分布情况</span>
                    </div>
                    <multiple-chart></multiple-chart>
                </div>
            </div>
            <!-- 右边 -->
            <div class="content-r-wrap">
                <div class="content-r-wrap-t">
                    <div class="top_title">
                        <span>核心企业统计</span>
                    </div>
                    <bar-chart :barChartData="barChartData"></bar-chart>
                </div>
                <div class="content-r-wrap-m">
                    <div class="top_title">
                        <span>最近7天交易趋势</span>
                    </div>
                    <line-chart :sevenDayTradeTendency="sevenDayTradeTendency"></line-chart>
                </div>
                <div class="content-r-wrap-b">
                    <div class="top_title">
                        <span>实时交易情况</span>
                    </div>
                    <realTime-list :reallist="workreallist" :originList="originRealList"></realTime-list>
                </div>
            </div>
        </div>
        <page-switcher :prePagePath="prePage" :nextPagePath="nextPage"></page-switcher>
    </div>
</template>
<script>
import CountPart from '@/components/ScreenSix/CountPart'; // 统计组件 - 注册及额度情况
import HeatMap from '@/components/ScreenSix/HeatMap'; // 热力图 - 成功注册用户分布情况
// import HeatMap from '@/components/ScreenSix/ChinaMap'; // 客户交易量热力图
import HeatMapRank from '@/components/ScreenSix/HeatMapRank'; // 热力图 - 交易(贷款)金额top5
import RealTimeList from '@/components/ScreenSix/RealTimeList'; // 中间下边实时交易
import BarChart from "@/components/ScreenSix/BarChart"; 

import LineChart from '@/components/ScreenSix/LineChart'; // 折线图 - 近七日交易量走势
import PageSwitcher from '@/components/publicComponent/PageSwitch' // 前进后退按钮控件
// import DoubleBarChart from '../ScreenSix/DoubleBarChart.vue'; // 横向双柱状图 - 融资区间分布
import MultipleChart from '@/components/ScreenSix/MultipleChart'; // 纵向双柱状图 - 融资区间分布
export default {
    name: 'ScreenPic6',
    data() {
        return {
            barChartData:[], // 核心企业统计
            iconItemData1: [], // 注册及额度情况
            iconItemData2: [], // 授信及用信情况
            heatMapData: [], // 热数据
            productRealTimeLine: [], // 理财产品实时情况
            originRealList: [], // 实时信息数据(处理前)
            workreallist: [], // 实时信息数据(处理后)
            mapData: [], // 热力图数据
            mapDataTop5: [],

            sevenDayTradeTendency: [], // 近七日交易量走势
            sevenDayOpenAccountTendency: [], // 近七日线上开户走势
            prePage:'',
            nextPage:''
        };
    },
    components: {
        'count-part': CountPart, // 统计组件
        'bar-chart': BarChart, // 统计组件
        'heat-map': HeatMap, // 热力图
        'heat-map-rank': HeatMapRank,
        // 'double-bar':DoubleBarChart,
        'multiple-chart':MultipleChart,
        'realTime-list': RealTimeList, // 交易提醒-
        'line-chart': LineChart, // 最近7天交易趋势
        'page-switcher': PageSwitcher, // 前进后退按钮控件
    },
    mounted() {
        this.getMap()
        window.chartTimer.autoRefrash = setInterval(_ => {
            this.getMap();
        }, 60 * 1000 * 10); // 十分钟更新一次
        let curPageName = this.$route.path.replace('/',''); // 当前路由名称
        let carouselList = JSON.parse(sessionStorage.getItem('carouselList')); // 轮播顺序(carouselList)
        let curIndex = carouselList.indexOf(curPageName);
        if(curIndex == -1){
            return false;
        }
        else{
            if(curIndex == 0){ // 第一页
                this.$setCarousel(carouselList[1]); // 下一页为第二页
                this.nextPage = '/'+carouselList[1];
                this.prePage = '/'+carouselList[carouselList.length-1]; // 上一页为最后一页
            }
            else if(curIndex == carouselList.length-1){ // 最后一页
                this.$setCarousel(carouselList[0]); // 下一页为第一页
                this.nextPage = '/'+carouselList[0]; 
                this.prePage = '/'+carouselList[curIndex-1]; 
            }
            else{
                this.$setCarousel(carouselList[curIndex+1]); // 设置下一页
                this.nextPage = '/'+carouselList[curIndex+1];
                this.prePage = '/'+carouselList[curIndex-1]; 
            }
        }
    },
    methods: {
        getMap() {
            this.$axios({
                url: this.$http.screenpic6.url, // 本地
                method: this.$http.screenpic6.method,
                data: {},
            }).then(res => {
                let curHour = new Date().getHours();
                this.iconItemData1 = res.data.iconItemData1  // 注册及额度情况 
                this.iconItemData2 = res.data.iconItemData2  // 授信及用信情况 
                this.barChartData = this.fixedForm(res.data.coreCompany) // 核心企业统计
                this.workreallist = this.formMatList(res.data.realist_CY) // 实时信息数据
                this.originRealList = res.data.realist_CY; // 实时交易原始数据格式
                this.mapData = res.data.nationmap // 地图热力图组件数据 - 城市的数据
                this.mapDataTop5 = res.data.nationmap.sort(this.compare("amount")).reverse().slice(0, 5) // 地图数据 - 城市数据TOP5
                this.sevenDayTradeTendency = this.fixedForm(res.data.sevenDayTradeTendency) // 近七日交易量走势

                this.iconItemData2.map(v=>{
                    return v.value = v.unit=="万元" ? this.fixedNumber(v.value) : v.value
                });
            })
        },
        fixedNumber(num) { // 数字千分位
            return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')//.split(".")[0];
        },
        compare(prop) { // 排序
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
        fixedForm(data) { // json的数据格式转换
            let obj = {}, keys = [];
            data.forEach(e => keys = keys.concat(Object.keys(e))); // 先去重掉keys
            this.unique(keys).forEach(ele => {
                obj[ele] = data.map(val => val[ele])
            });
            return obj;
        },
        unique(arr) { // 去重
            return arr.filter(function (item, index, arr) {
                //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
                return arr.indexOf(item, 0) === index;
            });
        },
        formMatList(list) { // 格式化实时交易的List列表
            let workreallistdata = [];
            for (var i = 0; i < list.length; i++) {
                let a = list[i];
                let b = Number(a.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
                workreallistdata.push(a.address + a.name.slice(0,1) + /* a.sex */"**" + ", " + "申请一笔贷款, 金额" + " " + b + "万元")
            }
            return workreallistdata;
        }
    },
    beforeDestroy(){
        console.log('666---页面6销毁');
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
        padding: 1%;
        box-sizing: border-box;
        display: flex;
        .content-l-wrap {
            width: 33.3333vw;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .l-top {
                height: 42vh;
                margin-bottom: 0.1rem;
                background: url(../../../static/images/wrap_bg4.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                .l-top-title {
                    font-size: 0.2rem;
                    color: white;
                    position: absolute;
                    width: 100%;
                    text-align: left;
                    text-indent: 0.15rem;
                }
            }
            .l-mid {
                flex: 1;
                margin-bottom: 0.1rem;
                background: url(../../../static/images/wrap_bg4.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                > div {
                    height: 100%;
                    width: 100%;
                }
            }
            .l-bot {
                height: 48vh;
                background: url(../../../static/images/wrap_bg4.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
        }
        .content-mid-wrap {
            width: 38.6666vw;
            margin: 0 0.1rem;
            display: flex;
            flex-direction: column;
            .content-mid-wrap-t,
            .content-mid-wrap-m {
                background-image: url("../../../static/images/wrap_bg4.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center;
                position: relative;
                display: inline-block !important;
            }
            .content-mid-wrap-t {
                // height: 40%;
                height: 29vh;
                margin-bottom: 0.1rem;
                div.chart_box{
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-41%);
                    display: flex;
                    justify-content: space-around;
                    .chart_table{
                        display: flex;
                        flex-direction: column;
                        div.chart_table_item{
                            width: 100%;
                            display: flex;
                            padding:3px 0;
                            span.chart_table_title{
                                font-size: 23px;
                            }
                            p.chart_table_val{
                                    color: #7aeaff;
                                    text-shadow: 0 0 8px rgba(56, 250, 255, 0.62);
                                    font-size: 25px;
                                    padding:0 15px;
                            }
                            span.chart_table_unit{
                                font-size: 20px;
                            }
                            span{
                                color:#fff;
                            }
                        }
                    }
                    div.split_line{
                        // position: ;
                        width: 1px;
                        height: 1.5em;
                        background-color: #fff;
                    }
                }
            }
            // .content-mid-wrap-m {
            //     width: 100%;
            //     height: 25%;
            //     margin-bottom: 0.1rem;
            //     overflow: hidden;
            // }
            .content-mid-wrap-b {
                // height: 60%;
                height: 61vh;
                background: url("../../../static/images/wrap_bg4.png") center center no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
        }
        .content-r-wrap {
            width: 28vw;
            display: flex;
            flex-direction: column;
            .content-r-wrap-t {
                height: 30vh;
                margin-bottom: 0.1rem;
                background: url("../../../static/images/rectangle_small.png") center center no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
            .content-r-wrap-m {
                height: 30vh;
                margin-bottom: 0.1rem;
                background: url("../../../static/images/rectangle_small.png") center center no-repeat;
                background-size: 100% 100%;
                position: relative;
                #lineChart{
                    height:100%;
                }
            }
            .content-r-wrap-b {
                width: 28vw;
                height: 30vh;
                background: url("../../../static/images/wrap_bg4.png") center center no-repeat;
                background-size: 100% 100%;
                position: relative;
            }
        }
    }
}
</style>
