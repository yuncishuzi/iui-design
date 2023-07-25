<template>
  <view :class="prefixCls">
    <iui-list>
      <slot />
    </iui-list>
  </view>
</template>

<script setup>
import { provide } from "vue";

const props = defineProps({
  /**
   * 数据模型
   */
  model: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 布局
   */
  layout: {
    type: String,
    default: "horizontal",
  },
  /**
   * 校验规则
   */
  rules: {
    type: Array,
  },
});

const prefixCls = "iui-form";

provide("formProps", props);

provide("inForm", true);
</script>

<style lang="scss" scoped></style>
