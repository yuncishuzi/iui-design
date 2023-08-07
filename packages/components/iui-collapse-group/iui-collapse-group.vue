<template>
  <view :class="cls">
    <slot />
  </view>
</template>

<script setup>
import { computed, ref, getCurrentInstance, provide } from "vue";

const props = defineProps({
  /**
   * 当前激活Key
   */
  activeKey: {
    type: [String, Number],
    default: "",
  },
  /**
   * 手风琴模式
   */
  accordion: {
    type: Boolean,
    default: false,
  },
  /**
   * 分割线
   */
  split: {
    type: Boolean,
    default: true,
  },
});

const prefixCls = "iui-collapse-group";

const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-split`]: props.split,
  },
]);

const instance = getCurrentInstance();

provide("collapse-group", instance);

const activeKey = ref(props.activeKey);

const setActiveKey = (key) => {
  activeKey.value = key;
};

defineExpose({
  activeKey,
  setActiveKey,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-collapse-group {
  width: 100%;

  &-split {
    /* #ifndef MP */
    :deep(:not(:last-child)) .iui-cell {
      border-bottom: 1rpx solid $color-border-dark;
    }
    /* #endif */

    /* #ifdef MP */
    :deep(:not(:last-child)) cell {
      border-bottom: 1rpx solid $color-border-dark;
    }
    /* #endif */
  }
}
</style>
