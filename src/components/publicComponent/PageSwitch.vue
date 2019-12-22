<template>
    <div>
        <router-link class="page_nav page_pre" :to="{path:prePagePath}"></router-link>
        <router-link class="page_nav page_next" :to="{path:nextPagePath}"></router-link>
    </div>
</template>

<script>
export default {
    name: "pageSwitchComponent",
    props: ['prePagePath', 'nextPagePath']
}
</script>

<style lang="less" scoped>
     .page_nav{
        position: absolute;
        width: 15%;
        height: 100%;
        top:0;
        z-index: 9999;
    }
    .page_pre{
        left: 0;
    }
    .page_pre:hover{
        background: linear-gradient(to left,rgba(0,0,0,0),rgba(0,0,0,.5))
    }
    .page_next{
        right: 0;
    }
    .page_next:hover{
        background: linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.5))
    }
</style>