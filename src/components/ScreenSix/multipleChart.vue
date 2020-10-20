<template>
    <div id="multipleChart"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    data() {
        return {
            echartElement: null,
        }
    },
    methods: {
        getChart() { }
    },
    mounted() {
        this.getChart()
    }
}
</script>

<style lang="less" scoped>
</style>