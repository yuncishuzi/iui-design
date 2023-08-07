<template>
  <view
    :class="cls"
    :style="{
      padding: inForm ? '0' : '18px',
    }"
  >
    <textarea
      :auto-height="!height"
      :class="`${prefixCls}-input`"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :placeholder-class="`${prefixCls}-placeholder`"
      :disabled="disabled"
      :style="{
        height: `${height}px`,
      }"
      :maxlength="maxlength"
      placeholder-class="iui-textarea-placeholder"
      @input="handleInput"
      @blur="handleBlur"
      @focus="$emit('focus', $event)"
    />
    <view :class="`${prefixCls}-statistic`" v-if="showLimit">
      {{ innerValue.length || 0 }}/{{ maxlength }}
    </view>
  </view>
</template>

<script setup>
import { computed, inject, ref } from "vue";
const props = defineProps({
  /**
   * 值
   */
  modelValue: {
    type: String,
    default: "",
  },
  /**
   * 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 字数限制
   */
  maxlength: {
    type: Number,
    default: 140,
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: "",
  },
  /**
   * 显示字数统计
   */
  showLimit: {
    type: Boolean,
    default: false,
  },
  /**
   * 固定高度
   */
  height: {
    type: Number,
  },
  /**
   * 占位符样式
   */
  placeholderStyle: {
    type: Object,
    default: () => ({
      color: "#c9cdd4",
      fontSize: "15px",
    }),
  },
});

const prefixCls = "iui-textarea";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-disabled`]: props.disabled,
  },
]);

const emit = defineEmits(["update:modelValue", "input", "blur", "focus"]);

const innerValue = ref(props.modelValue);

const formItem = inject("formItem");

const handleInput = (event) => {
  innerValue.value = event.detail.value;
  emit("update:modelValue", innerValue.value);
  emit("input", event);
};

const handleBlur = (event) => {
  emit("blur", event);
  if (formItem) {
    formItem.triggerEvent("blur");
  }
};

// 表单中
const inForm = inject("inForm");
</script>

<style lang="scss" scoped>
.iui-textarea {
  padding: 18px;
  display: flex;
  flex-direction: column;
  color: $color-text;

  &-input {
    width: 100%;
    min-height: 50px;
  }

  &-placeholder {
    color: $color-text-input-placeholder !important;
    font-size: 15px !important;
  }

  &-disabled {
    .iui-textarea-input {
      color: $color-text-lighten;
      cursor: not-allowed;
    }
  }

  &-statistic {
    height: 20px;
    font-size: 14px;
    color: $color-text-lighten;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<style lang="scss">
.iui-textarea-placeholder {
  color: $color-text-input-placeholder;
  font-size: 15px;
}
</style>
