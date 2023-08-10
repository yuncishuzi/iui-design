<template>
  <view :class="prefixCls">
    <iui-popup
      v-model="innerVisible"
      @close="close"
      :contentStyle="{ padding: 0 }"
      :containerStyle="{
        borderTopLeftRadius: `${picker.radius}px`,
        borderTopRightRadius: `${picker.radius}px`,
      }"
    >
      <template #title>
        <view :class="`${prefixCls}-header`">
          <view :class="`${prefixCls}-header-button`" @click="close">
            取消
          </view>

          <view :class="`${prefixCls}-header-title`">{{ picker.title }}</view>

          <view :class="`${prefixCls}-header-button`" @click="confirm">
            确认
          </view>
        </view>
      </template>
      <view :class="`${prefixCls}-container`">
        <picker-view
          :value="innerValue"
          :class="`${prefixCls}-content`"
          indicator-style="height: 48px"
          @change="handleChange"
        >
          <block v-for="(_, col) in colunms" :key="`col-${col}`">
            <picker-view-column>
              <block
                v-for="(op, idx) in picker.options[col]"
                :key="`${col}-${idx}`"
              >
                <view :class="`${prefixCls}-item`">
                  {{ op }}
                </view>
              </block>
            </picker-view-column>
          </block>
        </picker-view>
      </view>
    </iui-popup>
  </view>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { isEmpty, isString } from "../../helper/is";

const props = defineProps({
  /**
   * 选中项
   */
  modelValue: {
    type: Array,
    default: () => [],
  },
  /**
   * 选项列表
   */
  options: {
    type: Array,
    default: () => [],
  },
  /**
   * 可见
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: "",
  },
  /**
   * 圆角
   */
  radius: {
    type: Number,
    default: 6,
  },
});

const prefixCls = "iui-picker";

const innerVisible = ref(props.visible);
const innerValue = ref(props.modelValue);

// 上一个值
const prevValue = ref(innerValue.value);

const picker = ref({
  options: props.options,
  title: props.title,
  radius: props.radius,
});

// 模式 单列，多列
const colunms = computed(() => {
  return picker.value.options.length;
});

const emit = defineEmits([
  "update:modelValue",
  "update:visible",
  "close",
  "confirm",
  "change",
]);

const close = () => {
  innerVisible.value = false;
  emit("update:visible", false);
  emit("close");
};

const confirm = () => {
  emit("confirm", innerValue.value);
  close();
};

/**
 * picker 发生变化
 * @param {Event} e
 * @returns 选中的值，选中的索引，变化的列
 */
const handleChange = (e) => {
  const result = [];

  picker.value.options.forEach((item, index) => {
    result.push(item[e.detail.value[index]]);
  });

  // 保存上一个值
  prevValue.value = innerValue.value;
  innerValue.value = e.detail.value;

  const colIdx = getColChange(prevValue.value, innerValue.value);

  emit("update:modelValue", result);
  emit("change", {
    value: result,
    index: e.detail.value,
    changedCol: colIdx,
  });
};

// 计算列变化
const getColChange = (prev, next) => {
  // 如果长度不同，说明是新的列变化
  if (prev.length !== next.length) {
    return next.length - 1;
  }

  const col = prev.findIndex((item, index) => item !== next[index]);
  return col === -1 ? 0 : col;
};

const open = (options) => {
  picker.value = {
    ...props,
    ...options,
  };

  if (isString(picker.value.options[0])) {
    picker.value.options = [picker.value.options];
  }

  innerVisible.value = true;
  emit("update:visible", true);
  // 首次打开需要触发一次 change 事件，如果级联选择需要更新 options
  handleChange({
    detail: {
      value: isEmpty(innerValue.value) ? [0] : innerValue.value,
    },
  });
};

const setOptions = (col, options) => {
  picker.value.options[col] = options;
};

watch(
  () => props.visible,
  (value) => {
    if (value) {
      open();
    } else {
      close;
    }
  },
  {
    immediate: true,
  }
);

defineExpose({
  open,
  setOptions,
});
</script>

<style lang="scss" scoped>
.iui-picker {
  &-header {
    height: $size-8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &-title {
      flex: 1;
      padding: 0 $size-4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      font-size: $font-size-huge;
    }

    &-button {
      padding: $size-2;
      color: $primary-6;
      flex-shrink: 0;
    }
  }

  &-container {
    position: relative;
    height: 100%;
    .selected {
      height: $size-12;
      border: 1px solid $color-border-lighten;
      position: fixed;
      top: 50%;
      width: 100%;
    }
  }

  &-content {
    height: 100%;
  }

  &-item {
    height: $size-12 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
