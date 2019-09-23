<template>
  <div class="SPTcontainer">
    <div class="title">数字银行监控大屏</div>
    <div class="content">
      <!-- 左边 -->
      <div class="content-l-wrap">
        <div class="l-top">
          <div class="l-top-title top_title">
            <span>累计线上存款交易</span>
          </div>
          <count-part :iconItemData="onlineSaving"></count-part>
        </div>
        <div class="l-mid">
          <div class="top_title">
            <span>交易转化情况</span>
          </div>
          <funnel-chart :titleName="funnelTitle" :funnelData="funnelData"></funnel-chart>
        </div>
        <div class="l-bot">
          <div class="top_title">
            <span>客户交易热力图</span>
          </div>
          <!-- Top5排行 -->
          <heat-map-rank :mapData="mapDataTop5"></heat-map-rank>
          <!-- Top5排行 -->
          <heat-map :mapData="mapData"></heat-map>
        </div>
      </div>
      <!-- 中间 -->
      <div class="content-mid-wrap">
        <div class="content-mid-wrap-t">
          <div class="top_title">
            <span>购买产品实时情况</span>
          </div>
          <line-chart-mid :productRealTimeLine="productRealTimeLine"></line-chart-mid>
        </div>
        <div class="content-mid-wrap-b">
          <div class="top_title">
            <span>交易提示</span>
          </div>
          <realTime-list :reallist="workreallist"></realTime-list>
        </div>
      </div>
      <!-- 右边 -->
      <div class="content-r-wrap">
        <div class="content-mid-wrap-t">
          <div class="top_title">
            <span>累计线上存款开户情况</span>
          </div>
          <count-part :iconItemData="onlineRegister"></count-part>
        </div>
        <div class="content-mid-wrap-m">
          <div class="top_title">
            <span>各渠道交易金额</span>
          </div>
          <line-chart-right :diffTradeWayData="diffTradeWayList" :legendNames="diffTradeWayNames"></line-chart-right>
        </div>
        <div class="content-mid-wrap-b">
          <div class="top_title">
            <span>各渠道当日交易占比</span>
          </div>
          <!-- 两个饼图 -->
          <div class="content_pie_left">
            <pie-chart :pieChart="pieChartL"></pie-chart>
          </div>
          <div class="content_pie_right">
            <pie-chart :pieChart="pieChartR"></pie-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountPart from '@/components/ScreenThree/CountPart'; // 统计组件
import FunnelChart from '@/components/ScreenThree/FunnelChart'; // 交易量转话情况 - 漏斗组件
import HeatMap from '@/components/ScreenThree/HeatMap'; // 客户交易量热力图
import HeatMapRank from '@/components/ScreenThree/HeatMapRank'; // 热力图
import LineChartMid from '@/components/ScreenThree/LineChartMid'; // 购买产品实时情况 - 中间曲线图
import RealTimeList from '@/components/ScreenThree/RealTimeList'; // 中间下边实时交易
import LineChartRight from '@/components/ScreenThree/LineChartRight'; // 各个渠道交易情况 - 右边曲线图
import PieChart from '@/components/ScreenThree/CustomizedPie'; // 右下角两个饼图
export default {
  name: 'ScreenPic2',
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

      funnelTitle: '交易转话情况',

      //   饼图数据1
      pieChartL: {
        title: {
          text: '各渠道开户占比',
          top: '10%',
          left: 'left',
          // top: 20,
          textStyle: {
            color: '#fff',
            fontSize: '18%',
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '',
            center: ['35%', '68%'],
            // data: [
            //   { value: 310, name: '网银' },
            //   { value: 274, name: '柜面' },
            //   { value: 235, name: '手机' },
            //   { value: 335, name: '电话' },
            //   { value: 666, name: '微信' },
            //   { value: 400, name: '自助' }
            // ].sort(function (a, b) { return a.value - b.value; })
            data: []
          }
        ]
      },
      //   饼图数据2
      pieChartR: {
        title: {
          text: '各渠道交易占比',
          bottom: '10%',
          right: 'right',
          // top: 20,
          textStyle: {
            color: '#fff',
            fontSize: '18%',
            fontWeight: 'normal'
          }
        },
        series: [
          {
            name: '',
            center: ['65%', '35%'],
            // data: [
            //   { value: 310, name: '网银' },
            //   { value: 274, name: '柜面' },
            //   { value: 235, name: '手机' },
            //   { value: 335, name: '电话' },
            //   { value: 400, name: '自助' }
            // ].sort(function (a, b) { return a.value - b.value; })
            data: []
          }
        ]
      },

      onlineSaving: [], // 累计线上存款交易
      onlineRegister: [], //累计线上开户情况
      funnelData: [], // 漏斗图数据
      heatMapData: [], // 热数据
      productRealTimeLine: [], // 理财产品实时情况
      workreallist: [],      //实时信息数据
      diffTradeWayList: [],  // 各交易渠道金额
      diffTradeWayNames: [], // 各交易渠道名称
      mapData: [],
      mapDataTop5: []
    };
  },
  components: {
    'count-part': CountPart, // 统计组件
    'funnel-chart': FunnelChart, // 漏斗图
    'heat-map': HeatMap, // 热力图
    'heat-map-rank': HeatMapRank,
    'line-chart-mid': LineChartMid, // 购买产品实时情况
    'realTime-list': RealTimeList, // 交易提醒-
    'line-chart-right': LineChartRight, // 各个渠道交易情况
    'pie-chart': PieChart // 饼图
  },
  beforeCreate() {
    this.$axios({
        url: "./static/json/screen3.json",
        method: "get" // 本地
      //   url: "http://10.30.3.13:8081/usp_ks/tx/GYL",
    //   url: "./tx/SZYH",
    //   method: "post",
    //   data: {},
    }).then(res => {
      this.onlineSaving = res.data.iconItemData1  // 累计线上存款交易
      this.onlineRegister = res.data.iconItemData2  // 累计线上存款交易
      this.funnelData = res.data.funnelData // 漏斗图数据
      this.productRealTimeLine = this.fixedForm(res.data.dayProduct) // 理财产品实时交易
      this.workreallist = this.formMatList(res.data.realist_CY) // 实时信息数据
      this.diffTradeWayList = this.fixedForm(res.data.diffTradeWayAmount.data)  // 各交易渠道金额
      this.diffTradeWayNames = Object.values(res.data.diffTradeWayAmount.names) // 各交易渠道名称(用在右边中间提示按钮的)
      this.pieChartL.series[0].data = res.data.customPie.data1 // 饼图数据(左)
      this.pieChartR.series[0].data = res.data.customPie.data2 // 饼图数据(右)
      this.mapData = res.data.nationmap // 地图数据 - 城市的数据
      this.mapDataTop5 = res.data.nationmap.sort(this.compare("value")).reverse().slice(0, 5) // 地图数据 - 城市数据TOP5
    })

  },
  mounted() {

  },
  methods: {
    // 排序
    compare(prop) {
      return function (a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      }
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
    // 格式化实时交易的List列表
    formMatList(list) {
      let workreallistdata = [];
      for (var i = 0; i < list.length; i++) {
        let a = list[i];
        let b = Number(a.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0];
        workreallistdata.push(a.address + a.name + a.sex + "，" + "申请一笔" + a.type + "产品，金额" + " " + b + " 元")
      }
      return workreallistdata;
    }
  }
}
</script>

<style lang="less" scoped>
.top_title {
  font-size: 0.2rem;
  color: white;
  position: absolute;
  width: 100%;
  text-align: left;
  text-indent: 0.15rem;
  padding: 0.05rem 0;
  span {
  }
}
.SPTcontainer {
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
    // background: red;
    padding: 1%;
    box-sizing: border-box;
    display: flex;
    .content-l-wrap {
      flex: 2.5;
      // background: pink;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .l-top {
        flex: 1;
        margin-bottom: 0.1rem;
        background: url(../../../static/images/wrap_bg2.png) no-repeat;
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
        flex: 1.5;
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
        // flex: 2;
        height: 40%;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
    }
    .content-mid-wrap {
      flex: 3;
      margin: 0 0.1rem;
      display: flex;
      flex-direction: column;
      .content-mid-wrap-t,
      .content-mid-wrap-b {
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
        height: 60%;
        margin-bottom: 0.1rem;
      }
      .content-mid-wrap-b {
        // flex:2;
        height: 40%;
      }
    }
    .content-r-wrap {
      flex: 2.5;
      display: flex;
      flex-direction: column;
      .content-mid-wrap-t {
        flex: 1;
        margin-bottom: 0.1rem;
        background: url("../../../static/images/wrap_bg3.png") center center
          no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
      .content-mid-wrap-m {
        flex: 1.5;
        margin-bottom: 0.1rem;
        background: url("../../../static/images/wrap_bg4.png") center center
          no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
      .content-mid-wrap-b {
        // flex: 2;
        height: 40%;
        background: url("../../../static/images/wrap_bg4.png") center center
          no-repeat;
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
