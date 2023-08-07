<template>
  <view
    :class="cls"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <view
      :class="[`${prefixCls}-content`]"
      :style="{
        transform: `translateX(${offset}px)`,
      }"
    >
      <slot />

      <view
        :class="`${prefixCls}-menu`"
        :style="{
          minWidth: menuWidth ? `${menuWidth}px` : 'auto',
        }"
      >
        <block v-for="(menu, idx) in actions" :key="idx">
          <view
            v-if="!menu.slotName"
            class="menu-item"
            :style="{
              ...menu.style,
              width:
                idx == actions.length - 1
                  ? menuWidth
                    ? `${menuWidth + 20}px`
                    : 'auto'
                  : 'auto',
            }"
            @click="handleClick(menu, idx)"
          >
            <view class="icon" v-if="menu.icon">
              <iui-icon :name="menu.icon"></iui-icon>
            </view>

            <text class="text"> {{ menu.text }}</text>
          </view>

          <view :class="`${prefixCls}-slot`" v-else>
            <slot :name="menu.slotName" />
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import { getRect } from "../../helper/rect";

const props = defineProps({
  /**
   * 默认状态
   */
  defaultOpen: {
    type: Boolean,
    default: false,
  },
  /**
   * 右侧菜单
   *
   */
  actions: {
    type: Array,
    default: () => [],
  },
});
const innerValue = ref(false);

const prefixCls = "iui-swipe-action";

const cls = computed(() => [prefixCls]);

const emit = defineEmits(["open", "close", "click"]);

// 菜单宽度
const menuWidth = ref(0);

let startX = 0;
let startY = 0;
const offset = ref(0);
const lastOffset = ref(0);

const onTouchStart = (e) => {
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
};

const onTouchMove = (e) => {
  if (startX === 0 && startY === 0) return;
  const { pageX, pageY } = e.touches[0];
  const offsetX = pageX - startX;
  const offsetY = pageY - startY;

  if (innerValue.value) {
    const newOffset = lastOffset.value + offsetX;

    if (newOffset < -menuWidth.value - 10) {
      offset.value = -menuWidth.value - 10;
    } else {
      offset.value = newOffset > 10 ? 10 : newOffset;
    }
  } else {
    if (offsetX > 0) {
      offset.value = 10;
    } else {
      offset.value =
        offsetX > -menuWidth.value - 10 ? offsetX : -menuWidth.value - 10;
    }
  }

  if (Math.abs(offsetX) > Math.abs(offsetY)) {
    e.preventDefault();
  }
};

const onTouchEnd = () => {
  if (innerValue.value && offset.value > -menuWidth.value + 20) {
    offset.value = 0;
    innerValue.value = false;
    return;
  }

  if (offset.value < -30) {
    offset.value = -menuWidth.value;
    innerValue.value = true;
    lastOffset.value = offset.value;
    emit("open");
  } else {
    offset.value = 0;
    innerValue.value = false;
    emit("close");
  }
};

// 获取菜单宽度
const instance = getCurrentInstance();

const getMenuWidth = () => {
  getRect(instance, `.${prefixCls}-menu`).then((res) => {
    menuWidth.value = res.width;
  });
};

onMounted(() => {
  getMenuWidth();
});

watch(
  () => props.defaultOpen,
  (value) => {
    if (value) {
      offset.value = -menuWidth.value;
      innerValue.value = true;
      lastOffset.value = offset.value;
      emit("open");
    }
  }
);

const close = () => {
  offset.value = 0;
  innerValue.value = false;
};

const handleClick = async (menu, index) => {
  emit("click", menu.text, index);

  if (menu.onClick) {
    const res = await menu.onClick(menu.text, index);
    if (res === false) return;
  }

  close();
  emit("close");
};

defineExpose({
  close,
});
</script>

<style lang="scss" scoped>
.iui-swipe-action {
  touch-action: none;
  overflow: hidden;

  &-content {
    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.32, 1.28);
    display: flex;
    align-items: center;
  }

  &-menu {
    position: absolute;
    left: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .menu-item {
      color: white;
      padding: 16px;
      width: 100%;
      height: 100%;
      font-size: 14px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 4px;
      }

      .text {
        white-space: nowrap;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  &-slot {
    height: 100%;
    width: 100%;
    &:active {
      opacity: 0.8;
    }

    :last-child {
      width: calc(100% + 20px) !important;
      height: inherit;
    }
  }
}
</style>
