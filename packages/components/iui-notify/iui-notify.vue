<template>
  <view
    :class="cls"
    :style="{
      transition: `height ${transitionTime}ms`,
      background: props.color?.background,
      color: props.color?.color,
      height: visiable ? `${props.height}px` : 0,
      position: props.fixed ? 'fixed' : 'relative',
    }"
  >
    <view
      :class="[
        `${prefixCls}-mask`,
        `${prefixCls}-${preNotify.type}`,
        {
          [`${prefixCls}-leaving`]: preNotifyNeedToLeave,
        },
      ]"
      v-if="preNotifyNeedToLeave"
    >
      <slot name="content" :msg="preNotify.content" v-if="$slots.content" />
      <text v-else>{{ preNotify.content }}</text>
    </view>

    <view :class="[`${prefixCls}-content`, `${prefixCls}-${notify.type}`]">
      <slot name="content" :msg="notify.content" v-if="$slots.content" />
      <text v-else>{{ notify.content }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, useSlots } from "vue";

const props = defineProps({
  /**
   * 内容
   */
  content: {
    type: String,
    default: "",
  },
  /**
   * 是否显示
   */
  visiable: {
    type: Boolean,
    default: false,
  },
  /**
   * 显示时长
   */
  timeout: {
    type: Number,
    default: 2000,
  },
  /**
   * 通知类型
   * type: primary, success, warning, error
   */
  type: {
    type: String,
    default: "primary",
  },
  /**
   * 颜色
   * color: background color
   */
  color: {
    type: Object,
  },
  /**
   * 高度
   * 通知栏高度
   */
  height: {
    type: Number,
    default: 40,
  },
  /**
   * 固定在顶部
   */
  fixed: {
    type: Boolean,
    default: false,
  },
});

const visiable = ref(props.visiable);
const notify = ref({
  content: props.content,
  type: props.type,
});

const slots = useSlots();

const prefixCls = "iui-notify";
const cls = computed(() => [
  prefixCls,
  {
    [`iui-notify-${notify.value.type || "primary"}`]:
      !props.color || !slots.content,
  },
]);

const preNotifyNeedToLeave = ref(false);
const preNotify = ref({});

let timer = null;

const transitionTime = ref(300);

const push = (params) => {
  if (!visiable.value) {
    notify.value = params;
    visiable.value = true;
    timer = setTimeout(() => {
      visiable.value = false;
    }, props.timeout);
  } else {
    clearTimeout(timer);

    if (!notify.value.type || slots.content) {
      visiable.value = false;
      setTimeout(() => {
        notify.value = params;
        visiable.value = true;
      }, 300);
      return;
    }

    // 深拷贝原来的notify
    visiable.value = false;
    preNotify.value = JSON.parse(JSON.stringify(notify.value));
    preNotifyNeedToLeave.value = true;

    // 让新的notify出现速度慢一点
    transitionTime.value = 500;
    setTimeout(() => {
      transitionTime.value = 300;
    }, 500);

    //  300ms后关闭上一个notify
    setTimeout(() => {
      preNotifyNeedToLeave.value = false;
    }, 300);

    // 显示新的notify
    notify.value = params;
    setTimeout(() => {
      visiable.value = true;
    }, 150);

    // 设置超时
    timer = setTimeout(() => {
      visiable.value = false;
    }, props.timeout);
  }
};

const success = (params) => {
  push({
    ...params,
    type: "success",
  });
};

const warning = (params) => {
  push({
    ...params,
    type: "warning",
  });
};

const error = (params) => {
  push({
    ...params,
    type: "error",
  });
};

defineExpose({
  push,
  success,
  warning,
  error,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-notify {
  width: 100%;
  z-index: 990;
  overflow: hidden;
  font-size: $font-size-medium;

  &-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 997;
  }

  &-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  }

  &-primary {
    background: none;
    color: $primary-6;
  }

  &-success {
    background: $success-6;
    color: $color-white;
  }

  &-warning {
    background: $warning-6;
    color: $color-white;
  }

  &-error {
    background: $danger-6;
    color: $color-white;
  }
}

.iui-notify-leaving {
  animation: slideOut 300ms ease-in-out forwards;
}

@keyframes slideOut {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
