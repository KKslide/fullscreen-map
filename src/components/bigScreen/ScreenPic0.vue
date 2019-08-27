<template>
	<div class="SPOcontainer">
		<div class="title">
			{{title}}
		</div>
		
		<div class="content">
			<div class="content-l-wrap">
				<div class="content-l-wrap-t">
					<div class="content-l-wrap-t-title">创业贷</div>
					<div class="content-l-wrap-t-count" v-for="(item,index) in worklist" :key="index" v-if="item.scale==''">
						<span >{{item.type}}</span>
						<span>{{item.amount}}{{item.unit}}</span>
					</div>
					<!-- 进度条 -->
					<div class="content-l-wrap-t-pro" v-for="(item,index) in worklist" :key="index" v-if="item.scale!=''"
						:style="{'margin-top':index==3?'.2rem':''}">
						<div class="progress-l">{{item.type}}</div>
						<div class="progress">
							<div class="bar" :style="{
							'width':item.scale + '%',
							 }"
							></div>
						</div>
						<div class="progress-r">{{item.amount}}{{item.unit}}</div>
					</div>
				</div>
				<div class="content-l-wrap-m">
					<pictorialBar-chart :childClass2="childClass2"
										:crightData="workCrightData"></pictorialBar-chart>
				</div>
				<div class="content-l-wrap-b">
					<realTime-list :childClass="childClass1"
									:titleName="titleName"
									:reallist = workreallist
									></realTime-list>
				</div>
			</div>
			<div class="content-mid-wrap">
				<div class="content-mid-wrap-t">
					<div class="content-mid-wrap-t-content">
						<semicircleProgress-bar 
												:showData = showData
												
						>
						</semicircleProgress-bar>	
					</div>
					<div class="maptitle">
						<span>全国交易分布情况</span>
					</div>
				</div>
				<div class="content-mid-wrap-b">
					<div class="map">
						<china-map :childClass="childClass3" 
									:nationMapValueData = nationMapValueData
									></china-map>
					</div>
				</div>
			</div>
			<div class="content-l-wrap">
				<div class="content-l-wrap-t">
					<div class="content-l-wrap-t-title">惠农贷</div>
					<div class="content-l-wrap-t-count" v-for="(item,index) in worklist" :key="index" v-if="item.scale==''">
						<span>{{item.type}}</span>
						<span>{{item.amount}}{{item.unit}}</span>
					</div>
					<!-- 进度条 -->
					<div class="content-l-wrap-t-pro" v-for="(item,index) in farmlist" :key="index" v-if="item.scale!=''"
						:style="{'margin-top':index==3?'.2rem':''}">
						<div class="progress-l">{{item.type}}</div>
						<div class="progress">
							<div class="bar1" :style="{
							'width':item.scale + '%',
							}"
							v-if="index%2==0"
							></div>
							<div class="bar2" :style="{
							'width':item.scale + '%',
							}"
							v-if="index%2!=0"
							></div>
						</div>
						<div class="progress-r">{{item.amount}}{{item.unit}}</div>
					</div>
				</div>
				<div class="content-l-wrap-m">
					<pictorialBar-chart :childClass2="childClass2"
										:crightData="farmCrightData"></pictorialBar-chart>
				</div>
				<div class="content-l-wrap-b">
					<realTime-list :childClass="childClass1"
									:titleName="titleName"
									:reallist = farmreallist
									></realTime-list>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import RealTimeList from '@/components/bigScreenChild/RealTimeList';
	import PictorialBarChart from '@/components/bigScreenChild/PictorialBarChart'
	import SemicircleProgressBar from '@/components/bigScreenChild/SemicircleProgressBar'
	import ChinaMap from '@/components/bigScreenChild/ChinaMap';
	export default {
		name:'ScreenPic0',
		data() {
			return {
				childClass1: {
					width: '100%',
					height: '10vh'
				},
				childClass2: {
					width: '100%',
					height: '30vh'
				},
				childClass3: {
					width: '100%',
					height: '50vh'
				},
				
				//总贷款余额,总客户数
				showData:[],
				
				
				
				//近7天的交易趋势数据,
				workCrightData: {
					dataX: [],
					data1: [],
				},
				farmCrightData: {
					dataX: [],
					data1: [],
				},
				
				
				
				//进度条数据(创业贷,惠农贷)
				
				worklist:[
					
					],
				
				farmlist:[
					
					],
					
				//实时信息数据
				workreallist:[
					
					
				],
				
				farmreallist:[
					
				],
				nationMapValueData:[],
						
				titleName: '实时开户简报',
				title:"供应链金融",

			};
		},
		components: {
			
			'realTime-list': RealTimeList,
			'pictorialBar-chart': PictorialBarChart,
			'semicircleProgress-bar':SemicircleProgressBar,
			'china-map': ChinaMap,
		},
		mounted() {
		
		
		
		this.$axios({
			url:"./static/json/aa.json",
			method:"get",
			//url:"http://10.30.3.13:8081/usp_ks/tx/GYL",
			//url:"./tx/GYL",
			//method:"post",
			data:{
				
			},
		}).then(res=>{
				
				console.log(res.data);
				
				this.showData = res.data.showData;
				
				var workdataX = [];
				var workdata1 = [];
				var farmdataX = [];
				var farmdata1 = [];
				var workreallistdata = [];
				var farmreallistdata = [];
				
					
				for( var i = 0 ; i<res.data["7day_CY"].length ; i++){
					workdataX.push(res.data["7day_CY"][i].date);
					workdata1.push(res.data["7day_CY"][i].amount);
				}				
				
				this.workCrightData.dataX = workdataX 
				this.workCrightData.data1 = workdata1
				
				
				for( var i = 0 ; i<res.data["7day_HN"].length ; i++){
					farmdataX.push(res.data["7day_HN"][i].date)
					farmdata1.push(res.data["7day_HN"][i].amount)
				}
				
				this.farmCrightData.dataX = farmdataX
				this.farmCrightData.data1 = farmdata1
				
				this.nationMapValueData = res.data.map
				
				this.worklist = res.data.list_CY
				
				this.farmlist = res.data.list_HN
				
				
				
				
				for (var i = 0; i<res.data.realist_CY.length; i++){
					var a = res.data.realist_CY[i]
					workreallistdata.push(a.address + a.name + a.sex +"," +"申请一笔"+ a.type +"产品,金额" + a.amount+"元")
				}
				
				this.workreallist = workreallistdata
				
				for (var i = 0; i<res.data.realist_HN.length; i++){
					var a = res.data.realist_HN[i]
					farmreallistdata.push(a.address + a.name + a.sex +"," +"申请一笔"+ a.type +"产品,金额" + a.amount+"元")
				}
				
				this.farmreallist = farmreallistdata
				
		}).catch(res=>{
				
		})
				
				
			
		}
	}
</script>

<style lang="less">
	.SPOcontainer {
	  width: 100%;
	  height: 100vh;
	 
	  // text-decoration: none;
// 	  margin: 0;
// 	  padding: 0;
	  background: url(../../../static/images/bg.png);
	  background-size: 100% 100%;
	  overflow: hidden;
	  box-sizing: border-box;
	  .title{
			background: url(../../../static/images/top1.png) no-repeat;
			background-size: 100% 100%;
			height: 10vh;
			display: flex;
			justify-content: center;
			font-size: .28rem;
			color: white;
			line-height: .45rem;
			
	   }
	   .content{
		   width: 100%;
		   height: 90vh;
		   // background: red;
		   padding: 1%;
		   box-sizing: border-box;
		   display: flex;
		   .content-l-wrap{
			   flex: 1;
			   display: flex;
			   flex-direction: column;
			  
			   .content-l-wrap-t{
				   flex: 1;
				   background:url(../../../static/images/rectangle.png) no-repeat;
				   background-size: 100% 100%;
				   text-align: center;
				   .content-l-wrap-t-title{
					   font-size:0.24rem;
					   color: white;
				   }
				   .content-l-wrap-t-count{
					   font-size:0.24rem;
					   color: white;
					   display: flex;
					   justify-content: space-around;
					   margin-top: 0.1rem;
				   }
				   .content-l-wrap-t-pro{
					  margin-top: .1rem;
						display: flex;
						font-size:0.14rem;
						color: white;
						justify-content: center;
						align-items: center;
						.progress-l,.progress-r{
							flex: 1;
						}
					   /* 进度条 */
						.progress {
						 flex: 3;
						 width: 3rem;
						 // margin: 10px auto;
						 height: 0.2rem;
						 line-height:0.2rem;
						 // font-size: 14px;
						 background: #4360a0;
						 border-radius: 0.1rem;
						 box-shadow: inset 0 .01rem .02rem rgba(0, 0, 0, 0.1);
						}
						.bar{
						 float: left;
// 						 width: 90%;
						 // -webkit-gradient(linear, left top, right top, from(#44e5c5), to(#00a2ff));
						 background: linear-gradient(left,#479df6,#f95e74);
						 background: -webkit-linear-gradient(left,#479df6,#f95e74);
						 height: 100%;
						 border-radius: 0.1rem ;
						 // transition:all 2s;
						animation:load 2s linear;
						}
						@keyframes load{
							0%{
								width: 0%;
							}
						}
						.bar1 {
							 float: left;
	// 						width: 90%;
							 background: linear-gradient(left,#f7c368,#fc4b4b);
							 background: -webkit-linear-gradient(left,#f7c368,#fc4b4b);
							 height: 100%;
							 border-radius: 0.1rem ;
							 animation:load 2s linear;
							 
							}
						.bar2 {
							float: left;
	// 						 width: 90%;
							background: linear-gradient(left,#44e5c5,#00a2ff);
							background: -webkit-linear-gradient(left,#44e5c5,#00a2ff);
							height: 100%;
							border-radius: 0.1rem ;
							animation:load 2s linear;
							
							}
					}

			   }
			   .content-l-wrap-m{
			   	flex: 1;
					// background: yellow;
					background:url(../../../static/images/rectangle.png) no-repeat;
					background-size:100% 100%;
					// margin: 1% 0 0.5%;
			   }
			   .content-l-wrap-b{
			   	flex: 1;
				background: orange;
				height: 39vh;
				font-size:0.14rem ;
				background:url(../../../static/images/rectangle.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;
				
			   }
			   
		   }
		   .content-mid-wrap{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 2%;
				box-sizing: border-box;
				// background: #F7F7F7;
				.content-mid-wrap-t{
					flex: 1;
					display:flex;
					justify-content: space-between;
					align-items: center;
					flex-direction: column;
					flex-wrap: wrap;
					
					.content-mid-wrap-t-content{
						width: 100%;
						height: 1.8rem;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.maptitle{
						width: 90%;
						height: .5rem;
						background:url(../../../static/images/title.png) no-repeat;
						background-size:100% 100%;
						display: flex;
						font-size: 0.26rem;
						color: white;
						justify-content: center;
						align-items: center;
					}
				}
				.content-mid-wrap-b{
					flex: 2;
					display: flex;
					justify-content: center;
					align-items: center;
					.map{
						width: 100%;
					}
					// background: gray;
				}
		   }

		}  
	}
</style>
