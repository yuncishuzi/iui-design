<template>
  <view :class="cls">
    <view
      v-if="!$slots.default || loading"
      class="container"
      :style="{
        height: fullScreen ? '100vh' : '100%',
      }"
      @touchmove.prevent
    >
      <view class="cricle"></view>
      <text v-if="tip" class="text">{{ tip }}</text>
    </view>

    <slot />
  </view>
</template>

<script setup>
import { computed, useSlots } from "vue";

const props = defineProps({
  // 通用属性
  /**
   * 图标大小
   */
  size: {
    type: Number,
    default: 16,
  },
  /**
   * 图标颜色
   */
  color: {
    type: String,
    default: "#3C7EFF",
  },
  /**
   * 描述文案
   */
  tip: {
    type: String,
  },

  // 在容器中使用
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 遮罩颜色
   */
  maskColor: {
    type: String,
    default: "var(--iui-bg-opacity)",
  },
  /**
   * 全屏
   * 解决在容器中使用时，loading 时，容器滚动问题
   */
  fullScreen: {
    type: Boolean,
    default: false,
  },
});

const prefixCls = "iui-spin";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-loading`]: props.loading,
    [`${prefixCls}-tip`]: props.tip,
  },
]);

const iconSize = computed(() => `${props.size}px`);

const slots = useSlots();
const showLoading = computed(() => {
  if (slots.default && !props.loading) {
    return "none";
  }
  return "flex";
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-spin {
  &-tip {
    .container {
      display: inline-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .text {
        color: v-bind(color);
        margin-top: $size-3;
        font-size: $font-size-small;
      }
    }
  }

  &-loading {
    position: relative;
    display: v-bind(showLoading);
    animation: fadeIn 200ms ease;

    .container {
      width: 100%;
      height: 100%;
      z-index: 1300;
      position: absolute;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background-color: v-bind(maskColor);
    }
  }

  .cricle {
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    border: 2px solid v-bind(color);
    border-top-color: transparent;
    border-radius: 100%;

    animation: spin infinite 0.75s linear;
  }
}
</style>
