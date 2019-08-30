<template>
  <div class="SemicircleProgressBar">
    <div class="SemicircleProgressBarWarp">
      <div class="SemicircleProgressBarTitle">今日放款金额</div>
      <div class="circle_pos circle_L">
        <div class="circle"></div>
      </div>
      <!-- <div class="datas">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span class="dot">,</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span class="dot">.</span>
        <span>7</span>
        <i class="unit">元</i>
      </div>-->
      <base-number :tradeData="this.dataL" :toFixedNum="2" :customClass="'datas'"></base-number>
    </div>
    <div class="SemicircleProgressBarWarp">
      <div class="SemicircleProgressBarTitle">今日放款笔数</div>
      <div class="circle_pos circle_R">
        <div class="circle"></div>
      </div>
      <base-number :tradeData="this.dataR" :toFixedNum="2" :customClass="'datas'"></base-number>
    </div>
  </div>
</template>

<script>
import BaseNumber from '@/components/ScreenTwo/BaseNumber' // 数字样式
export default {
  name: 'SemicircleProgressBar',
  data() {
    return {
      dataL: null,
      dataR: null
    };
  },
  mounted() {
    $('.circle_L>.circle').circleProgress({
      value: 0.45,
      size: 180,
      startAngle: Math.PI,
      thickness: 15,
      lineCap: "round",
      emptyFill: "rgba(67,96,160,0.5)",
      fill: {
        gradient: ["#f7c368", "#fc4b4b"]
      },
      animation: {
        duration: 2200
      }
    });
    $('.circle_R>.circle').circleProgress({
      value: 0.35,
      size: 180,
      startAngle: Math.PI,
      thickness: 15,
      lineCap: "round",
      emptyFill: "rgba(67,96,160,0.5)",
      fill: {
        gradient: ["#44e5c5", "#00a2ff"]
      },
      animation: {
        duration: 2200
      }
    });
  },
  components: {
    'base-number': BaseNumber
  },
  props: ['showData'],
  watch: {
    showData(newV, oldV) {
      this.dataL = newV[0]
      this.dataR = newV[1]
    }
  }
}
</script>

<style lang="less" scoped>
.SemicircleProgressBar {
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
  .SemicircleProgressBarWarp {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 48%;
    background: url(../../../static/images/bg_with_title.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .SemicircleProgressBarTitle {
      position: absolute;
      font-size: 0.2rem;
      // font-weight: 700;
      color: white;
      top: 0.06rem;
      text-align: center;
    }
    .circle_pos {
      position: relative;
      width: 1.65rem;
      height: 0.8rem;
      overflow: hidden;
      margin-top: -0.15rem;
      background-repeat: no-repeat;
      background-position: center 0.45rem;
      .circle {
        height: 180px;
        width: 180px;
        position: absolute;
        border-radius: 50%;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 80px);
      }
    }
    .circle_pos.circle_L {
      background-image: url("../../../static/images/a_icon.png");
    }
    .circle_pos.circle_R {
      background-image: url("../../../static/images/b_icon.png");
    }
    .datas {
      position: absolute;
      bottom: 0.3rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      font-size: 0.16rem;
      color: #fff;
      padding: 0 0.05rem;
      span:not(.dot) {
        border: 0.02rem solid rgb(77, 102, 200);
        box-shadow: rgb(77, 102, 200) 0px 0px 0.1rem inset;
        padding: 0px 0.03rem;
      }
      span.dot {
        transform: translateY(0.05rem);
      }
      span {
        margin-left: 0.03rem;
      }
      i {
        font-style: normal;
        font-size: 0.14rem;
        margin-left: 0.03rem;
        transform: translateY(0.05rem);
        white-space: nowrap;
      }
    }
  }
}
</style>

