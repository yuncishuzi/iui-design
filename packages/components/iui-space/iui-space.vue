<template>
  <view :class="cls">
    <slot />
  </view>
</template>

<script setup>
import { computed } from "vue";
import { isArray, isNumber } from "../../helper/is";

const props = defineProps({
  /**
   * 方向
   * direction: horizontal | vertical
   */
  direction: {
    type: String,
    default: "horizontal",
  },
  /**
   * 间距大小
   * size: mini | small | medium | large | 自定义数值
   */
  size: {
    type: [String, Number, Array],
    default: "small",
  },
  /**
   * 对齐方式
   * align: start | center | end | baseline
   * 水平方向默认为center 垂直方向默认为start
   */
  align: {
    type: String,
  },
  /**
   * 间距自适应
   * fill: true | false
   * 使用fill size将失效
   */
  fill: {
    type: Boolean,
    default: false,
  },
  /**
   * 换行
   * wrap: true | false
   */
  wrap: {
    type: Boolean,
    default: false,
  },
});

const prefixCls = "iui-space";

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${
    props.align
      ? props.align
      : props.direction === "horizontal"
      ? "center"
      : "start"
  }`,
  [
    {
      [`${prefixCls}-${props.direction}`]: props.direction,
      [`${prefixCls}-wrap`]: props.wrap,
      [`${prefixCls}-fill`]: props.fill,
    },
  ],
]);

function getMargin(size) {
  if (isNumber(size)) {
    return size;
  }
  switch (size) {
    case "mini":
      return 4;
    case "small":
      return 8;
    case "medium":
      return 16;
    case "large":
      return 24;
    default:
      return 8;
  }
}

const getStyle = computed(() => {
  const style = {
    marginRight: 0,
    marginBottom: 0,
    lastChild: {
      marginRight: 0,
      marginBottom: 0,
    },
  };

  if (props.direction === "horizontal") {
    style.marginRight = props.fill
      ? "auto"
      : `${getMargin(isArray(props.size) ? props.size[0] : props.size)}px`;

    style.lastChild.marginRight = 0;
  }

  if (props.direction === "vertical" || props.wrap) {
    style.marginBottom = props.fill
      ? "auto"
      : `${getMargin(isArray(props.size) ? props.size[1] : props.size)}px`;

    if (!props.wrap) {
      style.lastChild.marginBottom = 0;
    } else {
      style.lastChild.marginBottom = style.marginBottom;
    }
  }

  return style;
});
</script>

<style lang="scss" scoped>
@mixin horizontal-align($type) {
  &.iui-space-#{$type} {
    align-items: flex-#{$type};
  }
}

@mixin vertical-align($type) {
  &.iui-space-#{$type} {
    justify-content: #{$type};
    align-items: flex-#{$type};
  }
}

.iui-space {
  display: inline-flex;
  align-items: center;
  width: 100%;

  &-horizontal {
    flex-direction: row;
    @include horizontal-align(start);
    @include horizontal-align(center);
    @include horizontal-align(end);
    @include horizontal-align(baseline);
  }

  &-vertical {
    flex-direction: column;
    @include vertical-align(start);
    @include vertical-align(center);
    @include vertical-align(end);
    @include vertical-align(baseline);
  }

  &-wrap {
    flex-wrap: wrap;
  }

  &-fill {
    display: flex;
    justify-content: space-between;
  }

  // 为插槽内的元素添加margin

  /* #ifndef MP */
  :slotted(*) {
    margin-right: v-bind("getStyle.marginRight");
    margin-bottom: v-bind("getStyle.marginBottom");
  }

  // 水平模式下 最后一个元素mr为0
  // 垂直模式下 最后一个元素mb为0
  :slotted(:last-child) {
    margin-right: v-bind("getStyle.lastChild.marginRight");
    margin-bottom: v-bind("getStyle.lastChild.marginBottom");
  }
  // 只有一个元素m为0
  :slotted(:only-child) {
    margin-right: 0;
    margin-bottom: 0;
  }
  /* #endif */
}

/* #ifdef MP */
:deep(> view) {
  margin-right: v-bind("getStyle.marginRight");
  margin-bottom: v-bind("getStyle.marginBottom");
}
:deep(:last-child) {
  margin-right: v-bind("getStyle.lastChild.marginRight");
  margin-bottom: v-bind("getStyle.lastChild.marginBottom");
}

:deep(:only-child) {
  margin-right: 0;
  margin-bottom: 0;
}
/* #endif */
</style>
