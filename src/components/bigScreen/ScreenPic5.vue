<template>
  <!-- @keyup.alt.79="show" -->
  <div class="SPEcontainer">
    <div class="logo"></div>
    <div class="title">{{ title }}</div>
    <div class="content">
      <div class="content-left">
        <div class="content-l-t">
          <!-- 普惠型小微企业贷款（增幅） | 左上 -->
          <div class="top_title">
            <span class="top-title l-top-title">普惠型小微企业贷款（增幅）</span>
          </div>
          <dynamicBar-chart :crightData="dynamicBarChartDate1"></dynamicBar-chart>
        </div>
        <div class="content-l-m">
          <!-- 普惠型小微企业贷款（按产品） | 左中 -->
          <div class="top_title">
            <span class="top-title l-top-title">普惠型小微企业贷款（按产品）</span>
          </div>
          <loan-pie :pieData="pieData"></loan-pie>
        </div>
        <div class="content-l-b">
          <!-- 普惠型小微企业贷款（户均余额） | 左下 -->
          <div class="top_title">
            <span>普惠型小微企业贷款（户均金额）</span>
          </div>
          <!-- v-if="everyMonthDate1.data.length" -->
          <!-- <dynamicBar-chart :crightData="everyMonthDate1"></dynamicBar-chart> -->
          <tendency-chart :sevenDayOpenAccountTendency="tendencyChartDate"></tendency-chart>
        </div>
      </div>
      <div class="content-center">
        <div class="content-mid-t">
          <!--  | 中上 -->
          <p>
            全行贷款增速 {{ topDate1.Percentage }}% , {{ topDate1.number
            }}{{ topDate1.unit }}
          </p>
          <p>
            全行涉农贷款增速 {{ topDate3.Percentage }}%, {{ topDate3.number
            }}{{ topDate3.unit }}
          </p>
          <p>
            全行小微贷款增速 {{ topDate2.Percentage }}%, {{ topDate2.number
            }}{{ topDate2.unit }}
          </p>
        </div>
        <div class="content-mid-m">
          <!-- 涉农贷款余额 | 中中 -->
          <div class="top_title">
            <span>涉农贷款余额</span>
          </div>
          <!-- <tendency-chart
            :sevenDayOpenAccountTendency="everyMonthDate2"
          ></tendency-chart> -->
          <dynamicBar-chart :crightData="dynamicBarChartDate2"></dynamicBar-chart>
        </div>
        <div class="content-mid-b">
          <!-- 移动支付势力图（广东）| 中下  -->
          <div class="top_title">
            <span>移动支付交易分布图（广东）</span>
          </div>
          <div class="l-mid-detail">
            <div class="l-mid-detai-item" v-text="
                tradeCountDataAvg.name +
                  ': ' +
                  tradeCountDataAvg.value +
                  tradeCountDataAvg.unit
              ">
              历史日均交易金额：424.45万
            </div>
            <div class="l-mid-detai-item" v-text="
                tradeCountDataMax.name +
                  ': ' +
                  tradeCountDataMax.value +
                  tradeCountDataMax.unit
              ">
              历史单日最高交易金额：1119.16万
            </div>
          </div>
          <GD-map :titleName="titleName4" :localMapValueData="localMapValueData1" style="position:absolute; margin-top:-3vh;"></GD-map>
          <!-- <div class="top_title">
            <span>温氏业务投放情况 </span>
          </div> -->
          <!-- <div class="trade_rank">
            <div class="trade_count">
              <span>金额Top5(万元)</span>
              <div
                class="trade_count_item"
                v-for="(item, index) in nationTradeValueTopM5"
                :key="index"
              >
                <div
                  class="trade_count_item_data"
                  :data-name="item.type"
                  :data-count="parseInt(item.value)"
                ></div>
                <div class="circle L"></div>
              </div>
            </div>
            <div class="trade_amount">
              <span>交易量Top5</span>
              <div
                class="trande_amount_item"
                v-for="(item, index) in nationTradeValueTopM5"
                :key="index"
              >
                {{ item.type }}{{ fixedNumber(item.amount) }}笔
              </div>
            </div>
          </div> -->
          <!-- <china-map-m
            :nationMapValueData="nationMapValueDataM"
            style="position: absolute;top:25%; height:42vh;"
          ></china-map-m> -->
        </div>
      </div>
      <div class="content-right">
        <div class="content-r-t">
          <!-- 温氏业务投放情况（广东）  | 右上 -->
          <div class="top_title">
            <span>温氏业务投放情况（广东）</span>
          </div>
          <div class="trade_rank">
            <div class="trade_count">
              <span>金额Top5(万元)</span>
              <div class="trade_count_item" v-for="(item, index) in GDTadeValueTop5" :key="index">
                <div class="trade_count_item_data" :data-name="item.name" :data-count="parseInt(item.value)"></div>
                <div class="circle L"></div>
              </div>
            </div>
            <div class="trade_amount">
              <span>交易量Top5</span>
              <div class="trande_amount_item" v-for="(item, index) in GDTadeAmountTop5" :key="index">
                {{ item.type }}{{ fixedNumber(item.amount) }}笔
              </div>
            </div>
          </div>
          <!-- :childClass="gdClass" -->
          <GD-map :titleName="titleName4" :localMapValueData="localMapValueData2" style="position: absolute; margin-top:-1vh; height:50;"></GD-map>
          <!-- <china-map :nationMapValueData="nationMapValueDataR"></china-map>
          <div class="nationMapTop5">
            <div class="nationMapTop5Title">Top5:</div>
            <p
              v-for="(item, index) in nationTradeValueTopR5"
              :key="index"
              v-text="index + 1 + '.' + item.type + ': ' + item.value + '%'"
            ></p>
          </div>
          <div class="tradeAmountSummary">
            <div class="tradeAmountHistory">
              <div
                v-for="(item, index) in historyTradeAmount"
                :key="index"
                v-text="item.name + ': ' + item.value + item.unit"
              ></div>
            </div>
            <div class="tradeAmountCurrent" v-if="false">
              <div
                v-for="(item, index) in currentTradeAmount"
                :key="index"
                v-text="item.name + ': ' + item.value + item.unit"
              ></div>
            </div>
          </div> -->
        </div>
        <div class="content-r-m">
          <div class="top_title">
            <span>温氏业务投放情况（梅州）</span>
          </div>
          <MZ-map :meizhouMapValueData="meizhouMapValueData" style="position: absolute; margin-top:-13vh;height:50vh"></MZ-map>
        </div>
        <div class="content-r-b">
          <!--  | 右下 -->
          <div class="top_title">
            <span> </span>
          </div>
          <!-- <div class="l-mid-detail">
            <div
              class="l-mid-detai-item"
              v-text="
                tradeCountDataAvg.name +
                  ': ' +
                  tradeCountDataAvg.value +
                  tradeCountDataAvg.unit
              "
            >
              历史日均交易金额：424.45万
            </div>
            <div
              class="l-mid-detai-item"
              v-text="
                tradeCountDataMax.name +
                  ': ' +
                  tradeCountDataMax.value +
                  tradeCountDataMax.unit
              "
            >
              历史单日最高交易金额：1119.16万
            </div>
          </div>
          <bar-chart :tradeCountData="tradeCountData"></bar-chart> -->
        </div>
      </div>
    </div>
    <!-- <page-switcher :prePagePath="'/screenpic4'" :nextPagePath="'/screenpic1'"></page-switcher> -->
    <page-switcher :prePagePath="prePage" :nextPagePath="nextPage"></page-switcher>
    <div v-show="isShow" class="importBox">
      <span @click="hide">X</span>
      <div class="submitform">
        <p><label>请选择该界面需要上传的数据文件：</label></p>
        <input type="text" name="textfield" id="textfield" class="txt" />
        <input type="button" class="btn" value="浏览..." />
        <input type="file" name="uploadFile" class="file" id="fileField" size="28" value="请选择文件" @change="handleFile" />
        <input id="submit" type="submit" class="btn" value="上传" @click="submitFile" />
      </div>
    </div>
  </div>
</template>
<script>
import PageSwitcher from "@/components/publicComponent/PageSwitch"; // 前进后退按钮控件
import LoanPie from "@/components/ScreenFive/LoanPie"; // 分类占比饼图
import BarChart from "@/components/ScreenFour/BarChart"; // 交易金额情况
import ChinaMap from "@/components/ScreenFour/ChinaMap"; // 全国地图
import GDMap from "@/components/ScreenOne/GDMap"; // 广东地图
import MZMap from "@/components/ScreenFive/MZMap"; // 梅州地图
import DynamicBarChart from "@/components/ScreenFive/DynamicBarChart";
import Tendency from "@/components/ScreenFive/Tendency";

export default {
  name: "ScreenPic5",
  data() {
    return {
      title: "普惠金融业务大屏",
      isShow: false,
      rank: ["①", "②", "③", "④", "⑤"],
      preTradeValueRank: [], // 上月交易金额排名
      preTradeAmountRank: [], // 上月交易笔数排名
      tradeCountData: {}, // 交易金额情况
      tradeCountDataAvg: {}, // 历史日均交易金额
      tradeCountDataMax: {}, // 历史单日最高交易金额
      tradeTimeDataMax: {},
      nationMapValueDataM: [],
      nationMapValueDataR: [],
      nationTradeValueTopM5: [],
      nationTradeValueTopR5: [],

      historyTradeAmount: {}, // 历史累计交易笔数
      currentTradeAmount: {}, // 2020年累计交易笔数
      tendencyChartDate: {},
      dynamicBarChartDate1: {},
      dynamicBarChartDate2: {},
      topDate1: {},
      topDate2: {},
      topDate3: {},
      pieData: {},
      titleName4: "广东省交易量情况（单位：笔数）",
      localMapValueData2: [],
      gdClass: {
        width: "90%",
        height: "100%"
      },
      GDTadeAmountTop5: [], // 广东交易笔数Top5
      GDTadeValueTop5: [], // 广东交易金额Top5

      localMapValueData1: [],

      meizhouMapValueData: [],

      prePage:'',
      nextPage:''
    };
  },
  components: {
    "page-switcher": PageSwitcher, // 前进后退按钮控件
    "bar-chart": BarChart, // 交易金额情况
    "china-map": ChinaMap, // 全国地图
    "china-map-m": ChinaMap,
    "dynamicBar-chart": DynamicBarChart, //动态数据柱状图
    "loan-pie": LoanPie, //分类占比饼图
    "tendency-chart": Tendency,
    "GD-map": GDMap, // 广东地图
    "MZ-map": MZMap // 梅州地图
  },
  methods: {
    // 格式化数字
    fixedNumber(num) {
      return Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .split(".")[0];
    },
    // 排序
    compare(prop) {
      return function(a, b) {
        var v1 = a[prop];
        var v2 = b[prop];
        return v1 - v2;
      };
    },
    getData() {
      this.$axios({
        url: this.$http.screenpic5.url, // 本地
        method: this.$http.screenpic5.method,
        data: {}

        // url: http://10.30.80.71:8100/usp_ks/tx/PHJR ,
        // method: "post",
        // data: {},
      }).then(res => {
        // 贷款增速
        this.topDate1 = res.data.topDate1;
        this.topDate2 = res.data.topDate2;
        this.topDate3 = res.data.topDate3;

        // 饼图数据
        this.pieData = res.data.pieData;

        // 移动支付业务金额情况
        // this.tradeCountData = this.fixedForm(res.data.tradeCount.data);
        // this.tradeCountDataAvg = res.data.tradeCount.avgTradeValue; // 历史日均交易金额
        // this.tradeCountDataMax = res.data.tradeCount.maxTradeValue; // 历史单日最高交易金额

        // 小微企业贷款（户均余额）
        this.tendencyChartDate = this.fixedForm(
          res.data.tendencyChartDate.data
        );

        // 小微企业贷款（增幅）
        this.dynamicBarChartDate1 = this.fixedForm(
          res.data.dynamicBarChartDate1.data
        );

        // 涉农贷款余额
        this.dynamicBarChartDate2 = this.fixedForm(
          res.data.dynamicBarChartDate2.data
        );

        // this.nationList = res.data.nationList; // 全国地图数据
        // 温氏业务投放情况
        // this.nationMapValueDataM = res.data.nationmapm;
        // 全国交易笔数前五名
        // this.nationTradeAmountTopM5 = this.nationMapValueDataM
        //   .sort(this.compare("amount"))
        //   .slice(-5)
        //   .reverse();
        // 全国交易金额前五名
        // this.nationTradeValueTopM5 = this.nationMapValueDataM
        //   .sort(this.compare("value"))
        //   .slice(-5)
        //   .reverse();

        // 支付交易分布图
        // this.nationMapValueDataR = res.data.nationmap;
        // 全国交易金额前五名
        // this.nationTradeValueTopR5 = this.nationMapValueDataR
        //   .sort(this.compare("value"))
        //   .slice(-5)
        //   .reverse();

        // this.historyTradeAmount = res.data.historyTradeAmount;
        // this.currentTradeAmount = res.data.currentTradeAmount;

        this.localMapValueData2 = res.data.localmap1; //广东地图
        // 广东交易笔数前五名
        this.GDTadeAmountTop5 = this.localMapValueData2
          .sort(this.compare("amount"))
          .slice(-5)
          .reverse();
        // 广东交易金额前五名
        this.GDTadeValueTop5 = this.localMapValueData2
          .sort(this.compare("value"))
          .slice(-5)
          .reverse();

        this.localMapValueData1 = res.data.localmap2; //移动支付交易分布（广东）
        this.tradeCountDataAvg = res.data.avgTradeValue; // 历史日均交易金额
        this.tradeCountDataMax = res.data.maxTradeValue; // 历史单日最高交易金额


        this.meizhouMapValueData = res.data.localmap3; //梅州地图
      });
    },
    // json的数据格式在转换
    fixedForm(data) {
      let obj = {},
        keys = [];
      data.forEach(e => (keys = keys.concat(Object.keys(e)))); // 先去重掉keys
      this.unique(keys).forEach(ele => {
        obj[ele] = data.map(val => val[ele]);
      });
      return obj;
    },
    // 去重
    unique(arr) {
      return arr.filter(function(item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
      });
    },
    setCarousel() {
      let timer = parseInt(sessionStorage.getItem("timer"));
      if (timer) {
        setTimeout(() => {
          this.$router.push({ name: "ScreenPic1" });
        }, 5 * 1000);
      }
    },
    showImportBox: function(e) {
      // document.onkeydown = e => {
      let keyCode = e.keyCode;
      if (event.altKey && event.keyCode == 79) {
        //Alt+O
        this.isShow = true;
        //alert(1);
      }
      // };
    },

    submitFile: function() {
      var uploadFile = new window.FormData();
      uploadFile.append(
        "uploadFile", //'userfile'是formData这个对象的键名,'userfile' 这个名字要和后台获取文件的名字一样;
        document.querySelector("input[type=file]").files[0]
      );
      this.$axios({
        // url: "http://10.30.80.71:8100/usp_ks/upload?schemeIDs=2&transCode=deal", //开发环境
        url: this.$http.upFile.url,
        method: this.$http.upFile.method,
        // url: "./upload?schemeIDs=2&transCode=deal",//生产环境
        // method: "post",
        data: uploadFile,
        headers: {
          "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundarywyNIu864hcWpAmsm"
        }
      }).then(res => {});
      this.isShow = false;
      // window.location.reload();
    },

    show: function() {
      this.isShow = true;
    },
    hide: function() {
      this.isShow = false;
    },

    handleFile: function() {
      var file = document.getElementById("fileField");
      var fileName = document.getElementById("textfield");
      fileName.value = file.value;
    }
  },
  mounted() {
    window.addEventListener("keydown", this.showImportBox);
    this.getData();
    window.chartTimer.screenAutoRefrash = setInterval(_ => {
      // 每十分钟更新一次
      this.getData();
    }, 60 * 1000 * 10);
    // this.$setCarousel("ScreenPic1");
    let curPageName = this.$route.path.replace('/',''); // 当前路由名称
        let carouselList = JSON.parse(sessionStorage.getItem('carouselList')); // 轮播顺序(carouselList)
        let curIndex = carouselList.indexOf(curPageName);
        if(curIndex == -1){
            return false;
        }
        else{
            if(curIndex == 0){ // 第一页
                this.$setCarousel(carouselList[1]); // 下一页为第二页
                this.nextPage = '/'+carouselList[1];
                this.prePage = '/'+carouselList[carouselList.length-1]; // 上一页为最后一页
            }
            else if(curIndex == carouselList.length-1){ // 最后一页
                this.$setCarousel(carouselList[0]); // 下一页为第一页
                this.nextPage = '/'+carouselList[0]; 
                this.prePage = '/'+carouselList[curIndex-1]; 
            }
            else{
                this.$setCarousel(carouselList[curIndex+1]); // 设置下一页
                this.nextPage = '/'+carouselList[curIndex+1];
                this.prePage = '/'+carouselList[curIndex-1]; 
            }
        }
  },
  // directives: {},
  watch: {
    "$store.state.currentTrade": function(newVal) {
      this.liveData = newVal;
    }
  },
  beforeDestroy() {
    console.log("555---页面5销毁");
  }
};

</script>
<style lang="less" scoped>
.top_title {
  font-size: 0.2rem;
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  text-align: left;
  text-indent: 0.15rem;
  padding: 0.05rem 0;

  .top_title_after::after {
    content: attr(attr-title);
    font-size: 15px;
    padding-left: 5px;
    position: absolute;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.SPEcontainer {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;

  .logo {
    background-image: url("../../../static/images/logo.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 1%;
    left: 1%;
    width: 100%;
    height: 6vh;
  }

  .title {
    background: url(../../../static/images/top3.png) no-repeat;
    background-size: 100% 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    font-size: 0.28rem;
    color: white;
    line-height: 0.45rem;
    // line-height: 1.05rem;
  }

  .content {
    width: 100vw;
    height: 90vh;
    padding: 1%;
    box-sizing: border-box;
    display: flex;

    .content-left {
      width: 30%;

      .content-l-t {
        // background: red;
        height: 27vh;
        margin-bottom: 0.1rem;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }

      .content-l-m {
        height: 30vh;
        margin-bottom: 0.1rem;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }

      .content-l-b {
        // background: pink;
        height: 27vh;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }
    }

    .content-center {
      width: 35%;
      margin: 0 0.1rem;
      display: flex;
      flex-direction: column;

      .content-mid-t {
        // background: blue;
        height: 15vh;

        p {
          height: 3.9vh;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 0.1rem #fff, 0 0 0.2rem #fff, 0 0 0.3rem #fff,
            0 0 0.4rem #00b7ff, 0 0 0.8rem #00ffff;
          margin-left: 0.15rem;
          white-space: nowrap;
          display: flex;
          font-size: 0.22rem;
        }
      }

      .content-mid-m {
        // background: skyblue;
        height: 26vh;
        margin-bottom: 0.1rem;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }

      .content-mid-b {
        // background: green;
        height: 52vh;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;

        .l-mid-detail {
          position: absolute;
          top: 15%;
          left: 1%;
          right: 10%;
          font-size: 0.16rem;
          color: rgba(255, 255, 255, 0.8);
          display: flex;

          .l-mid-detai-item {
            padding-left: 20px;
          }
        }

        .trade_rank {
          position: absolute;
          top: 10%;
          left: 2%;
          width: 95%;
          z-index: 99;

          .trade_amount,
          .trade_count {
            // background: red;
            display: flex;
            justify-content: flex-end;
            position: relative;
            margin-bottom: 0.1rem;

            span {
              font-size: 0.16rem;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              color: #fff;
            }

            // 交易金额
            .trade_count_item {
              // width: 16.66666%;
              width: 0.65rem;
              height: 0.65rem;
              background-image: url("../../../static/images/circle.png");
              background-repeat: no-repeat;
              background-size: contain;
              background-position: 0 0;
              margin-left: 0.15rem;
              position: relative;

              div.trade_count_item_data {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 0.02rem;
                width: 70%;
                background-color: #6985ff;
              }

              div.trade_count_item_data:before,
              div.trade_count_item_data:after {
                position: absolute;
                font-size: 0.12rem;
                height: 0.14rem;
                width: 100%;
                color: #fff;
                z-index: 99;
                text-align: center;
              }

              div.trade_count_item_data:before {
                content: attr(data-name);
                top: 0.02rem;
              }

              div.trade_count_item_data:after {
                content: attr(data-count);
                top: -0.16rem;
              }

              .circle {
                position: absolute;
                top: 0;
                left: 0;
                width: 0.65rem;
                height: 0.65rem;

                canvas {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(-90deg);
                  transform-origin: center center;
                }
              }
            }

            // 交易量
            .trande_amount_item {
              width: 0.65rem;
              height: 0.2rem;
              line-height: 0.2rem;
              text-align: center;
              font-size: 0.12rem;
              color: #fff;
              margin-left: 0.15rem;
              white-space: nowrap;
            }
          }
        }
      }
    }

    .content-right {
      width: 35%;

      .content-r-t {
        // background: yellow;
        height: 43vh;
        margin-bottom: 0.1rem;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;

        .trade_rank {
          position: absolute;
          top: 10%;
          left: 2%;
          width: 95%;
          z-index: 99;

          .trade_amount,
          .trade_count {
            // background: red;
            display: flex;
            justify-content: flex-end;
            position: relative;
            margin-bottom: 0.1rem;

            span {
              font-size: 0.16rem;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              color: #fff;
            }

            // 交易金额
            .trade_count_item {
              // width: 16.66666%;
              width: 0.65rem;
              height: 0.65rem;
              background-image: url("../../../static/images/circle.png");
              background-repeat: no-repeat;
              background-size: contain;
              background-position: 0 0;
              margin-left: 0.15rem;
              position: relative;

              div.trade_count_item_data {
                position: relative;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 0.02rem;
                width: 70%;
                background-color: #6985ff;
              }

              div.trade_count_item_data:before,
              div.trade_count_item_data:after {
                position: absolute;
                font-size: 0.12rem;
                height: 0.14rem;
                width: 100%;
                color: #fff;
                z-index: 99;
                text-align: center;
              }

              div.trade_count_item_data:before {
                content: attr(data-name);
                top: 0.02rem;
              }

              div.trade_count_item_data:after {
                content: attr(data-count);
                top: -0.16rem;
              }

              .circle {
                position: absolute;
                top: 0;
                left: 0;
                width: 0.65rem;
                height: 0.65rem;

                canvas {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(-90deg);
                  transform-origin: center center;
                }
              }
            }

            // 交易量
            .trande_amount_item {
              width: 0.65rem;
              height: 0.2rem;
              line-height: 0.2rem;
              text-align: center;
              font-size: 0.12rem;
              color: #fff;
              margin-left: 0.15rem;
              white-space: nowrap;
            }
          }
        }

        // .nationMapTop5 {
        //   position: absolute;
        //   top: 15%;
        //   right: 3%;
        //   font-size: 18px;
        //   color: #fff;
        //   .nationMapTop5Title {
        //     font-size: 30px;
        //   }
        //   p {
        //     padding: 5px 0;
        //   }
        // }
        // .tradeAmountSummary {
        //   position: absolute;
        //   left: 3%;
        //   bottom: 5%;
        //   font-size: 18px;
        //   color: #fff;
        //   .tradeAmountHistory,
        //   .tradeAmountCurrent {
        //     display: flex;
        //     div {
        //       padding-right: 25px;
        //     }
        //   }
        // }
      }

      .content-r-m {
        height: 42vh;
        margin-bottom: 0.1rem;
        background: url(../../../static/images/wrap_bg4.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
      }

      // .content-r-b {
      //   // background: orange;
      //   height: 20vh;
      //   background: url(../../../static/images/wrap_bg4.png) no-repeat;
      //   background-size: 100% 100%;
      //   position: relative;
      //   .l-mid-detail {
      //     position: absolute;
      //     top: 11%;
      //     right: 3%;
      //     font-size: 18px;
      //     color: #fff;
      //     display: flex;
      //     .l-mid-detai-item {
      //       padding-left: 20px;
      //     }
      //   }
      // }
    }
  }

  .importBox {
    width: 40%;
    height: 20%;
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 30%;
    border: 0.1rem solid #ccc;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0.05rem #fff, 0 0 0.1rem #00b7ff, 0 0 0.15rem #00ffff;
    font-size: 0.23rem;
    z-index: 999;

    span {
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
      width: 3%;
      height: 0.28rem;
      background-color: #ddd;
    }

    .submitform {
      margin: 7%;
      position: relative;

      p {
        margin-bottom: 0.13rem;
      }

      .txt {
        height: 30px;
        border: 1px solid #cdcdcd;
        width: 55%;
      }

      .btn {
        background-color: #fff;
        border: 1px solid #cdcdcd;
        height: 30px;
        width: 20%;
      }

      .file {
        position: absolute;
        top: 57%;
        right: 25%;
        height: 30px;
        opacity: 0;
        //opacity: 0.9;
        width: 20%;
      }
    }
  }
}

</style>
