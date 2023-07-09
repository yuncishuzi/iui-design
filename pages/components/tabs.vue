<template>
  <Demo title="基本用法" :padding="0">
    <iui-tabs
      :list="[
        {
          title: 'Tab1',
        },
        {
          title: 'Tab2',
        },
        {
          title: 'Tab3',
        },
      ]"
    ></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="滚动" :padding="0">
    <iui-tabs :list="list"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const current = ref(0);

const list = [
  {
    title: "Tab1",
  },
  {
    title: "Tab2",
  },
  {
    title: "Tab3",
  },
  {
    title: "Tab4",
  },
  {
    title: "Tab5",
  },
  {
    title: "Tab6",
  },
  {
    title: "Tab7",
  },
  {
    title: "Tab8",
  },
];

const onChange = (idx) => {
  current.value = idx;
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  color: #b6b6b6;
  font-size: 14px;
}
</style>
