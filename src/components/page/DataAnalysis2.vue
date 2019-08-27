<template>
  <div class="container">
    <div class="top">
      <line-chart :childClass1="childClass1"
                  :topData="topData"></line-chart>
    </div>
    <div class="middle">
      <div class="middle_left">
        <pie-chart :childClass2="childClass2"
                   :cleftData="cleftData"></pie-chart>
      </div>
      <div class="middle_right">
        <pictorialBar-chart :childClass2="childClass2"
                            :crightData="crightData"></pictorialBar-chart>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <area-chart :childClass1="childClass1"></area-chart>
      </div>
      <div class="bottom_right">
        <funnel-chart :childClass1="childClass1"
                      :bottomData="bottomData"></funnel-chart>
      </div>
    </div>
  </div>
</template>
<script>
// 引用需要使用的组件
import PieChart from '@/components/chartsComponents/PieChart'
import LineChart from '@/components/chartsComponents/LineChart'
import Bar3DChart from '@/components/chartsComponents/Bar3DChart'
import RosePieChart from '@/components/chartsComponents/RosePieChart'
import PictorialBarChart from '@/components/chartsComponents/PictorialBarChart'
import AreaChart from '@/components/chartsComponents/AreaChart'
import FunnelChart from '@/components/chartsComponents/FunnelChart'

export default {
  name: "DataAnalysis2",
  data () {
    return {
      childClass1: {
        width: '100%',
        height: '32.8vh'
      },
      childClass2: {
        width: '100%',
        height: '32.9vh'
      },
      topData: {
        dataX: ['2016-10-01', '2016-11-01', '2016-12-01', '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01', '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01', '2017-12-01', '2018-01-01', '2018-02-01', '2018-03-01', '2018-04-01', '2018-05-01', '2018-06-01', '2018-07-01', '2018-08-01', '2018-09-01', '2018-10-01', '2018-11-01', '2018-12-01', '2019-01-01'],
        data1: [560, 520, 1630, 2340, 550, 660, 470, 380, 790, 900, 810, 620, 930, 740, 1150, 860, 620, 2182, 991, 720, 632, 1178, 701, 620, 182, 191, 980, 701],
        data2: [620, 782, 491, 820, 332, 1101, 966, 734, 1650, 520, 1120, 412, 366, 1134, 1532, 801, 2120, 582, 291, 1120, 1390, 611, 991, 1320, 332, 1101, 766, 1134],
        data3: [1620, 1182, 1191, 1320, 332, 1901, 1166, 834, 260, 220, 820, 412, 166, 1634, 532, 701, 120, 482, 291, 520, 690, 311, 2191, 1320, 932, 1101, 166, 134],
        data4: [920, 182, 1091, 920, 1332, 2101, 166, 134, 650, 1120, 120, 912, 366, 634, 532, 701, 2120, 482, 1291, 820, 390, 111, 791, 1320, 2132, 801, 1166, 634],
      },
      cleftData: [
        { value: 264, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 346, name: '百度' },
        { value: 281, name: '谷歌' },
        { value: 338, name: '必应' },
        { value: 102, name: '其他' }
      ],
      crightData: {
        dataX: ['2018-01-01', '2018-02-01', '2018-03-01', '2018-04-01', '2018-05-01', '2018-06-01', '2018-07-01', '2018-08-01', '2018-09-01', '2018-10-01', '2018-11-01', '2018-12-01'],
        data1: [610, 192, 206, 336, 396, 256, 212, 586, 345, 406, 192, 206,],
        data2: [256, 212, 586, 345, 406, 121, 465, 200, 333, 390, 586, 345]
      },
      bottomData: {
        data1: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ],
        data2: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ],
        data3: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ],
        data4: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
      }
    }
  },
  methods: {

  },
  components: {
    'pie-chart': PieChart,
    'line-chart': LineChart,
    'bar3D-chart': Bar3DChart,
    'rosePie-chart': RosePieChart,
    'pictorialBar-chart': PictorialBarChart,
    'area-chart': AreaChart,
    'funnel-chart': FunnelChart
  }

};

</script>
<style lang="less">
@borderColor: rgba(255, 255, 255, 0.2);
@backgroundColor: rgba(255, 255, 255, 0.06);

.container {
  width: 100%;
  height: 100vh;
  text-decoration: none;
  margin: 0;
  padding: 0;
  background: url("../../../static/images/background.jpeg");
  background-size: 100% 100%;
  overflow: hidden;
  box-sizing: border-box;

  .top {
    width: 100%;
    height: 32.8vh;
    margin: 0.5% 0;
    background-color: @backgroundColor;
  }

  .middle {
    display: flex;
    width: 100%;
    height: 32.9vh;
    margin: 0.5% 0;
    background-color: @backgroundColor;

    .middle_left {
      flex: 1;
    }

    .middle_right {
      flex: 1;
    }
  }

  .bottom {
    display: flex;
    width: 100%;
    height: 32.8vh;
    margin: 0.5% 0;
    background-color: @backgroundColor;

    .bottom_left {
      flex: 1;
    }

    .bottom_right {
      flex: 1;
    }
  }
}
</style>
