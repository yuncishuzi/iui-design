<template>
  <view :class="cls">
    <block v-if="!isEmpty(data)">
      <block v-for="(cell, idx) in data" :key="idx">
        <slot name="cell" :data="cell" v-if="$slots.cell" />
        <iui-cell v-else v-bind="cell"></iui-cell>
      </block>
    </block>
    <slot />
  </view>
</template>

<script setup>
import { computed, provide } from "vue";
import { isEmpty } from "../../helper/is";
/**
 * 列表 需要配合 cell组件 使用
 *
 * @slot cell - 自定义单元格
 * @slot icon - 自定义图标
 * @slot extra - 自定义右侧内容
 */

const props = defineProps({
  /**
   * 数据
   */
  data: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否显示分割线
   */
  split: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示箭头
   */
  arrow: {
    type: Boolean,
    default: false,
  },
});

provide("list-props", props);

const prefixCls = "iui-list";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-split`]: props.split,
  },
]);
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
