<template>
  <div class="container4">
    <div class="content">
      <div class="left">
        <div class="left_t">
          <p class="title">合作商户情况</p>
          <p>商户总数3290户，今日新增24户</p>
          <!-- <p>24小时交易金额排名 24小时交易笔数排名</p> -->
          <div class="lists">
            <div class="l_list">
              <sort-list :childClass="childClass2"
                         :sortTitle="sortTitle1"
                         :sortListData='sortListData1'></sort-list>
            </div>
            <div class="r_list">
              <sort-list :childClass="childClass2"
                         :sortTitle="sortTitle2"
                         :sortListData='sortListData2'></sort-list>
            </div>
          </div>
        </div>
        <div class="left_m">
          <pictorial-bar :childClass="childClass2"
                         :barTitle="barTitle1"
                         :barData="barData1"></pictorial-bar>
        </div>
        <div class="left_b">
          <pictorial-bar :childClass="childClass2"
                         :barTitle="barTitle2"
                         :barData="barData2"></pictorial-bar>
        </div>
      </div>
      <div class="center">
        <div class="center_t">
          <p class="title">客商银行移动支付业务情况</p>
          <china-map2 :childClass1="mapClass1"></china-map2>
        </div>
        <div class="center_m">
          <div class="message">
            <p>2019年留存存款 1,389,219元</p>
            <p>2019年手续费年收入344,240元</p>
          </div>
        </div>
        <div class="center_b">
          <realTime-list :childClass="childClass2"
                         :titleName="titleName3"></realTime-list>
        </div>
      </div>
      <div class="right">
        <div class="right_t">
          <line-chart2 :childClass1="childClass1"
                       :line2Data="line2Data"
                       :titleName='titleName1'></line-chart2>
        </div>
        <div class="right_m">
          <line-chart2 :childClass1="childClass2"
                       :line2Data="line2Data"
                       :titleName='titleName2'></line-chart2>
        </div>
        <div class="right_b">
          <div class="chart">
            <div class="chart1">
              <pie-chart :childClass="childClass2"
                         :titleName="pieTitle"
                         :pieData="pieData"></pie-chart>
            </div>
            <div class="chart2">
              <cricle-chart2 :childClass="childClass2"
                             :titleName="cricleTitle"
                             :cricleData="cricleData"></cricle-chart2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引用需要使用的组件
import ScatterMap from '@/components/childComponents/ScatterMap';
import LineChart2 from '@/components/childComponents/LineChart2';
import RealTimeList from '@/components/childComponents/RealTimeList';
import PieChart from '@/components/childComponents/PieChart';
import CricleChart2 from '@/components/childComponents/CricleChart2';
import SortList from '@/components/childComponents/SortList';
import PictorialBar from '@/components/childComponents/PictorialBar';


export default {
  name: "ScreenDisplay4",
  data () {
    return {
      childClass1: {
        height: '40vh'
      },
      childClass2: {
        height: '30vh'
      },
      mapClass1: {
        height: '50vh',
        marginTop: '-10vh',
      },
      titleName1: '最近24小时交易金额',
      titleName2: '最近24小时交易笔数',
      titleName3: '实时交易简报',
      line2Data: {
        dataX: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
        data2: [620, 782, 491, 820, 332, 1101, 966, 734, 1650, 520, 1120, 412, 366, 1134, 1532, 801, 2120, 582, 291, 1120, 1390, 611, 991, 1320],
        data3: [1620, 1182, 1191, 1320, 332, 1901, 1166, 834, 260, 220, 820, 412, 166, 1634, 532, 701, 120, 482, 291, 520, 690, 311, 2191, 1320]
      },
      pieTitle: '最近24小时客户支付方式',
      pieData: [
        { value: 635, name: '微信' },
        { value: 310, name: '支付宝' },
        { value: 234, name: '银联' },
        { value: 215, name: '其他' },
      ],
      cricleTitle: '最近24小时客户成功率',
      cricleData: [
        { value: 635, name: '成功' },
        { value: 310, name: '失败' },
      ],
      barTitle1: '前3大行业交易情况',
      barTitle2: '商户收单、提现情况',
      barData1: {
        dataY: ['物流', '餐饮', '百货'],
        data1: [34, 36, 29],
        data2: [13, 50, 25],
        dataT: [10, 10, 10]
      },
      barData2: {
        dataY: ['超网', '银联', '大额', '小额'],
        data1: [34, 13, 56, 16],
        data2: [41, 52, 12, 20],
        dataT: [10, 10, 10, 10]
      },
      sortTitle1: "24小时交易金额排名",
      sortTitle2: "24小时交易笔数排名",
      sortListData1: [{
        rank: '1',
        icon: '../../../static/listIcons/boy1.svg',
        sname: 'ENGE',
        svalue: '197'
      },
      {
        rank: '2',
        icon: '../../../static/listIcons/gril1.svg',
        sname: 'TSM',
        svalue: '183'
      }, {
        rank: '3',
        icon: '../../../static/listIcons/boy2.svg',
        sname: 'ENGE',
        svalue: '181'
      },
      {
        rank: '4',
        icon: '../../../static/listIcons/gril2.svg',
        sname: 'TSM',
        svalue: '176'
      },
      {
        rank: '5',
        icon: '../../../static/listIcons/boy3.svg',
        sname: 'ENGE',
        svalue: '163'
      },
      {
        rank: '6',
        icon: '../../../static/listIcons/gril3.svg',
        sname: 'TSM',
        svalue: '150'
      }
      ],
      sortListData2: [{
        rank: '1',
        icon: '../../../static/listIcons/boy1.svg',
        sname: 'TEAM',
        svalue: '186'
      },
      {
        rank: '2',
        icon: '../../../static/listIcons/boy2.svg',
        sname: 'JOKERS',
        svalue: '163'
      },
      {
        rank: '3',
        icon: '../../../static/listIcons/gril4.svg',
        sname: 'TSM',
        svalue: '132'
      },
      {
        rank: '4',
        icon: '../../../static/listIcons/boy4.svg',
        sname: 'TSM',
        svalue: '111'
      },
      {
        rank: '5',
        icon: '../../../static/listIcons/gril3.svg',
        sname: 'TSM',
        svalue: '132'
      },
      {
        rank: '6',
        icon: '../../../static/listIcons/boy3.svg',
        sname: 'TSM',
        svalue: '111'
      }
      ],
    }
  },
  methods: {},
  components: {
    'china-map2': ScatterMap,
    'line-chart2': LineChart2,
    'realTime-list': RealTimeList,
    'pie-chart': PieChart,
    'cricle-chart2': CricleChart2,
    'sort-list': SortList,
    'pictorial-bar': PictorialBar
  }

};

</script>
<style lang="less">
@borderColor: rgba(255, 255, 255, 0.2);
@backgroundColor: rgba(255, 255, 255, 0.05);
@fontColor: #fff;
@titleFontColor: rgba(12, 236, 228, 0.8);

.container4 {
  width: 100%;
  height: 100vh;
  text-decoration: none;
  margin: 0;
  padding: 0;
  background: url("../../../static/images/background.jpeg");
  background-size: 100% 100%;
  overflow: hidden;
  box-sizing: border-box;

  .content {
    display: flex;

    .left {
      flex: 1;
      margin: 0 0.5%;

      .left_t,
      .left_m,
      .left_b {
        background-color: @backgroundColor;
      }

      .left_t {
        margin-bottom: 0.5vh;
        height: 39.5vh;
        text-align: center;

        .title {
          margin: 1% 1%;
          color: @titleFontColor;
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1.1rem;
        }

        p {
          color: rgba(255, 255, 255, 0.7);
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1rem;
        }

        .lists {
          height: 30vh;
          display: flex;
          text-align: center;

          .l_list {
            width: 50%;
            flex: 1;
          }

          .r_list {
            width: 50%;
            flex: 1;
          }
        }
      }

      .left_m {
        margin-bottom: 0.5vh;
        height: 29.5vh;
      }

      .left_b {
        margin-bottom: 0.5vh;
        height: 29.5vh;
      }
    }

    .center {
      flex: 1;

      .center_t,
      .center_m,
      .center_b {
        background-color: @backgroundColor;
      }

      .center_t {
        height: 50vh;
        text-align: center;

        .title {
          height: 8vh;
          margin-bottom: 5vh;
          font-size: 1.7rem;
          letter-spacing: 3px;
          line-height: 8vh;
          color: @titleFontColor;
          text-shadow: rgba(255, 255, 255, 0.4) 0 7px 8px,
            rgba(255, 255, 255, 0.2) 1px 3px 3px;
          background-color: @backgroundColor;
        }
      }

      .center_m {
        height: 20vh;

        .message {
          padding: 2vh 0;
          text-align: center;

          p {
            height: 6vh;
            font-size: 1.3rem;
            letter-spacing: 1px;
            line-height: 8vh;
            color: rgba(12, 236, 228, 0.6);
          }
        }
      }

      .center_b {
        height: 30vh;
      }
    }

    .right {
      flex: 1;
      margin: 0 0.5%;

      .right_t,
      .right_m,
      .right_b {
        background-color: @backgroundColor;
      }

      .right_t {
        height: 39.5vh;
        margin-bottom: 0.5vh;
      }

      .right_m {
        margin-bottom: 0.5vh;
        height: 30vh;
      }

      .right_b {
        margin-bottom: 0.5vh;
        height: 29.5vh;

        .chart {
          display: flex;

          .chart1 {
            flex: 1;
          }

          .chart2 {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
