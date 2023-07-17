<template>
  <iui-notify ref="notify" v-bind="customNotify"> </iui-notify>
  <iui-notify ref="customContent" height="60">
    <template #content="{ msg }">
      <view class="customContent">
        {{ msg }}
      </view>
    </template>
  </iui-notify>

  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="notify?.push({ content: 'Basic useage' })">
        <iui-cell label="Basic useage" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="通知类型" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="notify?.push({ content: 'General notification' })">
        <iui-cell label="General notification" arrow></iui-cell>
      </view>
      <view @click="notify?.success({ content: 'Success notification' })">
        <iui-cell label="Success notification" arrow></iui-cell>
      </view>
      <view @click="notify?.warning({ content: 'Warning notification' })">
        <iui-cell label="Warning notification" arrow></iui-cell>
      </view>
      <view @click="notify?.error({ content: 'Error notification' })">
        <iui-cell label="Error notification" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="自定义" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="customColor">
        <iui-cell label="Custom color" arrow></iui-cell>
      </view>
      <view @click="customTime">
        <iui-cell label="Custom time" arrow></iui-cell>
      </view>
      <view @click="customNotifyContent">
        <iui-cell label="Custom content" arrow></iui-cell>
      </view>
      <view @click="notifyFixed">
        <iui-cell label="Fixed top display" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="容器内调用" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view
        @click="notifyInContainer?.success({ content: 'Used in container' })"
      >
        <iui-cell label="Used in container" arrow></iui-cell>
      </view>
      <iui-notify ref="notifyInContainer"></iui-notify>
    </iui-list>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const notify = ref();
const customNotify = ref();
const notifyInContainer = ref();

const customContent = ref();

const customColor = () => {
  customNotify.value = {
    color: {
      background: "rgb(232, 243, 255)",
      color: "#165DFF",
    },
  };

  notify.value.push({ content: "Custom background color and font color" });
};

const customTime = () => {
  customNotify.value = {
    timeout: 5000,
  };

  notify.value.push({ content: "I will disappear after 5s" });
};

const customNotifyContent = () => {
  customContent.value.push({ content: "Custom content" });
};

const notifyFixed = () => {
  customNotify.value = {
    fixed: true,
  };

  notify.value.push({ content: "Fixed top display", type: "success" });
};
</script>

<style lang="scss" scoped>
iui-list {
  border-radius: 6px;
}

.customContent {
  border: 1px solid #165dff;
  border-radius: 50px;
  padding: 5px 20px;
  margin-top: 5px;
  color: #165dff;
}
</style>
