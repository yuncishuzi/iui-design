<template>
  <view
    :class="[
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-spin`]: spin || name === 'loading',
      },
    ]"
    :style="{
      transform: `rotate(${rotate}deg)`,
    }"
  >
    <text
      :class="cls"
      :style="{
        color: color,
        fontSize: size ? `${size}px` : 'inherit',
        lineHeight: size ? `${size}px` : 'inherit',
      }"
    ></text>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * 图标名称
   * 对应iconfont图标名称
   */
  name: {
    type: String,
    default: "",
  },
  /**
   * 图标颜色
   */
  color: {
    type: String,
    default: "inherit",
  },
  /**
   * 图标大小
   */
  size: {
    type: Number,
  },
  /**
   * 自动旋转
   * 一般用于加载图标
   */
  spin: {
    type: Boolean,
    default: false,
  },
  /**
   * 自定义旋转角度
   * 用于微调图标角度
   */
  rotate: {
    type: Number,
    default: 0,
  },
});

const prefixCls = "iui-icon";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-${props.name}`]: props.name,
  },
]);
</script>

<style lang="scss" scoped>
@import "../../style/theme/icon.scss";

.iui-icon-wrapper {
  display: inline-flex;
  width: auto;
}

// 自动旋转
.iui-icon-spin {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
