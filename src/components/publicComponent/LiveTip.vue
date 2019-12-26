<template>
    <!-- 实时交易提示 -->
    <div class="live_tip">
        <div class="live_tip_addr">
            <p class="live_tip_item">地点</p>
            <p class="live_tip_content animated" v-animate v-text="liveData.address"></p>
        </div>
        <div class="live_tip_name">
            <p class="live_tip_item">客户</p>
            <p
                class="live_tip_content animated"
                v-animate
                v-text="liveData.name+(liveData.sex?liveData.sex:'**')"
            ></p>
        </div>
        <div class="live_tip_type">
            <p class="live_tip_item">产品</p>
            <p
                class="live_tip_content animated"
                v-animate
                v-text="liveData.type?liveData.type:'线上贷款'"
            ></p>
        </div>
        <div class="live_tip_amount">
            <p class="live_tip_item">金额</p>
            <p class="live_tip_content animated" v-animate v-text="liveData.amount+'元'"></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            liveData: {
                amount: "",
                address: "",
                sex: "",
                name: "",
                type: ""
            }
        }
    },
    directives: {
        animate: {
            inserted(el) {
            },
            update(el) {
                el.classList.remove('fadeOutDown');
                el.classList.add('fadeInDown');
                setTimeout(() => {
                    el.classList.remove('fadeInDown');
                    el.classList.add('fadeOutDown');
                }, 4500);
            }
        }
    },
    watch: {
        '$store.state.currentTrade': function (newVal) {
            this.liveData = newVal
        }
    },
    beforeDestroy() {
        this.liveData = null
    }
}
</script>

<style lang="less" scoped>
.live_tip {
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
    color: #fff;
    width: 100%;
    position: absolute;
    top: 45px;
    left: 15px;
    div > {
        width: 7.5em;
        p.live_tip_item {
            position: relative;
        }
        .live_tip_item::after {
            content: "·";
            font-size: 50px;
            position: absolute;
            top: 50%;
            left: -15%;
            transform: translateY(-50%);
        }
        p.live_tip_content {
            // font-size: 15px;
            font-size: 0.12rem;
        }
    }
}
</style>