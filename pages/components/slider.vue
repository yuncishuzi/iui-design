<template>
  <Demo title="基本用法">
    <iui-slider></iui-slider>
  </Demo>

  <Demo title="禁用">
    <iui-slider disabled v-model="value"></iui-slider>
  </Demo>

  <Demo title="气泡常驻">
    <iui-slider v-model="value2" popover="always"></iui-slider>
  </Demo>

  <Demo title="步长">
    <iui-slider v-model="value3" :step="5" popover="always"></iui-slider>
  </Demo>

  <Demo title="最大值">
    <iui-slider v-model="value3" :max="50" popover="always"></iui-slider>
  </Demo>

  <Demo title="单位">
    <iui-slider v-model="value3" popover="always" unit="MB"></iui-slider>
  </Demo>

  <Demo title="自定义颜色">
    <iui-slider
      v-model="value2"
      lineColor="#F53F3F"
      activeColor="#722ED1"
    ></iui-slider>
  </Demo>

  <Demo title="线条粗细">
    <iui-slider v-model="value2" lineHeight="4"></iui-slider>
  </Demo>

  <Demo title="自定义滑块">
    <iui-slider v-model="value2" :popover="false">
      <template #thumb="{ value }">
        <view
          :style="{
            background: '#165dff',
            padding: '1px 6px',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#fff',
          }"
        >
          {{ value }}
        </view>
      </template>
    </iui-slider>
  </Demo>

  <Demo title="插槽" padding="20px 0">
    <iui-slider v-model="value2">
      <template #prefix>
        <iui-icon name="audiostatic" color="gray" size="18"></iui-icon>
      </template>
      <template #suffix>
        <iui-icon name="audio" color="gray" size="18"></iui-icon>
      </template>
    </iui-slider>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const value = ref(40);

const value2 = ref(23);

const value3 = ref(50);
</script>

<style lang="scss" scoped></style>
