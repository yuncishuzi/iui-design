<template>
  <iui-notify ref="notify" />

  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="notify?.show({ content: 'Basic useage' })">
        <iui-cell label="Basic useage" arrow></iui-cell>
      </view>
      <view @click="notify?.show({ content: 'Next notify' })">
        <iui-cell label="Basic useage" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const notify = ref();
</script>

<style lang="scss" scoped>
iui-list {
  border-radius: 6px;
}
</style>
