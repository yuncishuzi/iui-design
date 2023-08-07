<template>
  <view style="height: 130vh">
    <view style="height: 100px"></view>
    <iui-sticky>
      <view class="layout"> 基本用法 </view>
    </iui-sticky>
    <view style="height: 150px"></view>
    <iui-sticky :offsetTop="50">
      <view class="layout"> 顶部距离 </view>
    </iui-sticky>

    <Demo title="scroll-view中使用" :padding="0">
      <scroll-view scroll-y style="height: 400px; background: var(--iui-bg)">
        <view style="height: 50px"></view>
        <iui-sticky>
          <view class="layout"> 基本用法 </view>
        </iui-sticky>
        <view
          style="
            height: 500px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            color: #ccc;
          "
        >
          scroll-view content
        </view>
      </scroll-view>
    </Demo>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.layout {
  background: #165dff;
  color: white;
  padding: 10px;
  position: inherit;
  font-size: 14px;
}
</style>
