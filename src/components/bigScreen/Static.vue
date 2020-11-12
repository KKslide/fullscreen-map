<template>
    <div id="staticCom">
        <el-container class="static_container">
            <div class="last_modified" v-html="'上次更新时间: '+lastModified"></div>
            <el-form ref="form" :model="form" label-width="125px" size="mini">
                <el-form-item label="要编辑的大屏">
                    <el-col :span="3">
                        <el-select v-model="screenPicked" placeholder="请选择大屏">
                            <el-option v-for="(item, index) in screen" :key="index" :label="item.name" :value="item.value" ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <span style="color:#FFF;">是否使用静态数据:</span>
                        <el-switch v-model="isUsed" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
                    </el-col>
                </el-form-item>
                <!-- 大屏1 -->
                <el-form-item label="全国业务情况" v-if="screenPicked == 'screen1'" >
                    <el-col :span="3" v-for="(item, index) in form.screen1.nationList" :key="index" >
                        <el-form-item :label="item.type + '(' + item.unit + ')'" >
                            <el-input v-model="item.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="广东业务情况" v-if="screenPicked == 'screen1'" >
                    <el-col :span="3" v-for="(item, index) in form.screen1.localList" :key="index" >
                        <el-form-item :label="item.type + '(' + item.unit + ')'" >
                            <el-input v-model="item.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="近七天放款趋势" v-if="screenPicked == 'screen1'" >
                    <el-col :span="3" v-for="(item, index) in form.screen1['7day_CY']" :key="index" >
                        <el-form-item :label="weekList[index]">
                            <el-input v-model="item.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="全国交易量情况" v-if="screenPicked == 'screen1'" >
                    <el-row>
                        <el-col :span="1" style="color: #fff">金额TOP5:</el-col>
                        <el-col :span="3" v-for="(item, index) in form.screen1.nationmap" :key="index" >
                            <!-- <el-form-item :label="item.type" label-width="50px"> -->
                            <el-form-item id="c_name_1">
                                <el-button type="text" @click="editItem(item.type,index)" v-html="item.type"></el-button>
                                <el-input v-model="item.value"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="1.5" style="color: #fff" >交易量TOP5:</el-col >
                        <el-col :span="3" v-for="(item, index) in form.screen1.nationmap" :key="index + 'aaa'" >
                            <el-form-item id="c_name_2">
                                <el-button type="text" @click="editItem(item.type,index)" v-html="item.type"></el-button>
                                <el-input v-model="item.amount"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="实时交易" v-if="screenPicked == 'screen1'">
                    <el-col :span="18">
                        <el-table :data="form.screen1.realist_CY" style="width: 100%" height="20em" >
                            <el-table-column label="序号" type="index"></el-table-column>
                            <el-table-column label="姓名">
                                <template slot-scope="scope">
                                    <p>{{ scope.row.name }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="地址">
                                <template slot-scope="scope">
                                    <p>{{ scope.row.address }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="金额">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.amount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="产品">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click=" handleDialog(scope.$index, scope.row, 'edit') " >编辑</el-button >
                                    <el-button size="mini" type="danger" @click=" deleteLiveTradeData( scope.$index, scope.row ) " >删除</el-button >
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <el-button @click="handleDialog(null,null,'add')" >添加</el-button >
                        </div>
                    </el-col>
                </el-form-item>
                <!-- 大屏2 -->
                <el-form-item label="页面要素" v-if="screenPicked == 'screen2'">
                    <el-col :span="3" v-for="(item, index) in form.screen2.dataList" :key="index" >
                        <el-form-item :label="item.type + '(' + item.unit + ')'" label-width="150px" >
                            <el-input v-model="item.amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="按放款类型统计" v-if="screenPicked == 'screen2'" >
                    <el-row>
                        <el-col :span="5" v-for="(item, index) in form.screen2.realeaseType" :key="index" >
                            <el-form-item :label="item.type + '[贷款余额]'" label-width="180px" >
                                <el-input v-model="item.data1"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5" v-for="(item, index) in form.screen2.realeaseType" :key="index" >
                            <el-form-item :label="item.type + '[贷款笔数]'" label-width="180px" >
                                <el-input v-model="item.data2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="全国交易分布情况" v-if="screenPicked == 'screen2'" >
                    <el-row>
                        <el-col :span="1" style="color: #fff">金额TOP5:</el-col>
                        <el-col :span="3" v-for="(item, index) in form.screen2.nationmap" :key="index" >
                            <el-form-item id="c_name_3">
                                <el-button type="text" @click="editItem(item.type,index)" v-html="item.type"></el-button>
                                <el-input v-model="item.value"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="1.5" style="color: #fff" >交易量TOP5:</el-col >
                        <el-col :span="3" v-for="(item, index) in form.screen2.nationmap" :key="index + 'aaa'" >
                            <el-form-item id="c_name_4">
                                <el-button type="text" @click="editItem(item.type,index)" v-html="item.type"></el-button>
                                <el-input v-model="item.amount"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="近七天放款趋势" v-if="screenPicked == 'screen2'" >
                    <el-row>
                        <el-col :span="3" v-for="(item, index) in form.screen2.latest7" :key="index" >
                            <el-form-item :label=" weekList[index].slice(4, 8) + '[借款金额]' " label-width="120px" >
                                <el-input v-model="item.data1"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3" v-for="(item, index) in form.screen2.latest7" :key="index + 'aaa'" >
                            <el-form-item :label=" weekList[index].slice(4, 8) + '[还款金额]' " label-width="120px" >
                                <el-input v-model="item.data2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="24小时放款金额" v-if="screenPicked == 'screen2'" >
                    <el-row>
                        <!-- [今日] -->
                        <el-col :span="2" v-for="(item, index) in form.screen2.fullDayTrade" :key="index" >
                            <el-form-item :label="item.hour + ':00[今日]'" label-width="90px" >
                                <el-input v-model="item.date24"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <!-- [昨日] -->
                        <el-col :span="2" v-for="(item, index) in form.screen2.fullDayTrade" :key="index + 'aaa'" >
                            <el-form-item :label="item.hour + ':00[昨日]'" label-width="90px" >
                                <el-input v-model="item.date24_before" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="实时交易" v-if="screenPicked == 'screen2'">
                    <el-col :span="18">
                        <el-table :data="form.screen2.realist_CY" style="width: 100%" height="20em" >
                            <el-table-column label="序号" type="index"></el-table-column>
                            <el-table-column label="姓名">
                                <template slot-scope="scope">
                                    <p>{{ scope.row.name }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="地址">
                                <template slot-scope="scope">
                                    <p>{{ scope.row.address }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="金额">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.amount }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="产品">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click=" handleDialog(scope.$index, scope.row, 'edit') " >编辑</el-button >
                                    <el-button size="mini" type="danger" @click=" deleteLiveTradeData( scope.$index, scope.row ) " >删除</el-button >
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <el-button @click="console.log('hhh')" >添加</el-button >
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" >立即创建</el-button >
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

            <!--实时交易编辑框 -->
            <el-dialog :title="(curStatus=='add'?'新增':'编辑')+'实时数据'" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-form id="tempLiveTradeData" ref="LiveTradeDataForm" :model="tempLiveTradeData" label-width="80px">
                    <el-form-item label="客户姓名" prop="name">
                        <el-input v-model="tempLiveTradeData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客户地址" prop="address">
                        <el-input v-model="tempLiveTradeData.address"></el-input>
                    </el-form-item>
                    <el-form-item label="贷款金额" prop="amount">
                        <el-input v-model="tempLiveTradeData.amount"></el-input>
                    </el-form-item>
                    <el-form-item label="贷款产品" prop="type">
                        <el-input v-model="tempLiveTradeData.type"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEditLiveData">取 消</el-button>
                    <el-button type="primary" @click="addLiveTradeData(curEditIndex)">确 定</el-button>
                </span>
            </el-dialog>

        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isUsed:null,
            screen: [ { name: "温室大屏", value: "screen1" }, { name: "线上资产", value: "screen2" }, ],
            screenPicked: 'screen1',
            form: {
                screen1: { // 温氏资产大屏数据格式
                    nationList: [
                        {
                            amount: "111883.62",
                            unit: "万元",
                            type: "总贷款余额",
                        },
                        {
                            amount: "2123",
                            unit: "户",
                            type: "总客户数",
                        },
                        {
                            amount: "179369.7",
                            unit: "万元",
                            type: "授信金额",
                        },
                        {
                            amount: "2123",
                            unit: "笔",
                            type: "授信笔数",
                        },
                        {
                            amount: "117859.5",
                            unit: "万元",
                            type: "放款金额",
                        },
                        {
                            amount: "1621",
                            unit: "笔",
                            type: "放款笔数",
                        },
                    ],
                    localList: [
                        {
                            amount: "12528.1",
                            unit: "万元",
                            type: "总贷款余额",
                        },
                        {
                            amount: "186",
                            unit: "户",
                            type: "总客户数",
                        },
                        {
                            amount: "19017.30",
                            unit: "万元",
                            type: "授信金额",
                        },
                        {
                            amount: "256",
                            unit: "笔",
                            type: "授信笔数",
                        },
                        {
                            amount: "12758.70",
                            unit: "万元",
                            type: "放款金额",
                        },
                        {
                            amount: "186",
                            unit: "笔",
                            type: "放款笔数",
                        },
                    ],
                    "7day_CY": [
                        {
                            date: "20201022",
                            amount: "150",
                        },
                        {
                            date: "20201021",
                            amount: "147",
                        },
                        {
                            date: "20201020",
                            amount: "58",
                        },
                        {
                            date: "20201019",
                            amount: "160",
                        },
                        {
                            date: "20201018",
                            amount: "40",
                        },
                        {
                            date: "20201017",
                            amount: "2",
                        },
                        {
                            date: "20201016",
                            amount: "360",
                        },
                    ],
                    nationmap: [
                        {
                            amount: "106",
                            type: "贵州",
                            value: "11479.4",
                        },
                        {
                            amount: "301",
                            type: "云南",
                            value: "32734.8",
                        },
                        {
                            amount: "364",
                            type: "陕西",
                            value: "230972.3",
                        },
                        {
                            amount: "186",
                            type: "广东",
                            value: "12757.8",
                        },
                        {
                            amount: "227",
                            type: "湖南",
                            value: "16077",
                        },
                    ],
                    realist_CY: [
                        {
                            amount: "251000",
                            address: "山西省运城市万荣县",
                            sex: "先生",
                            name: "牛捷",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "249000",
                            address: "山西省运城市万荣县",
                            sex: "先生",
                            name: "牛捷",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "400000",
                            address: "新疆维吾尔自治区乌鲁木齐市天山区中山路479号",
                            sex: "先生",
                            name: "曾传生",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "251000",
                            address: "山西省运城市万荣县",
                            sex: "先生",
                            name: "蒋文蓄",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "250000",
                            address: "江西省赣州市大余县",
                            sex: "先生",
                            name: "刘军",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "249000",
                            address: "山西省运城市万荣县",
                            sex: "先生",
                            name: "蒋文蓄",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "400000",
                            address: "新疆维吾尔自治区乌鲁木齐市天山区中山路479号",
                            sex: "先生",
                            name: "曾传生",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "200000",
                            address: "广东省清远市清新区",
                            sex: "先生",
                            name: "冯贤峰",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "475000",
                            address: "北京市北京市东城区前门大街1号",
                            sex: "先生",
                            name: "刘波",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "400000",
                            address: "新疆维吾尔自治区乌鲁木齐市天山区中山路479号",
                            sex: "先生",
                            name: "曾传生",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "500000",
                            address: "江苏省南京市",
                            sex: "女士",
                            name: "曾焕芬",
                            type: "个人农户贷款",
                        },
                        {
                            amount: "500000",
                            address: "上海市",
                            sex: "女士",
                            name: "曾焕芬",
                            type: "个人农户贷款",
                        },
                    ],
                },
                screen2: { // 线上资产大屏数据格式
                    dataList: [
                        {
                            "amount": "184410.39",
                            "unit": "万元",
                            "type": "贷款余额"
                        },
                        {
                            "amount": "39525",
                            "unit": "笔",
                            "type": "累计放款笔数"
                        },
                        {
                            "amount": "26222",
                            "unit": "件",
                            "type": "进件数"
                        },
                        {
                            "amount": "24222",
                            "unit": "件",
                            "type": "审批通过数"
                        },
                        {
                            "amount": "150",
                            "unit": "万元",
                            "type": "今日放款金额"
                        },
                        {
                            "amount": "4",
                            "unit": "笔",
                            "type": "今日放款笔数"
                        }
                    ],
                    realeaseType: [
                        {
                            "data2": "18064",
                            "data1": "99352.84",
                            "type": "线上车金融"
                        },
                        {
                            "data2": "1621",
                            "data1": "111883.62",
                            "type": "温氏物联网"
                        }
                    ],
                    nationmap: [
                        {
                            amount: "106",
                            type: "贵州",
                            value: "11479.4",
                        },
                        {
                            amount: "301",
                            type: "云南",
                            value: "32734.8",
                        },
                        {
                            amount: "364",
                            type: "陕西",
                            value: "230972.3",
                        },
                        {
                            amount: "186",
                            type: "广东",
                            value: "12757.8",
                        },
                        {
                            amount: "227",
                            type: "湖南",
                            value: "16077",
                        },
                    ],
                    latest7: [
                        {
                            "date": "20201021",
                            "data2": "219.46",
                            "data1": "147"
                        },
                        {
                            "date": "20201020",
                            "data2": "388.3",
                            "data1": "58"
                        },
                        {
                            "date": "20201019",
                            "data2": "199.86",
                            "data1": "160"
                        },
                        {
                            "date": "20201018",
                            "data2": "110.63",
                            "data1": "40"
                        },
                        {
                            "date": "20201017",
                            "data2": "164.7",
                            "data1": "2"
                        },
                        {
                            "date": "20201016",
                            "data2": "176.83",
                            "data1": "360"
                        },
                        {
                            "date": "20201015",
                            "data2": "165.71",
                            "data1": "280"
                        }
                    ],
                    fullDayTrade: [
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "1"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "2"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "3"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "4"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "5"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "6"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "7"
                        },
                        {
                            "date24_before": "0",
                            "date24": "85",
                            "hour": "8"
                        },
                        {
                            "date24_before": "7",
                            "date24": "0",
                            "hour": "9"
                        },
                        {
                            "date24_before": "0",
                            "date24": "20",
                            "hour": "10"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "11"
                        },
                        {
                            "date24_before": "85",
                            "date24": "0",
                            "hour": "12"
                        },
                        {
                            "date24_before": "5",
                            "date24": "45",
                            "hour": "13"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "14"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "15"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "16"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "17"
                        },
                        {
                            "date24_before": "50",
                            "date24": "0",
                            "hour": "18"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "19"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "20"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "21"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "22"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "23"
                        },
                        {
                            "date24_before": "0",
                            "date24": "0",
                            "hour": "0"
                        }
                    ],
                    realist_CY: [
                        {
                            "amount": "34400.0",
                            "address": "黑龙江省哈尔滨市",
                            "name": "刘**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "44800.0",
                            "address": "内蒙古省包头市",
                            "name": "何**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "300000",
                            "address": "山西省运城市芮城县",
                            "name": "樊**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "59100.0",
                            "address": "甘肃省兰州市",
                            "name": "张**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "54800.0",
                            "address": "新疆省乌鲁木齐市",
                            "name": "刘**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "49900.0",
                            "address": "山东省济南市",
                            "name": "周**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "150000",
                            "address": "山西省运城市",
                            "name": "鲍**",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "249000",
                            "address": "山西省运城市万荣县",
                            "sex": "先生",
                            "name": "牛捷",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "400000",
                            "address": "新疆维吾尔自治区乌鲁木齐市天山区中山路479号",
                            "sex": "先生",
                            "name": "曾传生",
                            "type": "个人农户贷款"
                        },
                        {
                            "amount": "251000",
                            "address": "山西省运城市万荣县",
                            "sex": "先生",
                            "name": "蒋文蓄",
                            "type": "个人农户贷款"
                        }
                    ]
                },
            },
            tempLiveTradeData: { // 单条实时交易数据(临时)
                amount: "251000",
                address: "山西省运城市万荣县",
                sex: "先生",
                name: "牛捷",
                type: "个人农户贷款",
            },
            curStatus:'add', // 模态框状态 add - 新增, edit - 编辑
            curEditIndex:null, // 当前正在编辑的实时数据
            dialogVisible: false, // 模态框显示/隐藏
            lastModified:null, // 上次更新时间
        };
    },
    computed: {
        weekList() { // 一周七天, 日期列表, 字符串数组
            let weekArr = [];
            weekArr = this.form.screen1["7day_CY"].map((v, i) => {
                let Time = new Date();
                let curTime = Time.getTime() - 1000 * 60 * 60 * 24 * i;
                Time.setTime(curTime);
                return ("" + Time.getFullYear() + (Time.getMonth() + 1) + (Time.getDate() >= 10 ? Time.getDate() : "0" + Time.getDate()));
            });
            return weekArr;
        },
    },
    methods: {
        compare(prop) { // 排序
            return function (a, b) {
                var v1 = a[prop];
                var v2 = b[prop];
                return v1 - v2;
            };
        },
        editItem(provinceName,index){ // 编辑省份名
            this.$prompt('请输入要修改的省份', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[\u4e00-\u9fa5]/,
                inputErrorMessage: '省份名格式不正确'
            }).then(({ value }) => {
                this.form[this.screenPicked]["nationmap"][index]["type"] = value; // 动态修改当前修改的省份名称
                this.$message({
                    type: 'success',
                    message: '修改的省份名为: ' + value
                });
            }).catch((err) => {
                console.log(err);
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        handleDialog(index, row, mode){ // 新增或删除实时数据
            this.curStatus = mode;
            this.dialogVisible = true;
            this.curEditIndex = index; // 同步当前正在编辑数据的索引值
            if (mode == 'add'){
                for (const key in this.tempLiveTradeData) {
                    this.tempLiveTradeData[key] = ""
                }
            }
            else if(mode == 'edit'){
                this.tempLiveTradeData = this.$deepClone(row);
            }
        },
        handleClose(done) { // 关闭实时数据模态框
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        cancelEditLiveData(){ // 取消编辑实时数据
            this.$confirm('当前数据将不会保存, 是否取消编辑当前实时数据?','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(_=>{
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.dialogVisible = false;
            })
        },
        addLiveTradeData(index){ // 确定新增实时数据
            if(this.curStatus=='add'){
                this.form[this.screenPicked]["realist_CY"].unshift(this.$deepClone(this.tempLiveTradeData));
            }
            else if(this.curStatus == 'edit' && index != null){
                /* 直接赋值不靠谱, 需要用Vue.$set才行 */
                this.$set(this.form[this.screenPicked]["realist_CY"],index,this.$deepClone(this.tempLiveTradeData))
            }
            this.dialogVisible = false;
        },
        deleteLiveTradeData(index, row) { // 实时交易删除
            this.$confirm('是否删除当前实时数据?','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(_=>{
                this.$delete(this.form[this.screenPicked]['realist_CY'],index);
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.dialogVisible = false;
            })
        },
        onSubmit() { // 提交所有修改
            this.$confirm('将改为使用静态数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                console.log("submit!");
                console.log('修改', this.screenPicked, '的静态数据:\n', this.form[this.screenPicked]);
                // 动态存储当前修改
                localStorage.setItem(`screen_static_data_${this.screenPicked}`, JSON.stringify({ "_time": new Date(), "_data": this.form[this.screenPicked], "_isUsed":this.isUsed }));
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        getStaticData(src) { // 获取当前静态数据
            let localData = localStorage.getItem(`screen_static_data_${src}`);
            if (!localData) { // 还未存储过旧静态数据
                this.$axios({
                    url: this.$http.static[src].url, // 本地
                    method: this.$http.static[src].method,
                    data: {},
                }).then((res) => {
                    // 在这里要先对地图数据做排序操作 
                    // value - 金额        amount - 笔数
                    let preData = res.data;
                    let mapData = preData.nationmap.sort(this.compare("value")).reverse().slice(0,5);
                    preData["nationmap"] = mapData;
                    localStorage.setItem(`screen_static_data_${src}`, JSON.stringify({
                        _time: new Date(),
                        _data: preData,
                        _isUsed: this.isUsed
                    }));
                    this.form[src] = preData;
                    this.lastModified = this.$dateFormat("YYYY-mm-dd HH:MM:SS",new Date())
                    console.log(this.lastModified);
                    console.log('页面加载完成,当前待改的页面是:', src, '\n数据模板为:', preData, '第一次存储到localStorage中');
                });
            } else { // 已经存储过旧静态数据
                this.form[src] = JSON.parse(localData)._data;
                this.lastModified = this.$dateFormat("YYYY-mm-dd HH:MM:SS",new Date(JSON.parse(localData)._time))
                this.isUsed = JSON.parse(localData)._isUsed;
                // console.log(new Date());
                console.log(this.lastModified);
                console.log('已经存储过旧静态数据,当前使用localstorage数据');
            }
        }
    },
    mounted() {
        let curPicked = this.screenPicked;
        this.getStaticData(curPicked);
    },
    watch: {
        'screenPicked': function (nv, ov) {
            console.log('变化选项! 当前选择为: ', nv);
            this.getStaticData(nv)
        }
    }
};
</script>

<style lang="less" scoped>
#staticCom {
    .static_container {
        height: 100vh;
        justify-content: center;
        overflow-y: scroll;
        position: relative;
        .last_modified{
            position: absolute;
            top:2%;
            right: 3%;
            font-size: 20px;
            color:#FFF;
        }
        form {
            padding: 0.3em;
            background-color: rgba(223, 223, 223, 0.1);
            box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.62);
            overflow: scroll;
        }
        .el-form-item__label {
            color: #fff;
        }
    }
}
</style>