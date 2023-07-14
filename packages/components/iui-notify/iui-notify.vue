<template>
  <view
    :class="cls"
    :style="{
      height: visiable ? '40px' : 0,
      transition: `height ${transitionTime}ms`,
    }"
  >
    <view
      :class="[
        `${prefixCls}-mask`,
        {
          [`${prefixCls}-leaving`]: preNotifyNeedToLeave,
        },
      ]"
      v-if="preNotifyNeedToLeave"
    >
      {{ preNotify.content }}
    </view>

    <view :class="`${prefixCls}-content`">
      {{ notify.content }}
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

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
});

const prefixCls = "iui-notify";
const cls = computed(() => [prefixCls]);

const visiable = ref(props.visiable);
const notify = ref({
  content: props.content,
});

const preNotifyNeedToLeave = ref(false);
const preNotify = ref({});

let timer = null;

const transitionTime = ref(300);

const show = (params) => {
  if (!visiable.value) {
    notify.value = params;
    visiable.value = true;
    timer = setTimeout(() => {
      visiable.value = false;
    }, props.timeout);
  } else {
    clearTimeout(timer);
    // 深拷贝原来的notify
    visiable.value = false;
    preNotify.value = JSON.parse(JSON.stringify(notify.value));
    preNotifyNeedToLeave.value = true;

    // 让新的notify出现速度慢一点
    transitionTime.value = 600;
    setTimeout(() => {
      transitionTime.value = 300;
    }, 600);

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

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
@import "../style/index.scss";
.iui-notify {
  width: 100%;
  overflow: hidden;

  z-index: 990;
  position: relative;

  &-mask {
    width: 100%;
    height: inherit;
    position: absolute;
    background: #ff7d00;
    // background-color: $primary-6;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    z-index: 997;
  }

  &-content {
    width: 100%;
    height: inherit;
    background-color: $primary-6;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    position: absolute;
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
