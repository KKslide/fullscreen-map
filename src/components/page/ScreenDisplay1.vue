<template>
  <div class="container1">
    <div class="top">
      <div class="top_l">
        <div class="top_l_t">
          <p>累计存款数据</p>
          <icon-item :childClass='childClass4'
                     :iconItemData='iconItemData'></icon-item>
        </div>
        <div class="top_l_b">
          <bar-chart :childClass='childClass1'></bar-chart>
        </div>
      </div>
      <div class="top_c">
        <p class="title">数字银行监控大屏</p>
        <div class="chart">
          <line-chart :childClass1='childClass1'
                      :titleName='titleName2'
                      :lineData='lineData1'
                      :lineDataL='lineDataL1'></line-chart>
        </div>
      </div>
      <div class="top_r">
        <div class="top_r_t">
          <p>累计开户数据</p>
          <icon-item :childClass='childClass4'
                     :iconItemData='iconItemData2'></icon-item>
        </div>
        <div class="top_r_b">
          <p class="title">各...百分比</p>
          <div class="chart">
            <div class="chart1">
              <cricle-chart :childClass='childClass3'
                            :titleName='titleName3'
                            :precent1='precent1'
                            :baseColorLiner='baseColorLiner1'></cricle-chart>
            </div>
            <div class="chart2">
              <cricle-chart :childClass='childClass3'
                            :titleName='titleName4'
                            :precent1='precent2'
                            :baseColorLiner='baseColorLiner2'></cricle-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_l">
        <heat-map :childClass1="childClass1"
                  :titleName="titleName1"></heat-map>
      </div>
      <div class="bottom_c">
        <realTime-list :childClass="childClass1"
                       :titleName="titleName5"></realTime-list>
      </div>
      <div class="bottom_r1">
        <line-chart :childClass1="childClass1"
                    :titleName="titleName6"
                    :lineData="lineData2"
                    :lineDataL='lineDataL2'></line-chart>
      </div>
    </div>
  </div>
</template>
<script>
// 引用需要使用的组件
import LineChart from '@/components/childComponents/LineChart';
import HeatMap1 from '@/components/childComponents/HeatMap1';
import CricleChart from '@/components/childComponents/CricleChart';
import RealTimeList from '@/components/childComponents/RealTimeList';
import BarChart from '@/components/childComponents/BarChart';
import IconItem from '@/components/childComponents/IconItem';
export default {
  name: "ScreenDisplay1",
  data () {
    return {
      childClass1: {
        height: '39vh'
      },
      childClass2: {
        height: '25vh'
      },
      childClass3: {
        height: '30vh'
      },
      childClass4: {
        height: '12vh'
      },
      titleName1: '客户端交易热力图',
      titleName2: '(每小时)',
      titleName3: '昨日...开户',
      titleName4: '近七日...开户',
      titleName5: '实时开户简报',
      titleName6: '各...交易金额',

      iconItemData: [{
        icon: '../../../static/icons/jine.svg',
        text: '累计存款金额',
        value: '12.3亿'
      },
      {
        icon: '../../../static/icons/batch-execution.svg',
        text: '累计交易笔数',
        value: '20万'
      }
      ],
      iconItemData2: [{
        icon: '../../../static/icons/yonghu.svg',
        text: '累计开户数量',
        value: '23050个'
      },
      {
        icon: '../../../static/icons/yonghu_1.svg',
        text: '近七日开户数量',
        value: '3020个'
      }
      ],
      lineDataL1: ['今日购买金额', '今日购买等数', '今日开户数量'],
      lineData1: {
        dataX: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
        data2: [620, 782, 491, 820, 332, 1101, 966, 734, 1650, 520, 1120, 412, 366, 1134, 1532, 801, 2120, 582, 291, 1120, 1390, 611, 991, 1320],
        data3: [1620, 1182, 1191, 1320, 332, 1901, 1166, 834, 260, 220, 820, 412, 166, 1634, 532, 701, 120, 482, 291, 520, 690, 311, 2191, 1320]
      },
      lineDataL2: ['', '', ''],
      lineData2: {
        dataX: ['3月23日', '3月24日', '3月25日', '3月26日', '3月27日', '3月28日', '3月29日', '3月30日', '4月01日', '4月02日', '4月03日', '4月04日', '4月05日', '4月06日', '4月07日', '4月08日', '4月09日', '4月10日', '4月11日', '4月12日', '4月13日', '4月14日', '4月15日', '4月16日'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620],
        data2: [620, 782, 491, 820, 332, 1101, 966, 734, 1650, 520, 1120, 412, 366, 1134, 1532, 801, 2120, 582, 291, 1120, 1390, 611, 991, 1320],
        data3: [1620, 1182, 1191, 1320, 332, 1901, 1166, 834, 260, 220, 820, 412, 166, 1634, 532, 701, 120, 482, 291, 520, 690, 311, 2191, 1320]
      },
      precent1: 81,
      precent2: 67,

      baseColorLiner1: ['rgba(255,255,255,0.6)', '#3C9FDD'],
      baseColorLiner2: ['rgba(255,255,255,0.6)', '#9D5DF5'],
    }
  },
  methods: {},
  components: {
    'line-chart': LineChart,
    'heat-map': HeatMap1,
    'cricle-chart': CricleChart,
    'realTime-list': RealTimeList,
    'bar-chart': BarChart,
    'icon-item': IconItem
  }

};

</script>
<style lang="less">
@borderColor: rgba(255, 255, 255, 0.2);
@backgroundColor: rgba(255, 255, 255, 0.05);
@fontColor: #fff;
@titleFontColor: rgba(12, 236, 228, 0.8);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container1 {
  width: 100%;
  height: 100vh;
  text-decoration: none;
  background: url("../../../static/images/background.jpeg");
  background-size: 100% 100%;
  overflow: hidden;

  .top {
    display: flex;
    width: 100%;
    height: 60vh;

    .top_l {
      flex: 1;
      margin: 0 0.5%;

      .top_l_t {
        height: 19vh;
        margin-bottom: 1vh;
        background-color: @backgroundColor;

        p {
          margin: 1% 1%;
          color: @titleFontColor;
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1.1rem;
        }

        icon-item {
          margin: 2% 1%;
        }
      }

      .top_l_b {
        height: 39.5vh;
        background-color: @backgroundColor;
      }
    }

    .top_c {
      height: 60vh;
      background-color: @backgroundColor;
      margin-bottom: 1vh;
      flex: 1;
      text-align: center;

      .title {
        //width: 60%;
        height: 12vh;
        margin-bottom: 3vh;
        font-size: 1.8rem;

        letter-spacing: 3px;
        /*font-weight: bold;
          color: transparent;
        */
        line-height: 12vh;
        color: @titleFontColor;
        text-shadow: rgba(255, 255, 255, 0.4) 0 9px 10px,
          rgba(255, 255, 255, 0.2) 1px 3px 3px;
        // text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
        background-color: @backgroundColor;
      }

      .chart {
        height: 45vh;
      }
    }

    .top_r {
      margin: 0 0.5%;
      flex: 1;

      .top_r_t {
        height: 19vh;
        background-color: @backgroundColor;
        margin-bottom: 1vh;

        p {
          margin: 1% 1%;
          color: @titleFontColor;
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1.1rem;
        }

        icon-item {
          margin: 2% 1%;
        }
      }

      .top_r_b {
        background-color: @backgroundColor;
        height: 39.5vh;

        .title {
          height: 10vh;
          left: left;
          margin: 1% 1%;
          color: @titleFontColor;
          fontfamily: "Arial";
          fontweight: none;
          font-size: 1.1rem;
        }

        .chart {
          height: 25vh;
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

  .bottom {
    display: flex;
    width: 100%;

    .bottom_l,
    .bottom_c,
    .bottom_r1 {
      flex: 1;
      height: 39vh;
      margin-top: 1vh;
      background-color: @backgroundColor;
    }

    .bottom_l {
      margin: 0 0.5%;
      margin-top: 1vh;
    }

    .bottom_c {
    }

    .bottom_r1 {
      margin: 0 0.5%;
      margin-top: 1vh;
    }
  }
}
</style>
