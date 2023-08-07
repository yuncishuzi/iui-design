<template>
  <view
    :class="prefixCls"
    :style="{
      animation: `${animStatus}`,
      height: '100%',
      width: '100%',
    }"
  >
    <slot v-if="animStatus" />
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 进入动画
   */
  enter: {
    type: String,
    default: "fadeIn",
  },
  /**
   * 离开动画
   */
  leave: {
    type: String,
    default: "fadeOut",
  },
  /**
   * 动画持续时间
   */
  duration: {
    type: Number,
    default: 300,
  },
  /**
   * 动画状态
   * status : pending | enter | leave | end
   */
  status: {
    type: String,
    default: "pending",
  },
  /**
   * 动画函数
   */
  timing: {
    type: String,
    default: "ease",
  },
});

const prefixCls = '"iui-translation"';

const emit = defineEmits(["enter", "leave", "end"]);

const innerStatus = ref(props.status);

// 正在播放动画
const isAnimating = ref(false);

// 动画开始
const handleEnter = () => {
  emit("enter");
};

// 动画离开
const handleLeave = async () => {
  return new Promise((resolve) => {
    emit("leave");

    setTimeout(() => {
      innerStatus.value = "end";
      resolve();
    }, props.duration);
  });
};

// 动画结束
const handleEnd = () => {
  emit("end");
};

// 计算动画状态
const animStatus = computed(() => {
  if (innerStatus.value === "enter") {
    return `${props.enter} ${props.duration}ms ${props.timing}`;
  }
  if (innerStatus.value === "leave") {
    return `${props.leave} ${props.duration}ms ${props.timing} forwards`;
  }
});

// 播放进入动画
const enter = async () => {
  if (isAnimating.value) return;

  return new Promise((resolve) => {
    isAnimating.value = true;
    innerStatus.value = "enter";
    handleEnter();
    setTimeout(() => {
      isAnimating.value = false;
      resolve();
    }, props.duration);
  });
};

// 播放离开动画
const leave = async () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  innerStatus.value = "leave";
  await handleLeave();
  isAnimating.value = false;
  handleEnd();
};

defineExpose({
  enter,
  leave,
  isAnimating: isAnimating.value,
});
</script>

<style lang="scss" scoped>
@import "../../style/anim.scss";
</style>
