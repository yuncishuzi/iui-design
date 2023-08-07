<template>
  <view
    :class="cls"
    v-show="innerVisible"
    :style="{
      pointerEvents: toast.mask ? 'auto' : 'none',
    }"
  >
    <iui-translation ref="anim" enter="fadeIn" leave="fadeOut">
      <view :class="`${prefixCls}-content`">
        <view
          class="position"
          :style="{
            alignItems: toastPosition,
          }"
        >
          <view
            class="content"
            :style="{
              padding:
                toastIcon || toast.loading ? '12px 16px 16px' : '12px 16px',
            }"
          >
            <view class="icon" v-if="toast.type || toast.icon || toast.loading">
              <iui-icon
                size="24"
                :name="toastIcon"
                v-if="!toast.loading"
              ></iui-icon>
              <view class="loading" v-else>
                <iui-spin color="white"></iui-spin>
              </view>
            </view>
            {{ toast.message }}
          </view>
        </view>
      </view>
    </iui-translation>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import { isString } from "../../helper/is";

const props = defineProps({
  /**
   * 消息文本
   */
  message: {
    type: String,
    default: "",
  },
  /**
   * 持续时间
   */
  duration: {
    type: Number,
    default: 3000,
  },
  /**
   * 位置
   * position: top | center | bottom
   */
  position: {
    type: String,
    default: "center",
  },
  /**
   * 图标
   */
  icon: {
    type: String,
  },
  /**
   * 类型
   * type: success | error | warning
   */
  type: {
    type: String,
  },
  /**
   * 方向
   */
  direction: {
    type: String,
    default: "vertical",
  },
  /**
   * 遮罩
   * 阻止用户操作
   */
  mask: {
    type: Boolean,
    default: false,
  },
});

const toast = ref({});

const prefixCls = "iui-toast";
const cls = computed(() => [
  prefixCls,
  `${prefixCls}-${toast.value.position}`,
  `${prefixCls}-${toast.value.direction}`,
]);

const anim = ref();
const innerVisible = ref(false);

// 位置
const toastPosition = computed(() => {
  if (toast.value.position === "center") return "center";
  return toast.value.position === "top" ? "flex-start" : "flex-end";
});

// 图标
const toastIcon = computed(() => {
  if (toast.value.icon) return toast.value.icon;
  if (toast.value.type) {
    switch (toast.value.type) {
      case "success":
        return "check-circle";
      case "error":
        return "close-circle";
      case "warning":
        return "warning-circle";
    }
  }
  return "";
});

let timeout = null;

const hide = () => {
  timeout = setTimeout(async () => {
    await anim.value?.leave();
    innerVisible.value = false;
  }, toast.value.duration);
};

const show = async (params) => {
  clearTimeout(timeout);
  isString(params) && (params = { message: params });
  toast.value = {
    ...props,
    ...params,
  };

  innerVisible.value = true;
  await anim.value?.enter();

  if (!toast.value.loading) {
    hide();
  }
};

const showLoading = (params) => {
  isString(params) && (params = { message: params });

  show({
    ...params,
    loading: true,
    mask: true,
  });
};

const hideLoading = async () => {
  await anim.value?.leave();
  innerVisible.value = false;
};

defineExpose({
  show,
  showLoading,
  hideLoading,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-toast {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;

    .position {
      height: 80%;
      width: 80%;
      display: flex;
      justify-content: center;
    }

    .content {
      background-color: rgba($color: #000000, $alpha: 0.8);
      border-radius: $border-radius-medium;
      color: $color-white;
      line-height: 1.5;
      text-align: center;

      .icon {
        display: flex;
        justify-content: center;

        .loading {
          padding: $size-2;
          margin-bottom: -4px;
        }
      }
    }
  }

  &-horizontal {
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $size-2 $size-4 !important;
    }
    .icon {
      margin-right: $size-2;
    }
  }
}
</style>
