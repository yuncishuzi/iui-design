<template>
  <view :class="cls" v-if="visible">
    <view :class="`${prefixCls}-content`">
      <view :class="`${prefixCls}-left`" v-if="$slots.left || icon">
        <slot name="left" />
        <iui-icon :name="icon" size="18" v-if="icon" />
      </view>
      <view :class="`${prefixCls}-content-inner`">
        <view :class="`${prefixCls}-content-text`" :style="animationStyle">
          <slot />
        </view>
      </view>

      <view :class="`${prefixCls}-right`" v-if="$slots.right || closeable">
        <slot name="right" />

        <iui-icon
          name="close"
          size="18"
          v-if="closeable"
          @click="handleClose"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getRect } from "../helper/rect";
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
   * 或者自定义颜色值
   */
  color: {
    type: String,
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
    default: 50,
  },
});

const prefixCls = "iui-noticebar";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-${props.color}`]: props.color,
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

const { windowWidth } = uni.getSystemInfoSync();

const getAnimationStyle = () => {
  return new Promise((resolve) => {
    getRect(instance, `.${prefixCls}-content-text`).then((res) => {
      const { width } = res;
      const duration = width / props.speed;

      resolve({
        animationDuration: `${duration}s`,
      });
    });
  });
};

const animationStyle = ref({});

onMounted(async () => {
  if (props.animation) {
    animationStyle.value = await getAnimationStyle();
    console.log(await getAnimationStyle());
  }
});
</script>

<style lang="scss" scoped>
@import "../style/index.scss";
.iui-noticebar {
  font-size: $font-size-medium;
  padding: 0 $size-4;

  &-left {
    padding: $size-2;
    padding-left: 0;
  }

  &-right {
    padding: $size-2;
    padding-right: 0;
  }

  &-content {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    position: relative;

    .iui-noticebar-wrapable & {
      align-items: flex-start;
    }

    &-text {
      display: inline-block;
      .iui-noticebar-animation & {
        animation: marquee linear infinite;
      }
    }

    &-inner {
      flex: 1;
      line-height: 36px;
      white-space: nowrap;
      overflow: hidden;

      .iui-noticebar-wrapable & {
        line-height: 20px;
        padding: $size-2 0;
      }
    }
  }

  &-primary {
    background-color: $primary-3;
    color: $color-white;
  }

  &-success {
    background-color: $success-6;
    color: $color-white;
  }

  &-warning {
    background-color: $warning-1;
    color: $warning-6;
  }

  &-danger {
    background-color: $danger-6;
    color: $color-white;
  }
}

@keyframes marquee {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
