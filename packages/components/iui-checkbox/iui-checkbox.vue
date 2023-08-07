<template>
  <view :class="cls" @click="handleClick">
    <view
      :class="[
        `${prefixCls}-icon`,
        {
          checked: checked,
        },
      ]"
    >
    </view>
    <view :class="`${prefixCls}-label`" v-if="label"> {{ label }}</view>
  </view>
</template>

<script setup>
import { computed, ref, inject, watch } from "vue";
import Base64 from "../../helper/base64";

const props = defineProps({
  /**
   * 值
   */
  modelValue: {
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
   * 标签
   */
  label: {
    type: String,
  },
  /**
   * 值
   */
  value: {
    type: [String, Number, Boolean],
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否选中
   */
  checked: {
    type: Boolean,
    default: false,
  },
  /**
   * 通栏
   */
  justify: {
    type: Boolean,
    default: false,
  },
});

const iconTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm4.9 6.3L10 13.2s0 .1-.1.1l-.6.7c-.1.1-.2.1-.3.2-.1 0-.3 0-.4-.1l-.6-.7-.1-.1-2.8-2.4c-.2-.2-.2-.5-.1-.7l.6-.7c.2-.2.5-.2.7-.1l2.5 2.1L13.5 6c.2-.2.5-.2.7-.1l.7.6c.1.3.2.6 0 .8z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"></path></svg>`;

const icon = computed(() => {
  const svg = iconTemplate.replace("currentColor", props.color);
  const result = `url(data:image/svg+xml;base64,${Base64.encode(svg)})`;
  return result;
});

// 父级组件
const group = inject("checkbox-group");

const prefixCls = "iui-checkbox";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-disabled`]: props.disabled,
    [`${prefixCls}-justify`]: group?.justify || props.justify,
  },
]);

const checked = ref(props.checked || props.modelValue);

const value = props.value || props.label;

const emit = defineEmits(["update:modelValue", "change"]);

const handleClick = () => {
  if (props.disabled) return;
  checked.value = !checked.value;
  emit("update:modelValue", checked.value);
  emit("change", checked.value);
  if (group) {
    group.handleCheckboxChange(value);
  }
};

if (group) {
  const { checkedValues, isCheckedAll, isReverseChecked } = group;
  watch(
    () => checkedValues.value.length,
    () => {
      checked.value = checkedValues.value.includes(value);
    }
  );

  // 监听全选
  watch(
    () => isCheckedAll.value,
    (val) => {
      if ((val && !checked.value) || (!val && checked.value))
        group.handleCheckboxChange(value);
    }
  );

  // 监听反选
  watch(
    () => isReverseChecked.value,
    () => {
      group.handleCheckboxChange(value);
    }
  );
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-checkbox {
  display: flex;
  align-items: center;
  white-space: nowrap;

  &-icon {
    display: inline-block;

    border-radius: 50%;
    width: $size-5;
    height: $size-5;
    border: 1px solid $color-text-lighten;

    &.checked {
      border: none;
      width: $size-5 + 2;
      height: $size-5 + 2;
      background-size: cover;
      //   border-color: $primary-6;
      background-image: v-bind(icon);
    }
  }

  &-label {
    margin-left: $size-2;
    color: $color-text;
  }

  &-disabled {
    cursor: not-allowed;
    color: $color-text-lighten;

    .iui-checkbox-icon {
      border-color: $color-border-lighten;
      background-color: $color-bg-secondary;
    }

    .checked {
      opacity: 0.5;
    }
  }

  &-justify {
    flex-flow: row-reverse;
    width: 100%;
    justify-content: space-between;

    .iui-checkbox-label {
      margin-left: 0;
      margin-right: $size-2;
    }
  }
}
</style>
