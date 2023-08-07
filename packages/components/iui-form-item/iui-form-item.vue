<template>
  <view :class="prefixCls">
    <cell
      class="form-cell iui-cell"
      :style="{
        alignItems: align === 'center' ? 'center' : `flex-${align}`,
        flexDirection: vertical ? 'column' : 'row',
        borderBottom: split ? 'inhert' : 'none',
      }"
    >
      <view
        :class="[
          `${prefixCls}-label`,
          {
            [`${prefixCls}-label-required`]: required,
            [`${prefixCls}-label-vertical`]: vertical,
          },
        ]"
      >
        {{ label }}
      </view>

      <view :class="`${prefixCls}-content`">
        <view :class="`${prefixCls}-control`">
          <slot />
        </view>

        <view :class="`${prefixCls}-extra`">{{ extra }}</view>

        <view :class="`${prefixCls}-error-hint`" v-if="errorHint">
          <slot name="error" :message="errorHint">
            {{ errorHint }}
          </slot>
        </view>
      </view>
    </cell>
  </view>
</template>

<script setup>
import { computed, inject, onMounted, provide, ref, watch } from "vue";
import { isArray, isString, isObject } from "../../helper/is";

const props = defineProps({
  /**
   * 字段
   */
  field: {
    type: String,
  },
  /**
   * 标签
   */
  label: {
    type: String,
  },
  /**
   * 必填
   * 显示 * 号，不会校验，校验需要在 rules 中配置
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * 校验规则
   * 优先级高于form的rules
   */
  rules: {
    type: Array,
  },
  /**
   * 额外显示的文案
   */
  extra: {
    type: String,
  },
  /**
   * 对齐
   */
  align: {
    type: String,
    default: "start",
  },
});

const prefixCls = "iui-form-item";

// 表单属性
const formProps = inject("formProps");
const inForm = inject("inForm");
const setRule = inject("setRule");
const errorHints = inject("errorHints");
const validateField = inject("validateField");

const rules = computed(() => props.rules || formProps.rules?.[props.field]);
const field = computed(() => props.field || "inputValue");
const vertical = computed(() => formProps.layout === "vertical");
const split = computed(() => formProps.split);

const modelValue = computed(() => formProps.model?.[field.value]);

// 监听 modelValue 变化
watch(
  () => modelValue.value,
  () => {
    triggerEvent("change");
  },
  {
    deep: true,
  }
);

// 校验错误提示
const errorHint = ref();

// 监听form组件校验
watch(
  () => errorHints.value,
  (errors) => {
    errorHint.value = errors[field.value];
  },
  {
    deep: true,
  }
);

// 校验触发器
const trigger = computed(() => {
  let temp = [];

  if (rules.value) {
    if (isArray(rules.value)) {
      rules.value.forEach((rule) => {
        if (isArray(rule.trigger)) temp = temp.concat(rule.trigger);
        if (isString(rule.trigger)) temp = temp.concat([rule.trigger]);
        // 默认触发事件为 change
        if (!rule.trigger) temp = temp.concat(["change"]);
      });
    }
    if (isObject(rules.value)) {
      return rules.value.trigger ? [rules.value.trigger] : ["change"];
    }
  }
  return Array.from(new Set(temp));
});

// 触发事件 blur | change
const triggerEvent = (event) => {
  if (trigger.value.includes(event)) {
    validateField(field.value);
  }
};

onMounted(() => {
  if (!inForm) {
    console.error("组件 iui-form-item 需要在组件 iui-form 中使用");
    return;
  }

  // 如果存在校验规则，需要在 form 中注册
  if (props.rules) {
    setRule(field.value, props.rules);
  }
});

provide("formItem", {
  rules,
  triggerEvent,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-form-item {
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .form-cell {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    min-height: 54px;
    margin-left: 16px;
    padding-right: 16px;
  }

  &-label {
    white-space: nowrap;
    min-width: 80px;
    padding-right: $size-4;
    position: relative;
    height: 54px;
    line-height: 54px;
    color: $color-text;

    &-vertical {
      width: 100%;
      height: auto;
      line-height: inherit;
      margin-top: $size-4;
      padding-right: 0;
    }

    &-required {
      &::before {
        content: "*";
        height: 100%;
        color: $danger-6;
        position: absolute;
        left: -10px;
      }
    }
  }

  &-content {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  &-control {
    padding: 16px 0;
    height: inherit;
    width: 100%;
  }

  &-error-hint {
    background-color: $color-bg;
    font-size: $font-size-small;
    padding-bottom: $size-3;
    margin-top: -$size-2;
    color: $danger-6;
    animation: fadeIn 240ms ease-in-out;
  }

  &-extra {
    font-size: 12px;
    color: $color-text-light;
    padding-bottom: $size-2;
  }
}
</style>
