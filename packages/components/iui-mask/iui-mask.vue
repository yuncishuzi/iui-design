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
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击遮罩关闭
   */
  maskCloseable: {
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

const emit = defineEmits(["update:visible"]);

const anim = ref(null);

const show = () => {
  anim.value?.enter();
  emit("update:visible", true);
};

const hide = () => {
  anim.value?.leave();
  emit("update:visible", false);
};

const handleClick = () => {
  if (props.maskCloseable) {
    hide();
  }
};

onMounted(() => {
  watch(
    () => props.visible,
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
