<template>
  <view class="demo-title">{{ title }}</view>
  <view class="demo-content" :style="{ backgroundColor: bgColor, padding }">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  bgColor: {
    type: String,
    default: "var(--iui-bg)",
  },
  padding: {
    type: Number,
    default: 16,
  },
});
</script>
