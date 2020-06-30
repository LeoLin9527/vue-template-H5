# vue-template-H5

基于 vue2.6 移动端 H5 项目模板 

### 技术栈

:strawberry:  `vue` + `vue-router` + `vuex` + `ES6+` + `axios` + `less`

### UI 组件库

:lemon: 使用 **`Vant 移动端组件库`**，采用按需引入组件的方案。 

### CSS 预处理器

:pear: 使用 **`Less 作为 CSS 的预处理器`**

### 编码风格

:watermelon: 使用 **`Airbnb JavaScript 代码编码风格`**

### 移动端适配

:tangerine: 使用 **`vw 移动端适配(兼容性)解决方案`**

### 规范化的 Git 提交

:grapes: 使用 **`Angular 团队的代码提交规范`** 

### 图标的处理

:peach: 使用 **`阿里巴巴 iconfont`**  svg 图标，并针对 svg 图标做优雅地处理

> 本项目也使用了 svgo 对 svg 内容的冗余信息进行优化，但针对一些 svg 不做 svgo 优化，因为有些 svg 经过 svgo 优化后颜色发生了变化

### 自动化创建文件

:cherries: 使用 **`plop 定制`** 基础模板（在 `plop-template` 文件夹下），在命令行中通过 `npm run plop` 命令快速构建新的 view 、component 或者 store 等。

### 优雅的 axios 二次封装和 API 接口管理

:green_apple:​ 对 axios 进行二次封装，请求拦截和响应拦截，主要封装了请求缓存机制，连续请求取消机制，超时重新请求机制。对 API 统一管理并自动导出，方便管理；此外，将 api 挂载到 vue 原型上，方便调用。

### 优化

:watermelon:​​ 使用**骨架屏加载**和**预渲染技术**，加上开启gzip压缩(包括Nginx)以及合理的分包，基本可以解决白屏和首屏渲染性能。

> 对于数据时效性较高、动态挂载的路由以及动态数据页面的的场景，不太适合预渲染。此时可以预渲染骨架屏。
