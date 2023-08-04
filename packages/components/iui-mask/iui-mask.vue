<template>
  <iui-translation ref="anim">
    <view :class="prefixCls" @click.stop="handleClick">
      <slot></slot>
    </view>
  </iui-translation>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const prefixCls = "iui-mask";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击遮罩关闭
   */
  maskClosable: {
    type: Boolean,
    default: true,
  },
  /**
   * 背景色
   */
  backgroundColor: {
    type: String,
    default: "rgba(0, 0, 0, 0.6)",
  },
});

const emit = defineEmits(["update:modelValue"]);

const anim = ref(null);

const show = () => {
  anim.value?.enter();
  emit("update:modelValue", true);
};

const hide = () => {
  anim.value?.leave();
  emit("update:modelValue", false);
};

const handleClick = () => {
  if (props.maskClosable) {
    hide();
  }
};

onMounted(() => {
  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        show();
      } else {
        hide();
      }
    }
  );
});

defineExpose({
  show,
  hide,
});
</script>

<style lang="scss" scoped>
.iui-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: v-bind(backgroundColor);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
