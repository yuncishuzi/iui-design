<template>
  <view :class="cls" @click.stop="handleTagClick" v-if="visible">
    <view :class="`${prefixCls}-icon`" v-if="icon || $slots.icon">
      <slot name="icon" v-if="$slots.icon" />
      <iui-icon :name="icon" v-else />
    </view>
    <slot />

    <view style="padding-left: 4px" @click.stop="handleTagClose">
      <iui-icon v-if="closeable" name="close" />
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  /**
   * 大小
   */
  size: {
    type: String,
    default: "medium",
  },
  /**
   * 图标
   * @slot icon
   */
  icon: {
    type: String,
  },
  /**
   * 可关闭
   */
  closeable: {
    type: Boolean,
    default: false,
  },
  /**
   * 可选中
   */
  checkable: {
    type: Boolean,
    default: false,
  },
  /**
   * 默认选中
   */
  checked: {
    type: Boolean,
    default: false,
  },

  /**
   * 背景颜色
   */
  color: {
    type: String,
  },
  /**
   * 选中时的背景颜色
   */
  checkedColor: {
    type: String,
    default: "var(--iui-primary-6)",
  },
});

// 可见
const visible = ref(true);

// 选中
const checked = ref(props.checked);

const prefixCls = "iui-tag";

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-size-${props.size}`,
  {
    [`${prefixCls}-checked`]: checked.value,
    [`${prefixCls}-custom-color`]: props.color,
  },
]);

const emit = defineEmits(["change", "close", "click"]);

const handleTagClick = () => {
  if (props.checkable) {
    checked.value = !checked.value;
    emit("change", checked.value);
  }
  emit("click");
};

const handleTagClose = () => {
  visible.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-tag {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  background-color: $color-bg-light;
  margin: 1px;
  padding: 0 8px;
  border-radius: $border-radius-small;
  color: $color-text;
  font-size: $font-size-mini;
  height: 24px;
  line-height: 22px;
  padding: 0 8px;

  &-custom-color {
    background-color: v-bind(color);
    color: $color-white;
  }

  &-icon {
    margin-right: 4px;
  }

  &-checked {
    background-color: v-bind(checkedColor);
    color: $color-white;
  }

  &-size {
    &-large {
      font-size: $font-size-medium;
      height: 32px;
      line-height: 30px;
      padding: 0 16px;
    }
    &-small {
      font-size: $font-size-mini;
      height: 20px;
      line-height: 18px;
      padding: 0 8px;
    }
  }
}
</style>
