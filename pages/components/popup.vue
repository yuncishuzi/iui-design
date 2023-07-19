<template>
  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view
        v-for="item in direction"
        :key="item"
        @click="popup.open({ direction: item })"
      >
        <iui-cell :label="item" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="滑动关闭" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="popup.open({ direction: 'bottom', slide: true })">
        <iui-cell label="Gesture swipe " arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="自定义" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="popup.open({ direction: 'bottom', height: 500 })">
        <iui-cell label="Custom Height " arrow></iui-cell>
      </view>

      <view @click="popup.open({ direction: 'right', width: 350 })">
        <iui-cell label="Custom Width " arrow></iui-cell>
      </view>

      <view @click="roundPopup.open({ direction: 'bottom' })">
        <iui-cell label="Rounded courners" arrow></iui-cell>
      </view>

      <view @click="scrollPopup.open({ direction: 'bottom' })">
        <iui-cell label="Scroll in the content" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <iui-popup ref="popup" title="Title">
    <view> Content area, click mask to close</view>
  </iui-popup>

  <iui-popup
    ref="roundPopup"
    title="Title"
    :containerStyle="{
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    }"
    slide
  >
    <template #extra>
      <iui-button inline>Extra</iui-button>
    </template>
    <view> Content area, click mask to close</view>
  </iui-popup>

  <iui-popup ref="scrollPopup" title="Title" slide>
    <view class="scrollContent"> Scroll content area </view>
  </iui-popup>
</template>

<script setup>
import { ref } from "vue";
const direction = ["top", "bottom", "left", "right"];

const popup = ref(null);
const roundPopup = ref(null);
const scrollPopup = ref(null);
</script>

<style lang="scss" scoped>
.scrollContent {
  height: 1000px;
}
</style>
