<template>
  <view class="loading"></view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * 图标大小
   */
  size: {
    type: Number,
    default: 18,
  },
  /**
   * 图标颜色
   */
  color: {
    type: String,
    default: "#3C7EFF",
  },
});

const iconSize = computed(() => `${props.size}px`);
</script>

<style lang="scss" scoped>
.loading {
  width: v-bind(iconSize);
  height: v-bind(iconSize);
  border: 2px solid v-bind(color);
  border-top-color: transparent;
  border-radius: 100%;

  animation: circle infinite 0.75s linear;
}

// 转转转动画
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
