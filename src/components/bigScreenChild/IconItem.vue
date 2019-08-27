<template>
  <div id="iconC">
    <div class="iconItem" v-for="(item,index) in this.iconItemData" :key="index">
      <!-- <img class="icon" :src="item.icon" alt="icon"> -->
      <!-- <img class="icon" src="../../../static/icons/batch-execution.svg" alt="icon"> -->
      <div class="content">
        <p>{{item.text}}</p>
        <p>{{item.value}}</p>
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
<style lang="less">
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#iconC {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
      height: 0.25rem;
      text-align: center;
      // justify-content: center;

      p {
        color: @fontColor;
        margin-bottom: 0.1rem;
        font-size: 0.24rem;
      }
    }
  }
}
</style>
