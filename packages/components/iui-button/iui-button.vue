<template>
  <button
    :class="[cls]"
    :disabled="disabled || loading"
    hover-class="none"
    @click="handleClick"
    iui="true"
  >
    <view :class="`${prefixCls}-content`">
      <template v-if="props.icon || $slots.icon || props.loading">
        <view
          :style="{
            marginRight: $slots.default ? '4px' : 0,
          }"
        >
          <slot v-if="$slots.icon" name="icon" />
          <iui-icon v-else-if="props.icon" :name="props.icon" :size="18" />
          <view v-else class="loading"></view>
        </view>
      </template>
      <text class="text"><slot /> </text>
    </view>
  </button>
</template>

<script setup>
// TODO:
// 小程序属性
import { computed, useSlots } from "vue";
import IuiIcon from "../iui-icon/iui-icon.vue";
import IuiSpin from "../iui-spin/iui-spin.vue";

const props = defineProps({
  // 通用属性
  /**
   * 按钮类型
   * 分为三种：主要按钮、次要按钮、线框按钮
   * type: primary | secondary  | outline
   */
  type: {
    type: String,
  },
  /**
   * 按钮形状
   * 分为三种：方形按钮、圆角按钮、圆形按钮
   * shape: square | round | circle
   */
  shape: {
    type: String,
    default: "square",
  },
  /**
   * 加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 按钮大小
   * size: huge | large | medium | small | mini
   */
  size: {
    type: String,
    default: "large",
  },
  /**
   * 按钮状态
   * normal | success | danger | warning
   */
  status: {
    type: String,
    default: "normal",
  },
  /**
   * 内联
   */
  inline: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标
   * icon
   */
  icon: {
    type: String,
  },
});

const prefixCls = "iui-button";

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${props.type || "secondary"}-${props.status}`,
  `${prefixCls}-shape-${props.shape}`,
  `${prefixCls}-size-${props.size}`,
  {
    [`${prefixCls}-disabled`]: props.disabled,
    [`${prefixCls}-loading`]: props.loading,
    [`${prefixCls}-inline`]: props.inline,
  },
]);

const emits = defineEmits(["click"]);

// 点击事件
const handleClick = (e) => {
  if (props.disabled || props.loading) {
    return;
  }
  emits("click", e);
};

const slots = useSlots();

// 获取inline padding
const inlinePadding = computed(() => {
  if (!slots.default) {
    return "8px";
  }

  return "16px";
});
</script>

<script>
export default {
  name: "iui-button",
};
</script>

<style lang="scss" scoped>
@import "./style//token.scss";

// 按钮大小
@mixin btn-size {
  &-huge {
    height: $size-huge;
    line-height: $size-huge - 2px;
    font-size: $font-size-huge;
  }
  &-large {
    height: $size-large;
    line-height: $size-large - 2px;
    font-size: $font-size-large;
  }
  &-medium {
    height: $size-medium;
    line-height: $size-medium - 2px;
    font-size: $font-size-medium;
  }
  &-small {
    height: $size-small;
    line-height: $size-small - 2px;
    font-size: $font-size-small;
  }
  &-mini {
    height: $size-mini;
    line-height: $size-mini - 2px;
    font-size: $font-size-mini;
  }
}
// 按钮形状
@mixin btn-shape {
  &-square {
    border-radius: $border-radius-small;
  }
  &-round {
    border-radius: $border-radius-medium;
  }
  &-circle {
    border-radius: $border-radius-huge;
  }
}
// 按钮样式
@mixin btn-style($type, $status) {
  &-#{$type}-#{$status} {
    color: map-get($tokens, btn-#{$type}-#{$status}-text-color);
    background-color: map-get($tokens, btn-#{$type}-#{$status}-bg-color);
    border: 1px solid map-get($tokens, btn-#{$type}-#{$status}-border-color);

    &:active {
      border-color: map-get(
        $tokens,
        btn-#{$type}-#{$status}-active-border-color
      );
      background-color: map-get(
        $tokens,
        btn-#{$type}-#{$status}-active-bg-color
      );
    }

    &.iui-button-disabled,
    &.iui-button-loading {
      color: map-get($tokens, btn-#{$type}-#{$status}-disabled-text-color);
      background-color: map-get(
        $tokens,
        btn-#{$type}-#{$status}-disabled-bg-color
      );
      border-color: map-get(
        $tokens,
        btn-#{$type}-#{$status}-disabled-border-color
      );

      .loading {
        width: 10px;
        height: 10px;
        border: 1px solid
          map-get($tokens, btn-#{$type}-#{$status}-disabled-text-color);
        border-top-color: transparent;
        border-radius: 100%;

        animation: spin infinite 0.75s linear;
      }
    }
  }
}

.iui-button {
  margin: 0;
  padding: 0 $size-2;
  width: 100%;

  &-inline {
    display: inline-block;
    padding: 0 v-bind(inlinePadding);
    width: auto;

    /* #ifdef MP */
    width: inherit;
    /* #endif */
  }

  &-size {
    @include btn-size;
  }

  &-shape {
    @include btn-shape;
  }

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      white-space: nowrap;
    }
  }

  @include btn-style("primary", "normal");
  @include btn-style("primary", "success");
  @include btn-style("primary", "danger");
  @include btn-style("primary", "warning");

  @include btn-style("secondary", "normal");
  @include btn-style("secondary", "success");
  @include btn-style("secondary", "danger");
  @include btn-style("secondary", "warning");

  @include btn-style("outline", "normal");
  @include btn-style("outline", "success");
  @include btn-style("outline", "danger");
  @include btn-style("outline", "warning");

  &::after {
    display: none;
  }
}
</style>
