<template>
  <view
    v-show="innerVisible"
    :class="cls"
    :style="{
      background: showMask ? 'rgba(0,0,0,0.5)' : 'transparent',
    }"
    @click="handleMaskClick"
  >
    <iui-translation ref="anim" enter="fadeZoomIn" leave="fadeZoomOut">
      <view :class="`${prefixCls}-container`">
        <view :class="`${prefixCls}-modal`" @click.stop>
          <view class="title">
            <view class="text" v-if="!$slots.title">{{ dialog.title }}</view>

            <slot name="title" v-else />
          </view>
          <view class="content">
            <text v-if="dialog.content">{{ dialog.content }}</text>
            <slot />
          </view>
          <view class="footer">
            <block v-if="!$slots.action">
              <view v-if="dialog.cancel" class="button" @click="handleCancel">
                <iui-spin v-if="cancelLoading"></iui-spin>
                <template v-else>
                  {{ dialog.cancelText }}
                </template>
              </view>
              <view class="button" @click="handleConfirm">
                <iui-spin v-if="confirmLoading"></iui-spin>
                <template v-else>
                  {{ dialog.confirmText }}
                </template>
              </view>
            </block>
            <slot name="action" v-else />
          </view>
        </view>
      </view>
    </iui-translation>
  </view>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 标题
   */
  title: {
    type: String,
  },
  /**
   * 内容
   */
  content: {
    type: String,
  },
  /**
   * 圆角
   */
  radius: {
    type: Number,
    default: 10,
  },

  /**
   * 显示取消按钮
   */
  cancel: {
    type: Boolean,
    default: true,
  },

  /**
   * 取消文字
   */
  cancelText: {
    type: String,
    default: "取消",
  },
  /**
   * 确认文字
   */
  confirmText: {
    type: String,
    default: "确认",
  },
  /**
   * 点击遮罩层是否关闭
   */
  maskClosable: {
    type: Boolean,
    default: true,
  },
  /**
   * 确认前回调
   */
  beforeConfirm: {
    type: Function,
  },
  /**
   * 关闭前回调
   */
  beforeCancel: {
    type: Function,
  },
});

const innerVisible = ref(false);

const prefixCls = "iui-dialog";

const cls = computed(() => [prefixCls]);

const emit = defineEmits(["update:modelValue", "close", "confirm", "cancel"]);

const anim = ref();

const showMask = ref(false);

const dialog = ref({
  title: props.title,
  content: props.content,
  radius: props.radius,
  cancel: props.cancel,
  cancelText: props.cancelText,
  confirmText: props.confirmText,
  maskClosable: props.maskClosable,
  beforeConfirm: props.beforeConfirm,
  beforeCancel: props.beforeCancel,
});

const open = async (params) => {
  dialog.value = {
    ...props,
    ...params,
  };

  innerVisible.value = true;
  setTimeout(() => {
    showMask.value = true;
  }, 50);
  await anim.value?.enter();
};

const close = async () => {
  if (!innerVisible.value) return;

  showMask.value = false;
  await anim.value?.leave();
  innerVisible.value = false;
  emit("update:modelValue", false);
  emit("close");
};

const handleMaskClick = () => {
  console.log("handleMaskClick");
  if (props.maskClosable) {
    close();
  }
};

const confirmLoading = ref(false);
const handleConfirm = async () => {
  if (dialog.value.beforeConfirm) {
    confirmLoading.value = true;
    const res = await dialog.value.beforeConfirm();
    confirmLoading.value = false;
    if (!res) return;
  }
  emit("confirm");
  close();
};
const cancelLoading = ref(false);
const handleCancel = async () => {
  if (dialog.value.beforeCancel) {
    cancelLoading.value = true;
    const res = await dialog.value.beforeCancel();
    cancelLoading.value = false;
    if (!res) return;
  }
  emit("cancel");
  close();
};

onMounted(() => {
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        open();
      } else {
        close();
      }
    },
    {
      immediate: true,
    }
  );
});

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in-out;
  color: $color-text;

  &-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1002;
    position: relative;
  }

  &-modal {
    background-color: $color-bg;
    border-radius: 10rpx;
    overflow: hidden;
    width: 300px;

    .title {
      padding: $size-4 $size-3 $size-1;

      .text {
        font-size: 17px;
        text-align: center;
        width: 100%;
        font-weight: bold;
      }
    }

    .content {
      padding: $size-1 $size-4 $size-5;
      text-align: center;
      color: $color-text-light;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1rpx solid $color-border-light;

      :not(:last-child)::after {
        transform: scaleX(0.5);
        border-radius: 0;
        content: " ";
        width: 1px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        border-right: 1rpx solid $color-border-light;
      }

      .button {
        flex: 1;
        padding: $size-3 $size-4;
        color: $primary-6;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &:active {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
