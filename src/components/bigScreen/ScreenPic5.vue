<template>
  <div class="SPOcontainer">
    <div class="title">{{title}}</div>
    <div class="content">
      <div class="content-top">
        <div class="content-l-top">
          <!-- 每天每个小时失败交易量 -->
          <div class="content_title" v-html="title1"></div>
          <pictprial-bar-chart :crightData="workCrightData"></pictprial-bar-chart>
        </div>
        <div class="content-mid-top">
          <div class="content-mid-top-up">
            <!-- 当天交易量 -->
            <div class="content_title" v-html="title2"></div>
            <count-part :title="title2" :iconItemData="iconItemData"></count-part>
          </div>
          <div class="content-mid-top-down">
            <!-- 当天失败交易量 -->
            <div class="content_title" v-html="title3"></div>
            <day-trade-count :title="title3"></day-trade-count>
          </div>
        </div>
        <div class="content-r-top">
          <!-- 当天失败交易类型排名 -->
          <div class="content_title" v-html="title4"></div>
          <fail-trade-rank :title="title4"></fail-trade-rank>
        </div>
      </div>

      <div class="content-bot">
        <div class="content-l-bot">
          <!-- 当天未成功交易原因排名 -->
          <div class="content_title" v-html="title5"></div>
          <fail-reason-rank></fail-reason-rank>
        </div>
        <div class="content-mid-bot">
          <!-- 当天失败交易渠道排名 -->
          <div class="content_title" v-html="title6"></div>
          <fail-trade-way-rank></fail-trade-way-rank>
        </div>
        <div class="content-r-bot">
          <!-- 当天机构失败交易量排名 -->
          <div class="content_title" v-html="title7"></div>
          <fail-org-rank></fail-org-rank>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictorialBarChart from '../ScreenFive/PictorialBarChart' // 左上角柱状图
import CountPart from '../ScreenFive/CountPart' // 中间上边 - 当天交易量
import DayTradeCount from '../ScreenFive/BarChart' // 右上组件 - 当天失败交易量
import FailTradeRank from '../ScreenFive/FailTradeRank' // 右上组件 - 当天失败交易类型排名
import FailReasonRank from '../ScreenFive/FailReasonRank' // 当天未成功交易原因排名
import FailTradeWayRank from '../ScreenFive/FailTradeWayRank' // 当天失败交易渠道排名
import FailOrgRank from '../ScreenFive/FailOrgRank' // 当天机构失败交易量排名
export default {
  components: {
    'pictprial-bar-chart': PictorialBarChart, // 左上角柱状图
    'count-part': CountPart, // 当天交易量
    'day-trade-count': DayTradeCount, // 当天失败交易量
    'fail-trade-rank': FailTradeRank, // 当天失败交易类型排名
    'fail-reason-rank': FailReasonRank, // 当天未成功交易原因排名
    'fail-trade-way-rank': FailTradeWayRank, // 当天失败交易渠道排名
    'fail-org-rank': FailOrgRank, // 当天机构失败交易量排名
  },
  data() {
    return {
      title: '未成功交易监控',
      title1: '每天每个小时失败交易量',
      title2: '当天交易量',
      title3: '当天失败交易量',
      title4: '当天失败交易类型排名',
      title5: '当天未成功交易原因排名',
      title6: '当天失败交易渠道排名',
      title7: '当天机构失败交易量排名',
      //当天每个小时交易量
      workCrightData: {
        dataX: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
        data2: [616, 874, 530, 310, 646, 173, 725, 247, 700, 112, 113, 140, 276, 707, 434, 444, 566, 322, 27, 409, 148, 556, 616, 505]
      },
      showData: [133456.696, 133456.696],
      //总贷款余额,总客户数比例
      midData: [0.5, 0.8],
      //   每小时交易量
      oneHourData: {
        dataX: ['10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '10:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620],
        data2: [620, 782, 491, 820, 332, 1101, 966, 734, 1650, 520, 1120, 412],
        data3: [1620, 1182, 1191, 1320, 332, 1901, 1166, 834, 260, 220, 820, 412]
      },
      iconItemData: [ // 当天交易量
        {
          "text": "累计交易金额",
          "value": "9,953,666.8",
          "unit": "元"
        },
        {
          "text": "累计交易笔数",
          "value": "226",
          "unit": "笔"
        }
      ]
    }
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
    }

  }
}
</script>

<style lang="less" scoped>
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
    // display: flex;
    // flex-wrap: wrap;
    // align-content: flex-start;
    .content-l-top,
    .content-mid-top,
    .content-r-top {
      margin-bottom: 0.1rem;
      //   width: 33%;
      height: 35vh;
      background-image: url("../../../static/images/rectangle.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      > div.content_title {
        font-size: 0.22rem;
        color: #fff;
        position: absolute;
        top: 0.06rem;
        left: 50%;
        transform: translateX(-50%);
      }
      div:nth-child(2) {
        margin: 0;
      }
    }

    .content-top,
    .content-bot {
      display: flex;
      flex-wrap: nowrap;
      align-content: flex-start;
      width: 100%;
    }

    div.content-top {
      height: 35vh;
      margin-bottom: 0.1rem;
      .content-l-top {
        width: 35%;
        margin-left: 0.1rem;
      }
      .content-mid-top {
        width: 30%;
        margin: 0 0.1rem;
        background-image: unset;
        div.content-mid-top-up {
          height: 50%;
          position: relative;
          background-image: url("../../../static/images/rectangle_half.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          div.content_title {
            position: absolute;
            top: 0.05rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.22rem;
            color: #fff;
          }
        }
        div.content-mid-top-down {
          height: 50%;
          position: relative;
          box-sizing: border-box;
          padding-top: 0.15rem;
          .content_title {
            position: absolute;
            top: 0.18rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.22rem;
            color: #fff;
            background: unset;
          }
          > div {
            background-image: url("../../../static/images/rectangle_half.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .content-r-top {
        width: 35%;
        margin-right: 0.1rem;
      }
    }

    .content-l-bot,
    .content-mid-bot,
    .content-r-bot {
      width: 33.3333%;
      height: 50vh;
      background-image: url("../../../static/images/rectangle_big.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      div.content_title {
        font-size: 0.22rem;
        color: #fff;
        position: absolute;
        top: 0.1rem;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    div.content-bot {
      height: 50vh;
      .content-l-bot {
        margin-left: 0.1rem;
      }
      .content-mid-bot {
        margin: 0 0.1rem;
      }
      .content-r-bot {
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
