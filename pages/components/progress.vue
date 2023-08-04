<template>
  <Demo title="基本用法">
    <iui-progress v-model="progress" />
  </Demo>

  <Demo title="显示百分比">
    <iui-progress v-model="progress" percent />
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

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";

const progress = ref(0);

let inter;

onShow(() => {
  clearInterval(inter);
  progress.value = 0;
  inter = setInterval(() => {
    progress.value += 1;
    if (progress.value >= 100) {
      clearInterval(inter);
    }
  }, 10);
});
</script>

<style lang="scss" scoped>
view {
  width: 100%;
}
</style>
