<template>
  <div id="iconC">
    <div class="iconItem">
      <div class="content">
        <p>累计开户数量</p>
        <p>
          <span>3</span>
          <span class="dot">,</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <i class="unit">个</i>
        </p>
      </div>
    </div>

    <div class="iconItem">
      <div class="content">
        <p>近7日开户数量</p>
        <p>
          <span>5</span>
          <span>6</span>
          <i class="unit">个</i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IconItem",
  data() {
    return {

    }
  },
  mounted() {
    // console.log(this.iconItemData);
  },
  methods: {

  },
  props: ['iconItemData']
};

</script>
<style lang="less" scoped>
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#iconC {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  .iconItem {
    width: 50%;
    display: inline-block;
    text-align: center;
    .icon {
      width: 0.25rem;
      height: 0.25rem;
    }

    .content {
      // 			display: flex;
      // 			justify-content: center;
      // 			align-items: center;
      display: inline-block;
      width: 70%;
      text-align: center;
      // justify-content: center;

      p {
        color: @fontColor;
        margin-bottom: 0.2rem;
        font-size: 0.22rem;
      }
      p:last-child {
        font-size: 0.16rem;
        margin-bottom: 0;
        span:not(.dot) {
          border: 0.02rem solid rgb(77, 102, 200);
          box-shadow: rgb(77, 102, 200) 0px 0px 0.1rem inset;
          padding: 0px 0.02rem;
        }
        span.dot {
          transform: translateY(0.03rem);
        }
        span {
          // margin-left: 0.05rem;
        }
        i {
          font-style: normal;
          font-size: 0.14rem;
          margin-left: 0.05rem;
          transform: translateY(0.035rem);
        }
      }
    }
  }
}
</style>
