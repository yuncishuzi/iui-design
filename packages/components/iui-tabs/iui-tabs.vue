<template>
  <scroll-view
    :class="[
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-split`]: props.split,
      },
    ]"
    scroll-x
    :scroll-left="scrollLeft"
    scroll-with-animation
  >
    <view :class="cls">
      <view :class="`${prefixCls}-content`">
        <block v-for="(tab, idx) in list" :key="idx">
          <!-- tab text -->
          <view
            :id="`tab-${idx}`"
            :class="[
              `${prefixCls}-cell`,
              {
                [`${prefixCls}-cell-active`]: current === idx,
              },
            ]"
            @click="handleTabClick(idx, tab)"
          >
            <view class="cell">
              {{ tab.title }}
            </view>
          </view>
        </block>
      </view>

      <!-- slide -->
      <view
        v-if="currentTabOffset"
        :class="`${prefixCls}-slider`"
        :style="sliderStyle"
      >
        <view class="line"></view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import { computed, getCurrentInstance, ref, onMounted } from "vue";
import { getRect } from "../helper/rect";

const props = defineProps({
  /**
   * 当前索引
   */
  current: {
    type: Number,
    default: 0,
  },
  /**
   * tab列表
   */
  list: {
    type: Array,
    default: () => [],
  },
  /**
   * 类型
   * type: line | tag | card
   * line: 下划线模式
   * tag: 标签模型
   * card: 卡片模式
   */
  type: {
    type: String,
    default: "line",
  },
  /**
   * 线条宽度
   * lineWidth: 默认 24 | 自定义数值 | auto 根据tab内容自适应
   */
  lineWidth: {
    type: [String, Number],
    default: 20,
  },

  /**
   * 是否显示分割线
   */
  split: {
    type: Boolean,
    default: false,
  },
});

const prefixCls = "iui-tabs";

const cls = computed(() => [prefixCls, `${prefixCls}-type-${props.type}`]);

const instance = getCurrentInstance();

// 组件内部current
const current = ref(props.current);

// 容器宽度
const containerWidth = ref(0);

// 滚动位置
const scrollLeft = ref(0);

// 滑块位置
const currentTabOffset = ref(0);
const currentTabWidth = ref(props.lineWidth);

const sliderStyle = computed(() => {
  return {
    width: `${currentTabWidth.value}px`,
    transform: `translateX(${currentTabOffset.value}px)`,
  };
});

const autoLineWidth = props.lineWidth === "auto";

// 设置滑块位置
const setSliderPosition = (idx) => {
  // 计算滑动位置
  scrollLeft.value =
    tabsOffsetList.value[idx].offset - containerWidth.value / 2;

  if (autoLineWidth) {
    getRect(instance, `#tab-${idx} > .cell`).then((res) => {
      currentTabWidth.value = res.width;
      currentTabOffset.value =
        tabsOffsetList.value[idx].offset - currentTabWidth.value / 2;
    });
  } else {
    currentTabOffset.value =
      tabsOffsetList.value[idx].offset - currentTabWidth.value / 2;
  }
};

const tabsOffsetList = ref([]);

// 获取tab信息
const getTabsWidth = () => {
  const temp = [];

  // 获取容器宽度
  getRect(instance, ".iui-tabs-wrapper").then((res) => {
    containerWidth.value = res.width;

    // 获取tab偏移量
    getRect(instance, ".iui-tabs-cell", true).then((res) => {
      let offset = 0;

      res.forEach((tab) => {
        temp.push({
          width: parseInt(tab.width),
          offset: parseInt(offset + tab.width / 2),
        });

        offset += tab.width;
      });

      tabsOffsetList.value = temp;

      setSliderPosition(props.current);
    });
  });
};

onMounted(() => {
  getTabsWidth();
});

// 事件
const emit = defineEmits(["change"]);

// 点击tab
const handleTabClick = (idx, tab) => {
  emit("change", idx, tab);
  current.value = idx;
  setSliderPosition(idx);
};
</script>

<style lang="scss" scoped>
@import "../style/index.scss";

:deep(.uni-scroll-view) {
  scrollbar-width: none !important;

  &::-webkit-scrollbar {
    display: none !important;
  }
}

.iui-tabs-wrapper {
  box-sizing: content-box;
  margin-bottom: 10px; // 滑块

  &-split {
    border-bottom: 1rpx solid $color-border;
  }

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none !important;
  }
}

.iui-tabs {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  &-content {
    display: inline-flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    font-size: $font-size-large;
  }

  &-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 10px 16px;
    color: $color-text;
    cursor: pointer;
    transition: all 240ms ease-in-out;
    letter-spacing: 0.5px;

    &-active {
      color: $primary-6;
      font-weight: 600;
      /* #ifndef MP */
      letter-spacing: 0;

      /* #endif */
    }
  }

  &-type {
  }
}

.iui-tabs-slider {
  position: absolute;
  bottom: 0;
  height: 2px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition-duration: 240ms;
  animation: fadeIn 100ms ease-in;

  .line {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition: inherit;
    flex: 0 0 auto;
    border-radius: $border-radius-small;
    background-color: $primary-6;
  }
}
</style>
