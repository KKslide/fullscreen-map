<template>
  <div :class="this.customClass">
    <!-- <span>1</span>
    <span>2</span>
    <span>3</span>
    <span class="dot">,</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span class="dot">.</span>
    <span>7</span>-->

    <span
      v-for="(item,index) in amount"
      :key="index"
      v-html="item"
      :class="item==','||item=='.'?'dot':''"
    ></span>

    <i class="unit" v-html="unit" style="white-space:nowrap;"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
      unit: null,
    }
  },
  mounted() {

  },
  methods: {
    //   格式化数字
    fixedNumber(data) {
      return Number(data).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    },
    setData(param) {
      if (param.unit.indexOf('元') != -1) {
        this.amount = this.fixedNumber(param.amount).split('')
      } else {
        this.amount = this.fixedNumber(param.amount).split('.')[0]
      }
      this.unit = param.unit;
    }
  },
  props: ['tradeData', 'toFixedNum', 'customClass'],
  watch: {
    // prop中的值是异步传过来的 需要watch
    tradeData(newVal, oldVal) {
      this.setData(newVal[0]);
    }
  }
}
</script>

<style lang="less" scoped>
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
    white-space: nowrap; // 我艹.. 为什么在这里加居然没用
  }
}
</style>