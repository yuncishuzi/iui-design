<template>
  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="visible = !visible">
        <iui-cell label="Single Action Dialog" arrow></iui-cell>
      </view>

      <view @click="noTitle">
        <iui-cell label="No Title" arrow></iui-cell>
      </view>

      <view @click="dualAction">
        <iui-cell label="Dual Action Dialog" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="异步关闭" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="asyncShutdown">
        <iui-cell label="Async Shutdown" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="自定义" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="customButton = !customButton">
        <iui-cell label="Custom Button Style" arrow></iui-cell>
      </view>

      <view @click="scrollableDialog = !scrollableDialog">
        <iui-cell label="Scrollable Content" arrow></iui-cell>
      </view>

      <view @click="chooseDialog = !chooseDialog">
        <iui-cell label="Choose Dialog" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <iui-dialog
    v-model="visible"
    title="Dialog Title"
    :cancel="false"
    confirmText="I know"
  >
    I am a single-line content of the body, center-aligned by
    default.</iui-dialog
  >

  <iui-dialog ref="dialog"></iui-dialog>

  <iui-dialog v-model="chooseDialog">
    <template #title>
      <view class="header">
        <view class="icon">
          <iui-icon name="info-circle-fill"></iui-icon>
        </view>
        <view class="title"> Title Slot </view>
      </view>
    </template>
    I am a single-line content of the body, center-aligned by default.
    <template #action>
      <view class="list">
        <view
          class="item"
          v-for="idx in 3"
          :key="idx"
          @click="chooseDialog = false"
        >
          Option {{ idx }}
        </view>
      </view>
    </template>
  </iui-dialog>

  <iui-dialog v-model="scrollableDialog" :cancel="false" confirmText="I know">
    <view style="height: 200px; overflow: scroll">
      <view class="scrollContent">
        <text v-for="item in 10" :key="item">Scroll Content </text>
      </view>
    </view>
  </iui-dialog>

  <iui-dialog v-model="customButton" title="Dialog Title">
    I am a single-line content of the body, center-aligned by default.
    <template #action>
      <view
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          width: 100%;
        "
      >
        <view style="width: 100%" @click="customButton = false">
          <iui-button type="primary" shape="circle"
            >Primary Operation</iui-button
          >
        </view>
      </view>
    </template>
  </iui-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref();
const visible = ref(false);

const chooseDialog = ref(false);
const scrollableDialog = ref(false);

const customButton = ref(false);

const noTitle = () => {
  dialog.value.open({
    content:
      "I am a single-line content of the body, center-aligned by default.",
    confirmText: "I know",
    cancel: false,
  });
};

const dualAction = () => {
  dialog.value.open({
    title: "Dialog Title",
    content:
      "I am a multiline content of the body, center-aligned by default. I am a multiline content of the body, center-aligned by default.",
    confirmText: "Primary",
    cancelText: "Auxiliary",
  });
};

const asyncShutdown = () => {
  dialog.value.open({
    title: "Dialog Title",
    content:
      "I am a multiline content of the body, center-aligned by default. I am a multiline content of the body, center-aligned by default.",
    confirmText: "Primary",
    cancelText: "Auxiliary",
    beforeConfirm() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  padding: 0 4px;
  font-weight: 600;
  text-align: center;
}
.icon {
  color: #f53f3f;
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .item {
    color: #165dff;
    font-size: 16px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-bottom: 1rpx solid $color-border-light;
    &:active {
      opacity: 0.5;
    }
  }
}

.scrollContent {
  height: 400px;
  display: flex;
  flex-direction: column;
}
</style>
