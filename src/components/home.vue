<template>
  <div class="home">
    <!-- head -->
    <el-row class="head">
      <el-col :span="4">
        <p>组件列表</p>
      </el-col>
      <el-col :span="20">
        <p>组件展示</p>
      </el-col>
    </el-row>
    <!-- 主体内容 -->
    <el-row class="tac">
      <!-- left 导航 -->
      <el-col :span="4"
              class="leftContent">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>柱形图</span>
            </template>
            <el-menu-item index="1-1">demo1</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>折线图</span>
            </template>
            <el-menu-item index="2-1">demo1</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>

      <!-- right 内容 -->
      <el-col :span="20"
              class="rightContent">
        <!-- <div class="grid-content bg-purple"></div> -->
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="less">
.home {
  .head {
    text-align: center;
    line-height: 4vh;
    font-weight: bold;
  }
  .tac {
    .leftContent,
    .rightContent {
      height: 96vh;
    }
    .leftContent {
      background: #f7f7f7;
    }
    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>


