<template>
  <view
    :class="cls"
    :style="{
      borderWidth: border ? '1px' : '0',
    }"
  >
    <!-- cover -->
    <slot name="cover" />

    <!-- header -->
    <view
      v-if="$slots.header || $slots.title || $slots.extra || title || extra"
      :class="`${prefixCls}-header`"
      :style="headerStyle"
    >
      <!-- slot -->
      <slot name="header" v-if="$slots.header" />
      <block v-else>
        <!-- title -->
        <view :class="`${prefixCls}-header-title`" v-if="$slots.title || title">
          <slot name="title" v-if="$slots.title" />
          <text v-else> {{ title }} </text>
        </view>

        <!-- extra -->
        <view :class="`${prefixCls}-header-extra`" v-if="$slots.extra || extra">
          <slot name="extra" v-if="$slots.extra" />
          <text v-else @click="handleExtraClick"> {{ extra }} </text>
        </view>
      </block>
    </view>

    <!-- body -->
    <view :class="`${prefixCls}-body`" :style="bodyStyle">
      <slot />
    </view>

    <!-- footer -->
    <view
      v-if="$slots.footer"
      :class="`${prefixCls}-footer`"
      :style="footerStyle"
    >
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";

/**
 * 卡片
 * 用于包裹内容
 *
 * @slot default - 默认内容
 * @slot title - 标题
 * @slot extra - 额外操作
 * @slot header - 头部
 * @slot footer - 底部
 * @slot cover - 封面
 * @slot actions - 操作
 */

const props = defineProps({
  /**
   * 是否显示边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * 标题
   */
  title: {
    type: String,
    default: "",
  },
  /**
   * 额外操作
   * 一般用于右上角的操作
   */
  extra: {
    type: String,
  },
  /**
   * 头部自定义样式
   */
  headerStyle: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 内容自定义样式
   */
  bodyStyle: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 底部自定义样式
   */
  footerStyle: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 卡片阴影
   */
  shadow: {
    type: Boolean,
    default: false,
  },
});

const prefixCls = "iui-card";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-border`]: props.border,
    [`${prefixCls}-shadow`]: props.shadow,
  },
]);

// 事件
const emits = defineEmits(["extraClick"]);

const handleExtraClick = () => {
  emits("extraClick");
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-card {
  border-radius: $border-radius-small;
  border: 1px solid $color-border;
  background-color: $color-bg;
  font-size: $font-size-medium;
  box-sizing: border-box;
  width: 100%;

  &-shadow {
    box-shadow: 0 4px 10px $color-bg-secondary;
  }

  &-header {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid $color-border;

    &-title {
      flex: 1;
      font-size: $font-size-large;
      font-weight: 600;
      color: $color-text;
    }

    &-extra {
      font-size: $font-size-small;
      color: $primary-6;
    }
  }

  &-body {
    padding: 16px;
    color: $color-text-light;
  }

  &-footer {
    padding: 10px 16px;
    border-top: 1px solid $color-border;
    color: $color-text-light;
    font-size: $font-size-small;
  }
}
</style>
