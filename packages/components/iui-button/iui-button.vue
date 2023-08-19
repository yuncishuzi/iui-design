<template>
  <button
    :class="[cls]"
    :disabled="disabled || loading"
    :open-type="openType"
    :style="{
      height: isNumber(size) ? `${size}px` : 'inherit',
      fontSize: isNumber(size) ? `${size / 3}px` : '',
    }"
    hover-class="none"
    @click="handleClick"
    @getphonenumber="getPhoneNumber"
    @opensetting="openSetting"
    @launchapp="launchApp"
    @error="openTypeError"
  >
    <view :class="`${prefixCls}-content`">
      <template v-if="props.icon || $slots.icon || props.loading">
        <view
          :style="{
            marginRight: shape !== 'circle' && $slots.default ? '4px' : 0,
          }"
        >
          <slot v-if="$slots.icon" name="icon" />
          <iui-icon v-else-if="props.icon" :name="props.icon" :size="18" />
          <view v-else class="loading"></view>
        </view>
      </template>
      <text class="text" v-if="shape !== 'circle'"><slot /> </text>
    </view>
  </button>
</template>

<script setup>
// TODO:
// 小程序属性
import { computed, useSlots } from "vue";
import IuiIcon from "../iui-icon/iui-icon.vue";
import { isNumber } from "../../helper/is";

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
   * size: huge | large | medium | small | mini | Number
   * 为Number时，size为按钮高度
   */
  size: {
    type: [String, Number],
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
  /**
   * 对标微信小程序开放能力
   * openType
   */
  openType: {
    type: String,
  }
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

// 微信开放能力（获取手机号）
const getPhoneNumber = (e) => {
  emits('getphonenumber', e)
}
// 微信开放能力（打开设置面板）
const openSetting = (e) => {
  emits('opensetting', e)
}
// 微信开放能力（打开App成功回调）
const launchApp = (e) => {
  emits('launchapp', e)
}
// 微信开放能力（当使用开放能力时，发生错误的回调）
const openTypeError = (e) => {
  emits('error', e)
}

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
    min-height: $size-huge;
    min-width: $size-huge;
    line-height: $size-huge - 2px;
    font-size: $font-size-huge;
  }
  &-large {
    min-height: $size-large;
    min-width: $size-large;
    line-height: $size-large - 2px;
    font-size: $font-size-large;
  }
  &-medium {
    min-height: $size-medium;
    min-width: $size-medium;
    line-height: $size-medium - 2px;
    font-size: $font-size-medium;
  }
  &-small {
    min-height: $size-small;
    min-width: $size-small;
    line-height: $size-small - 2px;
    font-size: $font-size-small;
  }
  &-mini {
    min-height: $size-mini;
    min-width: $size-mini;
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
    border-radius: $border-radius-huge;
  }
  &-circle {
    border-radius: $border-radius-round;

    text-align: center;
    padding: 0;
    display: inline-block;
    width: auto;

    /* #ifdef MP */
    width: inherit;
    /* #endif */
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
  height: 100%;

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
    height: 100%;

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
