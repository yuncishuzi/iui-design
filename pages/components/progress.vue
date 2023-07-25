<template>
  <Demo title="基本用法">
    <iui-progress :modelValue="50" />
  </Demo>

  <Demo title="显示百分比">
    <iui-progress :modelValue="50" percent />
  </Demo>

  <Demo title="自定义大小">
    <iui-space direction="vertical" size="large">
      <view>
        <iui-progress :modelValue="20" percent size="2" />
      </view>
      <view>
        <iui-progress :modelValue="60" percent size="6" />
      </view>
      <view>
        <iui-progress :modelValue="80" percent size="8" />
      </view>
    </iui-space>
  </Demo>

  <Demo title="自定义颜色">
    <iui-progress :modelValue="75" percent color="#F53F3F" />
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped>
view {
  width: 100%;
}
</style>
