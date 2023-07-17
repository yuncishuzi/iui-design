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
});

const prefixCls = "iui-switch";
const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-disabled`]: props.disabled,
  },
]);

const checked = ref(props.modelValue);

const emit = defineEmits(["update:modelValue", "change"]);

const handleChange = () => {
  if (props.disabled) {
    return;
  }
  checked.value = !checked.value;
  emit("update:modelValue", checked.value);
  emit("change", checked.value);
};
</script>

<style lang="scss" scoped>
@import "../style/index.scss";
.iui-switch {
  display: inline-block;
  transition: all 200ms ease-in-out;

  &-container {
    min-width: $size-14;
    height: $size-8;
    background: $color-bg-active;
    border-radius: $size-4;
    position: relative;
    transition: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &.checked {
      background: $primary-6;

      .iui-switch-trigger {
        left: calc(100% - 2px - #{$size-7});
      }
    }
  }
  &-trigger {
    width: $size-7;
    height: $size-7;
    background: $color-white;
    border-radius: $border-radius-huge;
    position: absolute;
    left: 2px;
    top: 2px;
    transition: inherit;
  }

  &-text-checked {
    color: $color-white;
    font-size: $font-size-small;
    margin: 0 8px;
  }

  &-text-unchecked {
    font-size: $font-size-small;
    color: $gray-6;
    margin: 0 8px;

    .checked & {
      color: $primary-6;
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
