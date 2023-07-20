<template>
  <Demo title="基本用法" :padding="0">
    <iui-search v-model="value" @search="onSearch"></iui-search>
  </Demo>

  <Demo title="不显示取消按钮" :padding="0">
    <iui-search :cancel="false"></iui-search>
  </Demo>

  <Demo title="自定义右侧按钮" :padding="0">
    <iui-search>
      <template #suffix>
        <text style="color: #165dff">Search</text>
      </template>
    </iui-search>
  </Demo>

  <Demo title="无Icon" :padding="0">
    <iui-search :icon="false"></iui-search>
  </Demo>

  <Demo title="插槽" :padding="0">
    <iui-search>
      <template #prefix>
        <iui-avatar />
      </template>
      <template #suffix>
        <iui-button type="primary">Search</iui-button>
      </template>
    </iui-search>
  </Demo>

  <Demo title="自定义颜色" :padding="0">
    <iui-search
      color="white"
      bgColor="linear-gradient(45deg, rgb(22, 93, 255), rgb(26 49 219))"
    >
    </iui-search>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");

const onSearch = (val) => {
  console.log(val);
};
</script>

<style lang="scss" scoped></style>
