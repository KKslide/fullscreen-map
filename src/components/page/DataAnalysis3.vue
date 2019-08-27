<template>
  <div class="container">
    <div class="top3">
      <div class="top_left">
        <bar3D-chart :childClass2="childClass2"></bar3D-chart>
      </div>
      <div class="top_right">
      </div>
    </div>
    <div class="bottom3">
      <div class="bottom_left">
      </div>
      <div class="bottom_right">
      </div>
    </div>
  </div>
</template>
<script>
// 引用需要使用的组件
import Bar3DChart from '@/components/chartsComponents/Bar3DChart'
import RosePieChart from '@/components/chartsComponents/RosePieChart'

export default {
  name: "DataAnalysis2",
  data () {
    return {
      childClass1: {
        width: '100%',
        height: '50vh'
      },
      childClass2: {
        width: '100%',
        height: '50vh'
      },
    }
  },
  methods: {},
  components: {
    'bar3D-chart': Bar3DChart,
    'rosePie-chart': RosePieChart,
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
  //background-color: rgba(9, 23, 72);
  overflow: hidden;
  box-sizing: border-box;

  .top3 {
    display: flex;
    width: 100%;
    height: 49vh;
    margin: 0.5% 0;
    background-color: @backgroundColor;

    .top_left {
      flex: 1;
    }

    .top_right {
      flex: 1;
    }
  }

  .bottom3 {
    display: flex;
    width: 100%;
    height: 49vh;
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
