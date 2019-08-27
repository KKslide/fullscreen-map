<template>
  <div class="SPOcontainer">
    <div class="title">{{title}}</div>
    <div class="content">
      <div class="content-top">
        <div class="content-l-top">
          <div class="content_title" v-html="title1"></div>
          <part-1 :crightData="workCrightData"></part-1>
        </div>
        <div class="content-mid-top">
          <div class="content_title" v-html="title2"></div>
          <part-2 :title="title2"></part-2>
        </div>
        <div class="content-r-top">
          <div class="content_title" v-html="title3"></div>
          <part-3 :title="title3"></part-3>
        </div>
      </div>

      <div class="content-bot">
        <div class="content-l-bot">
			<div class="content_title" v-html="title4"></div>
          <part-4 :oneHourData="oneHourData"></part-4>
        </div>
        <div class="content-mid-bot">
			<div class="content_title" v-html="title5"></div>
          <part-5></part-5>
        </div>
        <div class="content-r-bot">
			<div class="content_title" v-html="title6"></div>
          <part-6></part-6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictorialBarChart from '../ScreenFour/PictorialBarChart' // 左上角柱状图
import DayTradeCount from '../ScreenFour/DayTradeCount' // 中间上边
import OneMinTrade from '../ScreenFour/OneMinTrade' // 右上组件 - 一分钟交易情况
import OneHourTrade from '../ScreenFour/OneHourTrade' // 右上组件 - 一分钟交易情况
import HourAvgTradeTime from '../ScreenFour/HourAvgTradeTime' // 当前一小时平均处理时间
import DayAvgTradeTime from '../ScreenFour/DayAvgTradeTime' // 当天交易平均处理时间
export default {
  data() {
    return {
      title: '全局业务监控',
      title1: '每天每个小时交易量',
      title2: '当天交易量',
      title3: '当天交易量',
      title4: '当前一小时交易',
      title5: '当前一小时平均处理时间',
      title6: '当天交易平均处理时间',
      //当天每个小时交易量
      workCrightData: {
        dataX: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
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
      }
    }
  },
  components: {
    'part-1': PictorialBarChart,
    'part-2': DayTradeCount,
    'part-3': OneMinTrade,
    'part-4': OneHourTrade,
    'part-5': HourAvgTradeTime,
    'part-6': DayAvgTradeTime, // 当天交易平均处理时间
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
      width: 33%;
      height: 35vh;
      background-image: url("../../../static/images/rectangle.png");
      background-repeat: no-repeat;
	  background-size: 100% 100%;
	  position: relative;
	  >div.content_title{
		  font-size: 0.22rem;
		  color:#fff;
		  position: absolute;
		  top:0.06rem;
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
    }

    div.content-top {
      .content-l-top {
        // background: red;
        margin-left: 0.1rem;
      }
      .content-mid-top {
        // background: blue;
        margin: 0 0.1rem;
      }
      .content-r-top {
        // background: yellow;
        margin-right: 0.1rem;
      }
    }


	.content-l-bot,
	.content-mid-bot,
	.content-r-bot{
        width: 33.3333%;
        background-image: url("../../../static/images/rectangle_big.png");
        background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
		div.content_title{
			font-size: 0.22rem;
			color:#fff;
			position: absolute;
			top:0.1rem;
			left: 50%;
			transform: translateX(-50%);
		}
	}
    div.content-bot {
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
