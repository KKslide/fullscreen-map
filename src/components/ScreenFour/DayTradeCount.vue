<template>
  <div id="dayTradecount" class="inform">
    <div class="inform-title">
      <span style="opacity:0">{{this.titleName}}</span>
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
  data() {
    return {
      titleName: '当天交易量',
      informList: [
        {
          "amount": "416.5",
          "unit": "万元",
          "type": "交易金额"
        },
        {
          "amount": "5324",
          "unit": "笔",
          "type": "交易笔数"
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.inform {
  margin-left: 2.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .inform-title {
    width: 100%;
    font-size: 0.26rem;
    /*margin-top: 1%;*/
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0.2rem;
  }
  .inform-content {
    font-size: 0.2rem;
    color: white;
    width: 100%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.3rem 0 0.4rem;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.05rem;
      > span {
        margin-bottom: 1%;
        flex: 1.5;
        text-align: left;
        font-size: 0.28rem;
        i {
          //color: #2fb9ea;
          color: #4d66c8;
          width: 0.35rem;
          height: 0.35rem;
          font-size: 0.32rem;
          text-align: center;
          line-height: 0.35rem;
        }
      }
      .inform-num {
        display: flex;
        width: 100%;
        flex: 2.5;
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
              font-size: 0.24rem;
            }
          }
        }
        .inform-num-unit {
          flex: 1;
          margin-left: 0.1rem;
          font-size: 0.2rem;
		  line-height: 0.3rem;
		  transform: translateY(.1rem);
        }
      }
    }
  }
}
</style>
