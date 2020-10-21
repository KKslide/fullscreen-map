# MZKS-Bank 大屏展示页面

> 该项目前端技术基于Vue和Echarts
 

## 打包步骤

``` bash
# 安装依赖包
npm install

# 本地开发端口 8080
npm run dev

# 生产环境打包命令
npm run build

# 生产环境打包时,查看打包过程分析报告
npm run build --report
```

> 已经在/config/index.js中编辑好打包的输出路径了

````     
build: {
    // 打包后index.html文件目录
    index: path.resolve(__dirname, '../../index.html'),

    // 打包后静态资源文件夹位置
    assetsRoot: path.resolve(__dirname, '../../'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/usp_ks/',  
    ************
````
