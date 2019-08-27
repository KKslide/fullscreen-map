<template>
  <div id='realTimeList' :style="this.childClass">
    <p>{{this.titleName}}</p>
    <ul>
      <li>客户XXX,4月15日15:30分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:31分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:32分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:33分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:34分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:35分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:36分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:37分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:38分开户成功,设备型号XXX</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {

    }
  },
  methods: {

  },
  props: ['childClass', 'titleName']
};

</script>
<style lang="less">
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#realTimeList {
  width: 100%;
  height: 50vh;
  text-align: center;

  p {
    margin: 1% 1%;
    color: @titleFontColor;
    fontFamily: 'Arial';
    fontWeight: none;
    font-size: 1.1rem;
  }

  ul {
    margin: 0 0.5%;
    list-style-type: none;
  }

  li {
    padding: 0.5% 0;
    color: @fontColor;
  }
}

</style>
