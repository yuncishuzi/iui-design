<template>
  <view
    :class="[
      prefixCls,
      {
        [`${prefixCls}-collapse`]: expand,
      },
    ]"
  >
    <slot />

    <view
      v-if="action"
      :class="`${prefixCls}-action`"
      @click="handleChange"
      :style="acitonStyle"
    >
      {{ expand ? collapseText : expandText }}
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  /**
   * 最大显示行数
   */
  lines: {
    type: Number,
    default: 1,
  },
  /**
   * 显示展开收起按钮
   */
  action: {
    type: Boolean,
    default: false,
  },
  /**
   * 展开按钮文本
   */
  expandText: {
    type: String,
    default: "展开",
  },
  /**
   * 收起按钮文本
   */
  collapseText: {
    type: String,
    default: "收起",
  },
});

const prefixCls = "iui-ellipsis";

const expand = ref(false);

const emit = defineEmits(["change"]);

const handleChange = () => {
  expand.value = !expand.value;
  emit("change", expand.value);
};

const maxLines = computed(() => {
  return expand.value ? "inherit" : props.lines;
});

// 样式变化
const acitonStyle = computed(() => {
  return {
    display: expand.value ? "inline" : "block",
    position: expand.value ? "static" : "absolute",
    padding: expand.value ? "0" : "",
  };
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: v-bind(maxLines);
  position: relative;
  color: $color-text;

  :nth-child(n) {
    display: inline;
  }

  &-action {
    position: absolute;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      $color-bg 20px,
      $color-bg
    );
    color: $primary-6;
    padding-left: $size-6;
  }
}
</style>
