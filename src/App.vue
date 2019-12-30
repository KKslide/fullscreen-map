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
    background-image: url('../static/images/bg.jpg');
    background-image: url('../static/images/bg2.jpg');
    background-image: url('../static/images/bg3.jpg');
    background-image: url('../static/images/bg4.jpg');
    background-image: url('../static/images/bg5.jpg');
    background-image: url('../static/images/bg6.jpg');
    background-size: 100% 100%;
}
</style>
