<template>
  <Demo title="基本用法" :padding="0">
    <iui-collapse label="Title 1">
      <view>This is content area</view>
      <view>This is content area</view>
      <view>This is content area</view>
    </iui-collapse>
  </Demo>

  <Demo title="组合" :padding="0">
    <iui-collapse-group>
      <iui-collapse label="Title 1">
        <view>This is content area</view>
        <view>This is content area</view>
        <view>This is content area</view>
      </iui-collapse>
      <iui-collapse label="Title 2">
        <view>This is content area</view>
        <view>This is content area</view>
        <view>This is content area</view>
      </iui-collapse>
      <iui-collapse label="Title 3">
        <view>This is content area</view>
        <view>This is content area</view>
        <view>This is content area</view>
      </iui-collapse>
    </iui-collapse-group>
  </Demo>

  <Demo title="自定义" :padding="0">
    <iui-collapse label="Title 1" icon="file-text">
      <view>This is content area</view>
      <view>This is content area</view>
      <view>This is content area</view>
    </iui-collapse>

    <iui-collapse label="Title 2" icon="fire" extra="Information">
      <view>This is content area</view>
      <view>This is content area</view>
      <view>This is content area</view>
    </iui-collapse>
  </Demo>

  <Demo title="手风琴" :padding="0">
    <iui-collapse-group accordion>
      <iui-collapse label="Title 1">
        <view>This is content area</view>
        <view>This is content area</view>
        <view>This is content area</view>
      </iui-collapse>
      <iui-collapse label="Title 2">
        <view>This is content area</view>
        <view>This is content area</view>
        <view>This is content area</view>
      </iui-collapse>
      <iui-collapse label="Title 3">
        <view>This is content area</view>
        <view>This is content area</view>
        <view>This is content area</view>
      </iui-collapse>
    </iui-collapse-group>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
