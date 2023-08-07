<template>
  <view :class="cls">
    <view
      :class="`${prefixCls}-mask`"
      @click.passive="close"
      v-if="innerVisible"
    >
    </view>
    <view
      :class="[`${prefixCls}-content`, position]"
      :style="{
        opacity: show ? 1 : 0,
        color: theme === 'light' ? '#000' : '#fff',
        left: popoverOffset.left + 'px',
        top: popoverOffset.top + 'px',
      }"
      v-if="innerVisible || !ready"
    >
      <view
        id="content"
        class="content"
        :style="{
          backgroundColor: theme === 'light' ? '#fff' : '#000',
          width: isNumber(width) ? width + 'px' : width,
        }"
        @click="handleClick"
      >
        <text v-if="!$slots.content">{{ content }} </text>
        <slot name="content" :close="close" />
      </view>

      <view
        :class="`${prefixCls}-arrow`"
        :style="{
          left: arrowOffset.left + 'px',
          top: arrowOffset.top + 'px',
          backgroundColor: theme === 'light' ? '#fff' : '#000',
        }"
      ></view>
    </view>

    <view
      id="trigger"
      :class="`${prefixCls}-trigger`"
      @click="handleTriggerClick"
    >
      <slot />
    </view>
  </view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getRect } from "../../helper/rect";
import { isNumber } from "../../helper/is";

const props = defineProps({
  /**
   * 可见
   */
  visible: {
    type: Boolean,
    default: false,
  },

  /**
   * 内容
   */
  content: {
    type: String,
    default: "",
  },
  /**
   * 位置
   * position: top | bottom  | tl | tr | bl | br
   */
  position: {
    type: String,
    default: "top",
  },
  /**
   * 主题
   * theme: light | dark
   */
  theme: {
    type: String,
    default: "light",
  },
  /**
   * 宽度
   */
  width: {
    type: [String, Number],
    default: "max-content",
  },
});

const prefixCls = "iui-popover";

const cls = computed(() => [prefixCls]);

const innerVisible = ref(props.visible);

const emit = defineEmits(["update:visible", "close", "click"]);

// 用于控制动画
const show = ref(false);

const handleTriggerClick = () => {
  if (innerVisible.value) {
    close();
  } else {
    innerVisible.value = !innerVisible.value;
    emit("update:visible", innerVisible.value);
    setTimeout(() => {
      show.value = !show.value;
    }, 50);
  }
};

const handleClick = () => {
  emit("click");
};

const instance = getCurrentInstance();

// 计算位置
const ready = ref(false);
const popoverOffset = ref({
  top: 0,
  left: 0,
});
const arrowOffset = ref({
  top: 0,
  left: 0,
});
// 屏幕宽度
const screenWidth = uni.getSystemInfoSync().screenWidth;

const getPosition = async () => {
  const p = props.position;

  // 获取触发元素的宽度
  const trigger = await getRect(instance, "#trigger");
  // 获取内容宽度
  const content = await getRect(instance, "#content");
  //   console.log(trigger, content);

  const [popover, arrow] = await calcOffset(trigger, content, p);

  popoverOffset.value = popover;
  arrowOffset.value = arrow;

  ready.value = true;
};

const calcOffset = async (trigger, content, position) => {
  const result = {
    top: 0,
    left: 0,
  };
  const arrow = {
    top: 0,
    left: 0,
  };

  // 向左偏移到中心的距离
  const center = (trigger.width - content.width) / 2;

  switch (position) {
    case "top":
      // 内容相对触发元素计算偏移位置
      // 如果偏移位置会导致内容超出屏幕，则偏移到离屏幕边缘10px的位置
      if (Math.abs(center) > trigger.left) {
        result.left = 10 - trigger.left;
        arrow.left = trigger.left - 5 - 10 + trigger.width / 2;
      } else if (content.right > screenWidth) {
        result.left = -(content.right - screenWidth + 10);
        arrow.left = content.right - screenWidth + 10 + trigger.width / 2 - 5;
      } else {
        result.left = center;
        arrow.left = content.width / 2 - 5;
      }
      result.top = -content.height - 10;
      arrow.top = content.height - 5;
      break;
    case "bottom":
      if (Math.abs(center) > trigger.left) {
        result.left = 10 - trigger.left;
        arrow.left = trigger.left - 5 - 10 + trigger.width / 2;
      } else if (content.right > screenWidth) {
        result.left = -(content.right - screenWidth + 10);
        arrow.left = content.right - screenWidth + 10 + trigger.width / 2 - 5;
      } else {
        result.left = center;
        arrow.left = content.width / 2 - 5;
      }
      result.top = trigger.height + 10;
      arrow.top = -5;
      break;
    case "tl":
      result.left = 0;
      result.top = -content.height - 10;
      arrow.top = content.height - 5;
      arrow.left = trigger.width / 2 - 5;
      break;
    case "tr":
      result.left = trigger.width - content.width;
      result.top = -content.height - 10;
      arrow.top = content.height - 5;
      arrow.left = content.width - trigger.width + trigger.width / 2 - 5;
      break;
    case "bl":
      result.left = 0;
      result.top = trigger.height + 10;
      arrow.top = -5;
      arrow.left = trigger.width / 2 - 5;
      break;

    case "br":
      result.left = trigger.width - content.width;
      result.top = trigger.height + 10;
      arrow.top = -5;
      arrow.left = content.width - trigger.width + trigger.width / 2 - 5;
      break;

    default:
      break;
  }
  return [result, arrow];
};

const close = () => {
  emit("close");
  show.value = false;
  setTimeout(() => {
    innerVisible.value = false;
    emit("update:visible", innerVisible.value);
  }, 300);
};

onMounted(() => {
  getPosition();
});

defineExpose({
  close,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-popover {
  position: relative;
  display: flex;

  &-mask {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 998;
  }

  &-arrow {
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    z-index: 999;
    position: absolute;
    background-color: inherit;
    border-top-left-radius: $border-radius-small;
    border-bottom-right-radius: $border-radius-small;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  }

  &-content {
    position: absolute;
    transition: opacity 0.3s ease;
    display: flex;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    z-index: 1000;

    .content {
      padding: $size-2 $size-3;
      box-sizing: border-box;
      font-size: $font-size-large;
      border-radius: $border-radius-small;
      max-width: 80vw;
      z-index: 1000;
    }
  }

  &-trigger {
    display: inline-flex;
  }
}
</style>
