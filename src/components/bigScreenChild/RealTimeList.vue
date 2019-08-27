<template>
  <div id='realTimeList' :style="this.childClass">
    <p>{{this.titleName}}</p>
    
		<ul>
      <li v-for="(item,index) in reallist" :key="index">{{item}}</li>
      <!-- <li>客户XXX,4月15日15:31分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:32分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:33分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:34分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:35分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:36分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:37分开户成功,设备型号XXX</li>
      <li>客户XXX,4月15日15:38分开户成功,设备型号XXX</li> -->
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
	mounted() {
		//setInterval()
		var that = this
		setInterval(function(){
			
			var a = that.reallist;
			var b = that.reallist.shift()
			that.reallist.push(b)
			// console.log(b)
		},2000)
		
		// console.log(123)
	},
  props: ['childClass', 'titleName','reallist']
};

</script>
<style lang="less">
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#realTimeList {
  width: 100%;
  // height: 50vh;
  text-align: center;
	font-family: "PingFang SC";
  p {
    margin:  3% 1% 3%;
    color: white;
    // font-family: 'Arial';
    // font-weight: 500;
    font-size: 0.28rem;
  }

  ul {
    margin: 0 0.5% ;
    list-style-type: none;
		
		height: 3.8rem;
		overflow: auto;
  }

  li {
		margin-left:0.1rem ;
    padding: 1.5% 0;
		font-size:0.2rem ;
		text-align: left;
    color: @fontColor;
  }
}

</style>
