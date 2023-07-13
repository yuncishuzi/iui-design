<template>
  <view :class="cls">
    <view
      :class="`${prefixCls}-content`"
      :style="{
        height: visiable ? '40px' : 0,
      }"
    >
      {{ config.content }}
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
const config = ref({
  content: props.content,
});

const show = (params) => {
  config.value = params;
  visiable.value = true;

  setTimeout(() => {
    visiable.value = false;
  }, props.timeout);
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

  &-content {
    height: 100%;
    background-color: $primary-6;
    transition: height 300ms;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
  }
}
</style>
