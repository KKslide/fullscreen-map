<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
        }
    },
    methods: {
        /**
         * 激光笔翻页
         * 键盘上下键 和 pageup pagedown
         */
        flipPager() {
            document.onkeydown = e => {
                let keyCode = e.keyCode; // 键盘码
                // 33-37-38 prev
                // 34-39-40 next
                let isMainKey = keyCode == 34 || keyCode == 39 || keyCode == 40 || keyCode == 33 || keyCode == 37 || keyCode == 38;
                if(isMainKey){
                    let currentRouterName = this.$route.path.replace("/", ""); // 当前路由名称
                    let currentRouteIndex = Number(this.$route.path.slice(-1)); // 当前路由index
                    let carouselList = JSON.parse(sessionStorage.getItem("carouselList")); // 目前要循环的页面
                    let curTempIndex = carouselList.indexOf(currentRouterName); // 当前路由在循环列表中的索引
    
                    if (keyCode == 34 || keyCode == 39 || keyCode == 40) { // 前进
                        if (curTempIndex++ >= carouselList.length - 1) {
                            curTempIndex = 0;
                        }
                    }
                    else if (keyCode == 33 || keyCode == 37 || keyCode == 38) { // 后退
                        if (curTempIndex-- <= 0) {
                            curTempIndex = carouselList.length - 1;
                        }
                    }
                    this.$router.push({ path: '/' + carouselList[curTempIndex] });
                }
            }
        }
    },
    mounted() {
        this.flipPager()
    }
};

</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Arial";
}

html,
body {
    min-height: 100%;
    overflow: hidden;
}
body {
    background-image: url("../static/images/bg.jpg");
    background-image: url("../static/images/bg2.jpg");
    background-image: url("../static/images/bg3.jpg");
    background-image: url("../static/images/bg4.jpg");
    background-image: url("../static/images/bg5.jpg");
    background-image: url("../static/images/bg6.jpg");
    background-size: 100% 100%;
}
</style>
