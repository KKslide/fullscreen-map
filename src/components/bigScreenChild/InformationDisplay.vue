<template>
  <div class="inform" :style="this.childClass">
    <div class="inform-title">
      <span>{{this.titleName}}</span>
      <span style="font-size:0.2rem;">{{this.preDate}}</span>
    </div>
    <div class="inform-content">
      <div v-for="(item,index) in informList" :key="index">
        <span>{{item.type}}</span>
        <span class="inform-num">
          <span class="inform-num-cout">
            <span v-for="(items,i) in item.amount.split('')" :key="i">
              <span
                :style="{'border':items>=0?'0.02rem solid #4d66c8':'',
											'-webkit-box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'-moz-box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
							}"
              >{{items}}</span>
            </span>
          </span>
          <span class="inform-num-unit">{{item.unit}}</span>
        </span>
      </div>
      <!-- <div><span>总贷款余额</span><span>123</span></div>
			<div><span>总贷款余额</span><span>123</span></div>
			<div><span>总贷款余额</span><span>123</span></div>
			<div><span>总贷款余额</span><span>123</span></div>
      <div><span>总贷款余额</span><span>123</span></div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationDisplay',
  data() {
    return {
      preDate: this.getPreDate()
    };
  },
  methods: {
    getPreDate() {
      Date.prototype.format = function (format) {
        var args = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

          "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
          var n = args[i];

          if (new RegExp("(" + i + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
      };
      let curDate = new Date();
      let preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
      return preDate.format('yyyy-MM-dd');
    },

  },
  mounted() {
    // 			setTimeout(()=>{
    // 				// console.log(this.informList)
    // 				for(var i = 0 ;i<this.informList.length;i++){
    // 					console.log(this.informList[i].amount.split(''))
    // 				}
    // 			},800)

  },
  props: ['childClass', 'titleName', 'informList']

}
</script>

<style lang="less">
.inform {
  // 		width: 100%;
  // 		height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .inform-title {
    width: 100%;
    font-size: 0.28rem;
    margin-top: 1%;
    color: white;
    display: flex;
    justify-content: center;
  }
  .inform-content {
    font-size: 0.2rem;
    color: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 0.15rem;
      > span {
        margin-bottom: 1%;
        flex: 1;
      }
      .inform-num {
        display: flex;
        width: 100%;
        justify-content: center;
        margin: 0 5%;
        .inform-num-cout {
          display: flex;
          width: 80%;
          justify-content: flex-end;
          > span {
            padding: 1%;
            box-sizing: border-box;
            > span {
              text-align: right;
              padding: 5% 10%;
              box-sizing: border-box;
            }
          }
        }
        .inform-num-unit {
          width: 20%;
          margin-left: 0.1rem;
        }
      }
    }
  }
}
</style>
