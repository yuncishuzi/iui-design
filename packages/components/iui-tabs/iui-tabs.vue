<template>
  <scroll-view
    :class="[
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-split`]: props.split && !isType('card'),
      },
    ]"
    :scroll-left="scrollLeft"
    scroll-x
    scroll-with-animation
  >
    <view :class="cls">
      <view
        :class="`${prefixCls}-content`"
        :style="{
          justifyContent: tabWidth ? 'flex-start' : 'space-between',
        }"
      >
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
            :style="{
              width: tabWidth ? `${tabWidth}px` : '100%',
              justifyContent: tabWidth ? 'flex-start' : 'center',
            }"
            @click="handleTabClick(idx, tab)"
          >
            <view class="cell">
              <iui-icon v-if="tab.icon" :name="tab.icon"></iui-icon>
              {{ tab.title }}
              <iui-badge v-if="tab.badge" v-bind="tab.badge"></iui-badge>
            </view>
          </view>
        </block>
      </view>

      <!-- slide -->
      <view
        :class="`${prefixCls}-slider`"
        :style="[
          sliderStyle,
          {
            transitionDuration: duration,
          },
        ]"
      >
        <view
          class="line"
          :class="[
            {
              'tabs-dot-move': changing,
            },
          ]"
          :style="{
            transitionDuration: duration,
            height: lineHeight
              ? `${lineHeight > 10 ? 10 : lineHeight}px`
              : '2px',
            borderRadius: lineHeight ? `${lineHeight / 2}px` : '',
          }"
        ></view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import { computed, getCurrentInstance, ref, onMounted } from "vue";
import { getRect } from "../../helper/rect";

const props = defineProps({
  /**
   * 当前索引
   */
  modelValue: {
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
   * type: line | dot | tag | card
   * line: 下划线模式
   * dot: 圆点模式 毛毛虫
   * tag: 标签模型
   * card: 卡片模式
   */
  type: {
    type: String,
    default: "line",
  },
  /**
   * 线条样式
   * lineWidth: 默认 24 | 自定义数值 | auto 根据tab内容自适应
   */
  lineWidth: {
    type: [String, Number],
    default: 20,
  },
  /**
   * 下划线高度
   *
   */
  lineHeight: {
    type: Number,
  },
  /**
   * 是否显示分割线
   */
  split: {
    type: Boolean,
    default: false,
  },
  /**
   * 动画持续时间
   */
  duration: {
    type: Number,
    default: 240,
  },
  /**
   * 激活状态颜色
   */
  activeColor: {
    type: String,
    default: "var(--iui-primary-6)",
  },
  /**
   * tab宽度
   * 自定义tab宽度后，tab宽度将不再自适应
   */
  tabWidth: {
    type: Number,
  },
});

const prefixCls = "iui-tabs";

const cls = computed(() => [prefixCls, `${prefixCls}-type-${props.type}`]);

// 正在切换
const changing = ref(false);
const duration = props.duration + "ms";

const instance = getCurrentInstance();

// 组件内部current
const current = ref(props.modelValue);

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

const isType = (type) => props.type === type;

// 设置滑块位置
const setSliderPosition = (idx) => {
  // 点模式 设置毛毛虫动画
  if (isType("dot")) {
    changing.value = true;
    setTimeout(() => {
      changing.value = false;
    }, props.duration);
  }

  const tab = tabsOffsetList.value[idx];

  // 计算滑动位置
  scrollLeft.value = tab.offset - containerWidth.value / 2;

  if (props.lineWidth === "auto" && isType("line")) {
    getRect(instance, `#tab-${idx} > .cell`).then((res) => {
      currentTabWidth.value = res.width;
      currentTabOffset.value = tab.offset - currentTabWidth.value / 2;
    });
  } else if (isType("tag")) {
    getRect(instance, `#tab-${idx} > .cell`).then((res) => {
      currentTabWidth.value = res.width + 32;
      currentTabOffset.value = tab.offset - currentTabWidth.value / 2;
    });
  } else if (isType("card")) {
    currentTabOffset.value = tab.offset - tab.width / 2;
    currentTabWidth.value = tab.width;
  } else {
    if (props.tabWidth) {
      currentTabOffset.value = tab.offset - props.tabWidth / 2;
    } else {
      currentTabOffset.value = tab.offset - currentTabWidth.value / 2;
    }
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

      setSliderPosition(props.modelValue);
    });
  });
};

onMounted(() => {
  getTabsWidth();
});

// 事件
const emit = defineEmits(["update:modelValue", "change"]);

// 点击tab
const handleTabClick = (idx, tab) => {
  if (idx === current.value) return;
  emit("update:modelValue", idx);
  emit("change", idx, tab);
  current.value = idx;
  setSliderPosition(idx);
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

:deep(.uni-scroll-view) {
  scrollbar-width: none !important;

  &::-webkit-scrollbar {
    display: none !important;
  }
}

.iui-tabs-wrapper {
  box-sizing: content-box;
  // margin-bottom: 10px; // 滑块

  &.iui-tabs-split {
    border-bottom: 1rpx solid $color-border;
  }

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none !important;
  }
}

.iui-tabs {
  display: flex;
  align-items: center;
  position: relative;
  white-space: nowrap;
  flex-wrap: nowrap;

  &-content {
    display: inline-flex;
    flex-wrap: nowrap;
    flex: 1;
    height: 100%;
    font-size: $font-size-large;
    z-index: 200;
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
    transition: all 240ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    letter-spacing: 0.3px;

    &-active {
      color: v-bind(activeColor);
    }
  }

  &-type {
    &-dot {
      .iui-tabs-slider {
        display: flex;
        justify-content: center;
        height: 6px !important;

        .line {
          width: 6px !important;
          height: 6px !important;
          border-radius: 3px;
        }
      }
    }

    &-tag {
      .iui-tabs-cell-active {
        color: $color-white !important;
      }
      .iui-tabs-slider {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        .line {
          width: 100%;
          height: 70% !important;
          border-radius: $border-radius-huge;
          background-color: v-bind(activeColor);
        }
      }
    }

    &-card {
      background-color: $color-bg-secondary;
      border-radius: $border-radius-small;

      .iui-tabs-slider {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 5px;
        box-sizing: border-box;

        .line {
          width: 100%;
          height: 100% !important;
          border-radius: 2px;
          background-color: $color-bg;
        }
      }
    }
  }
}

.iui-tabs-slider {
  position: absolute;
  bottom: 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);

  .line {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition: inherit;
    border-radius: $border-radius-small;
    background-color: v-bind(activeColor);
  }
}

.tabs-dot-move {
  animation: tabs-dot-move v-bind(duration)
    cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

@keyframes tabs-dot-move {
  0% {
    -webkit-transform: scaleX(1) translateZ(0);
    transform: scaleX(1) translateZ(0);
  }
  50% {
    -webkit-transform: scaleX(5) translateZ(0);
    transform: scaleX(5) translateZ(0);
    border-radius: 2px;
  }
  100% {
    -webkit-transform: scaleX(1) translateZ(0);
    transform: scaleX(1) translateZ(0);
  }
}
</style>
