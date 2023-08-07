<template>
  <view :class="cls">
    <view :class="`${prefixCls}-text`" v-if="direction === 'horizontal'">
      <slot />
    </view>
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
   * type: solid | dashed | dotted
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
    default: 1,
  },
  /**
   * 分割线宽度/高度
   * margin
   * 分割线上下 margin (垂直方向时为左右 margin)
   */
  margin: {
    type: [Number, String],
    default: 20,
  },
  /**
   * 文字背景
   */
  textBg: {
    type: String,
    default: "var(--iui-bg)",
  },
});

const prefixCls = "iui-divider";

const cls = computed(() => [
  prefixCls,
  [
    `${prefixCls}-${props.direction}`,
    `${prefixCls}-align-${props.align}`,
    `${prefixCls}-${props.type}`,
  ],
]);

const margin = computed(() => {
  if (props.direction === "horizontal") {
    return `${props.margin}px 0`;
  } else {
    return `0 ${props.margin}px`;
  }
});

const size = computed(() => `${props.size}px`);
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-divider {
  &-horizontal {
    position: relative;
    clear: both;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    margin: v-bind(margin);
    border-bottom: v-bind(size) v-bind(type) $color-border;
  }

  &-vertical {
    display: inline-block;
    min-width: 1px;
    max-width: 1px;
    min-height: 1em;
    margin: v-bind(margin);
    vertical-align: middle;
    border-left: v-bind(size) v-bind(type) $color-border;
  }

  &-text {
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    padding: 0 16px;
    line-height: 2;
    font-size: 14px;
    transform: translateY(-50%);
    background-color: v-bind(textBg);
    color: $color-text;
  }

  &-align {
    &-start {
      .iui-divider-text {
        left: 24px;
      }
    }

    &-center {
      .iui-divider-text {
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &-end {
      .iui-divider-text {
        right: 24px;
      }
    }
  }
}
</style>
