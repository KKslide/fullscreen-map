<template>
  <div class="inform" :style="this.childClass">
    <div class="inform-title">
      <!--<img class="icon" src="../../../static/icons/zaikubishudaibaoguanchaxun.svg" alt="icon" style="width: 0.4rem">-->
      <span>{{this.titleName}}</span>
	  &nbsp;
      <span style="font-size:0.2rem;">({{this.preDate}})</span>
    </div>
    <div class="inform-content">
      <div v-for="(item,index) in informList" :key="index">
        <span :style="{'display':'flex','justify-content': 'flex-start','align-items': 'center'}">
          <i class="iconfont icon-renshutongji" v-if="index==1"></i>
          <i class="iconfont icon-tubiaozhizuo-" v-if="index%2==0"></i>
          <i class="iconfont icon-zaikubishudaibaoguanchaxun" v-if="index%2!=0&&index!=1"></i>
          <!-- <img class="icon" src="../../../static/icons/yonghu_1.svg" alt="icon" style="width: 0.3rem" v-if="index==1"> -->
          <!-- <img class="icon" src="../../../static/icons/leijishouyi.svg" alt="icon" style="width: 0.3rem" v-if="index%2==0">
          <img class="icon" src="../../../static/icons/rank_and_window.svg" alt="icon" style="width: 0.3rem" v-if="index%2!=0&&index!=1">-->
          <span>{{item.type}}</span>
        </span>
        <span class="inform-num" v-if="index%2==0">
          <span class="inform-num-cout">
            <span
              v-for="(items,i) in Number(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('')"
              :key="i"
              :style="{'padding':items>=0?'0 0.02rem':'0 0.005rem'}"
            >
              <span
                :style="{'border':items>=0?'0.02rem solid #4d66c8':'',
											'-webkit-box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'-moz-box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'padding':items>=0?'0 0.03rem':'',
							}"
              >{{items}}</span>
            </span>
          </span>
          <span class="inform-num-unit">{{item.unit}}</span>
        </span>
        <span class="inform-num" v-if="index%2!=0">
          <span class="inform-num-cout">
            <span
              v-for="(items,i) in Number(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0].split('')"
              :key="i"
              :style="{'padding':items>=0?'0 0.02rem':'0 0.005rem'}"
            >
              <span
                :style="{'border':items>=0?'0.02rem solid #4d66c8':'',
											'-webkit-box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'-moz-box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'box-shadow':items>=0?'0px 0px 0.1rem #4d66c8 inset':'',
											'padding':items>=0?'0 0.03rem':'',
							}"
              >{{items}}</span>
            </span>
          </span>
          <span class="inform-num-unit">{{item.unit}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationDisplay',
  data() {
    return {
		preDate:this.getPreDate()
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
    // 			
    // 				console.log(Number(this.informList[0].amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split(".")[0].split(''))
    // 			},800)

  },
  props: ['childClass', 'titleName', 'informList']

}
</script>

<style lang="less">
.inform {
  // 		width: 100%;
  // 		height: 100%;
  margin-left: 2.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .inform-title {
    width: 100%;
    font-size: 0.22rem;
    /*margin-top: 1%;*/
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .inform-content {
    font-size: 0.2rem;
    color: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.05rem;
      > span {
        margin-bottom: 1%;
        flex: 1;
        text-align: left;
        font-size: 0.16rem;
        i {
          //color: #2fb9ea;
          color: #4d66c8;
          width: 0.3rem;
          height: 0.3rem;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.31rem;
        }
      }
      .inform-num {
        display: flex;
        width: 100%;
        flex: 2;
        .inform-num-cout {
          display: flex;
          flex: 4;
          justify-content: flex-end;
          align-items: center;
          > span {
            box-sizing: border-box;
            > span {
              text-align: right;
              box-sizing: border-box;
              font-size: 0.16rem;
            }
          }
        }
        .inform-num-unit {
          flex: 1;
          margin-left: 0.1rem;
          font-size: 0.04rem;
          line-height: 0.3rem;
        }
      }
    }
  }
}
</style>
