<template>
  <div class="trade_rank">
    <div class="trade_rank_content">
      <!-- 交易金额 -->
      <span v-if="top5">
        交易金额Top5
        <br />(万元)
      </span>

      <div class="trade_rank_item" v-for="(item,index) in top5" :key="index">
        <div class="trade_rank_item_data" :data-name="item.type" :data-count="item.amount"></div>
        <div class="rank_circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top5: null
    }
  },
  mounted() {
    // this.getCircle()
  },
  methods: {
    getCircle() {
      let timer = setInterval(() => {
        if (this.top5 != null) {
          clearInterval(timer)
          let valNum = 0.8;
          $('.rank_circle').each((i, e) => {
            if ($('.rank_circle').eq(i).prev().data('count') == 0) {
              valNum = 0
            } else {
              valNum -= 0.1
            }
            $('.rank_circle').eq(i).circleProgress({
              value: valNum,
              size: 60,
              startAngle: 0,
              thickness: 2,
              fill: {
                gradient: ["#6179ff", "#8ebeff"]
              }
            })
          })
        }
      }, 800);;
    }
  },

  props: ['mapData'],
  watch: {
    mapData(nv, ov) {
      let temp = nv;
      for (let i = 0; i < temp.length; i++) {
        // temp[i].amount = (parseFloat(temp[i].amount) / 10000).toFixed(1) + ""
        temp[i].amount = parseInt(temp[i].amount)
      }
      this.top5 = temp
      this.getCircle()
    }
  }
}
</script>

<style lang="less" >
.trade_rank {
  position: absolute;
  top: 0.5rem;
  width: 100%;
  .trade_rank_content {
    display: flex;
    justify-content: flex-end;
    position: relative;
    span {
      font-size: 0.16rem;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      //   width: 1.9rem;
      text-align: right;
      text-indent: 0.15rem;
    }
    .trade_rank_item {
      width: 0.55rem;
      height: 0.55rem;
      background-image: url("../../../static/images/circle.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 0 0;
      margin-left: 0.1rem;
      position: relative;
      .trade_rank_item_data {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 0.02rem;
        width: 70%;
        background-color: #6985ff;
      }
      .trade_rank_item_data::before,
      .trade_rank_item_data::after {
        position: absolute;
        font-size: 0.12rem;
        height: 0.14rem;
        width: 100%;
        color: #fff;
        z-index: 99;
        text-align: center;
      }
      .trade_rank_item_data:before {
        content: attr(data-name);
        top: 0.02rem;
      }
      .trade_rank_item_data:after {
        content: attr(data-count);
        top: -0.16rem;
      }
      .rank_circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.55rem;
        height: 0.55rem;
        z-index: 99;
        canvas {
          position: absolute !important;
          top: 50%;
          left: 50%;
          transform: translate(-51%, -50%) rotate(-90deg);
          transform-origin: center center;
        }
      }
    }
    .trade_rank_item:last-child {
      margin-right: 0.15rem;
    }
  }
}
</style>