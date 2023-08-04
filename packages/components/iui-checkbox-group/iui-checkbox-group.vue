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
  modelValue: {
    type: Array,
    default: () => [],
  },
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
const checkedValues = ref([]);

const prefixCls = "iui-checkbox-group";

const cls = computed(() => [prefixCls]);

const emit = defineEmits(["update:modelValue", "change"]);

// 供子组件监听状态
// 全选
const isCheckedAll = ref(false);
// 反选
const isReverseChecked = ref(false);

// 选中值变化
const handleCheckboxChange = (value) => {
  if (checkedValues.value.includes(value)) {
    checkedValues.value = checkedValues.value.filter((item) => item !== value);
  } else {
    checkedValues.value.push(value);
  }
  emit("update:modelValue", checkedValues.value);
  emit("change", checkedValues.value);
};

provide("checkbox-group", {
  justify: props.justify,
  isCheckedAll,
  isReverseChecked,
  checkedValues,
  handleCheckboxChange,
});

const checkAll = () => {
  isCheckedAll.value = !isCheckedAll.value;
};

const reverseChecked = () => {
  isReverseChecked.value = !isReverseChecked.value;
};

defineExpose({
  isCheckedAll,
  isReverseChecked,
  checkAll,
  reverseChecked,
});
</script>

<style lang="scss" scoped></style>
