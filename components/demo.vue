<template>
  <view class="demo-title">{{ title }}</view>
  <view class="demo-content">
    <slot />
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
