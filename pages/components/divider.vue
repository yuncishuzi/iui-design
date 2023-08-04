<template>
  <Demo title="基础用法">
    <text>Note that this is a message. </text>
    <iui-divider></iui-divider>
    <text>Note that this is a message. </text></Demo
  >

  <Demo title="带文字">
    <text>Note that this is a message. </text>
    <iui-divider align="start"> Text </iui-divider>
    <text>Note that this is a message. </text>
    <iui-divider> Text </iui-divider>
    <text>Note that this is a message. </text>
    <iui-divider align="end"> Text </iui-divider>
  </Demo>

  <Demo title="竖直分割线">
    <view style="display: flex; justify-content: space-around">
      <text>Item 1</text>
      <iui-divider direction="vertical"> </iui-divider>
      <text>Item 2</text>
      <iui-divider direction="vertical"> </iui-divider>
      <text>Item 3</text>
    </view>
  </Demo>
</template>

<script setup></script>

<style scoped>
text {
  font-size: 13px;
}
</style>
