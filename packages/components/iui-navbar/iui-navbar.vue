<template>
  <view
    :class="`${prefixCls}-wrapper`"
    :style="{
      paddingBottom: safeAreaTop,
    }"
  >
    <view
      :class="`${prefixCls}-status-bar`"
      :style="statusBarStyle"
      v-if="!hideStatusBar"
    ></view>

    <view :class="cls" :style="customStyle">
      <view :class="`${prefixCls}-content`" :style="contentStyle">
        <view
          :class="`${prefixCls}-content-left`"
          :style="{
            width: title ? '88px' : '100%',
          }"
        >
          <view
            v-if="back && !$slots.left"
            class="back"
            @click="handleBackClick"
          >
            <iui-icon name="left" />
          </view>

          <slot name="left" v-if="$slots.left" />
        </view>
        <view :class="`${prefixCls}-content-title`" v-if="title">
          {{ title }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 标题
   */
  title: {
    type: String,
    default: "",
  },
  /**
   * 样式
   */
  customStyle: {
    type: Object,
    default: () => {},
  },
  /**
   * 返回按钮
   */
  back: {
    type: Boolean,
    default: false,
  },
  /**
   * 返回之前Hook
   */
  beforeBack: {
    type: Function,
  },
  /**
   * 固定在顶部
   */
  fixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 状态栏颜色
   */
  statusBarColor: {
    type: String,
    default: "transparent",
  },
  /**
   * 不显示状态栏
   * 一般用于导航栏背景是图片的情况
   */
  hideStatusBar: {
    type: Boolean,
    default: false,
  },
  /**
   * 底部分割线
   */
  split: {
    type: Boolean,
    default: true,
  },
});

const prefixCls = "iui-navbar";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-fixed`]: props.fixed,
    [`${prefixCls}-split`]: props.split,
  },
]);

const statusBarHeight = ref(0);

// #ifdef MP
statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
// #endif

// 状态栏高度
const statusBarStyle = computed(() => {
  const { statusBarHeight } = uni.getSystemInfoSync();
  return {
    height: `${statusBarHeight}px`,
    backgroundColor: props.statusBarColor,
  };
});

// 顶部安全区域
const safeAreaTop = computed(() => {
  if (props.fixed) {
    return `${statusBarHeight.value + 48}px`;
  }
});

// 内容样式
const contentStyle = computed(() => {
  const style = {};

  if (props.fixed && props.hideStatusBar) {
    style.paddingTop = `${statusBarHeight.value}px`;
  }

  return style;
});

const handleBackClick = async () => {
  const done = () => {
    uni.navigateBack({ delta: 1 });
  };

  if (props.beforeBack) {
    await props.beforeBack(done);
  } else {
    done();
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-navbar-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.iui-navbar {
  display: flex;
  width: 100%;
  background-color: $color-bg;
  color: $color-text;

  &-split {
    border-bottom: 1rpx solid $color-border;
  }

  &-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    padding-right: 100px;

    &-title {
      font-size: 17px;
      font-weight: 600;
      text-align: center;
      flex: 1;
    }

    &-left {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      margin-left: $size-3;
      flex-wrap: nowrap;

      .back {
        width: 50px;
        &:active {
          opacity: 0.7;
        }
      }
    }
  }

  &-fixed {
    position: fixed;
    // top: 0;
    // left: 0;
    z-index: 1100;
  }
}
</style>
