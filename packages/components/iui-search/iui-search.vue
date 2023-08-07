<template>
  <view :class="cls">
    <view :class="`${prefixCls}-container`">
      <view :class="`${prefixCls}-prefix`" v-if="$slots.prefix">
        <slot name="prefix" />
      </view>

      <view :class="`${prefixCls}-input-wrap`">
        <view :class="`${prefixCls}-icon`" v-if="icon">
          <iui-icon :name="icon"></iui-icon>
        </view>

        <input
          confirmType="search"
          :class="`${prefixCls}-input`"
          :placeholder="placeholder"
          :placeholder-class="`${prefixCls}-placeholder`"
          @focus="isFocus = true"
          @blur="onBlur"
          @input="handleInput"
          @enter="handleSearch"
          type="text"
        />
      </view>

      <view :class="`${prefixCls}-suffix`" v-if="isFocus || $slots.suffix">
        <view class="text" @click="onBlur" v-if="!$slots.suffix && cancel">
          <text>取消</text>
        </view>

        <view class="slot" v-if="$slots.suffix">
          <slot name="suffix" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 输入值
   */
  modelValue: {
    type: String,
    default: "",
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: "请输入要查询的内容",
  },
  /**
   * 图标
   * Boolean: 是否显示图标
   * String: 图标名称
   */
  icon: {
    type: [String, Boolean],
    default: "search",
  },
  /**
   * 背景颜色
   */
  bgColor: {
    type: String,
    default: "var(--iui-bg)",
  },
  /**
   * 取消文字颜色
   */
  color: {
    type: String,
    default: "#165DFF",
  },
  /**
   * 是否显示取消按钮
   */
  cancel: {
    type: Boolean,
    default: true,
  },
});

const innerValue = ref("");

const prefixCls = "iui-search";
const cls = computed(() => [prefixCls]);

const emit = defineEmits(["update:modelValue", "search"]);

const isFocus = ref(false);

const onBlur = () => {
  setTimeout(() => {
    isFocus.value = false;
  }, 50);
};

const handleSearch = () => {
  emit("search", innerValue.value);
};

const handleInput = (e) => {
  innerValue.value = e.detail.value;
  emit("update:modelValue", e.detail.value);
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-search {
  &-container {
    height: $size-10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $size-4;
    background: v-bind("props.bgColor");
  }

  &-input-wrap {
    background: $color-bg-secondary;
    border-radius: $border-radius-small;
    padding: $size-2 $size-3;
    height: 22px;
    display: flex;
    align-items: center;
    flex: 1;
  }

  &-icon {
    margin-right: $size-3;
    color: $gray-6;
  }

  &-input {
    width: 100%;
    font-size: $font-size-large;
    color: $color-text;
  }

  &-placeholder {
    color: $color-text-input-placeholder;
    font-size: $font-size-large;
  }

  &-prefix {
    margin-right: $size-4;
  }

  &-suffix {
    .slot {
      margin-left: $size-4;
    }
    .text {
      margin-left: $size-4;
      white-space: nowrap;
      color: v-bind(color);
      letter-spacing: 2px;
      :active {
        opacity: 0.5;
      }
    }
  }
}
</style>

<style>
.iui-search-placeholder {
  color: #a9aeb8;
  font-size: 15px;
}
</style>
