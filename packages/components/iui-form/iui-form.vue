<template>
  <view :class="prefixCls">
    <iui-list>
      <slot />
    </iui-list>
  </view>
</template>

<script setup>
import { provide, onMounted, ref } from "vue";
import Schema from "../../helper/validator";
import { isEmpty, isNull, isObject } from "../../helper/is";

const props = defineProps({
  /**
   * 数据模型
   */
  model: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 布局
   */
  layout: {
    type: String,
    default: "horizontal",
  },
  /**
   * 分割线
   */
  split: {
    type: Boolean,
    default: true,
  },
  /**
   * 校验规则
   */
  rules: {
    type: Object,
    default: () => {},
  },
});

const prefixCls = "iui-form";

let validator = null;

// 校验规则
const rules = ref(props.rules);

// 初始化校验器
const initValidator = () => {
  if (!isEmpty(rules.value)) {
    const descriptor = rules.value;
    validator = new Schema(descriptor);
  }
};

// 校验全部
const errorHints = ref({});

const validate = () => {
  return new Promise((resolve, reject) => {
    if (!isNull(validator)) {
      validator.validate(props.model, (errors, fields) => {
        if (errors) {
          errorHints.value = Object.keys(fields).reduce((acc, cur) => {
            acc[cur] = fields[cur]?.[0]?.message;
            return acc;
          }, {});

          resolve({
            passed: false,
            errors,
            fields,
          });
          return;
        }
        errorHints.value = {};
        resolve({
          passed: true,
          errors,
          fields,
        });
      });
    } else {
      reject("校验器不存在");
    }
  });
};

// 校验单个字段
const validateField = (field) => {
  if (!isNull(validator)) {
    validator.validate(
      {
        [field]: props.model[field],
      },
      (_, fields) => {
        const target = fields ? fields[field]?.[0] : null;
        if (target) {
          errorHints.value[field] = target?.message;
        } else {
          errorHints.value[field] = null;
        }
      }
    );
  }
};

// 清空校验状态
const clearValidate = () => {
  errorHints.value = {};
};

// formItem 设置校验规则
const setRule = (field, newRules) => {
  if (isObject(rules.value)) {
    rules.value[field] = newRules;
  } else {
    rules.value = {
      [field]: newRules,
    };
  }

  // #ifdef MP
  initValidator();
  // #endif
};

provide("formProps", props);
provide("inForm", true);
provide("errorHints", errorHints);
provide("validateField", validateField);
provide("setRule", setRule);

onMounted(() => {
  initValidator();
});

defineExpose({
  validate,
  validateField,
  clearValidate,
});
</script>

<script>
export default {
  name: "iui-form",
};
</script>

<style lang="scss" scoped></style>
