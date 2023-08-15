<template>
  <view :class="cls">
    <template v-if="$slots.navbar">
      <view :class="`${prefixCls}-navbar`">
        <slot name="navbar" />
      </view>
    </template>
    <iui-spin :loading="loading" :tip="loadingTip" fullScreen>
      <view :class="`${prefixCls}-content`">
        <slot />
      </view>
    </iui-spin>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * 加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载提示文字
   */
  loadingTip: {
    type: String,
    default: "加载中",
  },
  /**
   * 底部安全区
   */
  safeBottom: {
    type: Boolean,
    default: true,
  },
});

const prefixCls = "iui-page";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-safe-area-bottom`]: props.safeBottom,
  },
]);
</script>

<style lang="scss" scoped>
.iui-page {
  width: 100%;
  height: -webkit-fill-available;

  &-safe-area-bottom {
    // 底部安全区域
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
