<template>
    <div id="iconC">
        <div class="iconItem" v-for="(item,index) in iconItemData1" :key="index">
            <div class="num_content">
                <p v-html="item.text"></p>
                <p v-translatex>
                    <span
                        v-for="(val,index) in item.value"
                        :key="index"
                        v-html="val"
                        :class="val==','||val=='.'?'dot':''"
                    >1</span>
                    <i class="unit" v-html="item.unit"></i>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "IconItem",
    data() {
        return {
            fixedData: null
        }
    },
    mounted() {

    },
    methods: {
        fixedNumber(num) {
            return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')//.split(".")[0];
        },
        formatData(param) {
            let _data = param;
            _data.forEach((v, i) => {
                if (v.text.indexOf('金额') == -1) { // 不含'金额'字眼的
                    v.value = this.fixedNumber(v.value).split('.')[0].split(''); // 非金额的指标都不要小数点
                } else {
                    v.value = this.fixedNumber(v.value)
                }
            });
            return _data;
        }
    },
    props: ['iconItemData1'],
    watch: {
        iconItemData1(nv, ov) {
            this.fixedData = this.formatData(nv);
        }
    },
    directives: {
        translatex: {
            inserted(el) {
                let eleChildrenNodes = el.children
                for (let i = 0; i < eleChildrenNodes.length; i++) {
                    if (eleChildrenNodes[i].innerHTML == "元" || eleChildrenNodes[i].innerHTML == "万元") {
                        el.style.transform = "translateX(0.15rem)";
                    }
                }
            },
        }
    }
};

</script>
<style lang="less" scoped>
@fontColor: rgba(255, 255, 255, 0.8);
@titleFontColor: rgba(12, 236, 228, 0.7);

#iconC {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.3rem;
    .iconItem {
        width: 50%;
        // height: 33.333333%;
        display: inline-block;
        text-align: center;
        .icon {
            width: 0.25rem;
            height: 0.25rem;
        }

        .num_content {
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0.1rem 0;
            p {
                color: @fontColor;
                // margin-bottom: 0.2rem;
                font-size: 0.2rem;
                white-space: nowrap;
            }
            p:last-child {
                font-size: 0.16rem;
                margin-bottom: 0.1rem;
                span:not(.dot) {
                    // border: 0.02rem solid rgb(77, 102, 200);
                    // box-shadow: rgb(77, 102, 200) 0px 0px 0.1rem inset;
                    border: 0.02rem solid rgba(65, 160, 231, 0.88);
                    box-shadow: 0px 0px 0.1rem rgba(82, 184, 226, 0.54) inset;
                    padding: 0px 0.02rem;
                    // margin-left: 0.03rem;
                }
                span.dot {
                    transform: translateY(0.03rem);
                    margin-right: -0.01rem;
                }
                span {
                    margin-left: 0.03rem;
                }
                i {
                    font-style: normal;
                    font-size: 0.14rem;
                    // margin-left: 0.03rem;
                    // transform: translateY(0.035rem);
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
