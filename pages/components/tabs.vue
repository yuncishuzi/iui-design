<template>
  <Demo title="基本用法" :padding="0">
    <iui-tabs :list="list.slice(0, 3)"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="滚动" :padding="0">
    <iui-tabs :list="list"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="分割线" :padding="0">
    <iui-tabs :list="list" split></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="自定义Tab宽度" :padding="0">
    <iui-tabs :list="list.slice(0, 3)" :tabWidth="35"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="自定义Line高度" :padding="0">
    <iui-tabs :list="list.slice(0, 3)" :lineHeight="5"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="下划线自适应" :padding="0">
    <iui-tabs :list="lineFix" lineWidth="auto"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="激活颜色" :padding="0">
    <iui-tabs :list="list.slice(0, 3)" activeColor="#F53F3F"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="添加图标" :padding="0">
    <iui-tabs :list="iconTab" lineWidth="auto"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="添加徽标" :padding="0">
    <iui-tabs :list="badgeTab" lineWidth="auto"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="点模式" :padding="0">
    <iui-tabs :list="list.slice(0, 3)" type="dot"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="标签模式" :padding="0">
    <iui-tabs :list="list.slice(0, 3)" type="tag"></iui-tabs>
    <view class="content"> Content area </view>
  </Demo>

  <Demo title="卡片模式">
    <iui-tabs :list="list.slice(0, 3)" type="card"></iui-tabs>
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

const lineFix = [{ title: "Tab1" }, { title: "Example" }, { title: "Other" }];

const iconTab = [
  {
    title: "Doc",
    icon: "file-text",
  },
  {
    title: "Api",
    icon: "api",
  },
  {
    title: "Setting",
    icon: "setting",
  },
];

const badgeTab = [
  {
    title: "Tip",
    badge: {
      dot: true,
    },
  },
  {
    title: "Message",
    icon: "message",
    badge: {
      text: 2,
    },
  },
  {
    title: "My",
    icon: "user",
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
