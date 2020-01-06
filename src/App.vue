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
        flipPager() {
            document.onkeydown = e => {
                // 33-37-38 prev
                // 34-39-40 next
                let currentRouteIndex = Number(this.$route.path.slice(-1))
                let keyCode = e.keyCode
                if (keyCode == 34 || keyCode == 39 || keyCode == 40) { // 前进
                    if (currentRouteIndex++ >= 4) currentRouteIndex = 1
                    this.$router.push({ path: '/screenpic' + currentRouteIndex })
                } 
                else if (keyCode == 33 || keyCode == 37 || keyCode == 38) { // 后退
                    if (currentRouteIndex-- <= 1) currentRouteIndex = 4
                    this.$router.push({ path: '/screenpic' + currentRouteIndex })
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
    fontfamily: "Arial";
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
