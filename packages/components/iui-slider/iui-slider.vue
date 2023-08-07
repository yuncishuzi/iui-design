<template>
  <view
    :class="cls"
    @mousedown="onTouchStart"
    @mousemove="onTouchMove"
    @mouseup="onTouchEnd"
  >
    <view :class="`${prefixCls}-prefix`" v-if="$slots.prefix">
      <slot name="prefix" />
    </view>
    <view :class="`${prefixCls}-line`" id="line">
      <view
        :class="`${prefixCls}-wrapper`"
        :style="{
          left: `${left}px`,
        }"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <view
          :class="`${prefixCls}-popover`"
          :style="{
            opacity: popover === 'always' ? 1 : showPopover ? 1 : 0,
          }"
          v-if="popover"
        >
          {{ innerValue }} {{ unit }}
        </view>
        <view :class="`${prefixCls}-thumb-wrapper`">
          <view class="default-thumb" v-if="!$slots.thumb"></view>
          <slot name="thumb" :value="innerValue" />
        </view>
      </view>

      <view
        :class="`${prefixCls}-active`"
        :style="{
          width: `${left}px`,
        }"
      ></view>
    </view>
    <view :class="`${prefixCls}-suffix`" v-if="$slots.suffix">
      <slot name="suffix" />
    </view>
  </view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getRect } from "../../helper/rect";

const props = defineProps({
  /**
   * 值
   */
  modelValue: {
    type: Number,
    default: 0,
  },

  /**
   * 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 显示气泡
   * 默认 滑动时显示气泡
   * false 不显示气泡
   * true 滑动时显示气泡
   * 'always' 总是显示气泡
   */
  popover: {
    type: [String, Boolean],
    default: true,
  },
  /**
   * 单位
   */
  unit: {
    type: String,
  },
  /**
   * 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * 线条颜色
   */
  lineColor: {
    type: String,
    default: "var(--iui-bg-light)",
  },
  /**
   * 激活条颜色
   */
  activeColor: {
    type: String,
    default: "#165DFF",
  },
  /**
   * 线条粗细
   */
  lineHeight: {
    type: Number,
    default: 2,
  },
});

const instance = getCurrentInstance();

const prefixCls = "iui-slider";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-disabled`]: props.disabled,
  },
]);

// 滑块的宽度
const lineWidth = ref(0);
const lineLeft = ref(0);

const innerValue = computed(() => {
  return Number(((left.value / lineWidth.value) * props.max).toFixed(0));
});

// 滑块距离左边的距离
const left = ref(0);

const emit = defineEmits(["update:modelValue", "changing", "change"]);

const showPopover = ref(false);

// 是否开始滑动
const start = ref(false);

const onTouchStart = () => {
  if (props.disabled) return;
  start.value = true;
  showPopover.value = true;
};

const onTouchEnd = () => {
  console.log(start.value);
  if (props.disabled) return;
  start.value = false;
  showPopover.value = false;
  emit("update:modelValue", innerValue.value);
  emit("change", innerValue.value);
};

const onTouchMove = (e) => {
  if (props.disabled || !start.value) return;

  const x = e.touches[0].pageX.toFixed(0) - lineLeft.value;

  if (x < 0) {
    left.value = 0;
    return;
  } else if (x > lineWidth.value) {
    left.value = lineWidth.value;
    return;
  }
  emit("changing", innerValue.value);
  if (props.step === 1) {
    left.value = x;
    return;
  }
  // 计算步长
  const step =
    Math.round(((x / lineWidth.value) * props.max) / props.step) * props.step;

  left.value = (step / props.max) * lineWidth.value;
};

onMounted(() => {
  getRect(instance, "#line").then((rect) => {
    lineWidth.value = rect.width;
    lineLeft.value = rect.left;
    left.value = (props.modelValue / props.max) * lineWidth.value;
  });
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-slider {
  padding: $size-3 $size-4;
  touch-action: none;
  display: flex;
  align-items: center;

  &-line {
    width: 100%;
    height: calc(v-bind(lineHeight) * 1px);
    background-color: v-bind(lineColor);
    border-radius: $border-radius-small;
    position: relative;
    transition: all 0.3s ease-in-out;
  }

  &-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &-active {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(v-bind(lineHeight) * 1px);
    background-color: v-bind(activeColor);
    border-radius: $border-radius-small;
  }

  &-thumb-wrapper {
    position: absolute;
    transform: translate(-50%, calc(-50% + v-bind(lineHeight) / 2 * 1px));
    z-index: 1;
    left: inherit;

    .default-thumb {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      background: $color-white;
      width: $size-6;
      height: $size-6;
    }
  }

  &-popover {
    padding: $size-2 $size-3;
    background-color: black;
    position: absolute;
    top: -40px;
    border-radius: $border-radius-medium;
    color: $color-white;
    left: inherit;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: 13px;
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
    pointer-events: none;

    &:after {
      content: " ";
      background-color: inherit;
      position: absolute;
      width: 8px;
      height: 8px;
      bottom: -4px;
      transform: rotate(45deg);
      left: calc(50% - 4px);
      border-bottom-right-radius: 2px;
    }
  }

  &-prefix {
    margin-right: $size-3;
  }

  &-suffix {
    margin-left: $size-3;
  }
}
</style>
