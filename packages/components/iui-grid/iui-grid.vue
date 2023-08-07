<template>
  <view :class="cls">
    <slot v-if="isEmpty(data)" />
    <view :class="cls" v-else>
      <iui-grid-row v-for="rowIdx in rows" :key="`row-${rowIdx}`">
        <iui-grid-item
          v-for="(item, index) in rowData(rowIdx)"
          :key="`row-${rowIdx}-${index}`"
          @click="$emit('click', item, rowIdx, index)"
        >
          <view
            :class="`${prefixCls}-row-item ${
              isBoolean(clickEffect) && clickEffect
                ? `${prefixCls}-hover`
                : clickEffect
            }`"
            :style="{
              flexDirection: getDirection,
              justifyContent: getAlign,
              alignItems: getAlign,
              backgroundColor: bgColor,
            }"
          >
            <view class="icon" :style="iconStyle"> </view>

            <view class="content" :style="contentStyle">
              <text class="title">
                {{ item.title }}
              </text>

              <text class="desc">
                {{ item.desc }}
              </text>
            </view>
          </view>
        </iui-grid-item>
      </iui-grid-row>
    </view>
  </view>
</template>

<script setup>
import { computed, provide } from "vue";
import { isEmpty, isNumber, isBoolean } from "../../helper/is";
import iuiGridRow from "../iui-grid-row/iui-grid-row.vue";
import iuiGridItem from "../iui-grid-item/iui-grid-item.vue";

const props = defineProps({
  /**
   * 数据
   * data: 图标 icon 标题 title 描述 desc
   */
  data: {
    type: Array,
    default: () => [],
  },
  /**
   * 数据展示方向
   * direction: vertical | horizontal
   */
  direction: {
    type: String,
    default: "vertical",
  },
  /**
   * 图标大小
   * iconSize: 24 | 24px | 80%
   */
  iconSize: {
    type: [String, Number],
    default: 36,
  },
  /**
   * 宫格背景颜色
   * 作用于 iui-grid-item
   */
  bgColor: {
    type: String,
  },
  /**
   * 每行的列数
   */
  cols: {
    type: Number,
    default: 3,
  },
  /**
   * 行间距
   * margin-top 和 margin-bottom 各一半
   */
  rowGap: {
    type: Number,
    default: 0,
  },
  /**
   * 列间距
   */
  colGap: {
    type: Number,
    default: 0,
  },
  /**
   * 边框
   */
  border: {
    type: Boolean,
    default: false,
  },
  /**
   * 对齐
   * align: start | center | end
   */
  align: {
    type: String,
    default: "center",
  },
  /**
   * 滑动
   */
  scroll: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击效果
   * hover: true | false
   */
  clickEffect: {
    type: [Boolean, Object],
    default: true,
  },
});

const prefixCls = "iui-grid";

const cls = computed(() => [prefixCls, `cols-${props.cols}`], {
  [`${prefixCls}-border`]: props.border,
});

const emit = defineEmits(["click"]);

provide("iui-grid-props", props);

// 获取行数 如果开启滑动，只显示一行
const rows = props.scroll ? 1 : Math.ceil(props.data.length / props.cols);
// 获取行数据
const rowData = (rowIdx) => {
  if (props.scroll) return props.data;

  return props.data.slice((rowIdx - 1) * props.cols, rowIdx * props.cols);
};

// 图标大小
const getIconSize = computed(() => {
  if (isNumber(props.iconSize)) {
    return `${props.iconSize}px`;
  }
  return props.iconSize;
});

const getAlign = computed(() => {
  return props.align === "center" ? "center" : "flex-" + props.align;
});

// 图标样式
const iconStyle = computed(() => {
  return {
    width: getIconSize.value,
    height: getIconSize.value,
    marginBottom: props.direction === "vertical" ? "10px" : 0,
  };
});

// 内容方向
const getDirection = computed(() => {
  return props.direction === "vertical" ? "column" : "row";
});

// 内容样式
const contentStyle = computed(() => {
  return {
    marginLeft: props.direction === "vertical" ? 0 : "10px",
    textAlign: props.direction === "vertical" ? "center" : "left",
  };
});

// 是否有间距 有间距时，不隐藏边框
const borderWidth = props.colGap ? "1px" : 0;
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-grid {
  display: flex;
  flex-direction: column;
  width: 100%;

  :deep(.iui-grid-row:not(:first-child) .iui-grid-item) {
    border-top-width: v-bind(borderWidth);
  }

  /* #ifdef MP */
  :deep(iui-grid-row:not(:first-child) iui-grid-item > view) {
    border-top-width: v-bind(borderWidth);
  }
  /* #endif */

  &-hover {
    &:active {
      background-color: $color-bg-secondary;
      border-radius: $border-radius-small;
    }
  }
}

.iui-grid-row-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: $size-4;
  box-sizing: border-box;

  .icon {
    background-color: var(--iui-primary-2);
    border-radius: $border-radius-small;
    flex-shrink: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: $font-size-small;
  }

  .desc {
    font-size: $font-size-mini;
    color: $color-text-lighten;
  }
}
</style>
