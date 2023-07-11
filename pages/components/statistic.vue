<template>
  <Demo title="基本用法">
    <iui-space size="large">
      <view>
        <iui-statistic
          title="Download"
          :value="125670"
          separator
        ></iui-statistic>
      </view>
      <view>
        <iui-statistic
          extra="Comment"
          :value="40509"
          :precision="2"
        ></iui-statistic>
      </view>
    </iui-space>
  </Demo>

  <Demo title="自定义前后缀">
    <iui-space size="large">
      <view>
        <iui-statistic title="New User" :value="125670" separator>
          <template #suffix>
            <iui-icon name="arrowup" style="font-weight: 600"></iui-icon>
          </template>
        </iui-statistic>
      </view>
      <view>
        <iui-statistic
          title="User Growth Rate"
          :value="50.52"
          :precision="2"
          :valueStyle="{ color: '#00B42A' }"
        >
          <template #prefix>
            <iui-icon name="arrowup" style="font-weight: 600"></iui-icon>
          </template>
          <template #suffix> % </template>
        </iui-statistic>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const start = ref(false);
</script>

<style lang="scss" scoped></style>
