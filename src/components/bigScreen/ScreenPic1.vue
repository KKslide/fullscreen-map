<template>
  <div class="SPOcontainer">
    <div class="logo"></div>
    <div class="title">{{title}}</div>
    <div class="content">
      <div class="content-l-top">
        <!-- 全国业务量情况 | 左上 -->
        <Information-display :titleName="titleName1" :informList="nationList"></Information-display>
      </div>
      <div class="content-mid-top">
        <!-- 广东业务情况 | 上中 -->
        <Information-display style="padding-left:10%;" :titleName="titleName2" :informList="localList"></Information-display>
      </div>
      <div class="content-r-top">
        <!-- 近七天放款金额趋势 | 上右 -->
        <p :style="{'font-size':'0.22rem','color':'white','margin-left':'2%'}">近七天放款金额趋势</p>
        <pictorialBar-chart v-if="workCrightData.dataX.length&&workCrightData.data1.length" :crightData="workCrightData"></pictorialBar-chart>
      </div>
      <div class="content-l-bot">
        <!-- 全国交易量情况 | 中国地图  -->
        <div class="trade_rank">
          <p class="rank_title">全国交易量情况</p>
          <!-- 交易金额top5 -->
          <div class="trade_count">
            <span>金额Top5(万元)</span>
            <div class="trade_count_item" v-for="(item,index) in nationTradeValueTop5" :key="index">
              <div class="trade_count_item_data" :data-name="item.type" :data-count="parseInt(item.value)"></div>
              <div class="circle L"></div>
            </div>
          </div>
          <!-- 交易笔数top5 -->
          <div class="trade_amount">
            <span>交易量Top5</span>
            <div class="trande_amount_item" v-for="(item,index) in nationTradeAmountTop5" :key="index">{{item.type}}{{fixedNumber(item.amount)}}笔</div>
          </div>
        </div>
        <china-map :nationMapValueData="nationMapValueData" :titleName="titleName3"></china-map>
      </div>
      <div class="content-mid-bot">
        <!-- 广东交易量情况 | 广东地图  -->
        <div class="trade_rank">
          <p class="rank_title">全国实时交易分布情况</p>
          <!-- 交易金额top5 -->
          <div class="trade_count" v-if="false">
            <span>金额Top5(万元)</span>
            <div class="trade_count_item" v-for="(item,index) in GDTadeValueTop5" :key="index">
              <div class="trade_count_item_data" :data-name="item.name" :data-count="parseInt(item.value)"></div>
              <div class="circle R"></div>
            </div>
          </div>
          <!-- 交易笔数top5 -->
          <div class="trade_amount" v-if="false">
            <span>交易量Top5</span>
            <div class="trande_amount_item" v-for="(item,index) in GDTadeAmountTop5" :key="index">{{item.name}}{{fixedNumber(item.amount)}}笔</div>
          </div>
        </div>
        <!-- <div class="live_tip">
                    <div class="live_tip_addr">
                        <p class="live_tip_item">地点</p>
                        <p class="live_tip_content animated" v-animate v-text="liveData.address"></p>
                    </div>
                    <div class="live_tip_name">
                        <p class="live_tip_item">客户</p>
                        <p
                            class="live_tip_content animated"
                            v-animate
                            v-text="liveData.name+liveData.sex"
                        ></p>
                    </div>
                    <div class="live_tip_type">
                        <p class="live_tip_item">产品</p>
                        <p class="live_tip_content animated" v-animate v-text="liveData.type"></p>
                    </div>
                    <div class="live_tip_amount">
                        <p class="live_tip_item">金额</p>
                        <p class="live_tip_content animated" v-animate v-text="liveData.amount+'元'"></p>
                    </div>
                </div>-->
        <!-- <live-tip :position="{'top':'65px'}"></live-tip> -->
        <live-trade-map :position="{'top':'15%','bottom':'8%'}"></live-trade-map>
        <!-- <GD-map :titleName="titleName4" :localMapValueData="localMapValueData"></GD-map> -->
      </div>
      <div class="content-r-bot">
        <!-- 实时交易情况 | 右下 -->
        <realTime-list :titleName="titleName" :reallist="workreallist" :originList="originRealList"></realTime-list>
      </div>
    </div>
    <!-- <page-switcher :prePagePath="'/screenpic5'" :nextPagePath="'/screenpic2'"></page-switcher> -->
    <page-switcher :prePagePath="prePage" :nextPagePath="nextPage"></page-switcher>
  </div>
</template>
<script>
import RealTimeList from '@/components/ScreenOne/RealTimeList' // 实时交易情况
import PictorialBarChart from '@/components/ScreenOne/PictorialBarChart' // 近七天放款金额趋势
import InformationDisplay from '@/components/ScreenOne/InformationDisplay' // 广东业务情况/全国交易情况
import ChinaMap from '@/components/ScreenOne/ChinaMap' // 全国地图
// import GDMap from '@/components/ScreenOne/GDMap' // 广东地图
import LiveTrapMap from '@/components/publicComponent/LiveTrapMap' // 新增的实时交易路线地图组件
import PageSwitcher from '@/components/publicComponent/PageSwitch' // 前进后退按钮控件
// import LiveTipVue from '../publicComponent/LiveTip.vue';
export default {
  name: 'ScreenPic1',
  data() {
    return {
      //近7天的交易趋势数据,
      workCrightData: {
        dataX: [],
        data1: [],
      },

      worklist: [],

      titleName: '实时交易情况',
      //实时信息数据
      workreallist: [],
      originRealList: [],

      titleName1: '全国业务情况',
      nationList: [],

      titleName2: '广东业务情况',
      localList: [],

      titleName3: '全国交易量情况（单位：笔数）',

      nationMapValueData: [],

      nationTradeAmountTop5: [], // 全国交易笔数Top5
      nationTradeValueTop5: [], // 全国交易金额Top5
      GDTadeAmountTop5: [], // 广东交易笔数Top5
      GDTadeValueTop5: [], // 广东交易金额Top5

      titleName4: '广东省交易量情况（单位：笔数）',
      // localMapValueData: [],

      title: "温氏物联网金融",
      liveData: {
        amount: "",
        address: "",
        sex: "",
        name: "",
        type: ""
      },
      prePage:'', // 上一张大屏
      nextPage:'' // 下一张大屏
    };
  },
  components: {
    'realTime-list': RealTimeList, // 实时交易情况
    'pictorialBar-chart': PictorialBarChart, // 近七天放款金额趋势
    'Information-display': InformationDisplay, // 广东业务情况/全国交易情况
    'china-map': ChinaMap, // 全国地图
    // 'GD-map': GDMap, // 广东地图
    'live-trade-map': LiveTrapMap, // 实时交易路线地图组件
    'page-switcher': PageSwitcher, // 前进后退按钮控件
    // 'live-tip': LiveTipVue
  },
  methods: {
    // 格式化数字
    fixedNumber(num) {
      return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
    },
    // 排序
    compare(prop) {
      return function(a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      }
    },
    getData() { // 获取数据
      let staticData = JSON.parse(localStorage.getItem('screen_static_data_screen1'));
      let isUsedStaticData = staticData!=null?JSON.parse(localStorage.getItem('screen_static_data_screen1'))._isUsed:"";
      if(staticData && isUsedStaticData){
        console.log('当前页面使用静态数据');
        var workdataX = [];
        var workdata1 = [];
        var workreallistdata = [];
        for (var i = 0; i < staticData._data["7day_CY"].length; i++) {
            workdataX.push(staticData._data["7day_CY"][i].date);
            workdata1.push(staticData._data["7day_CY"][i].amount);
        }
        this.workCrightData.dataX = workdataX.reverse();
        this.workCrightData.data1 = workdata1.reverse();
        this.nationMapValueData = staticData._data.nationmap;
        // 全国交易笔数前五名
        this.nationTradeAmountTop5 = this.nationMapValueData.sort(this.compare("amount")).slice(-5).reverse()
        // 全国交易金额前五名
        this.nationTradeValueTop5 = this.nationMapValueData.sort(this.compare("value")).slice(-5).reverse()
        this.worklist = staticData._data.list_CY
        this.nationList = staticData._data.nationList // 全国地图数据
        this.localList = staticData._data.localList // 广东地图数据
        this.originRealList = staticData._data.realist_CY; // 实时交易原始数据格式
        for (var i = 0; i < staticData._data.realist_CY.length; i++) {
            var a = staticData._data.realist_CY[i];
            var b = Number(a.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
            workreallistdata.push(a.address + a.name.slice(0,2) + /* a.sex */ "**" + "，" + "申请一笔【" + a.type + "】产品，金额" + " " + b + " 元")
        }
        this.workreallist = workreallistdata
        this.$store.commit('setAllCurrentTrade', staticData._data.realist_CY)
        window.localStorage.setItem('allCurrentTrade', JSON.stringify(staticData._data.realist_CY))
      } else {
        this.$axios({
          url: this.$http.screenpic1.url, // 本地
          method: this.$http.screenpic1.method,
          data: {},
  
          // url: "http://10.30.80.71:8100/usp_ks/tx/GYL",
          // url: "./tx/GYL",
          // method: "post",
          // data: {},
        }).then(res => {
  
          var workdataX = [];
          var workdata1 = [];
  
          var workreallistdata = [];
  
          for (var i = 0; i < res.data["7day_CY"].length; i++) {
            workdataX.push(res.data["7day_CY"][i].date);
            workdata1.push(res.data["7day_CY"][i].amount);
          }
  
          this.workCrightData.dataX = workdataX.reverse();
          this.workCrightData.data1 = workdata1.reverse();
  
          this.nationMapValueData = res.data.nationmap;
  
          // this.localMapValueData = res.data.localmap
  
          // 全国交易笔数前五名
          this.nationTradeAmountTop5 = this.nationMapValueData.sort(this.compare("amount")).slice(-5).reverse()
          // 全国交易金额前五名
          this.nationTradeValueTop5 = this.nationMapValueData.sort(this.compare("value")).slice(-5).reverse()
  
          // 广东交易笔数前五名
          // this.GDTadeAmountTop5 = this.localMapValueData.sort(this.compare("amount")).slice(-5).reverse()
          // 广东交易金额前五名
          // this.GDTadeValueTop5 = this.localMapValueData.sort(this.compare("value")).slice(-5).reverse()
  
          this.worklist = res.data.list_CY
  
          this.nationList = res.data.nationList // 全国地图数据
  
          this.localList = res.data.localList // 广东地图数据
  
          if( !res.data.realist_CY || res.data.realist_CY.length==0 || res.data.realist_CY=="" || res.data.realist_CY==[]){
              console.log('*** it`s now useing fake data !!! ***');
              this.workreallist = ["山西省运城市万荣县牛**，申请一笔【个人农户贷款】产品，金额 251,000 元","山西省运城市万荣县牛**，申请一笔【个人农户贷款】产品，金额 249,000 元","新疆维吾尔自治区乌鲁木齐市天山区中山路479号曾**，申请一笔【个人农户贷款】产品，金额 400,000 元","山西省运城市万荣**，申请一笔【个人农户贷款】产品，金额 251,000 元","江西省赣州市大余县刘**，申请一笔【个人农户贷款】产品，金额 250,000 元","山西省运城市万荣县蒋**，申请一笔【个人农户贷款】产品，金额 249,000 元","新疆维吾尔自治区乌鲁木齐市天山区中山路479号曾**，申请一笔【个人农户贷款】产品，金额 400,000 元","广东省清远市清新区冯**，申请一笔【个人农户贷款】产品，金额 200,000 元","北京市北京市东城区前门大街1号刘波**，申请一笔【个人农户贷款】产品，金额 475,000 元","新疆维吾尔自治区乌鲁木齐市天山区中山路479号曾**，申请一笔【个人农户贷款】产品，金额 400,000 元","江苏省南京市曾**，申请一笔【个人农户贷款】产品，金额 500,000 元","上海市曾**，申请一笔【个人农户贷款】产品，金额 500,000 元"];
              this.originRealList = [{"amount":"251000","address":"山西省运城市万荣县","sex":"先生","name":"牛捷","type":"个人农户贷款"},{"amount":"249000","address":"山西省运城市万荣县","sex":"先生","name":"牛捷","type":"个人农户贷款"},{"amount":"400000","address":"新疆维吾尔自治区乌鲁木齐市天山区中山路479号","sex":"先生","name":"曾传生","type":"个人农户贷款"},{"amount":"251000","address":"山西省运城市万荣县","sex":"先生","name":"蒋文蓄","type":"个人农户贷款"},{"amount":"250000","address":"江西省赣州市大余县","sex":"先生","name":"刘军","type":"个人农户贷款"},{"amount":"249000","address":"山西省运城市万荣县","sex":"先生","name":"蒋文蓄","type":"个人农户贷款"},{"amount":"400000","address":"新疆维吾尔自治区乌鲁木齐市天山区中山路479号","sex":"先生","name":"曾传生","type":"个人农户贷款"},{"amount":"200000","address":"广东省清远市清新区","sex":"先生","name":"冯贤峰","type":"个人农户贷款"},{"amount":"475000","address":"北京市北京市东城区前门大街1号","sex":"先生","name":"刘波","type":"个人农户贷款"},{"amount":"400000","address":"新疆维吾尔自治区乌鲁木齐市天山区中山路479号","sex":"先生","name":"曾传生","type":"个人农户贷款"},{"amount":"500000","address":"江苏省南京市","sex":"女士","name":"曾焕芬","type":"个人农户贷款"},{"amount":"500000","address":"上海市","sex":"女士","name":"曾焕芬","type":"个人农户贷款"}];
              this.$store.commit('setAllCurrentTrade', this.originRealList);
              window.localStorage.setItem('allCurrentTrade', JSON.stringify(this.originRealList));
          } else {
              this.originRealList = res.data.realist_CY; // 实时交易原始数据格式
  
              for (var i = 0; i < res.data.realist_CY.length; i++) {
                var a = res.data.realist_CY[i];
                var b = Number(a.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
                workreallistdata.push(a.address + a.name + /* a.sex */ "**" + "，" + "申请一笔【" + a.type + "】产品，金额" + " " + b + " 元")
              }
  
              this.workreallist = workreallistdata
  
              this.$store.commit('setAllCurrentTrade', res.data.realist_CY)
              window.localStorage.setItem('allCurrentTrade', JSON.stringify(res.data.realist_CY))
          }
  
        }).catch(err => {
          console.log(err);
        })
      }
    },
    getCircle() { // 启动圆环排名的圆环插件
      var timer = setInterval(() => {
        if ($(".circle").length >= 0) clearInterval(timer);
        var valNumL = 0.9;
        var valNumR = 0.8;
        $(".circle.L").each((i, e) => {
          if ($('.circle.L').eq(i).prev().data('count') == 0) {
            valNumL = 0
          } else {
            valNumL -= 0.15
          }
          $('.circle.L').eq(i).circleProgress({
            value: valNumL,
            size: 70,
            startAngle: 0,
            thickness: 2,
            fill: {
              gradient: ["#6179ff", "#8ebeff"]
            }
          });
          if ($('.circle.R').eq(i).prev().data('count') == 0) {
            valNumR = 0
          } else {
            valNumR -= 0.15
          }
          $('.circle.R').eq(i).circleProgress({
            value: valNumR,
            size: 70,
            startAngle: 0,
            thickness: 2,
            fill: {
              gradient: ["#6179ff", "#8ebeff"]
            }
          });
        })
      }, 1000);
    },
    setRegularTime(targetHour, targetMinute) { // 每日固定时间刷新
      var timeInterval, nowTime, nowSeconds, targetSeconds

      nowTime = new Date()
      // 计算当前时间的秒数
      nowSeconds = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds()

      // 计算目标时间对应的秒数
      targetSeconds = targetHour * 3600 + targetMinute * 60

      //  判断是否已超过今日目标小时，若超过，时间间隔设置为距离明天目标小时的距离
      timeInterval = targetSeconds > nowSeconds ? targetSeconds - nowSeconds : targetSeconds + 24 * 3600 - nowSeconds

      setTimeout(this.getDataByAlarm, timeInterval * 1000)
    },
    getDataByAlarm() { // 每日刷新数据递归
      this.getData()
      this.getCircle()
      setTimeout(this.getDataByAlarm, 24 * 3600 * 1000) //之后每天调用一次
    },
    setCarousel() {
      let timer = parseInt(sessionStorage.getItem('timer'));
      if (timer) {
        setTimeout(() => {
          this.$router.push({ name: 'ScreenPic2' })
        }, 5 * 1000);
      }
    }
  },
  mounted() {
    this.getData()
    this.getCircle()
    // this.setRegularTime(8, 0) // 启动闹钟
    window.chartTimer.screenAutoRefrash = setInterval(_ => { // 每十分钟更新一次
      this.getData()
    }, 60 * 1000 * 10);
    // this.$setCarousel('ScreenPic2')
    /* *************************************************************** */
    /**
     * 获取当前路由名称(或者当前组件名称)
     * 从sessionStorage获取轮播顺序(carouselList)
     * 判断当前组件名称是否在轮播顺序内
     * 没有：不设置轮播或上一页下一页
     * 有：判断第几页
     * 第一页- 上一页为最后一页
     * 最后页- 下一页为第一页
     */
    /* *************************************************************** */
    let curPageName = this.$route.path.replace('/',''); // 当前路由名称
    let carouselList = JSON.parse(sessionStorage.getItem('carouselList')); // 轮播顺序(carouselList)
    let curIndex = carouselList.indexOf(curPageName);
    if(curIndex == -1){
        return false;
    }else{
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
  directives: {
    animate: {
      inserted(el) {},
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
  watch: {
    '$store.state.currentTrade': function(newVal) {
      this.liveData = newVal
    }
  },
  beforeDestroy() {
    console.log('111---页面1销毁');
  }
}

</script>
<style lang="less">
.SPOcontainer {
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
    // line-height: 1.05rem;
  }

  .content {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0 !important;

    .content-l-top {
      // background: red;
      width: 30%;
      height: 32vh;
    }

    .content-mid-top {
      // background: blue;
      width: 40%;
      height: 32vh;
    }

    .content-r-top {
      // background: yellow;
      width: 30%;
      height: 32vh;
    }

    .content-l-bot {
      // background: pink;
      width: 35%;
      height: 58vh;
    }

    .content-mid-bot {
      // background: green;
      width: 35%;
      height: 58vh;
    }

    .content-r-bot {
      // background: orange;
      width: 30%;
    }

    // 加上rank排名后
    .content-l-bot,
    .content-mid-bot {
      height: 55vh;
      position: relative;

      .trade_rank {
        position: absolute;
        top: 2%;
        left: 2%;
        width: 95%;
        z-index: 99;

        .rank_title {
          font-size: 0.22rem;
          color: #fff;
          margin-bottom: 0.15rem;
        }

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

            .circle {
              position: absolute;
              top: 0;
              left: 0;
              width: 0.65rem;
              height: 0.65rem;

              canvas {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-90deg);
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
      }

      /* .live_tip {
                display: flex;
                justify-content: flex-start;
                font-size: 25px;
                color: #fff;
                width: 100%;
                position: absolute;
                top: 65px;
                left: 15px;
                div > {
                    width: 5.5em;
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
                        font-size: 15px;
                    }
                }
            } */
    }
  }

  /*  .page_nav {
        position: absolute;
        width: 15%;
        height: 100%;
        top: 0;
        z-index: 9999;
    }
    .page_pre {
        left: 0;
    }
    .page_pre:hover {
        background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.5)
        );
    }
    .page_next {
        right: 0;
    }
    .page_next:hover {
        background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.5)
        );
    } */
}

</style>
