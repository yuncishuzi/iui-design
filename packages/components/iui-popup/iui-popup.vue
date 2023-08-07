<template>
  <view :class="cls" v-show="innerVisible">
    <iui-translation ref="maskTranslation" v-if="popupConfig.mask">
      <view
        :class="`${prefixCls}-mask`"
        :style="{
          opacity: maskOpacity,
        }"
        @click="handleClickMask"
        @touchmove.prevent
      ></view>
    </iui-translation>

    <view
      :class="[`${prefixCls}-container`, `${prefixCls}-container-${direction}`]"
    >
      <iui-translation
        ref="containerTranslation"
        :enter="animation[direction].enter"
        :leave="animation[direction].leave"
      >
        <view
          :class="`${prefixCls}-container-content`"
          :style="{
            transform: `translate(${transX || 0}px,${transY || 0}px)`,
            height: isVertical ? `${popupConfig.height}px` : '100%',
            width: isHorizontal ? `${popupConfig.width}px` : '100%',
            ...containerStyle,
          }"
        >
          <view
            v-if="popupConfig.slide"
            :class="`${prefixCls}-handle`"
            @touchstart="popupConfig.slide ? handleTouchStart($event) : null"
            @touchend="popupConfig.slide ? handleTouchEnd($event) : null"
            @touchmove.prevent="
              popupConfig.slide ? handleTouchMove($event) : null
            "
            :style="{
              height: isVertical
                ? popupConfig.title
                  ? '48px'
                  : '24px'
                : '100%',
              width: isHorizontal ? '48px' : '100%',
              top: direction === 'bottom' ? '0' : 'auto',
              bottom: direction === 'top' ? '0' : 'auto',
              left: direction === 'right' ? '0' : 'auto',
              right: direction === 'left' ? '0' : 'auto',
            }"
          ></view>

          <view :class="`${prefixCls}-title`">
            <view class="text" v-if="popupConfig.title && !$slots.title">
              <text>{{ popupConfig.title }}</text>
            </view>
            <slot name="title" v-else />

            <slot name="extra" />
          </view>
          <view class="content" :style="contentStyle">
            <slot />
          </view>
        </view>
      </iui-translation>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  /**
   * 可见
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 方向
   */
  direction: {
    type: String,
    default: "bottom",
  },
  /**
   * 是否显示遮罩层
   */
  mask: {
    type: Boolean,
    default: true,
  },
  /**
   * 点击遮罩层是否关闭
   */
  maskClosable: {
    type: Boolean,
    default: true,
  },

  /**
   * 标题
   */
  title: {
    type: String,
  },
  /**
   * 可滑动
   */
  slide: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出层高度
   * 只有在 direction 为 top 或 bottom 时生效
   */
  height: {
    type: Number,
    default: 330,
  },
  /**
   * 弹出层宽度
   * 只有在 direction 为 left 或 right 时生效
   */
  width: {
    type: Number,
    default: 290,
  },
  /**
   * 容器样式
   */
  containerStyle: {
    type: Object,
  },
  /**
   * 内容样式
   */
  contentStyle: {
    type: Object,
  },
});

const innerVisible = ref(props.modelValue);

const prefixCls = "iui-popup";
const cls = computed(() => [prefixCls]);

const emit = defineEmits(["update:modelValue", "close", "open"]);

// 滑动关闭
const startPoint = ref();
const endPoint = ref();

const handleClose = () => {
  innerVisible.value = false;
  emit("update:modelValue", false);
  emit("close");

  if (popupConfig.value.slide) {
    startPoint.value = null;
    endPoint.value = null;
  }
};

const popupConfig = ref({
  mask: props.mask,
  maskClosable: props.maskClosable,
  direction: props.direction,
  visible: innerVisible.value,
  slide: props.slide,
  height: props.height,
  width: props.width,
  title: props.title,
  onClose: handleClose,
});

const direction = computed(() => {
  return popupConfig.value.direction;
});

// 是否上下布局
const isVertical = computed(() => {
  return direction.value === "top" || direction.value === "bottom";
});

// 是否左右布局
const isHorizontal = computed(() => {
  return direction.value === "left" || direction.value === "right";
});

const containerTranslation = ref();

const maskTranslation = ref();
const handleClickMask = () => {
  if (props.maskClosable) {
    close();
  }
};

// 遮罩透明度
const maskOpacity = computed(() => {
  if (popupConfig.value.slide) {
    if (isVertical.value) {
      return (
        (popupConfig.value.height - transY.value) / popupConfig.value.height
      );
    } else {
      return (popupConfig.value.width - transX.value) / popupConfig.value.width;
    }
  }
  return 1;
});

const close = async () => {
  if (!innerVisible.value) return;

  Promise.all([
    maskTranslation.value?.leave(),
    containerTranslation.value.leave(),
  ]).then(() => {
    handleClose();
  });
};

onMounted(() => {
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        open();
      } else {
        close();
      }
    },
    {
      immediate: true,
    }
  );
});

// 通过方法打开
const open = (params) => {
  // 传入参数覆盖默认参数
  popupConfig.value = Object.assign(popupConfig.value, params);

  if (props.mask) {
    maskTranslation.value?.enter();
  }

  containerTranslation.value.enter().then(() => {
    innerVisible.value = true;
    emit("update:modelValue", true);
    emit("open");
  });
};

const transY = computed(() => {
  if (direction.value === "bottom") {
    const distance = endPoint.value?.y - startPoint.value?.y;
    return distance > 0 ? distance : 0;
  }

  if (direction.value === "top") {
    const distance = startPoint.value?.y - endPoint.value?.y;
    return distance > 0 ? -distance : 0;
  }
  return 0;
});

const transX = computed(() => {
  if (direction.value === "left") {
    const distance = startPoint.value?.x - endPoint.value?.x;
    return distance > 0 ? -distance : 0;
  }

  if (direction.value === "right") {
    const distance = endPoint.value?.x - startPoint.value?.x;
    return distance > 0 ? distance : 0;
  }
  return 0;
});

const handleTouchStart = (e) => {
  startPoint.value = {
    x: e.touches[0].pageX,
    y: e.touches[0].pageY,
  };
};

const handleTouchEnd = () => {
  if (!endPoint.value || !startPoint.value) return;
  switch (direction.value) {
    case "bottom":
      if (endPoint.value.y - startPoint.value.y > 100) {
        close();
      } else {
        endPoint.value = null;
      }
      break;
    case "top":
      if (startPoint.value.y - endPoint.value.y > 100) {
        close();
      } else {
        endPoint.value = null;
      }
      break;
    case "left":
      if (startPoint.value.x - endPoint.value.x > 100) {
        close();
      } else {
        endPoint.value = null;
      }
      break;
    case "right":
      if (endPoint.value.x - startPoint.value.x > 100) {
        close();
      } else {
        endPoint.value = null;
      }
      break;
    default:
      break;
  }
};

let pause = false;
const handleTouchMove = (e) => {
  if (pause) return;

  endPoint.value = {
    x: e.touches[0].pageX,
    y: e.touches[0].pageY,
  };

  pause = true;
  setTimeout(() => {
    pause = false;
  }, 50);
};

// 各方向动画
const animation = {
  bottom: {
    enter: "slideInUp",
    leave: "slideOutDown",
  },
  top: {
    enter: "slideInDown",
    leave: "slideOutUp",
  },
  left: {
    enter: "slideInLeft",
    leave: "slideOutLeft",
  },
  right: {
    enter: "slideInRight",
    leave: "slideOutRight",
  },
};

defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-popup {
  position: fixed;
  z-index: 1000;
  height: 100%;
  color: $color-text;

  &-mask {
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.6);
    transition: opacity 500ms;
  }

  &-container {
    z-index: 1002;
    position: fixed;
    &-content {
      display: flex;
      flex-direction: column;
      background-color: $color-bg;
      width: 100%;
      transition: all 300ms;
      position: relative;
      @include safe-area;

      .content {
        padding: $size-3 $size-4;
        flex: 1;
        overflow: scroll;
        z-index: 1003;
        height: 0;
      }
    }

    &-bottom {
      width: 100%;
      bottom: 0;
      left: 0;
    }

    &-top {
      width: 100%;
      top: 0;
      left: 0;
    }
    &-left {
      height: 100%;
      top: 0;
      left: 0;

      .iui-popup-container-content {
        height: 100%;
      }
    }

    &-right {
      height: 100%;
      top: 0;
      right: 0;

      .iui-popup-container-content {
        height: 100%;
      }
    }
  }

  &-handle {
    position: absolute;
    z-index: 1004;
  }

  &-title {
    padding: $size-3 $size-4 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
      height: 40px;
      line-height: 40px;
      font-size: $size-5;
      font-weight: bold;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
