<template>
    <div class="SPTcontainer">
        <div class="logo"></div>
        <div class="title">线上存款监控大屏</div>
        <div class="content">
            <!-- 左边 -->
            <div class="content-l-wrap">
                <div class="l-top">
                    <div class="l-top-title top_title">
                        <span>线上存款规模</span>
                    </div>
                    <count-part :iconItemData="onlineSaving"></count-part>
                </div>
                <div class="l-bot">
                    <div class="top_title">
                        <span>全国交易分布情况</span>
                    </div>
                    <!-- Top5排行 -->
                    <heat-map-rank :mapData="mapDataTop5"></heat-map-rank>
                    <!-- Top5排行 -->
                    <heat-map :nationMapValueData="mapData"></heat-map>
                </div>
            </div>
            <!-- 中间 -->
            <div class="content-mid-wrap">
                <div class="content-mid-wrap-t">
                    <div class="top_title">
                        <span>近七日交易量走势</span>
                    </div>
                    <line-chart :sevenDayTradeTendency="sevenDayTradeTendency"></line-chart>
                    <!-- <tendency-chart :sevenDayOpenAccountTendency="sevenDayOpenAccountTendency"></tendency-chart> -->
                </div>
                <div class="content-mid-wrap-m">
                    <div class="top_title">
                        <span class="top_title_after" attr-title="单位(户)">近七日线上开户走势</span>
                        <!-- <div style="font-size:15px;">单位(户)</div> -->
                    </div>
                    <tendency-chart :sevenDayOpenAccountTendency="sevenDayOpenAccountTendency"></tendency-chart>
                </div>
                <div class="content-mid-wrap-b">
                    <div class="top_title">
                        <span class="top_title_after">全国实时存款分布情况</span>
                    </div>
                    <!-- <live-tip :position="{'top':'25%'}"></live-tip> -->
                    <live-trade-map :position="{'top':'8%',}"></live-trade-map>
                    <!-- <heat-map :nationMapValueData="mapData"></heat-map> -->
                </div>
            </div>
            <!-- 右边 -->
            <div class="content-r-wrap">
                <div class="content-r-wrap-t">
                    <div class="top_title">
                        <span>今日线上存款实时情况</span>
                    </div>
                    <line-chart-right :productRealTimeLine="productRealTimeLine"></line-chart-right>
                </div>
                <div class="content-r-wrap-b">
                    <div class="top_title">
                        <span>最新存款动态</span>
                    </div>
                    <realTime-list :reallist="workreallist" :originList="originRealList"></realTime-list>
                </div>
            </div>
        </div>
        <!-- <page-switcher :prePagePath="'/screenpic2'" :nextPagePath="'/screenpic4'"></page-switcher> -->
        <page-switcher :prePagePath="prePage" :nextPagePath="nextPage"></page-switcher>
    </div>
</template>
<script>
import CountPart from '@/components/ScreenThree/CountPart'; // 统计组件
// import HeatMap from '@/components/ScreenThree/HeatMap'; // 客户交易量热力图
import HeatMap from '@/components/ScreenThree/ChinaMap'; // 客户交易量热力图
import HeatMapRank from '@/components/ScreenThree/HeatMapRank'; // 热力图
import LineChartRight from '@/components/ScreenThree/LineChartRight'; // 购买产品实时情况 - 中间曲线图
import RealTimeList from '@/components/ScreenThree/RealTimeList'; // 中间下边实时交易

import LineChart from '@/components/ScreenThree/LineChart'; // 近七日交易量走势
import Tendency from '@/components/ScreenThree/Tendency'; // 近七日线上开户走势
import LiveTrapMap from '@/components/publicComponent/LiveTrapMap' // 新增的实时交易路线地图组件
import PageSwitcher from '@/components/publicComponent/PageSwitch' // 前进后退按钮控件
import LiveTradeTip from '@/components/publicComponent/LiveTip' // 实时交易提示
// import LiveTipVue from '../publicComponent/LiveTip.vue';
export default {
    name: 'ScreenPic3',
    data() {
        return {
            iconItemData: [
                {
                    text: '今日放款金额',
                    value: '9,953,666.8',
                    unit: '元'
                },
                {
                    text: '今日放款笔数',
                    value: '226',
                    unit: '笔'
                }
            ],

            onlineSaving: [], // 累计线上存款交易
            heatMapData: [], // 热数据
            productRealTimeLine: [], // 理财产品实时情况
            workreallist: [],      //实时信息数据
            originRealList: [],
            mapData: [], // 热例如数据
            mapDataTop5: [],

            sevenDayTradeTendency: [], // 近七日交易量走势
            sevenDayOpenAccountTendency: [], // 近七日线上开户走势
            liveData: {
                amount: "",
                address: "",
                sex: "",
                name: "",
                type: ""
            },
            prePage:'',
            nextPage:''
        };
    },
    components: {
        'count-part': CountPart, // 统计组件
        'heat-map': HeatMap, // 热力图
        'heat-map-rank': HeatMapRank,
        'line-chart-right': LineChartRight, // 购买产品实时情况
        'realTime-list': RealTimeList, // 交易提醒-
        'line-chart': LineChart,
        'tendency-chart': Tendency,
        'live-trade-map': LiveTrapMap, // 实时交易路线地图组件
        'page-switcher': PageSwitcher, // 前进后退按钮控件
        // 'live-tip':LiveTipVue
    },
    mounted() {
        this.getMap()
        window.chartTimer.autoRefrash = setInterval(_ => {
            this.getMap();
        }, 60 * 1000 * 10); // 十分钟更新一次
        // this.$setCarousel('ScreenPic4')
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
                url: this.$http.screenpic3.url, // 本地
                method: this.$http.screenpic3.method,
                data: {},

                // url: "http://10.30.80.71:8100/usp_ks/tx/SZYH",
                // url: "./tx/SZYH",
                // method: "post",
                // data: {},
            }).then(res => {
                let curHour = new Date().getHours();
                this.onlineSaving = res.data.iconItemData1  // 左上组件 
                this.productRealTimeLine = this.fixedForm(res.data.dayProduct) // 24小时数据
                this.productRealTimeLine.data1.splice(curHour + 1)
                this.productRealTimeLine.data2.splice(curHour + 1)
                this.productRealTimeLine.hour.splice(curHour + 1)
                this.mapData = res.data.nationmap // 地图数据 - 城市的数据
                this.mapDataTop5 = res.data.nationmap.sort(this.compare("amount")).reverse().slice(0, 5) // 地图数据 - 城市数据TOP5

                this.sevenDayTradeTendency = this.fixedForm(res.data.sevenDayTradeTendency) // 近七日交易量走势
                this.sevenDayOpenAccountTendency = this.fixedForm(res.data.sevenDayOpenAccountTendency) // 近七日线上开户走势
                
                if( !res.data.realist_CY || res.data.realist_CY.length==0 || res.data.realist_CY=="" || res.data.realist_CY==[]){
                    console.log('*** it`s now useing fake data !!! ***');
                    this.workreallist = ["湖北省武汉市周**, 存入一笔【线上存款】产品, 金额 10,000元","浙江省金华市魏**, 存入一笔【线上存款】产品, 金额 50,000元","福建省烟台市贾**, 存入一笔【线上存款】产品, 金额 12,000元","江西省南昌市梨**, 存入一笔【线上存款】产品, 金额 10,000元","湖南省海口市韦**, 存入一笔【线上存款】产品, 金额 8,000元","浙江省金华市李**, 存入一笔【线上存款】产品, 金额 50,000元","福建省福州市潘**, 存入一笔【线上存款】产品, 金额 50,000元","湖南省海口市陆**, 存入一笔【线上存款】产品, 金额 30,000元","贵州省贵阳市林**, 存入一笔【线上存款】产品, 金额 300,000元","云南省昆明市周**, 存入一笔【线上存款】产品, 金额 10,000元","浙江省杭州市陆**, 存入一笔【线上存款】产品, 金额 150,000元","福建省烟台市孙**, 存入一笔【线上存款】产品, 金额 20,000元","广西省南宁市刘**, 存入一笔【线上存款】产品, 金额 170,000元","海南省儋州市赵**, 存入一笔【线上存款】产品, 金额 100,000元","浙江省金华市陆**, 存入一笔【线上存款】产品, 金额 50,000元","福建省福州市陆**, 存入一笔【线上存款】产品, 金额 50,000元"];
                    this.originRealList = [{"amount":"10000","address":"湖北省武汉市","sex":"先生","name":"周","type":"客商银行周周利2号"},{"amount":"50000","address":"浙江省金华市","sex":"先生","name":"魏","type":"客商银行五年定期存款"},{"amount":"12000","address":"福建省烟台市","sex":"先生","name":"贾","type":"客商银行五年定期存款"},{"amount":"10000","address":"江西省南昌市","sex":"先生","name":"梨","type":"客商银行周周利2号"},{"amount":"8000","address":"湖南省海口市","sex":"先生","name":"韦","type":"客商银行五年定期存款"},{"amount":"50000","address":"浙江省金华市","sex":"先生","name":"李","type":"客商银行五年定期存款"},{"amount":"50000","address":"福建省福州市","sex":"先生","name":"潘","type":"客商银行五年定期存款"},{"amount":"30000","address":"湖南省海口市","sex":"女士","name":"陆","type":"客商银行五年定期存款"},{"amount":"300000","address":"贵州省贵阳市","sex":"先生","name":"林","type":"周周利1号"},{"amount":"10000","address":"云南省昆明市","sex":"女士","name":"周","type":"周周利1号"},{"amount":"150000","address":"浙江省杭州市","sex":"先生","name":"陆阳杰","type":"客商银行五年定期存款"},{"amount":"20000","address":"福建省烟台市","sex":"先生","name":"孙","type":"客商银行五年定期存款"},{"amount":"170000","address":"广西省南宁市","sex":"女士","name":"刘","type":"周周利1号"},{"amount":"100000","address":"海南省儋州市","sex":"女士","name":"赵","type":"周周利1号"},{"amount":"50000","address":"浙江省金华市","sex":"先生","name":"陆","type":"客商银行五年定期存款"},{"amount":"50000","address":"福建省福州市","sex":"先生","name":"陆","type":"客商银行五年定期存款"}];
                    this.$store.commit('setAllCurrentTrade', this.originRealList);
                    window.localStorage.setItem('allCurrentTrade', JSON.stringify(this.originRealList));
                } else {
                    this.workreallist = this.formMatList(res.data.realist_CY) // 实时信息数据
                    this.originRealList = res.data.realist_CY; // 实时交易原始数据格式
                    this.$store.commit('setAllCurrentTrade', res.data.realist_CY)
                    window.localStorage.setItem('allCurrentTrade', JSON.stringify(res.data.realist_CY))
                }
            })
        },
        compare(prop) { // 排序
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
        fixedForm(data) { // json的数据格式在转换
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
                workreallistdata.push(a.address + a.name.slice(0,1) + /* a.sex */"**" + ", " + "存入一笔【线上存款】产品, 金额" + " " + b + "元")
            }
            return workreallistdata;
        },
        filterNotZero(arr) {
            var newArr = arr.filter((v, i, arr) => {
                return Math.round(Number(v.value)) > 0
            })
            return newArr.length == 0 ? arr : newArr;
        }
    },
    beforeDestroy(){
        console.log('333---页面3销毁');
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
                // height: 40%;
                display: inline-block !important;
            }
            .content-mid-wrap-t {
                // flex: 2.5;
                // height: 21.5%;
                height: 25%;
                margin-bottom: 0.1rem;
            }
            .content-mid-wrap-m {
                // width: 33.3333vw;
                width: 100%;
                height: 25%;
                overflow: hidden;
            }
            .content-mid-wrap-b {
                height: 50%;
                position: relative;
            }
        }
        .content-r-wrap {
            width: 28vw;
            display: flex;
            flex-direction: column;
            .content-r-wrap-t {
                height: 42vh;
                margin-bottom: 0.1rem;
                background: url("../../../static/images/wrap_bg4.png") center
                    center no-repeat;
                background-size: 100% 100%;
                position: relative;
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
                width: 28vw;
                height: 48vh;
                background: url("../../../static/images/wrap_bg4.png") center
                    center no-repeat;
                background-size: 100% 100%;
                position: relative;
                .content_pie_left,
                .content_pie_right {
                    position: absolute;
                    width: 80%;
                    height: 75%;
                }
                .content_pie_left {
                    left: 0.15rem;
                    bottom: 0.15rem;
                    //   background-color: rgba(254, 193, 204, 1);
                }
                .content_pie_right {
                    right: 0.15rem;
                    top: 0.15rem;
                    //   background-color: rgba(255, 255, 0, 0.5);
                }
            }
        }
    }
}
</style>
