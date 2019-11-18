<template>
  <div class="SPTcontainer">
    <div class="logo"></div>
    <div class="title">数字银行监控大屏</div>
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
            <span>近七日交易量走势</span>
          </div>
          <line-chart :sevenDayTradeTendency="sevenDayTradeTendency"></line-chart>
        </div>
        <div class="content-mid-wrap-b">
          <div class="top_title">
            <span>近七日线上开户走势</span>
          </div>
          <tendency-chart :sevenDayOpenAccountTendency="sevenDayOpenAccountTendency"></tendency-chart>
        </div>
      </div>
      <!-- 右边 -->
      <div class="content-r-wrap">
        <div class="content-mid-wrap-t">
          <div class="top_title">
            <span>今日线上存款实时情况</span>
          </div>
          <line-chart-right :productRealTimeLine="productRealTimeLine"></line-chart-right>
        </div>
        <div class="content-mid-wrap-b">
          <div class="top_title">
            <span>最新存款动态</span>
          </div>
          <realTime-list :reallist="workreallist"></realTime-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountPart from '@/components/ScreenThree/CountPart'; // 统计组件
import HeatMap from '@/components/ScreenThree/HeatMap'; // 客户交易量热力图
import HeatMapRank from '@/components/ScreenThree/HeatMapRank'; // 热力图
import LineChartRight from '@/components/ScreenThree/LineChartRight'; // 购买产品实时情况 - 中间曲线图
import RealTimeList from '@/components/ScreenThree/RealTimeList'; // 中间下边实时交易

import LineChart from '@/components/ScreenThree/LineChart'; // 近七日交易量走势
import Tendency from '@/components/ScreenThree/Tendency'; // 近七日线上开户走势
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

      onlineSaving: [], // 累计线上存款交易
      heatMapData: [], // 热数据
      productRealTimeLine: [], // 理财产品实时情况
      workreallist: [],      //实时信息数据
      mapData: [], // 热例如数据
      mapDataTop5: [],

      sevenDayTradeTendency: [], // 近七日交易量走势
      sevenDayOpenAccountTendency: [] // 近七日线上开户走势
    };
  },
  components: {
    'count-part': CountPart, // 统计组件
    'heat-map': HeatMap, // 热力图
    'heat-map-rank': HeatMapRank,
    'line-chart-right': LineChartRight, // 购买产品实时情况
    'realTime-list': RealTimeList, // 交易提醒-

    'line-chart': LineChart,
    'tendency-chart': Tendency
  },
  beforeCreate() {
    this.$axios({
      url: "./static/json/screen3.json",
      method: "get" // 本地

      //   url: "./tx/SZYH",
      //   method: "post",
      //   data: {},
    }).then(res => {
      this.onlineSaving = res.data.iconItemData1  // 累计线上存款交易
      this.productRealTimeLine = this.fixedForm(res.data.dayProduct) // 24小时数据
      this.workreallist = this.formMatList(res.data.realist_CY) // 实时信息数据
      this.mapData = res.data.nationmap // 地图数据 - 城市的数据
      this.mapDataTop5 = res.data.nationmap.sort(this.compare("amount")).reverse().slice(0, 5) // 地图数据 - 城市数据TOP5

      this.sevenDayTradeTendency = this.fixedForm(res.data.sevenDayTradeTendency) // 近七日交易量走势
      this.sevenDayOpenAccountTendency = this.fixedForm(res.data.sevenDayOpenAccountTendency) // 近七日线上开户走势
    })

  },
  methods: {
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
        workreallistdata.push(a.address + a.name + /* a.sex */"**" + "，" + "存入一笔【线上存款】产品，金额" + " " + b + " 元")
      }
      return workreallistdata;
    },
    filterNotZero(arr) {
      var newArr = arr.filter((v, i, arr) => {
        return Math.round(Number(v.value)) > 0
      })
      return newArr.length == 0 ? arr : newArr;
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
}
.SPTcontainer {
  width: 100%;
  height: 100vh;
  background: url(../../../static/images/bg.jpg);
  background-size: 100% 100%;
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
      width: 33.3333vw;
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
        width: 33.3333vw;
        height: 40%;
        overflow: hidden;
      }
    }
    .content-r-wrap {
      width: 33.3333vw;
      display: flex;
      flex-direction: column;
      .content-mid-wrap-t {
        height: 42vh;
        margin-bottom: 0.1rem;
        background: url("../../../static/images/wrap_bg4.png") center center
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
        width: 33.3333vw;
        height: 48vh;
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
