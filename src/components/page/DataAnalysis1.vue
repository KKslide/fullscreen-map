<template>
  <div class="container">
    <div class="content">
      <div class="left">
        <high-map :childClass1="childClass1"
                  :leftData="leftData"></high-map>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="right_top_left">
            <gauge-chart :childClass2="childClass2"></gauge-chart>
          </div>
          <div class="right_top_right">
            <cricle-chart :childClass2="childClass2"></cricle-chart>
          </div>
        </div>
        <div class="right_bottom">
          <bar-chart :childClass2="childClass2"
                     :rbottomData="rbottomData"></bar-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引用需要使用的组件
import BarChart from '@/components/chartsComponents/BarChart'
import GaugeChart from '@/components/chartsComponents/GaugeChart'
import HighMap from '@/components/chartsComponents/HighMap'
import CricleChart from '@/components/chartsComponents/CricleChart'



export default {
  name: 'DataAnalysis1',
  data () {
    return {
      childClass1: {
        width: '100%',
        height: '100vh'
      },
      childClass2: {
        width: '100%',
        height: '50vh'
      },
      leftData: [{ "name": "广州", "value": 59 }, { "name": "韶关", "value": 68 }, { "name": "深圳", "value": 96 }, { "name": "珠海", "value": 26 }, { "name": "汕头", "value": 4 }, { "name": "佛山", "value": 61 }, { "name": "江门", "value": 58 }, { "name": "湛江", "value": 29 }, { "name": "茂名", "value": 27 }, { "name": "肇庆", "value": 30 }, { "name": "惠州", "value": 6 }, { "name": "梅州", "value": 3 }, { "name": "汕尾", "value": 93 }, { "name": "河源", "value": 1 }, { "name": "阳江", "value": 95 }, { "name": "清远", "value": 29 }, { "name": "东莞", "value": 67 }, { "name": "中山", "value": 51 }, { "name": "东沙群岛", "value": 5 }, { "name": "潮州", "value": 94 }, { "name": "揭阳", "value": 90 }, { "name": "云浮", "value": 49 }],
      rbottomData: {
        dataX: ['2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01'],
        data1: [110, 152, 206, 336, 396],
        data2: [121, 165, 200, 333, 390],
        data3: [256, 172, 386, 345, 406]
      },
    }
  },
  mounted () { },
  methods: {},
  // 在 components 注册需要使用的组件，
  components: {
    'bar-chart': BarChart,
    'gauge-chart': GaugeChart,
    'high-map': HighMap,
    'cricle-chart': CricleChart,
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@baseFont: "Microsoft Yahei", Arial, sans-serif;
@borderColor: rgba(255, 255, 255, 0.2);
@backgroundColor: rgba(255, 255, 255, 0.06);

.container {
  width: 100%;
  height: auto;
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
      background-color: @backgroundColor;
      /* border: 0.1rem solid @borderColor; */
    }

    .right {
      flex: 1;

      .right_top {
        display: flex;
        height: 50vh;

        .right_top_left {
          flex: 1;
          background-color: @backgroundColor;
          margin: 0.5% 0;
        }

        .right_top_right {
          flex: 1;
          background-color: @backgroundColor;
          margin: 0.5% 0;
          margin-left: 1%;
        }
      }

      .right_bottom {
        height: 50vh;
        background-color: @backgroundColor;
        margin: 0.5% 0;
      }
    }
  }
}
</style>
