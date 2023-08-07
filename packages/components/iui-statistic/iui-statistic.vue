<template>
  <view :class="cls">
    <view :class="`${prefixCls}-title`" v-if="title">{{ title }}</view>

    <view
      :class="`${prefixCls}-value`"
      :style="{
        paddingTop: title ? '6px' : 0,
        paddingBottom: extra ? '6px' : 0,
        ...valueStyle,
      }"
    >
      <template v-if="$slots.prefix">
        <view :class="`${prefixCls}-value-prefix`">
          <slot name="prefix" />
        </view>
      </template>
      {{ formatValue }}
      <template v-if="$slots.suffix">
        <view :class="`${prefixCls}-value-suffix`">
          <slot name="suffix" />
        </view>
      </template>
    </view>
    <view :class="`${prefixCls}-extra`" v-if="extra">{{ extra }}</view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { isNumber } from "../../helper/is";

/**
 * 统计数值
 * @slot prefix 数值前缀插槽
 * @slot suffix 数值后缀插槽
 */

const props = defineProps({
  /**
   * 标题
   */
  title: {
    type: String,
  },
  /**
   * 数值
   */
  value: {
    type: Number,
  },
  /**
   * 额外信息
   */
  extra: {
    type: String,
  },
  /**
   * 显示数值分隔符
   * 10000 => 10,000
   */
  separator: {
    type: Boolean,
    default: false,
  },
  /**
   * 精度
   */
  precision: {
    type: Number,
    default: 0,
  },

  /**
   * 数值样式
   */
  valueStyle: {
    type: Object,
    default: () => ({}),
  },
});

const prefixCls = "iui-statistic";

const cls = computed(() => [prefixCls]);

const numberValue = computed(() => {
  if (isNumber(props.value)) {
    return props.value;
  }
  return 0;
});

const formatValue = computed(() => {
  let value = numberValue.value;

  // 添加精度
  if (props.precision) {
    value = value.toFixed(props.precision);
  }

  // 添加分隔符
  if (props.separator) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return value;
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-statistic {
  &-title {
    font-size: $font-size-small;
    color: $color-text-light;
  }

  &-value {
    font-size: $font-size-title;
    display: inline-flex;
    align-items: baseline;
    color: $color-text;

    &-prefix {
      font-size: $font-size-small;
      margin-right: $size-1;
    }

    &-suffix {
      font-size: $font-size-small;
      margin-left: $size-1;
    }
  }

  &-extra {
    font-size: $font-size-small;
    color: $color-text-light;
  }
}
</style>
