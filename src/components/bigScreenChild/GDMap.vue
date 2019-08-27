<template>
  <div id="GDmap" ref="GDmap" :style="this.childClass">
  </div>
</template>
<script>
//import '../../../node_modules/echarts/map/js/china.js'; // 引入中国地图数据
import '../../../node_modules/echarts/map/js/province/guangdong.js'; // 引入广东地图数据
//import '../../js/echarts-all.js'; 
//import '../../js/china.js'; 
//import '../../js/guangdong.js'; 

export default {
  name: 'GuangdongMap',
  data() {
    return {
      titleFontColor: 'white',
      mapColor: [] ,
      list:[],
      title :'',
    }
  },
  created() {
    // setInterval(this.getMap,5000);
     
  },
  mounted() {
		 setTimeout(()=>{
		 	//console.log(this.localMapValueData);
		 this.getMap();
		 this.dataList();
		 },800)
  },
  methods: {
  	
  	dataList(){
  		var geoCoordMapList = [
      		{name:'云浮市', geoCoord:[112.02, 22.93]},
          {name:'梅州市', geoCoord:[116.1, 24.55]},
          {name:'汕尾市', geoCoord:[115.375279, 22.786211]},
          {name:'潮州市', geoCoord:[116.63, 23.68]},
          {name:'汕头市', geoCoord:[116.69, 23.39]},
          {name:'湛江市', geoCoord:[110.359377, 21.270708]},
          {name:'揭阳市', geoCoord:[116.35, 23.55]},
          {name:'东莞市', geoCoord:[113.75, 23.04]},
          {name:'韶关市', geoCoord:[113.62, 24.84]},
          {name:'广州市', geoCoord:[113.23, 23.16]},
          {name:'清远市', geoCoord:[113.01, 23.7]},
          {name:'中山市', geoCoord:[113.38, 22.52]},
          {name:'深圳市', geoCoord:[114.07, 22.62]},
          {name:'珠海市', geoCoord:[113.52, 22.3]},
          {name:'佛山市', geoCoord:[113.11, 23.05]},
          {name:'茂名市', geoCoord:[110.88, 21.68]},
          {name:'阳江市', geoCoord:[111.95, 21.85]},
          {name:'惠州市', geoCoord:[114.4, 23.09]},
          {name:'湛江市', geoCoord:[109.48,20.88]},
          {name:'江门市', geoCoord:[113.06, 22.61]},
          {name:'茂名市', geoCoord:[110.72912479740677,22.271832252836305]},
          {name:'云浮市', geoCoord:[111.51895018908698,23.085234521880068]},
          {name:'肇庆市', geoCoord:[111.86081491085895,23.748334197730955]},
          {name:'清远市', geoCoord:[112.3559293354943,24.897706969205828]},
          {name:'韶关市', geoCoord:[113.33436974608315,25.11874019448946]},
          {name:'河源市', geoCoord:[114.58394424635327,24.37606855753647]},
          {name:'梅州市', geoCoord:[115.76278811453267,24.50868849270664]},
          {name:'珠海市', geoCoord:[113.99012445820432,21.834829721362226]}
      ];
      	var that = this
      	var aaa = setInterval(function(){
      		
      		that.list = []
      		var name = ''
					var a = Math.floor(Math.random()*geoCoordMapList.length)
//					console.log(geoCoordMapList[a])
					that.list.push(geoCoordMapList[a])
					for(var i =0 ; i<that.localMapValueData.length;i++){
						if(geoCoordMapList[a].name==that.localMapValueData[i].name){
//							console.log(that.localMapValueData[i])
							that.title = '交易情况：'+that.localMapValueData[i].name + " "+that.localMapValueData[i].value
							name = that.localMapValueData[i].name
						}
					}
//					console.log(that.list)
					that.getMap(name)
      	},2000)
				
  	},
  	
  	
  	
  	
  	
    getMap(mapname) {
      var mapdata = this.localMapValueData;
// 			[
//         {name:'广州市',value:40000},
//         {name:'深圳市',value:39000},
//         {name:'珠海市',value:30000},
//         {name:'汕头市',value:23000},
//         {name:'佛山市',value:23000},
//         {name:'韶关市',value:10000},
//         {name:'湛江市',value:9000},
//         {name:'肇庆市',value:8000},
//         {name:'江门市',value:2000},
//         {name:'茂名市',value:9000},
//         {name:'惠州市',value:7000},
//         {name:'梅州市',value:6000},
//         {name:'汕尾市',value:8000},
//         {name:'河源市',value:6666},
//         {name:'阳江市',value:8888},
//         {name:'清远市',value:6777},
//         {name:'东莞市',value:15000},
//         {name:'中山市',value:20000},
//         {name:'潮州市',value:9999},
//         {name:'揭阳市',value:12000},
//         {name:'云浮市',value:5666}
//       ];
      
      var placeList = [
          {name:'云浮', geoCoord:[112.02, 22.93]},
          {name:'梅州', geoCoord:[116.1, 24.55]},
          {name:'汕尾', geoCoord:[115.375279, 22.786211]},
          {name:'潮州', geoCoord:[116.63, 23.68]},
          {name:'汕头', geoCoord:[116.69, 23.39]},
          {name:'湛江', geoCoord:[110.359377, 21.270708]},
          {name:'揭阳', geoCoord:[116.35, 23.55]},
          {name:'东莞', geoCoord:[113.75, 23.04]},
          {name:'韶关', geoCoord:[113.62, 24.84]},
          {name:'广州', geoCoord:[113.23, 23.16]},
          {name:'清远', geoCoord:[113.01, 23.7]},
          {name:'中山', geoCoord:[113.38, 22.52]},
          {name:'深圳', geoCoord:[114.07, 22.62]},
          {name:'珠海', geoCoord:[113.52, 22.3]},
          {name:'佛山', geoCoord:[113.11, 23.05]},
          {name:'茂名', geoCoord:[110.88, 21.68]},
          {name:'阳江', geoCoord:[111.95, 21.85]},
          {name:'惠州', geoCoord:[114.4, 23.09]},
          {name:'湛江', geoCoord:[109.48,20.88]},
          {name:'江门', geoCoord:[113.06, 22.61]},
          {name:'茂名', geoCoord:[110.72912479740677,22.271832252836305]},
          {name:'云浮', geoCoord:[111.51895018908698,23.085234521880068]},
          {name:'肇庆', geoCoord:[111.86081491085895,23.748334197730955]},
          {name:'清远', geoCoord:[112.3559293354943,24.897706969205828]},
          {name:'韶关', geoCoord:[113.33436974608315,25.11874019448946]},
          {name:'河源', geoCoord:[114.58394424635327,24.37606855753647]},
          {name:'梅州', geoCoord:[115.76278811453267,24.50868849270664]},
          {name:'珠海', geoCoord:[113.99012445820432,21.834829721362226]}
      ];
      var getGeoCoord = function(){
        var rst={};
        for(var i=0 ; i < placeList.length ; i++){
          rst[placeList[i].name] = placeList[i].geoCoord;
        }
        for( var i = 0 ; i < 10 ; i++){
          rst['提示'+i] = [118, 25.4-0.2*i];
        }
        return rst;
      }
 
// // 			var convertData = function(mapdata) {
// // 				var res = [];
// // 				for (var i = 0; i < mapdata.length; i++) {
// // 					var geoCoord = placeList[mapdata[i].type];
// // 					
// // 					if (geoCoord) {
// // 						res.push({
// // 							name: mapdata[i].type,
// // 							value: geoCoord.concat(mapdata[i].amount),
// // 							
// // 						});
// // 					}
// // 				}
// 				return res;
// 			};
			
      // 基于准备好的dom，初始化echarts实例
      let mapChart = this.$echarts.init(document.getElementById('GDmap'));
      // 绘制图表
      let options = {
        title: {
          text: this.titleName,
          subtext : this.title,
          left: 'center',
          top:"2%",
          padding: [10, 10],
          textStyle: {
            color: this.titleFontColor,
            fontFamily: 'Arial',
            fontWeight: '500',
            fontSize: '30%'
          },
          subtextStyle: {
             color: 'white' ,// 副标题文字颜色
						 fontSize: '25',
						 lineHeight:"120",
						 align:'left'
					},
        },
        backgroundColor: '',
        tooltip: {
          position: 'top'
        },
        animation: false,
        grid: {
          height: '100%',
// 					x:"10%",
// 					y:"10%"
        },
//         visualMap: {
//             min: 800,
//             max: 50000,
//             text:['High','Low'],
//             realtime: false,
//             calculable: true,
//             inRange: {
//               color: ['lightskyblue','yellow', 'orangered']
//               //color: ['#4e88fd','#ffb517','#ce25ff']
//             },
//             itemStyle:{
// 
//             },
//             textStyle:{
//               color: '#fff',
//               fontSize: 24,
//             },
//             right: '5%',
//             bottom: '10%',
//         },
        geo:[
          {
            map: '广东',
            silent:true,
            aspectScale: 1.5, //0.75 geoBoundingRect.width / geoBoundingRect.height * aspectScale
            top: '35%',
						zoom: 1.2,
            label: {
              normal: {
                show:true,
                textStyle:{
                  color: 'white',
									fontWeight: '500',
                  fontSize: 16,
                }
              },
              emphasis:{
                show: false,
              }
            },
            itemStyle: {
              normal:{
                areaColor: '#2fb9ea',
                borderColor: '#2fb9ea',
                borderWidth: 2,
              },
              emphasis:{
                areaColor: 'transparent',
                borderWidth: 2,
                shadowColor: 'transparent'
              }
            }
          },
          {
            map: '广东',
						zoom: 1.2,
            aspectScale: 1.5,
            top: '33%',
            itemStyle: {
              normal:{
                areaColor: '#0f58ce',
                borderColor: '#2fb9ea',
                label:{
                  show:false,
                  textStyle:{
                    color: 'white',
                    fontSize: 18,
                  }
                }
              },
              emphasis:{
                label:{
                  show:false,
                },
                areaColor: '#2fb9ea',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        series: [
					{
          geoIndex: 1,
          type: 'map',
          name: '交易情况',
          roam: false,
          data: mapdata,
          geoCoord: getGeoCoord(),
          itemStyle: {
                		color:
                		function (params) {
                			
//              			console.log(params.name)
                			if(params.name == mapname){
	                        return "#2fb9ea"}
	                  }
          },
//        markPoint:{
//          symbol: 'pin',
//          symbolsize: 5,
//          itemStyle:{
//            // color:'rgba(4,64,97,0.8)',
//            color:'#2fb9ea'
//          },
//             data:[
//               {name:'广州',coord:[113.23, 23.16]},
//               {name:'深圳', coord:[114.07, 22.62]},
//               {name:'珠海', coord:[113.52, 22.3]},
//               {name:'佛山', coord:[113.11, 23.05]},
//               {name:'惠州', coord:[114.4, 23.09]},
//               {name:'东莞', coord:[113.75, 23.04]},
//               {name:'中山', coord:[113.38, 22.52]},
//               {name:'江门', coord:[113.06, 22.61]},
//               {name:'肇庆', coord:[111.86081491085895,23.748334197730955]},
//             ]
//        },
					
        },
				
				]
      };
      mapChart.setOption(options);
  

//       window.addEventListener("resize", function() {
//         mapChart.resize();
//       });
    },      
  },//methods
  props: ['childClass','titleName','localMapValueData']
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#GDmap {
  width: 100%;
  height: 100%;
}
</style>
