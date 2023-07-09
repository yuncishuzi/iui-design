<template>
  <view
    :class="prefixCls"
    :style="{
      overflowX: isScroll ? 'auto' : 'hidden',
      marginTop: `${grid.rowGap / 2}px`,
      marginBottom: `${grid.rowGap / 2}px`,
    }"
  >
    <slot />
  </view>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  /**
   * 滑动
   * 优先级高于父级props
   */
  scroll: {
    type: Boolean,
    default: false,
  },
});

const grid = inject("iui-grid-props");

// 是否滑动
const isScroll = props.scroll ? props.scroll : grid.scroll;

// 是否有间距 有间距时，不隐藏边框
const borderWidth = grid.rowGap ? "1px" : 0;

const prefixCls = "iui-grid-row";
</script>

<style lang="scss" scoped>
.iui-grid-row {
  display: flex;
  width: inherit;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  :not(:first-child):nth-child(n) {
    border-left-width: v-bind(borderWidth);
  }

  /* #ifdef MP */
  :deep(iui-grid-item:not(:first-child) > view) {
    border-left-width: v-bind(borderWidth);
  }
  /* #endif */
}
</style>
