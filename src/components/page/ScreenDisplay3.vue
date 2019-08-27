<template>
  <div class="container3">
    <div class="titleBox">
      <div class="l_box">
        <p class="t_part">新网用户</p>
        <div class="b_part">
          <p>数字惠普</p>
          <p>万能连接</p>
        </div>
      </div>
      <div class="r_box">
        <div class="t_part">
          <img src="Static/icons/yonghu.svg"
               alt="icon">
          <span>实时总有效用户数</span>
        </div>
        <div class="m_part">
          <span>3</span>
          <span>4</span>
          <span>7</span>
          <span>6</span>
        </div>
        <div class="b_part">
          <div class="l_icon"><img src="Static/icons/yonghu_1.svg"
                 alt="icon">
            <span>当日新增有效用户数:120</span>
          </div>
          <div class="r_icon">
            <img src="Static/icons/batch-execution.svg"
                 alt="icon">
            <span>完成进度:28%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="contentBox">
      <div class="top">
        <div class="top_l">
          <!-- <sex-pro :childClass="childClass1"></sex-pro> -->
        </div>
        <div class="top_c">
          <div class="map">
            <china-map :childClass="childClass2"></china-map>
          </div>
        </div>
        <div class="top_r">
          <div class="top_r_t">
            <radar-chart :childClass="childClass3"
                         :titleName="radarTitle"
                         :radarIData="radarIData"></radar-chart>
          </div>
          <div class="top_r_b">
            <pBar-chart :childClass="childClass3"
                        :titleName="pbarTitle"></pBar-chart>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_l">
          <bar-process :childClass="childClass1"
                       :titleName="barProcessTitle"></bar-process>
        </div>
        <div class="bottom_c">
          <pie-chart2 :childClass="childClass1"
                      :titleName="pieTitle"
                      :pieData="pieData"></pie-chart2>
        </div>
        <div class="bottom_r">
          <funnel-chart :childClass="childClass1"
                        :titleName="funnelTitle"
                        :funnelData="funnelData"></funnel-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引用需要使用的组件
import ChinaMap from '@/components/childComponents/ChinaMap';
import PieChart2 from '@/components/childComponents/PieChart2';
import RadarChart from '@/components/childComponents/RadarChart';
import FunnelChart from '@/components/childComponents/FunnelChart';
import PBarChart from '@/components/childComponents/PBarChart';
import SexPro from '@/components/childComponents/SexPro';
import BarProcess from '@/components/childComponents/BarProcess';


export default {
  name: "ScreenDisplay3",
  data () {
    return {
      childClass1: {
        width: '100%',
        height: '40vh'
      },
      childClass2: {
        height: '45vh'
      },
      childClass3: {
        height: '26vh'
      },
      pieTitle: '受教育程度',
      funnelTitle: '业务条线',
      radarTitle: '年龄分布',
      sexproTitle: '性别比例',
      pbarTitle: '消费水平',
      barProcessTitle: '职业类型',
      pieData: [
        { value: 12, name: '研究生及以上' },
        { value: 75, name: '大学本科' },
        { value: 280, name: '大学专科和专科学校' },
        { value: 175, name: '中等专业学校或中等技术学校' },
        { value: 16, name: '技术学校' },
        { value: 537, name: '高中' },
        { value: 427, name: '初中' },
        { value: 24, name: '小学' },
        { value: 1, name: '文盲或半文盲' },
        { value: 2267, name: '未知' }
      ],
      funnelData: [
        { value: 10, name: '点击' },
        { value: 20, name: '订单' },
        { value: 30, name: '点击' },
        { value: 40, name: '订单' },
        { value: 50, name: '点击' },
        { value: 60, name: '订单' },
        { value: 70, name: '点击' },
        { value: 80, name: '订单' },
        { value: 90, name: '点击' },
        { value: 100, name: '订单' }
      ],
      radarIData: [
        { name: '40-49', max: 1599 },
        { name: '30-39', max: 1599 },
        { name: '20-29', max: 1599 },
        { name: '14-19', max: 1599 },
        { name: '其他年龄', max: 1599 }
      ],
      // radarData: [
      //   { value: 709, name: '40-49' },
      //   { value: 1599, name: '30-39' },
      //   { value: 1365, name: '20-29' },
      //   { value: 1, name: '14-19' },
      //   { value: 140, name: '其他年龄' }
      // ],
    }
  },
  methods: {},
  components: {
    'china-map': ChinaMap,
    'pie-chart2': PieChart2,
    'radar-chart': RadarChart,
    'funnel-chart': FunnelChart,
    'pBar-chart': PBarChart,
    'sex-pro': SexPro,
    'bar-process': BarProcess
  }

};

</script>
<style lang="less">
@borderColor: rgba(255, 255, 255, 0.2);
@backgroundColor: rgba(255, 255, 255, 0.2);
@fontColor: #fff;
@titleFontColor: rgba(12, 236, 228, 0.8);

.container3 {
  width: 100%;
  height: 100vh;
  text-decoration: none;
  margin: 0;
  padding: 0;
  background: url("../../../static/images/background.jpeg");
  background-size: 100% 100%;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  z-index: -1;

  .titleBox {
    background-color: @backgroundColor;
    border: 2px solid @borderColor;
    position: relative;
    left: 0;
    top: 0;
    margin: 0 auto;
    width: 36%;
    height: 16vh;
    z-index: 1;
    display: flex;

    .l_box {
      flex: 1;

      .t_part {
        height: 7.5vh;
        line-height: 7.5vh;
        color: @titleFontColor;
        font-size: 1.6rem;
        font-weight: bold;
      }

      .b_part {
        height: 7.5vh;
        color: @fontColor;
        border-top: 1px solid @titleFontColor;

        p {
          font-size: 1.1rem;
        }
      }
    }

    .r_box {
      flex: 2.5;
      color: @fontColor;

      .t_part {
        height: 3vh;
        text-align: left;

        img {
          width: 1rem;
          height: 1rem;
        }

        span {
        }
      }

      .m_part {
        height: 9vh;
        line-height: 9vh;
        text-align: center;

        span {
          //display: inline-block;
          margin-right: 1%;
          padding: 1% 1.5%;
          font-size: 1.5rem;
          border-radius: 15%;
          box-shadow: rgba(18, 34, 50, 0.8) 3px 3px 6px 2px; //边框阴影
          color: @fontColor;
          background-color: @titleFontColor;
        }
      }

      .b_part {
        height: 3vh;
        text-align: left;
        display: flex;

        div {
          img {
            width: 1rem;
            height: 1rem;
          }

          span {
          }
        }

        .l_icon {
          flex: 1.5;
        }

        .r_icon {
          flex: 1;
        }
      }
    }
  }

  .contentBox {
    border: 1px solid @borderColor;
    height: 92vh;
    position: relative;
    margin-top: -8vh;
    z-index: 0;

    .top {
      height: 52vh;
      display: flex;

      .top_l,
      .top_c,
      .top_r {
        border: 1px solid @borderColor;
        flex: 1;
      }

      .top_c {
        .map {
          padding-top: 7vh;
        }
      }

      .top_r {
        .top_r_t {
          height: 26vh;
        }

        .top_r_b {
          height: 26vh;
          border-top: 1px solid @borderColor;
        }
      }
    }

    .bottom {
      display: flex;
      height: 40vh;

      .bottom_l,
      .bottom_c,
      .bottom_r {
        border: 1px solid @borderColor;
        flex: 1;
      }

      .bottom_l {
      }

      .bottom_c {
      }

      .bottom_r {
      }
    }
  }
}
</style>
