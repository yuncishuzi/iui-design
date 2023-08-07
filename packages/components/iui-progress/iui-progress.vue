<template>
  <view :class="prefixCls">
    <view :class="`${prefixCls}-line`" id="line">
      <view
        :class="`${prefixCls}-active`"
        :style="{
          width: `${left}px`,
        }"
      ></view>
    </view>
    <view :class="`${prefixCls}-percent`" v-if="percent">
      {{ props.modelValue }}%
    </view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import { getRect } from "../../helper/rect";

const props = defineProps({
  /**
   * 当前值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * 显示百分比
   */
  percent: {
    type: Boolean,
    default: false,
  },
  /**
   * 线条高度
   */
  size: {
    type: Number,
    default: 2,
  },
  /**
   * 颜色
   */
  color: {
    type: String,
    default: "#165dff",
  },
});

const prefixCls = "iui-progress";
const instance = getCurrentInstance();

const lineWidth = ref(0);

const left = computed(() => {
  return props.modelValue * (lineWidth.value / 100);
});

onMounted(() => {
  getRect(instance, "#line").then((rect) => {
    lineWidth.value = rect.width;
  });
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-progress {
  display: flex;
  align-items: center;

  &-line {
    width: 100%;
    height: calc(v-bind(size) * 1px);
    background-color: $color-bg-light;
    border-radius: calc(v-bind(size/2) * 1px);
    position: relative;
    transition: all 0.3s ease-in-out;
  }

  &-active {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(v-bind(size) * 1px);
    background-color: v-bind(color);
    border-radius: calc(v-bind(size/2) * 1px);
  }

  &-percent {
    font-size: $font-size-medium;
    margin-left: $size-2;
    color: v-bind(color);
    min-width: $size-9;
  }
}
</style>
