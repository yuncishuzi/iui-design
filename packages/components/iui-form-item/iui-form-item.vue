<template>
  <view :class="prefixCls">
    <cell
      class="form-cell iui-cell"
      :style="{
        alignItems: align === 'center' ? 'center' : `flex-${align}`,
      }"
    >
      <view
        :class="[
          `${prefixCls}-label`,
          {
            [`${prefixCls}-label-required`]: required,
          },
        ]"
      >
        {{ label }}
      </view>

      <view :class="`${prefixCls}-content`">
        <view :class="`${prefixCls}-control`">
          <slot />
        </view>

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
import { computed, inject, onMounted, provide, ref } from "vue";
import Schema from "../helper/validator";
import { isEmpty, isNull } from "../helper/is";

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

// 表单校验
let validator = null;

const rules = computed(() => props.rules || formProps.rules?.[props.field]);
const filed = computed(() => props.field || "inputValue");

// console.log("字段", filed.value, "校验规则", rules.value);

// 初始化校验器
const initValidator = () => {
  if (!isEmpty(rules.value)) {
    const descriptor = {
      [filed.value]: rules.value,
    };
    validator = new Schema(descriptor);
  }
};

// 校验
const errorHint = ref();
const validate = (input) => {
  console.log(`校验 ${filed.value}:`, input, typeof input);
  if (!isNull(validator)) {
    validator.validate(
      {
        [filed.value]: input,
      },
      (errors) => {
        if (errors) {
          errorHint.value = errors[0].message;
          return;
        }
        errorHint.value = null;
      }
    );
  }
};

onMounted(() => {
  const inForm = inject("inForm");
  if (!inForm) {
    console.error("组件 iui-form-item 需要在组件 iui-form 中使用");
    return;
  }

  initValidator();
});

provide("formItem", {
  validate,
  rules,
});
</script>

<style lang="scss" scoped>
@import "../style/index.scss";
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
    background-color: $color-bg-white;
    font-size: $font-size-small;
    padding-bottom: $size-2;
    margin-top: -$size-2;
    color: $danger-6;
    animation: fadeIn 240ms ease-in-out;
  }
}
</style>
