<template>
  <Demo title="基本用法" :padding="0">
    <iui-list>
      <iui-cell label="Default">
        <iui-switch></iui-switch>
      </iui-cell>
      <iui-cell label="Custom color">
        <iui-switch v-model="defaultChecked" color="#00B42A"></iui-switch>
      </iui-cell>
    </iui-list>
  </Demo>

  <Demo title="禁用" :padding="0">
    <iui-cell label="Disabled">
      <iui-switch disabled></iui-switch>
    </iui-cell>
  </Demo>

  <Demo title="内嵌文字">
    <iui-space>
      <view>
        <iui-switch checkedText="开" uncheckedText="关"></iui-switch>
      </view>
      <view>
        <iui-switch checkedText="ON" uncheckedText="OFF"></iui-switch>
      </view>
    </iui-space>
  </Demo>

  <Demo title="直角">
    <iui-switch shape="square"></iui-switch>
  </Demo>

  <Demo title="异步开关">
    <iui-switch :beforeChange="before"></iui-switch>
  </Demo>
</template>

<script setup>
import { ref } from "vue";
const defaultChecked = ref(true);

const before = (value, done) => {
  uni.showModal({
    title: "提示",
    content: `确认将开关调整为 ${value} 吗？`,
    showCancel: true,
    success: ({ confirm }) => {
      if (confirm) {
        done();
      }
    },
  });
};
</script>

<style lang="scss" scoped></style>
