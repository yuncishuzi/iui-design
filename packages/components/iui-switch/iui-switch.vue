<template>
  <view :class="cls" @click="handleChange">
    <view
      :class="[
        `${prefixCls}-container`,
        {
          checked: checked,
        },
      ]"
    >
      <view :class="`${prefixCls}-text-checked`">
        <text v-if="checkedText">
          {{ checkedText }}
        </text>
      </view>
      <view :class="`${prefixCls}-trigger`"> </view>
      <view :class="`${prefixCls}-text-unchecked`">
        <text v-if="uncheckedText">
          {{ uncheckedText }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 值
   */
  modelValue: {
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
   * 颜色
   */
  color: {
    type: String,
    default: "#165DFF",
  },

  /**
   * 尺寸
   * size: small | medium | large
   */
  size: {
    type: String,
    default: "medium",
  },
  /**
   * 激活文字
   */
  checkedText: {
    type: String,
  },
  /**
   * 未激活文字
   */
  uncheckedText: {
    type: String,
  },
  /**
   * 形状
   * shape: round | square
   */
  shape: {
    type: String,
    default: "round",
  },
  /**
   * 切换前
   */
  beforeChange: {
    type: Function,
  },
});

const prefixCls = "iui-switch";
const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${props.shape}`,
  {
    [`${prefixCls}-disabled`]: props.disabled,
  },
]);

const checked = ref(props.modelValue);

const emit = defineEmits(["update:modelValue", "change"]);

const handleChange = async () => {
  if (props.disabled) {
    return;
  }

  const done = () => {
    checked.value = !checked.value;
    emit("update:modelValue", checked.value);
    emit("change", checked.value);
  };

  if (props.beforeChange) {
    await props.beforeChange(!checked.value, done);
  } else {
    done();
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-switch {
  display: inline-block;
  transition: all 200ms ease-in-out;

  &-square {
    .iui-switch-container {
      border-radius: $border-radius-small;
      height: $size-6;
      min-width: $size-12;

      &.checked {
        .iui-switch-trigger {
          left: calc(100% - 2px - #{$size-5});
          height: $size-5;
          width: $size-5;
        }
      }
    }
    .iui-switch-trigger {
      border-radius: $border-radius-small;
      height: $size-5;
      width: $size-5;
      left: 2px;
    }
  }

  &-container {
    min-width: $size-13;
    height: $size-7;
    background: $color-bg-active;
    border-radius: $size-4;
    position: relative;
    transition: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.checked {
      background: v-bind(color);

      .iui-switch-trigger {
        left: calc(100% - 2px - #{$size-6});
        width: $size-6;
        height: $size-6;
      }
    }
  }
  &-trigger {
    width: $size-5;
    height: $size-5;
    background: $color-white;
    border-radius: $border-radius-huge;
    position: absolute;
    left: 4px;
    transition: all 200ms cubic-bezier(0.2, 0.8, 0.32, 1.2);
  }

  &-text-checked {
    font-size: $font-size-small;
    margin-right: 4px;
    padding-left: 8px;
    opacity: 0;
    transition: all 200ms ease-in-out;
    color: $color-white;

    .checked & {
      opacity: 1;
    }
  }

  &-text-unchecked {
    font-size: $font-size-small;
    color: $gray-6;
    margin-left: 4px;
    padding-right: 8px;
    opacity: 1;
    transition: all 200ms ease-in-out;

    .checked & {
      opacity: 0;
    }
  }

  &-disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &-container {
      background: $color-bg-secondary;
    }
  }
}
</style>
