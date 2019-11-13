<template>
  <div id="realTimeList">
    <p>
      {{this.titleName}}
      <span v-html="time"></span>
    </p>
    <ul>
      <li
        v-for="(item,index) in reallist"
        :key="index"
        :style="{'display':index<9?'':'none'}"
      >{{item}}</li>
      <!-- <li>客户XXX,4月15日15:31分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:32分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:33分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:34分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:35分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:36分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:37分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:38分开户成功,设备型号XXX</li>-->
    </ul>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      time: '',
      titleName: '实时交易情况'
    }
  },
  methods: {
    getTime() {
      setInterval(() => {
        let now = new Date();
        this.time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' '
          + (now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours()) + ':'
          + (now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes()) + ":"
          + (now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds())
      });
    }
  },
  mounted() {
    this.getTime();
    //setInterval()
    var that = this
    setInterval(function () {

      var a = that.reallist;
      var b = that.reallist.shift()
      that.reallist.push(b)
      // console.log(b)
    }, 2000)

  },
  props: ['childClass', 'reallist']
};

</script>
<style lang="less" scoped>
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#realTimeList {
  width: 28.57vw;
  overflow: hidden;
  height: 100%;
  text-align: center;
  font-family: "PingFang SC";
  p {
    margin: 1.5% 1% 1.5% 0.15rem;
    color: white;
    // font-family: 'Arial';
    // font-weight: 550;
    font-size: 0.2rem;
    text-align: left;
    span {
      float: right;
      font-size: 0.16rem;
      margin-right: 0.1rem;
      margin-top: 0.05rem;
      font-weight: normal;
    }
  }

  ul {
    margin: 0 0.5%;
    list-style-type: none;
    // height: 3.8rem;
    overflow: hidden;
    // transform: translateY(-0.1rem);
  }

  li {
    margin-left: 0.1rem;
    margin-right: 0.15rem;
    padding: 1.5% 0;
    // font-size: 0.16rem;
    font-size: 0.14rem;
    text-align: left;
    color: @fontColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
