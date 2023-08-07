<template>
  <view :class="cls" v-if="visible">
    <view :class="`${prefixCls}-prefix`" v-if="$slots.prefix || icon">
      <slot name="prefix" />
      <iui-icon :name="icon" size="18" v-if="icon" />
    </view>
    <view :class="`${prefixCls}-content`">
      <view
        :class="`${prefixCls}-content-gradient left`"
        v-if="animation"
      ></view>
      <view :class="`${prefixCls}-content-inner`">
        <view :class="`${prefixCls}-content-text`" :style="[animationStyle]">
          <slot />
        </view>
      </view>
      <view
        :class="`${prefixCls}-content-gradient right`"
        v-if="animation"
      ></view>
    </view>
    <view :class="`${prefixCls}-suffix`" v-if="$slots.suffix || closeable">
      <slot name="suffix" />

      <iui-icon name="close" size="18" v-if="closeable" @click="handleClose" />
    </view>
  </view>
</template>

<script setup>
// TODO:ios 浏览器 inline-block 会使文字放大，暂时未找到原因

import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getRect } from "../../helper/rect";
import { isObject } from "../../helper/is";

const props = defineProps({
  /**
   * 可见
   */
  visible: {
    type: Boolean,
    default: true,
  },

  /**
   * 图标
   */
  icon: {
    type: String,
  },
  /**
   * 是否可关闭
   */
  closeable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否可换行
   */
  wrapable: {
    type: Boolean,
    default: false,
  },
  /**
   * 颜色
   * 预设 success primary warning danger
   * 或者自定义颜色 包括背景色和字体色
   * Object: { background: '#f60', color: '#fff' }
   */
  color: {
    type: [String, Object],
    default: "warning",
  },
  /**
   * 滚动动画
   */
  animation: {
    type: Boolean,
    default: false,
  },
  /**
   * 动画速度
   */
  speed: {
    type: Number,
    default: 40,
  },
});

const prefixCls = "iui-noticebar";

const colorIsPreset = computed(() => {
  if (isObject(props.color)) {
    return false;
  }

  return ["primary", "success", "warning", "danger"].includes(props.color);
});

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${colorIsPreset.value ? props.color : "custom"}`,
  {
    [`${prefixCls}-wrapable`]: props.wrapable,
    [`${prefixCls}-animation`]: props.animation,
  },
]);

const visible = ref(props.visible);

const emit = defineEmits(["update:visible", "close"]);

const handleClose = () => {
  visible.value = false;
  emit("update:visible", false);
  emit("close");
};

const instance = getCurrentInstance();

const getAnimationStyle = () => {
  return new Promise((resolve) => {
    getRect(instance, `.${prefixCls}-content-text`).then((res) => {
      const { width } = res;
      const { windowWidth } = uni.getSystemInfoSync();

      const duration = parseInt(width / props.speed);

      resolve({
        animationDuration: `${duration}s`,
        paddingLeft: `${windowWidth}px`,
      });
    });
  });
};

const animationStyle = ref({});

onMounted(async () => {
  if (props.animation) {
    animationStyle.value = await getAnimationStyle();
  }
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

@mixin gradientColor($color) {
  .iui-noticebar-content-gradient {
    &.left {
      background: linear-gradient(to right, $color, rgba(255, 236, 232, 0));
    }

    &.right {
      background: linear-gradient(to left, $color, rgba(255, 236, 232, 0));
    }
  }
}

.iui-noticebar {
  font-size: $font-size-medium;
  padding: 0 $size-4;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: inherit;

  &.iui-noticebar-wrapable {
    align-items: flex-start;
  }

  &-prefix {
    padding: $size-2;
    padding-left: 0;
  }

  &-suffix {
    padding: $size-2;
    padding-right: 0;
  }

  &-content {
    width: 100%;
    position: relative;
    display: flex;
    overflow: hidden;

    &-gradient {
      position: absolute;
      width: $size-2;
      height: 100%;
      z-index: 99;
      &.left {
        left: 0;
        background: linear-gradient(
          to right,
          v-bind(color),
          rgba(255, 236, 232, 0)
        );
      }

      &.right {
        right: 0;
        background: linear-gradient(
          to left,
          v-bind(color),
          rgb(255, 236, 232, 0)
        );
      }
    }

    &-text {
      display: block;
      .iui-noticebar-animation & {
        display: inline-block;
        animation: marquee linear infinite;
      }
    }

    &-inner {
      flex: 1;
      line-height: 36px;
      flex-shrink: 0;

      // 未滚动 单行溢出
      display: -webkit-box;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      position: relative;
      word-break: break-all;

      .iui-noticebar-animation & {
        white-space: nowrap;
      }

      .iui-noticebar-wrapable & {
        display: block;
        line-height: 20px;
        padding: $size-2 0;
        white-space: normal;
        word-break: break-word;
      }
    }
  }

  &-custom {
    background-color: v-bind("color.background");
    color: v-bind("color.color");
  }

  &-primary {
    background-color: $primary-1;
    color: $primary-6;

    @include gradientColor($primary-1);
  }

  &-success {
    background-color: $success-1;
    color: $success-6;

    @include gradientColor($success-1);
  }

  &-warning {
    background-color: $warning-1;
    color: $warning-6;

    @include gradientColor($warning-1);
  }

  &-danger {
    background-color: $danger-1;
    color: $danger-6;

    @include gradientColor($danger-1);
  }
}

@keyframes marquee {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
</style>
