<template>
  <div class="SPOcontainer">
    <div class="title">{{title}}</div>

    <div class="content">
      <div class="content-l-top">
        <!-- 全国业务量情况 | 左上 -->
        <Information-display
          :childClass="childClass1"
          :titleName="titleName1"
          :informList="nationList"
        ></Information-display>
      </div>
      <div class="content-mid-top">
        <!-- 广东业务情况 | 上中 -->
        <Information-display
          style="padding-left:10%;"
          :childClass="childClass1"
          :titleName="titleName2"
          :informList="localList"
        ></Information-display>
      </div>
      <div class="content-r-top">
        <!-- <p :style="{'font-size':'0.22rem','color':'white','margin-left':'2%'}">近一个月交易量趋势（单位：万元）</p> -->
        <p :style="{'font-size':'0.22rem','color':'white','margin-left':'2%'}">近七天放款金额趋势</p>
        <pictorialBar-chart :childClass="childClass1"  v-if="workCrightData.dataX.length&&workCrightData.data1.length"  :crightData="workCrightData"></pictorialBar-chart>
      </div>
      <div class="content-l-bot">
        <!-- 全国交易量情况 | 中国地图  -->
        <div class="trade_rank">
          <p class="rank_title">全国交易量情况</p>
          <!-- 交易金额top5 -->
          <div class="trade_count">
            <span>金额Top5</span>
            <div class="trade_count_item" v-for="(item,index) in nationTradeValueTop5" :key="index">
              <div class="trade_count_item_data" :data-name="item.type" :data-count="item.value"></div>
              <div class="circle L"></div>
            </div>
            <!-- <div class="trade_count_item">
              <div class="trade_count_item_data" data-name="北京" data-count="12300"></div>
              <div class="circle"></div>
            </div>
            <div class="trade_count_item">
              <div class="trade_count_item_data" data-name="上海" data-count="12300"></div>
            </div>
            <div class="trade_count_item">
              <div class="trade_count_item_data" data-name="广州" data-count="12300"></div>
            </div>
            <div class="trade_count_item">
              <div class="trade_count_item_data" data-name="深圳" data-count="12300"></div>
            </div>
            <div class="trade_count_item">
              <div class="trade_count_item_data" data-name="杭州" data-count="12300"></div>
            </div>-->
          </div>
          <!-- 交易笔数top5 -->
          <div class="trade_amount">
            <span>交易量Top5</span>
            <!-- <div class="trande_amount_item">北京1111笔</div>
			<div class="trande_amount_item"></div>
			<div class="trande_amount_item"></div>
			<div class="trande_amount_item"></div>
            <div class="trande_amount_item"></div>-->
            <div
              class="trande_amount_item"
              v-for="(item,index) in nationTradeAmountTop5"
              :key="index"
            >{{item.type}}{{fixedNumber(item.amount)}}笔</div>
          </div>
        </div>
        <china-map
          :childClass="childClass3"
          :nationMapValueData="nationMapValueData"
          :titleName="titleName3"
        ></china-map>
      </div>
      <div class="content-mid-bot">
        <!-- 广东交易量情况 | 广东地图  -->
        <div class="trade_rank">
          <p class="rank_title">广东省交易量情况</p>
          <!-- 交易金额top5 -->
          <div class="trade_count">
            <span>金额Top5</span>
            <div class="trade_count_item" v-for="(item,index) in GDTadeValueTop5" :key="index">
              <div class="trade_count_item_data" :data-name="item.name" :data-count="item.value"></div>
              <div class="circle R"></div>
            </div>
            <!-- <div class="trade_count_item">
              <div class="trade_count_item_data" data-name="北京" data-count="12300"></div>
              <div class="circle"></div>
            </div>
            <div class="trade_count_item">
              <div class="circle"></div>
              <div class="trade_count_item_data" data-name="上海" data-count="12300"></div>
            </div>
            <div class="trade_count_item">
              <div class="circle"></div>
              <div class="trade_count_item_data" data-name="广州" data-count="12300"></div>
            </div>
            <div class="trade_count_item">
              <div class="circle"></div>
              <div class="trade_count_item_data" data-name="深圳" data-count="12300"></div>
            </div>
            <div class="trade_count_item">
              <div class="circle"></div>
              <div class="trade_count_item_data" data-name="杭州" data-count="12300"></div>
            </div>-->
          </div>
          <!-- 交易笔数top5 -->
          <div class="trade_amount">
            <span>交易量Top5</span>
            <!-- <div class="trande_amount_item">北京1111笔</div>
			<div class="trande_amount_item"></div>
			<div class="trande_amount_item"></div>
			<div class="trande_amount_item"></div>
            <div class="trande_amount_item"></div>-->
            <div
              class="trande_amount_item"
              v-for="(item,index) in GDTadeAmountTop5"
              :key="index"
            >{{item.name}}{{fixedNumber(item.amount)}}笔</div>
          </div>
        </div>
        <GD-map :titleName="titleName4" :localMapValueData="localMapValueData"></GD-map>
      </div>
      <div class="content-r-bot">
        <realTime-list :childClass="childClass2" :titleName="titleName" :reallist="workreallist"></realTime-list>
      </div>
    </div>
  </div>
</template>
<script>
import RealTimeList from '@/components/ScreenOne/RealTimeList';
import PictorialBarChart from '@/components/ScreenOne/PictorialBarChart'
import InformationDisplay from '@/components/ScreenOne/InformationDisplay'
import ChinaMap from '@/components/ScreenOne/ChinaMap';
import GDMap from '@/components/ScreenOne/GDMap';
export default {
  name: 'ScreenPic1',
  data() {
    return {
      childClass1: {
        width: '100%',
        // height: '10vh'
      },
      childClass2: {
        width: '100%',
        // height: '50vh'
      },
      childClass3: {
        width: '100%',
        // height: '50vh'
      },

      //近7天的交易趋势数据,
      workCrightData: {
        dataX: [],
        data1: [],
      },
      //进度条数据(创业贷)

      worklist: [],

      titleName: '实时交易情况',
      //实时信息数据
      workreallist: [],

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
      localMapValueData: [],

      title: "温氏物联网金融",

    };
  },
  methods: {
    // 格式化数字
    fixedNumber(num) {
      return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
    },
    // 排序
    compare(prop) {
      return function (a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      }
    },
    getData() {
      this.$axios({
        url: "./static/json/cc.json",
        method: "get",
        // url:"http://10.30.3.13:8081/usp_ks/tx/GYL",
        // url:"./tx/GYL",
        // method:"post",
        // data:{},
      }).then(res => {

        var workdataX = [];
        var workdata1 = [];

        var workreallistdata = [];


        for (var i = 0; i < res.data["7day_CY"].length; i++) {
          workdataX.push(res.data["7day_CY"][i].date);
          workdata1.push(res.data["7day_CY"][i].amount);
        }

        this.workCrightData.dataX = workdataX
        this.workCrightData.data1 = workdata1
      
       console.log(this.workCrightData)

        this.nationMapValueData = res.data.nationmap;

        this.localMapValueData = res.data.localmap

        // 全国交易笔数前五名
        this.nationTradeAmountTop5 = this.nationMapValueData.sort(this.compare("amount")).slice(-5).reverse()
        // 全国交易金额前五名
        this.nationTradeValueTop5 = this.nationMapValueData.sort(this.compare("value")).slice(-5).reverse()

        // 广东交易笔数前五名
        this.GDTadeAmountTop5 = this.localMapValueData.sort(this.compare("amount")).slice(-5).reverse()
        // 广东交易金额前五名
        this.GDTadeValueTop5 = this.localMapValueData.sort(this.compare("value")).slice(-5).reverse()


        this.worklist = res.data.list_CY

        this.nationList = res.data.nationList

        this.localList = res.data.localList

        for (var i = 0; i < res.data.realist_CY.length; i++) {
          var a = res.data.realist_CY[i];
          var b = Number(a.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
          workreallistdata.push(a.address + a.name + a.sex + "，" + "申请一笔" + a.type + "产品，金额" + " " + b + " 元")
        }

        this.workreallist = workreallistdata

      }).catch(res => {

      })
    },

    getCircle() {
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
    }
  },
  components: {
    'realTime-list': RealTimeList,
    'pictorialBar-chart': PictorialBarChart,
    'Information-display': InformationDisplay,
    'china-map': ChinaMap,
    'GD-map': GDMap,
  },
  mounted() {

    this.getData()
    
    setInterval(() => {
      this.getData()
    }, 30000)

    this.getCircle()
  }
}
</script>

<style lang="less">
.SPOcontainer {
  width: 100%;
  height: 100vh;
  background: url(../../../static/images/bg.png);
  background-size: 100% 100%;
  overflow: hidden;
  box-sizing: border-box;
  .title {
    background: url(../../../static/images/top1.png) no-repeat;
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
      height: 32vh !important;
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
          }
        }
      }
    }
  }
}
</style>
