<template>
  <view :class="cls">
    <slot />
  </view>
</template>

<script setup>
import { computed, provide, ref } from "vue";

const props = defineProps({
  /**
   * 值
   */
  modelValue: [String, Number, Boolean],
  /**
   * 通栏
   * justify
   */
  justify: {
    type: Boolean,
    default: false,
  },
});

// 选中值
const checkedValue = ref([props.modelValue]);

const prefixCls = "iui-radio-group";

const cls = computed(() => [prefixCls]);

const emit = defineEmits(["update:modelValue", "change"]);

// 选中值变化
const handleRadioChange = (value) => {
  if (!checkedValue.value.includes(value)) {
    checkedValue.value = [value];
  }
  emit("update:modelValue", value);
  emit("change", value);
};

provide("radio-group", {
  justify: props.justify,
  checkedValue,
  handleRadioChange,
});
</script>

<style lang="scss" scoped></style>
