<template>
  <view :class="`${prefixCls}-wrapper`">
    <view
      :class="cls"
      :style="{
        background: color,
      }"
    >
      <view v-if="dot" :class="`${prefixCls}-dot`"> </view>
      <view v-else :class="`${prefixCls}-text`">
        <view
          v-if="icon"
          :class="`${prefixCls}-icon`"
          :style="{
            fontSize: text ? '14px' : '12px',
            marginRight: text ? '2px' : 0,
          }"
        >
          <iui-icon v-if="icon" :name="icon"></iui-icon>
        </view>
        <text>{{ getBadgeText() }}</text>
      </view>
    </view>
    <slot />
  </view>
</template>

<script setup>
import { computed, useSlots } from "vue";
import { isArray, isEmpty } from "../../helper/is";

const props = defineProps({
  /**
   * 内容
   */
  text: {
    type: String,
    default: "",
  },
  /**
   * 颜色
   */
  color: {
    type: String,
    default: "#F53F3F",
  },
  /**
   * 显示为点
   */
  dot: {
    type: Boolean,
    default: false,
  },
  /**
   * 显示位置 仅当slot有内容时有效
   * position: center ｜ tl | tr | bl | br ｜ [x, y]
   */
  position: {
    type: [String, Array],
    default: "tr",
  },
  /**
   * 最大值
   * max: 99 超出最大值显示为 99+
   */
  max: {
    type: Number,
    default: 99,
  },
  /**
   * 图标
   */
  icon: {
    type: String,
  },
});

const prefixCls = "iui-badge";

const slots = useSlots();
const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-${props.position}`]:
      !isArray(props.position) && slots.default,
    [`${prefixCls}-custom-position`]: isArray(props.position),
  },
]);

const getBadgeText = () => {
  const { text, max } = props;
  if (isEmpty(text)) {
    return "";
  }
  if (text > max) {
    return `${max}+`;
  }
  return text;
};
// 自定义位置
const positionX = isArray(props.position) ? `${props.position[0]}px` : 0;
const positionY = isArray(props.position) ? `${props.position[1]}px` : 0;

// 徽章padding
const getPadding = computed(() => {
  if (props.dot) {
    return 0;
  }

  if (props.icon) {
    return "0 3px";
  }

  return "0 6px";
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-badge-wrapper {
  position: relative;
  display: inline-flex;
  height: 100%;
}
.iui-badge {
  display: inline-block;
  font-size: $font-size-mini;
  color: $color-white;
  border-radius: $border-radius-huge;
  padding: v-bind(getPadding);
  z-index: 1100;

  &-text {
    display: flex;
    align-items: center;
  }

  &-dot {
    width: $size-2;
    height: $size-2;
    border-radius: 50%;
  }

  &-tl {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  &-tr {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  &-bl {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  &-br {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }

  &-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-custom-position {
    position: absolute;
    left: v-bind(positionX);
    top: v-bind(positionY);
    transform: translate(0, 0);
  }
}
</style>
