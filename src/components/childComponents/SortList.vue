<template>
  <div id="listS" :style="this.childClass">
    <div class="title">{{this.sortTitle}}</div>
    <div class='sortList' v-for="(item,index) in this.sortListData" :key="index">
      <span class="rank">{{item.rank}}</span>
      <img class="icon" :src="item.icon" alt="icon">
      <span class="sname">{{item.sname}}</span>
      <span class="svalue">{{item.svalue}}</span>
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
    console.log(this.sortListData);
  },
  methods: {

  },
  props: ['childClass', 'sortTitle', 'sortListData']
};

</script>
<style lang="less">
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);
@borderColor: rgba(255, 255, 255, 0.1);
@backgroundColor: rgba(255, 255, 255, 0.05);

#listS {
  width: 90%;
  text-align: left;
  margin: 0 5%;
  border: 0.1rem solid @borderColor;
  background: @backgroundColor;

  .title {
    height: 5vh;
    line-height: 5vh;
    color: @titleFontColor;
    background: @backgroundColor;
    font-size: 1rem;
  }

  .sortList {
    height: 3vh;
    margin-top: 0.5vh;
    background: @backgroundColor;


    .rank {
      width: 8%;
      display: inline-block;
      padding: 0.1vh 1%;
    }

    .icon {
      width: 8%;
      display: inline-block;
      height: 1rem;
    }

    .sname {
      width: 30%;
      display: inline-block;
      padding: 0.1vh 1%;
    }

    .svalue {
      width: 10%;
      display: inline-block;
      padding: 0.1vh 1%;
    }

    span {
      text-align: left;
      color: @fontColor;
      font-size: 0.9rem;
      font-weight: bold;
      height: 1rem;
      line-height: 1rem;
    }
  }
}

</style>
