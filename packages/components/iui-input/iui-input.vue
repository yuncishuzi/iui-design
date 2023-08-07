<template>
  <view :class="`${prefixCls}-wrapper`">
    <view
      :class="cls"
      :style="{
        padding: inForm ? '0' : '0 16px',
        height: inForm ? 'auto' : '52px',
      }"
    >
      <template v-if="label || $slots.prefix">
        <view :class="`${prefixCls}-prefix`">
          <slot name="prefix"></slot>

          <view
            :class="[
              `${prefixCls}-label`,
              { [`${prefixCls}-label-required`]: required },
            ]"
          >
            <view :class="`${prefixCls}-label-icon`" v-if="icon">
              <iui-icon :name="icon" />
            </view>

            {{ label }}
          </view>
        </view>
      </template>

      <view class="direction" :class="direction">
        <input
          class="input"
          :value="inputValue"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled || readonly"
          :placeholder-class="`${prefixCls}-placeholder`"
          :focus="focus"
          :maxlength="maxlength"
          :style="{
            padding: inForm ? '0' : '12px 0',
          }"
          @input="handleInput"
          @focus="$emit('focus', $evnet)"
          @confirm="$emit('confirm', $evnet)"
          @keyboardheightchange="$emit('keyboardheightchange', $evnet)"
          @blur="handleBlur"
        />
        <view
          v-if="clearable && inputValue"
          :class="`${prefixCls}-clear`"
          @click="handleClearInput"
        >
          <iui-icon name="close-circle-fill" color="#c9cdd4"></iui-icon>
        </view>

        <template v-if="$slots.suffix">
          <view :class="`${prefixCls}-suffix`">
            <slot name="suffix"> </slot>
          </view>
        </template>
      </view>
    </view>

    <view
      :class="`${prefixCls}-error-hint`"
      :style="errorHintStyle"
      v-if="errorHint"
    >
      <slot name="error" :message="errorHint">
        {{ errorHint }}
      </slot>
    </view>
  </view>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  getCurrentInstance,
  nextTick,
  inject,
} from "vue";
import { getRect } from "../../helper/rect";
import Schema from "../../helper/validator";
import { isEmpty, isNull, isArray, isString, isObject } from "../../helper/is";

const props = defineProps({
  /**
   * 输入框的值
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },
  /**
   * 标签
   */
  label: {
    type: String,
  },
  /**
   * 图标
   */
  icon: {
    type: String,
  },
  /**
   * 占位提示文字
   */
  placeholder: {
    type: String,
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * 清空按钮
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * 输入类型
   * type: text | number | idcard | digit | safe-password | tel | nickanme
   * idcard 微信、支付宝、百度、QQ小程序、快手小程序、京东小程序
   * safe-password nickname 微信小程序
   */
  type: {
    type: String,
    default: "text",
  },
  /**
   * 最大输入长度
   * 设置为 -1 的时候不限制最大长度
   */
  maxlength: {
    type: Number,
    default: -1,
  },
  /**
   * 是否必填
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
   * 获取焦点
   */
  focus: {
    type: Boolean,
    default: false,
  },
  /**
   * 键盘右下角文字
   * 仅在 type="text" 时生效
   * 有效值 "go"-前往 "next"-下一个 "done"-完成 "search"-搜索 "send"-发送
   *
   */
  confirmType: {
    type: String,
    default: "done",
  },
  /**
   * 对齐
   */
  align: {
    type: String,
    default: "left",
  },
  /**
   * 布局方向
   * direction: horizontal | vertical
   */
  direction: {
    type: String,
    default: "horizontal",
  },
});

const inputValue = ref(props.modelValue);

const formatValue = computed(() =>
  props.type == "number" ? Number(inputValue.value) : inputValue.value
);

const prefixCls = "iui-input";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-disabled`]: props.disabled,
    [`${prefixCls}-readonly`]: props.readonly,
    [`${prefixCls}-vertical`]: props.direction === "vertical",
  },
]);

// 校验样式
const errorHintStyle = ref({});
const setErrorHintStyle = () => {
  if (props.rules) {
    const instance = getCurrentInstance();
    getRect(instance, ".input").then((res) => {
      errorHintStyle.value = {
        paddingLeft: `${res.left}px`,
      };
    });
  }
};

let validator = null;

// 初始化校验器
const initValidator = () => {
  if (!isEmpty(props.rules)) {
    const descriptor = {
      inputValue: props.rules,
    };
    validator = new Schema(descriptor);

    setErrorHintStyle();
  }
};

// 校验
const formItem = ref(null); // 表单项

const errorHint = ref();
const validate = () => {
  // 如果校验器存在
  if (!isNull(validator)) {
    validator.validate(
      {
        inputValue: formatValue.value,
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

// 校验触发规则

const trigger = computed(() => {
  let temp = [];
  const rules = props.rules;

  if (rules) {
    if (isArray(rules)) {
      rules.forEach((rule) => {
        if (isArray(rule.trigger)) temp = temp.concat(rule.trigger);
        if (isString(rule.trigger)) temp = temp.concat([rule.trigger]);
      });
    }
    if (isObject(rules)) {
      return rules.trigger;
    }
  }
  return Array.from(new Set(temp));
});

onMounted(() => {
  initValidator();
});

const emit = defineEmits([
  "update:modelValue",
  "input",
  "focus",
  "blur",
  "confirm",
  "keyboardheightchange",
]);

const handleClearInput = () => {
  inputValue.value = "";
  emit("update:modelValue", "");
};

const handleInput = async (e) => {
  inputValue.value = e.detail.value;
  emit("update:modelValue", formatValue.value);
  emit("input", e);
  await nextTick();
  if (trigger.value?.includes("change")) validate();

  if (formItem.value) {
    formItem.value.triggerEvent("change");
  }
};

const handleBlur = (e) => {
  emit("blur", e);
  if (trigger.value?.includes("blur")) validate();
  if (formItem.value) {
    formItem.value.triggerEvent("blur");
  }
};

// 表单中使用
const inForm = inject("inForm");

if (inForm) {
  // 表单中的校验规则
  formItem.value = inject("formItem");
  if (props.rules) {
    console.error(
      "在表单中使用iui-input，不需要在iui-input上设置rules，应该在iui-form上设置rules"
    );
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-input-wrapper {
  position: relative;
  background-color: $color-bg;

  .iui-input {
    height: $size-13;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 $size-4;
    box-sizing: border-box;

    &-label {
      display: flex;
      align-items: center;
      white-space: nowrap;
      color: $color-text;

      &-required {
        &::before {
          content: "*";
          height: 100%;
          color: $danger-6;
          margin-right: $size-1;
        }
      }

      &-icon {
        margin-right: $size-2;
      }
    }

    &-prefix {
      padding-right: $size-6;
      display: flex;
      align-items: center;
    }

    .input {
      box-sizing: border-box;
      height: 100%;
      padding: $size-3 0;
      flex: 1;
      color: $color-text-input;
      text-align: v-bind(align);
    }

    &-placeholder {
      color: $color-text-input-placeholder;
      font-size: $font-size-large;
    }

    &-clear {
      padding-left: $size-4;
      &:active {
        opacity: 0.7;
      }
    }

    &-disabled {
      .iui-input-label {
        color: $color-text-lighten;
      }
      cursor: not-allowed;
    }

    &-suffix {
      padding-left: $size-4;
      display: flex;
      align-items: center;
    }

    &-disabled {
      color: $color-text-lighten;
      cursor: not-allowed;
    }

    &-readonly {
      cursor: not-allowed;
      .input {
        color: var(--iui-gray-6);
      }
    }

    .direction {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      &.horizontal {
        display: contents;
      }
    }

    &-vertical {
      flex-direction: column;
      align-items: flex-start;
      height: $size-22 !important;

      .input {
        width: 100%;
      }

      .iui-input-prefix {
        padding: $size-3 0 0 0;
      }
    }
  }
  .iui-input-error-hint {
    background-color: $color-bg;
    font-size: $font-size-small;
    padding-bottom: $size-2;
    margin-top: -$size-2;
    color: $danger-6;
    animation: fadeIn 240ms ease-in-out;
  }
}
</style>
<!--scoped会导致小程序placeholder样式失效 -->
<style lang="scss">
.iui-input-placeholder {
  color: $color-text-input-placeholder;
  font-size: 15px;
}
</style>
