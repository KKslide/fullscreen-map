<template>
    <div id="realTimeList">
        <p>
            {{this.titleName}}
            <span v-html="$store.getters.getTime"></span>
        </p>
        <ul>
            <li v-for="(item,index) in reallist" :key="index">{{item}}</li>
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
        }
    },
    methods: {
    },
    mounted() {
        window.chartTimer.one_live_trade = setInterval(_ => {
            let a = this.reallist,
                b = this.reallist.shift();
            this.reallist.push(b);
            // let _a = this.originList,
            //     _b = this.originList.shift();
            // this.originList.push(_b);
        }, 6 * 1000)
    },
    watch: {
        // originList(newVal, oldValue) {
        //     this.$store.commit('setCurrentTrade', newVal[0])
        // },
    },
    beforeDestroy() {
    },
    props: ['titleName', 'reallist', 'originList']
};

</script>
<style lang="less" scoped>
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#realTimeList {
    width: 100%;
    overflow: hidden;
    // height: 50vh;
    text-align: center;
    font-family: "PingFang SC";
    p {
        margin: 2.5% 1%;
        color: white;
        // font-family: 'Arial';
        // font-weight: 500;
        font-size: 0.22rem;
        text-align: left;
        span {
            float: right;
            font-size: 0.16rem;
            margin-right: 0.1rem;
            margin-top: 0.05rem;
        }
    }

    ul {
        margin: 0 0.5%;
        list-style-type: none;

        height: 3.8rem;
        overflow: hidden;
    }

    li {
        margin-left: 0.1rem;
        margin-right: 0.15rem;
        padding: 1.5% 0;
        font-size: 0.16rem;
        text-align: left;
        color: @fontColor;
    }
}
</style>
