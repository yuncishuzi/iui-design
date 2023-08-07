<template>
  <view
    :class="cls"
    :style="{
      borderRadius: isNumber(props.radius) ? `${props.radius}px` : props.radius,
    }"
  >
    <view :class="`${prefixCls}-overlap`" v-if="overlap">
      <iui-spin color="#e5e6eb" v-if="loading"></iui-spin>

      <view class="load-error" v-else>
        <iui-icon name="stop" size="15"></iui-icon>
        <text>{{ errorText }}</text>
      </view>
    </view>
    <image
      id="image"
      v-show="!overlap"
      :class="`${prefixCls}-image-container`"
      :src="src"
      :lazy-load="lazy"
      :mode="mode"
      @load="handleLoaded"
      @error="handleLoadedError"
    />
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import { isNumber } from "../../helper/is";

const props = defineProps({
  /**
   * 资源地址
   */
  src: {
    type: String,
    default: "",
  },
  /**
   * 裁剪模式
   */
  mode: {
    type: String,
    default: "scaleToFill",
  },
  /**
   * 加载中
   * 使用后图片将不会自动隐藏加载状态，需要手动控制
   */
  loading: {
    type: Boolean,
  },
  /**
   * 加载失败提示文字
   */
  errorText: {
    type: String,
    default: "加载失败",
  },
  /**
   * 懒加载
   */
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  /**
   * 圆角
   */
  radius: {
    type: [Number, String],
    default: 0,
  },
});

const loaded = ref(false);
const loading = ref(true);

const overlap = computed(() => {
  if (props.loading) return true;
  return !loaded.value || loading.value;
});

const prefixCls = "iui-image";

const cls = computed(() => [prefixCls]);

const emit = defineEmits(["load", "error"]);

const handleLoaded = () => {
  emit("load");
  loaded.value = true;
  if (props.loading) return;
  loading.value = false;
};

const handleLoadedError = () => {
  emit("error");
  loaded.value = false;
  loading.value = false;
};

defineExpose({
  loaded,
  loading,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-image {
  height: 100%;
  position: relative;
  border-radius: inherit;
  overflow: hidden;

  &-image-container {
    width: 100%;
    height: inherit;
    animation: fadeIn 240ms ease-in-out;
  }

  &-overlap {
    width: 100%;
    height: 100%;
    background-color: $color-bg-secondary;
    color: $color-text-lighten;
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;

    .load-error {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      align-items: center;
    }
  }
}
</style>
