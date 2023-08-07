<template>
  <view :class="cls">
    <view
      :class="[
        `${prefixCls}-btn reduce`,
        {
          [`${prefixCls}-btn-disabled`]: isNumber(min) && innerValue === min,
        },
      ]"
      @click="handleClickReduce"
    >
      <iui-icon name="minus"></iui-icon>
    </view>
    <view :class="`${prefixCls}-value`">
      <input
        :value="calcValue"
        class="input"
        type="number"
        :disabled="!input || disabled"
      />
    </view>
    <view
      :class="[
        `${prefixCls}-btn plus`,
        {
          [`${prefixCls}-btn-disabled`]: isNumber(max) && innerValue === max,
        },
      ]"
      @click="handleClickPlus"
    >
      <iui-icon name="plus"></iui-icon>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import { isNumber } from "../../helper/is";

const props = defineProps({
  /**
   * 值
   */
  modelValue: {
    type: Number,
    default: 1,
  },
  /**
   * 最小值
   */
  min: {
    type: Number,
  },
  /**
   * 最大值
   */
  max: {
    type: Number,
  },
  /**
   * 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * 样式类型
   * type : default | outline | round
   */
  type: {
    type: String,
    default: "default",
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 小数点
   */
  decimal: {
    type: Number,
    default: 0,
  },
  /**
   * 允许通过输入框直接输入
   */
  input: {
    type: Boolean,
    default: false,
  },
});

const prefixCls = "iui-stepper";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-${props.type}`]: props.type,
    [`${prefixCls}-disabled`]: props.disabled,
  },
]);

const innerValue = ref(props.modelValue);

// 计算小数点
const calcValue = computed(() => {
  const value = innerValue.value;
  const decimal = props.decimal;
  if (decimal <= 0) return value;
  return value.toFixed(decimal);
});

const emit = defineEmits(["update:modelValue", "change"]);

const handleClickPlus = () => {
  if (props.disabled) return;
  const value = innerValue.value + props.step;
  if (isNumber(props.max) && value > props.max) return;
  innerValue.value = value;
  emit("update:modelValue", value);
  emit("change", value);
};

const handleClickReduce = () => {
  if (props.disabled) return;
  const value = innerValue.value - props.step;
  if (isNumber(props.min) && value < props.min) return;
  innerValue.value = value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-stepper {
  display: flex;
  justify-content: center;
  align-items: center;

  &-btn {
    width: $size-7;
    height: $size-7;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-bg-secondary;
    font-size: $font-size-small;
    color: $color-text-light;

    &-disabled {
      opacity: 0.7;
      color: $color-text-lighten;
      cursor: not-allowed;
      pointer-events: none;
    }

    &:active {
      opacity: 0.8;
    }
  }

  &-value {
    color: $color-text;
    .input {
      width: $size-9;
      height: $size-7 - 2;
      padding: 1px 2px;
      margin: 0 1px;
      background-color: $color-bg-secondary;
      text-align: center;
      font-size: $font-size-small;
    }
  }

  &-disabled {
    opacity: 0.7;

    .iui-stepper-btn {
      color: $color-text-lighten;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &-outline {
    .iui-stepper-btn {
      border: 1px solid $color-border;
      background-color: $color-bg;

      &.reduce {
        border-top-left-radius: $border-radius-small;
        border-bottom-left-radius: $border-radius-small;
      }

      &.plus {
        border-top-right-radius: $border-radius-small;
        border-bottom-right-radius: $border-radius-small;
      }
    }

    .iui-stepper-value {
      .input {
        border: 1px solid $color-border;
        border-left: none;
        border-right: none;
        margin: 0;
        background-color: $color-bg;
      }
    }
  }

  &-round {
    .iui-stepper-btn {
      border-radius: $border-radius-round;
      background-color: $color-bg-secondary;
    }

    .iui-stepper-value {
      .input {
        margin: 0;
        background-color: transparent;
      }
    }
  }
}
</style>
