<template>
  <div class="SemicircleProgressBar">
    <div v-for="(item,index) in list" :key="index" class="SemicircleProgressBarWarp" >
			<div class="SemicircleProgressBarTitle">{{item.title}}</div>
			<div class="whz">
					<div class="fzsj" 
					:style="{'background': 'url('+item.img+') no-repeat','background-size':'100% 100%'}"></div>
					<div class="wbhz"></div>
					<div class="d1" :style="{'border':item.pro,'border-bottom':'none','transform':'rotate(' + (180 * item.cout - 180) + 'deg)'}"><span class="dwy"></span>
				</div>
			</div>
			<div class="SemicircleProgressBar-count">
				<span>{{item.amount}}</span>
				<span>{{item.unit}}</span>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SemicircleProgressBar',
  data() {
    return {

      list: [{ "cout": "", "pro": ".15rem solid #fc4b4b", "img": "./static/images/money.png", "title": "总贷款余额", "unit": "元", "amount": "" },
      { "cout": "", "pro": ".15rem solid #00a2ff", "img": "./static/images/custom.png", "title": "总客户数", "unit": "户", "amount": "" }]
    };
  },
  mounted() {

    setTimeout(() => {
      console.log(this.showData)
      for (var j = 0; j < this.showData.length; j++) {
        this.list[j].cout = Number(this.showData[j].scale);
        this.list[j].unit = this.showData[j].unit;
        this.list[j].title = this.showData[j].type;
        this.list[j].amount = this.showData[j].amount;
        console.log(this.list[j].title)
      }
    }, 800)




    // 			for(var i =0 ; i<this.list.length; i++){
    // 				var ddc = this.list[i].cout;
    // 				var cfbl = 180 * ddc - 180;
    // 				var a = document.getElementsByClassName("d1")[i];
    // 				a.style.transform = "rotate(" + (cfbl) + "deg)";
    // 			}

  },
  props: ['showData']
}
</script>

<style lang="less">
.wbhz {
  box-sizing: border-box;
  border: 0.15rem solid #4360a0;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  width: 1.6rem;
  height: 0.8rem;
  border-bottom: none;
}

.d1 {
  position: relative;
  top: -0.8rem;
  z-index: 10;
  height: 0.8rem;
  width: 1.6rem;
  // border:.15rem solid #f7c368;
  // border:.15rem solid #fc4b4b;
  // 		background: linear-gradient(0deg,#f7c368,#fc4b4b);
  // 		border:linear-gradient(0deg,#479df6,#f95e74) ;
  box-sizing: border-box;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  // border-bottom:none;
  transform-origin: 50% 100%;
  //transform:rotate(-180deg);
  // transition:all 2s;
  animation: load1 3s;
}
@keyframes load1 {
  0% {
    transform: rotate(-180deg);
  }
}
.whz {
  width: 1.6rem;
  height: 0.8rem;
  overflow: hidden;
  position: relative;
}
.fzsj {
  height: 50%;
  text-align: center;
  position: absolute;
  top: 0.3rem;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 30%;
}

.SemicircleProgressBar-count {
  font-size: 0.24rem;
  color: white;
  display: flex;
  justify-content: space-around;
  margin-top: 0.1rem;
}

.SemicircleProgressBar {
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
}

.SemicircleProgressBarWarp {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 48%;
  background: url(../../../static/images/square.png) no-repeat;
  background-size: 100% 100%;
  .SemicircleProgressBarTitle {
    font-size: 0.24rem;
    color: white;
  }
}

// 	.dwy {
// 		width:.16rem;
// 		height:.16rem;
// 		border-radius:50%;
// 		background:chartreuse;
// 		position:absolute;
// 		right:-.13rem;
// 		bottom:-.03rem;
// 	}
</style>
