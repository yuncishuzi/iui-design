<template>
  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="toast.show('Tips')">
        <iui-cell label="Basic useage" arrow></iui-cell>
      </view>
      <view
        @click="
          toast.show(
            'Multi-line long text prompts, wrapping when the number of characters exceeds the number of characters. Displaying too much content here is generally not recommended!'
          )
        "
      >
        <iui-cell label="Multiline prompt" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="显示位置" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="toast.show({ message: 'Top Tips', position: 'top' })">
        <iui-cell label="Show from top" arrow></iui-cell>
      </view>

      <view @click="toast.show({ message: 'Bottom Tips', position: 'bottom' })">
        <iui-cell label="Show from bottom" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="状态提示" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="toast.show({ message: 'Success Tips', type: 'success' })">
        <iui-cell label="Success Tips" arrow></iui-cell>
      </view>

      <view @click="toast.show({ message: 'Warning Tips', type: 'warning' })">
        <iui-cell label="Warning Tips" arrow></iui-cell>
      </view>

      <view @click="toast.show({ message: 'Error Tips', type: 'error' })">
        <iui-cell label="Error Tips" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="加载状态" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="toast.showLoading(), hideLoading()">
        <iui-cell label="Loading" arrow></iui-cell>
      </view>
      <view @click="toast.showLoading({ message: 'Loading' }), hideLoading()">
        <iui-cell label="Loading Tips" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="横向布局" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view
        @click="
          toast.show({
            message: 'Success Tips',
            type: 'success',
            direction: 'horizontal',
          })
        "
      >
        <iui-cell label="Success Tips" arrow></iui-cell>
      </view>

      <view
        @click="
          toast.show({
            message: 'Warning Tips',
            type: 'warning',
            direction: 'horizontal',
          })
        "
      >
        <iui-cell label="Warning Tips" arrow></iui-cell>
      </view>

      <view
        @click="
          toast.show({
            message: 'Error Tips',
            type: 'error',
            direction: 'horizontal',
          })
        "
      >
        <iui-cell label="Error Tips" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <iui-toast ref="toast"></iui-toast>
</template>

<script setup>
import { ref } from "vue";

const toast = ref();

const hideLoading = () => {
  setTimeout(() => {
    toast.value.hideLoading();
  }, 3000);
};
</script>

<style lang="scss" scoped></style>
