<template>
  <view :class="cls">
    <slot />
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * 方向
   * direction: horizontal | vertical
   */
  direction: {
    type: String,
    default: "horizontal",
  },
  /**
   * 分割线文字位置
   * orientation: start | center | end
   */
  align: {
    type: String,
    default: "center",
  },
  /**
   * 分割线样式类型
   * type: solid | dashed | dotted | double
   */
  type: {
    type: String,
    default: "solid",
  },
  /**
   * 分割线宽度/高度
   * size: number
   *
   */
  size: {
    type: Number,
  },
  /**
   * 分割线宽度/高度
   * margin
   * 分割线上下 margin (垂直方向时为左右 margin)
   */
  margin: {
    type: [Number, String],
  },
});

const prefixCls = "iui-divider";

const cls = computed(() => [
  prefixCls,
  [
    `${prefixCls}-${props.direction}`,
    `${prefixCls}-${props.align}`,
    `${prefixCls}-${props.type}`,
  ],
]);
</script>

<style lang="scss" scoped>
@import "../style/index.scss";
.iui-divider {
  &-horizontal {
    position: relative;
    clear: both;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    margin: 20px 0;
    border-bottom: 1px solid $color-border;
  }
}
</style>
