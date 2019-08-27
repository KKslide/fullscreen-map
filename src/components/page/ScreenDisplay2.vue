<template>
  <div class="container2">
    <div class="content">
      <div class="left">
        <div class="left_t">
          <p>累计存款数据</p>
          <div class="item1">
            <icon-item :childClass='childClass1'
                       :iconItemData='iconItemData1'></icon-item>
          </div>
          <div class="item2">
            <icon-item :childClass='childClass4'
                       :iconItemData='iconItemData2'></icon-item>
          </div>
        </div>
        <div class="left_b">
          <p>放款金额</p>
          <icon-item :childClass='childClass4'
                     :iconItemData='iconItemData3'></icon-item>
        </div>
      </div>
      <div class="center">
        <div class="center_t">
          <p class="title">线上资产业务监控大屏</p>
          <icon-item :childClass='childClass4'
                     :iconItemData='iconItemData'></icon-item>
        </div>
        <div class="center_m">
          <line-chart2 :childClass1="childClass1"
                       :line2Data="line2Data"
                       :titleName='titleName1'></line-chart2>
        </div>
        <div class="center_b">
          <scatter-map :childClass1="childClass1"
                       :titleName="mapTitle"></scatter-map>
        </div>
      </div>
      <div class="right">
        <div class="right_t">
          <bar-chart1 :childClass="childClass3"></bar-chart1>
        </div>
        <div class="right_m">
          <area-chart :childClass="childClass1"></area-chart>
        </div>
        <div class="right_b">
          <pie-chart :childClass="childClass1"
                     :titleName="pieTitle"
                     :pieData="pieData"></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引用需要使用的组件
import ScatterMap from '@/components/childComponents/ScatterMap';
import LineChart2 from '@/components/childComponents/LineChart2';
import IconItem from '@/components/childComponents/IconItem';
import AreaChart from '@/components/childComponents/AreaChart';
import BarChart1 from '@/components/childComponents/BarChart1';
import PieChart from '@/components/childComponents/PieChart';


export default {
  name: "ScreenDisplay2",
  data () {
    return {
      childClass1: {
        height: '35vh'
      },
      childClass2: {
        height: '50vh'
      },
      childClass3: {
        height: '30vh'
      },
      childClass4: {
        height: '20vh'
      },
      titleName1: '最近24小时交易金额',
      mapTitle: '客户分布地图',
      line2Data: {
        dataX: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
        data2: [620, 782, 491, 820, 332, 1101, 966, 734, 1650, 520, 1120, 412, 366, 1134, 1532, 801, 2120, 582, 291, 1120, 1390, 611, 991, 1320],
        data3: [1620, 1182, 1191, 1320, 332, 1901, 1166, 834, 260, 220, 820, 412, 166, 1634, 532, 701, 120, 482, 291, 520, 690, 311, 2191, 1320]
      },
      pieTitle: '业务百分比',
      pieData: [
        { value: 635, name: '反欺诈规则' },
        { value: 310, name: '风控评分底' },
        { value: 234, name: '业务核查' },
        { value: 215, name: '其他' },
      ],
      iconItemData: [{
        icon: '../../../static/icons/wallet.svg',
        text: '今日放款金额',
        value: '9,953,666.8'
      },
      {
        icon: '../../../static/icons/xuliangfenxi.svg',
        text: '今日放款笔数',
        value: '226'
      }
      ],
      iconItemData1: [{
        icon: '../../../static/icons/jine.svg',
        text: '累计存款金额',
        value: '12.3亿'
      },
      {
        icon: '../../../static/icons/batch-execution.svg',
        text: '累计交易笔数',
        value: '20万'
      },
      {
        icon: '../../../static/icons/lixifuji.svg',
        text: '进件数',
        value: '6019笔'
      },
      {
        icon: '../../../static/icons/qianbao.svg',
        text: '处理数',
        value: '6019笔'
      },
      {
        icon: '../../../static/icons/rank_and_window.svg',
        text: '审批通过数',
        value: '6019笔'
      }
      ],
      iconItemData2: [{
        icon: '../../../static/icons/qiandai.svg',
        text: '今日放款金额',
        value: '9,953,666.8'
      },
      {
        icon: '../../../static/icons/yinhangqia.svg',
        text: '今日还款金额',
        value: '315,831.59'
      }
      ],
      iconItemData3: [{
        icon: '../../../static/icons/yinhang.svg',
        text: '新网联合授信业务',
        value: '270,141,533.12'
      },
      {
        icon: '../../../static/icons/shourumingxi.svg',
        text: 'O2O贷款业务',
        value: '141,533.12'
      }
      ],
    }
  },
  methods: {},
  components: {
    'scatter-map': ScatterMap,
    'line-chart2': LineChart2,
    'icon-item': IconItem,
    'area-chart': AreaChart,
    'bar-chart1': BarChart1,
    'pie-chart': PieChart
  }

};

</script>
<style lang="less">
@borderColor: rgba(255, 255, 255, 0.2);
@backgroundColor: rgba(255, 255, 255, 0.05);
@fontColor: #fff;
@titleFontColor: rgba(12, 236, 228, 0.8);

.container2 {
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

      .left_t {
        margin-bottom: 0.45vh;
        height: 64.2vh;
        background-color: @backgroundColor;

        p {
          margin: 1% 1%;
          color: @titleFontColor;
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1.1rem;
        }

        .item1 {
        }

        .item2 {
        }
      }

      .left_b {
        margin-bottom: 0.5vh;
        height: 34.5vh;
        background-color: @backgroundColor;

        p {
          // margin: 1% 1%;
          color: @titleFontColor;
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1.1rem;
        }
      }
    }

    .center {
      flex: 1;

      .center_t,
      .center_m,
      .center_b {
        // border: 1px solid @borderColor;
        background-color: @backgroundColor;
      }

      .center_t {
        height: 29.5vh;
        text-align: center;
        margin-bottom: 0.5vh;

        .title {
          height: 12vh;
          margin-bottom: 3vh;
          font-size: 1.8rem;

          letter-spacing: 3px;
          line-height: 12vh;
          color: @titleFontColor;
          text-shadow: rgba(255, 255, 255, 0.4) 0 9px 10px,
            rgba(255, 255, 255, 0.2) 1px 3px 3px;
          background-color: @backgroundColor;
        }
      }

      .center_m {
        margin-bottom: 0.5vh;
        height: 35vh;
      }

      .center_b {
        margin-bottom: 0.5vh;
        height: 34.5vh;
      }
    }

    .right {
      flex: 1;
      margin: 0 0.5%;

      .right_t,
      .right_m,
      .right_b {
        // border: 1px solid @borderColor;
        background-color: @backgroundColor;
      }

      .right_t {
        margin-bottom: 0.5vh;
        height: 29.5vh;
      }

      .right_m {
        margin-bottom: 0.5vh;
        height: 35vh;
      }

      .right_b {
        margin-bottom: 0.5vh;
        height: 34.5vh;
      }
    }
  }
}
</style>
