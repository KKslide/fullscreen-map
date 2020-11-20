<template>
    <div class="SPTcontainer">
        <div class="logo"></div>
        <div class="title">{{title}}</div>
        <div class="content" style="transform:translateY(-1.1%);">
            <!-- 左 -->
            <div class="content-l-wrap">
                <div class="content_L_wrap_item">
                    <div>
                        <line-chart :latest24Data="latest24Data" :titleName="titleName1"></line-chart>
                    </div>
                </div>
                <div class="content_L_wrap_item">
                    <div class="trade_amount">
                        <div>贷款余额</div>
                        <base-number :tradeData="totalTradeAmount"></base-number>
                    </div>
                    <div class="trade_count">
                        <div>累计放款笔数</div>
                        <base-number :tradeData="totalTradeCount"></base-number>
                    </div>
                    <div class="trade_amount">
                        <div>进件数</div>
                        <base-number :tradeData="importNum"></base-number>
                    </div>
                    <div class="trade_count">
                        <div>审批通过数</div>
                        <base-number :tradeData="passNum"></base-number>
                    </div>
                </div>
                <div class="content_L_wrap_item">
                    <div
                        style=" position: absolute; top: 8px; left: 10px; font-size: 0.22rem; "
                    >全国交易分布情况</div>
                    <!-- top5 -->
                    <div class="tradeCountTop5">
                        <div class="trade_count">
                            <span> 放款金额Top5 <br />(万元) </span>
                            <div class="trade_count_item" v-for="(item,index) in mapTradeValueTop5" :key="index" >
                                <div class="trade_count_item_data" :data-name="item.type" :data-count="parseInt(item.value)" v-trans ></div>
                                <div class="rank_circle"></div>
                            </div>
                        </div>
                        <div class="trade_amount" v-if="false">
                            <span>放款笔数Top5</span>
                            <div
                                class="trande_amount_item"
                                v-for="(item,index) in mapTradeAmountTop5"
                                :key="index"
                            >{{item.type}}{{fixedNumber(item.amount)}}笔</div>
                        </div>
                    </div>
                    <china-map :nationMapValueData="nationMapValueData"></china-map>
                </div>
                <!-- <div class="content_L_wrap_item">
                    <div class="content_right">
                        <div>放款数</div>
                        <base-number :tradeData="dealNum"></base-number>
                    </div>
                </div>
                <div class="content_L_wrap_item r_style_item">
                    <div class="trade_amount">
                        <div>昨日放款金额</div>
                        <base-number :tradeData="releaseAmount"></base-number>
                    </div>
                    <div class="trade_count">
                        <div>笔数</div>
                        <base-number :tradeData="releaseCount"></base-number>
                    </div>
                </div>
                <div class="content_L_wrap_item r_style_item">
                    <div class="trade_amount">
                        <div>昨日还款金额</div>
                        <base-number :tradeData="returnAmount"></base-number>
                    </div>
                    <div class="trade_count">
                        <div>利息</div>
                        <base-number :tradeData="returnCount"></base-number>
                    </div>
                </div>
                <div class="content_L_wrap_item r_style_item">
                    <div class="trade_amount">
                        <div>总客户数</div>
                        <base-number :tradeData="newsBussiness"></base-number>
                    </div>
                    <div class="trade_count">
                        <div>昨日新增客户数</div>
                        <base-number :tradeData="O2OBussiness"></base-number>
                    </div>
                </div>-->
            </div>
            <!-- 左 -->
            <!-- 中 -->
            <div class="content-mid-wrap">
                <div class="content-mid-wrap-t">
                    <div class="content-mid-wrap-t-content">
                        <semicircleProgress-bar :showData="showData"></semicircleProgress-bar>
                    </div>
                </div>
                <div class="content-mid-wrap-m">
                    <div class="content-mid-wrap-m-title">全国实时交易分布情况</div>
                    <!-- top5 -->
                    <!-- <div class="tradeCountTop5">
                        <div class="trade_count">
                            <span>
                                放款金额Top5
                                <br />(万元)
                            </span>
                            <div
                                class="trade_count_item"
                                v-for="(item,index) in mapTradeValueTop5"
                                :key="index"
                            >
                                <div
                                    class="trade_count_item_data"
                                    :data-name="item.type"
                                    :data-count="parseInt(item.value)"
                                ></div>
                                <div class="rank_circle"></div>
                            </div>
                        </div>
                        <div class="trade_amount">
                            <span>放款笔数Top5</span>
                            <div
                                class="trande_amount_item"
                                v-for="(item,index) in mapTradeAmountTop5"
                                :key="index"
                            >{{item.type}}{{fixedNumber(item.amount)}}笔</div>
                        </div>
                    </div>-->

                    <!-- <china-map :nationMapValueData="nationMapValueData"></china-map> -->
                    <!-- 实时交易提示 -->
                    <!-- <div class="live_tip">
                        <div class="live_tip_addr">
                            <p class="live_tip_item">地点</p>
                            <p
                                class="live_tip_content animated"
                                v-animate
                                v-text="liveData.address"
                            ></p>
                        </div>
                        <div class="live_tip_name">
                            <p class="live_tip_item">客户</p>
                            <p
                                class="live_tip_content animated"
                                v-animate
                                v-text="liveData.name+(liveData.sex||'')"
                            ></p>
                        </div>
                        <div class="live_tip_type">
                            <p class="live_tip_item">产品</p>
                            <p class="live_tip_content animated" v-animate v-text="liveData.type"></p>
                        </div>
                        <div class="live_tip_amount">
                            <p class="live_tip_item">金额</p>
                            <p
                                class="live_tip_content animated"
                                v-animate
                                v-text="liveData.amount+'元'"
                            ></p>
                        </div>
                    </div>-->
                    <!-- <live-tip :position="{'top':'65px'}"></live-tip> -->
                    <live-trade-map :position="{'top':'10%','bottom':'15%'}"></live-trade-map>
                </div>
            </div>
            <!-- 中 -->
            <!-- 右 -->
            <div class="content-r-wrap">
                <div class="content-r-wrap-t">
                    <bar-chart :barChartData="barChartData"></bar-chart>
                </div>
                <div class="content-r-wrap-m">
                    <area-chart :areaData="latest7"></area-chart>
                </div>
                <div class="content-r-wrap-b">
                    <realTime-list :reallist="workreallist" :originList="originRealList"></realTime-list>
                </div>
            </div>
            <!-- 右 -->
        </div>
        <!-- <page-switcher :prePagePath="'/screenpic1'" :nextPagePath="'/screenpic3'"></page-switcher> -->
        <page-switcher :prePagePath="prePage" :nextPagePath="nextPage"></page-switcher>
    </div>
</template>
<script>
import LineChart from '@/components/ScreenTwo/LineChart' // 最近24小时放款金额
import BaseNumber from '@/components/ScreenTwo/BaseNumber' // 数字样式
import SemicircleProgressBar from '@/components/ScreenTwo/SemicircleProgressBar' // 今日放款金额和笔数 - 仪表盘
import ChinaMap from '@/components/ScreenTwo/ChinaMap' // 全国地图
import BarChart from '@/components/ScreenTwo/BarChart' // 放款类型统计 - 条形进度条组件
// import AreaChart from '@/components/ScreenTwo/AreaChart' // 近7天的交易趋势 - 曲线图区域样式
import AreaChart from '@/components/ScreenTwo/LineChartRight' // 近7天的交易趋势 - 曲线图区域样式
import RealTimeList from '@/components/ScreenTwo/RealTimeList' // 实时交易情况
import LiveTrapMap from '@/components/publicComponent/LiveTrapMap' // 新增的实时交易路线地图组件
import PageSwitcher from '@/components/publicComponent/PageSwitch' // 前进后退按钮控件
// import LiveTipVue from '../publicComponent/LiveTip.vue';
export default {
    name: 'ScreenPic2',
    data() {
        return {
            title: "线上资产业务监控大屏",
            titleName1: '最近24小时放款金额',
            latest24Data: {}, // 最近24小时放款金额  -  这里是要把请求回来的数据整理成这种格式

            totalData: null, // 所有数据
            totalTradeAmount: null, // 贷款余额
            totalTradeCount: null, // 累计放款笔数
            importNum: null, // 进件数
            dealNum: null, // 放款数
            passNum: null, // 审批通过数
            releaseAmount: null, // 昨日放款金额
            releaseCount: null, // 昨日放款笔数
            returnAmount: null, // 昨日还款金额
            returnCount: null, // 昨日还款笔数
            newsBussiness: null, // 新网联合授权业务
            O2OBussiness: null, // 昨日新增客户数
            showData: [], // 今日放款金额和笔数
            nationMapValueData: [], // 地图数据

            titleName2: "全国交易分布情况",
            mapTradeAmountTop5: [], // 地图数据交易笔数Top5
            mapTradeValueTop5: [], // 地图数据放款金额top5

            latest7: {}, // 最近7日数据

            titleName5: "实时交易情况",

            workreallist: [], //  交易滚动数据
            originRealList: [],

            barChartData: {},

            liveData: {
                amount: "",
                address: "",
                sex: "",
                name: "",
                type: ""
            },
            prePage: '', // 上一张大屏
            nextPage: '' // 下一张大屏
        };
    },
    directives: {
        trans: { // 还不知道为什么最后一个元素会偏移, 所以就先写了个自定义指令控制位置
            inserted(el, binding, vnode, oldVnode) {
                let ele = document.getElementsByClassName('trade_count_item_data');
                if (el == ele[ele.length - 1]) {
                    let elWidth = el.offsetWidth;
                    el.style.left = '0';
                    el.style.marginRight = -elWidth / 4 + 'px'
                }
            }
        },
        animate: {
            inserted(el) {
            },
            update(el) {
                el.classList.remove('fadeOutDown');
                el.classList.add('fadeInDown');
                setTimeout(() => {
                    el.classList.remove('fadeInDown');
                    el.classList.add('fadeOutDown');
                }, 4500);
            }
        }
    },
    components: {
        'line-chart': LineChart, // 最近24小时放款金额
        'base-number': BaseNumber, // 数字样式组件
        'semicircleProgress-bar': SemicircleProgressBar, // 今日放款金额和笔数 - 仪表盘
        'china-map': ChinaMap, // 全国地图
        'bar-chart': BarChart, // 放款类型统计 - 条形进度条组件
        'area-chart': AreaChart, // 近7天的交易趋势 - 曲线图区域样式
        'realTime-list': RealTimeList, // 实时交易情况
        'live-trade-map': LiveTrapMap, // 实时交易路线地图组件
        'page-switcher': PageSwitcher, // 前进后退按钮控件
        // 'live-tip': LiveTipVue
    },
    mounted() {
        this.getMap()
        window.chartTimer.AutoRefrash = setInterval(_ => { // 每十分钟更新一次
            this.getMap()
        }, 60 * 1000 * 10);
        // this.$setCarousel('ScreenPic3')
        let curPageName = this.$route.path.replace('/', ''); // 当前路由名称
        let carouselList = JSON.parse(sessionStorage.getItem('carouselList')); // 轮播顺序(carouselList)
        let curIndex = carouselList.indexOf(curPageName);
        if (curIndex == -1) {
            return false;
        }
        else {
            if (curIndex == 0) { // 第一页
                this.$setCarousel(carouselList[1]); // 下一页为第二页
                this.nextPage = '/' + carouselList[1];
                this.prePage = '/' + carouselList[carouselList.length - 1]; // 上一页为最后一页
            }
            else if (curIndex == carouselList.length - 1) { // 最后一页
                this.$setCarousel(carouselList[0]); // 下一页为第一页
                this.nextPage = '/' + carouselList[0];
                this.prePage = '/' + carouselList[curIndex - 1];
            }
            else {
                this.$setCarousel(carouselList[curIndex + 1]); // 设置下一页
                this.nextPage = '/' + carouselList[curIndex + 1];
                this.prePage = '/' + carouselList[curIndex - 1];
            }
        }
    },
    methods: {
        getMap() {
            let staticData = JSON.parse(localStorage.getItem('screen_static_data_screen2'));
            let isUsedStaticData = JSON.parse(localStorage.getItem('screen_static_data_screen2'))._isUsed;
            if(staticData && isUsedStaticData){
                console.log('当前页面使用静态数据');
                this.totalData = staticData._data;
                this.totalTradeAmount = this.getDetails('贷款余额')
                this.totalTradeCount = this.getDetails('累计放款笔数')
                this.importNum = this.getDetails('进件数')
                this.dealNum = this.getDetails('放款数')
                this.passNum = this.getDetails('审批通过数')
                this.releaseAmountToday = this.getDetails('今日放款金额')
                this.releaseCountToday = this.getDetails('今日放款笔数')
                this.releaseAmount = this.getDetails('昨日放款金额')
                this.releaseCount = this.getDetails('昨日放款笔数')
                this.returnAmount = this.getDetails('昨日还款金额')
                this.returnCount = this.getDetails('昨日还款利息')
                this.newsBussiness = this.getDetails('总客户数')
                this.O2OBussiness = this.getDetails('昨日新增客户数')
                this.showData = [this.releaseAmountToday, this.releaseCountToday] //今日放款金额和笔数
                this.nationMapValueData = staticData._data.nationmap // 地图数据
                this.mapTradeAmountTop5 = staticData._data.nationmap.sort(this.compare("amount")).slice(-5).reverse() // 金额Top5
                this.mapTradeValueTop5 = staticData._data.nationmap.sort(this.compare("value")).slice(-5).reverse() // 笔数Top5
                this.latest24Data = this.fixedForm(staticData._data.fullDayTrade) // 最近24小时放款金额
                this.latest7 = this.fixedForm(staticData._data.latest7.reverse()) // 近7天的交易趋势
                this.barChartData = this.fixedForm(staticData._data.realeaseType) // 按放款类型统计
                this.workreallist = this.formMatList(staticData._data.realist_CY) // 实时交易情况
                this.originRealList = staticData._data.realist_CY // 实时交易数据 - 原始格式
                this.$store.commit('setAllCurrentTrade', staticData._data.realist_CY) // 将原始实时交易数据存入store中
                window.localStorage.setItem('allCurrentTrade', JSON.stringify(staticData._data.realist_CY))
            } else {
                this.$axios({
                    url: this.$http.screenpic2.url, // 本地
                    method: this.$http.screenpic2.method,
                    data: {},
                }).then(res => {
    
                    this.totalData = res.data;
    
                    this.totalTradeAmount = this.getDetails('贷款余额')
                    this.totalTradeCount = this.getDetails('累计放款笔数')
                    this.importNum = this.getDetails('进件数')
                    this.dealNum = this.getDetails('放款数')
                    this.passNum = this.getDetails('审批通过数')
                    this.releaseAmountToday = this.getDetails('昨日放款金额') // 临时改为昨日
                    this.releaseCountToday = this.getDetails('昨日放款笔数') // 临时改为昨日
                    this.releaseAmount = this.getDetails('昨日放款金额')
                    this.releaseCount = this.getDetails('昨日放款笔数')
                    this.returnAmount = this.getDetails('昨日还款金额')
                    this.returnCount = this.getDetails('昨日还款利息')
                    this.newsBussiness = this.getDetails('总客户数')
                    this.O2OBussiness = this.getDetails('昨日新增客户数')
    
                    this.showData = [this.releaseAmountToday, this.releaseCountToday] //今日放款金额和笔数
    
                    this.nationMapValueData = res.data.nationmap // 地图数据
                    this.mapTradeAmountTop5 = res.data.nationmap.sort(this.compare("amount")).slice(-5).reverse() // 金额Top5
                    this.mapTradeValueTop5 = res.data.nationmap.sort(this.compare("value")).slice(-5).reverse() // 笔数Top5
    
                    // this.latest24Data = this.fixedForm(res.data.fullDayTrade) // 最近24小时放款金额
                    this.latest24Data = this.fixedForm(this.fix24Hour(res.data.fullDayTrade)) // 最近24小时放款金额

                    this.latest7 = this.fixedForm(res.data.latest7.reverse()) // 近7天的交易趋势
                    this.barChartData = this.fixedForm(res.data.realeaseType)
    
                    if( !res.data.realist_CY || res.data.realist_CY.length==0 || res.data.realist_CY=="" || res.data.realist_CY==[]){
                        console.log('*** it`s now useing fake data !!! ***');
                        this.workreallist = ["黑龙江省哈尔滨市刘****,申请一笔【线上贷款】产品,金额 34,400 元","内蒙古省包头市何****,申请一笔【线上贷款】产品,金额 44,800 元","山西省运城市芮城县樊****,申请一笔【线上贷款】产品,金额 300,000 元","甘肃省兰州市张****,申请一笔【线上贷款】产品,金额 59,100 元","新疆省乌鲁木齐市刘****,申请一笔【线上贷款】产品,金额 54,800 元","山东省济南市周****,申请一笔【线上贷款】产品,金额 49,900 元","山西省运城市鲍****,申请一笔【线上贷款】产品,金额 150,000 元","山西省运城市万荣县牛捷**,申请一笔【线上贷款】产品,金额 249,000 元","新疆维吾尔自治区乌鲁木齐市天山区中山路479号曾传生**,申请一笔【线上贷款】产品,金额 400,000 元","山西省运城市万荣县蒋文蓄**,申请一笔【线上贷款】产品,金额 251,000 元","甘肃省兰州市周****,申请一笔【线上贷款】产品,金额 59,100 元","湖北省邯郸市孙****,申请一笔【线上贷款】产品,金额 48,000 元","上海市黄****,申请一笔【线上贷款】产品,金额 269,300 元","广东省韶关市南雄市徐****,申请一笔【线上贷款】产品,金额 200,000 元","广东省韶关市南雄市徐****,申请一笔【线上贷款】产品,金额 200,000 元"];
                        this.originRealList = [{"amount":"34400.0","address":"黑龙江省哈尔滨市","name":"刘**","type":"个人农户贷款"},{"amount":"44800.0","address":"内蒙古省包头市","name":"何**","type":"个人农户贷款"},{"amount":"300000","address":"山西省运城市芮城县","name":"樊**","type":"个人农户贷款"},{"amount":"59100.0","address":"甘肃省兰州市","name":"张**","type":"个人农户贷款"},{"amount":"54800.0","address":"新疆省乌鲁木齐市","name":"刘**","type":"个人农户贷款"},{"amount":"49900.0","address":"山东省济南市","name":"周**","type":"个人农户贷款"},{"amount":"150000","address":"山西省运城市","name":"鲍**","type":"个人农户贷款"},{"amount":"249000","address":"山西省运城市万荣县","sex":"先生","name":"牛捷","type":"个人农户贷款"},{"amount":"400000","address":"新疆维吾尔自治区乌鲁木齐市天山区中山路479号","sex":"先生","name":"曾传生","type":"个人农户贷款"},{"amount":"251000","address":"山西省运城市万荣县","sex":"先生","name":"蒋文蓄","type":"个人农户贷款"},{"amount":"59100.0","address":"甘肃省兰州市","name":"周**","type":"个人农户贷款"},{"amount":"48000.0","address":"湖北省邯郸市","name":"孙**","type":"个人农户贷款"},{"amount":"269300.0","address":"上海市","name":"黄**","type":"个人农户贷款"},{"amount":"200000","address":"广东省韶关市南雄市","sex":"先生","name":"徐**","type":"个人农户贷款"},{"amount":"200000","address":"广东省韶关市南雄市","sex":"先生","name":"徐**","type":"个人农户贷款"}];
                        this.$store.commit('setAllCurrentTrade', this.originRealList);
                        window.localStorage.setItem('allCurrentTrade', JSON.stringify(this.originRealList));
                    } else {
                        this.workreallist = this.formMatList(res.data.realist_CY) // 实时交易情况
                        this.originRealList = res.data.realist_CY
                        this.$store.commit('setAllCurrentTrade', res.data.realist_CY)
                        window.localStorage.setItem('allCurrentTrade', JSON.stringify(res.data.realist_CY))
                    }
    
                })
            }
        },
        getDetails(detail) {
            return this.totalData.dataList.filter(v => v.type == detail)
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
        // 排序
        compare(prop) {
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            }
        },
        arrDiff(arr,arr2){ // 求数组差集
            return arr2.filter(i=>{ return arr.indexOf(i)<0})
        },
        //   格式化数字
        fixedNumber(data) {
            return Number(data).toFixed(this.toFixedNum).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        },
        // 设置Top5的圆环
        getCircle() {
            let valNum = 0.8;
            $('.rank_circle').each((i, e) => {
                if ($('.rank_circle').eq(i).prev().data('count') == 0) {
                    valNum = 0
                } else {
                    valNum -= 0.15
                }
                $('.rank_circle').eq(i).circleProgress({
                    value: valNum,
                    size: 70,
                    startAngle: 0,
                    thickness: 2,
                    fill: {
                        gradient: ["#6179ff", "#8ebeff"]
                    }
                })
            })
        },
        // 格式化实时交易的List列表
        formMatList(list) {
            let workreallistdata = [];
            for (var i = 0; i < list.length; i++) {
                let a = list[i];
                let b = Number(a.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
                workreallistdata.push(a.address + a.name + "**" + "," + "申请一笔【线上贷款】产品,金额" + " " + b + " 元")
            }
            return workreallistdata;
        },
        fix24Hour(arr){ // 补全小时数据
            const range = new Array(24).fill(0).map((v, i) => {
                return `${i < 10 ? '0' + i : i}`
            })
            if(arr==""){
                return range.map((v,i)=>{
                    return {
                        "hour": v,
                        "date24": "0",
                        "date24_before": "0"
                    }
                })
            } else {
                let resArr = arr.map(v => {
                    return Number(v["hour"]) < 10 ? "0"+Number(v["hour"]) : ""+Number(v["hour"])
                })
                let leftList = this.arrDiff(resArr,range).map((v,i)=>{
                    return {
                        "hour":v,
                        "date24": "0",
                        "date24_before":"0"
                    }
                })
                let res = leftList.concat(arr).sort(this.compare("hour"));
                res.forEach(v=>{
                    v["hour"] = Number(v["hour"]) < 10 ? "0"+Number(v["hour"]) : ""+Number(v["hour"])
                })
                return res;
            }
        }
    },
    watch: {
        mapTradeValueTop5(newV, oldV) {
            setTimeout(() => {
                this.getCircle();
            }, 400);
        },
        // '$store.state.currentTrade': function (newVal) {
        //     this.liveData = newVal
        // }
    },
    beforeDestroy() {
        console.log('222---页面2销毁');
    }
}
</script>

<style lang="less">
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
        width: 100%;
        height: 90vh;
        padding: 1%;
        box-sizing: border-box;
        display: flex;
        .content-l-wrap {
            width: 30vw;
            display: flex;
            flex-direction: column;
            // background: darkkhaki;
            .content_L_wrap_item {
                width: 100%;
                height: 18vh;
                background-image: url("../../../static/images/wrap_bg3.png");
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                margin-bottom: 0.15rem;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                color: #fff;
                div.trade_amount,
                div.trade_count {
                    padding: 0 0.22rem;
                    font-size: 0.16rem;
                    div:first-child {
                        float: left;
                        width: 35%;
                    }
                    div:last-child {
                        float: right;
                        display: flex;
                        justify-content: flex-end;
                        width: 65%;
                        span:not(.dot) {
                            // border: 0.02rem solid rgb(77, 102, 200);
                            // box-shadow: rgb(77, 102, 200) 0px 0px 0.1rem inset;
                            border: 0.02rem solid rgba(65, 160, 231, 0.88);
                            box-shadow: 0px 0px 0.1rem rgba(82, 184, 226, 0.54)
                                inset;
                            padding: 0px 0.03rem;
                        }
                        span.dot {
                            transform: translateY(0.03rem);
                        }
                        span {
                            margin-left: 0.05rem;
                        }
                        i {
                            font-style: normal;
                            font-size: 0.14rem;
                            margin-left: 0.1rem;
                            transform: translateY(0.035rem);
                        }
                    }
                }
            }
            .content_L_wrap_item:first-child {
                height: 24vh;
                background-image: unset;
            }
            // 特殊
            .content_L_wrap_item:nth-child(3) {
                background-image: unset;
                display: flex;
                flex-direction: row;
                .content_left {
                    flex: 2;
                    background-image: url("../../../static/images/wrap_bg2.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    justify-content: space-evenly;
                    flex-direction: column;
                }
                .content_right {
                    flex: 1;
                    background-image: url("../../../static/images/wrap_bg1.png");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    margin-left: 0.15rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    text-align: center;
                    font-size: 0.16rem;
                    div:first-child {
                    }
                    div:last-child {
                        display: flex;
                        justify-content: space-evenly;
                        padding: 0 0.1rem;
                        span:not(.dot) {
                            // border: 0.02rem solid rgb(77, 102, 200);
                            // box-shadow: rgb(77, 102, 200) 0px 0px 0.1rem inset;
                            border: 0.02rem rgba(65, 160, 231, 0.88);
                            box-shadow: 0px 0px 0.1rem rgba(82, 184, 226, 0.54)
                                inset;
                            padding: 0px 0.03rem;
                        }
                        span.dot {
                            transform: translateY(0.03rem);
                        }
                        span {
                            margin-left: 0.03rem;
                        }
                        i {
                            font-style: normal;
                            font-size: 0.14rem;
                            margin-left: 0.05rem;
                            transform: translateY(0.035rem);
                        }
                    }
                }
            }
            .content_L_wrap_item:last-child {
                margin-bottom: 0;
                height: 40vh;
                position: relative;
                background-image: url("../../../static/images/rectangle_big.png");
                .tradeCountTop5 {
                    position: absolute;
                    z-index: 99;
                    top: 0.4rem;
                    width: 100%;
                    padding: 0 0.3rem;
                    transform: scale(0.8) translateX(-3%);
                    .trade_amount,
                    .trade_count {
                        // background: red;
                        display: flex;
                        justify-content: flex-end;
                        position: relative;
                        margin-bottom: 0.1rem;
                        padding-right: 0;
                        transform: translateX(15%);
                        span {
                            font-size: 0.16rem;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%) translateX(-60%);
                            color: #fff;
                            width: 1.1rem;
                            //   text-align: right;
                            margin-left: -5%;
                        }
                        // 交易金额
                        .trade_count_item {
                            // width: 16.66666%;
                            width: 0.65rem;
                            height: 0.65rem;
                            background-image: url("../../../static/images/circle.png");
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-position: 0 0;
                            margin-left: 0.05rem;
                            position: relative;
                            div.trade_count_item_data {
                                position: relative;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                height: 0.02rem;
                                width: 70%;
                                background-color: #6985ff;
                            }
                            div.trade_count_item_data:before,
                            div.trade_count_item_data:after {
                                position: absolute;
                                font-size: 0.12rem;
                                height: 0.14rem;
                                width: 100%;
                                color: #fff;
                                z-index: 99;
                                text-align: center;
                            }
                            div.trade_count_item_data:before {
                                content: attr(data-name);
                                top: 0.02rem;
                            }
                            div.trade_count_item_data:after {
                                content: attr(data-count);
                                top: -0.16rem;
                            }
                            .rank_circle {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 0.65rem;
                                height: 0.65rem;
                                z-index: 99;
                                canvas {
                                    position: absolute !important;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%)
                                        rotate(-90deg);
                                    transform-origin: center center;
                                }
                            }
                        }
                        .trade_count_item:last-child {
                            .trade_count_item_data {
                                transform: translateX(-50%);
                            }
                        }
                        // 交易量
                        .trande_amount_item {
                            width: 0.65rem;
                            height: 0.2rem;
                            line-height: 0.2rem;
                            text-align: center;
                            font-size: 0.12rem;
                            color: #fff;
                            margin-left: 0.15rem;
                            white-space: nowrap;
                        }
                    }
                    canvas {
                        position: absolute !important;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-90deg);
                        transform-origin: center center;
                    }
                }
            }
            // 文字右对齐
            .content_L_wrap_item.r_style_item {
                div.trade_amount,
                div.trade_count {
                    div:first-child {
                        // text-align: right;
                        white-space: nowrap;
                    }
                }
            }
        }
        .content-mid-wrap {
            width: 42vw;
            margin: 0 1%;
            display: flex;
            flex-direction: column;
            // background: salmon;
            .content-mid-wrap-t {
                // flex: 2;
                height: 30%;
                padding: 0% 0 2%;
                box-sizing: border-box;
                .content-mid-wrap-t-content {
                    width: 100%;
                    height: 100%;
                }
                // background: pink;
            }
            .content-mid-wrap-m {
                // flex: 5;
                height: 70%;
                color: #fff;
                // display: flex;
                // justify-content: space-between;
                // align-items: center;
                position: relative;
                .content-mid-wrap-m-l {
                    // background: pink;
                    width: 68%;
                    height: 100%;
                }
                .content-mid-wrap-m-r {
                    width: 30%;
                    height: 100%;
                    // background: red;
                    display: flex;
                    flex-direction: column;
                    > div {
                        flex: 1;
                        padding: 2%;
                        box-sizing: border-box;
                        > div {
                            background: url(../../../static/images/square.png)
                                no-repeat;
                            background-size: 100% 100%;
                            width: 100%;
                            height: 100%;
                            > div {
                            }
                        }
                    }
                }
                // background: red;
                .content-mid-wrap-m-title {
                    float: left;
                    width: 100%;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    text-align: center;
                    font-size: 0.2rem;
                    //   font-weight: 700;
                    background-image: url("../../../static/images/title.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
                .tradeCountTop5 {
                    position: absolute;
                    top: 0.5rem;
                    width: 100%;
                    padding: 0 0.6rem;
                    .trade_amount,
                    .trade_count {
                        // background: red;
                        display: flex;
                        justify-content: flex-end;
                        position: relative;
                        margin-bottom: 0.1rem;
                        span {
                            font-size: 0.16rem;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            color: #fff;
                            width: 1.1rem;
                            //   text-align: right;
                        }
                        // 交易金额
                        .trade_count_item {
                            // width: 16.66666%;
                            width: 0.65rem;
                            height: 0.65rem;
                            background-image: url("../../../static/images/circle.png");
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-position: 0 0;
                            margin-left: 0.15rem;
                            position: relative;
                            div.trade_count_item_data {
                                position: relative;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                height: 0.02rem;
                                width: 70%;
                                background-color: #6985ff;
                            }
                            div.trade_count_item_data:before,
                            div.trade_count_item_data:after {
                                position: absolute;
                                font-size: 0.12rem;
                                height: 0.14rem;
                                width: 100%;
                                color: #fff;
                                z-index: 99;
                                text-align: center;
                            }
                            div.trade_count_item_data:before {
                                content: attr(data-name);
                                top: 0.02rem;
                            }
                            div.trade_count_item_data:after {
                                content: attr(data-count);
                                top: -0.16rem;
                            }
                            .rank_circle {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 0.65rem;
                                height: 0.65rem;
                                z-index: 99;
                                canvas {
                                    position: absolute !important;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%)
                                        rotate(-90deg);
                                    transform-origin: center center;
                                }
                            }
                        }
                        // 交易量
                        .trande_amount_item {
                            width: 0.65rem;
                            height: 0.2rem;
                            line-height: 0.2rem;
                            text-align: center;
                            font-size: 0.12rem;
                            color: #fff;
                            margin-left: 0.15rem;
                            white-space: nowrap;
                        }
                    }
                    canvas {
                        position: absolute !important;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-90deg);
                        transform-origin: center center;
                    }
                }
                .live_tip {
                    display: flex;
                    justify-content: flex-start;
                    font-size: 25px;
                    color: #fff;
                    width: 100%;
                    position: absolute;
                    top: 65px;
                    left: 15px;
                    div > {
                        width: 7.5em;
                        p.live_tip_item {
                            position: relative;
                        }
                        .live_tip_item::after {
                            content: "·";
                            font-size: 50px;
                            position: absolute;
                            top: 50%;
                            left: -15%;
                            transform: translateY(-50%);
                        }
                        p.live_tip_content {
                            // font-size: 15px;
                            font-size: 0.15rem;
                        }
                    }
                }
            }
            .content-mid-wrap-b {
                flex: 2;
                // background: yellow;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1%;
                box-sizing: border-box;
                overflow: hidden;
                .map {
                    width: 100%;
                }
            }
        }
        .content-r-wrap {
            width: 28vw;
            display: flex;
            flex-direction: column;
            .content-r-wrap-t {
                height: 20.7692vh;
                background: url(../../../static/images/rectangle_small.png)
                    no-repeat;
                background-size: 100% 100%;
                position: relative;
                .content-r-wrap-t-title {
                    font-size: 0.2rem;
                    color: #fff;
                    width: 100%;
                    position: absolute;
                    top: 0.07rem;
                    text-align: center;
                }
            }
            .content-r-wrap-m {
                margin: 2% 0;
                height: 29.9999vh;
                background: url(../../../static/images/rectangle.png) no-repeat;
                background-size: 100% 100%;
            }
            .content-r-wrap-b {
                background: rgba(255, 104, 242, 0.376);
                // width: 28.57vw;
                // height: 38.0001vh;
                height: 60.0001vh;
                font-size: 0.14rem;
                background: url(../../../static/images/wrap_bg6.png) no-repeat;
                background-size: 100% 100%;
                text-align: center;
                position: relative;
            }
        }
    }
}
</style>
