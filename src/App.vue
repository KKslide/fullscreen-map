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
    background-image: url('../static/images/bg2.png');
    background-size: 100% 100%;
}
</style>
