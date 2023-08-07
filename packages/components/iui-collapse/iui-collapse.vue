<template>
  <view :class="cls">
    <view @click="handleClick">
      <iui-cell :label="label" :icon="icon" :extra="extra">
        <template #extra>
          <view
            :class="[
              `${prefixCls}-action-icon`,
              {
                rotate: expand,
              },
            ]"
          >
            <iui-icon name="down"></iui-icon>
          </view>
        </template>
      </iui-cell>
    </view>

    <view
      :class="[`${prefixCls}-content`]"
      :style="{
        height: expand ? `${contentHeight}px` : 0,
      }"
    >
      <view
        :class="`${prefixCls}-content-container`"
        :style="[
          contentStyle,
          {
            borderTop:
              group && isSplit ? 'none' : '1rpx solid var(--iui-gray-2)',
          },
        ]"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  getCurrentInstance,
  watch,
  nextTick,
} from "vue";
import { getRect } from "../../helper/rect";

const props = defineProps({
  /**
   * 唯一标识
   * 用于手风琴模式
   */
  name: {
    type: [String, Number],
  },
  /**
   * 标签
   */
  label: {
    type: String,
    default: "",
  },
  /**
   * 是否展开
   */
  expand: {
    type: Boolean,
    default: false,
  },
  /**
   * 自定义内容样式
   */
  contentStyle: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 左侧图标
   */
  icon: {
    type: String,
  },
  /**
   * 右侧额外信息
   */
  extra: {
    type: String,
  },
});

// class
const prefixCls = "iui-collapse";
const cls = computed(() => [prefixCls]);

// 展开状态
const expand = ref(props.expand);
const contentHeight = ref(0);

const emit = defineEmits(["update:expand", "change"]);

const instance = getCurrentInstance();
const uid = props.name || instance.uid;

// 是否在group中
const group = instance.provides["collapse-group"];

// list是否开启分割线
const isSplit = group?.props?.split;

// 若开启手风琴模式，则监听activeKey
if (group && group.props.accordion) {
  watch(
    () => group?.exposed?.activeKey.value,
    (val) => {
      if (val === uid) {
        expand.value = true;
      } else {
        expand.value = false;
      }
    }
  );
}

const handleClick = () => {
  if (group) {
    const { setActiveKey } = group?.exposed;
    setActiveKey(uid);
  }
  expand.value = !expand.value;

  emit("update:expand", expand.value);
  emit("change", expand.value);
};

const setDefaultActiveKey = () => {
  if (group) {
    const { activeKey } = group?.exposed;
    if (activeKey.value === uid) {
      expand.value = true;
    }
  }
};

onMounted(() => {
  getRect(instance, `.${prefixCls}-content-container`).then((res) => {
    contentHeight.value = res.height;
  });

  setDefaultActiveKey();
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-collapse {
  &-action-icon {
    color: $color-text-lighten;
    transition: all 150ms linear;
    margin-left: $size-2;
  }

  &-content {
    transition: height 150ms linear;
    overflow: hidden;

    &-container {
      padding: $size-3 $size-4 $size-4 0;
      margin-left: $size-4;
      color: $color-text-light;
      font-size: $font-size-body;
    }
  }
}

.rotate {
  transform: rotate(180deg);
}
</style>
