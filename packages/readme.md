<div align="center">
  <a href="https://iyunci.cn/design/uni/" target="_blank">
    <img alt="iui Design" style="border-radius:10px" width="100" src="./static/logo.png"/>
  </a>
</div>

<div align="center">
  <h1>iui Design</h1>
</div>

<div align="center">

基于 Uni-app 的 Vue3 UI 组件库。

[![license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/yuncishuzi/iui-design/blob/master/LICENSE)

</div>

### 简介

iui Design 是一款基于 `uni-app` 的前端组件库，它提供了一套可复用、易扩展、低耦合的移动端 UI 组件库，帮助开发者快速搭建移动应用。

设计灵感来自 [ArcoDesign](https://arco.design/)，感谢巨人！

### 预览

请使用微信搜索小程序 `iui Design` 进行体验。

移动端 H5：[预览地址](https://iui.iyunci.cn)

### 交流反馈

[iui Design 交流群](https://iyunci.cn/design/uni/feedback.html)

### 版权信息

iui Design 遵循 [Apache-2.0](https://github.com/yuncishuzi/iui-design/blob/master/LICENSE) 开源协议，意味着您无需支付任何费用，也无需授权，即可将 iui Design 应用到您的产品中。

<a-alert title="注意" type="warning">这并不意味着您可以将 iui Design 应用到非法的领域，比如涉及赌博，暴力等方面。如因此产生纠纷或法律问题，iui Design 相关方及云磁数字不承担任何责任。</a-alert>

### 安装

使用前，请确保你已经学习过 `uni-app` 的使用，你可以阅读 [uni-app 文档](https://uniapp.dcloud.net.cn/)。

#### 组件库

**方式一：通过 npm 安装**

```bash
npm i iui-design
# or
yarn add iui-design
```

**方式二：通过 HBuilderX 导入**

如果您是使用 HbuilderX 开发的用户，您可以在 `uni-app` 插件市场通过 `uni_modules` 的形式进行安装。

[下载地址](https://ext.dcloud.net.cn/plugin?id=13987)

#### Scss 插件

`iui-design` 依赖 `sass`，您必须要安装此插件，否则无法正常运行。

- 如果您使用的是 HbuilderX，您可以在 `插件市场` 中搜索 `sass` 进行安装。
- 如果您的项目是由 vue-cli 创建的，请通过以下命令安装对 sass(scss)的支持，如果已安装，请略过。

```bash
# 安装sass
npm i sass -D

# 安装sass-loader
npm i sass-loader -D
```

### 配置

#### 引入样式

在 `App.vue` 中引入 `iui-design` 的样式。

```vue
<style lang="scss">
// npm 模式安装
@import "iui-design/style/index.scss";

// HBuilderX 插件市场安装
@import "@/components/iui-design/style/index.scss";
</style>
```

在 `uni.scss` 中引入 `iui-design` 的主题样式和变量。

```scss
// npm 模式安装
@import "iui-design/style/theme.scss";

// HBuilderX 插件市场安装
@import "@/components/iui-design/style/theme.scss";
```

#### easycom 模式

`iui-design` 支持 `easycom` 模式，您可以在 `pages.json` 中配置 `easycom`，然后无需引入即可使用组件。

npm 模式安装：

```json
{
  "easycom": {
    "custom": {
      "^iui-(.*)": "iui-design/components/iui-$1/iui-$1.vue"
    }
  }
}
```

HBuilderX 插件市场安装：

```json
{
  "easycom": {
    "custom": {
      "^iui-(.*)": "@/components/iui-design/components/iui-$1/iui-$1.vue"
    }
  }
}
```

### 贡献指南

感谢你使用 iui Design

以下是关于向 iui Design 提交反馈或代码的指南。在向 iui Design 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下内容。

#### 提交 issue

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。

#### 参与开发

我们非常乐意接受各位的优质 PR，但在此之前我希望您了解 iui Design 是一个需要兼容多个平台的组件库。 所以希望在您修复 bug 并提交之前尽可能的去这些平台测试一下兼容性。最好能携带测试截图以方便审核。非常感谢！

### Github

如果你喜欢 iui Design，欢迎给我们点一个 [⭐ Star](https://github.com/yuncishuzi/iui-design)
