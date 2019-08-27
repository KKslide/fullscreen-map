<template>
  <div id="iconC" :style="this.childClass">
    <div class='iconItem' v-for="(item,index) in this.iconItemData" :key="index">
      <img class="icon" :src="item.icon" alt="icon">
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
    console.log(this.iconItemData);
  },
  methods: {

  },
  props: ['childClass', 'iconItemData']
};

</script>
<style lang="less">
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#iconC {
  width: 100%;

  .iconItem {
    // margin-top: 3vh;
    width: 50%;
    display: inline-block;

    .icon {
      width: 2.5rem;
      height: 2.5rem;
    }

    .content {
      display: inline-block;
      width: 70%;
      height: 100%;
      text-align: left;

      p {
        color: @fontColor;
        font-size: 1rem
      }
    }
  }
}

</style>
