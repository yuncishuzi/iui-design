<template>
  <view :class="`${prefixCls}-wrapper`">
    <cell
      :class="cls"
      :style="{
        minHeight: getCellHeight(),
      }"
    >
      <view :class="`${prefixCls}-title`" v-if="label || icon || $slots.icon">
        <view :class="`${prefixCls}-icon`" v-if="$slots.icon || icon">
          <slot name="icon" v-if="$slots.icon" />
          <iui-icon :name="icon" :size="20" v-else></iui-icon>
        </view>
        <view>
          <view :class="`${prefixCls}-label`"> {{ label }}</view>
          <view :class="`${prefixCls}-desc`"> {{ desc }}</view>
        </view>
      </view>

      <slot />

      <view
        :class="`${prefixCls}-extra`"
        v-if="extra || $slots.extra || showArrow"
      >
        <view :class="`${prefixCls}-extra-content`"> {{ extra }}</view>

        <slot name="extra" v-if="$slots.extra" />

        <view :class="`${prefixCls}-extra-arrow`">
          <iui-icon name="right" v-if="showArrow"></iui-icon>
        </view>
      </view>
    </cell>
  </view>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
import { isUndefined } from "../../helper/is";

/**
 * 单元格
 * @slot icon - 自定义图标
 * @extra extra - 自定义右侧内容
 */

const props = defineProps({
  /**
   * 单元格高度
   */
  height: {
    type: Number,
    default: 54,
  },
  /**
   * 单元格左侧标题
   */
  label: {
    type: String,
  },
  /**
   * 描述文案
   */
  desc: {
    type: String,
  },
  /**
   * 额外文案
   */
  extra: {
    type: String,
  },
  /**
   * 图标
   * Label 左侧图标
   */
  icon: {
    type: String,
  },
  /**
   * 是否显示箭头
   */
  arrow: {
    type: Boolean,
    default: undefined,
  },
});

const { provides } = getCurrentInstance();

const prefixCls = "iui-cell";

const cls = computed(() => [prefixCls]);

const getCellHeight = () => {
  let height = props.height;

  if (props.title && props.desc) {
    height += 20;
  }

  return `${height}px`;
};

const showArrow = computed(() => {
  const listProps = { arrow: false };

  if (provides["list-props"]) {
    listProps.arrow = provides["list-props"].arrow;
  }

  if (!isUndefined(props.arrow)) {
    return props.arrow;
  }

  return listProps.arrow;
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-cell-wrapper {
  width: 100%;
  background-color: $color-bg;

  .iui-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: $size-4;
    padding-right: $size-4;
    box-sizing: border-box;

    &-title {
      display: inline-flex;
      align-items: center;
      margin-right: $size-4;
      width: 100%;
    }

    &-icon {
      margin-right: $size-3;
    }

    &-label {
      font-size: $font-size-huge;
      white-space: nowrap;
      color: $color-text;
    }

    &-desc {
      color: $color-text-light;
      font-size: $font-size-small;
    }

    &-extra {
      display: inline-flex;
      align-items: center;
      width: 100%;
      height: 100%;

      &-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: $font-size-small;
        color: $color-text-light;
        height: inherit;
      }

      &-arrow {
        margin-left: $size-1;
        color: $color-text-lighten;
      }
    }
  }
}
</style>
