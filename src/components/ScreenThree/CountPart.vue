<template>
  <div id="iconC">
    <div class="iconItem" v-for="(item,index) in iconItemData" :key="index">
      <div class="num_content">
        <p v-html="item.text"></p>
        <p v-translatex>
          <span
            v-for="(val,index) in item.value"
            :key="index"
            v-html="val"
            :class="val==','||val=='.'?'dot':''"
          >1</span>
          <i class="unit" v-html="item.unit"></i>
        </p>
      </div>
    </div>

    <!-- <div class="iconItem">
      <div class="content">
        <p>累计存款金额</p>
        <p>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span class="dot">,</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span class="dot">.</span>
          <span>7</span>
          <i class="unit">万元</i>
        </p>
      </div>
    </div>

    <div class="iconItem">
      <div class="content">
        <p>累计交易笔数</p>
        <p>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span class="dot">,</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <i class="unit">笔</i>
        </p>
      </div>
    </div>-->
  </div>
</template>
<script>
export default {
  name: "IconItem",
  data() {
    return {
      fixedData: null
    }
  },
  mounted() {

  },
  methods: {
    formatData(param) {
      let _data = param;
      _data.forEach((v, i) => {
        v.value = v.value.split('');
      });
      return _data;
    }
  },
  props: ['iconItemData'],
  watch: {
    iconItemData(nv, ov) {
      this.fixedData = this.formatData(nv)
    }
  },
  directives: {
    translatex: {
      inserted(el) {
        let eleChildrenNodes = el.children
        for (let i = 0; i < eleChildrenNodes.length; i++) {
          if (eleChildrenNodes[i].innerHTML == "元" || eleChildrenNodes[i].innerHTML == "万元") {
            el.style.transform = "translateX(0.15rem)";
          }
        }
      },
    }
  }
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

    .num_content {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      display: inline-block;
      width: 100%;
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
          // margin-left: 0.03rem;
        }
        span.dot {
          transform: translateY(0.03rem);
          margin-right: -0.01rem;
        }
        span {
          margin-left: 0.03rem;
        }
        i {
          font-style: normal;
          font-size: 0.14rem;
          // margin-left: 0.03rem;
          // transform: translateY(0.035rem);
        }
      }
    }
  }
}
</style>
