<template>
    <div id="realTimeList">
        <p>
            {{this.titleName}}
            <span v-html="$store.getters.getTime"></span>
        </p>
        <ul>
            <li
                v-for="(item,index) in reallist"
                :key="index"
                :style="{'display':index<8?'':'none'}"
            >{{item}}</li>
            <!-- <li>客户XXX,4月15日15:31分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:32分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:33分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:34分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:35分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:36分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:37分开户成功,设备型号XXX</li>
            <li>客户XXX,4月15日15:38分开户成功,设备型号XXX</li>-->
        </ul>
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            titleName: '实时交易情况',
        }
    },
    methods: {
    },
    mounted() {
        window.chartTimer.two_live_trade = setInterval(_ => {
            let a = this.reallist,
                b = this.reallist.shift()
            this.reallist.push(b);
            // let _a = this.originList,
            //     _b = this.originList.shift();
            // this.originList.push(_b);
        }, 6 * 1000)
    },
    watch: {
        // originList(newVal, oldValue) {
        //     this.$store.commit('setCurrentTrade', newVal[0])
        // }
    },
    beforeDestroy() {
    },
    props: ['childClass', 'reallist', 'originList']
};

</script>
<style lang="less" scoped>
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#realTimeList {
    //   width: 28.57vw;
    //   height: 36vh;
    //   height: 60vh;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    font-family: "PingFang SC";
    p {
        margin: 1.5% 1% 1.5% 0.15rem;
        color: white;
        // font-family: 'Arial';
        // font-weight: 550;
        font-size: 0.2rem;
        text-align: left;
        span {
            float: right;
            font-size: 0.16rem;
            margin-right: 0.1rem;
            margin-top: 0.05rem;
            font-weight: normal;
        }
    }

    ul {
        margin: 0 0.5%;
        list-style-type: none;
        // height: 55vh;
        // height: 30.5vh;
        // overflow: hidden;
        // transform: translateY(-0.1rem);
    }

    li {
        margin-left: 0.1rem;
        margin-right: 0.15rem;
        padding: 1.2% 0;
        font-size: 0.135rem;
        text-align: left;
        color: @fontColor;
        white-space: nowrap;
        overflow: hidden;
        word-break: break-all;
        // text-overflow: ellipsis;
    }
}
</style>
