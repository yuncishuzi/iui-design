<template>
  <view :class="cls">
    <swiper
      :current="innerCurrent"
      :indicator-dots="false"
      :class="`${prefixCls}-container`"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :vertical="direction === 'vertical'"
      :previous-margin="`${margin}px`"
      :next-margin="`${margin}px`"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      :style="{
        height: `${height}px`,
      }"
      @change="handleChange"
    >
      <block v-for="(img, idx) in list" :key="idx">
        <swiper-item
          :class="[`${prefixCls}-item`]"
          :style="{
            padding: !zoom && margin ? `0 ${margin / 2}px` : 0,
            width: `${width}%`,
          }"
        >
          <view
            :class="[
              `${prefixCls}-item-image`,
              {
                zoom: zoom && innerCurrent !== idx,
              },
            ]"
          >
            <view style="width: 100%; height: 100%">
              <iui-image
                mode="aspectFill"
                lazy-load
                :src="img"
                :radius="radius"
              />
            </view>
          </view>
        </swiper-item>
      </block>
    </swiper>
    <view v-if="$slots.indicator" class="custom-indicator">
      <slot name="indicator" :current="innerCurrent"></slot>
    </view>
    <view
      v-else
      :class="`${prefixCls}-indicator`"
      :style="{
        justifyContent:
          indicatorAlign === 'center' ? 'center' : `flex-${indicatorAlign}`,
      }"
    >
      <block v-for="(_, idx) in list.length" :key="idx">
        <view
          class="dots"
          :style="{
            backgroundColor:
              innerCurrent === idx ? indicatorActiveColor : indicatorColor,
          }"
        ></view>
      </block>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 列表
   */
  list: {
    type: Array,
    default: () => [],
  },
  /**
   * 当前索引
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * 是否显示指示点
   */
  indicator: {
    type: Boolean,
    default: true,
  },
  /**
   * 指示器样式
   * type : dot 、 line
   */
  indicatorType: {
    type: String,
    default: "dot",
  },
  /**
   * 指示点颜色
   */
  indicatorColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.4)",
  },
  /**
   * 激活指示点颜色
   */
  indicatorActiveColor: {
    type: String,
    default: "#FFFFFF",
  },
  /**
   * 是否自动播放
   */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否循环播放
   */
  circular: {
    type: Boolean,
    default: true,
  },
  /**
   * 切换间隔
   */
  interval: {
    type: Number,
    default: 5000,
  },
  /**
   * 滚动方向
   */
  direction: {
    type: String,
    default: "horizontal",
  },
  /**
   * 高度
   */
  height: {
    type: Number,
    default: 140,
  },
  /**
   * 滑块宽度
   */
  width: {
    type: Number,
    default: 100,
  },
  /**
   * 前后间距
   */
  margin: {
    type: Number,
    default: 0,
  },
  /**
   * 突出显示当前项
   */
  zoom: {
    type: Boolean,
    default: false,
  },
  /**
   * 指示点对齐
   * align: start | center | end
   * 仅横向布局时有效
   */
  indicatorAlign: {
    type: String,
    default: "center",
  },
  /**
   * 圆角
   */
  radius: {
    type: Number,
    default: 0,
  },
});

const prefixCls = "iui-swiper";

const cls = computed(() => [
  prefixCls,
  `${prefixCls}-indicator-${props.indicatorType}`,
  `${prefixCls}-${props.direction}`,
]);

const innerCurrent = ref(props.modelValue);

const emit = defineEmits(["update:modelValue", "change"]);

const handleChange = (e) => {
  innerCurrent.value = e.detail.current;
  emit("update:modelValue", e.detail.current);
  emit("change", e);
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.iui-swiper {
  position: relative;

  &-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    &-image {
      transition: all 0.3s ease-in-out;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $color-bg-secondary;
    }
  }

  &-indicator {
    left: 50%;
    bottom: 10px;
    text-align: center;
    white-space: nowrap;
    transform: translateX(-50%);
    position: absolute;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;

    .iui-swiper-vertical & {
      right: 0;
      left: auto;
      bottom: auto;
      top: 50%;
      flex-direction: column;
      transform: translateY(-50%);
      width: auto;
    }

    .dots {
      width: 6px;
      height: 6px;
      display: inline-block;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
      &:not(:last-child) {
        .iui-swiper-vertical & {
          margin-bottom: 8px;
        }

        .iui-swiper-horizontal & {
          margin-right: 8px;
        }
      }
    }

    &-line {
      &.iui-swiper-horizontal {
        .dots {
          width: 12px;
          height: 3px;
          border-radius: 1px;
        }
      }

      &.iui-swiper-vertical {
        .dots {
          width: 3px;
          height: 12px;
          border-radius: 1px;
        }
      }
    }
  }
}

.custom-indicator {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.zoom {
  transform: scale(0.9);
}

:deep(.uni-swiper-slide-frame) {
  display: flex;
  justify-content: center;
}
</style>
