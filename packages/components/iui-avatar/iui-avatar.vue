<template>
  <view :class="`${prefixCls}-wrapper ${shape}`">
    <view :class="cls" :style="{ ...avatarSize, backgroundColor: bgColor }">
      <view :class="`${prefixCls}-icon-text`" v-if="$slots.default && !src">
        <slot />
      </view>
      <image
        v-else-if="!src"
        :class="`${prefixCls}-icon-default`"
        :src="defaultImage"
        mode="scaleToFill"
      />
      <image
        v-else
        :class="`${prefixCls}-icon-image`"
        :src="src"
        mode="scaleToFill"
      />
    </view>
    <view
      v-if="
        avatarName ||
        avatarDesc ||
        $slots.avatarName ||
        $slots.avatarDesc ||
        $slots.extra
      "
      :class="`${prefixCls}-info-container`"
    >
      <view :class="`${prefixCls}-text`">
        <view
          v-if="avatarName || $slots.avatarName"
          :class="`${prefixCls}-text-name`"
          :style="{
            fontSize: autoSize
              ? isNumber(size)
                ? `${size / 2.5}px`
                : size
              : '',
          }"
        >
          <slot name="avatarName" v-if="$slots.avatarName" />
          <text v-else>{{ avatarName }}</text>
        </view>
        <view
          v-if="avatarDesc || $slots.avatarDesc"
          :class="`${prefixCls}-text-desc`"
        >
          <slot name="avatarDesc" v-if="$slots.avatarDesc" />
          <text v-else>{{ avatarDesc }}</text>
        </view>
      </view>
      <view :class="`${prefixCls}-extra`" v-if="$slots.extra">
        <slot name="extra" />
      </view>
    </view>
  </view>
</template>

<script setup>
// TODO:
// 角标
// 图标头像
import { computed } from "vue";
import DefaultImage from "./assets/default.js";
import { isNumber, isString } from "../../helper/is";

const props = defineProps({
  /**
   * 头像形状
   * shape: circle | square
   */
  shape: {
    type: String,
    default: "circle",
  },
  /**
   * 头像大小
   * 默认有5种尺寸,也可以自定义
   * size: mini | small | medium | large | huge | 24 | 24px
   */
  size: {
    type: [String, Number],
    default: 36,
  },
  /**
   * 头像图片
   * src: url
   */
  src: {
    type: String,
    default: "",
  },
  /**
   * 背景颜色
   */
  bgColor: {
    type: String,
    default: "",
  },
  /**
   * 默认图标
   * 未传入 src 且未传入 slot 时显示，默认未人像
   */
  defaultImage: {
    type: String,
    default: DefaultImage,
  },
  /**
   * 头像名称
   * avatarName
   */
  avatarName: {
    type: String,
    default: "",
  },
  /**
   * 头像描述
   * avatarDesc
   */
  avatarDesc: {
    type: String,
    default: "",
  },
  /**
   * 文字自适应大小
   * 头像名称和头像描述的文字大小自适应
   */
  autoSize: {
    type: Boolean,
    default: false,
  },
  /**
   * wrapper 对齐方式
   * align： start | center | end
   */
  align: {
    type: String,
    default: "center",
  },
});

const prefixCls = "iui-avatar";

const cls = computed(() => [
  prefixCls,
  [`${prefixCls}-${props.shape}`, `${prefixCls}-${props.size}`],
]);

const getSize = (size) => {
  if (isNumber(size)) {
    return size;
  }
  switch (size) {
    case "mini":
      return 24;
    case "small":
      return 32;
    case "medium":
      return 40;
    case "large":
      return 48;
    case "huge":
      return 56;
    default:
      return size;
  }
};

const avatarSize = computed(() => {
  let size = getSize(props.size);

  size = isString(size) ? size : size + "px";

  return {
    width: size,
    height: size,
  };
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-avatar-wrapper {
  display: flex;
  align-items: v-bind(align);
  justify-content: space-between;

  .iui-avatar {
    width: $icon-medium;
    height: $icon-medium;
    background-color: $color-bg-active;
    flex-shrink: 0;
    position: relative;
    color: $color-white;
    &-circle {
      border-radius: 50%;
    }

    &-square {
      border-radius: $border-radius-small;
    }

    &-icon {
      &-default {
        position: absolute;
        width: 50%;
        height: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        fill: $color-bg-light;
      }
      &-text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        font-weight: 600;
        overflow: hidden;
      }

      &-image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
    }
  }

  .iui-avatar-info-container {
    margin-left: $size-4;
    display: flex;
    justify-content: space-between;
    align-items: v-bind(align);
    width: 100%;
    .iui-avatar-text {
      &-name {
        font-size: $font-size-medium;
        color: $color-text;
      }

      &-desc {
        font-size: $font-size-mini;
        color: $color-text-lighten;
      }
    }

    .iui-avatar-extra {
      margin-left: $size-4;
    }
  }
}
</style>
